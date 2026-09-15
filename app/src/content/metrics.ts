export interface HeroMetric {
  /** Numeric target the counter animates up to. */
  value: number;
  /** Rendered immediately after the number (e.g. "+", "K+"). */
  suffix: string;
  label: string;
}

export const heroMetrics: HeroMetric[] = [
  { value: 10, suffix: '+', label: 'years engineering' },
  { value: 3, suffix: '', label: 'years building agents' },
  { value: 596, suffix: 'K+', label: 'test executions' },
  { value: 20, suffix: 'K+', label: 'test identities' },
];
