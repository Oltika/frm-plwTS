import { test, expect } from '@playwright/test';

test('homepage loads and shows title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/spanish-word-flip-flash/i);
  // Consider the app loaded when either counter or next button is visible
  await page.waitForSelector('[data-testid="counter"], [data-testid="next-btn"]', { state: 'visible' });
});


