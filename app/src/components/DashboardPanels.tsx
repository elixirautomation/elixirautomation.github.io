import type { ReactNode } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Keyboard, A11y } from 'swiper/modules';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

import 'swiper/css';
import 'swiper/css/pagination';
import './DashboardPanels.css';

export interface DashboardPanel {
  id: string;
  label: string;
  content: ReactNode;
}

/**
 * The Sentinel dashboard panels: stacked on desktop (unchanged), and a swipeable
 * deck on mobile.
 *
 * This replaces simply hiding the execution-health chart at small widths -- the
 * chart is arguably the most illustrative panel, so swiping between panels keeps
 * all of it reachable without making the section tall. A plain slide effect is
 * used rather than the 3D `cards` effect from `CardCarousel`, because these are
 * data panels being compared rather than a stack being browsed.
 */
export function DashboardPanels({ panels }: { panels: DashboardPanel[] }) {
  const isCompact = useMediaQuery('(max-width: 720px)');
  const reducedMotion = usePrefersReducedMotion();

  if (!isCompact) {
    return (
      <>
        {panels.map((panel) => (
          <div key={panel.id}>{panel.content}</div>
        ))}
      </>
    );
  }

  return (
    <Swiper
      modules={[Pagination, Keyboard, A11y]}
      slidesPerView={1}
      spaceBetween={12}
      rewind
      autoHeight
      keyboard={{ enabled: true }}
      speed={reducedMotion ? 0 : 380}
      pagination={{ clickable: true }}
      a11y={{
        containerMessage: 'Sentinel dashboard panels',
        prevSlideMessage: 'Previous panel',
        nextSlideMessage: 'Next panel',
        paginationBulletMessage: 'Go to panel {{index}}',
      }}
      className="dash-carousel"
    >
      {panels.map((panel) => (
        <SwiperSlide key={panel.id} className="dash-carousel-slide">
          <p className="dash-carousel-label">{panel.label}</p>
          {panel.content}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
