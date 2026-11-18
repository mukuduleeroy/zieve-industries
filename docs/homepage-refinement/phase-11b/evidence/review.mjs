import {chromium} from '@playwright/test';
import {mkdir,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const phase=process.argv[2];if(!['before','after'].includes(phase))throw Error('Expected before/after');
const root='docs/homepage-refinement/phase-11b';await mkdir(`${root}/screenshots/${phase}`,{recursive:true});const browser=await chromium.launch(),results=[];
for(const width of[320,375,390,768,1024,1440,1920]){
 const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1,reducedMotion:'reduce'});const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('http://127.0.0.1:3102',{waitUntil:'networkidle'});
 await page.evaluate(async()=>{await document.fonts.ready;for(let y=0;y<document.body.scrollHeight;y+=700){scrollTo(0,y);await new Promise(r=>setTimeout(r,65));}await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));scrollTo(0,0);});await page.waitForTimeout(200);
 const item=await page.evaluate(()=>{const bounds=e=>{const r=e.getBoundingClientRect();return{x:r.x,y:r.y+scrollY,width:r.width,height:r.height}};return{width:innerWidth,scrollWidth:document.documentElement.scrollWidth,pageHeight:document.body.scrollHeight,sections:[...document.querySelectorAll('main>section')].map(e=>({id:e.id,...bounds(e)})),introFrame:bounds(document.querySelector('.introduction-image-mask')),hero:bounds(document.querySelector('#hero')),caption:bounds(document.querySelector('.hero-media-caption')),scroll:bounds(document.querySelector('.hero-scroll')),fields:[...document.querySelectorAll('.quotation-field')].map(e=>({id:e.querySelector('input,select,textarea').id,label:e.querySelector('label').textContent,control:bounds(e.querySelector('input,select,textarea')),labelBounds:bounds(e.querySelector('label'))})),numbers:[...document.querySelectorAll('.industry-number,.purpose-value-number')].map(e=>({text:e.textContent,hidden:e.getAttribute('aria-hidden'),color:getComputedStyle(e).color})),text:document.querySelector('main').textContent};});item.contentHash=createHash('sha256').update(item.text).digest('hex');delete item.text;item.errors=errors;
 if([390,768,1024,1440].includes(width))await page.screenshot({path:`${root}/screenshots/${phase}/homepage-${width}.png`,fullPage:true});
 if([390,1440].includes(width))await page.screenshot({path:`${root}/screenshots/${phase}/hero-${width}.png`});
 const style='.site-header,.skip-link{visibility:hidden!important}';
 if([390,768].includes(width))for(const [name,selector]of[['introduction','#company-introduction'],['industries','#industries-we-serve']])await page.locator(selector).screenshot({path:`${root}/screenshots/${phase}/${name}-${width}.png`,animations:'disabled',style});
 if([390,1440].includes(width)){
  await page.locator('#purpose-vision').scrollIntoViewIfNeeded();const y=await page.locator('#purpose-vision').evaluate(e=>e.getBoundingClientRect().top+scrollY);
  await page.screenshot({path:`${root}/screenshots/${phase}/advantage-vision-${width}.png`,fullPage:true,clip:{x:0,y:Math.max(0,y-240),width,height:650},style});
 }
 if([768,1024].includes(width))await page.locator('.quotation-form-surface').screenshot({path:`${root}/screenshots/${phase}/quotation-${width}.png`,animations:'disabled',style});
 if([390,1024].includes(width)){
  await page.locator('#quotation-fullName').fill('Tariro Moyo');await page.locator('#quotation-email').fill('tariro@example.com');await page.locator('#quotation-category').selectOption('earthmoving-construction');await page.locator('#quotation-requirements').fill('Please quote for excavator filters and fittings.');await page.getByRole('button',{name:'Prepare enquiry email'}).click();await page.locator('.quotation-draft').waitFor();
  item.draft={tag:await page.locator('.quotation-draft').evaluate(e=>e.tagName),role:await page.locator('.quotation-draft').getAttribute('role'),labelledby:await page.locator('.quotation-draft').getAttribute('aria-labelledby'),summary:await page.locator('#quotation-summary').inputValue(),aria:await page.locator('.quotation-draft').ariaSnapshot()};
  await page.locator('.quotation-draft').screenshot({path:`${root}/screenshots/${phase}/draft-${width}.png`,animations:'disabled',style});
 }
 results.push(item);await writeFile(`${root}/evidence/${phase}-review.json`,JSON.stringify(results,null,2)+'\n');await page.close();
}
await browser.close();
