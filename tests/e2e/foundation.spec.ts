import { expect, test } from '@playwright/test';
test('foundation is accessible by keyboard and fits the viewport', async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/development/foundation');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('A foundation for what comes next.');
  await expect(page.getByRole('img', { name: 'Zieve Industries' })).toBeVisible();
  await expect.poll(() => page.getByRole('img', { name: 'Zieve Industries' }).evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
  await page.screenshot({ path: testInfo.outputPath('foundation.png'), fullPage: true });
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('main')).toBeFocused();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole('link', { name: 'Explore the system' }).click();
  await expect(page).toHaveURL(/#system$/);
  expect(errors).toEqual([]);
});
test('reduced motion preserves visible content', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/development/foundation');
  await expect(page.getByRole('heading', { name: 'Profile-led. Built to extend.' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Foundation preview' })).toBeDisabled();
});
