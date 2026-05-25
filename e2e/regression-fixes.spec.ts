import { expect, test, type Page } from '@playwright/test';

const DEMO_CALENDLY = /https:\/\/calendly\.com\/hello-exotiq\/30min$/;

async function installExternalNavigationGuards(page: Page) {
  await page.addInitScript(() => {
    window.dataLayer = window.dataLayer || [];
    (window as Window & { __openedUrls?: string[] }).__openedUrls = [];
    const originalOpen = window.open.bind(window);

    window.open = (url?: string | URL, target?: string, features?: string) => {
      const href = url ? String(url) : '';
      if (href.startsWith('https://calendly.com/')) {
        (window as Window & { __openedUrls: string[] }).__openedUrls.push(href);
        return null;
      }
      return originalOpen(url, target, features);
    };

    window.addEventListener(
      'click',
      (event) => {
        const target = event.target as Element | null;
        const link = target?.closest?.('a[href^="https://calendly.com/"]');
        if (link) {
          event.preventDefault();
        }
      },
      true
    );
  });
}

async function dataLayer(page: Page) {
  return page.evaluate(() => (window as Window & { dataLayer?: Array<Record<string, unknown>> }).dataLayer ?? []);
}

test.describe('blog demo CTA uses canonical URL', () => {
  test.beforeEach(async ({ page }) => {
    await installExternalNavigationGuards(page);
  });

  test('blog post demo CTA targets 30min Calendly URL', async ({ page }) => {
    await page.route('**/rest/v1/blog_posts**', async (route) => {
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify([]) });
    });

    await page.goto('/blog/fleet-management-fundamentals-rental-hosts');
    await expect(page.locator('#main-content')).toBeVisible();

    const demoCta = page.locator('a[href*="calendly.com"]').first();
    if (await demoCta.count()) {
      await expect(demoCta).toHaveAttribute('href', DEMO_CALENDLY);
    }
  });
});

test.describe('UTM attribution persists across navigation', () => {
  test('contact form includes first-touch UTMs after navigating from landing page', async ({ page }) => {
    let submittedPayload: Record<string, unknown> | undefined;

    await page.route('**/functions/v1/handle-form-submission', async (route) => {
      submittedPayload = route.request().postDataJSON() as Record<string, unknown>;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
    });

    await page.goto('/?utm_source=google&utm_medium=cpc&utm_campaign=fleet_demo');
    await expect(page.locator('#main-content')).toBeVisible();

    // Verify the app captured UTMs into session storage
    await expect.poll(() =>
      page.evaluate(() => window.sessionStorage.getItem('exotiq_utm_source'))
    ).toBe('google');

    await page.goto('/contact');

    await page.locator('input[name="firstName"]').fill('Test');
    await page.locator('input[name="lastName"]').fill('UTM');
    await page.locator('input[name="email"]').fill('test@example.com');
    await page.locator('input[name="company"]').fill('UTM Co');
    await page.locator('input[name="role"]').fill('Tester');
    await page.locator('select[name="subject"]').selectOption('demo');
    await page.locator('select[name="fleetSize"]').selectOption('6-15');
    await page.locator('select[name="timeline"]').selectOption('30-60');
    await page.locator('textarea[name="message"]').fill('Testing UTM persistence.');

    await page.getByRole('button', { name: /Request Demo/i }).click();
    await expect(page.getByText(/Demo Request Sent/i)).toBeVisible();

    const formData = (submittedPayload as Record<string, Record<string, unknown>>)?.formData;
    expect(formData).toBeDefined();

    const metadata = formData?._metadata as Record<string, string> | undefined;
    expect(metadata).toBeDefined();
    expect(metadata?.landing_page).toMatch(/utm_source=google/);
    expect(metadata?.utm_source).toBe('google');
    expect(metadata?.utm_medium).toBe('cpc');
    expect(metadata?.utm_campaign).toBe('fleet_demo');
  });
});

test.describe('survey enforces required answers', () => {
  test('Next button is disabled when required question is unanswered', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Survey step validation covered on desktop.');

    await page.goto('/survey?type=small');
    await expect(page.locator('#main-content')).toBeVisible();

    const nextButton = page.getByRole('button', { name: /Next/i });
    await expect(nextButton).toBeDisabled();

    await page.locator('input[type="radio"]').first().locator('xpath=ancestor::label[1]').click({ force: true });
    await expect(nextButton).toBeEnabled();
  });
});

test.describe('survey shows error on submission failure', () => {
  test('survey displays error when Supabase returns 500', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Survey submission error covered on desktop.');

    await page.route('**/rest/v1/survey_submissions**', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Internal error' }),
      });
    });

    await page.goto('/survey?type=small');

    for (let step = 0; step < 12; step += 1) {
      const submitButton = page.getByRole('button', { name: /Submit Survey/i });

      const firstRadio = page.locator('input[type="radio"]').first();
      if ((await firstRadio.count()) > 0) {
        await firstRadio.locator('xpath=ancestor::label[1]').click({ force: true });
      } else {
        const firstCheckbox = page.locator('input[type="checkbox"]').first();
        if ((await firstCheckbox.count()) > 0) {
          await firstCheckbox.locator('xpath=ancestor::label[1]').click({ force: true });
        } else {
          const textarea = page.locator('textarea').first();
          if ((await textarea.count()) > 0) {
            await textarea.fill('Test response');
          }
        }
      }

      if (await submitButton.isVisible().catch(() => false)) {
        await page.locator('#survey-lead-name').fill('Error Test');
        await page.locator('#survey-lead-email').fill('error@test.com');
        await submitButton.click();
        break;
      }

      await page.locator('main button:not([disabled])').last().click();
    }

    await expect(page.getByRole('alert')).toBeVisible({ timeout: 5_000 });
    await expect(page.getByText(/could not reach our server/i)).toBeVisible();
  });
});

test.describe('consent mode defaults', () => {
  test('GTM consent defaults are denied before user interaction', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#main-content')).toBeVisible();

    const hasConsentDefault = await page.evaluate(() => {
      const dl = (window as Window & { dataLayer?: Array<unknown> }).dataLayer ?? [];
      return dl.some((entry: unknown) => {
        if (entry && typeof entry === 'object' && '0' in entry && '1' in entry) {
          const obj = entry as Record<string, unknown>;
          return obj['0'] === 'consent' && obj['1'] === 'default';
        }
        return false;
      });
    });

    expect(hasConsentDefault).toBe(true);
  });
});
