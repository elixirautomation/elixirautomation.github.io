import { useEffect, useState } from 'react';

/**
 * Tracks whether a media query currently matches, updating on viewport changes.
 * Shared by any component that needs to switch behavior at a breakpoint
 * (e.g. grid layout on desktop vs. carousel on mobile).
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false,
  );

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);
    setMatches(mediaQueryList.matches);
    mediaQueryList.addEventListener('change', listener);
    return () => mediaQueryList.removeEventListener('change', listener);
  }, [query]);

  return matches;
}
