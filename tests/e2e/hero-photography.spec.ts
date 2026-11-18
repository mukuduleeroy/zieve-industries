import { expect, test } from '@playwright/test';
import { heroMedia, heroPlaceholder } from '../../src/config/hero-media';
import { blockMedia } from './media-routes';

test('R1 selects one optimized crop, stays decorative and preserves all hero content', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [390, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    const requests: string[] = [];
    const listener = (request: import('@playwright/test').Request) => { if (request.url().includes('sunrise-excavator-')) requests.push(request.url()); };
    page.on('request', listener);
    await page.goto('/');
    const photo = page.locator('#hero picture img');
    await expect.poll(() => photo.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
    const variant = width < 768 ? 'mobile-focus' : 'desktop';
    expect(await photo.evaluate((image: HTMLImageElement) => decodeURIComponent(image.currentSrc))).toContain(`sunrise-excavator-${variant}.webp`);
    expect(requests.length).toBeGreaterThan(0);
    expect(requests.every(url => decodeURIComponent(url).includes(`sunrise-excavator-${variant}.webp`))).toBe(true);
    await expect(photo).toHaveAttribute('alt', '');
    await expect(photo).toHaveAttribute('fetchpriority', 'high');
    await expect(page.locator('#hero h1')).toHaveCount(1);
    await expect(page.locator('.hero-media-caption')).toHaveText(heroMedia.caption);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    page.off('request', listener);
  }
});

test('failed R1 photograph reveals the retained schematic and accurate fallback caption', async ({ page }) => {
  if (heroMedia.kind !== 'image') throw Error('R1 photography must be configured');
  await blockMedia(page, [heroMedia.src, heroMedia.mobileSrc ?? heroMedia.src]);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('.hero-visual')).toHaveAttribute('data-media-kind', 'placeholder');
  await expect(page.locator('.hero-visual')).toHaveAttribute('data-media-failed', 'true');
  await expect(page.locator('.hero-media-caption')).toHaveText(heroPlaceholder.caption);
  await expect(page.locator('#hero picture')).toHaveCount(0);
  await expect.poll(() => page.locator('#hero img').evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
  await expect(page.locator('#hero h1')).toBeVisible();
});

test('enlarged text and visual magnification keep the hero actions available', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  const quote = page.locator('#hero .hero-action-secondary');
  await quote.focus();
  await expect(quote).toBeFocused();
  await expect(quote).toBeInViewport();
  const cdp = await page.context().newCDPSession(page);
  // CDP visual magnification exercises pinch-style zoom, not native browser-chrome zoom.
  await cdp.send('Emulation.setPageScaleFactor', { pageScaleFactor: 2 });
  expect(await page.evaluate(() => visualViewport!.scale)).toBe(2);
  await expect(quote).toBeFocused();
  await cdp.send('Emulation.setPageScaleFactor', { pageScaleFactor: 1 });
  await cdp.detach();
});
