import { profile } from '../content/profile';
import { openSourceRepos, PORTFOLIO_REPO } from '../content/openSource';
import { useGitHubProfile, type GitHubSnapshot } from '../hooks/useGitHubProfile';
import { ArrowUpRightIcon, StarIcon } from './Icons';
import { Reveal } from './Reveal';
import './GitHubSection.css';

const dateFormat = new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' });

/** Stacked share bar: one row that encodes the language mix as proportions. */
function LanguageBar({ languages }: { languages: GitHubSnapshot['languages'] }) {
  const total = languages.reduce((sum, language) => sum + language.count, 0) || 1;
  return (
    <div className="gh-langs">
      <span className="gh-label">Languages across original repos</span>
      <div className="gh-lang-bar" aria-hidden="true">
        {languages.map((language, index) => (
          <i key={language.name} style={{ flexGrow: language.count, ['--lang-tone' as string]: index }} />
        ))}
      </div>
      <ul className="gh-lang-legend">
        {languages.map((language, index) => (
          <li key={language.name} style={{ ['--lang-tone' as string]: index }}>
            <b aria-hidden="true" />
            {language.name} <span>{Math.round((language.count / total) * 100)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

type RepoCardModel = { name: string; surface: string; summary: string; language: string; href: string; stars: number; pushed: string | null };

function RepoCard({ repo }: { repo: RepoCardModel }) {
  return (
    <a className="github-repo" href={repo.href} target="_blank" rel="noreferrer">
      <span className="gh-surface">{repo.surface}</span>
      <strong>{repo.name}</strong>
      <p>{repo.summary}</p>
      <span className="gh-meta">
        {repo.language}
        {repo.stars > 0 && (
          <>
            {' · '}
            <StarIcon /> {repo.stars}
          </>
        )}
        {repo.pushed && <> · pushed {repo.pushed}</>}
      </span>
    </a>
  );
}

export function GitHubSection() {
  const state = useGitHubProfile(profile.githubUser);
  const live = state.status === 'ready' ? state.data : null;
  const byName = new Map((live?.repos ?? []).map((repo) => [repo.name.toLowerCase(), repo]));

  // Curated order and copy; live stars/language/push date win when available.
  const cards = openSourceRepos
    .filter((repo) => repo.name !== PORTFOLIO_REPO)
    .map((repo) => {
      const api = byName.get(repo.name.toLowerCase());
      return {
        ...repo,
        href: api?.html_url ?? `${profile.links.github}/${repo.name}`,
        stars: api?.stargazers_count ?? repo.stars,
        // Curated language wins: GitHub's detector labels some Java repos as HTML.
        language: repo.language,
        pushed: api ? dateFormat.format(new Date(api.pushed_at)) : null,
      };
    });

  const [featured, ...frameworks] = cards;

  return (
    <section className="section section-shell github-section" id="github" aria-labelledby="github-title">
      <Reveal className="github-panel">
        <div className="github-head">
          <div>
            <p className="eyebrow">Open source</p>
            <h2 id="github-title">Decision systems and the automation frameworks behind them.</h2>
          </div>
          <a className="gh-profile-link" href={profile.links.github} target="_blank" rel="noreferrer">
            All repositories <ArrowUpRightIcon />
          </a>
        </div>

        {live ? (
          <div className="gh-summary">
            <ul className="github-stats">
              <li>
                <strong>{live.ownRepos}</strong>
                <span>original repos</span>
              </li>
              <li>
                <strong>{live.stars}</strong>
                <span>stars earned</span>
              </li>
              <li>
                <strong>{live.followers}</strong>
                <span>followers</span>
              </li>
            </ul>
            <LanguageBar languages={live.languages} />
          </div>
        ) : (
          state.status === 'loading' && (
            <div className="gh-summary gh-summary-skeleton" aria-busy="true">
              <span className="sr-only">Loading live GitHub stats…</span>
            </div>
          )
        )}

        {featured && (
          <div className="github-featured">
            <RepoCard repo={featured} />
          </div>
        )}
        {/* A plain grid on wide screens; on phones a swipe row whose next card peeks in. */}
        <ul className="github-grid" aria-label="Automation frameworks">
          {frameworks.map((repo) => (
            <li key={repo.name}>
              <RepoCard repo={repo} />
            </li>
          ))}
        </ul>
        <p className="gh-swipe-hint" aria-hidden="true">
          Swipe for all {frameworks.length} frameworks
        </p>

        {state.status === 'error' && (
          <p className="github-note">Live stats are unavailable right now (GitHub rate-limits anonymous visitors); repository links still work.</p>
        )}
      </Reveal>
    </section>
  );
}
