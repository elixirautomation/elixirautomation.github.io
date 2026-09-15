import { useEffect } from 'react';

/** Expands every <details> element for the duration of a print job, then restores prior open state. */
export function useExpandDetailsForPrint() {
  useEffect(() => {
    let snapshot: { element: HTMLDetailsElement; open: boolean }[] | null = null;

    const expandForPrint = () => {
      const disclosures = Array.from(document.querySelectorAll('details'));
      snapshot = disclosures.map((element) => ({ element, open: element.open }));
      disclosures.forEach((element) => {
        element.open = true;
      });
    };

    const restoreAfterPrint = () => {
      if (!snapshot) return;
      snapshot.forEach(({ element, open }) => {
        element.open = open;
      });
      snapshot = null;
    };

    window.addEventListener('beforeprint', expandForPrint);
    window.addEventListener('afterprint', restoreAfterPrint);
    return () => {
      window.removeEventListener('beforeprint', expandForPrint);
      window.removeEventListener('afterprint', restoreAfterPrint);
    };
  }, []);
}
