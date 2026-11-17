'use client';
import { motion, useReducedMotion } from 'motion/react';
import { Plus } from 'lucide-react';
import { Button, Text } from '@/components/ui/primitives';
import { motionTokens as t } from '@/design-system/motion';
import type { OperatingPillar } from '@/content/advantage';
export function PillarRow({ pillar, expanded, onToggle }: { pillar: OperatingPillar; expanded: boolean; onToggle: () => void }) {
  const reduced = useReducedMotion();
  const buttonId = `pillar-trigger-${pillar.id}`;
  const panelId = `pillar-panel-${pillar.id}`;
  const transition = { duration: reduced ? 0 : t.duration.fast, ease: t.ease };
  return <div className="pillar-row" data-expanded={expanded} data-pillar-row>
    <h3 className="pillar-heading">
      <Button id={buttonId} className="pillar-trigger" aria-expanded={expanded} aria-controls={panelId} onClick={onToggle}>
        <span className="pillar-number" aria-hidden="true">{pillar.number}</span><span>{pillar.title}</span>
        <motion.span className="pillar-symbol" aria-hidden="true" initial={false} animate={{ rotate: expanded ? 45 : 0 }} transition={transition}><Plus size={20} /></motion.span>
      </Button>
    </h3>
    <motion.div id={panelId} className="pillar-panel" role="region" aria-labelledby={buttonId} aria-hidden={!expanded} inert={!expanded}
      initial={false} animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }} transition={transition}>
      <div className="pillar-panel-inner"><Text>{pillar.description}</Text></div>
    </motion.div>
  </div>;
}
