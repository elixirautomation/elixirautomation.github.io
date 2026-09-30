import { useEffect, useRef, useState } from 'react';
import {
  LayoutGroup,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  type Variants,
} from 'motion/react';
import { careerRoles } from '../content/careerRoles';
import type { CareerRole, EmbeddedProject, RoleImpact } from '../content/types';
import { useCountUp } from '../hooks/useCountUp';
import { endIndex, formatRange, formatTenure, tenureMonths, toMonthIndex } from '../utils/tenure';
import { useFold } from '../hooks/useDensity';
import { FoldToggle } from './FoldToggle';
import { Reveal } from './Reveal';
import './ExperienceSection.css';

const EASE = [0.22, 0.61, 0.36, 1] as const;

const rise: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};
const stack: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } };

// Roles are authored newest-first; the ribbon reads left-to-right in time.
const chronological = [...careerRoles].reverse();
const firstMonth = toMonthIndex(chronological[0].start);
const lastMonth = endIndex(careerRoles[0].end);
const totalMonths = Math.max(lastMonth - firstMonth, 1);
const totalYears = Math.floor(totalMonths / 12);

type Hover = { id: string | null; set: (id: string | null) => void };

/* ------------------------------------------------------------------------ */
/* Level 1 — the whole decade at a glance                                    */
/* ------------------------------------------------------------------------ */

/**
 * Proportional tenure ribbon. Segment width encodes duration (a magnitude),
 * so it deliberately looks different from the rail below, whose dots only
 * encode order. Each segment is a jump link to its role.
 */
function CareerRibbon({ hover }: { hover: Hover }) {
  const reduce = useReducedMotion();
  // Ticks sit on January boundaries inside the range, every other year, so
  // labels never fall off the track or collide at the edges.
  const firstYear = Math.ceil(firstMonth / 12);
  const lastYear = Math.floor(lastMonth / 12);
  const ticks = Array.from({ length: lastYear - firstYear + 1 }, (_, i) => firstYear + i).filter(
    (year) => {
      const at = (year * 12 - firstMonth) / totalMonths;
      return (year - firstYear) % 2 === 1 && at > 0.04 && at < 0.96;
    },
  );

  return (
    <div className="career-ribbon" aria-label="Career overview by tenure">
      <motion.ol
        className="ribbon-track"
        initial={reduce ? false : 'hidden'}
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
      >
        {chronological.map((role) => {
          const months = tenureMonths(role.start, role.end);
          return (
            <motion.li
              key={role.id}
              style={{ flexGrow: months }}
              className={[role.current ? 'is-current' : '', hover.id === role.id ? 'is-linked' : ''].filter(Boolean).join(' ')}
              variants={{
                hidden: { scaleX: 0, opacity: 0 },
                show: { scaleX: 1, opacity: 1, transition: { duration: 0.55, ease: EASE } },
              }}
            >
              <a
                href={`#role-${role.id}`}
                onMouseEnter={() => hover.set(role.id)}
                onMouseLeave={() => hover.set(null)}
                onFocus={() => hover.set(role.id)}
                onBlur={() => hover.set(null)}
                aria-label={`${role.company}, ${role.title}, ${formatRange(role.start, role.end)}`}
              >
                <span className="ribbon-bar" aria-hidden="true" />
                <span className="ribbon-label" aria-hidden="true">
                  {role.company.split(' · ')[0]}
                </span>
              </a>
            </motion.li>
          );
        })}
      </motion.ol>
      <div className="ribbon-axis" aria-hidden="true">
        {ticks.map((year) => (
          <span key={year} style={{ left: `${((year * 12 - firstMonth) / totalMonths) * 100}%` }}>
            {year}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/* Level 2 — the current role, always expanded                               */
/* ------------------------------------------------------------------------ */

/**
 * The delivery loop plays once when it scrolls into view (well under the
 * 5 s WCAG 2.2.2 threshold) and then rests with every step lit. A shared
 * `layoutId` indicator glides between steps.
 */
function DeliveryLoop({ steps }: { steps: string[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const reduce = useReducedMotion();
  const [active, setActive] = useState(reduce ? steps.length : -1);

  useEffect(() => {
    if (reduce) {
      setActive(steps.length);
      return;
    }
    if (!inView) return;
    let step = 0;
    setActive(0);
    const timer = window.setInterval(() => {
      step += 1;
      setActive(step);
      if (step >= steps.length) window.clearInterval(timer);
    }, 850);
    return () => window.clearInterval(timer);
  }, [inView, reduce, steps.length]);

  const settled = active >= steps.length;

  return (
    <LayoutGroup id="delivery-loop">
      <ol ref={ref} className={`delivery-loop${settled ? ' is-settled' : ''}`} aria-label="Delivery feedback loop">
        {steps.map((step, index) => (
          <li key={step} className={index <= active ? 'is-lit' : ''}>
            {index === active && !settled && (
              <motion.span layoutId="loop-indicator" className="loop-indicator" aria-hidden="true" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
            )}
            <span className="loop-index">{String(index + 1).padStart(2, '0')}</span>
            {step}
          </li>
        ))}
        <li className="loop-return" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M20 12a8 8 0 1 1-2.34-5.66M20 4v4h-4" />
          </svg>
        </li>
      </ol>
    </LayoutGroup>
  );
}

function EmbeddedProjectView({ project }: { project: EmbeddedProject }) {
  return (
    <motion.div className="tenure-feature" variants={stack}>
      <motion.div className="tenure-title" variants={rise}>
        <small>{project.eyebrow}</small>
        <h4>{project.title}</h4>
        <p className="fold-detail">{project.description}</p>
      </motion.div>
      <div className="tenure-highlights">
        {project.highlights.map((highlight) => (
          <motion.article key={highlight.title} variants={rise} whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
            {highlight.metric && <b className="highlight-metric">{highlight.metric}</b>}
            <strong>{highlight.title}</strong>
            <span className="fold-detail">{highlight.description}</span>
          </motion.article>
        ))}
      </div>
      <motion.div variants={rise} className="fold-detail">
        <DeliveryLoop steps={project.deliveryLoop} />
      </motion.div>
    </motion.div>
  );
}

function CurrentRole({ role, hover }: { role: CareerRole; hover: Hover }) {
  const reduce = useReducedMotion();
  const fold = useFold();
  return (
    <motion.article
      {...fold.foldProps}
      id={`role-${role.id}`}
      className={`current-role${hover.id === role.id ? ' is-linked' : ''}`}
      aria-labelledby={`role-title-${role.id}`}
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={stack}
      onMouseEnter={() => hover.set(role.id)}
      onMouseLeave={() => hover.set(null)}
    >
      <motion.header className="current-head" variants={rise}>
        <div className="current-status">
          <span className="pulse" aria-hidden="true" />
          Current role · {formatTenure(tenureMonths(role.start, role.end))}
        </div>
        <span className="role-company">{role.company}</span>
        <h3 id={`role-title-${role.id}`}>{role.title}</h3>
        <p className="role-meta">
          {formatRange(role.start, role.end)} <i aria-hidden="true">·</i> {role.location}
        </p>
        <p className="role-summary">{role.summary}</p>
        {role.tags && (
          <ul className="tag-row fold-detail" aria-label="Focus areas">
            {role.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        )}
      </motion.header>
      {role.embeddedProject && <EmbeddedProjectView project={role.embeddedProject} />}
      {fold.showToggle && <FoldToggle open={fold.open} onToggle={fold.toggle} label="Sentinel details" className="current-fold" />}
    </motion.article>
  );
}

/* ------------------------------------------------------------------------ */
/* Level 3 — earlier roles on a scroll-linked rail                           */
/* ------------------------------------------------------------------------ */

function ImpactStat({ impact }: { impact: RoleImpact }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.9 });
  const match = impact.value.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
  const target = match ? Number(match[2]) : 0;
  const counted = useCountUp(target, inView, 1100);

  return (
    <div ref={ref} className="impact-stat">
      <strong aria-hidden="true">{match ? `${match[1]}${counted}${match[3]}` : impact.value}</strong>
      <span className="sr-only">{impact.value}</span>
      <small>{impact.label}</small>
    </div>
  );
}

function PastRole({ role, hover }: { role: CareerRole; hover: Hover }) {
  const reduce = useReducedMotion();
  const fold = useFold();
  return (
    <motion.li
      {...fold.foldProps}
      id={`role-${role.id}`}
      className={`rail-item${hover.id === role.id ? ' is-linked' : ''}`}
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, amount: 0.5, margin: '0px 0px -8% 0px' }}
      variants={stack}
      onMouseEnter={() => hover.set(role.id)}
      onMouseLeave={() => hover.set(null)}
    >
      <motion.div className="rail-when" variants={rise}>
        <time dateTime={role.start}>{formatRange(role.start, role.end)}</time>
        <span>{formatTenure(tenureMonths(role.start, role.end))}</span>
      </motion.div>
      <motion.span
        className="rail-node"
        aria-hidden="true"
        variants={{
          hidden: { scale: 0.4, opacity: 0.3 },
          show: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 420, damping: 22 } },
        }}
      />
      <motion.article className="rail-card" variants={rise} aria-labelledby={`role-title-${role.id}`}>
        <div className="rail-copy">
          <span className="role-company">{role.company}</span>
          <h3 id={`role-title-${role.id}`}>{role.title}</h3>
          <p className="role-meta fold-detail">{role.location}</p>
          <p className="role-summary fold-detail">{role.summary}</p>
          {fold.showToggle && <FoldToggle open={fold.open} onToggle={fold.toggle} label="role details" />}
        </div>
        {role.impact && <ImpactStat impact={role.impact} />}
      </motion.article>
    </motion.li>
  );
}

function CareerRail({ roles, hover }: { roles: CareerRole[]; hover: Hover }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  // Scroll progress is a MotionValue, so the rail fill updates on the
  // compositor without re-rendering React on every scroll frame.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 55%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  return (
    <ol ref={ref} className="career-rail" aria-label="Earlier roles, most recent first">
      <span className="rail-line" aria-hidden="true">
        <motion.span className="rail-fill" style={{ scaleY: reduce ? 1 : fill }} />
      </span>
      {roles.map((role) => (
        <PastRole key={role.id} role={role} hover={hover} />
      ))}
    </ol>
  );
}

export function ExperienceSection() {
  const [hoverId, setHoverId] = useState<string | null>(null);
  const hover: Hover = { id: hoverId, set: setHoverId };
  const [current, ...earlier] = careerRoles;

  return (
    <section className="section section-shell career-section" id="experience" aria-labelledby="experience-title">
      <Reveal className="section-heading">
        <p className="eyebrow">Career path</p>
        <h2 id="experience-title">From automation foundations to platform ownership.</h2>
        <p>
          {totalYears}+ years across {careerRoles.length} teams — from UI regression suites to owning an AI-native test
          observability platform.
        </p>
      </Reveal>

      <CareerRibbon hover={hover} />
      <CurrentRole role={current} hover={hover} />
      <CareerRail roles={earlier} hover={hover} />
    </section>
  );
}
