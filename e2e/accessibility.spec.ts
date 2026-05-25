import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const routes = ['/', '/pricing', '/contact', '/survey', '/blog'];

test.describe('accessibility smoke', () => {
  for (const route of routes) {
    test(`${route} has no serious or critical accessibility violations`, async ({ page }) => {
      await page.route('**/rest/v1/blog_posts**', async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([]),
        });
      });

      await page.goto(route);
      await expect(page.locator('#main-content')).toBeVisible();

      const results = await new AxeBuilder({ page })
        .disableRules(['color-contrast'])
        .analyze();

      const seriousViolations = results.violations.filter((violation) =>
        violation.impact === 'serious' || violation.impact === 'critical'
      );

      expect(seriousViolations).toEqual([]);
    });
  }
});
