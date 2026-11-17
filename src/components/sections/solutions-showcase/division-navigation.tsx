'use client';
import { useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/primitives';
import { motionTokens as t } from '@/design-system/motion';
import type { SolutionDivision, SolutionSlug } from '@/content/solutions-showcase';
interface Props { divisions: readonly SolutionDivision[]; activeSlug: SolutionSlug; onSelect: (slug: string) => void }
export function DivisionNavigation({ divisions, activeSlug, onSelect }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  return <>
    <div ref={root} className="solutions-navigation" role="group" aria-label="Choose an industrial solution">
      {divisions.map((division, index) => <div data-solutions-row key={division.slug}>
        <Button className="division-choice" aria-pressed={activeSlug === division.slug} aria-controls={`solution-panel-${division.slug}`}
          onClick={() => onSelect(division.slug)}
          onKeyDown={event => {
            let next = index;
            if (event.key === 'ArrowDown') next = (index + 1) % divisions.length;
            else if (event.key === 'ArrowUp') next = (index - 1 + divisions.length) % divisions.length;
            else if (event.key === 'Home') next = 0;
            else if (event.key === 'End') next = divisions.length - 1;
            else return;
            event.preventDefault(); root.current?.querySelectorAll<HTMLButtonElement>('button')[next]?.focus();
          }}>
          <motion.span className="division-active-indicator" aria-hidden="true" initial={false} animate={{ scaleY: activeSlug === division.slug ? 1 : 0 }} transition={{ duration: reduced ? 0 : t.duration.fast }} />
          <span className="division-number" aria-hidden="true">{division.number}</span><span>{division.name}</span><ArrowUpRight size={17} aria-hidden="true" />
        </Button>
      </div>)}
    </div>
    <div className="solutions-mobile-selector">
      <label htmlFor="solution-selection" className="eyebrow">Choose a division</label>
      <select id="solution-selection" value={activeSlug} onChange={event => onSelect(event.target.value)} aria-controls="solution-panels">
        {divisions.map(division => <option key={division.slug} value={division.slug}>{division.number} — {division.name}</option>)}
      </select>
    </div>
  </>;
}
