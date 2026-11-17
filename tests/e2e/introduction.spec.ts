import { expect, test } from '@playwright/test';
import { introductionContent as content } from '../../src/content/introduction';
import { introductionMedia } from '../../src/config/introduction-media';

const sectionSelector = '#company-introduction';

test('introduction preserves the approved narrative and hero boundary', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.locator('main h1')).toHaveCount(1);
  const section = page.getByRole('region', { name: content.heading });
  await expect(section.getByRole('heading', { level: 2 })).toHaveText(content.heading);
  await page.getByRole('link', { name: 'Scroll to the end of the hero' }).click();
  await expect(page.locator('#hero-end')).toBeFocused();
  await expect(section.getByText(content.eyebrow)).toBeVisible();
  for (const paragraph of content.paragraphs) await expect(section.getByText(paragraph, { exact: true })).toBeVisible();
  await expect(section.getByText(content.closing, { exact: true })).toBeVisible();
  await expect(section.getByRole('img', { name: introductionMedia.alt })).toBeVisible();
  await expect(section.locator('figcaption')).toHaveText(introductionMedia.caption);
  const transition = await page.evaluate(() => ({
    gap: document.querySelector('#company-introduction')!.getBoundingClientRect().top - document.querySelector('#hero')!.getBoundingClientRect().bottom,
    headerHeight: document.querySelector('header')!.getBoundingClientRect().height,
  }));
  expect(transition.gap).toBe(0);
  await expect(section).toHaveCSS('background-color', 'rgb(245, 247, 248)');
  await expect(page.locator('#hero')).toHaveCSS('background-color', 'rgb(11, 34, 51)');
  await expect(page.getByRole('banner')).toHaveAttribute('data-scrolled', 'true');
  expect((await page.getByRole('banner').boundingBox())!.height).toBe(transition.headerHeight);
  expect(errors).toEqual([]);
});

test('editorial columns become an ordered mobile stack without overflow', async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  for (const viewport of [{ width: 320, height: 568 }, { width: 390, height: 844 }, { width: 768, height: 1024 }, { width: 1024, height: 768 }, { width: 1440, height: 1000 }]) {
    await page.setViewportSize(viewport);
    await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
    await page.locator(sectionSelector).scrollIntoViewIfNeeded();
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const editorial = await page.locator('.introduction-editorial').boundingBox();
    const figure = await page.locator('.introduction-figure').boundingBox();
    expect(editorial!.x).toBeGreaterThanOrEqual(20);
    expect(figure!.x + figure!.width).toBeLessThanOrEqual(viewport.width - 19);
    if (viewport.width >= 1024) {
      expect(figure!.x).toBeGreaterThan(editorial!.x + editorial!.width);
      expect(Math.abs((figure!.y + figure!.height / 2) - (editorial!.y + editorial!.height / 2))).toBeLessThan(2);
    } else {
      expect(figure!.y).toBeGreaterThan(editorial!.y + editorial!.height);
    }
    const frame = await page.locator('.introduction-image-mask').boundingBox();
    expect(frame!.height / frame!.width).toBeCloseTo(6 / 5, 1);
    if (viewport.width === 1440) await page.locator(sectionSelector).screenshot({ path: testInfo.outputPath('introduction-desktop.png'), animations: 'disabled', style: '.site-header, .skip-link { visibility: hidden !important; }' });
    if (viewport.width === 390) await page.locator(sectionSelector).screenshot({ path: testInfo.outputPath('introduction-mobile.png'), animations: 'disabled', style: '.site-header, .skip-link { visibility: hidden !important; }' });
  }
});

test('reduced motion reveals content and removes desktop parallax on preference change', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.locator(sectionSelector).scrollIntoViewIfNeeded();
  const image = page.locator('[data-intro-parallax]');
  await expect(image).toHaveCSS('transform', 'none');
  await expect(page.locator('[data-intro-image-mask]')).toHaveCSS('clip-path', 'none');
  await expect(page.locator('[data-intro-heading]')).toHaveCSS('opacity', '1');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect.poll(() => page.locator('[data-intro-image-mask]').getAttribute('style')).toMatch(/clip-path/);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const target of await page.locator('[data-intro-heading], [data-intro-eyebrow], [data-intro-paragraph], [data-intro-closing]').all()) {
    await expect(target).toHaveCSS('opacity', '1');
    await expect(target).toHaveCSS('transform', 'none');
  }
  await expect(image).toHaveCSS('transform', 'none');
  await expect(page.locator('[data-intro-image-mask]')).toHaveCSS('clip-path', 'none');
  await expect(page.locator('[data-intro-divider]')).toHaveCSS('transform', 'none');
});

test('missing schematic retains accessible media fallback and stable dimensions', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.route(`**${introductionMedia.src}`, route => route.abort());
  await page.goto('/');
  await page.locator(sectionSelector).scrollIntoViewIfNeeded();
  const figure = page.locator('.introduction-figure');
  await expect(figure).toHaveAttribute('data-media-failed', 'true');
  await expect(figure.getByRole('img', { name: 'Industrial visual unavailable. Approved company photography is pending.' })).toBeVisible();
  await expect(figure.locator('img')).toHaveCount(0);
  await expect(figure.locator('figcaption')).toHaveText('Visual placeholder unavailable · Approved photography pending');
  const mask = await figure.locator('.introduction-image-mask').boundingBox();
  expect(mask!.height / mask!.width).toBeCloseTo(6 / 5, 1);
  await expect(page.getByRole('heading', { name: content.heading })).toBeVisible();
});

test('entrance and desktop parallax preserve layout and clean up across navigation', async ({ page }, testInfo) => {
  await page.goto('/');
  await page.locator(sectionSelector).scrollIntoViewIfNeeded();
  const section = page.locator(sectionSelector);
  const before = await section.boundingBox();
  await expect(page.locator('[data-intro-image-mask]')).toHaveCSS('clip-path', 'none');
  await expect(page.locator('[data-intro-closing]')).toHaveCSS('opacity', '1');
  const after = await section.boundingBox();
  expect(after!.height).toBe(before!.height);
  if (testInfo.project.name === 'desktop') {
    await expect(page.locator('[data-intro-parallax]')).not.toHaveCSS('transform', 'none');
    const delta = () => page.locator('[data-intro-parallax]').evaluate(element => new DOMMatrix(getComputedStyle(element).transform).m42);
    const initial = await delta();
    await page.evaluate(() => scrollBy(0, 100));
    await expect.poll(delta).not.toBe(initial);
    expect(Math.abs(await delta())).toBeLessThanOrEqual(12.1);
  } else await expect(page.locator('[data-intro-parallax]')).toHaveCSS('transform', 'none');
  await page.getByRole('banner').getByRole('link', { name: 'Zieve Industries home' }).click();
  await page.locator('#hero').getByRole('link', { name: 'Explore Our Solutions' }).click();
  await expect(page).toHaveURL('/#industrial-solutions');
  await page.goto('/solutions');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Our Solutions');
  await page.goBack();
  await page.locator(sectionSelector).scrollIntoViewIfNeeded();
  await expect(page.getByRole('heading', { name: content.heading })).toBeVisible();
});

test('introduction remains readable without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/');
  await page.locator(sectionSelector).scrollIntoViewIfNeeded();
  await expect(page.getByRole('heading', { name: content.heading, level: 2 })).toBeVisible();
  for (const paragraph of content.paragraphs) await expect(page.getByText(paragraph, { exact: true })).toBeVisible();
  await expect(page.locator('.introduction-image-mask')).toHaveCSS('clip-path', 'none');
  await context.close();
});
