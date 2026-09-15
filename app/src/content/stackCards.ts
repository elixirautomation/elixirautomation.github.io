import type { StackCard } from './types';

export const stackCards: StackCard[] = [
  {
    eyebrow: 'AI engineering',
    title: 'Reasoning & orchestration',
    tools: ['Kiro IDE', 'Amazon Bedrock / AgentCore', 'MCP / FastMCP 2.0', 'RAG / LangChain', 'AI Agents & Skills', 'Spec-Driven Development'],
  },
  {
    eyebrow: 'Quality architecture',
    title: 'Evidence & confidence',
    tools: ['Playwright / Selenium', 'API & Contract Testing', 'Appium / RestAssured', 'Failure Analysis', 'Test Observability', 'Test Platform Engineering'],
  },
  {
    eyebrow: 'Software platforms',
    title: 'Systems & data',
    tools: ['Java / Spring Boot', 'TypeScript / Node.js', 'Python', 'React', 'PostgreSQL / MongoDB', 'Redis'],
  },
  {
    eyebrow: 'Reliability delivery',
    title: 'Signals & scale',
    tools: ['Kubernetes / Docker', 'GitLab CI/CD', 'OpenTelemetry', 'Datadog / OpenSearch', 'JMeter', 'Performance & Resilience'],
  },
];
