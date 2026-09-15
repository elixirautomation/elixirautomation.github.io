import { sentinelFeatures, sentinelProofPoints, sentinelStorySteps, sentinelTechnologies } from '../content/sentinel';

export function SentinelSection() {
  return (
    <section className="section section-shell sentinel-section" id="sentinel" aria-labelledby="sentinel-title">
      <div className="sentinel-copy reveal">
        <div className="project-label">
          <span>Flagship platform</span>
          <span>Built concept → production</span>
        </div>
        <h2 id="sentinel-title">Sentinel</h2>
        <p className="project-kicker">
          Test runs generate plenty of data. Teams still lose time understanding what failed, whether it is flaky, and
          who should act.
        </p>
        <p className="project-lead">
          <strong>Sentinel is an AI-native test observability platform I designed and built from concept to production.</strong>{' '}
          It gives every test a durable identity, joins evidence across engineering stacks, and turns fragmented
          failures into explainable signals.
        </p>
        <div className="sentinel-story" aria-label="How Sentinel works">
          {sentinelStorySteps.map((item) => (
            <article key={item.step}>
              <span>{item.step}</span>
              <strong>{item.title}</strong>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
        <div className="sentinel-proof" aria-label="Sentinel production outcomes">
          {sentinelProofPoints.map((point) => (
            <div key={point.label}>
              <strong>{point.value}</strong>
              <span>{point.label}</span>
            </div>
          ))}
        </div>
        <details className="sentinel-depth">
          <summary>
            <span>Platform scope &amp; engineering depth</span>
            <b>Explore details</b>
          </summary>
          <ul className="feature-list">
            {sentinelFeatures.map((feature) => (
              <li key={feature.index}>
                <span>{feature.index}</span>
                <p>{feature.description}</p>
              </li>
            ))}
          </ul>
        </details>
        <div className="tag-row" aria-label="Sentinel technologies">
          {sentinelTechnologies.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
      </div>

      <div className="product-window reveal" aria-label="Conceptual Sentinel test observability dashboard">
        <div className="window-bar">
          <div>
            <i></i>
            <i></i>
            <i></i>
          </div>
          <span>sentinel / engineering-health</span>
          <b>LIVE</b>
        </div>
        <div className="dashboard">
          <aside className="dash-nav" aria-hidden="true">
            <strong>S</strong>
            <span className="active"></span>
            <span></span>
            <span></span>
            <span></span>
          </aside>
          <div className="dash-main">
            <div className="dash-head">
              <div>
                <small>Engineering health</small>
                <h3>Test intelligence</h3>
              </div>
              <span>Last 30 days⌄</span>
            </div>
            <div className="dash-metrics">
              <div>
                <small>Executions</small>
                <strong>596K+</strong>
                <em className="up">↗ 18.4%</em>
              </div>
              <div>
                <small>Test identities</small>
                <strong>20K+</strong>
                <em>indexed</em>
              </div>
              <div>
                <small>AI analysis</small>
                <strong>~15s</strong>
                <em className="up">68% faster</em>
              </div>
            </div>
            <div className="chart-card">
              <div className="chart-head">
                <span>Execution health</span>
                <b>
                  Pass rate <i></i> Flaky <i></i> Failed
                </b>
              </div>
              <svg viewBox="0 0 520 174" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                    <stop stopColor="#5eead4" stopOpacity=".38" />
                    <stop offset="1" stopColor="#5eead4" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path className="chart-grid" d="M0 30H520M0 75H520M0 120H520M0 165H520" />
                <path
                  className="chart-area"
                  d="M0 141C33 131 51 138 78 116s51-9 80-31 56 7 84-19 56 10 82-20 58 6 88-22 63-1 108-17v167H0Z"
                />
                <path
                  className="chart-line"
                  d="M0 141C33 131 51 138 78 116s51-9 80-31 56 7 84-19 56 10 82-20 58 6 88-22 63-1 108-17"
                />
              </svg>
            </div>
            <div className="failure-row">
              <div>
                <span className="failure-icon">AI</span>
                <p>
                  <strong>Failure cluster detected</strong>
                  <small>Authentication timeout · 18 related failures</small>
                </p>
                <b>Investigate →</b>
              </div>
              <div>
                <span className="failure-icon alt">↗</span>
                <p>
                  <strong>Flakiness trending down</strong>
                  <small>Checkout suite · 7-day window</small>
                </p>
                <b>-12.8%</b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
