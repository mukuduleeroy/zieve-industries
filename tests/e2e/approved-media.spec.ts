import { expect, test } from '@playwright/test';
import { approvedPhotography } from '../../src/config/approved-photography';
import { solutionPlaceholders } from '../../src/config/solutions-media';
import { industryPlaceholders } from '../../src/config/industry-media';
import { blockMedia } from './media-routes';

test('hero fill parents have geometry and entry/selected solution images use contextual loading', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/');
    const photo = page.locator('#hero picture img');
    await expect.poll(() => photo.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
    expect(await photo.evaluate(el => getComputedStyle(el.parentElement!).position)).toMatch(/^(absolute|relative|fixed)$/);
    const image = (await photo.boundingBox())!, parent = (await page.locator('.hero-picture').boundingBox())!;
    expect(parent.width).toBeGreaterThan(0); expect(parent.height).toBeGreaterThan(0);
    expect(image.width).toBeCloseTo(parent.width, 0); expect(image.height).toBeCloseTo(parent.height, 0);
    await expect(photo).toHaveAttribute('loading', 'eager');
    await expect(page.locator('.hero-placeholder-image')).toHaveAttribute('loading', 'eager');
    await expect(page.locator('.solution-panel[data-active=true] img')).toHaveAttribute('loading', 'lazy');
    await page.goto('/#solution-panel-consumables-spares');
    const spares = page.locator('#solution-panel-consumables-spares');
    await expect(spares).toHaveAttribute('data-active', 'true');
    await expect(spares.locator('img')).toHaveAttribute('loading', 'eager');
    await expect(page.locator('.solution-panel[data-active=false] img')).toHaveCount(0);
    await page.goto('/#industrial-solutions');
    await expect(page.locator('.solution-panel[data-active=true] img')).toHaveAttribute('loading', 'eager');
  }
  await page.locator('#solution-selection').selectOption('industrial-chemicals');
  await expect(page.locator('#solution-panel-industrial-chemicals')).toHaveAttribute('data-active', 'true');
  await expect(page.locator('#solution-panel-industrial-chemicals img')).toHaveAttribute('loading', 'eager');
});

test('each newly approved photograph retains its original independent schematic on failure', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await blockMedia(page, Object.values(approvedPhotography).map(media => media.src));
  for (const [slug, fallback] of [['earthmoving-construction', solutionPlaceholders['earthmoving-construction']], ['lubricants-fluids', solutionPlaceholders['lubricants-fluids']]] as const) {
    await page.goto(`/#solution-panel-${slug}`);
    const figure = page.locator(`#solution-panel-${slug} figure`);
    await expect(figure).toHaveAttribute('data-media-failed', 'true');
    await expect(figure).toHaveAttribute('data-media-kind', 'placeholder');
    await expect(figure.getByRole('img')).toHaveAttribute('alt', fallback.alt);
    await expect(figure.locator('figcaption')).toHaveText(fallback.caption);
    expect((await figure.locator('.solution-media-frame').boundingBox())!.height).toBeGreaterThan(100);
  }
  await page.goto('/#industry-civil-infrastructure');
  const figure = page.locator('#industry-civil-infrastructure figure');
  await expect(figure).toHaveAttribute('data-media-failed', 'true');
  await expect(figure).toHaveAttribute('data-media-kind', 'placeholder');
  await expect(figure.getByRole('img')).toHaveAttribute('alt', industryPlaceholders['civil-infrastructure'].alt);
  await expect(figure.locator('figcaption')).toHaveText(industryPlaceholders['civil-infrastructure'].caption);
});
