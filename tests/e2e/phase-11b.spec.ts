import { expect, test } from '@playwright/test';
const widths = [320, 375, 390, 768, 1024, 1440, 1920];

test('AUD-06 form columns align or reflow naturally with normal and enlarged labels', async ({ page }) => {
  test.setTimeout(90_000);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  for (const size of [100, 200]) for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    await page.evaluate(size => { document.documentElement.style.fontSize = `${size}%`; }, size);
    await page.locator('#request-a-quote').scrollIntoViewIfNeeded();
    for (const [first, second] of [['fullName', 'email'], ['company', 'telephone'], ['industry', 'location']]) {
      const a = await page.locator(`#quotation-${first}`).boundingBox();
      const b = await page.locator(`#quotation-${second}`).boundingBox();
      if (Math.abs(a!.x - b!.x) < 1) expect(b!.y).toBeGreaterThanOrEqual(a!.y + a!.height);
      else expect(Math.abs(a!.y - b!.y), `${width}px, ${size}%: ${first}/${second}`).toBeLessThan(1);
    }
    expect(await page.locator('#request-a-quote input, #request-a-quote select, #request-a-quote textarea').count()).toBe(8);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
    for (const field of await page.locator('.quotation-field').all()) {
      const label = await field.locator('label').boundingBox();
      const control = await field.locator('input,select,textarea').boundingBox();
      expect(control!.y).toBeGreaterThanOrEqual(label!.y + label!.height);
    }
  }
  await page.evaluate(() => { document.documentElement.style.fontSize = '100%'; });
  await page.getByRole('button', { name: 'Prepare enquiry email' }).click();
  await expect(page.locator('#quotation-fullName')).toBeFocused();
  await expect(page.locator('#quotation-fullName-error')).toHaveText('Enter your full name.');
  await expect(page.locator('#quotation-fullName')).toHaveAttribute('aria-describedby', 'quotation-fullName-error');
  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
    for (const error of await page.locator('.quotation-field-error').all()) {
      const bounds = await error.boundingBox();
      const parent = await error.locator('..').boundingBox();
      expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(parent!.y + parent!.height + 1);
      expect(await error.evaluate(e => e.scrollHeight <= e.clientHeight + 1)).toBe(true);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
  }
});

test('AUD-12 draft is one named group with the existing keyboard and copy workflow', async ({ page }) => {
  await page.addInitScript(() => { Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async () => {} } }); });
  await page.goto('/#request-a-quote');
  await page.locator('#quotation-fullName').fill('Tariro Moyo');
  await page.locator('#quotation-email').fill('tariro@example.com');
  await page.locator('#quotation-category').selectOption('earthmoving-construction');
  await page.locator('#quotation-requirements').fill('Excavator filters and fittings.');
  const prepare = page.getByRole('button', { name: 'Prepare enquiry email' });
  await prepare.focus(); await page.keyboard.press('Enter');
  const draft = page.getByRole('group', { name: 'Your enquiry draft', exact: true });
  await expect(draft).toHaveCount(1);
  await expect(prepare).toBeFocused();
  await expect(draft.getByRole('heading', { level: 4 })).toHaveText('Your enquiry draft');
  await expect(draft.getByRole('status')).toHaveCount(1);
  await expect(draft.locator('[aria-live=polite]')).toHaveCount(1);
  await expect(draft.getByRole('link', { name: 'Open email application' })).toHaveAttribute('href', /^mailto:/);
  await draft.getByRole('button', { name: 'Copy enquiry summary' }).click();
  await expect(draft.locator('.quotation-copy-status')).toContainText('Summary copied.');
  await draft.getByRole('button', { name: 'Select summary' }).click();
  await expect(draft.getByRole('textbox', { name: 'Enquiry summary' })).toBeFocused();
});

test('AUD-05 and AUD-16 retain decorative semantics with stronger hierarchy and a clear transition', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const navy = 'rgb(11, 34, 51)', amber = 'rgb(242, 162, 26)';
  const numbers = page.locator('.industry-number, .purpose-value-number');
  await expect(numbers).toHaveCount(9);
  for (const number of await numbers.all()) await expect(number).toHaveAttribute('aria-hidden', 'true');
  for (const number of await page.locator('.purpose-value-number').all()) await expect(number).toHaveCSS('color', navy);
  const industryNumbers = page.locator('.industry-panel[data-surface=navy] .industry-number');
  await expect(industryNumbers).toHaveCount(4);
  for (const number of await industryNumbers.all()) await expect(number).toHaveCSS('color', amber);
  await expect(page.locator('#purpose-vision')).toHaveCSS('border-top-color', amber);
  await expect(page.locator('#purpose-vision')).toHaveCSS('border-top-width', '2px');
  expect(await page.evaluate(() => document.querySelector('#purpose-vision')!.getBoundingClientRect().top - document.querySelector('#zieve-advantage')!.getBoundingClientRect().bottom)).toBe(0);
  await expect(page.locator('main h1')).toHaveCount(1);
});

test('mobile editorial rhythm preserves photographs and hero credit, including reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    // Viewport acknowledgement can precede responsive style/layout recalculation.
    // Wait for the rendered geometry, preserving the original ratio and precision.
    await expect.poll(async () => {
      const frame = await page.locator('.introduction-image-mask').boundingBox();
      return frame ? frame.height / frame.width : null;
    }, { message: `Introduction image ratio after resizing to ${width}px` })
      .toBeCloseTo(width < 1024 ? 3 / 4 : 6 / 5, 1);
    await expect(page.locator('.hero-media-caption')).toContainText('Illustrative stock photo');
    await expect(page.locator('.hero-media-caption')).toContainText('Metehan Özaras / Pexels');
    const caption = (await page.locator('.hero-media-caption').boundingBox())!;
    const scroll = (await page.locator('.hero-scroll').boundingBox())!;
    expect(caption.x < scroll.x + scroll.width && caption.x + caption.width > scroll.x && caption.y < scroll.y + scroll.height && caption.y + caption.height > scroll.y).toBe(false);
    expect(await page.locator('.hero-media-caption').evaluate(e => parseFloat(getComputedStyle(e).fontSize))).toBeGreaterThanOrEqual(12);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
    await expect(page.locator('.hero-scroll-track > span')).toHaveCSS('animation-name', 'none');
  }
  await page.locator('#company-introduction').scrollIntoViewIfNeeded();
  await expect(page.locator('[data-intro-parallax]')).toHaveCSS('transform', 'none');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('[data-intro-heading]')).toHaveCSS('opacity', '1');
});

test('introduction resize geometry settles in both directions with enlarged text and motion preferences', async ({ page }) => {
  await page.goto('/');
  const frame = page.locator('.introduction-image-mask');
  for (const motion of ['reduce', 'no-preference'] as const) {
    await page.emulateMedia({ reducedMotion: motion });
    for (const textSize of [100, 200]) {
      await page.evaluate(size => { document.documentElement.style.fontSize = `${size}%`; }, textSize);
      // Cross the image and header breakpoints in both directions, including their edges.
      for (const width of [390, 1023, 1024, 1025, 1279, 1280, 1440, 1280, 1279, 1025, 1024, 1023, 390]) {
        await page.setViewportSize({ width, height: 900 });
        await expect.poll(async () => {
          const bounds = await frame.boundingBox();
          return bounds ? bounds.height / bounds.width : null;
        }, { message: `${width}px, ${textSize}% text, ${motion}: rendered image ratio` })
          .toBeCloseTo(width < 1024 ? 3 / 4 : 6 / 5, 1);
        await page.locator('#company-introduction').scrollIntoViewIfNeeded();
        await expect(frame).toBeVisible();
        await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth))
          .toBe(width);
      }
    }
  }
});
