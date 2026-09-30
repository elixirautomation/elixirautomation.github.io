import type { StackCard as StackCardModel } from '../content/types';
import { stackCards } from '../content/stackCards';
import { DeckCarousel } from './DeckCarousel';
import './StackSection.css';

function StackCardView({ card, index, compact }: { card: StackCardModel; index: number; compact: boolean }) {
  return (
    <article className={`stack-card${compact ? ' is-square' : ''}`}>
      <div className="stack-card-head">
        <span className="stack-eyebrow" data-swiper-parallax="-60" data-swiper-parallax-opacity="0.3">
          {String(index + 1).padStart(2, '0')} · {card.eyebrow}
        </span>
        <h3 data-swiper-parallax="-140">{card.title}</h3>
        {!compact && (
          <p className="stack-count" data-swiper-parallax="-200">
            {card.tools.length} tools in regular use
          </p>
        )}
      </div>
      <ul data-swiper-parallax={compact ? '-220' : '25%'}>
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
      <div className="reveal">
        <DeckCarousel
          items={stackCards}
          getKey={(card) => card.title}
          noun="stack group"
          label="Technology stack"
          className="stack-deck"
          renderSlide={(card, { index, compact }) => <StackCardView card={card} index={index} compact={compact} />}
        />
      </div>
    </section>
  );
}
