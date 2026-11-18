import {chromium,expect} from '@playwright/test';
import {writeFile} from 'node:fs/promises';
const browser=await chromium.launch(),records=[];
for(const width of [1440,1920]){
 const page=await browser.newPage({viewport:{width,height:1000},deviceScaleFactor:1});
 await page.goto('http://127.0.0.1:3102',{waitUntil:'networkidle'});
 const scene=page.locator('.industry-scene'),track=page.locator('.industry-sector-list');
 await expect(scene).toHaveAttribute('data-horizontal','true');
 for(const [state,fraction]of[['initial',0],['midway',.5],['final',1],['reverse',1/3],['release',1]]){
  const g=await scene.evaluate(el=>({top:el.getBoundingClientRect().top+scrollY,travel:parseFloat(el.style.getPropertyValue('--industry-travel')),header:document.querySelector('header').getBoundingClientRect().height}));
  await page.evaluate(({g,fraction,state})=>scrollTo(0,g.top-g.header+g.travel*fraction+(state==='release'?240:0)),{g,fraction,state});
  await expect.poll(()=>track.evaluate(el=>new DOMMatrix(getComputedStyle(el).transform).m41)).toBeCloseTo(-g.travel*fraction,0);
  const active=Math.round(fraction*3);
  await expect.poll(()=>page.locator('.industry-panel').nth(active).locator('img').evaluate(el=>el.complete&&el.naturalWidth>0)).toBe(true);
  await expect(scene).toHaveAttribute('data-horizontal','true');
  records.push({width,state,...await scene.evaluate(el=>({mode:el.dataset.horizontal,index:el.dataset.activeIndex,stageTop:el.querySelector('.industry-stage').getBoundingClientRect().top,overflow:document.documentElement.scrollWidth-innerWidth,media:[...el.querySelectorAll('.industry-figure')].map(f=>({kind:f.dataset.mediaKind,failed:f.dataset.mediaFailed,src:f.querySelector('img')?.currentSrc}))}))});
  await page.screenshot({path:new URL(`../screenshots/after-${width}-${state}.png`,import.meta.url).pathname});
 }
 await page.emulateMedia({reducedMotion:'reduce'});await expect(scene).not.toHaveAttribute('data-horizontal','true');
 await page.locator('#industry-mining-mineral-processing').scrollIntoViewIfNeeded();
 await page.screenshot({path:new URL(`../screenshots/after-${width}-reduced.png`,import.meta.url).pathname});await page.close();
}
await writeFile(new URL('horizontal-qa.json',import.meta.url),JSON.stringify(records,null,2));await browser.close();
