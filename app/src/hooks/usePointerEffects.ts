import { useEffect } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/** Cursor glow following the pointer and subtle 3D tilt on `.tilt-card` elements, for fine-pointer devices only. */
export function usePointerEffects() {
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion || !window.matchMedia('(pointer: fine)').matches) return;

    const glow = document.querySelector<HTMLElement>('.cursor-glow');
    const handlePointerMove = (event: PointerEvent) => {
      if (!glow) return;
      glow.style.left = `${event.clientX}px`;
      glow.style.top = `${event.clientY}px`;
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    const tiltCards = Array.from(document.querySelectorAll<HTMLElement>('.tilt-card'));
    const handleTiltMove = (event: PointerEvent, card: HTMLElement) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${y * -4}deg) rotateY(${x * 5}deg) translateY(-3px)`;
    };
    const handleTiltLeave = (card: HTMLElement) => {
      card.style.transform = '';
    };

    const cleanups = tiltCards.map((card) => {
      const onMove = (event: PointerEvent) => handleTiltMove(event, card);
      const onLeave = () => handleTiltLeave(card);
      card.addEventListener('pointermove', onMove);
      card.addEventListener('pointerleave', onLeave);
      return () => {
        card.removeEventListener('pointermove', onMove);
        card.removeEventListener('pointerleave', onLeave);
      };
    });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [reducedMotion]);
}
