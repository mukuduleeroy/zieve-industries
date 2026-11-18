import {chromium,expect} from '@playwright/test';
import {writeFile} from 'node:fs/promises';
const phase=process.argv[2]||'before',browser=await chromium.launch(),records=[];
for(const width of [1440,1920]){
 const page=await browser.newPage({viewport:{width,height:1000},deviceScaleFactor:1});await page.goto('http://127.0.0.1:3102',{waitUntil:'networkidle'});
 const scene=page.locator('.industry-scene'),track=page.locator('.industry-sector-list');await expect(scene).toHaveAttribute('data-horizontal','true');
 for(const [state,fraction,extra] of [['initial',0,0],['midway',.5,0],['final',1,0],['reverse',.5,0],['release',1,240]]){
  const g=await scene.evaluate(el=>({top:el.getBoundingClientRect().top+scrollY,travel:parseFloat(el.style.getPropertyValue('--industry-travel')),header:document.querySelector('header').getBoundingClientRect().height}));
  await page.evaluate(({g,fraction,extra})=>scrollTo(0,g.top-g.header+g.travel*fraction+extra),{g,fraction,extra});
  await expect.poll(()=>track.evaluate(el=>new DOMMatrix(getComputedStyle(el).transform).m41)).toBeCloseTo(-g.travel*fraction,0);
  await expect.poll(()=>page.locator('.industry-panel').nth(Math.round(fraction*3)).locator('img').evaluate(el=>el.complete&&el.naturalWidth>0)).toBe(true);
  await page.screenshot({path:new URL(`../screenshots/${phase}-${width}-${state}.png`,import.meta.url).pathname});
  records.push({width,state,fraction,...await scene.evaluate(el=>({travel:el.style.getPropertyValue('--industry-travel'),stageTop:el.querySelector('.industry-stage').getBoundingClientRect().top,overflow:document.documentElement.scrollWidth-innerWidth,panels:[...el.querySelectorAll('.industry-panel')].map(p=>({id:p.id,title:p.querySelector('h3').textContent,figure:p.querySelector('figure').getBoundingClientRect().toJSON(),heading:p.querySelector('h3').getBoundingClientRect().toJSON()}))}))});
 }
 await page.close();
}
for(const width of [320,375,390,430,768,1024,1440,1920]){
 const page=await browser.newPage({viewport:{width,height:1000},deviceScaleFactor:1,reducedMotion:'reduce'});await page.goto('http://127.0.0.1:3102',{waitUntil:'networkidle'});
 const panel=page.locator('#industry-mining-mineral-processing');await panel.evaluate(el=>el.scrollIntoView({block:'start'}));await expect.poll(()=>panel.locator('img').evaluate(el=>el.complete&&el.naturalWidth>0)).toBe(true);
 if(width<=430||width===1440){await page.screenshot({path:new URL(`../screenshots/${phase}-${width}-flow.png`,import.meta.url).pathname});await panel.screenshot({path:new URL(`../screenshots/${phase}-${width}-panel.png`,import.meta.url).pathname});}
 records.push({width,state:'flow',...await panel.evaluate(el=>({overflow:document.documentElement.scrollWidth-innerWidth,children:[...el.querySelector('.industry-panel-grid').children].map(e=>e.className),title:el.querySelector('h3').getBoundingClientRect().toJSON(),image:el.querySelector('figure').getBoundingClientRect().toJSON(),description:el.querySelector('.industry-description').getBoundingClientRect().toJSON()}))});
 if(width===390||width===1440){await page.evaluate(()=>document.documentElement.style.fontSize='200%');await panel.evaluate(el=>el.scrollIntoView({block:'start'}));await page.screenshot({path:new URL(`../screenshots/${phase}-${width}-enlarged.png`,import.meta.url).pathname});}
 await page.close();
}
const context=await browser.newContext({viewport:{width:1440,height:1000},recordVideo:{dir:new URL('../screenshots/',import.meta.url).pathname,size:{width:1440,height:1000}}});
const page=await context.newPage();await page.goto('http://127.0.0.1:3102',{waitUntil:'networkidle'});await expect(page.locator('.industry-scene')).toHaveAttribute('data-horizontal','true');
await page.locator('.industry-scene').evaluate(async el=>{const top=el.getBoundingClientRect().top+scrollY-document.querySelector('header').getBoundingClientRect().height,travel=parseFloat(el.style.getPropertyValue('--industry-travel'));for(const [start,end]of [[-.05,1.05],[1.05,.3],[.3,1.1]])for(let step=0;step<=65;step++){scrollTo(0,top+travel*(start+(end-start)*step/65));await new Promise(requestAnimationFrame);}});
const video=page.video();await context.close();await video.saveAs(new URL(`../screenshots/${phase}-scroll-through.webm`,import.meta.url).pathname);await video.delete();
await writeFile(new URL(`${phase}-visual.json`,import.meta.url),JSON.stringify(records,null,2));await browser.close();
