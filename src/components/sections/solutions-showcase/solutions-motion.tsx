'use client';
import { useEffect, useRef, type ReactNode } from 'react';
import { motionTokens as t } from '@/design-system/motion';
export function SolutionsMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let disposed = false;
    let generation = 0;
    let revert: (() => void) | undefined;
    let observer: IntersectionObserver | undefined;
    const schedule = () => {
      const version = ++generation;
      observer?.disconnect(); revert?.(); revert = undefined;
      if (preference.matches) return;
      observer = new IntersectionObserver(entries => {
        if (!entries.some(entry => entry.isIntersecting)) return;
        observer?.disconnect();
        void import('gsap').then(({ default: gsap }) => {
          if (disposed || generation !== version || preference.matches) return;
          const context = gsap.context(() => {
            const timeline = gsap.timeline({ defaults: { duration: t.duration.reveal, ease: 'power3.out' } });
            timeline.fromTo('[data-solutions-heading]', { opacity: 0, y: t.distance }, { opacity: 1, y: 0, stagger: t.stagger, clearProps: 'opacity,transform' })
              .fromTo('[data-solutions-row]', { opacity: 0, x: -12 }, { opacity: 1, x: 0, stagger: t.stagger, clearProps: 'opacity,transform' }, 0.15);
          }, element);
          revert = () => context.revert();
        }).catch(() => { /* Static server content remains visible. */ });
      }, { threshold: 0.12 });
      observer.observe(element);
    };
    schedule(); preference.addEventListener('change', schedule);
    return () => { disposed = true; generation++; observer?.disconnect(); preference.removeEventListener('change', schedule); revert?.(); };
  }, []);
  return <div ref={root}>{children}</div>;
}
