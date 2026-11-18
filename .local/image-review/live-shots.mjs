import {chromium,expect} from '@playwright/test';
import {readFile,writeFile} from 'node:fs/promises';
const base=new URL('./',import.meta.url),selection=JSON.parse(await readFile(new URL('selection.json',base))),browser=await chromium.launch(),checks=[];
for(const width of [1440,390])for(const [id,slug]of [['earthmoving','earthmoving-construction'],['elution','elution-gold-processing'],['lubricants','lubricants-fluids'],['civil','civil-infrastructure']]){
 const desktop=width===1440,page=await browser.newPage({viewport:{width,height:1000},deviceScaleFactor:1,reducedMotion:id==='civil'&&desktop?'no-preference':'reduce'});
 await page.goto('http://127.0.0.1:3102/'+(id==='civil'?'':`#solution-panel-${slug}`),{waitUntil:'networkidle'});
 const panel=page.locator(id==='civil'?`#industry-${slug}`:`#solution-panel-${slug}`),figure=panel.locator('figure');
 if(id==='civil'&&desktop){const scene=page.locator('.industry-scene');await expect(scene).toHaveAttribute('data-horizontal','true');await scene.evaluate(el=>scrollTo(0,Math.round(el.getBoundingClientRect().top+scrollY-document.querySelector('header').getBoundingClientRect().height)+Math.round(parseFloat(el.style.getPropertyValue('--industry-travel'))/3)));await expect(scene).toHaveAttribute('data-active-index','1');}
 else {if(id!=='civil')await expect(panel).toHaveAttribute('data-active','true');await panel.evaluate(el=>el.scrollIntoView({block:'start'}));}
 await expect.poll(()=>figure.locator('img').evaluate(el=>el.complete&&el.naturalWidth>0)).toBe(true);
 if(id!=='elution'){const c=selection.candidates.find(c=>c.id===id);await expect(figure).toHaveAttribute('data-media-kind','image');expect(await figure.locator('img').evaluate(el=>new URL(el.currentSrc).searchParams.get('url'))).toBe(c.publishedSrc);await expect(figure.locator('figcaption')).toContainText(c.author);}
 else await expect(figure).toHaveAttribute('data-media-kind','placeholder');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBe(0);
 await panel.screenshot({path:new URL(`screenshots/live-${id}-${desktop?'desktop':'mobile'}.png`,base).pathname});
 checks.push({id,width,integrated:id!=='elution',nextImage:id!=='elution',overflow:0});await page.close();
}
await browser.close();await writeFile(new URL('live-checks.json',base),JSON.stringify(checks,null,2));
