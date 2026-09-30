import { motion, useReducedMotion } from 'motion/react';
import { careerRoles } from '../content/careerRoles';
import { useCareerTimeline } from '../hooks/useCareerTimeline';
import type { CareerRole } from '../content/types';

function EmbeddedProjectView({ project }: { project: NonNullable<CareerRole['embeddedProject']> }) {
  return (
    <div className="tenure-feature">
      <div className="tenure-title">
        <small>{project.eyebrow}</small>
        <h4>{project.title}</h4>
      </div>
      <p>{project.description}</p>
      <div className="tenure-highlights">
        {project.highlights.map((highlight) => (
          <div key={highlight.title}>
            <strong>{highlight.title}</strong>
            <span>{highlight.description}</span>
          </div>
        ))}
      </div>
      <div className="delivery-loop" aria-label="Delivery feedback loop">
        {project.deliveryLoop.map((step, index) => (
          <span key={step}>
            {index > 0 && <i>→</i>}
            {step}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ExperienceSection() {
  const { timelineRef, registerItem, lineProgress, lineStart, lineEnd, focusedIndex, pastFlags, openIndex, toggleRole } =
    useCareerTimeline(careerRoles.length);
  const reduce = useReducedMotion();

  return (
    <section className="section section-shell" id="experience" aria-labelledby="experience-title">
      <div className="section-heading reveal">
        <p className="eyebrow">Career path</p>
        <h2 id="experience-title">From automation foundations to platform ownership.</h2>
        <p>Select a role to explore the work and outcomes from that tenure. Only one stays open, keeping the journey concise on every screen.</p>
      </div>
      <div
        className="career-timeline"
        ref={timelineRef}
        aria-label="Career timeline from 2015 to the present"
        style={
          {
            '--timeline-progress': lineProgress.toFixed(4),
            '--timeline-line-start': `${lineStart.toFixed(1)}px`,
            '--timeline-line-end': `${lineEnd.toFixed(1)}px`,
          } as React.CSSProperties
        }
      >
        {careerRoles.map((role, index) => {
          const isOpen = openIndex === index;
          return (
            <article
              key={role.id}
              className={[
                'career-item',
                role.current ? 'current' : '',
                pastFlags[index] ? 'is-past' : '',
                focusedIndex === index ? 'is-focused' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <div className="career-date">{role.dateRange}</div>
              <div className="career-node" ref={registerItem(index)} aria-hidden="true"></div>
              <div className={`career-card${isOpen ? ' is-open' : ''}`}>
                <button
                  type="button"
                  className="career-summary"
                  aria-expanded={isOpen}
                  aria-controls={`role-panel-${role.id}`}
                  onClick={() => toggleRole(index, !isOpen)}
                >
                  <div className="career-head">
                    <div>
                      <span>{role.company}</span>
                      <h3>{role.title}</h3>
                    </div>
                    <b>{role.location}</b>
                  </div>
                  <span className="career-action" aria-hidden="true">
                    <span className="view-label">View tenure</span>
                    <span className="close-label">Close</span>
                    <i>+</i>
                  </span>
                </button>
                <motion.div
                  id={`role-panel-${role.id}`}
                  className="career-panel-wrap"
                  initial={false}
                  animate={isOpen ? 'open' : 'closed'}
                  variants={{
                    open: { height: 'auto', opacity: 1 },
                    closed: { height: 0, opacity: 0 },
                  }}
                  transition={reduce ? { duration: 0 } : { height: { type: 'spring', stiffness: 260, damping: 32 }, opacity: { duration: 0.25 } }}
                  inert={!isOpen}
                >
                <motion.div
                  className="career-panel"
                  animate={isOpen ? { y: 0 } : { y: -8 }}
                  transition={reduce ? { duration: 0 } : { duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
                >
                  <p>{role.summary}</p>
                  {role.embeddedProject && <EmbeddedProjectView project={role.embeddedProject} />}
                  {role.tags && (
                    <div className="tag-row">
                      {role.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  )}
                </motion.div>
                </motion.div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
