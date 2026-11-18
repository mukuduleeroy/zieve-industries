import { chromium } from '@playwright/test';
import { writeFileSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import os from 'node:os';
const out = new URL('./', import.meta.url).pathname;
const phase = process.argv[2] || 'baseline';
const browser = await chromium.launch();
const report = { environment: { time:new Date().toISOString(), node:process.version,platform:os.platform(),arch:os.arch(),cpus:os.cpus().length,cpu:os.cpus()[0].model,ramGiB:Math.round(os.totalmem()/2**30),browser:browser.version(),base:'http://127.0.0.1:3102',dpr:1,notes:'Headless Chromium on local production server. Fresh context, cache disabled each run. Desktop unthrottled; mobile 4x CPU, 150ms latency, 1.6Mbps down/750Kbps up CDP emulation. No Lighthouse or real-user metrics.' }, runs: [] };
for(const mobile of [false,true]) for(let run=1;run<=3;run++) {
 const context=await browser.newContext({viewport:{width:mobile?390:1440,height:mobile?844:1000},deviceScaleFactor:1,reducedMotion:'no-preference',locale:'en-ZW',timezoneId:'Africa/Harare'});
 const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const cdp=await context.newCDPSession(page);await cdp.send('Network.enable');await cdp.send('Network.setCacheDisabled',{cacheDisabled:true});
 if(mobile){await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:150,downloadThroughput:1_600_000/8,uploadThroughput:750_000/8});}
 await page.addInitScript(()=>{
  window.auditMetrics={lcp:[],shifts:[],events:[],longTasks:[]};
  for(const [type,key] of [['largest-contentful-paint','lcp'],['layout-shift','shifts'],['event','events'],['longtask','longTasks']])try{new PerformanceObserver(list=>{for(const e of list.getEntries())window.auditMetrics[key].push({start:e.startTime,duration:e.duration,value:e.value,input:e.hadRecentInput,interactionId:e.interactionId,name:e.name,element:e.element?.outerHTML?.slice(0,300),sources:e.sources?.map(s=>({node:s.node?.nodeName,previous:s.previousRect,current:s.currentRect}))});}).observe({type,buffered:true,...(type==='event'?{durationThreshold:16}:{})});}catch{}
 });
 await page.goto(report.environment.base,{waitUntil:'networkidle'});await page.waitForTimeout(2500);
 const initial=await page.evaluate(()=>({metrics:window.auditMetrics,navigation:performance.getEntriesByType('navigation')[0].toJSON(),resources:performance.getEntriesByType('resource').map(r=>({name:r.name,type:r.initiatorType,transfer:r.transferSize,encoded:r.encodedBodySize,decoded:r.decodedBodySize,duration:r.duration})),paint:performance.getEntriesByType('paint').map(e=>e.toJSON())}));
 const requestBytes=initial.resources.reduce((acc,r)=>acc+r.transfer,0);
 await page.locator('#industrial-solutions').scrollIntoViewIfNeeded();await page.waitForTimeout(1600);
 const start=performance.now();
 if(mobile)await page.locator('#solution-selection').selectOption('industrial-chemicals');else await page.locator('.solutions-navigation button').nth(2).click();
 await page.locator('.solution-panel[data-active=true] .solution-panel-copy').waitFor();
 const automationRoundTrip=performance.now()-start;
 await page.waitForTimeout(350);
 // Traverse the full page to include reveal/parallax-related geometry changes in observed CLS.
 const h=await page.evaluate(()=>document.body.scrollHeight);
 for(let y=0;y<h;y+=700){await page.evaluate(y=>scrollTo(0,y),y);await page.waitForTimeout(100);}
 await page.waitForTimeout(1200);
 const final=await page.evaluate(()=>({metrics:window.auditMetrics,resources:performance.getEntriesByType('resource').map(r=>({name:r.name,type:r.initiatorType,transfer:r.transferSize,encoded:r.encodedBodySize,decoded:r.decodedBodySize})),fonts:[...document.fonts].map(f=>({family:f.family,status:f.status}))}));
 report.runs.push({mobile,run,initial,initialResourceTransferBytes:requestBytes,automationRoundTripMs:automationRoundTrip,final,errors});
 await context.close();writeFileSync(`${out}performance-${phase}.json`,JSON.stringify(report,null,2));process.stdout.write(`Measured ${mobile?'mobile':'desktop'} ${run}\n`);
}
const files=[];function walk(dir){for(const name of readdirSync(dir)){const p=`${dir}/${name}`;if(statSync(p).isDirectory())walk(p);else if(/\.(js|css)$/.test(name)){const b=readFileSync(p);files.push({path:p,bytes:b.length,gzipBytes:gzipSync(b).length});}}}walk('.next/static');
report.buildAssets=files;writeFileSync(`${out}performance-${phase}.json`,JSON.stringify(report,null,2));await browser.close();
