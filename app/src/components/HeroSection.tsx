import { profile } from '../content/profile';
import { useRotatingText } from '../hooks/useRotatingText';
import { AgentPipeline } from './AgentPipeline';
import { HeroMetrics } from './HeroMetrics';
import { DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon } from './Icons';

const ROTATING_WORDS = ['observable.', 'explainable.', 'resilient.', 'scalable.'];

export function HeroSection({ onPrint }: { onPrint: () => void }) {
  const rotatingWord = useRotatingText(ROTATING_WORDS, 2800);

  return (
    <section className="hero section-shell" id="home" aria-labelledby="hero-title">
      <div className="hero-copy reveal">
        <div className="availability">
          <span className="pulse" aria-hidden="true"></span>
          {profile.currentFocus}
        </div>
        <p className="eyebrow">
          {profile.name} · {profile.role} · {profile.location}
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
          <button className="button button-secondary" type="button" onClick={onPrint}>
            <DownloadIcon />
            Resume (PDF)
          </button>
        </div>
        <div className="hero-links" aria-label="Profiles and contact">
          <a href={profile.links.github} target="_blank" rel="noreferrer">
            <GitHubIcon />
            GitHub
          </a>
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
            <LinkedInIcon />
            LinkedIn
          </a>
          <a href={`mailto:${profile.email}`}>
            <MailIcon />
            Email
          </a>
        </div>
        <HeroMetrics />
      </div>
      <AgentPipeline />
    </section>
  );
}
