import type { CapabilityCard } from './types';

export const capabilityCards: CapabilityCard[] = [
  {
    index: '01',
    icon: '⌁',
    title: 'Agent-assisted delivery',
    description:
      'AI agents, reusable skills, Kiro workflows, Model Context Protocol, RAG, and AgentCore-powered developer tooling.',
    tags: ['Agentic PDLC', 'MCP / FastMCP 2.0', 'Spec-driven development'],
  },
  {
    index: '02',
    icon: '◎',
    title: 'Test platforms',
    description:
      'Platform architecture that turns fragmented test output into durable, queryable engineering intelligence.',
    tags: ['Test observability', 'Failure analysis', 'Cross-stack ingestion'],
  },
  {
    index: '03',
    icon: '⌬',
    title: 'Reliability systems',
    description:
      'Performance, resilience, telemetry, and production analysis across distributed services and Kubernetes workloads.',
    tags: ['OpenTelemetry', 'Datadog / OpenSearch', 'Performance engineering'],
  },
  {
    index: '04',
    icon: '◇',
    title: 'Platform engineering',
    description:
      'Hands-on backend, web, data, CI/CD, and cloud delivery from architecture through operational readiness.',
    tags: ['Java / Spring Boot', 'TypeScript / Node.js', 'Python / Kubernetes'],
  },
];
