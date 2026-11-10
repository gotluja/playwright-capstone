import AxeBuilder from '@axe-core/playwright';
import { test, expect } from '../fixtures/test';

test('homepage meets accessibility checks and visual baseline', async ({ page, homePage }, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium', 'Accessibility and visual baselines run in Chromium only.');
  await homePage.open();

  if (testInfo.project.name === 'chromium') {
    await expect(homePage.heading).toHaveScreenshot('store-home-heading.png');
  }

  const accessibility = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  const seriousViolations = accessibility.violations.filter(
    violation => violation.impact === 'serious' || violation.impact === 'critical',
  );
  expect(seriousViolations, JSON.stringify(seriousViolations, null, 2)).toHaveLength(0);
});

test('API responses can be isolated with route mocking', async ({ page }) => {
  await page.route('**/api/mock-catalog', route =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ items: [{ id: 'tool-1', name: 'Mock Pliers' }] }),
    }),
  );
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  const response = await page.evaluate(async () => {
    const result = await fetch('/api/mock-catalog');
    return result.json();
  });

  expect(response).toEqual({ items: [{ id: 'tool-1', name: 'Mock Pliers' }] });
});
