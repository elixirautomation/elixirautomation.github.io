import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { navLinks } from '../content/navigation';
import { useActiveSection } from '../hooks/useActiveSection';
import { useDensity } from '../hooks/useDensity';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { COMPACT_QUERY } from '../hooks/densityContext';

const hashes = navLinks.map((link) => link.href);

/**
 * Phone-only jump bar. It appears once the hero has scrolled away, highlights
 * the section in view, and carries the one global "summary / everything"
 * switch — the TL;DR control, inverted: summary is the default.
 */
export function SectionBar() {
  const small = useMediaQuery(COMPACT_QUERY);
  const { expandAll, toggleExpandAll } = useDensity();
  const active = useActiveSection(hashes);
  const [visible, setVisible] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = document.getElementById('home');
    if (!hero || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), { rootMargin: '-35% 0px 0px 0px' });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  // Keep the active pill in view when the row is wider than the screen.
  // scrollIntoView could also nudge the page vertically, so scroll the row only.
  useEffect(() => {
    const row = listRef.current;
    const pill = row?.querySelector<HTMLElement>('.is-active');
    if (!row || !pill) return;
    row.scrollTo({ left: pill.offsetLeft - (row.clientWidth - pill.offsetWidth) / 2, behavior: 'smooth' });
  }, [active, visible]);

  // Switching modes reflows everything above the fold; re-anchor on the
  // section the visitor was reading so they do not lose their place.
  const switchDensity = () => {
    const anchor = active ? document.querySelector(active) : null;
    toggleExpandAll();
    if (anchor) requestAnimationFrame(() => requestAnimationFrame(() => anchor.scrollIntoView({ block: 'start' })));
  };

  if (!small) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          className="section-bar"
          aria-label="Jump to section"
          initial={{ y: -12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -12, opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <div className="section-bar-links" ref={listRef}>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className={active === link.href ? 'is-active' : undefined} aria-current={active === link.href ? 'location' : undefined}>
                {active === link.href && <motion.span layoutId="section-bar-pill" className="section-bar-pill" aria-hidden="true" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
                <span>{link.label}</span>
              </a>
            ))}
          </div>
          <button type="button" className="section-bar-density" aria-pressed={expandAll} onClick={switchDensity}>
            {expandAll ? 'Summary' : 'Expand all'}
          </button>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
