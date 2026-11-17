import { expect, test } from '@playwright/test';
import { homepageNavigation, homepageSolutionNavigation } from '../../src/content/homepage-navigation';
import { solutionDivisions } from '../../src/content/solutions-showcase';

for (const size of [100,200]) test(`AUD-01 ${size}% root text reflows at all required widths`, async ({ page }) => {
  test.setTimeout(90_000);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [320,375,390,768,1024,1440,1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.evaluate(size => { document.documentElement.style.fontSize = `${size}%`; }, size);
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
    const header = page.getByRole('banner');
    const logo = header.locator('.header-inner > .brand-link');
    const control = width >= 1280 ? header.getByRole('link', { name: 'Request a Quote' }) : header.getByRole('button', { name: 'Open navigation menu' });
    const l = (await logo.boundingBox())!; const c = (await control.boundingBox())!;
    expect(c.x).toBeGreaterThanOrEqual(0); expect(c.x+c.width).toBeLessThanOrEqual(width+1);
    expect(c.x >= l.x+l.width || c.y >= l.y+l.height || l.y >= c.y+c.height).toBe(true);
    for (const target of await page.locator('#hero h1, #hero [data-hero-copy], #hero .hero-action').all()) {
      const rects = await target.evaluate(element => {
        const range = document.createRange(); range.selectNodeContents(element);
        return [...range.getClientRects()].map(r => ({left:r.left,right:r.right}));
      });
      for (const r of rects) { expect(r.left).toBeGreaterThanOrEqual(-1); expect(r.right).toBeLessThanOrEqual(width+1); }
    }
    expect((await page.locator('.pillar-panel[aria-hidden=false] .body-text').boundingBox())!.width).toBeGreaterThanOrEqual(Math.min(160, width/2));
    const scroll = await page.locator('.hero-scroll').boundingBox(); const caption = await page.locator('.hero-media-caption').boundingBox();
    expect(scroll && caption && scroll.x < caption.x+caption.width && scroll.x+scroll.width > caption.x && scroll.y < caption.y+caption.height && scroll.y+scroll.height > caption.y).toBe(false);
    const actions = (await page.locator('.hero-actions').boundingBox())!;
    expect(caption!.y).toBeGreaterThanOrEqual(actions.y + actions.height);

    if(width < 1280) {
      await control.click();
      const dialog = page.getByRole('dialog');
      await expect(dialog.getByRole('button', {name:'Close navigation menu'})).toBeFocused();
      await dialog.getByRole('link', {name:'Contact',exact:true}).focus();
      await expect(dialog.getByRole('link', {name:'Contact',exact:true})).toBeInViewport();
      await page.keyboard.press('Escape'); await expect(control).toBeFocused();
    } else {
      const trigger = header.getByRole('button', {name:'Our Solutions',exact:true});
      await trigger.focus();await page.keyboard.press('ArrowDown');
      await expect(page.locator('.solutions-panel a').first()).toBeFocused();
      await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
      const panel = (await page.locator('.solutions-panel').boundingBox())!;
      expect(panel.x).toBeGreaterThanOrEqual(0); expect(panel.x+panel.width).toBeLessThanOrEqual(width);
      if(size===200 && width===1440) expect(panel.y).toBeGreaterThanOrEqual((await header.boundingBox())!.height);
      await page.keyboard.press('Escape');await expect(trigger).toBeFocused();
    }
  }
});

test('AUD-02 generic discovery anchors focus implemented sections below the sticky header', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });await page.setViewportSize({width:1440,height:900});await page.goto('/');
  await page.locator('#hero').getByRole('link', {name:'Explore Our Solutions'}).click();
  await expect(page).toHaveURL('/#industrial-solutions');await expect(page.locator('#industrial-solutions')).toBeFocused();
  for(const item of homepageNavigation.filter(item=>item.href !== '/')) {
    await page.goto('/solutions');
    const nav=page.getByRole('navigation',{name:'Main navigation'});
    if(item.label==='Our Solutions'){await nav.getByRole('button',{name:item.label,exact:true}).click();await nav.getByRole('link',{name:'Explore all solutions'}).click();}
    else await nav.getByRole('link',{name:item.label,exact:true}).click();
    await expect(page).toHaveURL(item.href);
    const target=page.locator(item.href.slice(1));await expect(target).toBeFocused();
    await expect.poll(async()=> (await target.boundingBox())!.y).toBeGreaterThanOrEqual((await page.getByRole('banner').boundingBox())!.height);
    await page.reload();await expect(target).toBeInViewport();
  }
});

test('AUD-02 solution links support direct entry, refresh, history and selection focus', async ({ page }) => {
  await page.emulateMedia({reducedMotion:'reduce'});
  for(const item of homepageSolutionNavigation) {
    await page.goto(item.href);
    const panel=page.locator('.solution-panel[data-active=true]');
    await expect(panel).toHaveAttribute('id',item.href.split('#')[1]);await expect(panel).toBeFocused();
    await page.reload();await expect(panel).toHaveAttribute('id',item.href.split('#')[1]);
    expect((await panel.boundingBox())!.y).toBeGreaterThanOrEqual((await page.getByRole('banner').boundingBox())!.height);
  }
  await page.setViewportSize({width:390,height:844});
  const selector=page.locator('#solution-selection');await selector.focus();await selector.selectOption(solutionDivisions[1].slug);
  await expect(selector).toBeFocused();await expect(page).toHaveURL(homepageSolutionNavigation[1].href);
  await page.getByRole('contentinfo').getByRole('navigation',{name:'Footer solutions navigation'}).getByRole('link').nth(2).click();
  await expect(page.locator('.solution-panel[data-active=true]')).toHaveAttribute('id','solution-panel-industrial-chemicals');
  await page.goBack();await expect(page.locator('.solution-panel[data-active=true]')).toHaveAttribute('id','solution-panel-elution-gold-processing');
});

test('AUD-01 narrow viewport reflow and normal-motion keyboard discovery remain operable', async ({ page }) => {
  await page.emulateMedia({reducedMotion:'no-preference'});
  // Effective CSS viewport equivalents only; these are not native browser zoom commands.
  for(const width of [720,360,320]) {
    await page.setViewportSize({width,height:900});await page.goto('/');
    expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBe(width);
    const trigger=page.getByRole('button',{name:'Open navigation menu'});
    await trigger.focus();await page.keyboard.press('Enter');
    const dialog=page.getByRole('dialog');
    await dialog.locator('summary').click();
    const link=dialog.getByRole('link',{name:homepageSolutionNavigation[2].label,exact:true});
    await link.focus();await page.keyboard.press('Enter');
    await expect(dialog).not.toBeVisible();
    await expect(page.locator('#solution-panel-industrial-chemicals')).toBeFocused();
    await expect.poll(()=>page.evaluate(()=>document.body.style.overflow)).toBe('');
  }
});
