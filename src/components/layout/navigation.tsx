import type { ReactNode } from 'react';
import { Link } from '@/components/ui/primitives';
import type { NavigationItem } from '@/types/navigation';
export type { NavigationItem } from '@/types/navigation';
export function SkipLink() {
  return <a className="skip-link" href="#main-content">Skip to content</a>;
}
export function Navigation({ items, label = 'Main navigation', currentPath }: { items: readonly NavigationItem[]; label?: string; currentPath?: string }) {
  return <nav aria-label={label}><ul className="navigation-list">{items.map(item => <li key={item.href}><Link href={item.href} aria-current={currentPath === item.href ? 'page' : undefined}>{item.label}</Link></li>)}</ul></nav>;
}
export function NavigationDisclosure({ children, label = 'Menu' }: { children: ReactNode; label?: string }) {
  return <details className="navigation-disclosure"><summary>{label}</summary>{children}</details>;
}
