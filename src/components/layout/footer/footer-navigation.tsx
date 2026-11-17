import { Heading, Anchor as Link } from '@/components/ui/primitives';
import type { NavigationItem } from '@/types/navigation';
export function FooterNavigation({ title, label, items }: { title: string; label: string; items: readonly NavigationItem[] }) {
  return <nav className="footer-navigation-group" aria-label={label} data-footer-reveal>
    <Heading as="h3" size="subtitle">{title}</Heading>
    <ul>{items.map(item => <li key={item.href}><Link href={item.href}>{item.label}</Link></li>)}</ul>
  </nav>;
}
