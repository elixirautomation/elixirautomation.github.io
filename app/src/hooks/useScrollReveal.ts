import { useEffect } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/** Adds `.is-visible` to `.reveal` elements as they scroll into view, staggering by DOM order. */
export function useScrollReveal() {
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    if (reducedMotion || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -45px' },
    );

    elements.forEach((element, index) => {
      element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [reducedMotion]);
}
