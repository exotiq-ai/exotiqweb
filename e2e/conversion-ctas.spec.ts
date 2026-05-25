import { expect, test, type Page } from '@playwright/test';

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

const DEMO_CALENDLY = /https:\/\/calendly\.com\/hello-exotiq\/30min$/;
const PRICING_CALENDLY = 'https://calendly.com/hello-exotiq/30min';

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
  return page.evaluate(() => window.dataLayer ?? []);
}

async function acceptCookies(page: Page) {
  const acceptAll = page.getByRole('button', { name: /Accept All/i });
  if (await acceptAll.isVisible({ timeout: 1_000 }).catch(() => false)) {
    await acceptAll.click();
  }
}

test.beforeEach(async ({ page }) => {
  await installExternalNavigationGuards(page);
});

test('desktop header demo CTA targets Calendly and tracks the click', async ({ page, isMobile }) => {
  test.skip(isMobile, 'Desktop header CTA is hidden behind the mobile menu.');

  await page.goto('/');
  await acceptCookies(page);

  const headerDemo = page.locator('header.lg\\:block').getByRole('link', { name: /Book a Demo/i });
  await expect(headerDemo).toHaveAttribute('href', DEMO_CALENDLY);

  await headerDemo.click();

  await expect
    .poll(() => dataLayer(page))
    .toContainEqual(
      expect.objectContaining({
        event: 'conversion_cta_click',
        location: 'header_book_demo',
        action: 'schedule_demo',
        destination: PRICING_CALENDLY,
      })
    );
});

test('home hero exposes Calculate ROI and Book Demo conversion CTAs', async ({ page }) => {
  await page.goto('/');
  await acceptCookies(page);

  const hero = page.locator('section').filter({
    has: page.getByRole('heading', { name: /AI Fleet Intelligence That Saves Time/i }),
  });

  await expect(hero.getByRole('link', { name: /Calculate (Your )?ROI/i })).toHaveAttribute(
    'href',
    /\/pricing$/
  );
  await expect(hero.getByRole('link', { name: /Book (a )?Demo/i })).toHaveAttribute(
    'href',
    DEMO_CALENDLY
  );
});

test('pricing demo CTA opens the sales Calendly URL and records pricing metadata', async ({ page }) => {
  await page.goto('/pricing');
  await acceptCookies(page);

  await page.getByRole('button', { name: /Book a Demo/i }).first().click();

  await expect
    .poll(() => page.evaluate(() => (window as Window & { __openedUrls?: string[] }).__openedUrls ?? []))
    .toContain(PRICING_CALENDLY);
  await expect
    .poll(() => dataLayer(page))
    .toContainEqual(
      expect.objectContaining({
        event: 'conversion_cta_click',
        action: 'schedule_demo',
        destination: PRICING_CALENDLY,
      })
    );
});

test('mobile nav demo CTA targets Calendly and tracks the click', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Mobile nav CTA only renders at mobile widths.');

  await page.goto('/');
  await acceptCookies(page);
  await page.getByRole('button', { name: /Toggle menu/i }).click();

  const mobileDemo = page.locator('.fixed.inset-0').getByRole('link', { name: /Book a Demo/i });
  await expect(mobileDemo).toHaveAttribute('href', DEMO_CALENDLY);

  await mobileDemo.click();

  await expect
    .poll(() => dataLayer(page))
    .toContainEqual(
      expect.objectContaining({
        event: 'conversion_cta_click',
        location: 'mobile_menu_book_demo',
        action: 'schedule_demo',
        destination: PRICING_CALENDLY,
      })
    );
});

test('mobile sticky CTA offers one demo action and one ROI action', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Sticky CTA bar is mobile-only.');

  await page.goto('/');
  await expect(page.getByText(/AI Fleet Intelligence That Saves Time/i)).toBeVisible();
  await acceptCookies(page);
  await page.evaluate(() => window.scrollTo(0, 900));

  const stickyBar = page.locator('div.fixed.bottom-0').filter({ hasText: /Book/i });
  await expect(stickyBar).toBeVisible();
  await expect(stickyBar.getByRole('link', { name: /Book (a )?Demo/i })).toHaveCount(1);
  await expect(stickyBar.getByRole('link', { name: /Calculate (Your )?ROI/i })).toHaveAttribute(
    'href',
    /\/pricing$/
  );
});
