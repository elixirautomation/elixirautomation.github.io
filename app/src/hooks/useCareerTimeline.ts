import { useCallback, useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

const clamp = (value: number, min = 0, max = 1) => Math.min(Math.max(value, min), max);

/**
 * Owns the career timeline's scroll-linked line progress and enforces that
 * only one role's details stay open at a time. Returns everything the
 * `CareerTimeline` component needs to render without touching the DOM itself.
 */
export function useCareerTimeline(roleCount: number) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reducedMotion = usePrefersReducedMotion();

  const [lineProgress, setLineProgress] = useState(0);
  const [lineStart, setLineStart] = useState(38);
  const [lineEnd, setLineEnd] = useState(38);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [pastFlags, setPastFlags] = useState<boolean[]>(() => new Array(roleCount).fill(false));
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const registerItem = useCallback(
    (index: number) => (element: HTMLDivElement | null) => {
      itemRefs.current[index] = element;
    },
    [],
  );

  const renderScrollEffects = useCallback(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    const nodes = itemRefs.current;
    if (!nodes.length || nodes.some((node) => !node)) return;

    const timelineRect = timeline.getBoundingClientRect();
    const focusY = window.innerHeight * 0.58;
    const nodeCenters = nodes.map((node) => {
      const rect = node!.getBoundingClientRect();
      return rect.top + rect.height / 2;
    });

    const firstNode = nodeCenters[0];
    const lastNode = nodeCenters[nodeCenters.length - 1];
    const lineDistance = Math.max(lastNode - firstNode, 1);
    const progress = reducedMotion ? 1 : clamp((focusY - firstNode) / lineDistance);

    setLineProgress(progress);
    setLineStart(Math.max(firstNode - timelineRect.top, 0));
    setLineEnd(Math.max(timelineRect.bottom - lastNode, 0));

    let closestIndex = -1;
    let closestDistance = Infinity;
    const nextPastFlags = nodeCenters.map((center, index) => {
      const distance = Math.abs(center - focusY);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
      return center <= focusY;
    });

    setPastFlags(nextPastFlags);
    setFocusedIndex(closestDistance < window.innerHeight * 0.34 ? closestIndex : -1);
  }, [reducedMotion]);

  useEffect(() => {
    let ticking = false;
    const requestRender = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        renderScrollEffects();
      });
    };

    requestRender();
    window.addEventListener('scroll', requestRender, { passive: true });
    window.addEventListener('resize', requestRender, { passive: true });
    return () => {
      window.removeEventListener('scroll', requestRender);
      window.removeEventListener('resize', requestRender);
    };
  }, [renderScrollEffects]);

  const toggleRole = useCallback(
    (index: number, open: boolean) => {
      setOpenIndex(open ? index : null);
      requestAnimationFrame(renderScrollEffects);
    },
    [renderScrollEffects],
  );

  return {
    timelineRef,
    registerItem,
    lineProgress,
    lineStart,
    lineEnd,
    focusedIndex,
    pastFlags,
    openIndex,
    toggleRole,
  };
}
