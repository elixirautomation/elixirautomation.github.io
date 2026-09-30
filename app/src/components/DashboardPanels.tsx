import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { useMediaQuery } from '../hooks/useMediaQuery';
import './DashboardPanels.css';

export interface DashboardPanel {
  id: string;
  label: string;
  content: ReactNode;
}

/**
 * Sentinel dashboard panels. Wide screens stack them (they fit whole); phones
 * get a segmented tab control so the chart stays reachable in the product
 * window instead of being hidden. WAI-ARIA tabs pattern with arrow keys.
 */
export function DashboardPanels({ panels }: { panels: DashboardPanel[] }) {
  const compact = useMediaQuery('(max-width: 720px)');
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();

  if (!compact) {
    return (
      <div className="dash-stack">
        {panels.map((panel) => (
          <div key={panel.id}>{panel.content}</div>
        ))}
      </div>
    );
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = (active + step + panels.length) % panels.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const panel = panels[active];

  return (
    <div className="dash-tabs">
      <div className="dash-tablist" role="tablist" aria-label="Sentinel dashboard panels" onKeyDown={onKeyDown}>
        {panels.map((item, index) => (
          <button
            key={item.id}
            ref={(element) => {
              tabRefs.current[index] = element;
            }}
            type="button"
            role="tab"
            id={`${baseId}-tab-${item.id}`}
            aria-selected={index === active}
            aria-controls={`${baseId}-panel`}
            tabIndex={index === active ? 0 : -1}
            onClick={() => setActive(index)}
          >
            {index === active && <motion.span layoutId={`${baseId}-pill`} className="dash-tab-pill" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
            <span className="dash-tab-label">{item.label}</span>
          </button>
        ))}
      </div>
      <motion.div
        key={panel.id}
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${panel.id}`}
        className="dash-slide"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        {panel.content}
      </motion.div>
    </div>
  );
}
