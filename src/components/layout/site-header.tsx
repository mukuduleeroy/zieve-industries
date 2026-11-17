'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Container, Anchor as Link } from '@/components/ui/primitives';
import { homepageNavigation as navigation } from '@/content/homepage-navigation';
import { BrandLink } from './brand-link';
import { QuoteLink } from './quote-link';
import { SolutionsDisclosure } from './solutions-disclosure';
import { MobileNavigation } from './mobile-navigation';

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 16);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  // Keep anchor/skip targets below the sticky header, including text zoom and safe areas.
  useEffect(() => {
    if (!header.current) return;
    const observer = new ResizeObserver(([entry]) => {
      document.documentElement.style.setProperty('--header-height', `${entry.target.getBoundingClientRect().height}px`);
    });
    observer.observe(header.current);
    return () => { observer.disconnect(); document.documentElement.style.removeProperty('--header-height'); };
  }, []);
  return <header ref={header} className="site-header" data-scrolled={scrolled}>
    <Container className="header-inner"><BrandLink />
      <nav className="desktop-navigation" aria-label="Main navigation"><ul>{navigation.map(item => <li key={item.href}>
        {'children' in item ? <SolutionsDisclosure key={pathname} item={item} pathname={pathname} /> : <Link className="header-nav-link" href={item.href} aria-current={pathname === item.href ? 'page' : undefined}>{item.label}</Link>}
      </li>)}</ul><QuoteLink /></nav>
      <MobileNavigation />
    </Container>
  </header>;
}
