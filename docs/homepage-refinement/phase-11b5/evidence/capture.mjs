import {chromium,expect} from '@playwright/test';
import {writeFile} from 'node:fs/promises';
const phase=process.argv[2]||'before',browser=await chromium.launch(),records=[];
for(const width of [390,768,1024,1440,1920]){
 const page=await browser.newPage({viewport:{width,height:1000},deviceScaleFactor:1,reducedMotion:'reduce'});
 await page.goto('http://127.0.0.1:3102',{waitUntil:'networkidle'});
 for(const figure of await page.locator('main figure').all()){await figure.scrollIntoViewIfNeeded(); const image=figure.locator('img'); if(await image.count())await expect.poll(()=>image.evaluate(el=>el.complete&&el.naturalWidth>0)).toBe(true);}
 await page.evaluate(()=>scrollTo(0,0));
 await page.screenshot({path:new URL(`../screenshots/${phase}-${width}-homepage.png`,import.meta.url).pathname,fullPage:true});
 await page.locator('#industries-we-serve').evaluate(el=>el.scrollIntoView({block:'start'}));
 await page.screenshot({path:new URL(`../screenshots/${phase}-${width}-industries.png`,import.meta.url).pathname});
 records.push(await page.evaluate(()=>({width:innerWidth,overflow:document.documentElement.scrollWidth-innerWidth,headings:[...document.querySelectorAll('main h1,main h2,main h3')].map(el=>({tag:el.tagName,text:el.textContent})),numberedEyebrows:[...document.querySelectorAll('main p')].filter(el=>/^\d{2}\s*\//.test(el.textContent.trim())).map(el=>el.textContent)})));
 await page.close();
}
await writeFile(new URL(`${phase}-inventory.json`,import.meta.url),JSON.stringify(records,null,2));await browser.close();
