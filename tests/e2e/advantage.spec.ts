import { expect, test } from '@playwright/test';
import { advantageContent as content, operatingPillars as pillars } from '../../src/content/advantage';
const sectionId = '#zieve-advantage';
const panelId = (id: string) => `#pillar-panel-${id}`;

test('five official pillars have correct relationships and a consistent initial state', async ({ page }) => {
  await page.goto('/');
  const section = page.locator(sectionId);
  await section.scrollIntoViewIfNeeded();
  await expect(page.locator('main h1')).toHaveCount(1);
  await expect(section.getByRole('heading', { level: 2 })).toHaveText(content.headline.join(' '));
  await expect(section.getByText(content.supporting)).toBeVisible();
  await expect(section.getByText(content.closing, { exact: true })).toBeVisible();
  await expect(section.getByRole('button')).toHaveCount(5);
  await expect(section.getByRole('button', { expanded: true })).toHaveCount(1);
  for (const [index, pillar] of pillars.entries()) {
    const button = section.getByRole('button', { name: pillar.title, exact: true });
    await expect(button).toHaveAttribute('aria-expanded', index === 0 ? 'true' : 'false');
    await expect(button).toHaveAttribute('aria-controls', `pillar-panel-${pillar.id}`);
    await expect(page.locator(panelId(pillar.id))).toHaveAttribute('aria-labelledby', `pillar-trigger-${pillar.id}`);
    await expect(page.locator(panelId(pillar.id))).toHaveAttribute('aria-hidden', index === 0 ? 'false' : 'true');
  }
  expect(await page.evaluate(() => document.querySelector('#zieve-advantage')!.getBoundingClientRect().top - document.querySelector('#industries-we-serve')!.getBoundingClientRect().bottom)).toBe(0);
});

test('pointer interactions expand, replace and collapse while retaining button focus', async ({ page }) => {
  await page.goto('/');
  const section = page.locator(sectionId);
  await section.scrollIntoViewIfNeeded();
  for (const pillar of pillars) {
    const button = section.getByRole('button', { name: pillar.title, exact: true });
    if (await button.getAttribute('aria-expanded') === 'false') await button.click();
    await expect(section.getByRole('button', { expanded: true })).toHaveCount(1);
    await expect(page.locator(panelId(pillar.id)).getByText(pillar.description, { exact: true })).toBeVisible();
    await button.click();
    await expect(button).toBeFocused();
    await expect(section.getByRole('button', { expanded: true })).toHaveCount(0);
    await expect(page.locator(panelId(pillar.id))).toHaveCSS('height', '0px');
    await expect(page.locator(panelId(pillar.id))).toHaveAttribute('inert', '');
  }
  await section.getByRole('button', { name: pillars[0].title, exact: true }).click();
  await section.getByRole('button', { name: pillars[1].title, exact: true }).click();
  await expect(section.getByRole('button', { expanded: true })).toHaveCount(1);
  await expect(section.getByRole('button', { name: pillars[0].title, exact: true })).toHaveAttribute('aria-expanded', 'false');
});

test('keyboard navigation and rapid changes preserve a single latest state', async ({ page }) => {
  await page.goto('/');
  const section = page.locator(sectionId);
  await section.scrollIntoViewIfNeeded();
  const first = section.getByRole('button', { name: pillars[0].title, exact: true });
  await first.focus();
  await page.keyboard.press('ArrowDown');
  const second = section.getByRole('button', { name: pillars[1].title, exact: true });
  await expect(second).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(second).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('End');
  await page.keyboard.press('Space');
  await expect(section.getByRole('button', { name: pillars[4].title, exact: true })).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Home');
  await expect(first).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(second).toBeFocused();
  await page.locator('.pillar-accordion').evaluate(element => {
    const buttons = element.querySelectorAll<HTMLButtonElement>('button');
    for (const index of [0, 4, 1, 3, 2, 2, 0, 4]) buttons[index].click();
  });
  const lastPanel = page.locator(panelId(pillars[4].id));
  await expect(section.getByRole('button', { expanded: true })).toHaveCount(1);
  await expect(section.getByRole('button', { name: pillars[4].title, exact: true })).toHaveAttribute('aria-expanded', 'true');
  await expect(lastPanel).toHaveCSS('opacity', '1');
  for (const pillar of pillars.slice(0, 4)) await expect(page.locator(panelId(pillar.id))).toHaveCSS('height', '0px');
});

test('desktop columns and mobile content-first stacking fit every viewport', async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
    await page.locator(sectionId).scrollIntoViewIfNeeded();
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const editorial = await page.locator('.advantage-editorial').boundingBox();
    const accordion = await page.locator('.pillar-accordion').boundingBox();
    if (width >= 1024) expect(accordion!.x).toBeGreaterThan(editorial!.x + editorial!.width);
    else expect(accordion!.y).toBeGreaterThan(editorial!.y + editorial!.height);
    for (const button of await page.locator(`${sectionId} button`).all()) expect((await button.boundingBox())!.height).toBeGreaterThanOrEqual(48);
    if (width === 390 || width === 1440) await page.locator(sectionId).screenshot({ path: testInfo.outputPath(`advantage-${width}.png`), animations: 'disabled', style: '.site-header, .skip-link { visibility: hidden !important; }' });
  }
});

test('reduced motion supports immediate expansion and cleans up entrance effects', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const section = page.locator(sectionId);
  await section.scrollIntoViewIfNeeded();
  await expect(page.locator('#advantage-title')).toHaveCSS('opacity', '1');
  await expect(page.locator('[data-advantage-divider]')).toHaveCSS('transform', 'none');
  const third = section.getByRole('button', { name: pillars[2].title, exact: true });
  await third.click();
  await expect(page.locator(panelId(pillars[0].id))).toHaveCSS('height', '0px');
  await expect(third).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator(panelId(pillars[2].id))).toHaveCSS('opacity', '1');
  // Move focus outside the section so an entrance enhancement can be armed again.
  await page.getByRole('banner').getByRole('link', { name: 'Zieve Industries home' }).focus();
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect.poll(() => page.locator('#advantage-title').getAttribute('style')).toMatch(/opacity/);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('#advantage-title')).toHaveCSS('transform', 'none');
  await expect(page.locator('#advantage-title')).toHaveCSS('opacity', '1');
  await expect(page.locator('[data-advantage-divider]')).toHaveCSS('transform', 'none');
});

test('all operating pillar descriptions remain available without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/');
  await page.locator('.advantage-static').scrollIntoViewIfNeeded();
  for (const pillar of pillars) await expect(page.locator('.advantage-static').getByText(pillar.description, { exact: true })).toBeVisible();
  await context.close();
});
