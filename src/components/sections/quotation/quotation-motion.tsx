'use client';
import { useEffect, useRef, type ReactNode } from 'react';
import { motionTokens as t } from '@/design-system/motion';
export function QuotationMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let disposed = false;
    let generation = 0;
    let observer: IntersectionObserver | undefined;
    let revert: (() => void) | undefined;
    const schedule = () => {
      const version = ++generation;
      observer?.disconnect(); revert?.(); revert = undefined;
      if (preference.matches) return;
      observer = new IntersectionObserver(entries => {
        if (!entries.some(entry => entry.isIntersecting)) return;
        observer?.disconnect();
        void import('gsap').then(({ default: gsap }) => {
          if (disposed || version !== generation || preference.matches || element.contains(document.activeElement)) return;
          const context = gsap.context(() => {
            const timeline = gsap.timeline({ defaults: { duration: t.duration.reveal, ease: 'power3.out' } });
            timeline.fromTo('[data-quotation-reveal]', { opacity: 0, y: 16 }, { opacity: 1, y: 0, stagger: t.stagger, clearProps: 'opacity,transform' }, 0)
              .fromTo('[data-quotation-contact]', { opacity: 0, y: 12 }, { opacity: 1, y: 0, stagger: t.stagger, clearProps: 'opacity,transform' }, 0.15)
              .fromTo('[data-quotation-form]', { opacity: 0 }, { opacity: 1, clearProps: 'opacity' }, 0.2);
          }, element);
          // Never continue an entrance while the visitor is typing or navigating fields.
          const stopForInteraction = () => { context.revert(); };
          element.addEventListener('focusin', stopForInteraction, { once: true });
          revert = () => { element.removeEventListener('focusin', stopForInteraction); context.revert(); };
        }).catch(() => { /* The static form/contact section remains readable. */ });
      }, { rootMargin: '160px' });
      observer.observe(element);
    };
    schedule(); preference.addEventListener('change', schedule);
    return () => { disposed = true; generation++; observer?.disconnect(); preference.removeEventListener('change', schedule); revert?.(); };
  }, []);
  return <div ref={root} className="quotation-grid">{children}</div>;
}
