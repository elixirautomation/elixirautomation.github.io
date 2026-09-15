import { useRotatingText } from '../hooks/useRotatingText';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { HeroMetrics } from './HeroMetrics';
import { DownloadIcon } from './Icons';

const ROTATING_WORDS = ['observable.', 'explainable.', 'resilient.', 'scalable.'];
const AGENT_LOGS = [
  'sentinel.ingest → analyze → explain',
  'mcp.spec → generate → validate',
  'signals.logs + traces + performance',
  'agentcore.runtime → tool → evidence',
];

/** Connection curves between the outer nodes and the core, shared by the lines and the pulses. */
const SIGNAL_PATHS = [
  'M132 176C205 170 238 210 310 193',
  'M516 154C474 198 462 243 427 310',
  'M510 458C451 450 396 431 310 427',
  'M111 452C155 401 169 361 193 310',
];

export function HeroSection({ onPrint }: { onPrint: () => void }) {
  const rotatingWord = useRotatingText(ROTATING_WORDS, 2800);
  const agentLog = useRotatingText(AGENT_LOGS, 2400);
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section className="hero section-shell" id="home" aria-labelledby="hero-title">
      <div className="hero-copy reveal">
        <div className="availability">
          <span className="pulse" aria-hidden="true"></span>Building observable engineering systems
        </div>
        <p className="eyebrow">Quality engineering · AI engineering · reliability</p>
        <h1 id="hero-title">
          I build systems that make engineering quality{' '}
          <span className="gradient-text text-swap" key={rotatingWord.cycle}>
            {rotatingWord.text}
          </span>
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
          <button className="button button-quiet" type="button" onClick={onPrint}>
            <DownloadIcon />
            Save as PDF
          </button>
        </div>
        <HeroMetrics />
      </div>

      <div className="agent-stage reveal" aria-label="Animated map connecting AI agents, test platforms, and reliability systems">
        <div className="stage-grid" aria-hidden="true"></div>
        <svg
          className="agent-map"
          viewBox="0 0 620 620"
          role="img"
          aria-label="Agentic engineering capability map"
        >
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
            {SIGNAL_PATHS.map((path) => (
              <path key={path} d={path} />
            ))}
          </g>
          {/*
            Travelling pulses along each connection. Rendered only when motion is
            allowed: SMIL <animateMotion> cannot be disabled from CSS, so the
            reduced-motion decision has to happen here in the component.
          */}
          {!reducedMotion && (
            <g className="signal-pulses" aria-hidden="true">
              {SIGNAL_PATHS.map((path, index) => (
                <circle key={path} className="signal-pulse" r="3.5">
                  <animateMotion
                    dur={`${3.2 + index * 0.45}s`}
                    repeatCount="indefinite"
                    path={path}
                    begin={`${index * 0.6}s`}
                  />
                </circle>
              ))}
            </g>
          )}
          {!reducedMotion && <circle className="core-pulse" cx="310" cy="310" r="72" aria-hidden="true" />}
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
            <span className="console-log text-swap" key={agentLog.cycle}>
              {agentLog.text}
            </span>
            <i></i>
          </div>
        </div>
      </div>
    </section>
  );
}
