import {chromium} from '@playwright/test';
import {createRequire} from 'node:module';
import {writeFile} from 'node:fs/promises';
const require=createRequire(import.meta.url),phase=process.argv[2];const browser=await chromium.launch(),report=[];
for(const width of[390,1024,1440]){
 const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});await page.goto('http://127.0.0.1:3102',{waitUntil:'networkidle'});await page.addScriptTag({path:require.resolve('axe-core/axe.min.js')});
 const scan=async state=>{const result=await page.evaluate(async()=>{const r=await window.axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','best-practice']}});return{violations:r.violations,incomplete:r.incomplete,passes:r.passes.map(x=>x.id)};});report.push({width,state,...result});};await scan('default');
 await page.locator('#quotation-fullName').fill('Tariro Moyo');await page.locator('#quotation-email').fill('tariro@example.com');await page.locator('#quotation-category').selectOption('earthmoving-construction');await page.locator('#quotation-requirements').fill('Please quote for excavator filters and fittings.');await page.getByRole('button',{name:'Prepare enquiry email'}).click();await page.locator('.quotation-draft').waitFor();await scan('draft');
 await writeFile(`docs/homepage-refinement/phase-11c1/evidence/${phase}-axe.json`,JSON.stringify(report,null,2)+'\n');await page.close();
}
await browser.close();
