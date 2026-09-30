import { useCallback, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, EffectCards, EffectCreative, Keyboard, Navigation, Pagination, Parallax } from 'swiper/modules';
import { projects, type ProjectCaseStudy } from '../content/projects';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { ArchitectureFlow } from './ArchitectureFlow';
import { CaseStudyPanel } from './CaseStudyPanel';

import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-creative';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './ProjectsSection.css';

/**
 * Level 1 of the hierarchy: what it is, why it matters, the proof. Everything
 * else lives in the case study panel. `data-swiper-parallax*` offsets give the
 * layers depth as a slide moves (Swiper Parallax module).
 */
function ProjectCard({ project, compact, onOpen }: { project: ProjectCaseStudy; compact: boolean; onOpen: () => void }) {
  return (
    <article className="project-card" aria-labelledby={`project-${project.id}-title`}>
      <div className="project-body">
        <div className="project-meta" data-swiper-parallax="-60" data-swiper-parallax-opacity="0.3">
          <span>Project {project.index}</span>
          <span>{project.category}</span>
          <span className="project-status">
            <i aria-hidden="true"></i>
            {project.status}
          </span>
        </div>
        <h3 id={`project-${project.id}-title`} data-swiper-parallax="-120">
          {project.name}
        </h3>
        <p className="project-value" data-swiper-parallax="-180">
          {project.valueProp}
        </p>

        {project.impact.length > 0 ? (
          <div className="project-impact" aria-label="Impact" data-swiper-parallax="-240">
            {project.impact.map((entry) => (
              <div key={entry.label}>
                <strong>{entry.value}</strong>
                <span>{entry.label}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="project-no-metrics" data-swiper-parallax="-240">
            Outcome metrics not published
          </p>
        )}

        <div className="project-tech" aria-label="Technologies" data-swiper-parallax="-300">
          {project.tech.slice(0, compact ? 4 : undefined).map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
          {compact && project.tech.length > 4 && <span>+{project.tech.length - 4}</span>}
        </div>

        <button className="project-open" type="button" onClick={onOpen} aria-haspopup="dialog">
          Open case study <span aria-hidden="true">→</span>
        </button>
      </div>

      {!compact && (
        <div className="project-visual" data-swiper-parallax="30%" data-swiper-parallax-scale="0.9">
          <div className="project-visual-bar">
            <span>architecture</span>
            <span>{project.id}.flow</span>
          </div>
          <ArchitectureFlow steps={project.architecture} label={`${project.name} architecture`} />
        </div>
      )}
    </article>
  );
}

export function ProjectsSection() {
  const compact = useMediaQuery('(max-width: 720px)');
  const reducedMotion = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<ProjectCaseStudy | null>(null);
  const close = useCallback(() => setOpen(null), []);

  const shared = {
    modules: [A11y, Keyboard, Pagination, Navigation, Parallax, compact ? EffectCards : EffectCreative],
    rewind: true,
    grabCursor: true,
    keyboard: { enabled: true, onlyInViewport: true },
    pagination: { clickable: true },
    navigation: { prevEl: '.projects-prev', nextEl: '.projects-next' },
    speed: reducedMotion ? 0 : compact ? 520 : 760,
    onSlideChange: (swiper: { realIndex: number }) => setActive(swiper.realIndex),
    a11y: {
      containerMessage: 'Featured projects',
      prevSlideMessage: 'Previous project',
      nextSlideMessage: 'Next project',
      paginationBulletMessage: 'Go to project {{index}}',
    },
  };

  return (
    <section className="section section-shell projects-section" id="projects" aria-labelledby="projects-title">
      <div className="projects-head reveal">
        <div className="section-heading">
          <p className="eyebrow">Selected work</p>
          <h2 id="projects-title">Systems I have designed, built, and run.</h2>
          <p>Each card is the summary. Open a case study for the problem, the architecture, and my role.</p>
        </div>
        <div className="projects-controls">
          <span className="projects-count" aria-live="polite">
            <b>{String(active + 1).padStart(2, '0')}</b> / {String(projects.length).padStart(2, '0')}
          </span>
          <button className="projects-prev" type="button" aria-label="Previous project">
            ←
          </button>
          <button className="projects-next" type="button" aria-label="Next project">
            →
          </button>
        </div>
      </div>

      <div className={`projects-carousel reveal${compact ? ' is-compact' : ''}`}>
        {/* Remount when the layout mode flips: Swiper cannot swap effects in place. */}
        <Swiper
          key={compact ? 'cards' : 'creative'}
          {...shared}
          parallax={!reducedMotion}
          {...(compact
            ? {
                effect: 'cards' as const,
                cardsEffect: { perSlideOffset: 8, perSlideRotate: reducedMotion ? 0 : 2.5, rotate: !reducedMotion, slideShadows: false },
              }
            : {
                effect: 'creative' as const,
                creativeEffect: {
                  limitProgress: 2,
                  prev: { translate: ['-22%', 0, -320], rotate: [0, 8, 0], opacity: 0 },
                  next: { translate: ['22%', 0, -320], rotate: [0, -8, 0], opacity: 0 },
                },
              })}
          className="projects-swiper"
        >
          {projects.map((project) => (
            <SwiperSlide key={project.id} className="projects-slide">
              <ProjectCard project={project} compact={compact} onOpen={() => setOpen(project)} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <CaseStudyPanel project={open} onClose={close} />
    </section>
  );
}
