/**
 * Tenure maths for the career section. Dates are `YYYY-MM` strings and are
 * converted to an absolute month index so ranges, durations and the career
 * ribbon proportions are all derived from one source instead of hand-typed.
 */

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** `2023-09` -> absolute month index (year * 12 + zero-based month). */
export function toMonthIndex(value: string): number {
  const [year, month] = value.split('-').map(Number);
  return year * 12 + (month - 1);
}

export function currentMonthIndex(now: Date = new Date()): number {
  return now.getFullYear() * 12 + now.getMonth();
}

/** End of a tenure as a month index; an open-ended tenure ends "now". */
export function endIndex(end?: string, now?: Date): number {
  return end ? toMonthIndex(end) : currentMonthIndex(now);
}

/** Whole months between start and end, never less than one. */
export function tenureMonths(start: string, end?: string, now?: Date): number {
  return Math.max(1, endIndex(end, now) - toMonthIndex(start));
}

export function formatMonth(value: string): string {
  const index = toMonthIndex(value);
  return `${MONTHS[index % 12]} ${Math.floor(index / 12)}`;
}

export function formatRange(start: string, end?: string): string {
  return `${formatMonth(start)} — ${end ? formatMonth(end) : 'Present'}`;
}

/** 40 -> "3 yrs 4 mos", 11 -> "11 mos", 12 -> "1 yr". */
export function formatTenure(months: number): string {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts: string[] = [];
  if (years) parts.push(`${years} yr${years > 1 ? 's' : ''}`);
  if (rest) parts.push(`${rest} mo${rest > 1 ? 's' : ''}`);
  return parts.join(' ') || '1 mo';
}
