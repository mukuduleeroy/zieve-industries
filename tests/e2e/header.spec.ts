import { expect, test } from '@playwright/test';
import { quoteAction, routeDestinations } from '../../src/content/navigation';
import { homepageNavigation as navigation, homepageSolutionNavigation as solutionNavigation } from '../../src/content/homepage-navigation';

// Explicit viewports keep header coverage independent of the device project defaults.
test.describe('Desktop header', () => {
  test.use({ viewport: { width: 1440, height: 900 }, isMobile: false });
  test('dropdown supports keyboard, dismissal and canonical destinations', async ({ page }, testInfo) => {
    await page.goto('/');
    const header = page.getByRole('banner');
    const nav = page.getByRole('navigation', { name: 'Main navigation' });
    for (const item of navigation.filter(item => !('children' in item))) {
      await expect(nav.getByRole('link', { name: item.label, exact: true })).toHaveAttribute('href', item.href);
    }
    await expect(nav.getByRole('link', { name: quoteAction.label })).toHaveAttribute('href', quoteAction.href);
    await expect(header.getByRole('link', { name: 'Zieve Industries home' })).toHaveAttribute('href', '/');
    const trigger = nav.getByRole('button', { name: 'Our Solutions' });
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await trigger.focus();
    await page.keyboard.press('Enter');
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Tab');
    await expect(nav.getByRole('link', { name: solutionNavigation[0].label, exact: true })).toBeFocused();
    for (const item of solutionNavigation) await expect(nav.getByRole('link', { name: item.label, exact: true })).toHaveAttribute('href', item.href);
    await expect(page.locator('.solutions-panel')).toHaveCSS('opacity', '1');
    await page.screenshot({ path: testInfo.outputPath('header-desktop-final.png'), fullPage: true, animations: 'disabled' });
    await page.keyboard.press('Escape');
    await expect(trigger).toBeFocused();
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await page.keyboard.press('ArrowDown');
    await expect(nav.getByRole('link', { name: solutionNavigation[0].label, exact: true })).toBeFocused();
    await page.getByRole('heading', { level: 1 }).click();
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await trigger.click();
    await nav.getByRole('link', { name: 'Explore all solutions' }).focus();
    await page.keyboard.press('Tab');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await trigger.click();
    await nav.getByRole('link', { name: solutionNavigation[1].label, exact: true }).click();
    await expect(page).toHaveURL(solutionNavigation[1].href);
    await expect(page.locator('.solution-panel[data-active=true]')).toHaveAttribute('id', 'solution-panel-elution-gold-processing');
    await expect(page.locator('.solution-panel[data-active=true]')).toBeFocused();
    await expect(page.getByRole('button', { name: 'Our Solutions', exact: true })).toHaveAttribute('aria-expanded', 'false');
  });
  test('scroll changes surface without moving content or changing header dimensions', async ({ page }) => {
    await page.goto('/');
    const header = page.getByRole('banner');
    const main = page.getByRole('main');
    const before = await header.boundingBox();
    expect(await page.locator('.header-inner').evaluate(element => parseFloat(getComputedStyle(element).paddingLeft))).toBeGreaterThanOrEqual(20);
    const mainTop = await main.evaluate(element => element.getBoundingClientRect().top + scrollY);
    await expect(header).toHaveAttribute('data-scrolled', 'false');
    await page.evaluate(() => scrollTo(0, 300));
    await expect(header).toHaveAttribute('data-scrolled', 'true');
    const after = await header.boundingBox();
    expect(after?.height).toBe(before?.height);
    expect(after?.y).toBe(0);
    expect(await main.evaluate(element => element.getBoundingClientRect().top + scrollY)).toBe(mainTop);
    await page.evaluate(() => scrollTo(0, 0));
    await expect(header).toHaveAttribute('data-scrolled', 'false');
  });
});

test.describe('Mobile header', () => {
  test.use({ viewport: { width: 390, height: 844 } });
  test('modal traps focus, expands solutions, restores focus and unlocks scrolling', async ({ page }, testInfo) => {
    await page.goto('/');
    const trigger = page.getByRole('button', { name: 'Open navigation menu' });
    const dialog = page.getByRole('dialog', { name: 'Explore Zieve' });
    await trigger.click();
    await expect(dialog).toBeVisible();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    const close = dialog.getByRole('button', { name: 'Close navigation menu' });
    await expect(close).toBeFocused();
    expect(await page.evaluate(() => document.body.style.overflow)).toBe('hidden');
    await page.keyboard.press('Shift+Tab');
    await expect(dialog.getByRole('link', { name: 'Zieve Industries home' })).toBeFocused();
    await page.keyboard.press('Shift+Tab');
    await expect(dialog.getByRole('link', { name: quoteAction.label })).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(dialog.getByRole('link', { name: 'Zieve Industries home' })).toBeFocused();
    const solutions = dialog.locator('summary');
    await solutions.focus();
    await page.keyboard.press('Enter');
    await expect(dialog.getByRole('link', { name: solutionNavigation[0].label, exact: true })).toBeVisible();
    await expect(dialog).toHaveCSS('opacity', '1');
    await expect(dialog.getByRole('link', { name: quoteAction.label })).toBeInViewport();
    await expect(close).toBeInViewport();
    await page.screenshot({ path: testInfo.outputPath('header-mobile-final.png'), animations: 'disabled' });
    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();
    await expect(trigger).toBeFocused();
    await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe('');
    await trigger.click();
    await expect(dialog.getByRole('link', { name: solutionNavigation[0].label, exact: true })).not.toBeVisible();
    await close.click();
    await expect(trigger).toBeFocused();
    await trigger.click();
    await dialog.getByRole('link', { name: 'About Us', exact: true }).click();
    await expect(page).toHaveURL('/#company-introduction');
    await expect(dialog).not.toBeVisible();
    await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe('');
    await expect(page.getByRole('navigation', { name: 'Main navigation' })).not.toBeVisible();
  });
  test('touch submenu navigation and desktop resize release the modal', async ({ page }) => {
    await page.goto('/');
    const trigger = page.getByRole('button', { name: 'Open navigation menu' });
    const dialog = page.getByRole('dialog');
    await trigger.click();
    await dialog.locator('summary').click();
    await dialog.getByRole('link', { name: solutionNavigation[4].label, exact: true }).click();
    await expect(page).toHaveURL(solutionNavigation[4].href);
    await expect(dialog).not.toBeVisible();
    await trigger.click();
    await page.setViewportSize({ width: 1440, height: 900 });
    await expect(dialog).not.toBeVisible();
    await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe('');
    await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
  });
});

test('all registered navigation routes resolve, unknown services remain 404', async ({ request }) => {
  for (const item of routeDestinations) expect((await request.get(item.href)).status(), item.href).toBe(200);
  expect((await request.get('/solutions/not-a-service')).status()).toBe(404);
});

test('header fits narrow, tablet, desktop and zoom-equivalent widths with reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  for (const width of [320, 390, 768, 1024, 1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), { message: `width ${width}` }).toBe(true);
    const header = page.getByRole('banner');
    if (width < 1280) {
      await header.getByRole('button', { name: 'Open navigation menu' }).click();
      const dialog = page.getByRole('dialog');
      await dialog.locator('summary').click();
      expect(await dialog.evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
      await expect(dialog).toHaveCSS('animation-duration', '1e-05s');
      await page.keyboard.press('Escape');
    } else {
      await header.getByRole('button', { name: 'Our Solutions', exact: true }).click();
      await expect(page.locator('.solutions-panel')).toHaveCSS('animation-duration', '1e-05s');
      await page.keyboard.press('Escape');
    }
  }
});
