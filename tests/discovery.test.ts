import { describe, expect, it } from 'vitest';
import { navigation, solutionNavigation, routes, quoteAction } from '@/content/navigation';
import { homepageNavigation, homepageSolutionNavigation, solutionPanelId } from '@/content/homepage-navigation';
import { solutionDivisions } from '@/content/solutions-showcase';
import { heroContent } from '@/content/hero';
describe('Homepage discovery without changing reserved routes', () => {
  it('preserves labels and canonical routes while providing implemented homepage destinations', () => {
    expect(homepageNavigation.map(item => item.label)).toEqual(navigation.map(item => item.label));
    expect(navigation.map(item => item.href)).toEqual(Object.values(routes));
    expect(homepageNavigation.map(item => item.href)).toEqual(['/', '/#company-introduction', '/#industrial-solutions', '/#industries-we-serve', '/#zieve-advantage', '/#partner-with-zieve']);
    expect(heroContent.primaryAction.href).toBe('/#industrial-solutions');
    expect(quoteAction.href).toBe('/#request-a-quote');
  });
  it('preserves each division context using the existing unique panel IDs', () => {
    expect(homepageSolutionNavigation).toHaveLength(5);
    for (const [index, division] of solutionDivisions.entries()) {
      expect(homepageSolutionNavigation[index]).toEqual({ label: division.name, href: `/#${solutionPanelId(division.slug)}` });
      expect(solutionNavigation[index].href).toBe(`/solutions/${division.slug}`);
    }
  });
});
