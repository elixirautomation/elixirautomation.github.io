import { profile } from '../content/profile';
import { useRotatingText } from '../hooks/useRotatingText';
import { AgentPipeline } from './AgentPipeline';
import { HeroMetrics } from './HeroMetrics';

const ROTATING_WORDS = ['observable.', 'explainable.', 'resilient.', 'scalable.'];

export function HeroSection() {
  const rotatingWord = useRotatingText(ROTATING_WORDS, 2800);

  return (
    <section className="hero section-shell" id="home" aria-labelledby="hero-title">
      <div className="hero-copy reveal">
        <div className="availability">
          <span className="pulse" aria-hidden="true"></span>
          {profile.currentFocus}
        </div>
        <p className="eyebrow">
          {profile.name} · AI-native Mission Pod · {profile.location}
        </p>
        <h1 id="hero-title">
          I build AI agents and platforms that make engineering quality{' '}
          <span className="gradient-text text-swap" key={rotatingWord.cycle}>
            {rotatingWord.text}
          </span>
        </h1>
        <p className="hero-summary">{profile.positioning}</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#projects">
            Explore projects <span aria-hidden="true">↘</span>
          </a>
          <a className="button button-secondary" href="#contact">
            Get in touch
          </a>
        </div>
        <HeroMetrics />
      </div>
      <AgentPipeline />
    </section>
  );
}
