import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { existsSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { IndustryExperience } from '@/components/sections/industry-experience/industry-experience';
import { IndustryMedia } from '@/components/sections/industry-experience/industry-media';
import { industryExperienceContent, industrySectors } from '@/content/industry-experience';
import { industryMedia, industryPlaceholders } from '@/config/industry-media';
import { homepageSolutionNavigation as solutionNavigation } from '@/content/homepage-navigation';

describe('Industries experience', () => {
  it('preserves four approved categories and explicit government procurement context', () => {
    expect(industrySectors.map(sector => sector.name)).toEqual(['Mining & Mineral Processing', 'Civil & Infrastructure Construction', 'Manufacturing', 'Agro-processing']);
    expect(industrySectors[1].procurementNote).toContain('government agencies and public infrastructure procurement');
    expect(industrySectors[0].description).toContain('large-scale mining and artisanal and small-scale mining');
    for (const sector of industrySectors) {
      expect(sector.source.pages).toContain(3);
      expect(sector.solutions.length).toBeGreaterThan(0);
      for (const link of sector.solutions) expect(solutionNavigation).toContainEqual(link);
    }
  });
  it('renders a named H2 and four H3 panels with all text visible in SSR', () => {
    const html = renderToStaticMarkup(createElement(IndustryExperience));
    expect(html).toContain(industryExperienceContent.heading);
    expect(html).toContain('aria-labelledby="industries-title"');
    expect(html.match(/<h2\b/g)).toHaveLength(1);
    expect(html.match(/<h3\b/g)).toHaveLength(4);
    expect(html).not.toContain('<h1');
    expect(html).not.toContain('opacity:0');
    expect(html).not.toContain('clip-path:');
    for (const sector of industrySectors) expect(html).toContain(sector.description);
  });
  it('uses distinct existing local media with honest descriptions and lazy loading', () => {
    expect(new Set(Object.values(industryPlaceholders).map(item => item.src)).size).toBe(4);
    for (const media of Object.values(industryMedia)) {
      expect(existsSync(`public${media.src}`)).toBe(true);
      expect(media.alt).toContain('Not a Zieve');
      const html = renderToStaticMarkup(createElement(IndustryMedia, { media, fallback: media }));
      expect(html).toContain('loading="lazy"');
      expect(html).not.toContain('fetchPriority="high"');
      expect(html).toContain(media.caption);
    }
  });
  it('can replace a schematic with optimised photography without changing the panel', () => {
    const html = renderToStaticMarkup(createElement(IndustryMedia, { media: {
      kind: 'image', src: '/branding/zieve-logo-profile.jpeg', approval: 'Existing logo used only as a test fixture', alt: 'Test fixture only', caption: 'Test fixture only', desktopPosition: '60% 50%', mobilePosition: '70% 50%',
    }, fallback: industryPlaceholders.manufacturing }));
    expect(html).toContain('/_next/image?');
    expect(html).toContain('alt="Test fixture only"');
    expect(html).toContain('--industry-mobile-position:70% 50%');
  });
});

it('server-renders each industry once in heading, labelled media, then supporting-copy order', () => {
  const html = renderToStaticMarkup(createElement(IndustryExperience));
  expect(html.match(/<figure\b/g)).toHaveLength(4);
  for (const sector of industrySectors) {
    const title = html.indexOf(`id="industry-title-${sector.slug}"`);
    const figure = html.indexOf('<figure', title);
    const copy = html.indexOf('class="industry-copy"', figure);
    expect(title).toBeGreaterThan(0);
    expect(figure).toBeGreaterThan(title);
    expect(copy).toBeGreaterThan(figure);
    expect(html.slice(figure, copy)).toContain(`aria-labelledby="industry-title-${sector.slug}"`);
    expect(html.split(sector.description)).toHaveLength(2);
  }
});
