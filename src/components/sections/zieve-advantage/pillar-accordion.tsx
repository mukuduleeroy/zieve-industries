'use client';
import { useRef } from 'react';
import { operatingPillars } from '@/content/advantage';
import { usePillarAccordion } from '@/hooks/use-pillar-accordion';
import { PillarRow } from './pillar-row';
export function PillarAccordion() {
  const { openId, toggle } = usePillarAccordion(operatingPillars);
  const root = useRef<HTMLDivElement>(null);
  return <div ref={root} className="pillar-accordion" onKeyDown={event => {
    const buttons = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('.pillar-trigger'));
    const index = buttons.indexOf(event.target as HTMLButtonElement);
    if (index < 0) return;
    let next = index;
    if (event.key === 'ArrowDown') next = (index + 1) % buttons.length;
    else if (event.key === 'ArrowUp') next = (index - 1 + buttons.length) % buttons.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = buttons.length - 1;
    else return;
    event.preventDefault(); buttons[next]?.focus();
  }}>
    {operatingPillars.map(pillar => <PillarRow key={pillar.id} pillar={pillar} expanded={openId === pillar.id} onToggle={() => toggle(pillar.id)} />)}
  </div>;
}
