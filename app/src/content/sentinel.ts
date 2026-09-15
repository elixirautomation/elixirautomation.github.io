import type { SentinelFeature, SentinelProofPoint, SentinelStoryStep } from './types';

export const sentinelStorySteps: SentinelStoryStep[] = [
  {
    step: '01 · Ingest',
    title: 'Unify test evidence',
    description: 'Connect Playwright, Java/JUnit, and .NET executions to one queryable system.',
  },
  {
    step: '02 · Understand',
    title: 'Explain failures',
    description: 'Use evidence-first Bedrock analysis, clustering, and flakiness intelligence to expose patterns.',
  },
  {
    step: '03 · Act',
    title: 'Route the signal',
    description: 'Give teams dashboards, ownership context, and self-service alerts they can act on.',
  },
];

export const sentinelProofPoints: SentinelProofPoint[] = [
  { value: '596K+', label: 'test executions observed' },
  { value: '20K+', label: 'logical test identities' },
  { value: '~68%', label: 'faster AI analysis' },
];

export const sentinelFeatures: SentinelFeature[] = [
  { index: '01', description: 'Owned platform architecture, backend, web, CI/CD infrastructure, security, and production operations.' },
  { index: '02', description: 'Engineered durable logical identities and cross-stack ingestion for Playwright, Java/JUnit, and .NET pipelines.' },
  { index: '03', description: 'Built failure clustering, flakiness intelligence, evidence-first Bedrock analysis, and self-service alerting.' },
  { index: '04', description: 'Reduced analysis latency from approximately 48 seconds to 15 seconds while retaining actionable evidence.' },
];

export const sentinelTechnologies = ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Redis', 'Amazon Bedrock', 'Kubernetes'];
