import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { useRotatingText } from '../hooks/useRotatingText';
import './AgentPipeline.css';

/** The loop I build agent systems around, each stage tied to tools used in real work. */
const STAGES = [
  { key: 'AGENTS', detail: 'Kiro · spec-driven workflows' },
  { key: 'REASONING', detail: 'Amazon Bedrock · AgentCore' },
  { key: 'TOOLS', detail: 'MCP · FastMCP 2.0' },
  { key: 'MEMORY', detail: 'PostgreSQL · evidence store' },
  { key: 'ACTION', detail: 'alerts · reports · merge requests' },
];

const AGENT_LOGS = [
  'tests.ingest → analyze → explain',
  'mcp.spec → generate → validate',
  'signals.logs + traces + performance',
  'agentcore.runtime → tool → evidence',
];

export function AgentPipeline() {
  const reducedMotion = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const log = useRotatingText(AGENT_LOGS, 2400);

  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % STAGES.length), 1500);
    return () => window.clearInterval(timer);
  }, [reducedMotion]);

  return (
    <div className="pipeline reveal" aria-label="How I structure agent systems: agents, reasoning, tools, memory, action">
      <div className="pipeline-bar">
        <span className="pipeline-online">
          <i aria-hidden="true"></i>System online
        </span>
        <span>agent-runtime</span>
      </div>
      <ol className="pipeline-stages">
        {STAGES.map((stage, index) => (
          <li key={stage.key} className={!reducedMotion && index === active ? 'is-active' : undefined}>
            <span className="pipeline-index">0{index + 1}</span>
            <b>{stage.key}</b>
            <small>{stage.detail}</small>
          </li>
        ))}
      </ol>
      <div className="pipeline-console" aria-hidden="true">
        <span className="prompt">›</span>
        <span className="text-swap" key={log.cycle}>
          {log.text}
        </span>
        <i></i>
      </div>
    </div>
  );
}
