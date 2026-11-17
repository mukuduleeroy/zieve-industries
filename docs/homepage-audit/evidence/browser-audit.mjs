// Audit-only browser capture harness. Uses installed tooling; no application mutations.
import { chromium } from '@playwright/test';
import { createRequire } from 'node:module';
import { writeFileSync } from 'node:fs';
const require = createRequire(import.meta.url);
const base = 'http://127.0.0.1:3101';
const out = new URL('../', import.meta.url).pathname;
const browser = await chromium.launch({ headless: true });
const report = { timestamp: new Date().toISOString(), browser: browser.version(), widths: [], axe: [], states: [], errors: [] };
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
async function stable(page) {
  await page.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map(img => img.decode().catch(() => {}))); });
  await pause(200);
}
async function capture(page, name, locator) {
  await stable(page);
  if (locator) {
    await locator.scrollIntoViewIfNeeded();
    await pause(150);
    await locator.screenshot({ path: `${out}screenshots/${name}.png`, animations: 'disabled', style: '.site-header, .skip-link { visibility: hidden !important; }' });
  } else await page.screenshot({ path: `${out}screenshots/${name}.png`, fullPage: true, animations: 'disabled' });
}
async function axe(page, state) {
  await page.addScriptTag({ path: require.resolve('axe-core/axe.min.js') });
  const result = await page.evaluate(async () => {
    const r = await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a','wcag2aa','wcag21a','wcag21aa','best-practice'] } });
    return { violations: r.violations, incomplete: r.incomplete, passes: r.passes.map(x => x.id), inapplicable: r.inapplicable.map(x => x.id) };
  });
  report.axe.push({ state, ...result });
}
for (const width of [375,390,768,1024,1440,1920]) {
  const height = width < 768 ? 844 : width === 768 ? 1024 : 1080;
  const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1, reducedMotion: 'reduce', locale: 'en-ZW', timezoneId: 'Africa/Harare', colorScheme: 'light' });
  const page = await context.newPage();
  page.on('pageerror', error => report.errors.push({ width, error: error.message }));
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.locator('#quotation-fullName').waitFor({ state: 'visible' });
  const sections = await page.locator('main > section').evaluateAll(items => items.map(x => ({ id: x.id, height: x.getBoundingClientRect().height })));
  for (let y = 0; y < await page.evaluate(() => document.body.scrollHeight); y += height) { await page.evaluate(y => window.scrollTo(0,y), y); await pause(30); }
  await page.evaluate(() => window.scrollTo(0,0)); await stable(page);
  await capture(page, `${width}-homepage`);
  await page.screenshot({ path: `${out}screenshots/${width}-header-closed.png` });
  for (const section of sections) await capture(page, `${width}-${section.id}`, page.locator(`#${section.id}`));
  await capture(page, `${width}-footer`, page.getByRole('contentinfo'));
  const geometry = await page.evaluate(() => ({
    documentWidth: document.documentElement.scrollWidth, viewport: innerWidth, height: document.body.scrollHeight,
    fontFamily: getComputedStyle(document.body).fontFamily,
    notoLoaded: document.fonts.check('16px "Noto Serif"'),
    headings: [...document.querySelectorAll('h1,h2,h3,h4')].filter(e => e.checkVisibility()).map(e=>({tag:e.tagName,text:e.textContent.trim()})),
    containers: [...document.querySelectorAll('.container-shell')].map(e=>({x:e.getBoundingClientRect().x,width:e.getBoundingClientRect().width})),
    images: [...document.images].filter(e=>e.checkVisibility()).map(e=>({alt:e.alt,src:e.currentSrc,width:e.naturalWidth,loading:e.loading})),
    controls: [...document.querySelectorAll('a,button,input,select,textarea,summary')].filter(e=>e.checkVisibility()&&!e.closest('[inert]')).map(e=>({text:(e.textContent||e.getAttribute('aria-label')||e.id).trim(),width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height})),
    fields: [...document.querySelectorAll('#request-a-quote input,#request-a-quote select,#request-a-quote textarea')].map(e=>({id:e.id,font:getComputedStyle(e).fontSize,border:getComputedStyle(e).borderColor,background:getComputedStyle(e).backgroundColor})),
    landmarks: [...document.querySelectorAll('header,main,footer,nav,form')].map(e=>({tag:e.tagName,label:e.getAttribute('aria-label')||e.getAttribute('aria-labelledby')})),
  }));
  report.widths.push({ width,height,sections,...geometry });
  if ([390,1440].includes(width)) {
    await page.evaluate(() => window.scrollTo(0,0));
    await axe(page, `${width}-default`);
    if (width < 1280) {
      await page.getByRole('button',{name:'Open navigation menu'}).click();
      await page.screenshot({path:`${out}screenshots/${width}-navigation-open.png`});
      await page.locator('summary').click(); await stable(page);
      await page.screenshot({path:`${out}screenshots/${width}-navigation-solutions-open.png`});
      await axe(page,`${width}-mobile-dialog`);
      await page.keyboard.press('Escape');
    } else {
      await page.getByRole('button',{name:'Our Solutions',exact:true}).click();
      await page.screenshot({path:`${out}screenshots/${width}-navigation-open.png`});
      await axe(page,`${width}-desktop-dropdown`);
      await page.keyboard.press('Escape');
    }
    const options = await page.locator('#solution-selection option').evaluateAll(items=>items.map(x=>({value:x.value,label:x.textContent.slice(5)})));
    for (const option of options) {
      if (width < 1024) await page.locator('#solution-selection').selectOption(option.value);
      else await page.locator('.solutions-navigation button').filter({hasText:option.label}).click();
      await pause(100);
      await capture(page,`${width}-solution-${option.value}`,page.locator('#industrial-solutions'));
    }
    for (const button of await page.locator('#zieve-advantage button').all()) {
      if(await button.getAttribute('aria-expanded')==='false') await button.click();
      await capture(page,`${width}-pillar-${await button.getAttribute('aria-controls')}`,page.locator('#zieve-advantage'));
    }
    await page.locator('#zieve-advantage button[aria-expanded=true]').click();
    await capture(page,`${width}-pillars-closed`,page.locator('#zieve-advantage'));
    await page.getByRole('button',{name:'Prepare enquiry email'}).click();
    await capture(page,`${width}-form-validation`,page.locator('#partner-with-zieve'));
    await axe(page,`${width}-form-invalid`);
    report.states.push({width,invalid:await page.locator('[aria-invalid=true]').count(),focus:await page.evaluate(()=>document.activeElement.id),snapshot:await page.locator('#request-a-quote').ariaSnapshot()});
    await page.locator('#quotation-fullName').fill('Audit Visitor');
    await page.locator('#quotation-email').fill('audit@example.com');
    await page.locator('#quotation-category').selectOption('industrial-chemicals');
    await page.locator('#quotation-requirements').fill('Please provide product specification information.');
    await page.getByRole('button',{name:'Prepare enquiry email'}).click();
    await page.locator('.quotation-draft').waitFor();
    await capture(page,`${width}-form-draft`,page.locator('#partner-with-zieve'));
    await axe(page,`${width}-draft-ready`);
    await page.locator('#quotation-requirements').fill('A detailed procurement enquiry. '.repeat(100));
    await page.getByRole('button',{name:'Prepare enquiry email'}).click();
    await capture(page,`${width}-form-long-enquiry`,page.locator('#partner-with-zieve'));
    await page.getByRole('contentinfo').getByRole('link',{name:'Back to top'}).focus();
    await page.keyboard.press('Enter');
    report.states.push({width,backToTop:{scroll:await page.evaluate(()=>scrollY),focus:await page.evaluate(()=>document.activeElement.id)}});
    await page.screenshot({path:`${out}screenshots/${width}-back-to-top.png`});
  }
  await context.close();
  writeFileSync(`${out}evidence/browser-audit.json`,JSON.stringify(report,null,2));
  process.stdout.write(`Captured ${width}px\n`);
}
await browser.close();
