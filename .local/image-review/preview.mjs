import {chromium,expect} from '@playwright/test';
import {readFile,writeFile} from 'node:fs/promises';
const base=new URL('./',import.meta.url),selection=JSON.parse(await readFile(new URL('selection.json',base))),browser=await chromium.launch(),results=[];
const slots=[['earthmoving','earthmoving-construction'],['elution','elution-gold-processing'],['lubricants','lubricants-fluids'],['civil','civil-infrastructure']];
for(const width of [1440,390])for(const [id,slug]of slots){
 const desktop=width===1440,context=await browser.newContext({viewport:{width,height:1000},deviceScaleFactor:1,reducedMotion:id==='civil'&&desktop?'no-preference':'reduce'}),page=await context.newPage();
 await page.route('**/__private_review/*',async route=>{const name=new URL(route.request().url()).pathname.split('/').pop();await route.fulfill({status:200,contentType:'image/webp',body:await readFile(new URL(`assets/${name}`,base))});});
 if(id==='civil'){
  await page.goto('http://127.0.0.1:3102/',{waitUntil:'networkidle'});
  if(desktop){const scene=page.locator('.industry-scene');await expect(scene).toHaveAttribute('data-horizontal','true');const g=await scene.evaluate(el=>({top:el.getBoundingClientRect().top+scrollY,travel:parseFloat(el.style.getPropertyValue('--industry-travel')),header:document.querySelector('header').getBoundingClientRect().height}));await page.evaluate(g=>scrollTo(0,Math.round(g.top-g.header)+Math.round(g.travel/3)),g);await expect(scene).toHaveAttribute('data-active-index','1');}
 }else{await page.goto(`http://127.0.0.1:3102/#solution-panel-${slug}`,{waitUntil:'networkidle'});await expect(page.locator(`#solution-panel-${slug}`)).toHaveAttribute('data-active','true');}
 const panel=page.locator(id==='civil'?`#industry-${slug}`:`#solution-panel-${slug}`),figure=panel.locator('figure'),candidate=selection.candidates.find(c=>c.id===id);
 const originalCopy=await panel.locator('h3,p,li').evaluateAll(els=>els.filter(el=>!el.closest('figure')).map(el=>el.textContent));
 if(candidate){
  await figure.evaluate((el,c)=>{const img=el.querySelector('img');img.removeAttribute('srcset');img.removeAttribute('sizes');img.loading='eager';img.alt=c.alt;img.src=`/__private_review/${c.id}-${c.variant}.webp`;el.style.setProperty('--solution-desktop-position','50% 50%');el.style.setProperty('--solution-mobile-position','50% 50%');el.style.setProperty('--industry-desktop-position','50% 50%');el.style.setProperty('--industry-mobile-position','50% 50%');el.querySelector('figcaption').textContent=`REVIEW ONLY · ${c.credit} · Not a Zieve site · Awaiting approval`;},{...candidate,variant:desktop?'desktop':'mobile'});
 }
 await expect.poll(()=>figure.locator('img').evaluate(el=>el.complete&&el.naturalWidth>0)).toBe(true);
 if(!desktop||id!=='civil')await panel.evaluate(el=>el.scrollIntoView({block:'start'}));
 expect(await panel.locator('h3,p,li').evaluateAll(els=>els.filter(el=>!el.closest('figure')).map(el=>el.textContent))).toEqual(originalCopy);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBe(0);
 await panel.screenshot({path:new URL(`screenshots/${id}-${desktop?'desktop':'mobile'}.png`,base).pathname});
 if(id==='civil'&&desktop){const h=await panel.locator('h3').boundingBox(),f=await figure.boundingBox();expect(f.x).toBeGreaterThan(h.x+h.width);await expect(page.locator('.industry-scene')).toHaveAttribute('data-horizontal','true');}
 results.push({slot:id,width,status:candidate?'private-photo-preview-awaiting-approval':'unchanged-schematic-rights-and-image-approval-missing',overflow:0,businessCopyPreserved:true});await context.close();
}
await browser.close();await writeFile(new URL('checks.json',base),JSON.stringify(results,null,2));
