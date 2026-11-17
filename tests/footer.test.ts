import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { SiteFooter } from '@/components/layout/footer/site-footer';
import { getCopyrightYear } from '@/lib/copyright-year';
import { quoteAction } from '@/content/navigation';
import { homepageNavigation as navigation, homepageSolutionNavigation as solutionNavigation } from '@/content/homepage-navigation';
import { contact } from '@/content/contact';

describe('Corporate footer', () => {
  it('renders the original logo and official contact details with semantic navigation', () => {
    const html = renderToStaticMarkup(createElement(SiteFooter));
    expect(html).toContain('aria-label="Zieve Industries footer"');
    expect(html).toContain('zieve-logo-profile.jpeg');
    expect(html).toContain('alt="Zieve Industries"');
    expect(html).toContain('Equipping Industry. Empowering Growth.');
    expect(html).toContain(contact.address);
    expect(html).toContain(contact.phoneHref);
    expect(html).toContain(contact.emailHref);
    expect(html).toContain('Footer primary navigation');
    expect(html).toContain('Footer solutions navigation');
    expect(html).not.toContain('<h1');
  });
  it('keeps every canonical destination and quotation anchor available before hydration', () => {
    const html = renderToStaticMarkup(createElement(SiteFooter));
    for (const item of [...navigation, ...solutionNavigation]) expect(html).toContain(`href="${item.href}"`);
    expect(html).toContain(`href="${quoteAction.href}"`);
    expect(html).toContain('href="#main-content"');
    expect(html).not.toContain('fetchpriority="high"');
  });
  it('uses the Harare calendar year across the UTC year boundary', () => {
    expect(getCopyrightYear(new Date('2026-12-31T21:59:59Z'))).toBe(2026);
    expect(getCopyrightYear(new Date('2026-12-31T22:00:00Z'))).toBe(2027);
  });
});
