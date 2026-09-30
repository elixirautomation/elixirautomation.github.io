import { profile } from './profile';

export interface NavLink {
  href: string;
  label: string;
}

export const navLinks: NavLink[] = [
  { href: '#projects', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#stack', label: 'Stack' },
  { href: '#github', label: 'GitHub' },
  { href: '#contact', label: 'Contact' },
];

export interface CommandEntry {
  icon: string;
  label: string;
  group: 'Navigate' | 'Links' | 'Actions';
  /** In-page anchor to scroll to. */
  target?: string;
  /** External URL, opened in a new tab. */
  href?: string;
  action?: 'theme' | 'print' | 'copy-email';
}

export const commands: CommandEntry[] = [
  { group: 'Navigate', icon: '◆', label: 'View projects', target: '#projects' },
  { group: 'Navigate', icon: '↗', label: 'View experience', target: '#experience' },
  { group: 'Navigate', icon: '◇', label: 'Technology stack', target: '#stack' },
  { group: 'Navigate', icon: '⎇', label: 'Open source work', target: '#github' },
  { group: 'Navigate', icon: '@', label: 'Contact me', target: '#contact' },
  { group: 'Links', icon: '⎋', label: 'Open GitHub', href: profile.links.github },
  { group: 'Links', icon: '⎋', label: 'Open LinkedIn', href: profile.links.linkedin },
  { group: 'Actions', icon: '⇩', label: 'Download resume (PDF)', action: 'print' },
  { group: 'Actions', icon: '⧉', label: 'Copy email address', action: 'copy-email' },
  { group: 'Actions', icon: '◐', label: 'Toggle theme', action: 'theme' },
];
