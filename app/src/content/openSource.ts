/**
 * Curated open-source work, in display order. Live stars, language and push
 * dates are merged in from the GitHub API when it answers; these entries are
 * the fallback, so the section never renders empty when the API rate-limits.
 * The portfolio repo itself is deliberately not listed.
 */
export interface OpenSourceRepo {
  name: string;
  surface: 'Agentic' | 'Web UI' | 'Mobile' | 'API';
  summary: string;
  language: string;
  stars: number;
}

export const openSourceRepos: OpenSourceRepo[] = [
  {
    name: 'system-one-decision-lab',
    surface: 'Agentic',
    summary: 'Compare System One decision models (Laya & Jev) on the same evidence behind one contract, with per-engine confidence gates.',
    language: 'TypeScript',
    stars: 0,
  },
  {
    name: 'SeleniumPythonHybridFramework',
    surface: 'Web UI',
    summary: 'Hybrid keyword + data-driven Selenium framework in Python, with page objects and reporting.',
    language: 'Python',
    stars: 11,
  },
  {
    name: 'SeleniumJavaHybridFramework',
    surface: 'Web UI',
    summary: 'The Java counterpart: a hybrid Selenium framework for cross-browser web regression.',
    language: 'Java',
    stars: 5,
  },
  {
    name: 'appium-pytest',
    surface: 'Mobile',
    summary: 'Mobile automation framework built on Appium and PyTest.',
    language: 'Python',
    stars: 4,
  },
  {
    name: 'PythonAPIAutomationFramework',
    surface: 'API',
    summary: 'API automation framework in Python for REST service testing.',
    language: 'Python',
    stars: 3,
  },
  {
    name: 'RestAssuredAPIAutomation',
    surface: 'API',
    summary: 'REST Assured framework in Java for contract-style API automation.',
    language: 'Java',
    stars: 2,
  },
  {
    name: 'raft-api-playwright',
    surface: 'API',
    summary: 'Reusable automation framework for testing with Python and Playwright.',
    language: 'Python',
    stars: 1,
  },
];

export const PORTFOLIO_REPO = 'elixirautomation.github.io';
