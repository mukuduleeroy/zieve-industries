'use client';
import { useEffect, useRef } from 'react';
import { motionTokens as t } from '@/design-system/motion';

/** Scoped, opt-in enhancement. Baseline SSR/CSS stays readable without animation code. */
export function useIntroductionMotion() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let disposed = false;
    let generation = 0;
    let observer: IntersectionObserver | undefined;
    let revert: (() => void) | undefined;

    const initialise = async (version: number) => {
      const modules = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).catch(() => null);
      if (!modules || disposed || version !== generation || preference.matches) return;
      const gsap = modules[0].default;
      const ScrollTrigger = modules[1].ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();
      const context = gsap.context(() => {
        const timeline = gsap.timeline({
          defaults: { duration: t.duration.reveal, ease: 'power3.out' },
          scrollTrigger: { trigger: element, start: 'top 85%', once: true },
        });
        timeline.fromTo('[data-intro-eyebrow]', { opacity: 0, y: 12 }, { opacity: 1, y: 0, clearProps: 'opacity,transform' }, 0)
          .fromTo('[data-intro-heading]', { opacity: 0, y: t.distance }, { opacity: 1, y: 0, clearProps: 'opacity,transform' }, 0.08)
          .fromTo('[data-intro-paragraph]', { opacity: 0, y: 16 }, { opacity: 1, y: 0, stagger: t.stagger * 1.5, clearProps: 'opacity,transform' }, 0.2)
          .fromTo('[data-intro-image-mask]', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: t.duration.image, clearProps: 'clipPath' }, 0.14)
          .fromTo('[data-intro-divider]', { scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, clearProps: 'transform,transformOrigin' }, 0.3)
          .fromTo('[data-intro-closing]', { opacity: 0, y: 12 }, { opacity: 1, y: 0, clearProps: 'opacity,transform' }, 0.48);
        // Small translation with physical overscan; never scale or pin the image.
        media.add('(min-width: 64rem) and (hover: hover) and (pointer: fine)', () => {
          const frame = element.querySelector('[data-intro-image-mask]');
          const image = element.querySelector('[data-intro-parallax]');
          if (!frame || !image) return;
          gsap.fromTo(image, { y: -12 }, {
            y: 12, ease: 'none', scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
          });
        });
      }, element);
      revert = () => { media.revert(); context.revert(); };
    };
    const schedule = () => {
      const version = ++generation;
      observer?.disconnect();
      revert?.();
      revert = undefined;
      if (preference.matches) return;
      observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) { observer?.disconnect(); void initialise(version); }
      }, { rootMargin: '160px' });
      observer.observe(element);
    };
    schedule();
    preference.addEventListener('change', schedule);
    return () => { disposed = true; generation++; observer?.disconnect(); preference.removeEventListener('change', schedule); revert?.(); };
  }, []);
  return root;
}
