import { profile } from '../content/profile';
import { ArrowRightIcon, ArrowUpIcon, CopyIcon, GitHubIcon, LinkedInIcon, MailIcon, PhoneIcon } from './Icons';
import { Reveal } from './Reveal';

export function EducationSection() {
  return (
    <section className="section section-shell education-section" aria-labelledby="education-title">
      <Reveal className="education-card">
        <p className="eyebrow">Education</p>
        <h2 id="education-title">B.Tech, Mechanical Engineering</h2>
        <p>Lovely Professional University · Jalandhar, Punjab</p>
        <div>
          <span>Aug 2011 — May 2015</span>
          <strong>GPA 9.05 / 10</strong>
        </div>
      </Reveal>
    </section>
  );
}

export function ContactSection({ onCopyEmail }: { onCopyEmail: () => void }) {
  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <Reveal className="section-shell contact-inner">
        <p className="eyebrow">Open channel</p>
        <h2 id="contact-title">Let’s build something intelligent.</h2>
        <p>Have a hard problem in agent workflows, test intelligence, or production reliability? I would like to hear about it.</p>
        <div className="contact-actions">
          <a className="button button-primary" href={`mailto:${profile.email}`}>
            <MailIcon />
            Start a conversation <ArrowRightIcon />
          </a>
          <a className="button button-secondary contact-phone" href={profile.phone.href}>
            <PhoneIcon />
            {profile.phone.display}
          </a>
          <button className="button button-quiet contact-copy" type="button" onClick={onCopyEmail} aria-label={`Copy ${profile.email}`}>
            <span className="contact-email-text">{profile.email}</span>
            <span className="contact-copy-hint" aria-hidden="true">
              <CopyIcon /> copy
            </span>
          </button>
        </div>
        <div className="social-links">
          <a className="social-link" href={profile.links.github} target="_blank" rel="noreferrer">
            <GitHubIcon />
            <span>GitHub</span>
          </a>
          <a className="social-link" href={profile.links.linkedin} target="_blank" rel="noreferrer">
            <LinkedInIcon />
            <span>LinkedIn</span>
          </a>
        </div>
      </Reveal>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer section-shell">
      <span className="footer-copy">© {new Date().getFullYear()} {profile.name}</span>
      <span className="footer-note">Built with React · TypeScript · Vite. Powered by curiosity.</span>
      <a className="back-to-top" href="#home">
        <span>Back to top</span>
        <ArrowUpIcon />
      </a>
    </footer>
  );
}
