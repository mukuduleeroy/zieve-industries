import { chromium } from '@playwright/test';
import { writeFile } from 'node:fs/promises';
const browser = await chromium.launch();
const runs = [];
for (const width of [390, 1440]) {
  const context = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  await cdp.send('Network.enable');
  await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
  await page.goto('http://127.0.0.1:3102', { waitUntil: 'networkidle' });
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 700) {
      scrollTo(0, y);
      await new Promise(resolve => setTimeout(resolve, 70));
    }
  });
  await page.locator('#industrial-solutions').scrollIntoViewIfNeeded();
  for (const slug of ['industrial-chemicals', 'consumables-spares']) {
    if (width < 1024) await page.getByRole('combobox', { name: 'Choose a division' }).selectOption(slug);
    else await page.locator(`button[aria-controls="solution-panel-${slug}"]`).click();
    await page.locator('.solution-panel[data-active=true] img').evaluate(image => image.decode());
  }
  runs.push({ width, resources: await page.evaluate(() => performance.getEntriesByType('resource').filter(resource => resource.initiatorType === 'img').map(resource => ({ url: resource.name, bytes: resource.encodedBodySize, transfer: resource.transferSize, duration: resource.duration }))) });
  await context.close();
}
await writeFile('docs/homepage-refinement/phase-11a5/evidence/stage-b/delivered-images.json', JSON.stringify(runs, null, 2) + '\n');
await browser.close();
