import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { company } from '@/content/company';
import { purposeContent, purposeValues } from '@/content/purpose';
import { CorporatePurpose } from '@/components/sections/corporate-purpose/corporate-purpose';

describe('Official corporate purpose', () => {
  it('reuses page 11 statements without copying or changing their meaning', () => {
    const source = readFileSync('tests/fixtures/profile-excerpts.txt', 'utf8').split('PDF page 11')[1].split('PDF page 12')[0].replace(/\s+/g, ' ');
    expect(purposeContent.source.pages).toEqual([11]);
    expect(purposeContent.vision.statement).toBe(company.vision);
    expect(purposeContent.mission.statement).toBe(company.mission);
    expect(source).toContain(purposeContent.vision.statement);
    expect(source).toContain(purposeContent.mission.statement);
    for (const value of purposeValues) expect(source).toContain(`${value.name} — ${value.description}`);
  });
  it('retains all five canonical core values with unique editorial numbering', () => {
    expect(purposeValues.map(({ name, description }) => ({ name, description }))).toEqual(company.values);
    expect(purposeValues.map(value => value.number)).toEqual(['01', '02', '03', '04', '05']);
    expect(new Set(purposeValues.map(value => value.id)).size).toBe(5);
  });
  it('server-renders the three movements in order with semantic headings and static content', () => {
    const html = renderToStaticMarkup(createElement(CorporatePurpose));
    expect(html.indexOf('id="purpose-vision"')).toBeLessThan(html.indexOf('id="purpose-mission"'));
    expect(html.indexOf('id="purpose-mission"')).toBeLessThan(html.indexOf('id="purpose-values"'));
    expect(html.match(/<h2\b/g)).toHaveLength(1);
    expect(html.match(/<h3\b/g)).toHaveLength(3);
    expect(html.match(/<h4\b/g)).toHaveLength(5);
    expect(html).not.toContain('<h1');
    expect(html).not.toContain('<button');
    expect(html).not.toContain('<img');
    expect(html).not.toContain('opacity:0');
    expect(html).toContain('aria-hidden="true"');
    expect(html).toContain('aria-labelledby="purpose-title"');
  });
});
