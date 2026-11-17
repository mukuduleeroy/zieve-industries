import { navigation, routes } from './navigation';
import { services } from './services';
import type { HeaderNavigationItem, NavigationItem } from '@/types/navigation';

/** Views over existing routes/labels; canonical development routes remain intact. */
export const homepageDestinations = {
  [routes.home]: routes.home,
  [routes.about]: '/#company-introduction',
  [routes.solutions]: '/#industrial-solutions',
  [routes.industries]: '/#industries-we-serve',
  [routes.whyZieve]: '/#zieve-advantage',
  [routes.contact]: '/#partner-with-zieve',
} as const;
export const solutionPanelId = (slug: string) => `solution-panel-${slug}`;
export const solutionDiscoveryHref = (slug: string) => `/#${solutionPanelId(slug)}`;
export const homepageSolutionNavigation: readonly NavigationItem[] = services.map(service => ({
  label: service.name, href: solutionDiscoveryHref(service.slug),
}));
export const homepageNavigation: readonly HeaderNavigationItem[] = navigation.map(item => ({
  ...item, href: homepageDestinations[item.href as keyof typeof homepageDestinations],
  ...('children' in item ? { children: homepageSolutionNavigation } : {}),
}));
