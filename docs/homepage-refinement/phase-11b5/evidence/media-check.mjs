import {chromium} from '@playwright/test';
const b=await chromium.launch(),page=await b.newPage({viewport:{width:1440,height:1000}});page.on('response',r=>{if(r.url().includes('/_next/image'))console.log(r.status(),r.url());});
await page.goto('http://127.0.0.1:3102',{waitUntil:'networkidle'});await page.locator('#industries-we-serve').evaluate(el=>el.scrollIntoView({block:'start'}));
for(const figure of await page.locator('.industry-figure').all())console.log(await figure.evaluate(el=>({kind:el.dataset.mediaKind,failed:el.dataset.mediaFailed,html:el.innerHTML.slice(-500)})));
await b.close();
