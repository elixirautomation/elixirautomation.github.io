import { DashboardPanels } from './DashboardPanels';

/** Illustrative Sentinel UI. Figures shown are the published production numbers only. */
export function SentinelDashboard() {
  return (
    <div className="product-window" aria-label="Illustrative Sentinel dashboard; figures shown are the published production numbers">
      <div className="window-bar">
        <div>
          <i></i>
          <i></i>
          <i></i>
        </div>
        <span>sentinel / engineering-health</span>
        <b>PREVIEW</b>
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
            <span>Illustrative UI</span>
          </div>
          <DashboardPanels
            panels={[
              {
                id: 'metrics',
                label: 'Key metrics',
                content: (
                  <div className="dash-metrics">
                    <div>
                      <small>Executions</small>
                      <strong>596K+</strong>
                      <em>observed</em>
                    </div>
                    <div>
                      <small>Test identities</small>
                      <strong>20K+</strong>
                      <em>indexed</em>
                    </div>
                    <div>
                      <small>AI analysis</small>
                      <strong>~15s</strong>
                      <em className="up">from ~48s · 68% faster</em>
                    </div>
                  </div>
                ),
              },
              {
                id: 'chart',
                label: 'Execution health',
                content: (
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
                ),
              },
              {
                id: 'insights',
                label: 'AI insights',
                content: (
                  <div className="failure-row">
                    <div>
                      <span className="failure-icon">AI</span>
                      <p>
                        <strong>Failure clustering</strong>
                        <small>Groups related failures across runs</small>
                      </p>
                      <b>Evidence →</b>
                    </div>
                    <div>
                      <span className="failure-icon alt">↗</span>
                      <p>
                        <strong>Flakiness intelligence</strong>
                        <small>Separates flaky from genuinely broken</small>
                      </p>
                      <b>Signal →</b>
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
