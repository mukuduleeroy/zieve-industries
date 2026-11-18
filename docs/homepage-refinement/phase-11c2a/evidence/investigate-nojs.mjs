import {chromium,devices,expect} from '@playwright/test';
import {writeFile,readFile} from 'node:fs/promises';
const out=new URL('./',import.meta.url),browser=await chromium.launch();
const css=await readFile('src/components/sections/company-introduction/introduction.css','utf8');
const report={browser:browser.version(),runs:[]};
for(const project of ['desktop','mobile'])for(const fixture of ['production-nojs'])for(const size of [100]){
 const context=await browser.newContext({...devices[project==='desktop'?'Desktop Chrome':'iPhone 13'],reducedMotion:'reduce',javaScriptEnabled:false});
 await context.tracing.start({screenshots:true,snapshots:true,sources:true});
 const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 if(fixture.startsWith('production'))await page.goto('http://127.0.0.1:3102',{waitUntil:'networkidle'});
 else await page.setContent(`<meta name="viewport" content="width=device-width,initial-scale=1"><style>${css}</style><div class="company-introduction"><div class="introduction-grid"><div class="introduction-editorial">Static control: no React, header, fonts, transitions or animation</div><figure class="introduction-figure"><div class="introduction-image-mask"></div></figure></div></div>`);
 await page.evaluate(size=>document.documentElement.style.fontSize=`${size}%`,size);
 const measurements=[];
 for(const width of Array.from({length:5},()=>[390,768,1023,1024,1025,1279,1280,1440,1920,1024,1023,390]).flat()){
  await page.setViewportSize({width,height:900});
  const measure=()=>page.locator('.introduction-image-mask').evaluate(el=>{const r=el.getBoundingClientRect(),s=getComputedStyle(el);return{time:performance.now(),width:innerWidth,ratio:r.height/r.width,aspectRatio:s.aspectRatio,breakpoint:matchMedia('(min-width:64rem)').matches,rootFont:getComputedStyle(document.documentElement).fontSize,scrollY,headerHeight:document.documentElement.style.getPropertyValue('--header-height'),fontsStatus:document.fonts.status,customFaces:document.fonts.size,transition:s.transition,animation:s.animation,ready:document.readyState};});
  const immediate=await measure();
  await expect.poll(async()=>{const m=await measure();return m.ratio;}).toBeCloseTo(width<1024?.75:1.2,1);
  const settled=await measure();measurements.push({width,immediate,settled});
  if(width===1024&&fixture==='production')await page.screenshot({path:new URL(`${project}-${fixture}-${size}-1024.png`,out).pathname});
 }
 report.runs.push({project,fixture,size,errors,measurements});
 await context.tracing.stop({path:new URL(`${project}-${fixture}-${size}-trace.zip`,out).pathname});await context.close();
}
await writeFile(new URL('nojs-investigation.json',out),JSON.stringify(report,null,2));await browser.close();
