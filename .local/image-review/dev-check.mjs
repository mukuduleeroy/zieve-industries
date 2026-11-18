import {chromium,expect} from '@playwright/test';
import {createRequire} from 'node:module';
import {writeFile} from 'node:fs/promises';
const require=createRequire(import.meta.url),WebSocket=require('next/dist/compiled/ws'),browser=await chromium.launch(),results=[];
for(const path of ['/','/#solution-panel-consumables-spares','/#industrial-solutions']){
 const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'}),warnings=[];let socketURL;
 page.on('console',m=>{if(['warning','error'].includes(m.type()))warnings.push(m.text());});page.on('websocket',s=>{if(s.url().includes('/_next/'))socketURL=s.url();});
 await page.goto('http://localhost:3000'+path,{waitUntil:'networkidle'});
 await expect.poll(()=>page.locator('#hero picture img').evaluate(el=>el.complete&&el.naturalWidth>0)).toBe(true);
 if(path.includes('consumables'))await expect(page.locator('#solution-panel-consumables-spares')).toHaveAttribute('data-active','true');
 const parentPosition=await page.locator('#hero picture img').evaluate(el=>getComputedStyle(el.parentElement).position);
 expect(['relative','absolute','fixed']).toContain(parentPosition);
 expect(warnings.filter(w=>/invalid "position"|was detected as the Largest Contentful Paint|hydrated/.test(w))).toEqual([]);
 if(path==='/'){
  const asset=await page.locator('script[src*="/_next/"]').first().getAttribute('src');
  const response=await page.request.get(new URL(asset,page.url()).href,{headers:{Origin:'http://192.168.100.151:3000'}});expect(response.status()).toBe(200);
  if(!socketURL)throw Error('No development websocket observed');
  await new Promise((resolve,reject)=>{const ws=new WebSocket(socketURL,{origin:'http://192.168.100.151:3000'}),timer=setTimeout(()=>{ws.terminate();reject(Error('HMR handshake timeout'));},10000);ws.on('open',()=>{clearTimeout(timer);ws.close();resolve();});ws.on('error',e=>{clearTimeout(timer);reject(e);});});
  results.push({allowedOrigin:'192.168.100.151',devAssetStatus:response.status(),hmrHandshake:'opened'});
 }
 results.push({path,parentPosition,warnings});await page.close();
}
await browser.close();await writeFile(new URL('dev-check.json',import.meta.url),JSON.stringify(results,null,2));
