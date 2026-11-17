import { chromium, expect } from '@playwright/test';
import { writeFileSync } from 'node:fs';
const browser=await chromium.launch();const results=[];
const root=new URL('../',import.meta.url).pathname;
for(const width of [390,1440]){
 const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'no-preference',deviceScaleFactor:1});const page=await context.newPage();
 await page.goto('http://127.0.0.1:3101');await page.waitForTimeout(1500);
 await page.keyboard.press('Tab');await expect(page.getByRole('link',{name:'Skip to content'})).toBeFocused();
 await page.screenshot({path:`${root}screenshots/${width}-keyboard-skip.png`});
 await page.keyboard.press('Enter');await expect(page.locator('#main-content')).toBeFocused();
 const record={width,skip:true};
 if(width===1440){
  const trigger=page.getByRole('button',{name:'Our Solutions',exact:true});await trigger.focus();await page.keyboard.press('ArrowDown');
  await expect(trigger).toHaveAttribute('aria-expanded','true'); await page.screenshot({path:`${root}screenshots/${width}-navigation-keyboard-open.png`});
  record.dropdownFirstFocused=await page.evaluate(()=>document.activeElement.textContent);
  await page.keyboard.press('Escape');await expect(trigger).toBeFocused();record.dropdownEscape=true;
 }else{
  const trigger=page.getByRole('button',{name:'Open navigation menu'});await trigger.click();
  const close=page.getByRole('button',{name:'Close navigation menu'});await expect(close).toBeFocused();
  await page.keyboard.press('Shift+Tab');record.modalWrapFocus=await page.evaluate(()=>document.activeElement.getAttribute('aria-label'));
  record.bodyLocked=await page.evaluate(()=>document.body.style.overflow==='hidden');
  await page.keyboard.press('Escape');await expect(trigger).toBeFocused();record.modalEscape=true;
 }
 await page.locator('#industrial-solutions').scrollIntoViewIfNeeded();await page.waitForTimeout(1400);
 if(width===1440){await page.locator('.solutions-navigation button').nth(2).click();}else await page.locator('#solution-selection').selectOption('industrial-chemicals');
 await page.waitForTimeout(250);record.solutionStatus=await page.locator('#industrial-solutions [role=status]').textContent();
 record.hiddenFocusControls=await page.locator('.solution-panel[aria-hidden=true] a').evaluateAll(es=>es.map(e=>({inert:!!e.closest('[inert]'),visible:e.checkVisibility()})));
 await page.locator('#zieve-advantage').scrollIntoViewIfNeeded();await page.waitForTimeout(1400);
 await page.locator('#zieve-advantage button').nth(2).focus();await page.keyboard.press('Enter');await page.waitForTimeout(250);
 record.pillarFocus=await page.evaluate(()=>document.activeElement.id);record.expanded=await page.locator('#zieve-advantage button[aria-expanded=true]').count();
 await page.getByRole('banner').getByRole('link',{name:'Zieve Industries home'}).click();await page.waitForTimeout(500);
 if(width===390){await page.getByRole('button',{name:'Open navigation menu'}).click();await page.getByRole('dialog').getByRole('link',{name:'Request a Quote'}).click();}
 else await page.getByRole('banner').getByRole('link',{name:'Request a Quote'}).click();
 await page.waitForTimeout(1200);record.quoteBounds=await page.locator('#request-a-quote').boundingBox();record.headerBounds=await page.getByRole('banner').boundingBox();
 await page.screenshot({path:`${root}screenshots/${width}-quote-anchor-viewport.png`});
 await page.getByRole('button',{name:'Prepare enquiry email'}).click();record.errorFocus=await page.evaluate(()=>document.activeElement.id);record.errorDescription=await page.locator('#quotation-fullName').getAttribute('aria-describedby');
 // Inspect text enlargement as a separate, labelled test condition; not a production edit.
 await page.goto('http://127.0.0.1:3101');await page.emulateMedia({reducedMotion:'reduce'});await page.evaluate(()=>{document.documentElement.style.fontSize='200%';});await page.waitForTimeout(300);
 record.text200={overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)};
 await page.screenshot({path:`${root}screenshots/${width}-text200-top.png`});
 results.push(record);await context.close();
}
const context=await browser.newContext();const page=await context.newPage();await page.goto('http://127.0.0.1:3101/solutions');await page.screenshot({path:`${root}screenshots/solutions-destination-status.png`,fullPage:true});
writeFileSync(`${root}evidence/interaction.json`,JSON.stringify(results,null,2));await browser.close();
