import { expect, test } from '@playwright/test';

const performanceRoutes = ['/', '/pricing'];

test.describe('performance budget smoke', () => {
  for (const route of performanceRoutes) {
    test(`${route} stays within basic load budget`, async ({ page }) => {
      await page.goto(route, { waitUntil: 'networkidle' });

      const navigationTiming = await page.evaluate(() => {
        const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        return {
          domContentLoaded: nav.domContentLoadedEventEnd - nav.startTime,
          loadComplete: nav.loadEventEnd - nav.startTime,
          transferSize: performance.getEntriesByType('resource').reduce((sum, entry) => {
            const resource = entry as PerformanceResourceTiming;
            return sum + (resource.transferSize || 0);
          }, 0),
        };
      });

      expect(navigationTiming.domContentLoaded).toBeLessThan(3_500);
      expect(navigationTiming.loadComplete).toBeLessThan(6_000);
      expect(navigationTiming.transferSize).toBeLessThan(2_500_000);
    });
  }
});
