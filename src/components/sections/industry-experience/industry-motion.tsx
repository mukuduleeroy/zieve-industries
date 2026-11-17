'use client';
import { useEffect, useRef, type ReactNode } from 'react';
import { motionTokens as t } from '@/design-system/motion';
/** Each panel arms independently; reduced motion never loads or hides animation targets. */
export function IndustryMotion({ children, className, panel = false }: { children: ReactNode; className: string; panel?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let generation = 0;
    let disposed = false;
    let observer: IntersectionObserver | undefined;
    let revert: (() => void) | undefined;
    const initialise = async (version: number) => {
      const modules = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).catch(() => null);
      if (!modules || disposed || version !== generation || preference.matches) return;
      const gsap = modules[0].default;
      gsap.registerPlugin(modules[1].ScrollTrigger);
      const media = gsap.matchMedia();
      const context = gsap.context(() => {
        const timeline = gsap.timeline({ defaults: { duration: t.duration.reveal, ease: 'power3.out' }, scrollTrigger: { trigger: element, start: 'top 85%', once: true } });
        // Preserve a control that was reached before the lazy enhancement loaded.
        if (!element.contains(document.activeElement)) timeline.fromTo('[data-industry-reveal]', { opacity: 0, y: 16 }, { opacity: 1, y: 0, stagger: t.stagger, clearProps: 'opacity,transform' }, 0);
        if (panel) {
          timeline.fromTo('[data-industry-number]', { opacity: 0, y: 12 }, { opacity: 1, y: 0, clearProps: 'opacity,transform' }, 0)
            .fromTo('[data-industry-mask]', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: t.duration.image, clearProps: 'clipPath' }, 0.12)
            .fromTo('[data-industry-divider]', { scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, clearProps: 'transform,transformOrigin' }, 0.2);
          media.add('(min-width: 64rem) and (hover: hover) and (pointer: fine)', () => {
            const frame = element.querySelector('[data-industry-mask]');
            const image = element.querySelector('[data-industry-parallax]');
            if (!frame || !image) return;
            gsap.fromTo(image, { y: -10 }, { y: 10, ease: 'none', scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: 0.5 } });
          });
        }
      }, element);
      revert = () => { media.revert(); context.revert(); };
    };
    const schedule = () => {
      const version = ++generation;
      observer?.disconnect(); revert?.(); revert = undefined;
      if (preference.matches) return;
      observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) { observer?.disconnect(); void initialise(version); }
      }, { rootMargin: '160px' });
      observer.observe(element);
    };
    schedule(); preference.addEventListener('change', schedule);
    return () => { disposed = true; generation++; observer?.disconnect(); preference.removeEventListener('change', schedule); revert?.(); };
  }, [panel]);
  return <div ref={root} className={className}>{children}</div>;
}
