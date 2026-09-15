import { useMediaQuery } from './useMediaQuery';

/** Shared accessibility signal: true when the user has requested reduced motion. */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
