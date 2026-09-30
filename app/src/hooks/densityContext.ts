import { createContext } from 'react';

/** Phones get the summary layout; everything else always shows full detail. */
export const COMPACT_QUERY = '(max-width: 720px)';

export interface DensityState {
  /** True when summaries are shown and detail waits behind a tap. */
  compact: boolean;
  /** Only meaningful on phones: the visitor asked to see everything. */
  expandAll: boolean;
  toggleExpandAll: () => void;
  /** Bumped whenever the global mode changes, so local folds can reset. */
  epoch: number;
}

export const DensityContext = createContext<DensityState>({ compact: false, expandAll: false, toggleExpandAll: () => {}, epoch: 0 });
