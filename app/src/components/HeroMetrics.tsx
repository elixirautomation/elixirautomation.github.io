import { heroMetrics, type HeroMetric } from '../content/metrics';
import { useCountUp } from '../hooks/useCountUp';
import { useInView } from '../hooks/useInView';

function MetricValue({ metric, active }: { metric: HeroMetric; active: boolean }) {
  const value = useCountUp(metric.value, active);
  return (
    <strong>
      {value}
      {metric.suffix}
    </strong>
  );
}

/**
 * Career highlight figures that count up when the row scrolls into view.
 *
 * The counting is driven by React state via `useCountUp`; an earlier version
 * queried `[data-count]` attributes out of the DOM, which silently did nothing
 * once this markup moved into components without those attributes.
 */
export function HeroMetrics() {
  const { ref, inView } = useInView<HTMLDivElement>(0.6);

  return (
    <div className="metric-row" aria-label="Career highlights" ref={ref}>
      {heroMetrics.map((metric) => (
        <div className="metric" key={metric.label}>
          <MetricValue metric={metric} active={inView} />
          <span>{metric.label}</span>
        </div>
      ))}
    </div>
  );
}
