import {chromium,expect} from '@playwright/test';
import {createRequire} from 'node:module';
import {writeFile} from 'node:fs/promises';
const require=createRequire(import.meta.url),browser=await chromium.launch(),page=await browser.newPage({viewport:{width:1440,height:1000}}),results=[];
await page.goto('http://127.0.0.1:3102',{waitUntil:'networkidle'});await page.addScriptTag({path:require.resolve('axe-core/axe.min.js')});
const scene=page.locator('.industry-scene');await expect(scene).toHaveAttribute('data-horizontal','true');
for(let index=0;index<4;index++){
 await scene.evaluate((el,index)=>scrollTo(0,el.getBoundingClientRect().top+scrollY-document.querySelector('header').getBoundingClientRect().height+parseFloat(el.style.getPropertyValue('--industry-travel'))*index/3),index);
 await expect.poll(()=>page.locator('.industry-sector-list').evaluate(el=>new DOMMatrix(getComputedStyle(el).transform).m41)).toBeCloseTo(-1440*index,0);
 const scan=await page.evaluate(async()=>{const r=await window.axe.run(document.querySelector('#industries-we-serve'),{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','best-practice']}});return{violations:r.violations,incomplete:r.incomplete,passes:r.passes.map(p=>p.id)};});results.push({index,...scan});
}
await writeFile(new URL('horizontal-axe.json',import.meta.url),JSON.stringify(results,null,2));await browser.close();
