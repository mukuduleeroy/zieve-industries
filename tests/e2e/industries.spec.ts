import { blockMedia } from './media-routes';
import { expect, test } from '@playwright/test';
import { industryExperienceContent as content, industrySectors } from '../../src/content/industry-experience';
import { industryMedia, industryPlaceholders } from '../../src/config/industry-media';
const sectionId = '#industries-we-serve';

test('four sectors preserve content, hierarchy, solutions links and transitions', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const section = page.locator(sectionId);
  await expect(page.locator('main h1')).toHaveCount(1);
  await expect(section.getByRole('heading', { level: 2 })).toHaveText(content.heading);
  await expect(section.getByRole('article')).toHaveCount(4);
  for (const sector of industrySectors) {
    const panel = section.getByRole('article', { name: sector.name });
    await panel.scrollIntoViewIfNeeded();
    await expect(panel.getByRole('heading', { level: 3 })).toHaveText(sector.name);
    await expect(panel.getByText(sector.headline, { exact: true })).toBeVisible();
    await expect(panel.getByText(sector.description, { exact: true })).toBeVisible();
    if (sector.procurementNote) await expect(panel.getByText(sector.procurementNote)).toBeVisible();
    await expect(panel.getByRole('img')).toHaveAttribute('alt', industryMedia[sector.slug].alt);
    for (const link of sector.solutions) await expect(panel.getByRole('link', { name: link.label, exact: true })).toHaveAttribute('href', link.href);
  }
  expect(await page.evaluate(() => document.querySelector('#industries-we-serve')!.getBoundingClientRect().top - document.querySelector('#industrial-solutions')!.getBoundingClientRect().bottom)).toBe(0);
  await expect(section).toHaveCSS('background-color', 'rgb(11, 34, 51)');
  await expect(page.getByRole('banner')).toHaveAttribute('data-scrolled', 'true');
  const link = section.getByRole('article', { name: industrySectors[3].name }).getByRole('link').first();
  await link.focus();
  await expect(link).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(industrySectors[3].solutions[0].href);
  expect(errors).toEqual([]);
});

test('desktop alternates visuals while tablet and mobile keep content first', async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    for (const [index, sector] of industrySectors.entries()) {
      const panel = page.locator(`#industry-${sector.slug}`);
      await panel.scrollIntoViewIfNeeded();
      const editorial = await panel.locator('.industry-editorial').boundingBox();
      const figure = await panel.locator('.industry-figure').boundingBox();
      expect(editorial!.x).toBeGreaterThanOrEqual(19);
      expect(figure!.x + figure!.width).toBeLessThanOrEqual(width - 19);
      if (width < 1024) expect(figure!.y).toBeGreaterThan(editorial!.y + editorial!.height);
      else if (index % 2 === 0) expect(figure!.x).toBeGreaterThan(editorial!.x + editorial!.width);
      else expect(editorial!.x).toBeGreaterThan(figure!.x + figure!.width);
      const frame = await panel.locator('.industry-image-mask').boundingBox();
      expect(frame!.height / frame!.width).toBeCloseTo(3 / 4, 1);
    }
    if (width === 390 || width === 1440) await page.locator(sectionId).screenshot({ path: testInfo.outputPath(`industries-${width}.png`), animations: 'disabled', style: '.site-header, .skip-link { visibility: hidden !important; }' });
  }
});

test('reduced motion is static and clears mask, number and parallax styles', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const first = page.locator(`#industry-${industrySectors[0].slug}`);
  await first.scrollIntoViewIfNeeded();
  await expect(first.locator('[data-industry-mask]')).toHaveCSS('clip-path', 'none');
  await expect(first.locator('[data-industry-parallax]')).toHaveCSS('transform', 'none');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  // The redesigned stage owns horizontal motion; fallback media stays static.
  await expect(first.locator('[data-industry-mask]')).toHaveCSS('clip-path', 'none');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const panel of await page.locator(`${sectionId} .industry-panel`).all()) {
    await expect(panel.locator('[data-industry-mask]')).toHaveCSS('clip-path', 'none');
    await expect(panel.locator('[data-industry-parallax]')).toHaveCSS('transform', 'none');
    await expect(panel.locator('[data-industry-number]')).toHaveCSS('transform', 'none');
    await expect(panel.locator('[data-industry-divider]')).toHaveCSS('transform', 'none');
  }
});

test('each missing illustration has an accessible fallback without collapsed frames', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await blockMedia(page, [...Object.values(industryMedia), ...Object.values(industryPlaceholders)].map(media => media.src));
  await page.goto('/');
  for (const sector of industrySectors) {
    const panel = page.locator(`#industry-${sector.slug}`);
    await panel.scrollIntoViewIfNeeded();
    await expect(panel.locator('.industry-figure')).toHaveAttribute('data-media-failed', 'true');
    await expect(panel.getByRole('img', { name: 'Sector illustration unavailable. Approved photography pending.' })).toBeVisible();
    const bounds = await panel.locator('.industry-image-mask').boundingBox();
    expect(bounds!.height / bounds!.width).toBeCloseTo(3 / 4, 1);
    await expect(panel.getByText(sector.description, { exact: true })).toBeVisible();
  }
});

test('horizontal stage progresses, reverses, releases and disposes across navigation', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  const scene = page.locator('.industry-scene');
  const first = page.locator(`#industry-${industrySectors[0].slug}`);
  if (testInfo.project.name === 'desktop') {
    await expect(scene).toHaveAttribute('data-horizontal', 'true');
    const geometry = () => scene.evaluate(el => ({ top: el.getBoundingClientRect().top + scrollY, travel: parseFloat((el as HTMLElement).style.getPropertyValue('--industry-travel')), header: document.querySelector('header')!.getBoundingClientRect().height }));
    const scroll = async (fraction: number) => {
      const g = await geometry();
      await page.evaluate(({ g, fraction }) => scrollTo(0, g.top - g.header + g.travel * fraction), { g, fraction });
      await expect.poll(() => page.locator('.industry-sector-list').evaluate(el => new DOMMatrix(getComputedStyle(el).transform).m41)).toBeCloseTo(-g.travel * fraction, 0);
    };
    await scroll(0);
    const top = (await page.locator('.industry-stage').boundingBox())!.y;
    for (const [index, sector] of industrySectors.entries()) {
      await scroll(index / 3);
      const panel = page.locator(`#industry-${sector.slug}`);
      await expect(panel.getByRole('heading')).toBeInViewport();
      await expect.poll(() => panel.locator('img').evaluate(image => image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0)).toBe(true);
      await expect(panel.locator('.industry-figure')).toHaveAttribute('data-media-failed', 'false');
    }
    await scroll(0.5);
    expect((await page.locator('.industry-stage').boundingBox())!.y).toBeCloseTo(top, 0);
    await scroll(1);
    await expect(scene).toHaveAttribute('data-active-index', '3');
    await expect(page.locator('#industry-agro-processing .industry-name')).toBeInViewport();
    await scroll(0.25);
    await expect(scene).toHaveAttribute('data-active-index', '1');
    await scroll(0);
    await first.getByRole('link').first().click();
    await expect(page).toHaveURL(industrySectors[0].solutions[0].href);
    await page.goto('/');
    await expect(scene).toHaveAttribute('data-horizontal', 'true');
    const g = await geometry();
    await page.evaluate(g => scrollTo(0, g.top - g.header + g.travel + 250), g);
    await expect.poll(async () => (await page.locator('.industry-stage').boundingBox())!.y).toBeLessThan(top - 200);
  } else await expect(scene).not.toHaveAttribute('data-horizontal', 'true');
  await first.getByRole('link').first().focus();
  await expect(first.getByRole('link').first()).toBeFocused();
  await expect(scene).not.toHaveAttribute('data-horizontal', 'true');
  await first.getByRole('link').first().click();
  await expect(page).toHaveURL(industrySectors[0].solutions[0].href);
  await page.goto('/solutions');
  await expect(page.locator('.industry-scene')).toHaveCount(0);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Our Solutions');
  await page.goBack();
  await first.scrollIntoViewIfNeeded();
  await expect(first.getByRole('heading')).toBeVisible();
});

test('all sector content and solution links work without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/');
  for (const sector of industrySectors) {
    const panel = page.locator(`#industry-${sector.slug}`);
    await panel.scrollIntoViewIfNeeded();
    await expect(panel.getByRole('heading')).toBeVisible();
    await expect(panel.getByText(sector.description, { exact: true })).toBeVisible();
    await expect(panel.locator('[data-industry-mask]')).toHaveCSS('clip-path', 'none');
  }
  await context.close();
});
