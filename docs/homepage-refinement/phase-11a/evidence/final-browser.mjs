import { chromium } from '@playwright/test';
import { createRequire } from 'node:module';
import { writeFileSync } from 'node:fs';
const require=createRequire(import.meta.url);const root=new URL('../',import.meta.url).pathname;const browser=await chromium.launch();const records=[];
for(const width of [390,1440]){
 const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce',deviceScaleFactor:1});await page.goto('http://127.0.0.1:3101',{waitUntil:'networkidle'});
 const links=await page.locator('a').evaluateAll(es=>es.map(e=>({label:e.textContent.trim()||e.getAttribute('aria-label'),href:e.getAttribute('href')})));
 await page.addScriptTag({path:require.resolve('axe-core/axe.min.js')});
 const axe=await page.evaluate(async()=>{const r=await window.axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}});return{violations:r.violations,incomplete:r.incomplete};});
 await page.evaluate(()=>{document.documentElement.style.fontSize='200%';});await page.waitForTimeout(100);
 let dropdown = null;
 if(width===1440){await page.getByRole('button',{name:'Our Solutions',exact:true}).click();await page.waitForTimeout(150);dropdown=await page.locator('.solutions-panel').evaluate(e=>({rect:e.getBoundingClientRect().toJSON(),document:document.documentElement.scrollWidth}));await page.screenshot({path:`${root}screenshots/after-1440-200-dropdown-verified.png`});await page.keyboard.press('Escape');}
 const rects=await page.locator('.hero-eyebrow,.hero-title,.hero-supporting,.hero-actions,.hero-scroll,.hero-media-caption').evaluateAll(es=>es.map(e=>({name:e.className,...e.getBoundingClientRect().toJSON()})));
 await page.locator('#hero').screenshot({path:`${root}screenshots/after-${width}-200-hero.png`,style:'.site-header,.skip-link{visibility:hidden!important}',animations:'disabled'});
 records.push({width,links,axe,dropdown,heroRects:rects});await page.close();
}
writeFileSync(`${root}evidence/final-browser.json`,JSON.stringify(records,null,2));await browser.close();
