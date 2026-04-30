import { test, expect, Page } from '@playwright/test';

async function gotoHomeWithRetry(page: Page) {
  for (let i = 0; i < 3; i++) {
    await page.goto('/');
    const counter = page.getByTestId('counter');
    try {
      await counter.waitFor({ state: 'visible', timeout: 2000 });
      return;
    } catch {
      // Retry navigation in case of random error inject on load
    }
  }
  // Final attempt throws if missing
  await expect(page.getByTestId('counter')).toBeVisible();
}

test('flip the card and iterate next until wrapping to 1/15', async ({ page }) => {
  await gotoHomeWithRetry(page);

  const counter = page.getByTestId('counter');
  const card = page.getByTestId('card');
  const transformInner = page.getByTestId('card-inner');
  const next = page.getByTestId('next-btn');

  // Flip each card once, then move to next
  for (let index = 1; index <= 15; index++) {
    await expect(counter).toHaveText(`${index} / 15`);

    const classBefore = await transformInner.getAttribute('class');
    const wasFlippedBefore = (classBefore ?? '').includes('rotate-y-180');

    await card.click({ force: true });
    await page.waitForTimeout(600);

    const classAfter = await transformInner.getAttribute('class');
    const isFlippedAfter = (classAfter ?? '').includes('rotate-y-180');
    expect(isFlippedAfter).not.toBe(wasFlippedBefore);

    if (index < 15) {
      await next.click();
    }
  }

  // After flipping the 15th card, going next should wrap to 1 / 15
  await next.click();
  await expect(counter).toHaveText('1 / 15');
});


