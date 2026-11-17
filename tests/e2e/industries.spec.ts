import { expect, test } from '@playwright/test';
import { industryExperienceContent as content, industrySectors } from '../../src/content/industry-experience';
import { industryPlaceholders } from '../../src/config/industry-media';
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
    await expect(panel.getByRole('img')).toHaveAttribute('alt', industryPlaceholders[sector.slug].alt);
    for (const link of sector.solutions) await expect(panel.getByRole('link', { name: link.label, exact: true })).toHaveAttribute('href', link.href);
  }
  expect(await page.evaluate(() => document.querySelector('#industries-we-serve')!.getBoundingClientRect().top - document.querySelector('#industrial-solutions')!.getBoundingClientRect().bottom)).toBe(0);
  await expect(section).toHaveCSS('background-color', 'rgb(255, 255, 255)');
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
  await expect.poll(() => first.locator('[data-industry-mask]').getAttribute('style')).toMatch(/clip-path/);
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
  for (const media of Object.values(industryPlaceholders)) await page.route(`**${media.src}`, route => route.abort());
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

test('desktop parallax remains small and navigation disposes the sector effects', async ({ page }, testInfo) => {
  await page.goto('/');
  const first = page.locator(`#industry-${industrySectors[0].slug}`);
  await first.scrollIntoViewIfNeeded();
  const before = await first.boundingBox();
  await expect(first.locator('[data-industry-mask]')).toHaveCSS('clip-path', 'none');
  if (testInfo.project.name === 'desktop') {
    const image = first.locator('[data-industry-parallax]');
    await expect(image).not.toHaveCSS('transform', 'none');
    const offset = () => image.evaluate(element => new DOMMatrix(getComputedStyle(element).transform).m42);
    const initial = await offset();
    await page.evaluate(() => scrollBy(0, 100));
    await expect.poll(offset).not.toBe(initial);
    expect(Math.abs(await offset())).toBeLessThanOrEqual(10.1);
  } else await expect(first.locator('[data-industry-parallax]')).toHaveCSS('transform', 'none');
  expect((await first.boundingBox())!.height).toBe(before!.height);
  await first.getByRole('link').first().click();
  await expect(page).toHaveURL(industrySectors[0].solutions[0].href);
  await page.goto('/solutions');
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
