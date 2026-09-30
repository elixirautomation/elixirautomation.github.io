import { stackCards } from '../content/stackCards';
import type { StackCard as StackCardModel } from '../content/types';
import { Reveal } from './Reveal';
import './StackSection.css';

function StackCardView({ card, index }: { card: StackCardModel; index: number }) {
  return (
    <article className="stack-card" aria-labelledby={`stack-${index}-title`}>
      <span className="stack-eyebrow">
        {String(index + 1).padStart(2, '0')} · {card.eyebrow}
      </span>
      <h3 id={`stack-${index}-title`}>{card.title}</h3>
      <ul aria-label={`${card.title} tools`}>
        {card.tools.map((tool) => (
          <li key={tool}>{tool}</li>
        ))}
      </ul>
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
