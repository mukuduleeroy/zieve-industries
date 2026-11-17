import type { HeaderNavigationItem, NavigationItem } from '@/types/navigation';
import { services } from './services';
import { quotationAnchor } from './anchors';

/** Editorial interface labels follow the requested architecture; business names come from the PDF. */
export const routes = {
  home: '/', about: '/about', solutions: '/solutions', industries: '/industries',
  whyZieve: '/why-zieve', contact: '/contact',
} as const;
export const solutionNavigation: readonly NavigationItem[] = services.map(service => ({
  label: service.name, href: `${routes.solutions}/${service.slug}`,
}));
export const navigation: readonly HeaderNavigationItem[] = [
  { label: 'Home', href: routes.home },
  { label: 'About Us', href: routes.about },
  { label: 'Our Solutions', href: routes.solutions, children: solutionNavigation },
  { label: 'Industries', href: routes.industries },
  { label: 'Why Zieve', href: routes.whyZieve },
  { label: 'Contact', href: routes.contact },
];
export const quoteAction = {
  label: 'Request a Quote',
  href: quotationAnchor.href,
} as const;
export const routeDestinations = navigation.flatMap(item => 'children' in item ? [item, ...item.children] : [item]);
