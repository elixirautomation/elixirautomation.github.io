import { useCallback, useState } from 'react';
import { projects, type ProjectCaseStudy } from '../content/projects';
import { ArchitectureFlow } from './ArchitectureFlow';
import { CaseStudyPanel } from './CaseStudyPanel';
import { DeckCarousel } from './DeckCarousel';
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
  const [open, setOpen] = useState<ProjectCaseStudy | null>(null);
  const close = useCallback(() => setOpen(null), []);

  return (
    <section className="section section-shell projects-section" id="projects" aria-labelledby="projects-title">
      <div className="section-heading reveal">
        <p className="eyebrow">Selected work</p>
        <h2 id="projects-title">Systems I have designed, built, and run.</h2>
        <p>Each card is the summary. Open a case study for the problem, the architecture, and my role.</p>
      </div>
      <div className="reveal">
        <DeckCarousel
          items={projects}
          getKey={(project) => project.id}
          noun="project"
          label="Featured projects"
          className="projects-deck"
          renderSlide={(project, { compact }) => <ProjectCard project={project} compact={compact} onOpen={() => setOpen(project)} />}
        />
      </div>
      <CaseStudyPanel project={open} onClose={close} />
    </section>
  );
}
