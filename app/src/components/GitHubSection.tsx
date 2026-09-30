import { profile } from '../content/profile';
import { useGitHubProfile } from '../hooks/useGitHubProfile';
import { GitHubIcon } from './Icons';
import './GitHubSection.css';

const dateFormat = new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' });

export function GitHubSection() {
  const state = useGitHubProfile(profile.githubUser);

  return (
    <section className="section section-shell github-section" id="github" aria-labelledby="github-title">
      <div className="github-panel reveal">
        <div className="github-head">
          <div>
            <p className="eyebrow">GitHub activity</p>
            <h2 id="github-title">Open work, live from the API.</h2>
          </div>
          <a className="project-link" href={profile.links.github} target="_blank" rel="noreferrer">
            <GitHubIcon />@{profile.githubUser} <span aria-hidden="true">↗</span>
          </a>
        </div>

        {state.status === 'loading' && (
          <div className="github-grid" aria-busy="true">
            <span className="sr-only">Loading GitHub activity…</span>
            {[0, 1, 2].map((key) => (
              <div className="github-skeleton" key={key} aria-hidden="true"></div>
            ))}
          </div>
        )}

        {state.status === 'error' && (
          <p className="github-error">GitHub’s API is unavailable right now (it rate-limits anonymous visitors). The profile link above still works.</p>
        )}

        {state.status === 'ready' && (
          <>
            <ul className="github-stats">
              <li>
                <strong>{state.data.publicRepos}</strong>
                <span>public repositories</span>
              </li>
              <li>
                <strong>{state.data.ownRepos}</strong>
                <span>original (non-fork)</span>
              </li>
              <li>
                <strong>{state.data.followers}</strong>
                <span>followers</span>
              </li>
              <li className="github-langs">
                <span>Top languages</span>
                <div>
                  {state.data.languages.map((language) => (
                    <b key={language.name}>
                      {language.name} <i>{language.count}</i>
                    </b>
                  ))}
                </div>
              </li>
            </ul>
            <div className="github-grid">
              {state.data.recent.map((repo) => (
                <a className="github-repo" key={repo.name} href={repo.html_url} target="_blank" rel="noreferrer">
                  <strong>{repo.name}</strong>
                  <p>{repo.description ?? 'No description.'}</p>
                  <span>
                    {repo.language ?? '—'} · pushed {dateFormat.format(new Date(repo.pushed_at))}
                  </span>
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
