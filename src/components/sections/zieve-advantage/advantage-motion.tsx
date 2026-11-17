'use client';
import { useEffect, useRef, type ReactNode } from 'react';
import { motionTokens as t } from '@/design-system/motion';
export function AdvantageMotion({ children }: { children: ReactNode }) {
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
            timeline.fromTo('[data-advantage-reveal]', { opacity: 0, y: 16 }, { opacity: 1, y: 0, stagger: t.stagger, clearProps: 'opacity,transform' }, 0)
              .fromTo('[data-pillar-row]', { opacity: 0, y: 12 }, { opacity: 1, y: 0, stagger: t.stagger, clearProps: 'opacity,transform' }, 0.12)
              .fromTo('[data-advantage-divider]', { scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, clearProps: 'transform,transformOrigin' }, 0.25);
          }, element);
          revert = () => context.revert();
        }).catch(() => { /* Static content remains visible if animation code cannot load. */ });
      }, { threshold: 0.15 });
      observer.observe(element);
    };
    schedule(); preference.addEventListener('change', schedule);
    return () => { disposed = true; generation++; observer?.disconnect(); preference.removeEventListener('change', schedule); revert?.(); };
  }, []);
  return <div ref={root} className="advantage-grid">{children}</div>;
}
