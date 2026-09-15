import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

export interface RotatingText {
  text: string;
  /**
   * Increments on every change. Use it as a React `key` on the rendered element
   * so the node remounts and a CSS entrance animation replays -- the old
   * imperative version animated this with the Web Animations API, which the
   * component tree can express declaratively instead.
   */
  cycle: number;
}

/** Cycles through `words` on an interval; freezes on the first item under reduced motion. */
export function useRotatingText(words: string[], intervalMs: number): RotatingText {
  const reducedMotion = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reducedMotion || words.length < 2) return;
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % words.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [words, intervalMs, reducedMotion]);

  return { text: words[index] ?? '', cycle: index };
}
