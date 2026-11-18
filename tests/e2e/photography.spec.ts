import { expect, test } from '@playwright/test';
import { introductionMedia, introductionPlaceholder } from '../../src/config/introduction-media';
import { industrialPhotography } from '../../src/config/industrial-photography';
import { blockMedia } from './media-routes';

test('approved photographs load through Next Image while held placements stay schematic', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  for (const [selector, media] of [
    ['.introduction-figure', industrialPhotography.company],
    ['#industry-mining-mineral-processing .industry-figure', industrialPhotography.mining],
    ['#industry-manufacturing .industry-figure', industrialPhotography.manufacturing],
    ['#industry-agro-processing .industry-figure', industrialPhotography.agro],
  ] as const) {
    const figure = page.locator(selector);
    await figure.scrollIntoViewIfNeeded();
    await expect(figure).toHaveAttribute('data-media-kind', 'image');
    const image = figure.getByRole('img', { name: media.alt });
    await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
    await expect(image).toHaveAttribute('src', /\/_next\/image\?/);
    await expect(figure.locator('figcaption')).toHaveText(media.caption);
  }
  await expect(page.locator('#industry-civil-infrastructure .industry-figure')).toHaveAttribute('data-media-kind', 'placeholder');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator('#industrial-solutions').scrollIntoViewIfNeeded();
  for (const [slug, kind] of [['industrial-chemicals','image'],['consumables-spares','image'],['earthmoving-construction','placeholder'],['elution-gold-processing','placeholder'],['lubricants-fluids','placeholder']] as const) {
    await page.getByRole('combobox', { name: 'Choose a division' }).selectOption(slug);
    const figure = page.locator('.solution-panel[data-active=true] .solution-media');
    await expect(figure).toHaveAttribute('data-media-kind', kind);
    await expect.poll(() => figure.locator('img').evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
  }
});

test('failed optimized photograph recovers to the original labelled schematic without resizing its frame', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await blockMedia(page, [introductionMedia.src]);
  await page.goto('/');
  const figure = page.locator('.introduction-figure');
  await figure.scrollIntoViewIfNeeded();
  await expect(figure).toHaveAttribute('data-media-failed', 'true');
  await expect(figure).toHaveAttribute('data-media-kind', 'placeholder');
  await expect.poll(() => figure.getByRole('img').evaluate((element: HTMLImageElement) => new URL(element.src).pathname)).toBe(introductionPlaceholder.src);
  await expect(figure.locator('figcaption')).toHaveText(introductionPlaceholder.caption);
  const bounds = await figure.locator('.introduction-image-mask').boundingBox();
  expect(bounds!.height / bounds!.width).toBeCloseTo(page.viewportSize()!.width >= 1024 ? 6 / 5 : 3 / 4, 1);
});
