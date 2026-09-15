import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/**
 * Eases a number from 0 up to `target` once `active` is true, driving the value
 * through React state rather than writing to `textContent`. Returns `target`
 * immediately when the user prefers reduced motion, so the figure is still
 * readable without animation.
 */
export function useCountUp(target: number, active: boolean, durationMs = 900): number {
  const reducedMotion = usePrefersReducedMotion();
  const [value, setValue] = useState(() => (reducedMotion ? target : 0));

  useEffect(() => {
    if (reducedMotion) {
      setValue(target);
      return;
    }
    if (!active) return;

    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, active, durationMs, reducedMotion]);

  return value;
}
