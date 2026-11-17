'use client';
import { useSyncExternalStore } from 'react';
import { getCopyrightYear } from '@/lib/copyright-year';
const subscribe = (onChange: () => void) => {
  let timer: ReturnType<typeof setTimeout>;
  const schedule = () => {
    // Harare is UTC+02:00. Cap the timer at one day, below browser timeout limits.
    const nextYear = Date.parse(`${getCopyrightYear() + 1}-01-01T00:00:00+02:00`);
    timer = setTimeout(() => { onChange(); schedule(); }, Math.min(86_400_000, Math.max(1000, nextYear - Date.now())));
  };
  const onVisibility = () => { if (!document.hidden) { clearTimeout(timer); onChange(); schedule(); } };
  schedule(); document.addEventListener('visibilitychange', onVisibility);
  return () => { clearTimeout(timer); document.removeEventListener('visibilitychange', onVisibility); };
};
export function CopyrightYear({ initialYear }: { initialYear: number }) {
  const year = useSyncExternalStore(subscribe, getCopyrightYear, () => initialYear);
  return <span data-copyright-year>{year}</span>;
}
