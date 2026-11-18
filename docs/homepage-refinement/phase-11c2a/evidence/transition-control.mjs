import {chromium,devices,expect} from '@playwright/test';
import {writeFile} from 'node:fs/promises';
const browser=await chromium.launch(),runs=[];
for(const project of ['desktop','mobile'])for(const mode of ['reduce','no-preference','reduce-mask-no-transition']){
 const context=await browser.newContext({...devices[project==='desktop'?'Desktop Chrome':'iPhone 13'],javaScriptEnabled:false,reducedMotion:mode==='no-preference'?mode:'reduce'});
 const page=await context.newPage();await page.goto('http://127.0.0.1:3100',{waitUntil:'networkidle'});
 if(mode==='reduce-mask-no-transition')await page.locator('.introduction-image-mask').evaluate(el=>el.style.setProperty('transition','none','important'));
 const samples=[];
 for(const width of Array.from({length:10},()=>[1023,1024]).flat()){
  await page.setViewportSize({width,height:900});
  const read=()=>page.locator('.introduction-image-mask').evaluate(el=>{const s=getComputedStyle(el),r=el.getBoundingClientRect();return{width:innerWidth,ratio:r.height/r.width,aspect:s.aspectRatio,transition:s.transition,animations:el.getAnimations().map(a=>({type:a.constructor.name,property:a.transitionProperty,state:a.playState,timing:a.effect.getComputedTiming()}))};});
  const immediate=await read();await expect.poll(async()=>(await read()).ratio).toBeCloseTo(width<1024?.75:1.2,1);samples.push({width,immediate,settled:await read()});
 }
 runs.push({project,mode,samples});await context.close();
}
await writeFile(new URL('./transition-control.json',import.meta.url),JSON.stringify(runs,null,2));await browser.close();
