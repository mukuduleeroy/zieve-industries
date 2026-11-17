'use client';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Anchor as Link } from '@/components/ui/primitives';
import { motionTokens } from '@/design-system/motion';
import type { NavigationItem } from '@/types/navigation';
const MotionLink = motion.create(Link);
export function HeroAction({ action, primary = false }: { action: NavigationItem; primary?: boolean }) {
  const reduced = useReducedMotion();
  const Icon = primary ? ArrowRight : ArrowUpRight;
  return <MotionLink href={action.href} className={`button hero-action ${primary ? 'hero-action-primary' : 'hero-action-secondary'}`} data-hero-action
    initial={false} whileHover="hover" whileFocus="hover">
    {action.label}<motion.span aria-hidden="true" initial={false} variants={{ hover: { x: reduced ? 0 : 3 } }} transition={{ duration: reduced ? 0 : motionTokens.duration.fast }}><Icon size={18} /></motion.span>
  </MotionLink>;
}
