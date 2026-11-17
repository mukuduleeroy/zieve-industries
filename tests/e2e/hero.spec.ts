import { expect, test } from '@playwright/test';
import { heroContent } from '../../src/content/hero';
import { heroPlaceholder } from '../../src/config/hero-media';

test('hero provides the exact heading, copy, usable CTAs and end marker', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  const hero = page.getByRole('region', { name: 'Equipping Industry. Empowering Growth.' });
  await expect(page.locator('main h1')).toHaveCount(1);
  await expect(hero).toHaveCSS('padding-top', '0px');
  await expect(hero).toHaveCSS('padding-bottom', '0px');
  await expect(hero.getByRole('heading', { level: 1 })).toHaveText(heroContent.headline.join(' '));
  await expect(hero.getByText(heroContent.eyebrow)).toBeVisible();
  await expect(hero.getByText(heroContent.supporting)).toBeVisible();
  await expect(hero.getByRole('link', { name: heroContent.primaryAction.label })).toHaveAttribute('href', heroContent.primaryAction.href);
  await expect(hero.getByRole('link', { name: heroContent.secondaryAction.label })).toHaveAttribute('href', heroContent.secondaryAction.href);
  await hero.getByRole('link', { name: heroContent.scrollAction.accessibleLabel }).click();
  await expect(page).toHaveURL(/#hero-end$/);
  await expect(page.locator('#hero-end')).toBeFocused();
  await hero.getByRole('link', { name: heroContent.primaryAction.label }).click();
  await expect(page).toHaveURL('/#industrial-solutions');
  expect(errors).toEqual([]);
});

test('hero fits desktop, mobile and short landscape screens without clipped actions', async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  for (const viewport of [{ width: 320, height: 568 }, { width: 390, height: 844 }, { width: 844, height: 390 }, { width: 768, height: 1024 }, { width: 1440, height: 900 }, { width: 1920, height: 1080 }]) {
    await page.setViewportSize(viewport);
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const hero = page.locator('#hero');
    await expect.poll(() => page.evaluate(() => Math.abs(document.querySelector('#hero')!.getBoundingClientRect().top - document.querySelector('header')!.getBoundingClientRect().bottom))).toBeLessThan(1);
    await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
    const bounds = await hero.boundingBox();
    const contentBounds = await hero.locator('.hero-editorial').boundingBox();
    expect(contentBounds!.x).toBeGreaterThan(0);
    expect(contentBounds!.x + contentBounds!.width).toBeLessThanOrEqual(viewport.width);
    for (const action of [heroContent.primaryAction, heroContent.secondaryAction]) {
      const button = await hero.getByRole('link', { name: action.label }).boundingBox();
      expect(button!.height).toBeGreaterThanOrEqual(48);
      expect(button!.y + button!.height, `${viewport.width}×${viewport.height}`).toBeLessThan(bounds!.y + bounds!.height - 60);
    }
    if (viewport.width === 1440) {
      expect(bounds!.height).toBeGreaterThanOrEqual(viewport.height * 0.75);
      expect(bounds!.height).toBeLessThanOrEqual(viewport.height);
      for (const line of await hero.locator('[data-hero-headline]').all()) {
        expect(await line.evaluate(element => element.getBoundingClientRect().height <= parseFloat(getComputedStyle(element).fontSize) * 1.3)).toBe(true);
      }
      await page.screenshot({ path: testInfo.outputPath('hero-desktop.png'), fullPage: true, animations: 'disabled' });
    }
    if (viewport.width === 390) await page.screenshot({ path: testInfo.outputPath('hero-mobile.png'), fullPage: true, animations: 'disabled' });
  }
});

test('reduced motion stays static and preference changes clean up entrance styles', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const videos: string[] = [];
  page.on('request', request => { if (/\.(mp4|webm)(\?|$)/.test(request.url())) videos.push(request.url()); });
  await page.goto('/');
  await expect(page.locator('[data-hero-headline]').first()).toHaveCSS('opacity', '1');
  await expect(page.locator('[data-hero-headline]').first()).toHaveCSS('transform', 'none');
  await expect(page.locator('.hero-scroll-track > span')).toHaveCSS('animation-name', 'none');
  await expect(page.locator('#hero video')).toHaveCount(0);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect.poll(() => page.locator('[data-hero-headline]').first().getAttribute('style')).toMatch(/opacity/);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const selector of ['[data-hero-headline]', '[data-hero-copy]', '[data-hero-action]']) {
    for (const item of await page.locator(selector).all()) {
      await expect(item).toHaveCSS('opacity', '1');
      await expect(item).toHaveCSS('transform', 'none');
    }
  }
  expect(videos).toEqual([]);
});

test('missing placeholder still provides a readable stable navy hero', async ({ page }) => {
  await page.route(`**${heroPlaceholder.src}`, route => route.abort());
  await page.goto('/');
  await expect(page.locator('.hero-visual')).toHaveAttribute('data-media-failed', 'true');
  await expect(page.locator('#hero')).toHaveCSS('background-color', 'rgb(11, 34, 51)');
  await expect(page.locator('#hero h1')).toBeVisible();
  await expect(page.locator('.hero-media-caption')).toHaveText(heroPlaceholder.caption);
  await expect(page.locator('#hero').getByRole('link', { name: heroContent.primaryAction.label })).toBeVisible();
  await expect(page.locator('#hero img')).toHaveCount(0);
});

test('hero content and navigation work without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.locator('#hero h1')).toBeVisible();
  await expect(page.locator('[data-hero-copy]')).toBeVisible();
  await page.locator('#hero').getByRole('link', { name: heroContent.primaryAction.label }).click();
  await expect(page).toHaveURL('/#industrial-solutions');
  await context.close();
});

test('hero and header keep geometry through animation, dropdown and mobile modal', async ({ page }) => {
  await page.goto('/');
  const header = page.getByRole('banner');
  const before = await header.boundingBox();
  const heroTop = await page.locator('#hero').evaluate(element => element.getBoundingClientRect().top + scrollY);
  await expect(page.locator('[data-hero-copy]')).toHaveCSS('opacity', '1');
  expect((await header.boundingBox())!.height).toBe(before!.height);
  expect(await page.locator('#hero').evaluate(element => element.getBoundingClientRect().top + scrollY)).toBe(heroTop);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: 'Open navigation menu' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(page.locator('#hero').getByRole('link', { name: heroContent.primaryAction.label })).toBeVisible();
  await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe('');
});
