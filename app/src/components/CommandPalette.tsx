import { useEffect, useMemo, useRef, useState } from 'react';
import { commandActions, commandNavigate, type CommandEntry } from '../content/navigation';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  onToggleTheme: () => void;
  onPrint: () => void;
}

export function CommandPalette({ open, onClose, onToggleTheme, onPrint }: CommandPaletteProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      setQuery('');
      requestAnimationFrame(() => inputRef.current?.focus());
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleCancel = () => onClose();
    dialog.addEventListener('cancel', handleCancel);
    dialog.addEventListener('close', handleCancel);
    return () => {
      dialog.removeEventListener('cancel', handleCancel);
      dialog.removeEventListener('close', handleCancel);
    };
  }, [onClose]);

  const normalizedQuery = query.trim().toLowerCase();
  const visibleNavigate = useMemo(
    () => commandNavigate.filter((entry) => entry.label.toLowerCase().includes(normalizedQuery)),
    [normalizedQuery],
  );
  const visibleActions = useMemo(
    () => commandActions.filter((entry) => entry.label.toLowerCase().includes(normalizedQuery)),
    [normalizedQuery],
  );
  const noMatches = visibleNavigate.length === 0 && visibleActions.length === 0;

  const runEntry = (entry: CommandEntry) => {
    onClose();
    if (entry.target) {
      document.querySelector(entry.target)?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    }
    if (entry.action === 'theme') onToggleTheme();
    if (entry.action === 'print') onPrint();
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    const firstMatch = visibleNavigate[0] ?? visibleActions[0];
    if (firstMatch) runEntry(firstMatch);
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    const rect = dialogRef.current?.getBoundingClientRect();
    if (!rect) return;
    const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
    if (outside) onClose();
  };

  return (
    <dialog className="command-dialog" ref={dialogRef} aria-labelledby="command-title" onClick={handleBackdropClick}>
      <div className="command-shell">
        <div className="command-search">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m21 21-4.3-4.3m2.3-5.2A7.5 7.5 0 1 1 4 11.5a7.5 7.5 0 0 1 15 0Z" />
          </svg>
          <input
            ref={inputRef}
            type="search"
            placeholder="Navigate or run a command…"
            aria-label="Search commands"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleInputKeyDown}
          />
          <kbd>ESC</kbd>
        </div>
        <div className="command-list" role="listbox" aria-labelledby="command-title">
          <p id="command-title">Navigate</p>
          {visibleNavigate.map((entry) => (
            <button key={entry.label} type="button" onClick={() => runEntry(entry)}>
              <span>{entry.icon}</span>
              <b>{entry.label}</b>
              <kbd>{entry.shortcut}</kbd>
            </button>
          ))}
          <p>Actions</p>
          {visibleActions.map((entry) => (
            <button key={entry.label} type="button" onClick={() => runEntry(entry)}>
              <span>{entry.icon}</span>
              <b>{entry.label}</b>
              <kbd>{entry.shortcut}</kbd>
            </button>
          ))}
        </div>
        <div className="command-empty" hidden={!noMatches}>
          No matching command.
        </div>
      </div>
    </dialog>
  );
}
