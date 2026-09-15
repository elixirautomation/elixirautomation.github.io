import { useCallback, useRef, useState } from 'react';

/** Shows a short-lived toast message; owns its own auto-dismiss timer. */
export function useToast() {
  const [message, setMessage] = useState<string | null>(null);
  const timerRef = useRef<number | undefined>(undefined);

  const showToast = useCallback((text: string) => {
    setMessage(text);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setMessage(null), 2200);
  }, []);

  return { message, showToast };
}
