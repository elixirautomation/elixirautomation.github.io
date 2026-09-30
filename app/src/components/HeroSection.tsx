import { profile } from '../content/profile';
import { useRotatingText } from '../hooks/useRotatingText';
import { AgentPipeline } from './AgentPipeline';
import { HeroMetrics } from './HeroMetrics';
import { ArrowDownRightIcon } from './Icons';
import { Reveal } from './Reveal';

// Plays once (~3.6 s) and settles on the headline word, so it never loops forever.
const ROTATING_WORDS = ['explainable.', 'resilient.', 'scalable.', 'observable.'];

export function HeroSection() {
  const rotatingWord = useRotatingText(ROTATING_WORDS, 1200, { once: true });

  return (
    <section className="hero section-shell" id="home" aria-labelledby="hero-title">
      <Reveal className="hero-copy">
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
            Explore projects <ArrowDownRightIcon />
          </a>
          <a className="button button-secondary" href="#contact">
            Get in touch
          </a>
        </div>
        <HeroMetrics />
      </Reveal>
      <AgentPipeline />
    </section>
  );
}
