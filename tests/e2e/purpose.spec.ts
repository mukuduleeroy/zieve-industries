import { expect, test } from '@playwright/test';
import { purposeContent as content, purposeValues } from '../../src/content/purpose';
const sectionId = '#our-purpose';

test('official vision, mission and five values follow the correct reading order', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const section = page.locator(sectionId);
  await expect(page.locator('main h1')).toHaveCount(1);
  await expect(section.getByRole('heading', { level: 2 })).toHaveText(content.heading);
  await expect(section.getByRole('heading', { level: 3 })).toHaveText([content.vision.label, content.mission.label, content.valuesLabel]);
  await expect(section.locator('.purpose-vision-statement')).toHaveText(content.vision.statement);
  await expect(section.locator('.purpose-mission-statement')).toHaveText(content.mission.statement);
  await expect(section.getByRole('heading', { level: 4 })).toHaveText(purposeValues.map(value => value.name));
  for (const value of purposeValues) await expect(section.getByText(value.description, { exact: true })).toHaveCount(1);
  const order = await section.locator('#purpose-vision, #purpose-mission, #purpose-values').evaluateAll(elements => elements.map(element => element.id));
  expect(order).toEqual(['purpose-vision', 'purpose-mission', 'purpose-values']);
  await expect(section.getByRole('button')).toHaveCount(0);
  expect(await page.evaluate(() => document.querySelector('#our-purpose')!.getBoundingClientRect().top - document.querySelector('#zieve-advantage')!.getBoundingClientRect().bottom)).toBe(0);
  expect(errors).toEqual([]);
});

test('three editorial movements remain readable at mobile, tablet and desktop widths', async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const vision = page.locator('.purpose-vision-statement');
    await vision.scrollIntoViewIfNeeded();
    const visionBox = await vision.boundingBox();
    expect(visionBox!.x).toBeGreaterThanOrEqual(19);
    expect(visionBox!.x + visionBox!.width).toBeLessThanOrEqual(width - 19);
    const heading = await page.locator('.purpose-mission-title').boundingBox();
    const mission = await page.locator('.purpose-mission-statement').boundingBox();
    if (width >= 1024) expect(mission!.x).toBeGreaterThan(heading!.x + heading!.width);
    else expect(mission!.y).toBeGreaterThan(heading!.y + heading!.height);
    const values = await page.locator('.purpose-value').all();
    const first = await values[0].boundingBox();
    const second = await values[1].boundingBox();
    if (width < 768) expect(second!.y).toBeGreaterThan(first!.y + first!.height);
    else expect(second!.x).toBeGreaterThan(first!.x);
    if (width === 1440) {
      const last = await values[4].boundingBox();
      expect(last!.y).toBeCloseTo(first!.y, 0);
    }
    if (width === 390 || width === 1440) await page.locator(sectionId).screenshot({ path: testInfo.outputPath(`purpose-${width}.png`), animations: 'disabled', style: '.site-header, .skip-link { visibility: hidden !important; }' });
  }
});

test('reduced motion restores all purpose text, values and divider styles', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.locator('#purpose-vision').scrollIntoViewIfNeeded();
  await expect(page.locator('.purpose-vision-statement')).toHaveCSS('opacity', '1');
  await expect(page.locator('.purpose-vision-statement')).toHaveCSS('transform', 'none');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect.poll(() => page.locator('.purpose-vision-statement').getAttribute('style')).toMatch(/opacity/);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const target of await page.locator(`${sectionId} [data-purpose-reveal], ${sectionId} [data-purpose-value]`).all()) {
    await expect(target).toHaveCSS('opacity', '1');
    await expect(target).toHaveCSS('transform', 'none');
  }
  for (const divider of await page.locator(`${sectionId} [data-purpose-divider]`).all()) await expect(divider).toHaveCSS('transform', 'none');
});

test('purpose entrances preserve document geometry and clean up after navigation', async ({ page }) => {
  await page.goto('/');
  const section = page.locator(sectionId);
  const before = await section.evaluate(element => ({ height: element.getBoundingClientRect().height, top: element.getBoundingClientRect().top + scrollY }));
  await page.locator('#purpose-values').scrollIntoViewIfNeeded();
  await expect(page.locator('[data-purpose-value]').last()).toHaveCSS('opacity', '1');
  expect(await section.evaluate(element => ({ height: element.getBoundingClientRect().height, top: element.getBoundingClientRect().top + scrollY }))).toEqual(before);
  await page.getByRole('banner').getByRole('link', { name: 'Zieve Industries home' }).click();
  await page.locator('#hero').getByRole('link', { name: 'Explore Our Solutions' }).click();
  await expect(page).toHaveURL('/#industrial-solutions');
  await page.goto('/solutions');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Our Solutions');
  await page.goBack();
  await page.locator('#purpose-values').scrollIntoViewIfNeeded();
  await expect(section.getByRole('heading', { name: purposeValues[4].name, level: 4 })).toBeVisible();
});

test('purpose stays fully readable without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/');
  await page.locator('#purpose-vision').scrollIntoViewIfNeeded();
  await expect(page.locator('.purpose-vision-statement')).toBeVisible();
  await page.locator('#purpose-mission').scrollIntoViewIfNeeded();
  await expect(page.locator('.purpose-mission-statement')).toBeVisible();
  await page.locator('#purpose-values').scrollIntoViewIfNeeded();
  for (const value of purposeValues) await expect(page.locator(sectionId).getByText(value.description, { exact: true })).toBeVisible();
  await context.close();
});
