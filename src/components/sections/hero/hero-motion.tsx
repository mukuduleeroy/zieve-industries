'use client';
import type { ReactNode } from 'react';
import { useHeroEntrance } from '@/hooks/use-hero-entrance';
export function HeroMotion({ children }: { children: ReactNode }) {
  const ref = useHeroEntrance();
  return <div ref={ref} className="hero-stage">{children}</div>;
}
