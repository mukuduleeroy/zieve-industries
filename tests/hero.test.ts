import { createHash } from 'node:crypto';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { readFileSync, existsSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { Hero } from '@/components/sections/hero/hero';
import { HeroMedia } from '@/components/sections/hero/hero-media';
import { heroContent } from '@/content/hero';
import { heroMedia, heroPlaceholder } from '@/config/hero-media';
import { company } from '@/content/company';
import { quoteAction } from '@/content/navigation';

describe('Hero content and progressive media', () => {
  it('preserves the profile tagline and existing destinations', () => {
    expect(heroContent.headline.join(' ')).toBe(company.tagline);
    expect(heroContent.primaryAction.href).toBe('/#industrial-solutions');
    expect(heroContent.secondaryAction).toBe(quoteAction);
    expect(heroContent.source.pages).toEqual([2, 3, 4, 12]);
  });
  it('renders one semantic H1 with usable copy and actions before JavaScript', () => {
    const html = renderToStaticMarkup(createElement(Hero));
    expect(html.match(/<h1\b/g)).toHaveLength(1);
    for (const line of heroContent.headline) expect(html).toContain(line);
    expect(html).toContain(heroContent.supporting);
    expect(html).toContain('href="/#industrial-solutions"');
    expect(html).toContain(heroContent.primaryAction.label);
    expect(html).not.toContain('opacity:0');
    expect(html).not.toContain('<video');
  });
  it('keeps the real local schematic independently available beneath approved photography', () => {
    expect(heroMedia.kind).toBe('image');
    expect(existsSync(`public${heroPlaceholder.src}`)).toBe(true);
    expect(readFileSync(`public${heroPlaceholder.src}`, 'utf8')).toContain('not a photograph');
    const html = renderToStaticMarkup(createElement(HeroMedia, { media: heroMedia }));
    expect(html).toContain(heroMedia.caption);
    expect(html).toContain('data-media-kind="image"');
    expect(html).toContain('alt=""');
    expect(html).toContain('/_next/image');
  });
  it('optimises configured photography while retaining a placeholder beneath it', () => {
    const html = renderToStaticMarkup(createElement(HeroMedia, { media: {
      kind: 'image', src: '/branding/zieve-logo-profile.jpeg', mobileSrc: '/branding/zieve-logo-profile.jpeg',
      caption: 'Test fixture only', approval: 'Existing local logo used only as a test fixture',
      desktopPosition: '70% 50%', mobilePosition: '65% 50%',
    } }));
    expect(html).toContain('/_next/image?');
    expect(html).toContain('<source media="(max-width: 47.999rem)"');
    expect(html).toContain('fetchPriority="high"');
    expect(html).toContain(heroPlaceholder.src);
  });
  it('matches both approved local R1 derivatives to the acquisition record', () => {
    const record: { assets: { path: string; sha256: string }[]; mirrored: boolean } = JSON.parse(readFileSync('docs/homepage-refinement/phase-11a5/evidence/hero-final/acquisition.json', 'utf8'));
    expect(record.mirrored).toBe(false);
    expect(record.assets).toHaveLength(2);
    for (const asset of record.assets) expect(createHash('sha256').update(readFileSync(asset.path)).digest('hex')).toBe(asset.sha256);
    if (heroMedia.kind !== 'image') throw Error('R1 must be configured');
    expect(record.assets.map(asset => '/' + asset.path.replace('public/', ''))).toEqual([heroMedia.src, heroMedia.mobileSrc]);
  });
  it('renders poster images but never a video source in the initial server response', () => {
    const html = renderToStaticMarkup(createElement(HeroMedia, { media: {
      kind: 'video', src: '/test-only-video-not-shipped', poster: '/branding/zieve-logo-profile.jpeg', mobilePoster: '/branding/zieve-logo-profile.jpeg',
      caption: 'Test fixture only', approval: 'No runtime video configured', desktopPosition: '70% 50%', mobilePosition: '65% 50%',
    } }));
    expect(html).toContain('/_next/image?');
    expect(html).not.toContain('<video');
    expect(html).not.toContain('/test-only-video-not-shipped');
  });
});
