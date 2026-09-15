export interface NavLink {
  href: string;
  label: string;
}

export const navLinks: NavLink[] = [
  { href: '#sentinel', label: 'Sentinel' },
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#stack', label: 'Stack' },
  { href: '#contact', label: 'Contact' },
];

export interface CommandEntry {
  icon: string;
  label: string;
  shortcut: string;
  target?: string;
  action?: 'theme' | 'print';
}

export const commandNavigate: CommandEntry[] = [
  { icon: '◎', label: 'Explore Sentinel', shortcut: 'S', target: '#sentinel' },
  { icon: '⌬', label: 'Explore engineering capabilities', shortcut: 'W', target: '#work' },
  { icon: '↗', label: 'Browse experience', shortcut: 'E', target: '#experience' },
  { icon: '◇', label: 'Inspect technology stack', shortcut: 'T', target: '#stack' },
  { icon: '@', label: 'Open contact channel', shortcut: 'C', target: '#contact' },
];

export const commandActions: CommandEntry[] = [
  { icon: '◐', label: 'Switch color theme', shortcut: 'D', action: 'theme' },
  { icon: '⇩', label: 'Save profile as PDF', shortcut: 'P', action: 'print' },
];
