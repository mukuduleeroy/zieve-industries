'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ChevronDown, ArrowUpRight } from 'lucide-react';
import { Anchor as Link } from '@/components/ui/primitives';
import type { NavigationGroup } from '@/types/navigation';

/** Navigation disclosure, not an ARIA menu: ordinary links retain native Tab behaviour. */
export function SolutionsDisclosure({ item, pathname }: { item: NavigationGroup; pathname: string }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useLayoutEffect(() => {
    if (!open || !root.current) return;
    const disclosure = root.current;
    const panel = disclosure.querySelector<HTMLElement>('.solutions-panel');
    if (!panel) return;
    const position = () => {
      panel.style.removeProperty('left');
      panel.style.removeProperty('top');
      const left = parseFloat(getComputedStyle(panel).left);
      const bounds = panel.getBoundingClientRect();
      const shift = Math.max(16 - bounds.left, Math.min(0, document.documentElement.clientWidth - 16 - bounds.right));
      panel.style.left = `${left + shift}px`;
      const inner = disclosure.closest('.header-inner');
      const header = disclosure.closest('header');
      if (inner && header && inner.getBoundingClientRect().height > parseFloat(getComputedStyle(inner).minHeight) + 1) {
        panel.style.top = `${header.getBoundingClientRect().bottom - disclosure.getBoundingClientRect().top + 14}px`;
      }
    };
    position();
    const observer = new ResizeObserver(position);
    observer.observe(panel);
    window.addEventListener('resize', position);
    return () => { observer.disconnect(); window.removeEventListener('resize', position); panel.style.removeProperty('left'); panel.style.removeProperty('top'); };
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', dismiss);
    return () => document.removeEventListener('pointerdown', dismiss);
  }, [open]);
  return <div ref={root} className="solutions-disclosure"
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}
    onKeyDown={event => {
      if (event.key === 'Escape' && open) { event.preventDefault(); setOpen(false); trigger.current?.focus(); }
      if (event.key === 'ArrowDown' && event.target === trigger.current) {
        event.preventDefault(); setOpen(true);
        requestAnimationFrame(() => root.current?.querySelector<HTMLAnchorElement>('.solutions-panel a')?.focus());
      }
    }}>
    <button ref={trigger} type="button" className="header-nav-link solutions-trigger" aria-expanded={open}
      aria-controls="desktop-solutions" data-active={pathname === item.href || pathname.startsWith(`${item.href}/`)} onClick={() => setOpen(value => !value)}>
      {item.label}<ChevronDown size={14} aria-hidden="true" />
    </button>
    <div id="desktop-solutions" className="solutions-panel" hidden={!open}>
      <p className="eyebrow">Our expertise</p>
      <ul>{item.children.map((child, index) => <li key={child.href}>
        <Link href={child.href} className="solution-link" aria-current={pathname === child.href ? 'page' : undefined} onClick={() => setOpen(false)}>
          <span className="solution-index" aria-hidden="true">0{index + 1}</span><span>{child.label}</span><ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </li>)}</ul>
      <Link href={item.href} className="solutions-overview" aria-current={pathname === item.href ? 'page' : undefined} onClick={() => setOpen(false)}>Explore all solutions <ArrowUpRight size={15} aria-hidden="true" /></Link>
    </div>
  </div>;
}
