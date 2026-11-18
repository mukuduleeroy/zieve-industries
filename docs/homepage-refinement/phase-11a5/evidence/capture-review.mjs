import { chromium } from '@playwright/test';
import { resolve } from 'node:path';
const root = resolve('docs/homepage-refinement/phase-11a5');
const browser = await chromium.launch();
for (const width of [375,390,768,1024,1440,1920]) {
 const page = await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1});
 await page.goto(`file://${root}/REVIEW_BOARD.html`);
 await page.evaluate(async()=>{await document.fonts.ready;await Promise.all(Array.from(document.images,im=>im.decode().catch(()=>{})));});
 await page.screenshot({path:`${root}/screenshots/research-board-${width}.png`,fullPage:true});
 await page.close();
}
for (const width of [390,1440]) {
 const page = await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1,reducedMotion:'reduce'});
 await page.goto('http://127.0.0.1:3102', {waitUntil:'networkidle'});
 await page.evaluate(async()=>{await document.fonts.ready;for(let y=0;y<document.body.scrollHeight;y+=700){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,70));}window.scrollTo(0,0);});
 await page.waitForTimeout(700);
 await page.screenshot({path:`${root}/screenshots/baseline-schematics-${width}.png`,fullPage:true});
 await page.close();
}
await browser.close();
