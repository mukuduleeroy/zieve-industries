import { expect, test, type Page } from '@playwright/test';
import { contact } from '../../src/content/contact';
import { quotationCategories } from '../../src/content/quotation';
const formId = '#request-a-quote';
async function fillRequired(page: Page, requirements = 'Please quote for excavator filters & fittings.') {
  await page.locator('#quotation-fullName').fill('Tariro Moyo');
  await page.locator('#quotation-email').fill('tariro@example.com');
  await page.locator('#quotation-category').selectOption(quotationCategories[0].value);
  await page.locator('#quotation-requirements').fill(requirements);
}

test('official contacts and eight labelled fields render without premature errors', async ({ page }) => {
  await page.goto('/#request-a-quote');
  const section = page.locator('#partner-with-zieve');
  await expect(section.getByText(contact.address, { exact: true })).toBeVisible();
  await expect(section.getByRole('link', { name: contact.phone })).toHaveAttribute('href', contact.phoneHref);
  await expect(section.getByRole('link', { name: contact.email })).toHaveAttribute('href', contact.emailHref);
  await expect(page.locator(`${formId} input, ${formId} select, ${formId} textarea`)).toHaveCount(8);
  await expect(page.locator('#quotation-fullName')).toBeEnabled();
  await expect(page.locator('#quotation-fullName')).toHaveAttribute('autocomplete', 'name');
  await expect(page.locator(`${formId} [aria-invalid="true"]`)).toHaveCount(0);
  for (const error of await page.locator('.quotation-field-error').all()) await expect(error).toBeEmpty();
  await expect(page.locator('#quotation-category option')).toHaveCount(6);
  await expect(page.locator('#quotation-industry option')).toHaveCount(7);
});

test('required and email validation preserves entries and focuses the first invalid field', async ({ page }) => {
  await page.goto('/#request-a-quote');
  await page.locator('#quotation-company').fill('Harare Engineering');
  await page.getByRole('button', { name: 'Prepare enquiry email' }).click();
  await expect(page.locator('#quotation-fullName')).toBeFocused();
  await expect(page.locator('#quotation-fullName-error')).toHaveText('Enter your full name.');
  await expect(page.locator('#quotation-category-error')).toHaveText('Choose a product or service category.');
  await expect(page.locator('#quotation-requirements-error')).toHaveText('Describe your requirements or project.');
  await expect(page.locator('#quotation-company')).toHaveValue('Harare Engineering');
  await fillRequired(page);
  await page.locator('#quotation-email').fill('invalid@');
  await page.getByRole('button', { name: 'Prepare enquiry email' }).click();
  await expect(page.locator('#quotation-email-error')).toHaveText('Enter a valid email address.');
  await expect(page.locator('#quotation-email')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.locator('#quotation-email')).toHaveAttribute('aria-describedby', 'quotation-email-error');
  await expect(page.locator('#quotation-requirements')).toHaveValue('Please quote for excavator filters & fittings.');
});

test('valid data prepares a real mailto draft, never claims delivery or clears the form', async ({ page }) => {
  const posts: string[] = [];
  page.on('request', request => { if (request.method() === 'POST') posts.push(request.url()); });
  await page.goto('/#request-a-quote');
  await fillRequired(page, 'Filters & fittings: 20% + 5 / "A" #1');
  const prepare = page.getByRole('button', { name: 'Prepare enquiry email' });
  await prepare.focus();
  await page.keyboard.press('Enter');
  const open = page.getByRole('link', { name: 'Open email application', exact: true });
  await expect(open).toBeVisible();
  await expect(prepare).toBeFocused();
  const href = await open.getAttribute('href');
  const uri = new URL(href!);
  expect(uri.protocol).toBe('mailto:');
  expect(uri.pathname).toBe(contact.email);
  expect(uri.searchParams.get('body')).toContain('Filters & fittings: 20% + 5 / "A" #1');
  await expect(page.locator('.quotation-draft')).toContainText('Nothing has been submitted from this website.');
  await expect(page.locator('#quotation-fullName')).toHaveValue('Tariro Moyo');
  // Intercept the user-activated native link rather than launching an external application in QA.
  await open.evaluate(element => element.addEventListener('click', event => { event.preventDefault(); element.setAttribute('data-handoff-activated', 'true'); }));
  await open.click();
  await expect(open).toHaveAttribute('data-handoff-activated', 'true');
  await expect(page.locator('#quotation-email')).toHaveValue('tariro@example.com');
  await page.locator('#quotation-requirements').fill('Updated requirements remain local.');
  await expect(open).toHaveCount(0);
  expect(posts).toEqual([]);
});

test('long enquiries offer complete copy/manual fallback even if clipboard access fails', async ({ page }) => {
  await page.addInitScript(() => { Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: () => Promise.reject(new Error('denied')) } }); });
  await page.goto('/#request-a-quote');
  const requirements = 'Hydraulic oils & filters for maintenance. '.repeat(80);
  await fillRequired(page, requirements);
  await page.getByRole('button', { name: 'Prepare enquiry email' }).click();
  await expect(page.locator('.quotation-draft')).toContainText('too long for a reliable email link');
  await expect(page.getByRole('link', { name: 'Open email application' })).toHaveCount(0);
  await expect(page.locator('#quotation-summary')).toHaveValue(new RegExp(requirements.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  await page.getByRole('button', { name: 'Copy enquiry summary' }).click();
  await expect(page.locator('.quotation-copy-status')).toContainText('Clipboard access is unavailable');
  await page.getByRole('button', { name: 'Select summary', exact: true }).click();
  await expect(page.locator('#quotation-summary')).toBeFocused();
  expect(await page.locator('#quotation-summary').evaluate((element: HTMLTextAreaElement) => element.selectionEnd - element.selectionStart)).toBeGreaterThan(requirements.trim().length);
});

test('header, mobile menu and hero quote links reach the accessible shared anchor', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/solutions');
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Request a Quote' }).click();
  await expect(page).toHaveURL('/#request-a-quote');
  await expect(page.locator(formId)).toBeInViewport();
  expect(await page.locator(formId).evaluate(element => element.getBoundingClientRect().top)).toBeGreaterThanOrEqual(112);
  await expect(page.locator('#quotation-fullName')).not.toBeFocused();
  await page.goto('/');
  await page.locator('#hero').getByRole('link', { name: 'Request a Quote' }).click();
  await expect(page).toHaveURL('/#request-a-quote');
  await expect(page.locator(formId)).toBeInViewport();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/about');
  await page.getByRole('button', { name: 'Open navigation menu' }).click();
  await page.getByRole('dialog').getByRole('link', { name: 'Request a Quote' }).click();
  await expect(page).toHaveURL('/#request-a-quote');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe('');
  await expect(page.locator(formId)).toBeInViewport();
});

test('responsive form and reduced motion remain usable on narrow and short screens', async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/#request-a-quote');
  for (const viewport of [{ width: 320, height: 568 }, { width: 390, height: 844 }, { width: 844, height: 390 }, { width: 768, height: 1024 }, { width: 1440, height: 1000 }]) {
    await page.setViewportSize(viewport);
    await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
    await page.locator(formId).scrollIntoViewIfNeeded();
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await expect(page.locator('[data-quotation-form]')).toHaveCSS('opacity', '1');
    await expect(page.locator('[data-quotation-form]')).toHaveCSS('transform', 'none');
    for (const field of await page.locator(`${formId} input, ${formId} select, ${formId} textarea`).all()) expect((await field.boundingBox())!.height).toBeGreaterThanOrEqual(48);
    const editor = await page.locator('.quotation-editorial').boundingBox();
    const form = await page.locator('.quotation-form-surface').boundingBox();
    if (viewport.width >= 1024) expect(form!.x).toBeGreaterThan(editor!.x + editor!.width);
    else expect(form!.y).toBeGreaterThan(editor!.y + editor!.height);
    if (viewport.width === 390 || viewport.width === 1440) await page.locator('#partner-with-zieve').screenshot({ path: testInfo.outputPath(`quotation-${viewport.width}.png`), animations: 'disabled', style: '.site-header, .skip-link { visibility: hidden !important; }' });
  }
});

test('without JavaScript personal-data fields stay disabled and direct contact remains usable', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/#request-a-quote');
  await expect(page.locator('#quotation-fullName')).toBeDisabled();
  await expect(page.locator('#partner-with-zieve').getByRole('link', { name: contact.email })).toHaveAttribute('href', contact.emailHref);
  await context.close();
});
