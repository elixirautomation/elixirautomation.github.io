import { motion } from 'motion/react';

interface FoldToggleProps {
  open: boolean;
  onToggle: () => void;
  /** What the hidden detail is, e.g. "role details" or "3 more tools". */
  label: string;
  className?: string;
}

/** The tap target that reveals an item's folded detail on phones. */
export function FoldToggle({ open, onToggle, label, className }: FoldToggleProps) {
  return (
    <button type="button" className={`fold-toggle${className ? ` ${className}` : ''}`} aria-expanded={open} onClick={onToggle}>
      <span>{open ? 'Show less' : `Show ${label}`}</span>
      <motion.svg viewBox="0 0 24 24" aria-hidden="true" animate={{ rotate: open ? 180 : 0 }} transition={{ type: 'spring', stiffness: 420, damping: 30 }}>
        <path d="m6 9 6 6 6-6" />
      </motion.svg>
    </button>
  );
}
