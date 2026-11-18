import { expect, test } from '@playwright/test';

test('decorative section eyebrows are removed without losing headings or functional numbering', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('main h1')).toHaveCount(1);
  for (const id of ['introduction-title', 'solutions-title', 'industries-title', 'advantage-title', 'purpose-title', 'quotation-title']) {
    await expect(page.locator(`#${id}`)).toHaveCount(1);
    await expect(page.locator(`#${id}`)).toHaveJSProperty('tagName', 'H2');
  }
  await expect(page.locator('main p').filter({ hasText: /^\d{2}\s*\// })).toHaveCount(0);
  await expect(page.locator('.introduction-eyebrow, .solutions-eyebrow, .advantage-eyebrow, .purpose-eyebrow, .quotation-eyebrow')).toHaveCount(0);
  await expect(page.locator('.pillar-number')).toHaveCount(5);
  await expect(page.locator('.purpose-value-number')).toHaveCount(5);
  await expect(page.locator('.solution-panel-number')).toHaveCount(5);
});

test('industry lifecycle preserves reading flow for enlarged text, motion changes, keyboard and direct anchors', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  const scene = page.locator('.industry-scene');
  const track = page.locator('.industry-sector-list');
  if (testInfo.project.name === 'desktop') {
    await expect(scene).toHaveAttribute('data-horizontal', 'true');
    for (let cycle = 0; cycle < 3; cycle++) {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await expect(scene).not.toHaveAttribute('data-horizontal', 'true');
      await expect(track).toHaveCSS('transform', 'none');
      await expect(page.locator('.industry-stage')).toHaveCSS('position', 'static');
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      await expect(scene).toHaveAttribute('data-horizontal', 'true');
    }
    await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
    await expect(scene).not.toHaveAttribute('data-horizontal', 'true');
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth)).toBe(1440);
    await page.evaluate(() => { document.documentElement.style.fontSize = '100%'; });
    await expect(scene).toHaveAttribute('data-horizontal', 'true');
    await page.setViewportSize({ width: 768, height: 1000 });
    await expect(scene).not.toHaveAttribute('data-horizontal', 'true');
    await expect(track).toHaveCSS('transform', 'none');
    await page.setViewportSize({ width: 1440, height: 1000 });
    await expect(scene).toHaveAttribute('data-horizontal', 'true');
  } else await expect(scene).not.toHaveAttribute('data-horizontal', 'true');
  for (const panel of await page.locator('.industry-panel').all()) {
    const link = panel.getByRole('link').first();
    await link.focus();
    await expect(link).toBeFocused();
    await expect(link).toBeInViewport();
    await expect(scene).not.toHaveAttribute('data-horizontal', 'true');
  }
  await page.goto('/#industry-manufacturing');
  await expect(page.locator('#industry-manufacturing .industry-name')).toBeInViewport();
  await expect(scene).not.toHaveAttribute('data-horizontal', 'true');
  await expect(track).toHaveCSS('transform', 'none');
  await page.goto('/#industries-we-serve');
  await expect(page.locator('#industries-title')).toBeInViewport();
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth)).toBe(1440);
});
