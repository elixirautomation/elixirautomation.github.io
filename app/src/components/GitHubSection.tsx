import { profile } from '../content/profile';
import { projects } from '../content/projects';
import { useGitHubProfile } from '../hooks/useGitHubProfile';
import './GitHubSection.css';

/** Repos already featured as project case studies are not repeated here. */
const featured = new Set(projects.flatMap((project) => project.links.map((link) => link.href.toLowerCase())));

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
          <p className="github-error">GitHub’s API is unavailable right now (it rate-limits anonymous visitors). The GitHub link in the contact section still works.</p>
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
              {state.data.recent.filter((repo) => !featured.has(repo.html_url.toLowerCase())).slice(0, 3).map((repo) => (
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
