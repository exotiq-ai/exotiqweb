import { expect, test, type Page } from '@playwright/test';

type RouteExpectation = {
  path: string;
  requiredText: RegExp[];
};

const publicRoutes: RouteExpectation[] = [
  {
    path: '/',
    requiredText: [/AI Fleet Intelligence That Saves Time/i, /Exotiq replaces 15\+ hours of manual work/i],
  },
  {
    path: '/features',
    requiredText: [/The Complete Platform for Exotic Fleet Operations/i, /Five powerful modules working together/i],
  },
  {
    path: '/pricing',
    requiredText: [/Pricing Built for Every Fleet/i, /Pay per vehicle, scale as you grow/i],
  },
  {
    path: '/contact',
    requiredText: [/Talk to Exotiq/i, /route you to the right demo conversation/i],
  },
  {
    path: '/survey',
    requiredText: [/Join the Founder's Circle/i, /Share your fleet management experience/i],
  },
  {
    path: '/blog',
    requiredText: [/Tactical playbooks for modern fleet operators/i, /pricing strategy, automation workflows, and growth systems/i],
  },
  {
    path: '/blog/fleet-management-fundamentals-rental-hosts',
    requiredText: [/Fleet Management Fundamentals/i, /rental/i],
  },
  {
    path: '/fleetcopilot',
    requiredText: [/Meet FleetCopilot/i, /Your AI assistant for fleet management/i],
  },
  {
    path: '/definitely-not-a-real-route',
    requiredText: [/We couldn't find that page/i, /The link may be broken/i],
  },
];

const benignConsolePatterns = [
  /^Failed to load resource: the server responded with a status of 404 \(Not Found\)$/i,
  /favicon/i,
  /Failed to load resource.*(?:analytics|googletagmanager|elevenlabs|pexels|fonts)/i,
  /Supabase environment variables are missing/i,
];

async function collectCriticalBrowserErrors(page: Page): Promise<string[]> {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() !== 'error') return;
    const text = message.text();
    if (benignConsolePatterns.some((pattern) => pattern.test(text))) return;
    errors.push(text);
  });

  page.on('response', (response) => {
    const url = new URL(response.url());
    if (url.hostname !== '127.0.0.1' && url.hostname !== 'localhost') return;
    if (response.status() >= 500) {
      errors.push(`${response.status()} ${url.pathname}`);
      return;
    }
    if (response.status() === 404 && !['/favicon.ico'].includes(url.pathname)) {
      errors.push(`${response.status()} ${url.pathname}`);
    }
  });

  page.on('pageerror', (error) => {
    errors.push(error.message);
  });

  return errors;
}

test.describe('public route smoke', () => {
  for (const route of publicRoutes) {
    test(`${route.path} renders page-specific content without critical errors`, async ({ page }) => {
      const criticalErrors = await collectCriticalBrowserErrors(page);
      await page.route('**/rest/v1/blog_posts**', async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([]),
        });
      });

      await page.goto(route.path);
      await expect(page.locator('#main-content')).toBeVisible();

      await expect
        .poll(async () => page.locator('#main-content').innerText())
        .toMatch(route.requiredText[0]);
      const mainText = await page.locator('#main-content').innerText();
      expect(mainText.trim().length).toBeGreaterThan(120);
      for (const requiredText of route.requiredText) {
        expect(mainText).toMatch(requiredText);
      }
      expect(criticalErrors).toEqual([]);
    });
  }
});
