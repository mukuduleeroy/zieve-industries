import {chromium,devices,expect} from '@playwright/test';
const browser=await chromium.launch();
for(const project of ['desktop','mobile']){
 const context=await browser.newContext({...devices[project==='desktop'?'Desktop Chrome':'iPhone 13'],reducedMotion:'reduce'});
 const page=await context.newPage();await page.goto('http://127.0.0.1:3102');
 for(const size of [100,200])for(const width of [1023,1024]){
  await page.evaluate(n=>document.documentElement.style.fontSize=`${n}%`,size);
  await page.setViewportSize({width,height:900});
  const frame=page.locator('.introduction-image-mask');
  await expect.poll(async()=>{const b=await frame.boundingBox();return b.height/b.width;}).toBeCloseTo(width<1024?.75:1.2,1);
  await page.locator('#company-introduction').scrollIntoViewIfNeeded();
  await page.screenshot({path:new URL(`${project}-introduction-${size}-${width}.png`,import.meta.url).pathname});
 }
 await context.close();
}
await browser.close();
