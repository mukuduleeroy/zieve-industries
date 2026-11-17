'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motionTokens as t } from '@/design-system/motion';
/** Opt in on a wrapper; descendants marked data-reveal animate as a group. */
export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    if (!ref.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        gsap.from('[data-reveal]', { autoAlpha: 0, y: t.distance, duration: t.duration.reveal, stagger: t.stagger, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true } });
      }, ref);
      return () => context.revert();
    });
    return () => media.revert();
  }, []);
  return ref;
}
