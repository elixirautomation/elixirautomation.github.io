import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

export interface RotatingText {
  text: string;
  /**
   * Increments on every change. Use it as a React `key` on the rendered element
   * so the node remounts and a CSS entrance animation replays.
   */
  cycle: number;
  /** True once a play-once sequence has reached its final item. */
  done: boolean;
}

/**
 * Steps through `words` on an interval. With `once`, it stops on the last
 * word, so auto-updating content ends on its own (WCAG 2.2.2) instead of
 * looping forever. Under reduced motion it shows the final word immediately.
 */
export function useRotatingText(words: string[], intervalMs: number, { once = false } = {}): RotatingText {
  const reducedMotion = usePrefersReducedMotion();
  const last = words.length - 1;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length < 2) return;
    if (reducedMotion) {
      setIndex(once ? last : 0);
      return;
    }
    const timer = setInterval(() => {
      setIndex((current) => {
        if (once && current + 1 >= last) clearInterval(timer);
        return once ? Math.min(current + 1, last) : (current + 1) % words.length;
      });
    }, intervalMs);
    return () => clearInterval(timer);
  }, [words, intervalMs, reducedMotion, once, last]);

  return { text: words[index] ?? '', cycle: index, done: once && index === last };
}
