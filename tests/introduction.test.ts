import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { CompanyIntroduction } from '@/components/sections/company-introduction/company-introduction';
import { IntroductionMedia } from '@/components/sections/company-introduction/introduction-media';
import { introductionContent } from '@/content/introduction';
import { introductionMedia } from '@/config/introduction-media';

describe('Executive Summary introduction', () => {
  it('retains traceable headline/positioning and the exact approved narrative', () => {
    const source = readFileSync('tests/fixtures/profile-excerpts.txt', 'utf8').split('PDF page 3')[0];
    expect(introductionContent.source.pages).toEqual([2]);
    expect(source).toContain(introductionContent.heading);
    expect(source.toUpperCase()).toContain(introductionContent.closing.toUpperCase());
    expect(introductionContent.paragraphs).toEqual([
      'In heavy industry, every hour matters. A machine waiting for parts, a processing plant missing critical inputs or a project delayed by unreliable supply can create significant operational costs.',
      'Zieve Industries brings equipment, gold-processing plants, industrial chemicals, lubricants and essential consumables together through one dependable industrial supply partner.',
    ]);
  });
  it('renders a semantic H2, complete text and labelled figure before JavaScript', () => {
    const html = renderToStaticMarkup(createElement(CompanyIntroduction));
    expect(html).toContain('aria-labelledby="introduction-title"');
    expect(html).toMatch(/<h2[^>]*id="introduction-title"/);
    expect(html).not.toContain('<h1');
    expect(html).not.toMatch(/\d{2} \/ (WHO WE ARE|OUR SOLUTIONS)/);
    for (const paragraph of introductionContent.paragraphs) expect(html).toContain(paragraph);
    expect(html).toContain(introductionContent.closing);
    expect(html).toContain('<figure');
    expect(html).toContain('<figcaption>');
    expect(html).not.toContain('opacity:0');
    expect(html).not.toContain('clip-path:');
  });
  it('uses approved local photography with explicit stock provenance', () => {
    expect(introductionMedia.kind).toBe('image');
    expect(existsSync(`public${introductionMedia.src}`)).toBe(true);
    expect(introductionMedia.caption).toContain('Illustrative stock');
    const html = renderToStaticMarkup(createElement(IntroductionMedia, { media: introductionMedia }));
    expect(html).toContain('loading="lazy"');
    expect(html).not.toContain('fetchPriority="high"');
    expect(html).toContain('/_next/image');
    expect(html).toContain(introductionMedia.caption);
  });
  it('supports approved photographs with optimisation and meaningful alt text', () => {
    const html = renderToStaticMarkup(createElement(IntroductionMedia, { media: {
      kind: 'image', src: '/branding/zieve-logo-profile.jpeg', alt: 'Existing logo used only as a test fixture',
      approval: 'Test fixture, not configured photography', caption: 'Test fixture only', desktopPosition: '50% 50%', mobilePosition: '60% 50%',
    } }));
    expect(html).toContain('/_next/image?');
    expect(html).toContain('alt="Existing logo used only as a test fixture"');
    expect(html).toContain('loading="lazy"');
    expect(html).toContain('--intro-mobile-position:60% 50%');
  });
});
