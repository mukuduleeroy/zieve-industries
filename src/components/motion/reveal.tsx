'use client';
import { motion, useReducedMotion, type HTMLMotionProps } from 'motion/react';
import { motionTokens as t } from '@/design-system/motion';
export function Reveal({ children, effect = 'fade', ...props }: HTMLMotionProps<'div'> & { effect?: 'fade' | 'text' | 'image' | 'stagger' }) {
  const reduced = useReducedMotion();
  const hidden = effect === 'image' ? { opacity: 0, clipPath: 'inset(0 0 100% 0)' } : { opacity: 0, y: effect === 'text' ? t.distance : 0 };
  return <motion.div {...props} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={{ hidden: reduced ? {} : hidden, visible: { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', transition: { duration: reduced ? 0 : t.duration.reveal, ease: t.ease, staggerChildren: reduced ? 0 : t.stagger } } }}>{children}</motion.div>;
}
export function RevealItem({ children, ...props }: HTMLMotionProps<'div'>) {
  const reduced = useReducedMotion();
  return <motion.div {...props} variants={{ hidden: reduced ? {} : { opacity: 0, y: t.distance }, visible: { opacity: 1, y: 0, transition: { duration: reduced ? 0 : t.duration.reveal, ease: t.ease } } }}>{children}</motion.div>;
}
