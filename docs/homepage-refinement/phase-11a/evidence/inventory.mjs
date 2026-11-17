import { chromium } from '@playwright/test';
import { writeFileSync } from 'node:fs';
const browser=await chromium.launch();const page=await browser.newPage();await page.goto('http://127.0.0.1:3101');
const links=await page.locator('a').evaluateAll(es=>es.map(e=>({label:e.textContent.trim()||e.getAttribute('aria-label')||e.querySelector('img')?.alt,href:e.getAttribute('href'),area:e.closest('header')?'header/mobile':e.closest('footer')?'footer':e.closest('section')?.id||'other'})));
writeFileSync(new URL('links-before.json',import.meta.url),JSON.stringify(links,null,2));await browser.close();
