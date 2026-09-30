import { sentinelTechnologies } from './sentinel';

/** One step in an architecture flow. `parallel` renders its entries side by side. */
export type FlowStep = { label: string; detail?: string } | { parallel: { label: string; detail?: string }[] };

export interface ProjectLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface ProjectCaseStudy {
  id: string;
  index: string;
  category: string;
  status: string;
  name: string;
  valueProp: string;
  problem: string;
  approach: string[];
  role: string;
  architecture: FlowStep[];
  tech: string[];
  /** Only published, sourced figures. Empty = no metrics published, rendered as such. */
  impact: { value: string; label: string }[];
  links: ProjectLink[];
}

export const projects: ProjectCaseStudy[] = [
  {
    id: 'sentinel',
    index: '01',
    category: 'AI test observability',
    status: 'Production · internal at Entain',
    name: 'Sentinel',
    valueProp: 'Turns fragmented test output into explainable, routable engineering signals.',
    problem:
      'Test runs generate plenty of data. Teams still lose time understanding what failed, whether it is flaky, and who should act.',
    approach: [
      'Durable logical identities for every test, joined across Playwright, Java/JUnit, and .NET pipelines',
      'Failure clustering and flakiness intelligence over the full execution history',
      'Evidence-first Amazon Bedrock analysis that cites the runs it reasons over',
      'Self-service alerting so owning teams receive the signal directly',
    ],
    role: 'Designed and built concept → production: architecture, backend, web, CI/CD, security, and operations.',
    architecture: [
      { label: 'CI pipelines', detail: 'Playwright · JUnit · .NET' },
      { label: 'Ingest API', detail: 'cross-stack normalisation' },
      { label: 'Identity & evidence store', detail: 'PostgreSQL' },
      { parallel: [{ label: 'Clustering' }, { label: 'Flakiness' }, { label: 'Bedrock analysis' }] },
      { label: 'Dashboards · alerts', detail: 'owner-routed signal' },
    ],
    tech: sentinelTechnologies,
    impact: [
      { value: '596K+', label: 'test executions observed' },
      { value: '20K+', label: 'logical test identities' },
      { value: '48s → 15s', label: 'AI analysis latency (~68% faster)' },
    ],
    links: [{ label: 'Open case study', href: '#sentinel' }],
  },
  {
    id: 'brazil-identity',
    index: '02',
    category: 'Identity & KYC delivery',
    status: 'Production · Mission Pod',
    name: 'Brazil digital identity',
    valueProp: 'Identity verification for a new market, delivered across product, engineering, and quality.',
    problem:
      'Launching in Brazil required verifying player identity with a local provider at a scale supporting a projected 3.5 million account transition.',
    approach: [
      'Co-delivered the integration with provider Serasa through the BIA aggregation layer',
      'Validated mocked and non-mocked vendor endpoints with JMeter and JMX scripts on internal Kubernetes services',
      'Worked across delivery, engineering, quality, and operational readiness rather than a single testing lane',
    ],
    role: 'Maker in the organisation’s first AI-native Mission Pod.',
    architecture: [
      { label: 'Registration flow' },
      { label: 'Identity service', detail: 'Kubernetes' },
      { label: 'BIA aggregation layer' },
      { label: 'Serasa verification', detail: 'provider' },
      { label: 'Verification decision' },
    ],
    tech: ['Java', 'Kubernetes', 'JMeter', 'Kiro / MCP'],
    impact: [{ value: '3.5M', label: 'projected account transition supported' }],
    links: [{ label: 'See the role', href: '#experience' }],
  },
  {
    id: 'migration-pipeline',
    index: '03',
    category: 'Resilient data migration',
    status: 'Delivered · Mission Pod',
    name: 'Vendor migration pipeline',
    valueProp: 'Large-scale account migration that backs off before the vendor falls over.',
    problem: 'Moving a large account base to a new vendor without overwhelming the vendor API or losing progress.',
    approach: [
      'Threaded workers draining a shared work queue',
      'TPS limiting to hold throughput inside the vendor’s agreed envelope',
      'Circuit breakers plus a global backoff that pauses every worker together',
    ],
    role: 'Built the Python pipeline.',
    architecture: [
      { label: 'Account source' },
      { label: 'Work queue' },
      { label: 'Threaded workers' },
      { parallel: [{ label: 'TPS limiter' }, { label: 'Circuit breaker' }, { label: 'Global backoff' }] },
      { label: 'Vendor API' },
    ],
    tech: ['Python', 'Concurrency', 'Resilience patterns'],
    impact: [],
    links: [{ label: 'See the role', href: '#experience' }],
  },
  {
    id: 'decision-lab',
    index: '04',
    category: 'Agentic decision systems',
    status: 'Open source · experimental',
    name: 'System One Decision Lab',
    valueProp: 'Compare System One decision models on the same evidence, behind one contract.',
    problem:
      'Decision engines do not share a confidence scale, so swapping one for another usually means a second integration and no honest comparison.',
    approach: [
      'Engines sit behind one POST /v1/systemone contract, so the engine answering is configuration',
      'Each engine declares its own confidence gate: auto_file, flag_for_review, or escalate_to_human',
      'Every decision is stored with the engine and scale that produced it, so history can be re-asked and re-scored',
    ],
    role: 'Author and maintainer.',
    architecture: [
      { label: 'Evidence', detail: 'failed test · MR · log line' },
      { label: 'Use-case package' },
      { label: 'System One contract' },
      { parallel: [{ label: 'Jev', detail: 'hosted' }, { label: 'Laya', detail: 'self-hosted' }] },
      { label: 'Confidence gate' },
      { label: 'Decisions table', detail: 'PostgreSQL' },
    ],
    tech: ['TypeScript', 'PostgreSQL', 'Drizzle', 'Playwright'],
    impact: [],
    links: [
      { label: 'GitHub', href: 'https://github.com/elixirautomation/system-one-decision-lab', external: true },
    ],
  },
];
