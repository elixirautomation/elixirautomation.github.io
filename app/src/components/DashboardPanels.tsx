import type { ReactNode } from 'react';
import { DeckCarousel } from './DeckCarousel';
import './DashboardPanels.css';

export interface DashboardPanel {
  id: string;
  label: string;
  content: ReactNode;
}

/**
 * Sentinel dashboard panels. Wide screens show them stacked (they fit whole);
 * phones get the shared deck, so the chart stays reachable instead of hidden.
 */
export function DashboardPanels({ panels }: { panels: DashboardPanel[] }) {
  return (
    <DeckCarousel
      items={panels}
      getKey={(panel) => panel.id}
      noun="panel"
      label="Sentinel dashboard panels"
      wide="static"
      className="deck-small dash-deck"
      renderSlide={(panel, { compact }) => (
        <div className={compact ? 'dash-slide' : undefined}>
          {compact && <p className="dash-slide-label">{panel.label}</p>}
          {panel.content}
        </div>
      )}
    />
  );
}
