import {chromium} from '@playwright/test';
const browser=await chromium.launch();
const page=await browser.newPage({viewport:{width:1440,height:1000}});await page.goto('http://127.0.0.1:3102',{waitUntil:'networkidle'});
console.log(await page.locator('.industry-scene').evaluate(el=>({html:el.outerHTML.slice(0,400),height:el.getBoundingClientRect().height,panels:[...el.querySelectorAll('.industry-panel')].map(p=>({client:p.clientHeight,scroll:p.scrollHeight,grid:p.querySelector('.industry-panel-grid').getBoundingClientRect().height}))})));
await page.locator('#industries-we-serve').scrollIntoViewIfNeeded();await page.screenshot({path:new URL('../screenshots/after-stage-initial.png',import.meta.url).pathname});await browser.close();
