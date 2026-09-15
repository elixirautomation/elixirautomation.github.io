import { useCallback, useEffect, useState } from 'react';
import { SiteHeader } from './components/SiteHeader';
import { HeroSection } from './components/HeroSection';
import { WorkSection } from './components/WorkSection';
import { SentinelSection } from './components/SentinelSection';
import { ExperienceSection } from './components/ExperienceSection';
import { StackSection } from './components/StackSection';
import { EducationSection, ContactSection, SiteFooter } from './components/MiscSections';
import { CommandPalette } from './components/CommandPalette';
import { VercelAnalytics } from './components/VercelAnalytics';
import { useTheme } from './hooks/useTheme';
import { useScrollReveal } from './hooks/useScrollReveal';
import { usePointerEffects } from './hooks/usePointerEffects';
import { useExpandDetailsForPrint } from './hooks/useExpandDetailsForPrint';
import { useToast } from './hooks/useToast';

const CONTACT_EMAIL = 'abhilash04sharma@gmail.com';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const { message: toastMessage, showToast } = useToast();
  const [commandOpen, setCommandOpen] = useState(false);

  useScrollReveal();
  usePointerEffects();
  useExpandDetailsForPrint();

  const openCommandPalette = useCallback(() => setCommandOpen(true), []);
  const closeCommandPalette = useCallback(() => setCommandOpen(false), []);
  const handlePrint = useCallback(() => window.print(), []);

  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      showToast('Email copied to clipboard');
    } catch {
      window.location.href = `mailto:${CONTACT_EMAIL}`;
    }
  }, [showToast]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const commandShortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k';
      const activeTag = (document.activeElement as HTMLElement | null)?.tagName;
      const slashShortcut = event.key === '/' && activeTag !== 'INPUT' && activeTag !== 'TEXTAREA';
      if (commandShortcut || slashShortcut) {
        event.preventDefault();
        setCommandOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="ambient ambient-one" aria-hidden="true"></div>
      <div className="ambient ambient-two" aria-hidden="true"></div>
      <div className="cursor-glow" aria-hidden="true"></div>

      <SiteHeader theme={theme} onToggleTheme={toggleTheme} onOpenCommandPalette={openCommandPalette} />

      <main id="main-content">
        <HeroSection onPrint={handlePrint} />
        <WorkSection />
        <SentinelSection />
        <ExperienceSection />
        <StackSection />
        <EducationSection />
        <ContactSection onCopyEmail={handleCopyEmail} />
      </main>

      <SiteFooter />

      <CommandPalette open={commandOpen} onClose={closeCommandPalette} onToggleTheme={toggleTheme} onPrint={handlePrint} />

      <div className={`toast${toastMessage ? ' show' : ''}`} role="status" aria-live="polite">
        {toastMessage}
      </div>

      <VercelAnalytics />
    </>
  );
}
