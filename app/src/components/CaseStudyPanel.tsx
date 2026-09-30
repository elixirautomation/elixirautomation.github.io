import { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'motion/react';
import type { ProjectCaseStudy } from '../content/projects';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { ArchitectureFlow } from './ArchitectureFlow';
import { GitHubIcon } from './Icons';
import { SentinelDashboard } from './SentinelDashboard';
import './CaseStudyPanel.css';

interface CaseStudyPanelProps {
  project: ProjectCaseStudy | null;
  onClose: () => void;
}

const list: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } } };
const item: Variants = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 0.61, 0.36, 1] } } };

/**
 * Second level of the information hierarchy: the card shows the summary, this
 * panel reveals the full case study. Side sheet on desktop, bottom sheet on
 * mobile. Modal semantics: focus moves in, Esc closes, focus returns to the
 * opening control, page scroll is locked while open.
 */
export function CaseStudyPanel({ project, onClose }: CaseStudyPanelProps) {
  const reduce = useReducedMotion();
  const sheet = useMediaQuery('(max-width: 720px)');
  const offscreen = sheet ? { x: 0, y: '100%' } : { x: '100%', y: 0 };
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project) return;
    const opener = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => closeRef.current?.focus());

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key !== 'Tab' || !panelRef.current) return;
      // Keep Tab inside the panel.
      const focusable = panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      opener?.focus({ preventScroll: true });
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="case-overlay"
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.25 }}
          onClick={(event) => event.target === event.currentTarget && onClose()}
        >
          <motion.div
            ref={panelRef}
            className="case-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-title"
            initial={reduce ? { opacity: 0 } : offscreen}
            animate={reduce ? { opacity: 1 } : { x: 0, y: 0 }}
            exit={reduce ? { opacity: 0 } : offscreen}
            transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 320, damping: 34 }}
          >
            <header className="case-head">
              <div className="project-meta">
                <span>Project {project.index}</span>
                <span>{project.category}</span>
              </div>
              <button ref={closeRef} className="case-close" type="button" onClick={onClose} aria-label="Close case study">
                ✕
              </button>
            </header>

            <motion.div className="case-body" variants={list} initial={reduce ? 'show' : 'hidden'} animate="show">
              <motion.h3 id="case-title" variants={item}>
                {project.name}
              </motion.h3>
              <motion.p className="case-value" variants={item}>
                {project.valueProp}
              </motion.p>

              <motion.section variants={item} className="case-block">
                <h4>Problem</h4>
                <p>{project.problem}</p>
              </motion.section>

              <motion.section variants={item} className="case-block">
                <h4>Approach</h4>
                <ul>
                  {project.approach.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ul>
              </motion.section>

              <motion.section variants={item} className="case-block">
                <h4>Architecture</h4>
                <div className="case-arch">
                  <ArchitectureFlow steps={project.architecture} label={`${project.name} architecture`} />
                </div>
              </motion.section>

              {project.preview === 'sentinel-dashboard' && (
                <motion.section variants={item} className="case-block">
                  <h4>Product preview</h4>
                  <SentinelDashboard />
                </motion.section>
              )}

              <motion.section variants={item} className="case-block">
                <h4>Role</h4>
                <p>{project.role}</p>
              </motion.section>

              <motion.div variants={item} className="project-tech" aria-label="Technologies">
                {project.tech.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </motion.div>

              {project.links.length > 0 && (
                <motion.div variants={item} className="project-links">
                  {project.links.map((link) => (
                    <a key={link.href} className="project-link" href={link.href} target="_blank" rel="noreferrer">
                      <GitHubIcon />
                      {link.label} <span aria-hidden="true">↗</span>
                    </a>
                  ))}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
