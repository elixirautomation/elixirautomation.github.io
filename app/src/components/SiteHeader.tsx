import { useEffect, useState } from 'react';
import { navLinks } from '../content/navigation';
import { useActiveSection } from '../hooks/useActiveSection';
import type { Theme } from '../hooks/useTheme';

interface SiteHeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
  onOpenCommandPalette: () => void;
}

export function SiteHeader({ theme, onToggleTheme, onOpenCommandPalette }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const activeHash = useActiveSection(navLinks.map((link) => link.href));

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 18);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    return () => window.removeEventListener('scroll', updateHeader);
  }, []);

  const closeNav = () => setNavOpen(false);

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
      <a className="brand" href="#home" aria-label="Abhilash Sharma, home">
        <span className="brand-mark" aria-hidden="true">
          AS
        </span>
        <span className="brand-copy">
          <strong>Abhilash Sharma</strong>
          <small>Quality · platform · reliability</small>
        </span>
      </a>
      <button
        className="nav-toggle"
        type="button"
        aria-expanded={navOpen}
        aria-controls="site-nav"
        onClick={() => setNavOpen((open) => !open)}
      >
        <span className="sr-only">Toggle navigation</span>
        <span></span>
        <span></span>
      </button>
      <nav className={`site-nav${navOpen ? ' open' : ''}`} id="site-nav" aria-label="Primary navigation">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} className={activeHash === link.href ? 'active' : ''} onClick={closeNav}>
            {link.label}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <button
          className="icon-button"
          type="button"
          aria-label="Open command palette"
          title="Command palette (Ctrl/⌘ K)"
          onClick={onOpenCommandPalette}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m21 21-4.3-4.3m2.3-5.2A7.5 7.5 0 1 1 4 11.5a7.5 7.5 0 0 1 15 0Z" />
          </svg>
          <kbd>⌘K</kbd>
        </button>
        <button className="icon-button theme-button" type="button" aria-label="Switch color theme" onClick={onToggleTheme}>
          <svg className="sun" viewBox="0 0 24 24" aria-hidden="true" style={{ display: theme === 'light' ? 'none' : undefined }}>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
          </svg>
          <svg className="moon" viewBox="0 0 24 24" aria-hidden="true" style={{ display: theme === 'light' ? undefined : 'none' }}>
            <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2Z" />
          </svg>
        </button>
      </div>
    </header>
  );
}
