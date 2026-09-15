import { Analytics } from '@vercel/analytics/react';

/**
 * Vercel Web Analytics.
 *
 * Note the import path: `@vercel/analytics/react`, not `/next`. The `/next`
 * entrypoint pulls in `next/navigation` and cannot work in this Vite app.
 *
 * The site is deployed twice -- GitHub Pages and Vercel. The tracking script is
 * served by Vercel's edge at `/_vercel/insights/script.js`, which does not exist
 * on GitHub Pages, so mounting it there would 404 on every visit for no benefit.
 * It is therefore only mounted when the host is not the Pages domain.
 */
export function VercelAnalytics() {
  const isGitHubPages = typeof window !== 'undefined' && window.location.hostname.endsWith('github.io');
  if (isGitHubPages) return null;
  return <Analytics />;
}
