import { chromium } from '@playwright/test';
import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
const root=resolve('docs/homepage-refinement/phase-11a5');
const browser=await chromium.launch();const results=[];
for(const width of [390,768,1024,1440,1920]){
 const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1,reducedMotion:'reduce'});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.addInitScript(()=>{window.photoShifts=[];new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)window.photoShifts.push(e.value);}).observe({type:'layout-shift',buffered:true});});
 await page.goto('http://127.0.0.1:3102',{waitUntil:'networkidle'});
 await page.evaluate(async()=>{await document.fonts.ready;for(let y=0;y<document.body.scrollHeight;y+=600){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,100));}});
 await page.evaluate(async()=>{await Promise.all(Array.from(document.images,im=>im.decode().catch(()=>{})));window.scrollTo(0,0);});await page.waitForTimeout(300);
 await page.screenshot({path:`${root}/screenshots/homepage-integrated-${width}.png`,fullPage:true});
 const initial=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,height:document.body.scrollHeight,cls:window.photoShifts.reduce((a,b)=>a+b,0),figures:[...document.querySelectorAll('figure')].map(f=>({kind:f.dataset.mediaKind,caption:f.querySelector('figcaption')?.textContent,image:f.querySelector('img')?{alt:f.querySelector('img').alt,loaded:f.querySelector('img').complete&&f.querySelector('img').naturalWidth>0,src:f.querySelector('img').currentSrc,position:getComputedStyle(f.querySelector('img')).objectPosition}:null}))}));
 await page.locator('#industrial-solutions').scrollIntoViewIfNeeded();
 for(const slug of ['industrial-chemicals','consumables-spares']){
  if(width<1024)await page.getByRole('combobox',{name:'Choose a division'}).selectOption(slug);
  else await page.locator(`button[aria-controls="solution-panel-${slug}"]`).click();
  const panel=page.locator('.solution-panel[data-active=true]');await panel.locator('img').evaluate(im=>im.decode());await page.waitForTimeout(250);
  if(width===390||width===1440)await page.locator('#industrial-solutions').screenshot({path:`${root}/screenshots/solution-${slug}-${width}.png`,animations:'disabled',style:'.site-header,.skip-link{visibility:hidden!important}'});
 }
 results.push({...initial,errors});await page.close();
}
for(const width of [390,1440]){const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1});await page.goto(`file://${root}/FINAL_SELECTION_BOARD.html`);await page.evaluate(async()=>{await Promise.all(Array.from(document.images,im=>im.decode()));});await page.screenshot({path:`${root}/screenshots/final-selection-${width}.png`,fullPage:true});await page.close();}
await browser.close();await writeFile(`${root}/evidence/stage-b/responsive-qa.json`,JSON.stringify(results,null,2)+'\n');
