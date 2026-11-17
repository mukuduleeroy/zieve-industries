import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { solutionNavigation, quoteAction, routeDestinations } from '@/content/navigation';
import { homepageNavigation } from '@/content/homepage-navigation';
import { services } from '@/content/services';
import { quotationAnchor } from '@/content/anchors';
import { SiteHeader } from '@/components/layout/site-header';
import { SolutionsDisclosure } from '@/components/layout/solutions-disclosure';
vi.mock('next/navigation', () => ({ usePathname: () => '/industries' }));

describe('Header contract', () => {
  it('derives service destinations from the profile and routes quotations to the shared form anchor', () => {
    expect(solutionNavigation).toEqual(services.map(service => ({ label: service.name, href: `/solutions/${service.slug}` })));
    expect(new Set(routeDestinations.map(item => item.href)).size).toBe(routeDestinations.length);
    expect(quoteAction.href).toBe(quotationAnchor.href);
    expect(quoteAction.href).toBe('/#request-a-quote');
  });
  it('renders progressive navigation with an accessible closed disclosure', () => {
    const group = homepageNavigation.find(item => 'children' in item);
    if (!group || !('children' in group)) throw new Error('Missing solutions group');
    const html = renderToStaticMarkup(createElement(SolutionsDisclosure, { item: group, pathname: '/' }));
    expect(html).toContain('aria-expanded="false"');
    expect(html).toContain('aria-controls="desktop-solutions"');
    expect(html).toContain('id="desktop-solutions"');
    expect(html).toMatch(/class="solutions-panel" hidden=""/);
    expect(html).not.toContain('role="menu"');
    for (const service of services) expect(html).toContain(`/#solution-panel-${service.slug}`);
  });
  it('renders current-page semantics, a named modal and original logo artwork', () => {
    const html = renderToStaticMarkup(createElement(SiteHeader));
    expect(html).toContain('href="/#industries-we-serve"');
    expect(html).not.toContain('aria-current="page"');
    expect(html).toContain('<dialog');
    expect(html).toContain('aria-labelledby="mobile-menu-title"');
    expect(html).toContain('aria-label="Close navigation menu"');
    expect(html).toContain('zieve-logo-profile.jpeg');
    expect(html).not.toMatch(/<dialog[^>]* open/);
  });
});
