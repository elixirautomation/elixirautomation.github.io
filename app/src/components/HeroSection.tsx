import { useRotatingText } from '../hooks/useRotatingText';

const ROTATING_WORDS = ['observable.', 'explainable.', 'resilient.', 'scalable.'];
const AGENT_LOGS = [
  'sentinel.ingest → analyze → explain',
  'mcp.spec → generate → validate',
  'signals.logs + traces + performance',
  'agentcore.runtime → tool → evidence',
];

export function HeroSection({ onPrint }: { onPrint: () => void }) {
  const rotatingWord = useRotatingText(ROTATING_WORDS, 2800);
  const agentLog = useRotatingText(AGENT_LOGS, 2400);

  return (
    <section className="hero section-shell" id="home" aria-labelledby="hero-title">
      <div className="hero-copy reveal">
        <div className="availability">
          <span className="pulse" aria-hidden="true"></span>Building observable engineering systems
        </div>
        <p className="eyebrow">Quality engineering · AI engineering · reliability</p>
        <h1 id="hero-title">
          I build systems that make engineering quality <span className="gradient-text">{rotatingWord}</span>
        </h1>
        <p className="hero-summary">
          Quality Engineer focused on AI-native platforms and production reliability, with 10+ years across software
          engineering, test platforms, observability, and production systems. Over the last 3 years, I have built AI
          agents, MCP workflows, test intelligence, and developer tooling with Kiro, Amazon Bedrock, and AgentCore.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#sentinel">
            Explore Sentinel <span aria-hidden="true">↘</span>
          </a>
          <a className="button button-secondary" href="#contact">
            Start a conversation
          </a>
          <button className="text-button" type="button" onClick={onPrint}>
            Print profile
          </button>
        </div>
        <div className="metric-row" aria-label="Career highlights">
          <div className="metric">
            <strong>10+</strong>
            <span>years engineering</span>
          </div>
          <div className="metric">
            <strong>3</strong>
            <span>years building agents</span>
          </div>
          <div className="metric">
            <strong>596K+</strong>
            <span>test executions</span>
          </div>
          <div className="metric">
            <strong>20K+</strong>
            <span>test identities</span>
          </div>
        </div>
      </div>

      <div className="agent-stage reveal" aria-label="Animated map connecting AI agents, test platforms, and reliability systems">
        <div className="stage-grid" aria-hidden="true"></div>
        <svg className="agent-map" viewBox="0 0 620 620" role="img" aria-labelledby="agent-map-title">
          <title id="agent-map-title">Agentic engineering capability map</title>
          <defs>
            <linearGradient id="line-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#5eead4" />
              <stop offset="1" stopColor="#60a5fa" />
            </linearGradient>
            <filter id="soft-glow">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g className="orbit-lines" fill="none" stroke="url(#line-gradient)">
            <circle cx="310" cy="310" r="117" />
            <circle cx="310" cy="310" r="221" />
            <path d="M310 193 132 176M427 310 516 154M310 427 510 458M193 310 111 452M310 193 468 245M427 310 370 522M310 427 166 508M193 310 196 98" />
          </g>
          <g className="signal-paths" fill="none" stroke="url(#line-gradient)">
            <path d="M132 176C205 170 238 210 310 193" />
            <path d="M516 154C474 198 462 243 427 310" />
            <path d="M510 458C451 450 396 431 310 427" />
            <path d="M111 452C155 401 169 361 193 310" />
          </g>
          <g className="core-node" filter="url(#soft-glow)">
            <circle cx="310" cy="310" r="72" />
            <text x="310" y="299">
              SYSTEM
            </text>
            <text className="core-word" x="310" y="328">
              MAKER
            </text>
          </g>
          <g className="map-node node-one">
            <circle cx="132" cy="176" r="45" />
            <text x="132" y="181">
              KIRO
            </text>
          </g>
          <g className="map-node node-two">
            <circle cx="516" cy="154" r="45" />
            <text x="516" y="159">
              MCP
            </text>
          </g>
          <g className="map-node node-three">
            <circle cx="510" cy="458" r="49" />
            <text x="510" y="453">
              BEDROCK
            </text>
            <text className="sub" x="510" y="469">
              AGENTCORE
            </text>
          </g>
          <g className="map-node node-four">
            <circle cx="111" cy="452" r="48" />
            <text x="111" y="448">
              QUALITY
            </text>
            <text className="sub" x="111" y="464">
              SIGNALS
            </text>
          </g>
          <g className="satellite">
            <circle cx="196" cy="98" r="9" />
            <circle cx="468" cy="245" r="9" />
            <circle cx="370" cy="522" r="9" />
            <circle cx="166" cy="508" r="9" />
          </g>
        </svg>
        <div className="agent-console">
          <div className="console-top">
            <span></span>
            <span></span>
            <span></span>
            <b>agent-runtime</b>
          </div>
          <div className="console-line">
            <span className="prompt">›</span>
            <span>{agentLog}</span>
            <i></i>
          </div>
        </div>
      </div>
    </section>
  );
}
