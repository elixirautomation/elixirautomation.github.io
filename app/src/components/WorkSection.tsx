import type { CapabilityCard as CapabilityCardModel } from '../content/types';
import { capabilityCards } from '../content/capabilityCards';
import { CardCarousel } from './CardCarousel';

function CapabilityCardView({ card }: { card: CapabilityCardModel }) {
  return (
    <article className="capability-card reveal tilt-card">
      <span className="card-index">{card.index}</span>
      <span className="card-icon" aria-hidden="true">
        {card.icon}
      </span>
      <h3>{card.title}</h3>
      <p>{card.description}</p>
      <ul>
        {card.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </article>
  );
}

export function WorkSection() {
  return (
    <section className="section section-shell" id="work" aria-labelledby="work-title">
      <div className="section-heading reveal">
        <p className="eyebrow">How I work</p>
        <h2 id="work-title">Agentic engineering, grounded in production.</h2>
        <p>I connect specification, implementation, evidence, and operational feedback into systems that help teams move with confidence.</p>
      </div>
      <CardCarousel
        items={capabilityCards}
        getKey={(card) => card.title}
        renderCard={(card) => <CapabilityCardView key={card.title} card={card} />}
        ariaLabel="Engineering capabilities"
        gridClassName="capability-grid"
      />
    </section>
  );
}
