'use client';
import { useEffect, useRef } from 'react';
import { motionTokens as t } from '@/design-system/motion';

/** Progressive enhancement: server content remains visible with JS off or reduced motion. */
export function useHeroEntrance() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let disposed = false;
    let generation = 0;
    let revert: (() => void) | undefined;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const animate = async () => {
      const current = ++generation;
      revert?.();
      revert = undefined;
      if (preference.matches) return;
      const gsapModule = await import('gsap').catch(() => null);
      if (!gsapModule || disposed || current !== generation || preference.matches || !root.current) return;
      const gsap = gsapModule.default;
      const context = gsap.context(() => {
        // Avoid moving/hiding an action that received focus before animation code loaded.
        const canAnimate = !root.current?.contains(document.activeElement);
        const timeline = gsap.timeline({ defaults: { duration: t.duration.reveal, ease: 'power3.out' } });
        timeline.fromTo('[data-hero-background]', { opacity: 0.45 }, { opacity: 1, duration: t.duration.image, clearProps: 'opacity' }, 0);
        if (canAnimate) {
          timeline.fromTo('[data-hero-eyebrow]', { opacity: 0, y: 12 }, { opacity: 1, y: 0, clearProps: 'opacity,transform' }, 0.05)
            .fromTo('[data-hero-headline]', { opacity: 0, y: t.distance }, { opacity: 1, y: 0, stagger: t.stagger * 2, clearProps: 'opacity,transform' }, 0.14)
            .fromTo('[data-hero-copy]', { opacity: 0, y: 16 }, { opacity: 1, y: 0, clearProps: 'opacity,transform' }, 0.4)
            .fromTo('[data-hero-action]', { opacity: 0, y: 12 }, { opacity: 1, y: 0, stagger: t.stagger, clearProps: 'opacity,transform' }, 0.5);
        }
      }, root);
      revert = () => context.revert();
    };
    void animate();
    preference.addEventListener('change', animate);
    return () => { disposed = true; generation++; preference.removeEventListener('change', animate); revert?.(); };
  }, []);
  return root;
}
