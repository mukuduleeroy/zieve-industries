import {chromium} from '@playwright/test';
import sharp from 'sharp';
import {writeFile} from 'node:fs/promises';
const browser=await chromium.launch(),results=[];const position=process.argv[2];
const luminance=rgb=>rgb.map(n=>{n/=255;return n<=.04045?n/12.92:((n+.055)/1.055)**2.4;}).reduce((v,n,i)=>v+n*[.2126,.7152,.0722][i],0);
for(const width of[320,375,390,768,1024,1440,1920]){
 const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1,reducedMotion:'reduce'});await page.goto('http://127.0.0.1:3102',{waitUntil:'networkidle'});await page.locator('#hero picture img').evaluate(image=>image.decode());
 if(position)await page.locator('.hero-visual').evaluate((element,p)=>element.style.setProperty('--hero-desktop-position', `${p}% 50%`),position);
 const text=await page.evaluate(()=>[...document.querySelectorAll('[data-hero-headline], [data-hero-copy], .hero-eyebrow, .hero-action-secondary, .hero-scroll > span:nth-child(2), .hero-media-caption')].map(e=>{const rects=[];const walker=document.createTreeWalker(e,NodeFilter.SHOW_TEXT);while(walker.nextNode()){if(!walker.currentNode.textContent.trim())continue;const range=document.createRange();range.selectNodeContents(walker.currentNode);rects.push(...[...range.getClientRects()].map(r=>({x:r.x,y:r.y,width:r.width,height:r.height})));}return{text:e.textContent,color:getComputedStyle(e).color,rects};}));
 await page.addStyleTag({content:'#hero .hero-editorial,#hero .hero-footer{opacity:0!important}'});await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));await page.waitForTimeout(150);const png=await page.screenshot();const {data,info}=await sharp(png).removeAlpha().raw().toBuffer({resolveWithObject:true});
 for(const entry of text){const fg=luminance(entry.color.match(/[\d.]+/g).slice(0,3).map(Number));let minimum=Infinity;for(const r of entry.rects)for(let y=Math.max(0,Math.ceil(r.y));y<Math.min(info.height,r.y+r.height);y+=2)for(let x=Math.max(0,Math.ceil(r.x));x<Math.min(info.width,r.x+r.width);x+=2){const i=(y*info.width+x)*info.channels;const bg=luminance([...data.subarray(i,i+3)]);minimum=Math.min(minimum,(Math.max(fg,bg)+.05)/(Math.min(fg,bg)+.05));}entry.minimumSampledContrast=minimum;}
 results.push({width,text,method:'DPR1 screenshot with foreground editorial/footer hidden without reflow; minimum contrast sampled every 2px over normal text range rectangles. Conservative background-box check, not glyph certification.'});await page.close();
}
await browser.close();await writeFile(`docs/homepage-refinement/phase-11b5/evidence/contrast${position?'-position-'+position:''}.json`,JSON.stringify(results,null,2)+'\n');
