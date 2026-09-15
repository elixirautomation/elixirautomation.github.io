import { useEffect, useState } from 'react';

/** Tracks which of the given section hashes is currently most visible in the viewport. */
export function useActiveSection(hashes: string[]): string {
  const [activeHash, setActiveHash] = useState('');

  useEffect(() => {
    const sections = hashes
      .map((hash) => document.querySelector(hash))
      .filter((element): element is Element => Boolean(element));
    if (!sections.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveHash(`#${visible.target.id}`);
      },
      { rootMargin: '-25% 0px -60%', threshold: [0.05, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [hashes]);

  return activeHash;
}
