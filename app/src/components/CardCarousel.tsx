import type { ReactNode } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Keyboard, A11y, Pagination } from 'swiper/modules';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';
import './CardCarousel.css';

interface CardCarouselProps<T> {
  items: T[];
  getKey: (item: T, index: number) => string;
  renderCard: (item: T, index: number) => ReactNode;
  ariaLabel: string;
  /** Class applied to the desktop grid wrapper; carousel mode ignores it. */
  gridClassName: string;
}

/**
 * Renders a set of cards as a static grid on desktop and as a swipeable,
 * always-legible 3D carousel on mobile. Content stays fully visible in both
 * modes -- no tap-to-reveal is needed on the carousel, since each slide shows
 * its full card face while swiping only changes which card is on top.
 *
 * `rewind` is used rather than `loop` for the wrap-around: Swiper's `loop`
 * clones slides, which interacts badly with the 3D `cards` transforms, while
 * `rewind` returns to the first slide from the last (and vice versa) without
 * duplicating any DOM.
 *
 * This is the single reusable surface for any "grid of cards that should
 * become a carousel on small screens" need across the site: adding a new
 * card set means passing new `items` + a `renderCard`, not writing new
 * carousel wiring.
 */
export function CardCarousel<T>({ items, getKey, renderCard, ariaLabel, gridClassName }: CardCarouselProps<T>) {
  const isCompact = useMediaQuery('(max-width: 720px)');
  const reducedMotion = usePrefersReducedMotion();

  if (!isCompact) {
    return (
      <div className={gridClassName} aria-label={ariaLabel}>
        {items.map((item, index) => renderCard(item, index))}
      </div>
    );
  }

  return (
    <div className="card-carousel-shell">
      <Swiper
        modules={[EffectCards, Keyboard, A11y, Pagination]}
        effect="cards"
        grabCursor
        rewind
        keyboard={{ enabled: true }}
        speed={reducedMotion ? 0 : 480}
        cardsEffect={{
          perSlideOffset: reducedMotion ? 6 : 9,
          perSlideRotate: reducedMotion ? 0 : 3.5,
          rotate: !reducedMotion,
          slideShadows: false,
        }}
        pagination={{ clickable: true }}
        a11y={{
          containerMessage: ariaLabel,
          prevSlideMessage: 'Previous card',
          nextSlideMessage: 'Next card',
          paginationBulletMessage: 'Go to card {{index}}',
        }}
        className="card-carousel"
        aria-label={ariaLabel}
      >
        {items.map((item, index) => (
          <SwiperSlide key={getKey(item, index)} className="card-carousel-slide">
            {renderCard(item, index)}
          </SwiperSlide>
        ))}
      </Swiper>
      <p className="card-carousel-hint">
        <span aria-hidden="true">↔</span> Swipe to explore all {items.length}
      </p>
    </div>
  );
}
