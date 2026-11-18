'use client';
import { solutionDivisions } from '@/content/solutions-showcase';
import { useSolutionSelection } from '@/hooks/use-solution-selection';
import { DivisionNavigation } from './division-navigation';
import { SolutionPanel } from './solution-panel';
export function SolutionsWorkbench() {
  const { activeSlug, eagerMedia, select } = useSolutionSelection(solutionDivisions);
  const active = solutionDivisions.find(item => item.slug === activeSlug)!;
  return <div className="solutions-workbench">
    <DivisionNavigation divisions={solutionDivisions} activeSlug={activeSlug} onSelect={select} />
    <div className="solution-panels" id="solution-panels">
      {solutionDivisions.map(division => <SolutionPanel key={division.slug} division={division} active={activeSlug === division.slug} eagerMedia={eagerMedia} />)}
    </div>
    <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">Division {active.number}: {active.name} selected.</p>
  </div>;
}
