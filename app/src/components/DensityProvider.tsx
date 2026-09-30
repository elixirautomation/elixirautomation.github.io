import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { COMPACT_QUERY, DensityContext } from '../hooks/densityContext';
import { useMediaQuery } from '../hooks/useMediaQuery';

/**
 * One source of truth for "summary vs full" on small screens. The mode is
 * mirrored to `html[data-density]` so plain CSS can trim secondary detail
 * without every component re-implementing the breakpoint.
 */
export function DensityProvider({ children }: { children: ReactNode }) {
  const small = useMediaQuery(COMPACT_QUERY);
  const [expandAll, setExpandAll] = useState(false);
  const [printing, setPrinting] = useState(false);
  const [epoch, setEpoch] = useState(0);
  const compact = small && !expandAll && !printing;

  // The PDF résumé must never lose folded content.
  useEffect(() => {
    const before = () => setPrinting(true);
    const after = () => setPrinting(false);
    window.addEventListener('beforeprint', before);
    window.addEventListener('afterprint', after);
    return () => {
      window.removeEventListener('beforeprint', before);
      window.removeEventListener('afterprint', after);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (compact) root.dataset.density = 'compact';
    else delete root.dataset.density;
  }, [compact]);

  const toggleExpandAll = useCallback(() => {
    setExpandAll((value) => !value);
    setEpoch((value) => value + 1);
  }, []);

  const value = useMemo(() => ({ compact, expandAll, toggleExpandAll, epoch }), [compact, expandAll, toggleExpandAll, epoch]);
  return <DensityContext.Provider value={value}>{children}</DensityContext.Provider>;
}
