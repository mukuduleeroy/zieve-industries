'use client';
import type { ReactNode } from 'react';
import { useIndustryScroll } from '@/hooks/use-industry-scroll';

export function IndustryMotion({ children }: { children: ReactNode }) {
  const ref = useIndustryScroll();
  return <div ref={ref} className="industry-scene"><div className="industry-stage">{children}</div></div>;
}
