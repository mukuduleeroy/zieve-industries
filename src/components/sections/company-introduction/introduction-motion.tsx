'use client';
import type { ReactNode } from 'react';
import { useIntroductionMotion } from '@/hooks/use-introduction-motion';
export function IntroductionMotion({ children }: { children: ReactNode }) {
  const ref = useIntroductionMotion();
  return <div ref={ref} className="introduction-grid">{children}</div>;
}
