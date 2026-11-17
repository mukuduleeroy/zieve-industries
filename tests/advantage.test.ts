import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { advantageContent, operatingPillars } from '@/content/advantage';
import { ZieveAdvantage } from '@/components/sections/zieve-advantage/zieve-advantage';
import { PillarRow } from '@/components/sections/zieve-advantage/pillar-row';

describe('Five operating pillars', () => {
  it('references page 10 and preserves official pillar names and closing language', () => {
    const source = readFileSync('docs/profile-extracted.txt', 'utf8').split('PDF page 10')[1].split('PDF page 11')[0];
    expect(advantageContent.source.pages).toEqual([10]);
    expect(operatingPillars).toHaveLength(5);
    expect(new Set(operatingPillars.map(pillar => pillar.id)).size).toBe(5);
    for (const pillar of operatingPillars) expect(source).toContain(pillar.title);
    expect(source).toContain(advantageContent.closing);
    expect(operatingPillars[0].description).toBe('Our Harare base and disciplined inventory approach help clients obtain the equipment, materials and consumables they need to keep operations moving.');
  });
  it('server-renders exactly one expanded pillar without viewport-dependent defaults', () => {
    const html = renderToStaticMarkup(createElement(ZieveAdvantage));
    expect(html.match(/aria-expanded="true"/g)).toHaveLength(1);
    expect(html.match(/aria-expanded="false"/g)).toHaveLength(4);
    expect(html.match(/<h3\b/g)).toHaveLength(5);
    expect(html).toContain('<h2');
    expect(html).not.toContain('<h1');
    expect(html).not.toContain('<img');
    expect(html).toContain('<noscript>');
    for (const pillar of operatingPillars) expect(html).toContain(pillar.description);
  });
  it('connects the collapsed button/panel and excludes hidden content from interaction', () => {
    const pillar = operatingPillars[2];
    const html = renderToStaticMarkup(createElement(PillarRow, { pillar, expanded: false, onToggle: () => {} }));
    expect(html).toContain(`aria-controls="pillar-panel-${pillar.id}"`);
    expect(html).toContain(`id="pillar-panel-${pillar.id}"`);
    expect(html).toContain(`aria-labelledby="pillar-trigger-${pillar.id}"`);
    expect(html).toContain('aria-hidden="true"');
    expect(html).toContain('inert=""');
    expect(html).toContain('height:0');
    expect(html).toContain('type="button"');
  });
});
