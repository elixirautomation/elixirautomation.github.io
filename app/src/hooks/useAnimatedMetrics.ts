import { useEffect } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/** Animates `[data-count]` elements inside `.metric-row` from 0 to their target once the row is visible. */
export function useAnimatedMetrics() {
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const metricRow = document.querySelector('.metric-row');
    if (!metricRow || reducedMotion || !('IntersectionObserver' in window)) return;

    let animated = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || animated) return;
        animated = true;
        metricRow.querySelectorAll<HTMLElement>('[data-count]').forEach((element) => {
          const target = Number(element.dataset.count);
          const suffix = element.dataset.suffix ?? '';
          const start = performance.now();
          const duration = 900;
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            element.textContent = `${Math.round(target * eased)}${suffix}`;
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
        observer.disconnect();
      },
      { threshold: 0.6 },
    );

    observer.observe(metricRow);
    return () => observer.disconnect();
  }, [reducedMotion]);
}
