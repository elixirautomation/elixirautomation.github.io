import { useState, type ReactNode } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperInstance } from 'swiper';
import { A11y, EffectCards, EffectCreative, Keyboard, Pagination, Parallax } from 'swiper/modules';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-creative';
import 'swiper/css/pagination';
import './DeckCarousel.css';

export interface DeckSlideContext {
  index: number;
  /** True at phone widths, where the deck is a 3D card stack. */
  compact: boolean;
}

interface DeckCarouselProps<T> {
  items: T[];
  getKey: (item: T) => string;
  renderSlide: (item: T, context: DeckSlideContext) => ReactNode;
  /** Singular noun for accessible labels and the counter, e.g. "project". */
  noun: string;
  label: string;
  /**
   * Wide screens: `carousel` uses the creative depth slider; `static` renders
   * the slides as a plain list (for content that is short enough to show whole).
   */
  wide?: 'carousel' | 'static';
  /** Extra class on the outer shell, for per-use sizing. */
  className?: string;
}

/**
 * The one carousel used across the site, so every deck moves the same way:
 * - phones: Swiper `cards` 3D stack (compact, swipe-first)
 * - wider screens: Swiper `creative` depth slide with Parallax on
 *   `data-swiper-parallax*` layers inside each slide
 * Both rewind from last to first rather than `loop`, which clones slides and
 * fights the 3D transforms. Arrows call the Swiper instance directly, so
 * several decks can share a page without selector collisions.
 */
export function DeckCarousel<T>({ items, getKey, renderSlide, noun, label, wide = 'carousel', className = '' }: DeckCarouselProps<T>) {
  const compact = useMediaQuery('(max-width: 720px)');
  const reducedMotion = usePrefersReducedMotion();
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [active, setActive] = useState(0);

  if (!compact && wide === 'static') {
    return (
      <div className={`deck-static ${className}`} aria-label={label}>
        {items.map((item, index) => (
          <div key={getKey(item)}>{renderSlide(item, { index, compact })}</div>
        ))}
      </div>
    );
  }

  const pad = (value: number) => String(value).padStart(2, '0');

  return (
    <div className={`deck${compact ? ' is-compact' : ''} ${className}`}>
      <div className="deck-controls">
        <span className="deck-count" aria-live="polite">
          <b>{pad(active + 1)}</b> / {pad(items.length)}
        </span>
        <button type="button" className="deck-arrow" onClick={() => swiper?.slidePrev()} aria-label={`Previous ${noun}`}>
          ←
        </button>
        <button type="button" className="deck-arrow" onClick={() => swiper?.slideNext()} aria-label={`Next ${noun}`}>
          →
        </button>
      </div>

      <div className="deck-stage">
        {/* Remount when the mode flips: Swiper cannot swap effects in place. */}
        <Swiper
          key={compact ? 'cards' : 'creative'}
          modules={[A11y, Keyboard, Pagination, Parallax, compact ? EffectCards : EffectCreative]}
          onSwiper={setSwiper}
          onSlideChange={(instance) => setActive(instance.realIndex)}
          rewind
          grabCursor
          parallax={!reducedMotion}
          keyboard={{ enabled: true, onlyInViewport: true }}
          pagination={{ clickable: true }}
          speed={reducedMotion ? 0 : compact ? 520 : 760}
          a11y={{
            containerMessage: label,
            prevSlideMessage: `Previous ${noun}`,
            nextSlideMessage: `Next ${noun}`,
            paginationBulletMessage: `Go to ${noun} {{index}}`,
          }}
          {...(compact
            ? {
                effect: 'cards' as const,
                cardsEffect: { perSlideOffset: 8, perSlideRotate: reducedMotion ? 0 : 2.5, rotate: !reducedMotion, slideShadows: false },
              }
            : {
                effect: 'creative' as const,
                creativeEffect: {
                  limitProgress: 2,
                  prev: { translate: ['-22%', 0, -320], rotate: [0, 8, 0], opacity: 0 },
                  next: { translate: ['22%', 0, -320], rotate: [0, -8, 0], opacity: 0 },
                },
              })}
          className="deck-swiper"
          aria-label={label}
        >
          {items.map((item, index) => (
            <SwiperSlide key={getKey(item)} className="deck-slide">
              {renderSlide(item, { index, compact })}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
