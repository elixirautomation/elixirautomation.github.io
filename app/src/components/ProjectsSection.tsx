import { lazy, Suspense, useCallback, useState } from 'react';
import { motion } from 'motion/react';
import { projects, type ProjectCaseStudy } from '../content/projects';
import { ArchitectureFlow } from './ArchitectureFlow';
import { ArrowRightIcon } from './Icons';
import { Reveal } from './Reveal';
import './ProjectsSection.css';

// Nobody sees the case study until they ask for it, so keep it (and the
// Sentinel dashboard preview inside it) out of the initial bundle.
const CaseStudyPanel = lazy(() => import('./CaseStudyPanel').then((module) => ({ default: module.CaseStudyPanel })));

/**
 * Level 1 of the hierarchy: what it is, why it matters, the proof. The
 * featured project gets a wide tile with its architecture; the rest share a
 * row, so every project is visible without paging.
 */
function ProjectCard({ project, featured, onOpen }: { project: ProjectCaseStudy; featured: boolean; onOpen: () => void }) {
  return (
    <motion.article
      className={`project-card${featured ? ' is-featured' : ''}`}
      aria-labelledby={`project-${project.id}-title`}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
    >
      <div className="project-body">
        <div className="project-meta">
          <span>Project {project.index}</span>
          <span>{project.category}</span>
        </div>
        <span className="project-status">
          <i aria-hidden="true"></i>
          {project.status}
        </span>
        <h3 id={`project-${project.id}-title`}>{project.name}</h3>
        <p className="project-value">{project.valueProp}</p>

        {!featured && (
          <ul className="project-approach" aria-label="Approach">
            {project.approach.slice(0, 2).map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        )}

        {project.impact.length > 0 && (
          <div className={featured ? 'project-impact' : 'project-impact is-chip'} aria-label="Impact">
            {project.impact.map((entry) => (
              <div key={entry.label}>
                <strong>{entry.value}</strong>
                <span>{entry.label}</span>
              </div>
            ))}
          </div>
        )}

        <div className="project-tech" aria-label="Technologies">
          {project.tech.slice(0, featured ? undefined : 4).map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
          {!featured && project.tech.length > 4 && <span>+{project.tech.length - 4}</span>}
        </div>

        <button className="project-open" type="button" onClick={onOpen} aria-haspopup="dialog">
          Open case study <ArrowRightIcon />
        </button>
      </div>

      {featured && (
        <div className="project-visual">
          <div className="project-visual-bar">
            <span>architecture</span>
            <span>{project.id}.flow</span>
          </div>
          <ArchitectureFlow steps={project.architecture} label={`${project.name} architecture`} />
        </div>
      )}
    </motion.article>
  );
}

export function ProjectsSection() {
  const [open, setOpen] = useState<ProjectCaseStudy | null>(null);
  const [panelLoaded, setPanelLoaded] = useState(false);
  const close = useCallback(() => setOpen(null), []);
  const openProject = (project: ProjectCaseStudy) => {
    setPanelLoaded(true);
    setOpen(project);
  };

  return (
    <section className="section section-shell projects-section" id="projects" aria-labelledby="projects-title">
      <Reveal className="section-heading">
        <p className="eyebrow">Selected work</p>
        <h2 id="projects-title">Systems I have designed, built, and run.</h2>
        <p>Each tile is the summary. Open a case study for the problem, the architecture, and my role.</p>
      </Reveal>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <Reveal key={project.id} className={index === 0 ? 'projects-cell is-featured' : 'projects-cell'} delay={index === 0 ? 0 : (index - 1) * 0.07}>
            <ProjectCard project={project} featured={index === 0} onOpen={() => openProject(project)} />
          </Reveal>
        ))}
      </div>
      {panelLoaded && (
        <Suspense fallback={null}>
          <CaseStudyPanel project={open} onClose={close} />
        </Suspense>
      )}
    </section>
  );
}
