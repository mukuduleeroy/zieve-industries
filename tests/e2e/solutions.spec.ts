import { blockMedia } from './media-routes';
import { expect, test } from '@playwright/test';
import { solutionDivisions as divisions } from '../../src/content/solutions-showcase';
import { solutionsMedia, solutionPlaceholders } from '../../src/config/solutions-media';
const section = '#industrial-solutions';
const activePanel = `${section} .solution-panel[data-active="true"]`;

test.describe('Desktop solutions', () => {
  test.use({ viewport: { width: 1440, height: 1000 }, isMobile: false });
  test('default, pointer and keyboard selection synchronize text, media and links', async ({ page }) => {
    await page.goto('/');
    await page.locator(section).scrollIntoViewIfNeeded();
    const group = page.getByRole('group', { name: 'Choose an industrial solution' });
    await expect(group.getByRole('button')).toHaveCount(5);
    await expect(group.getByRole('button', { name: divisions[0].name, exact: true })).toHaveAttribute('aria-pressed', 'true');
    for (const division of divisions) {
      await group.getByRole('button', { name: division.name, exact: true }).click();
      const panel = page.locator(activePanel);
      await expect(panel.getByRole('heading', { level: 3 })).toHaveText(division.headline);
      await expect(panel.getByText(division.description, { exact: true })).toBeVisible();
      await expect(panel.locator('.solution-panel-number')).toHaveText(`Division ${division.number} / 05`);
      await expect(panel.getByRole('link')).toHaveAttribute('href', division.href);
      await expect(panel.getByRole('img')).toHaveAttribute('alt', solutionsMedia[division.slug].alt);
      await expect(group.getByRole('button', { pressed: true })).toHaveCount(1);
    }
    const first = group.getByRole('button', { name: divisions[0].name, exact: true });
    await first.focus();
    await page.keyboard.press('ArrowDown');
    const second = group.getByRole('button', { name: divisions[1].name, exact: true });
    await expect(second).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(second).toHaveAttribute('aria-pressed', 'true');
    await page.keyboard.press('End');
    await page.keyboard.press('Space');
    await expect(page.locator(activePanel).getByRole('heading')).toHaveText(divisions[4].headline);
    await page.keyboard.press('Home');
    await expect(first).toBeFocused();
    await page.locator(activePanel).getByRole('link').click();
    await expect(page).toHaveURL(divisions[4].href);
    await expect(page.locator(activePanel)).toHaveAttribute('id', `solution-panel-${divisions[4].slug}`);
    await expect(page.locator(activePanel)).toBeFocused();
  });
  test('rapid changes settle on the latest choice without changing section dimensions', async ({ page }) => {
    await page.goto('/');
    await page.locator(section).scrollIntoViewIfNeeded();
    const before = await page.locator(section).boundingBox();
    await page.locator('.solutions-navigation').evaluate(element => {
      const buttons = element.querySelectorAll<HTMLButtonElement>('button');
      for (const index of [4, 1, 3, 0, 2, 4, 2]) buttons[index].click();
    });
    const panel = page.locator(activePanel);
    await expect(panel.getByRole('heading')).toHaveText(divisions[2].headline);
    await expect(panel.locator('.solution-panel-copy')).toHaveCSS('opacity', '1');
    await expect(panel.getByRole('link')).toHaveAttribute('href', divisions[2].href);
    await expect(page.locator(`${section} .solution-panel:not([data-active="true"])`)).toHaveCount(4);
    expect((await page.locator(section).boundingBox())!.height).toBe(before!.height);
  });
});

test('mobile selector preserves content, focus and stable dimensions', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.locator(section).scrollIntoViewIfNeeded();
  const selector = page.getByRole('combobox', { name: 'Choose a division' });
  await expect(selector).toBeVisible();
  await expect(page.locator('.solutions-navigation')).not.toBeVisible();
  await expect(selector.locator('option')).toHaveCount(5);
  const initial = await page.locator(section).boundingBox();
  await selector.focus();
  for (const division of divisions) {
    await selector.selectOption(division.slug);
    await expect(page.locator(activePanel).getByRole('heading')).toHaveText(division.headline);
    await expect(page.locator(activePanel).getByRole('link')).toHaveAttribute('href', division.href);
    await expect(selector).toBeFocused();
    expect((await page.locator(section).boundingBox())!.height).toBe(initial!.height);
  }
});

test('responsive layout, reduced motion and all media fallbacks remain usable', async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
    await page.locator(section).scrollIntoViewIfNeeded();
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const panel = page.locator(activePanel);
    await expect(panel.locator('.solution-image-reveal')).toHaveCSS('opacity', '1');
    await expect(panel.locator('.solution-panel-copy')).toHaveCSS('transform', 'none');
    if (width === 390 || width === 1440) await page.locator(section).screenshot({ path: testInfo.outputPath(`solutions-${width}.png`), animations: 'disabled', style: '.site-header, .skip-link { visibility: hidden !important; }' });
  }
  await blockMedia(page, [...Object.values(solutionsMedia), ...Object.values(solutionPlaceholders)].map(media => media.src));
  // A fresh document ensures even the default, already-loaded SVG is requested again.
  await page.reload();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator(section).scrollIntoViewIfNeeded();
  for (const division of divisions) {
    await page.getByRole('combobox', { name: 'Choose a division' }).selectOption(division.slug);
    const panel = page.locator(activePanel);
    await expect(panel.locator('.solution-media')).toHaveAttribute('data-media-failed', 'true');
    await expect(panel.getByRole('img', { name: 'Division illustration unavailable. Approved photography pending.' })).toBeVisible();
    await expect(panel.getByText(division.description, { exact: true })).toBeVisible();
  }
});

test('active state survives layout changes and exposes only one panel to keyboard users', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  await page.locator(section).scrollIntoViewIfNeeded();
  await page.getByRole('button', { name: divisions[3].name, exact: true }).click();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByRole('combobox', { name: 'Choose a division' })).toHaveValue(divisions[3].slug);
  await expect(page.locator(section).getByRole('link')).toHaveCount(1);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await expect(page.getByRole('button', { name: divisions[3].name, exact: true })).toHaveAttribute('aria-pressed', 'true');
});
