'use client';
import { useEffect, useRef } from 'react';

/** CSS document flow is the baseline. A single measured, reversible desktop enhancement. */
export function useIndustryScroll() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const scene = root.current;
    if (!scene) return;
    const stage = scene.querySelector<HTMLElement>('.industry-stage')!;
    const viewport = scene.querySelector<HTMLElement>('.industry-viewport')!;
    const track = scene.querySelector<HTMLElement>('.industry-sector-list')!;
    const panels = [...scene.querySelectorAll<HTMLElement>('.industry-panel')];
    const bar = scene.querySelector<HTMLElement>('[data-industry-progress]')!;
    const counter = scene.querySelector<HTMLElement>('[data-industry-current]')!;
    const capability = matchMedia('(min-width: 80rem) and (min-height: 48rem) and (hover: hover) and (pointer: fine)');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let disposed = false, generation = 0, frame = 0, loading = false;
    let failedFit = '';
    let pointerFocus = false;
    let reading = panels.some(panel => location.hash === `#${panel.id}`);
    // Do not change the document height underneath a restored, non-scene anchor.
    if (location.hash && location.hash !== '#industries-we-serve') reading = true;
    let revert: (() => void) | undefined;
    let mediaObserver: IntersectionObserver | undefined;
    let refresh: (() => void) | undefined;
    let progress = () => 0;
    const headerHeight = () => document.querySelector('header')?.getBoundingClientRect().height ?? 0;
    const allowed = () => !reading && capability.matches && !reduced.matches
      && parseFloat(getComputedStyle(document.documentElement).fontSize) <= 20;
    const fit = () => panels.every(panel => panel.scrollHeight <= panel.clientHeight + 1);
    const fitKey = () => `${innerWidth}:${innerHeight}:${headerHeight()}:${getComputedStyle(document.documentElement).fontSize}`;
    const dimensions = () => {
      const height = `${Math.floor(innerHeight - headerHeight())}px`;
      if (scene.style.getPropertyValue('--industry-stage-height') !== height) scene.style.setProperty('--industry-stage-height', height);
      const travel = Math.max(0, track.scrollWidth - viewport.clientWidth);
      scene.style.setProperty('--industry-travel', `${travel}px`);
      return travel;
    };
    const stop = (preserve = true) => {
      const bounds = scene.getBoundingClientRect();
      const oldHeight = bounds.height;
      const index = Math.round(progress() * (panels.length - 1));
      ++generation;
      revert?.(); revert = undefined; refresh = undefined; progress = () => 0;
      mediaObserver?.disconnect(); mediaObserver = undefined;
      for (const image of track.querySelectorAll('img')) image.loading = 'lazy';
      delete scene.dataset.horizontal; delete scene.dataset.activeIndex;
      counter.textContent = '01';
      scene.style.removeProperty('--industry-stage-height'); scene.style.removeProperty('--industry-travel');
      if (preserve && bounds.top < headerHeight()) {
        if (bounds.bottom <= headerHeight()) scrollBy(0, scene.getBoundingClientRect().height - oldHeight);
        else scrollTo(0, panels[index].getBoundingClientRect().top + scrollY - headerHeight());
      }
    };
    const initialise = async () => {
      if (loading || !allowed() || failedFit === fitKey() || scene.getBoundingClientRect().bottom < 0) return;
      loading = true;
      const version = ++generation;
      const modules = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).catch(() => null);
      loading = false;
      if (!modules || disposed || version !== generation || !allowed()) return;
      scene.dataset.horizontal = 'true';
      scene.dataset.activeIndex = '0';
      dimensions();
      if (!fit()) { failedFit = fitKey(); stop(false); return; }
      const gsap = modules[0].default, ScrollTrigger = modules[1].ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      let near = false;
      const warm = (index: number) => {
        if (!near) return;
        // Native lazy loading need not anticipate a later transform. Load only
        // the current/next panel, near the stage, without changing SSR priority.
        for (const panel of panels.slice(index, index + 2)) {
          const image = panel.querySelector('img');
          if (image) image.loading = 'eager';
        }
      };
      mediaObserver = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          near = true; warm(Math.round(progress() * (panels.length - 1)));
          mediaObserver?.disconnect();
        }
      }, { rootMargin: '600px' });
      mediaObserver.observe(stage);
      const context = gsap.context(() => {
        const timeline = gsap.timeline({ scrollTrigger: {
          id: 'zieve-industries-horizontal', trigger: scene,
          start: () => `top top+=${headerHeight()}`,
          end: () => `+=${Math.max(1, track.scrollWidth - viewport.clientWidth)}`,
          scrub: true, invalidateOnRefresh: true,
          onUpdate: self => {
            const index = Math.round(self.progress * (panels.length - 1));
            if (scene.dataset.activeIndex !== String(index)) {
              scene.dataset.activeIndex = String(index);
              counter.textContent = String(index + 1).padStart(2, '0');
              warm(index);
            }
          },
        }});
        timeline.to(track, { x: () => -(track.scrollWidth - viewport.clientWidth), ease: 'none' }, 0)
          .fromTo(bar, { scaleX: 0 }, { scaleX: 1, ease: 'none' }, 0);
        progress = () => timeline.scrollTrigger?.progress ?? 0;
        refresh = () => {
          dimensions();
          if (!fit()) { failedFit = fitKey(); stop(); return; }
          timeline.scrollTrigger?.refresh();
        };
      }, scene);
      revert = () => context.revert();
      refresh?.();
      // The root anchor remains native; ensure a direct scene arrival clears the header.
      if (location.hash === '#industries-we-serve') scene.parentElement?.scrollIntoView({ block: 'start' });
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (disposed) return;
        if (!allowed()) { if (revert) stop(); return; }
        if (refresh) refresh(); else void initialise();
      });
    };
    const focus = (event: FocusEvent) => {
      const target = event.target;
      if (!(target instanceof HTMLElement) || !track.contains(target)) return;
      const bounds = target.getBoundingClientRect();
      // Do not move a visible pointer target between pointerdown and click.
      if (pointerFocus && bounds.left >= 0 && bounds.right <= innerWidth) return;
      // Native Tab / AT focus must never land in a translated, clipped panel.
      reading = true; stop(false); target.scrollIntoView({ block: 'nearest' });
    };
    const pointerDown = () => { pointerFocus = true; };
    const pointerEnd = () => { pointerFocus = false; };
    const hash = () => {
      const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (target && track.contains(target)) {
        reading = true; stop(false); target.scrollIntoView({ block: 'start' });
      }
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(stage);
    for (const element of scene.querySelectorAll('.industry-editorial, .industry-copy, figcaption')) observer.observe(element);
    const header = document.querySelector('header'); if (header) observer.observe(header);
    scene.addEventListener('focusin', focus);
    scene.addEventListener('pointerdown', pointerDown, true);
    window.addEventListener('pointerup', pointerEnd);
    window.addEventListener('pointercancel', pointerEnd);
    window.addEventListener('keydown', pointerEnd, true);
    scene.addEventListener('load', schedule, true);
    window.addEventListener('resize', schedule);
    window.addEventListener('hashchange', hash);
    capability.addEventListener('change', schedule); reduced.addEventListener('change', schedule);
    schedule();
    return () => {
      disposed = true; cancelAnimationFrame(frame); observer.disconnect(); stop(false);
      scene.removeEventListener('focusin', focus); scene.removeEventListener('load', schedule, true);
      scene.removeEventListener('pointerdown', pointerDown, true);
      window.removeEventListener('pointerup', pointerEnd); window.removeEventListener('pointercancel', pointerEnd);
      window.removeEventListener('keydown', pointerEnd, true);
      window.removeEventListener('resize', schedule); window.removeEventListener('hashchange', hash);
      capability.removeEventListener('change', schedule); reduced.removeEventListener('change', schedule);
    };
  }, []);
  return root;
}
