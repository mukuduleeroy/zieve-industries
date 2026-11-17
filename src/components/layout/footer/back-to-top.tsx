'use client';
import { ArrowUp } from 'lucide-react';
export function BackToTop() {
  return <a href="#main-content" className="footer-back-to-top" onClick={event => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const main = document.getElementById('main-content');
    if (!main) return;
    event.preventDefault();
    main.focus({ preventScroll: true });
    window.history.replaceState(window.history.state, '', '#main-content');
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }}>Back to top<span aria-hidden="true"><ArrowUp size={17} /></span></a>;
}
