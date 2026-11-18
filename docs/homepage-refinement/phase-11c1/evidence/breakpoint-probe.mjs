import { chromium } from '@playwright/test';
import { writeFile } from 'node:fs/promises';
const browser=await chromium.launch();
const page=await browser.newPage({viewport:{width:390,height:900},isMobile:true,hasTouch:true,reducedMotion:'reduce'});
await page.goto('http://127.0.0.1:3102',{waitUntil:'networkidle'});
const records=[];
for(let cycle=0;cycle<5;cycle++)for(const width of [320,375,390,768,1024,1440,1920]){
 await page.setViewportSize({width,height:900});
 const read=()=>page.locator('.introduction-image-mask').evaluate(el=>({innerWidth,media:matchMedia('(min-width:64rem)').matches,aspectRatio:getComputedStyle(el).aspectRatio,width:el.getBoundingClientRect().width,height:el.getBoundingClientRect().height}));
 const immediate=await read();
 await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
 records.push({cycle,width,immediate,settled:await read()});
}
await writeFile(new URL('./breakpoint-probe.json',import.meta.url),JSON.stringify(records,null,2));
await browser.close();
