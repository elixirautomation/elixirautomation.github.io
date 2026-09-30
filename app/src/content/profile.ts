/** Single source of truth for identity and contact data used across the app. */
export const profile = {
  name: 'Abhilash Sharma',
  initials: 'AS',
  role: 'SDET III · AI-native Mission Pod',
  company: 'Entain India',
  location: 'Pune, India',
  tagline: 'AI agents · test intelligence · reliability',
  positioning:
    'Quality Engineer focused on AI-native platforms and production reliability, with 10+ years across software engineering, test platforms, observability, and production systems. Over the last 3 years I have built AI agents, MCP workflows, test intelligence, and developer tooling with Kiro, Amazon Bedrock, and AgentCore.',
  currentFocus: 'Building Sentinel at Entain',
  email: 'abhilash04sharma@gmail.com',
  phone: { display: '+91-9814606102', href: 'tel:+919814606102' },
  links: {
    github: 'https://github.com/elixirautomation',
    linkedin: 'https://www.linkedin.com/in/abhilash-sharma-profile',
  },
  githubUser: 'elixirautomation',
} as const;
