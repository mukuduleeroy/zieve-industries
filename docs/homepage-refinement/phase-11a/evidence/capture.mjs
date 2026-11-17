import { chromium } from '@playwright/test';
import { writeFileSync } from 'node:fs';
const mode=process.argv[2]||'before';
const root=new URL('../',import.meta.url).pathname;
const browser=await chromium.launch();const records=[];
for(const width of [320,375,390,768,1024,1440,1920])for(const size of [100,200]){
 const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1,reducedMotion:'reduce'});
 await page.goto('http://127.0.0.1:3101',{waitUntil:'networkidle'});
 await page.evaluate(size=>{document.documentElement.style.fontSize=`${size}%`;},size);await page.waitForTimeout(180);
 const data=await page.evaluate(()=>({width:innerWidth,document:document.documentElement.scrollWidth,header:document.querySelector('header').getBoundingClientRect().toJSON(),hero:document.querySelector('#hero').getBoundingClientRect().toJSON(),sections:[...document.querySelectorAll('main>section')].map(e=>({id:e.id,height:e.getBoundingClientRect().height})),overflow:[...document.querySelectorAll('header *,main *,footer *')].filter(e=>e.checkVisibility()&&!e.closest('[inert]')).filter(e=>e.scrollWidth>e.clientWidth+2 && e.clientWidth>0).map(e=>({tag:e.tagName,class:e.className,client:e.clientWidth,scroll:e.scrollWidth,text:e.textContent.trim().slice(0,50)})).slice(0,35)}));
 records.push({size,...data});
 if([390,768,1024,1440].includes(width)){
  await page.screenshot({path:`${root}screenshots/${mode}-${width}-${size}-top.png`});
  if(size===100)await page.screenshot({path:`${root}screenshots/${mode}-${width}-homepage.png`,fullPage:true});
  const menu=page.getByRole('button',{name:'Open navigation menu'});
  if(await menu.isVisible()){await menu.click();await page.waitForTimeout(200);await page.screenshot({path:`${root}screenshots/${mode}-${width}-${size}-menu.png`});}
  else { await page.getByRole('button',{name:'Our Solutions',exact:true}).click(); await page.waitForTimeout(100); await page.screenshot({path:`${root}screenshots/${mode}-${width}-${size}-dropdown.png`}); }
 }
 await page.close();
}
writeFileSync(`${root}evidence/${mode}-measurements.json`,JSON.stringify(records,null,2));await browser.close();
