import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/** Cycles through `words` on an interval; freezes on the first item if the user prefers reduced motion. */
export function useRotatingText(words: string[], intervalMs: number): string {
  const reducedMotion = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reducedMotion || words.length < 2) return;
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % words.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [words, intervalMs, reducedMotion]);

  return words[index] ?? '';
}
