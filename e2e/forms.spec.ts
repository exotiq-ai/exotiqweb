import { expect, test } from '@playwright/test';

async function answerCurrentSurveyStep(page: import('@playwright/test').Page, step: number) {
  await page.waitForSelector(
    'main input[type="radio"], main input[type="checkbox"], main textarea, main input[type="text"], main button',
    { state: 'attached' }
  );

  const firstRadio = page.locator('input[type="radio"]').first();
  if ((await firstRadio.count()) > 0) {
    await firstRadio.locator('xpath=ancestor::label[1]').click({ force: true });
    return;
  }

  const firstCheckbox = page.locator('input[type="checkbox"]').first();
  if ((await firstCheckbox.count()) > 0) {
    await firstCheckbox.locator('xpath=ancestor::label[1]').click({ force: true });
    return;
  }

  const firstTextarea = page.locator('textarea').first();
  if ((await firstTextarea.count()) > 0) {
    await firstTextarea.fill(`Playwright survey response ${step + 1}`);
    return;
  }

  const firstTextInput = page.locator('input[type="text"]').first();
  if ((await firstTextInput.count()) > 0) {
    await firstTextInput.fill(`Playwright survey response ${step + 1}`);
    return;
  }

  await page.getByRole('button', { name: /^1$/ }).click();
}

test('contact form submits through mocked form endpoint', async ({ page }) => {
  let submittedPayload: unknown;

  await page.route('**/functions/v1/handle-form-submission', async (route) => {
    submittedPayload = route.request().postDataJSON();
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true }),
    });
  });

  await page.goto('/contact');

  await page.locator('input[name="firstName"]').fill('Avery');
  await page.locator('input[name="lastName"]').fill('Stone');
  await page.locator('input[name="email"]').fill('avery@example.com');
  await page.locator('input[name="company"]').fill('Stone Exotic Rentals');
  await page.locator('input[name="role"]').fill('Owner');
  await page.locator('select[name="subject"]').selectOption('demo');
  await page.locator('select[name="fleetSize"]').selectOption('6-15');
  await page.locator('select[name="timeline"]').selectOption('30-60');
  await page
    .locator('textarea[name="message"]')
    .fill('We operate a growing exotic rental fleet and want to understand the demo path.');

  await page.getByRole('button', { name: /Request Demo/i }).click();

  await expect(page.getByText(/Demo Request Sent/i)).toBeVisible();
  expect(submittedPayload).toEqual(
    expect.objectContaining({
      type: 'contact',
      formData: expect.objectContaining({
        firstName: 'Avery',
        lastName: 'Stone',
        email: 'avery@example.com',
        company: 'Stone Exotic Rentals',
        role: 'Owner',
        subject: 'demo',
        fleetSize: '6-15',
        timeline: '30-60',
      }),
    })
  );
});

test('survey path submits through mocked Supabase endpoint', async ({ page, isMobile }) => {
  test.skip(isMobile, 'Full survey submission is covered on desktop; mobile route smoke covers survey rendering.');

  let submittedPayload: unknown;

  await page.route('**/rest/v1/survey_submissions**', async (route) => {
    submittedPayload = route.request().postDataJSON();
    await route.fulfill({
      status: 201,
      contentType: 'application/json',
      body: JSON.stringify([{ id: 'survey-test-submission' }]),
    });
  });

  await page.goto('/survey?type=small');

  for (let step = 0; step < 12; step += 1) {
    const submitButton = page.getByRole('button', { name: /Submit Survey/i });

    await answerCurrentSurveyStep(page, step);

    if (await submitButton.isVisible().catch(() => false)) {
      await page.locator('#survey-lead-name').fill('Avery Stone');
      await page.locator('#survey-lead-email').fill('avery@example.com');
      await submitButton.click();
      break;
    }

    await page.locator('main button:not([disabled])').last().click();
  }

  await expect(page.getByText(/Thank/i)).toBeVisible();
  expect(submittedPayload).toEqual([
    expect.objectContaining({
      survey_type: 'small',
      responses: expect.objectContaining({
        fleet_size: expect.any(String),
        _lead: expect.objectContaining({
          name: 'Avery Stone',
          email: 'avery@example.com',
        }),
      }),
    }),
  ]);
});
