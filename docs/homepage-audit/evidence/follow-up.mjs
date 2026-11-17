import { chromium, expect } from '@playwright/test';
import { writeFileSync } from 'node:fs';
const browser=await chromium.launch();const root=new URL('../',import.meta.url).pathname;const results=[];
for(const width of [390,1440]){
 const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});await page.goto('http://127.0.0.1:3101');
 if(width===1440){const b=page.getByRole('button',{name:'Our Solutions',exact:true});await b.click();await expect(b).toHaveAttribute('aria-expanded','true');await expect(page.locator('.solutions-panel')).toHaveCSS('opacity','1');await page.waitForTimeout(250);await page.screenshot({path:`${root}screenshots/1440-navigation-open-stable.png`});}
 const cdp=await page.context().newCDPSession(page);await cdp.send('DOM.enable');await cdp.send('CSS.enable');const doc=await cdp.send('DOM.getDocument');const node=await cdp.send('DOM.querySelector',{nodeId:doc.root.nodeId,selector:'#hero-title'});const fonts=await cdp.send('CSS.getPlatformFontsForNode',{nodeId:node.nodeId});
 await page.evaluate(()=>{document.documentElement.style.fontSize='200%';});await page.waitForTimeout(200);
 const enlarged=await page.evaluate(()=>({viewport:innerWidth,width:document.documentElement.scrollWidth,overflow:[...document.querySelectorAll('h1,h2,h3,a,button')].filter(e=>e.checkVisibility()&&!e.closest('[inert]')).filter(e=>e.getBoundingClientRect().right>innerWidth+1).map(e=>({text:e.textContent.trim(),right:e.getBoundingClientRect().right})).slice(0,20),heroHeading:document.querySelector('h1').getBoundingClientRect().toJSON()}));
 results.push({width,fonts,enlarged});await page.close();
}
writeFileSync(`${root}evidence/follow-up.json`,JSON.stringify(results,null,2));await browser.close();
