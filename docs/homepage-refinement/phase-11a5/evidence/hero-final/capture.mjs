import {chromium} from '@playwright/test';
import {writeFile,mkdir} from 'node:fs/promises';
const root='docs/homepage-refinement/phase-11a5',out=`${root}/screenshots/hero-final`;await mkdir(out,{recursive:true});
const browser=await chromium.launch();const results=[];
for(const width of[390,768,1024,1440,1920]){
 const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1,reducedMotion:'reduce'});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.addInitScript(()=>{window.heroShifts=[];new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)window.heroShifts.push(e.value);}).observe({type:'layout-shift',buffered:true});});
 await page.goto('http://127.0.0.1:3102',{waitUntil:'networkidle'});await page.locator('#hero picture img').evaluate(image=>image.decode());
 await page.screenshot({path:`${out}/hero-${width}.png`});
 await page.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=700){scrollTo(0,y);await new Promise(r=>setTimeout(r,70));}await Promise.all([...document.images].map(image=>image.decode().catch(()=>{})));scrollTo(0,0);});
 await page.waitForTimeout(200);await page.screenshot({path:`${out}/homepage-${width}.png`,fullPage:true});
 results.push(await page.evaluate(()=>{const img=document.querySelector('#hero picture img'),visual=document.querySelector('.hero-visual'),rect=visual.getBoundingClientRect();return {width:innerWidth,scrollWidth:document.documentElement.scrollWidth,heroHeight:rect.height,photo:{url:img.currentSrc,loaded:img.complete&&img.naturalWidth>0,naturalWidth:img.naturalWidth,naturalHeight:img.naturalHeight,objectPosition:getComputedStyle(img).objectPosition},caption:document.querySelector('.hero-media-caption').textContent,cls:window.heroShifts.reduce((a,b)=>a+b,0),resources:performance.getEntriesByType('resource').filter(r=>r.initiatorType==='img').map(r=>({url:r.name,encodedBytes:r.encodedBodySize,transferBytes:r.transferSize,duration:r.duration})),headline:[...document.querySelectorAll('[data-hero-headline]')].map(e=>({color:getComputedStyle(e).color,fontSize:getComputedStyle(e).fontSize,weight:getComputedStyle(e).fontWeight})),overlay:getComputedStyle(document.querySelector('.hero-overlay')).backgroundImage};}));results.at(-1).errors=errors;await page.close();
}
await writeFile(`${root}/evidence/hero-final/responsive-qa.json`,JSON.stringify(results,null,2)+'\n');await browser.close();
