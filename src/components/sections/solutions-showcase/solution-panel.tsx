'use client';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Heading, Text, Anchor as Link } from '@/components/ui/primitives';
import { motionTokens as t } from '@/design-system/motion';
import { solutionsMedia, solutionPlaceholders } from '@/config/solutions-media';
import { solutionsShowcaseContent, type SolutionDivision } from '@/content/solutions-showcase';
import { solutionPanelId } from '@/content/homepage-navigation';
import { SolutionMedia } from './solution-media';
export function SolutionPanel({ division, active }: { division: SolutionDivision; active: boolean }) {
  const reduced = useReducedMotion();
  const transition = { duration: reduced ? 0 : t.duration.fast, ease: t.ease };
  return <article id={solutionPanelId(division.slug)} tabIndex={-1} className="solution-panel" data-active={active} aria-hidden={!active} inert={!active} aria-labelledby={`solution-heading-${division.slug}`}>
    <motion.div className="solution-image-reveal" initial={false} animate={{ opacity: active ? 1 : 0, clipPath: active ? 'inset(0 0% 0 0)' : 'inset(0 4% 0 0)' }} transition={transition}>
      {active && <SolutionMedia media={solutionsMedia[division.slug]} fallback={solutionPlaceholders[division.slug]} />}
    </motion.div>
    <motion.div className="solution-panel-copy" initial={false} animate={{ opacity: active ? 1 : 0, y: active || reduced ? 0 : 6 }} transition={transition}>
      <p className="eyebrow solution-panel-number">Division {division.number} / 05</p>
      <Heading as="h3" size="subtitle" id={`solution-heading-${division.slug}`}>{division.headline}</Heading>
      <Text className="solution-description">{division.description}</Text>
      <Link className="solution-explore" href={division.href} aria-label={`${solutionsShowcaseContent.exploreLabel}: ${division.name}`}>{solutionsShowcaseContent.exploreLabel}<ArrowUpRight size={18} aria-hidden="true" /></Link>
    </motion.div>
  </article>;
}
