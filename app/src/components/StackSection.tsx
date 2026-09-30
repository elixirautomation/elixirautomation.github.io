import { stackCards } from '../content/stackCards';
import type { StackCard as StackCardModel } from '../content/types';
import { useFold } from '../hooks/useDensity';
import { FoldToggle } from './FoldToggle';
import { Reveal } from './Reveal';
import './StackSection.css';

/** On phones each group leads with its first few tools; the rest fold. */
const LEAD_TOOLS = 3;

function StackCardView({ card, index }: { card: StackCardModel; index: number }) {
  const fold = useFold();
  const hidden = card.tools.length - LEAD_TOOLS;
  return (
    <article className="stack-card" {...fold.foldProps} aria-labelledby={`stack-${index}-title`}>
      <span className="stack-eyebrow">
        {String(index + 1).padStart(2, '0')} · {card.eyebrow}
      </span>
      <h3 id={`stack-${index}-title`}>{card.title}</h3>
      <ul aria-label={`${card.title} tools`}>
        {card.tools.map((tool, toolIndex) => (
          <li key={tool} className={toolIndex >= LEAD_TOOLS ? 'fold-detail' : undefined}>
            {tool}
          </li>
        ))}
      </ul>
      {fold.showToggle && hidden > 0 && <FoldToggle open={fold.open} onToggle={fold.toggle} label={`${hidden} more`} />}
    </article>
  );
}

/** 4 groups × 6 short labels fit on one screen, so they are shown whole rather than paged. */
export function StackSection() {
  return (
    <section className="section section-shell stack-section" id="stack" aria-labelledby="stack-title">
      <Reveal className="section-heading">
        <p className="eyebrow">Technology constellation</p>
        <h2 id="stack-title">Tools selected for outcomes, not trends.</h2>
      </Reveal>
      <div className="stack-grid">
        {stackCards.map((card, index) => (
          <Reveal key={card.title} className="stack-cell" delay={index * 0.07}>
            <StackCardView card={card} index={index} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
