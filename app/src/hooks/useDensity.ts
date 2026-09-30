import { useCallback, useContext, useEffect, useState } from 'react';
import { DensityContext } from './densityContext';

export function useDensity() {
  return useContext(DensityContext);
}

/**
 * Local "show more" state for one item. Returns the attribute to spread on the
 * item's root (CSS hides `.fold-detail` inside a closed fold) and whether a
 * toggle button should render at all (only in compact mode).
 */
export function useFold() {
  const { compact, epoch } = useDensity();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [epoch]);
  const toggle = useCallback(() => setOpen((value) => !value), []);
  return {
    open,
    toggle,
    showToggle: compact,
    foldProps: compact ? { 'data-fold': open ? 'open' : 'closed' } : {},
  };
}
