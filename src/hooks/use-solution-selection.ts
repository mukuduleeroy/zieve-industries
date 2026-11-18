'use client';
import { useEffect, useState } from 'react';
import { solutionsShowcaseContent, type SolutionDivision } from '@/content/solutions-showcase';
import { solutionPanelId } from '@/content/homepage-navigation';
export function useSolutionSelection(divisions: readonly SolutionDivision[]) {
  const [selection, setSelection] = useState({ slug: divisions[0].slug, anchor: false, eagerMedia: false });
  useEffect(() => {
    const sync = () => {
      const division = divisions.find(item => `#${solutionPanelId(item.slug)}` === window.location.hash);
      if (division) setSelection({ slug: division.slug, anchor: true, eagerMedia: true });
      else if (window.location.hash === `#${solutionsShowcaseContent.id}`) {
        setSelection(current => ({ ...current, anchor: false, eagerMedia: true }));
      }
    };
    const frame = requestAnimationFrame(sync);
    window.addEventListener('hashchange', sync); window.addEventListener('popstate', sync);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('hashchange', sync); window.removeEventListener('popstate', sync); };
  }, [divisions]);
  useEffect(() => {
    if (!selection.anchor || document.activeElement?.closest('.solutions-navigation, .solutions-mobile-selector')) return;
    // Fragment navigation can focus before the browser exposes the new panel.
    // Confirm visibility as well as React state before completing that navigation.
    let frame = 0;
    let cancelled = false;
    const cancel = () => { cancelled = true; cancelAnimationFrame(frame); };
    const focus = () => {
      if (cancelled) return;
      const panel = document.getElementById(solutionPanelId(selection.slug));
      if (!panel || panel.dataset.active !== 'true' || panel.inert || getComputedStyle(panel).visibility !== 'visible' || !panel.checkVisibility()) {
        frame = requestAnimationFrame(focus);
        return;
      }
      panel.focus({ preventScroll: true });
      panel.scrollIntoView({ block: 'start', behavior: 'instant' });
    };
    const onFocus = (event: FocusEvent) => {
      if (event.target instanceof Element && !event.target.closest(`#${solutionPanelId(selection.slug)}`)) cancel();
    };
    frame = requestAnimationFrame(focus);
    // Never steal focus back if the visitor starts another interaction while waiting.
    window.addEventListener('focusin', onFocus);
    window.addEventListener('pointerdown', cancel, { once: true });
    window.addEventListener('keydown', cancel, { once: true });
    return () => { cancel(); window.removeEventListener('focusin', onFocus); window.removeEventListener('pointerdown', cancel); window.removeEventListener('keydown', cancel); };
  }, [selection]);
  const select = (slug: string) => {
    const division = divisions.find(item => item.slug === slug);
    if (!division) return;
    setSelection({ slug: division.slug, anchor: false, eagerMedia: true });
    // Replace context without adding history entries, scrolling or moving selector focus.
    window.history.replaceState(window.history.state, '', `#${solutionPanelId(division.slug)}`);
  };
  return { activeSlug: selection.slug, eagerMedia: selection.eagerMedia, select };
}
