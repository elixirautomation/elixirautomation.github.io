import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type MouseEvent } from 'react';
import { commands, type CommandEntry } from '../content/navigation';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  onToggleTheme: () => void;
  onPrint: () => void;
  onCopyEmail: () => void;
}

const GROUPS: CommandEntry['group'][] = ['Navigate', 'Links', 'Actions'];

export function CommandPalette({ open, onClose, onToggleTheme, onPrint, onCopyEmail }: CommandPaletteProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      setQuery('');
      setActiveIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClose = () => onClose();
    dialog.addEventListener('close', handleClose);
    return () => dialog.removeEventListener('close', handleClose);
  }, [onClose]);

  const normalized = query.trim().toLowerCase();
  const visible = useMemo(() => commands.filter((entry) => entry.label.toLowerCase().includes(normalized)), [normalized]);

  const run = (entry: CommandEntry) => {
    onClose();
    if (entry.target) document.querySelector(entry.target)?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    if (entry.href) window.open(entry.href, '_blank', 'noopener,noreferrer');
    if (entry.action === 'theme') onToggleTheme();
    if (entry.action === 'print') onPrint();
    if (entry.action === 'copy-email') onCopyEmail();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (visible.length === 0) return;
      const step = event.key === 'ArrowDown' ? 1 : -1;
      setActiveIndex((current) => (current + step + visible.length) % visible.length);
    } else if (event.key === 'Enter') {
      const entry = visible[activeIndex];
      if (entry) run(entry);
    }
  };

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) onClose();
  };

  const optionId = (entry: CommandEntry) => `cmd-${entry.label.replace(/\W+/g, '-').toLowerCase()}`;
  const activeEntry = visible[activeIndex];

  return (
    <dialog className="command-dialog" ref={dialogRef} aria-label="Command palette" onClick={handleBackdropClick}>
      <div className="command-shell">
        <div className="command-search">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m21 21-4.3-4.3m2.3-5.2A7.5 7.5 0 1 1 4 11.5a7.5 7.5 0 0 1 15 0Z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls="command-list"
            aria-activedescendant={activeEntry ? optionId(activeEntry) : undefined}
            aria-label="Search commands"
            placeholder="Search the portfolio or run a command…"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={handleKeyDown}
          />
          <kbd>ESC</kbd>
        </div>
        <div className="command-list" id="command-list" role="listbox" aria-label="Commands">
          {GROUPS.map((group) => {
            const entries = visible.filter((entry) => entry.group === group);
            if (entries.length === 0) return null;
            return (
              <div role="group" aria-label={group} key={group}>
                <p aria-hidden="true">{group}</p>
                {entries.map((entry) => {
                  const index = visible.indexOf(entry);
                  return (
                    <div
                      key={entry.label}
                      id={optionId(entry)}
                      role="option"
                      aria-selected={index === activeIndex}
                      className={`command-option${index === activeIndex ? ' is-active' : ''}`}
                      onMouseMove={() => setActiveIndex(index)}
                      onClick={() => run(entry)}
                    >
                      <span aria-hidden="true">{entry.icon}</span>
                      <b>{entry.label}</b>
                      {entry.href && <kbd>↗</kbd>}
                    </div>
                  );
                })}
              </div>
            );
          })}
          {visible.length === 0 && <div className="command-empty">No matching command.</div>}
        </div>
        <div className="command-foot" aria-hidden="true">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> navigate
          </span>
          <span>
            <kbd>↵</kbd> run
          </span>
          <span>
            <kbd>⌘K</kbd> toggle
          </span>
        </div>
      </div>
    </dialog>
  );
}
