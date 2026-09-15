export function EducationSection() {
  return (
    <section className="section section-shell education-section" aria-labelledby="education-title">
      <div className="education-card reveal">
        <p className="eyebrow">Education</p>
        <h2 id="education-title">B.Tech, Mechanical Engineering</h2>
        <p>Lovely Professional University · Jalandhar, Punjab</p>
        <div>
          <span>Aug 2011 — May 2015</span>
          <strong>GPA 9.05 / 10</strong>
        </div>
      </div>
    </section>
  );
}

export function ContactSection({ onCopyEmail }: { onCopyEmail: () => void }) {
  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-orb orb-one" aria-hidden="true"></div>
      <div className="contact-orb orb-two" aria-hidden="true"></div>
      <div className="section-shell contact-inner reveal">
        <p className="eyebrow">Open channel</p>
        <h2 id="contact-title">Let’s build systems that help engineers understand what happens next.</h2>
        <p>Quality platforms, agent workflows, developer tooling, and production reliability.</p>
        <div className="contact-actions">
          <a className="button button-light" href="mailto:abhilash04sharma@gmail.com">
            abhilash04sharma@gmail.com
          </a>
          <button className="button button-ghost" type="button" onClick={onCopyEmail}>
            Copy email
          </button>
        </div>
        <div className="social-links">
          <a href="https://www.linkedin.com/in/abhilash-sharma-profile" target="_blank" rel="noreferrer">
            LinkedIn ↗
          </a>
          <a href="https://github.com/elixirautomation" target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer section-shell">
      <span>© {new Date().getFullYear()} Abhilash Sharma</span>
      <span>Designed as a static, accessible system.</span>
      <a href="#home">Back to top ↑</a>
    </footer>
  );
}
