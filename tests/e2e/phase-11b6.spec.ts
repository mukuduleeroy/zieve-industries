import { expect, test } from '@playwright/test';
import { industrySectors } from '../../src/content/industry-experience';

const widths = [320, 375, 390, 430, 768, 1024, 1440, 1920];

test('industry media follows its heading in DOM and mobile layout before all supporting copy', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  for (const size of [100, 200]) for (const width of widths) {
    await page.setViewportSize({ width, height: 1000 });
    await page.evaluate(size => { document.documentElement.style.fontSize = `${size}%`; }, size);
    for (const sector of industrySectors) {
      const panel = page.locator(`#industry-${sector.slug}`);
      await panel.scrollIntoViewIfNeeded();
      await expect(panel.getByRole('heading', { name: sector.name, exact: true })).toHaveCount(1);
      await expect(panel.getByRole('figure', { name: sector.name, exact: true })).toHaveCount(1);
      await expect(panel.getByRole('figure')).toHaveAttribute('aria-labelledby', `industry-title-${sector.slug}`);
      const geometry = await panel.evaluate(el => {
        const title = el.querySelector('h3')!, media = el.querySelector('figure')!, copy = el.querySelector('.industry-copy')!;
        return { title: title.getBoundingClientRect().toJSON(), media: media.getBoundingClientRect().toJSON(), copy: copy.getBoundingClientRect().toJSON(), order: Boolean(title.compareDocumentPosition(media) & Node.DOCUMENT_POSITION_FOLLOWING) && Boolean(media.compareDocumentPosition(copy) & Node.DOCUMENT_POSITION_FOLLOWING), unclippedTitle: title.scrollWidth <= title.clientWidth + 1 };
      });
      expect(geometry.order).toBe(true);
      expect(geometry.unclippedTitle).toBe(true);
      if (width < 1024) {
        expect(geometry.media.top).toBeGreaterThan(geometry.title.bottom);
        expect(geometry.copy.top).toBeGreaterThan(geometry.media.bottom);
      }
    }
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
    await expect(page.locator('.industry-scene')).not.toHaveAttribute('data-horizontal', 'true');
  }
});

test('continuous panel containment and boundaries survive intermediate progress, reversal and resize', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  const scene = page.locator('.industry-scene');
  if (testInfo.project.name === 'mobile') {
    await expect(scene).not.toHaveAttribute('data-horizontal', 'true');
    await expect(page.locator('.industry-stage')).toHaveCSS('position', 'static');
    return;
  }
  for (const width of [1440, 1920, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await expect(scene).toHaveAttribute('data-horizontal', 'true');
    await expect.poll(() => scene.evaluate(el => parseFloat((el as HTMLElement).style.getPropertyValue('--industry-travel')))).toBe(width * 3);
    for (const fraction of [0, .16, 1 / 3, .49, .5, .51, 2 / 3, 1, .5, .2]) {
      const g = await scene.evaluate(el => ({ top: el.getBoundingClientRect().top + scrollY, header: document.querySelector('header')!.getBoundingClientRect().height, travel: parseFloat((el as HTMLElement).style.getPropertyValue('--industry-travel')) }));
      // Native scroll positions and ScrollTrigger's start are pixel-rounded.
      const distance = Math.round(g.travel * fraction);
      await page.evaluate(({ g, distance }) => scrollTo(0, Math.round(g.top - g.header) + distance), { g, distance });
      await expect.poll(() => page.locator('.industry-sector-list').evaluate(el => new DOMMatrix(getComputedStyle(el).transform).m41)).toBeCloseTo(-distance, 0);
      for (const panel of await page.locator('.industry-panel').all()) {
        const bounds = await panel.boundingBox();
        for (const selector of ['h3', 'figure', '.industry-copy']) {
          const child = (await panel.locator(selector).boundingBox())!;
          expect(child.x).toBeGreaterThanOrEqual(bounds!.x);
          expect(child.x + child.width).toBeLessThanOrEqual(bounds!.x + bounds!.width);
        }
      }
      if (fraction === .5) {
        const boundary = page.locator('.industry-sector-list > li').nth(2);
        expect((await boundary.boundingBox())!.x).toBeCloseTo(width / 2, 0);
        await expect(boundary).toHaveCSS('position', 'relative');
        expect(await boundary.evaluate(el => getComputedStyle(el, '::before').content)).toBe('""');
      }
      await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
    }
  }
});

test('no-JavaScript industry anchors retain one heading, labelled photograph and following copy', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, javaScriptEnabled: false, viewport: { width: 390, height: 1000 } });
  const page = await context.newPage();
  for (const sector of industrySectors) {
    await page.goto(`/#industry-${sector.slug}`);
    const panel = page.locator(`#industry-${sector.slug}`);
    await expect(panel.getByRole('heading')).toBeInViewport();
    await expect(panel.getByRole('figure', { name: sector.name })).toHaveCount(1);
    const image = (await panel.locator('figure').boundingBox())!;
    const heading = (await panel.locator('h3').boundingBox())!;
    const copy = (await panel.locator('.industry-copy').boundingBox())!;
    expect(image.y).toBeGreaterThan(heading.y + heading.height);
    expect(copy.y).toBeGreaterThan(image.y + image.height);
    await expect(panel.getByText(sector.description, { exact: true })).toBeVisible();
    await expect(page.locator('.industry-stage')).toHaveCSS('position', 'static');
  }
  await context.close();
});
