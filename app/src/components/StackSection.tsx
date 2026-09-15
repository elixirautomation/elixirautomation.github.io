import type { StackCard as StackCardModel } from '../content/types';
import { stackCards } from '../content/stackCards';
import { CardCarousel } from './CardCarousel';

function StackCardView({ card }: { card: StackCardModel }) {
  return (
    <article className="stack-card reveal">
      <span className="stack-eyebrow">{card.eyebrow}</span>
      <h3>{card.title}</h3>
      <ul>
        {card.tools.map((tool) => (
          <li key={tool}>{tool}</li>
        ))}
      </ul>
    </article>
  );
}

export function StackSection() {
  return (
    <section className="section section-shell stack-section" id="stack" aria-labelledby="stack-title">
      <div className="section-heading reveal">
        <p className="eyebrow">Technology constellation</p>
        <h2 id="stack-title">Tools selected for outcomes, not trends.</h2>
      </div>
      <CardCarousel
        items={stackCards}
        getKey={(card) => card.title}
        renderCard={(card) => <StackCardView key={card.title} card={card} />}
        ariaLabel="Technology stack"
        gridClassName="stack-grid"
      />
    </section>
  );
}
