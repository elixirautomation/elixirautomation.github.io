import type { ReactNode } from 'react';
import { motion } from 'motion/react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds; use small steps (0.07) to stagger siblings. */
  delay?: number;
  as?: 'div' | 'section';
  ariaLabel?: string;
}

/**
 * The site's one scroll-entrance primitive. Reduced motion is handled once,
 * globally, by `<MotionConfig reducedMotion="user">` in App.
 */
export function Reveal({ children, className, delay = 0, as = 'div', ariaLabel }: RevealProps) {
  const Component = as === 'section' ? motion.section : motion.div;
  return (
    <Component
      className={className}
      aria-label={ariaLabel}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: '0px 0px -45px 0px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}
