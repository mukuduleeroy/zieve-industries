import { expect, test } from '@playwright/test';
import { quoteAction } from '../../src/content/navigation';
import { homepageNavigation as navigation, homepageSolutionNavigation as solutionNavigation } from '../../src/content/homepage-navigation';
import { contact } from '../../src/content/contact';

test('footer preserves the original brand, canonical links, official contacts and current year', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const footer = page.getByRole('contentinfo', { name: 'Zieve Industries footer' });
  await footer.scrollIntoViewIfNeeded();
  const logo = footer.getByRole('img', { name: 'Zieve Industries', exact: true });
  await expect(logo).toBeVisible();
  await expect.poll(() => logo.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
  await expect(footer.getByRole('heading', { level: 2 })).toHaveText('Equipping Industry. Empowering Growth.');
  for (const [label, items] of [['Footer primary navigation', navigation], ['Footer solutions navigation', solutionNavigation]] as const) {
    const nav = footer.getByRole('navigation', { name: label });
    await expect(nav.getByRole('link')).toHaveCount(items.length);
    for (const item of items) await expect(nav.getByRole('link', { name: item.label, exact: true })).toHaveAttribute('href', item.href);
  }
  await expect(footer.getByText(contact.address, { exact: true })).toBeVisible();
  await expect(footer.getByRole('link', { name: contact.phone })).toHaveAttribute('href', contact.phoneHref);
  await expect(footer.getByRole('link', { name: contact.email })).toHaveAttribute('href', contact.emailHref);
  await expect(footer.getByRole('link', { name: quoteAction.label })).toHaveAttribute('href', quoteAction.href);
  const year = await page.evaluate(() => new Intl.DateTimeFormat('en', { year: 'numeric', timeZone: 'Africa/Harare' }).format(new Date()));
  await expect(footer.locator('[data-copyright-year]')).toHaveText(year);
  await footer.getByRole('navigation', { name: 'Footer solutions navigation' }).getByRole('link').first().click();
  await expect(page).toHaveURL(solutionNavigation[0].href);
});

test('footer quotation anchor preserves the enquiry and avoids automatic field focus', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.locator('#quotation-company').fill('Harare Engineering');
  const quote = page.getByRole('contentinfo').getByRole('link', { name: quoteAction.label });
  await quote.click();
  await expect(page).toHaveURL(/#request-a-quote$/);
  await expect(page.locator('#quotation-company')).toHaveValue('Harare Engineering');
  await expect(page.locator('#quotation-fullName')).not.toBeFocused();
});

for (const reduced of [true, false]) test(`keyboard back to top respects ${reduced ? 'reduced' : 'normal'} motion and returns focus`, async ({ page }) => {
  await page.emulateMedia({ reducedMotion: reduced ? 'reduce' : 'no-preference' });
  await page.goto('/');
  const link = page.getByRole('contentinfo').getByRole('link', { name: 'Back to top' });
  await link.focus();
  await page.evaluate(() => {
    const original = window.scrollTo.bind(window);
    window.scrollTo = ((options: ScrollToOptions) => {
      document.documentElement.dataset.testScrollBehavior = options.behavior;
      original(options);
    }) as typeof window.scrollTo;
  });
  await page.keyboard.press('Enter');
  await expect(page.locator('#main-content')).toBeFocused();
  await expect(page).toHaveURL(/#main-content$/);
  await expect(page.locator('html')).toHaveAttribute('data-test-scroll-behavior', reduced ? 'instant' : 'smooth');
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(2);
});

test('footer responds without overflow, exposes touch targets and stays static with reduced motion', async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const footer = page.getByRole('contentinfo');
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await footer.scrollIntoViewIfNeeded();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    for (const target of await footer.locator('a').all()) {
      const rect = await target.boundingBox();
      expect(rect?.height).toBeGreaterThanOrEqual(44);
    }
    for (const group of await footer.locator('[data-footer-reveal]').all()) {
      await expect(group).toHaveCSS('opacity', '1');
      await expect(group).toHaveCSS('transform', 'none');
    }
    if (width === 390 || width === 1440) await footer.screenshot({ path: testInfo.outputPath(`footer-${width}.png`), animations: 'disabled', style: '.site-header, .skip-link { visibility: hidden !important; }' });
  }
  await expect(footer.locator('[data-footer-divider]')).toHaveCSS('transform', 'none');
});

test('footer remains readable and navigable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto('/');
  const footer = page.getByRole('contentinfo');
  await footer.getByRole('link', { name: 'Back to top' }).click();
  await expect(page).toHaveURL(/#main-content$/);
  await expect(page.locator('#main-content')).toBeInViewport();
  await context.close();
});


test('footer entrance cleans up on preference changes and keeps its layout stable', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const footer = page.getByRole('contentinfo');
  await footer.scrollIntoViewIfNeeded();
  const before = await footer.boundingBox();
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect.poll(() => footer.locator('[data-footer-reveal]').first().getAttribute('style')).toContain('opacity');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const element of await footer.locator('[data-footer-reveal], [data-footer-divider]').all()) {
    await expect(element).toHaveCSS('opacity', '1');
    await expect(element).toHaveCSS('transform', 'none');
  }
  const after = await footer.boundingBox();
  expect(after?.height).toBe(before?.height);
  expect(after?.width).toBe(before?.width);
  const link = footer.getByRole('link', { name: 'Back to top' });
  await link.focus();
  await expect(link).toBeFocused();
  expect(await link.evaluate(element => getComputedStyle(element).outlineStyle)).not.toBe('none');
});
