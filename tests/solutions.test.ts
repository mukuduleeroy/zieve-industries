import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { existsSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { SolutionsShowcase } from '@/components/sections/solutions-showcase/solutions-showcase';
import { SolutionPanel } from '@/components/sections/solutions-showcase/solution-panel';
import { SolutionMedia } from '@/components/sections/solutions-showcase/solution-media';
import { services } from '@/content/services';
import { homepageSolutionNavigation as solutionNavigation } from '@/content/homepage-navigation';
import { solutionDivisions, solutionsShowcaseContent } from '@/content/solutions-showcase';
import { solutionsMedia, solutionPlaceholders } from '@/config/solutions-media';

describe('Industrial solutions showcase', () => {
  it('derives all five names, source references and destinations from existing content', () => {
    expect(solutionDivisions).toHaveLength(5);
    expect(solutionDivisions.map(item => item.name)).toEqual(services.map(item => item.name));
    expect(solutionDivisions.map(item => item.href)).toEqual(solutionNavigation.map(item => item.href));
    expect(solutionDivisions.map(item => item.number)).toEqual(['01', '02', '03', '04', '05']);
    for (const [index, division] of solutionDivisions.entries()) expect(division.source).toBe(services[index].source);
  });
  it('provides distinct real local illustrative media for every division', () => {
    const sources = solutionDivisions.map(item => solutionPlaceholders[item.slug].src);
    expect(new Set(sources).size).toBe(5);
    for (const item of Object.values(solutionsMedia)) {
      expect(existsSync(`public${item.src}`)).toBe(true);
      expect(item.alt).toContain('Not a Zieve facility or inventory photograph');
      expect(item.caption).toContain('Illustrative');
    }
  });
  it('server-renders one default selection, accessible controls and all reserved panel text', () => {
    const html = renderToStaticMarkup(createElement(SolutionsShowcase));
    expect(html).not.toMatch(/\d{2} \/ (WHO WE ARE|OUR SOLUTIONS)/);
    for (const line of solutionsShowcaseContent.headline) expect(html).toContain(line);
    expect(html).not.toContain('<h1');
    expect(html).toContain('<h2');
    expect(html.match(/aria-pressed="true"/g)).toHaveLength(1);
    expect(html.match(/aria-pressed="false"/g)).toHaveLength(4);
    expect(html.match(/data-active="true"/g)).toHaveLength(1);
    expect(html).toContain('<select');
    expect(html).toContain('<noscript>');
    for (const division of solutionDivisions) expect(html).toContain(division.description);
  });
  it('removes inactive content from interaction and omits its images', () => {
    const html = renderToStaticMarkup(createElement(SolutionPanel, { division: solutionDivisions[1], active: false }));
    expect(html).toContain('aria-hidden="true"');
    expect(html).toContain('inert=""');
    expect(html).not.toContain('<img');
    expect(html).toContain(solutionDivisions[1].href);
  });
  it('supports optimised photography with a truthful accessible description', () => {
    const html = renderToStaticMarkup(createElement(SolutionMedia, { media: {
      kind: 'image', src: '/branding/zieve-logo-profile.jpeg', alt: 'Existing logo used only as a fixture', caption: 'Fixture only', approval: 'Test only', desktopPosition: '50% 50%', mobilePosition: '50% 50%',
    }, fallback: solutionPlaceholders['industrial-chemicals'] }));
    expect(html).toContain('/_next/image?');
    expect(html).toContain('loading="lazy"');
    expect(html).toContain('alt="Existing logo used only as a fixture"');
  });
});
