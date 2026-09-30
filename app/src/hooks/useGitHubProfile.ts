import { useEffect, useState } from 'react';

export interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  fork: boolean;
}

export interface GitHubSnapshot {
  publicRepos: number;
  followers: number;
  ownRepos: number;
  languages: { name: string; count: number }[];
  recent: GitHubRepo[];
}

type State = { status: 'loading' } | { status: 'ready'; data: GitHubSnapshot } | { status: 'error' };

const CACHE_TTL_MS = 30 * 60 * 1000;

function summarise(user: { public_repos: number; followers: number }, repos: GitHubRepo[]): GitHubSnapshot {
  const own = repos.filter((repo) => !repo.fork);
  const counts = new Map<string, number>();
  own.forEach((repo) => repo.language && counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1));
  return {
    publicRepos: user.public_repos,
    followers: user.followers,
    ownRepos: own.length,
    languages: [...counts].map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count).slice(0, 5),
    recent: own.slice(0, 6),
  };
}

/**
 * Live public GitHub data via the unauthenticated REST API (60 req/h per IP),
 * cached in sessionStorage so navigation does not burn the quota.
 */
export function useGitHubProfile(username: string): State {
  const [state, setState] = useState<State>({ status: 'loading' });

  useEffect(() => {
    const cacheKey = `gh-snapshot:${username}`;
    try {
      const cached = JSON.parse(sessionStorage.getItem(cacheKey) ?? 'null') as { at: number; data: GitHubSnapshot } | null;
      if (cached && Date.now() - cached.at < CACHE_TTL_MS) {
        setState({ status: 'ready', data: cached.data });
        return;
      }
    } catch {
      /* corrupt cache: refetch */
    }

    const controller = new AbortController();
    const options = { signal: controller.signal, headers: { Accept: 'application/vnd.github+json' } };
    Promise.all([
      fetch(`https://api.github.com/users/${username}`, options),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`, options),
    ])
      .then(async ([userResponse, reposResponse]) => {
        if (!userResponse.ok || !reposResponse.ok) throw new Error('GitHub API unavailable');
        const data = summarise(await userResponse.json(), await reposResponse.json());
        sessionStorage.setItem(cacheKey, JSON.stringify({ at: Date.now(), data }));
        setState({ status: 'ready', data });
      })
      .catch(() => {
        if (!controller.signal.aborted) setState({ status: 'error' });
      });
    return () => controller.abort();
  }, [username]);

  return state;
}
