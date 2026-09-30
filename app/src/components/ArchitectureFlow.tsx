import type { CSSProperties } from 'react';
import type { FlowStep } from '../content/projects';

/**
 * Vertical architecture diagram rendered as an ordered list, so it reads as a
 * sequence to screen readers. A soft highlight travels down the steps via
 * staggered CSS animation (disabled under reduced motion).
 */
export function ArchitectureFlow({ steps, label }: { steps: FlowStep[]; label: string }) {
  return (
    <ol className="arch-flow" aria-label={label}>
      {steps.map((step, index) => {
        const delay = { '--step': index, '--steps': steps.length } as CSSProperties;
        if ('parallel' in step) {
          return (
            <li key={index} className="arch-step arch-parallel" style={delay}>
              <span className="sr-only">In parallel: </span>
              {step.parallel.map((node) => (
                <span className="arch-node" key={node.label}>
                  <b>{node.label}</b>
                  {node.detail && <small>{node.detail}</small>}
                </span>
              ))}
            </li>
          );
        }
        return (
          <li key={index} className="arch-step" style={delay}>
            <span className="arch-node">
              <b>{step.label}</b>
              {step.detail && <small>{step.detail}</small>}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
