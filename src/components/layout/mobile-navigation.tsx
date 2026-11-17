'use client';
import { useEffect, useRef, useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Anchor as Link } from '@/components/ui/primitives';
import { homepageNavigation as navigation } from '@/content/homepage-navigation';
import { BrandLink } from './brand-link';
import { QuoteLink } from './quote-link';

export function MobileNavigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open || !dialog.current) return;
    const panel = dialog.current;
    const opener = trigger.current;
    const body = document.body;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    const padding = parseFloat(getComputedStyle(body).paddingRight) || 0;
    body.style.overflow = 'hidden';
    if (scrollbar > 0) body.style.paddingRight = `${padding + scrollbar}px`;
    panel.showModal();
    closeButton.current?.focus();
    // Match the existing xl token: close and release modal state on desktop resize.
    const desktop = window.matchMedia('(min-width: 80rem)');
    const onResize = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener('change', onResize);
    return () => {
      desktop.removeEventListener('change', onResize);
      panel.close();
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
      // Let Next.js move focus to a newly navigated page; restore only within the header.
      if (desktop.matches) document.querySelector<HTMLAnchorElement>('.header-inner > .brand-link')?.focus();
      else if (document.activeElement === document.body || panel.contains(document.activeElement)) opener?.focus();
    };
  }, [open]);

  return <div className="mobile-navigation">
    <button ref={trigger} type="button" className="menu-trigger" aria-label="Open navigation menu" aria-expanded={open} aria-controls="mobile-navigation" aria-haspopup="dialog" onClick={() => setOpen(true)}><Menu size={22} aria-hidden="true" /><span>Menu</span></button>
    <dialog ref={dialog} id="mobile-navigation" className="mobile-dialog" aria-labelledby="mobile-menu-title"
      onKeyDown={event => {
        if (event.key !== 'Tab') return;
        const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), summary, [tabindex]:not([tabindex="-1"])')).filter(element => element.getClientRects().length > 0);
        const first = controls[0];
        const last = controls.at(-1);
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }}
      onCancel={event => { event.preventDefault(); close(); }} onClose={close}
      onClick={event => { if (event.target === event.currentTarget) close(); }}>
      <div className="mobile-panel" onClick={event => {
        if ((event.target as HTMLElement).closest('a')) close();
      }}>
        <div className="mobile-panel-top"><BrandLink /><button ref={closeButton} className="menu-trigger" type="button" aria-label="Close navigation menu" onClick={close}><X size={23} aria-hidden="true" /><span>Close</span></button></div>
        <h2 id="mobile-menu-title" className="eyebrow mobile-menu-title">Explore Zieve</h2>
        <nav aria-label="Mobile navigation"><ul className="mobile-nav-list">{navigation.map(item => <li key={item.href}>
          {'children' in item ? <details className="mobile-solutions" key={`${pathname}-${open}`}>
            <summary>{item.label}<ChevronDown size={18} aria-hidden="true" /></summary>
            <ul>{item.children.map(child => <li key={child.href}><Link href={child.href} aria-current={pathname === child.href ? 'page' : undefined}>{child.label}</Link></li>)}<li><Link href={item.href} aria-current={pathname === item.href ? 'page' : undefined}>Explore all solutions</Link></li></ul>
          </details> : <Link href={item.href} aria-current={pathname === item.href ? 'page' : undefined}>{item.label}</Link>}
        </li>)}</ul></nav>
        <div className="mobile-panel-footer"><QuoteLink /></div>
      </div>
    </dialog>
  </div>;
}
