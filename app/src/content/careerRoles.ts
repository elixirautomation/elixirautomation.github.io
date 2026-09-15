import type { CareerRole } from './types';

export const careerRoles: CareerRole[] = [
  {
    id: 'entain-india',
    dateRange: 'Sep 2023 — Present',
    company: 'Entain India',
    title: 'SDET III',
    location: 'Pune, Maharashtra',
    current: true,
    summary:
      'Maker in the organisation’s first successful AI-native Mission Pod, with hands-on ownership across backend services, quality engineering, agent workflows, reliability, and the Sentinel platform.',
    tags: ['Agentic PDLC', 'Kiro / MCP', 'Amazon Bedrock', 'Java', 'Python'],
    relatedLink: { label: 'Explore the Sentinel platform', href: '#sentinel' },
    embeddedProject: {
      eyebrow: 'Embedded project',
      title: 'Mission Pod · Brazil identity delivery',
      description:
        'Worked across product delivery, engineering, quality, and operational readiness rather than within a single testing lane.',
      highlights: [
        {
          title: 'Digital identity',
          description:
            'Co-delivered a Brazil integration with provider Serasa through the BIA aggregation layer, supporting a projected 3.5 million account transition.',
        },
        {
          title: 'Migration engineering',
          description:
            'Built a Python pipeline with threaded workers, circuit breakers, TPS limiting, and global backoff for large-scale vendor migration.',
        },
        {
          title: 'Resilience',
          description:
            'Validated mocked and non-mocked vendor endpoints with JMeter and JMX scripts for internal Kubernetes services.',
        },
      ],
      deliveryLoop: ['Understand', 'Compile', 'Generate', 'Observe'],
    },
  },
  {
    id: 'paytm',
    dateRange: 'Jun 2023 — Sep 2023',
    company: 'Paytm',
    title: 'QA Lead',
    location: 'Pune, Maharashtra',
    summary:
      'Increased API test automation coverage by 30% while handling in-sprint quality delivery, requirement reviews, and maintainable service-testing practices.',
  },
  {
    id: 'goto-financial',
    dateRange: 'Feb 2020 — Jun 2023',
    company: 'GoTo Financial',
    title: 'Senior QA Engineer',
    location: 'Pune, Maharashtra',
    summary:
      'Implemented microservice test processes that reduced manual effort by 75%, supported production reliability, and improved discoverability through reusable automation.',
  },
  {
    id: 'block8',
    dateRange: 'Jan 2019 — Feb 2020',
    company: 'Block8 · Redbelly Network',
    title: 'Senior Test Automation Engineer',
    location: 'Chandigarh',
    summary:
      'Designed the test automation framework for Ethereum-based blockchain applications, CI workflows, and cross-browser execution.',
  },
  {
    id: 'sonetel',
    dateRange: 'Feb 2018 — Jan 2019',
    company: 'Sonetel',
    title: 'Test Automation Engineer (R&D)',
    location: 'Hyderabad',
    summary:
      'Enhanced automation for AI-enabled applications and introduced containerised CI execution with an in-house Selenium Grid.',
  },
  {
    id: 'cognizant',
    dateRange: 'Dec 2015 — Feb 2018',
    company: 'Cognizant',
    title: 'Programmer Analyst / Trainee',
    location: 'Pune, Maharashtra',
    summary:
      'Built a Coded UI regression suite for MSCRM that reduced manual regression effort by 90%, applying synchronization and stabilization practices.',
  },
];
