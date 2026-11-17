'use client';
import { useState } from 'react';
import type { OperatingPillar } from '@/content/advantage';
export function usePillarAccordion(pillars: readonly OperatingPillar[]) {
  const [openId, setOpenId] = useState<string | null>(pillars[0]?.id ?? null);
  const toggle = (id: string) => {
    if (pillars.some(pillar => pillar.id === id)) setOpenId(previous => previous === id ? null : id);
  };
  return { openId, toggle };
}
