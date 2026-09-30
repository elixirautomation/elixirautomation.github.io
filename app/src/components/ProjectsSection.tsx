import { projects, type ProjectCaseStudy } from '../content/projects';
import { ArchitectureFlow } from './ArchitectureFlow';
import { GitHubIcon } from './Icons';
import './ProjectsSection.css';

function ProjectCard({ project }: { project: ProjectCaseStudy }) {
  return (
    <article className="project-card reveal" aria-labelledby={`project-${project.id}-title`}>
      <div className="project-body">
        <div className="project-meta">
          <span>Project {project.index}</span>
          <span>{project.category}</span>
          <span className="project-status">
            <i aria-hidden="true"></i>
            {project.status}
          </span>
        </div>
        <h3 id={`project-${project.id}-title`}>{project.name}</h3>
        <p className="project-value">{project.valueProp}</p>

        <dl className="project-facts">
          <div>
            <dt>Problem</dt>
            <dd>{project.problem}</dd>
          </div>
          <div>
            <dt>Approach</dt>
            <dd>
              <ul>
                {project.approach.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </dd>
          </div>
          <div>
            <dt>Role</dt>
            <dd>{project.role}</dd>
          </div>
        </dl>

        {project.impact.length > 0 ? (
          <div className="project-impact" aria-label="Impact">
            {project.impact.map((item) => (
              <div key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="project-no-metrics">Outcome metrics not published.</p>
        )}

        <div className="project-tech" aria-label="Technologies">
          {project.tech.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>

        <div className="project-links">
          {project.links.map((link) => (
            <a
              key={link.href}
              className="project-link"
              href={link.href}
              {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
            >
              {link.external && <GitHubIcon />}
              {link.label} <span aria-hidden="true">{link.external ? '↗' : '→'}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="project-visual">
        <div className="project-visual-bar">
          <span>architecture</span>
          <span>{project.id}.flow</span>
        </div>
        <ArchitectureFlow steps={project.architecture} label={`${project.name} architecture`} />
      </div>
    </article>
  );
}

export function ProjectsSection() {
  return (
    <section className="section section-shell projects-section" id="projects" aria-labelledby="projects-title">
      <div className="section-heading reveal">
        <p className="eyebrow">Selected work</p>
        <h2 id="projects-title">Systems I have designed, built, and run.</h2>
        <p>Each case study follows the same path: the problem, the architecture, the AI or agent approach, and what it changed.</p>
      </div>
      <div className="project-list">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
