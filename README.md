# elixirautomation.github.io

Portfolio for Abhilash Sharma, built with React, TypeScript, and Vite in a Yarn workspace, deployed to GitHub Pages via GitHub Actions.

## Local development

Every command runs from the repository root — there is no need to `cd` into `app/`.

```bash
yarn install
yarn dev
```

Yarn 4 is vendored at `.yarn/releases/yarn-4.12.0.cjs` and pinned via `yarnPath`, so a plain `yarn` works even if an older global Yarn (for example Homebrew's Yarn 1.x) comes first on your `PATH` — Yarn 1 reads `yarnPath` and delegates to Yarn 4. Corepack works too, but is not required.

Open the URL Vite prints (typically [http://localhost:5173](http://localhost:5173)).

## Root scripts

| Script | Purpose |
| --- | --- |
| `yarn dev` | Start the Vite dev server |
| `yarn build` | Type check and build production output to `app/dist` |
| `yarn preview` | Serve the production build locally |
| `yarn typecheck` | TypeScript project references, no emit |
| `yarn lint` | Type check, then ESLint |
| `yarn lint:fix` | ESLint with `--fix` |
| `yarn check` | Type check + ESLint (CI-equivalent gate) |
| `yarn audit` | Fail on high/critical dependency vulnerabilities |
| `yarn clean` | Remove build output and caches |
| `yarn clean:build` | Clean, then rebuild |

Each root script delegates into the `@portfolio/app` workspace, so the app can be restructured without changing the commands used day to day.

## Structure

- `package.json` — workspace root: Yarn 4 (`packageManager`), workspace list, and all delegating scripts
- `.yarnrc.yml` — Yarn config (`node-modules` linker, vendored `yarnPath`)
- `.yarn/releases/` — the pinned Yarn 4 binary, committed so any Yarn on `PATH` delegates to the right version
- `app/` — the Vite + React + TypeScript application (`@portfolio/app`)
  - `src/content/` — typed content data (career roles, capability/stack cards, Sentinel story) kept separate from presentation
  - `src/components/` — presentational and section components, including the shared `CardCarousel` used by both the capability and technology-stack sections
  - `src/hooks/` — single-purpose hooks (theme, scroll reveal, career timeline progress, animated metrics, pointer effects, print handling, media queries)
  - `src/styles/global.css` — the design system (tokens, layout, animation, print rules)
  - `public/` — static assets served as-is (favicon, OG card, manifest, robots.txt, sitemap.xml, `.nojekyll`)
- `.github/workflows/deploy.yml` — installs, lints, audits, builds, and deploys `app/dist` on every push to `master`
- `vercel.json` — build, caching, and header configuration for the Vercel deployment

## Architecture

The site moved from a dependency-free static build to Vite + React + TypeScript to support the 3D card carousel (Swiper's `cards` effect) on mobile, where capability and technology-stack cards render as a swipeable stack with full text always visible instead of a tap-to-expand accordion. Desktop keeps the original grid layout.

Content is modeled as typed data (`src/content/*.ts`) rather than duplicated JSX, so the same `CardCarousel` component renders both the "How I work" and "Technology constellation" sections — adding a new card set means adding data, not new carousel wiring.

## Deployment

The site is deployed twice from the same `master` branch.

### GitHub Pages (primary)

GitHub Actions builds the app on every push to `master` and publishes `app/dist` using the official `actions/deploy-pages` action. The repository's Pages source must be set to **GitHub Actions** (Settings → Pages → Source); it no longer serves static files directly from the branch root.

### Vercel

`vercel.json` at the repository root makes the Vercel build reproducible from source rather than dashboard settings:

- `installCommand`: `yarn install --immutable`
- `buildCommand`: `yarn build`
- `outputDirectory`: `app/dist`
- Hashed assets under `/assets/` get a one-year immutable cache; `index.html` is `no-cache` so a deploy never serves a stale document against new asset hashes
- Baseline security headers (`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`)

**The Vercel project's Root Directory must be the repository root, not `app/`.** Yarn's lockfile and `.yarnrc.yml` live at the root, so installing from inside `app/` would not resolve the workspace. Vercel only reads a `vercel.json` located in the configured Root Directory.

`index.html` sets its canonical URL to the GitHub Pages origin, so the Vercel deployment does not compete with it in search results.

### Analytics

Vercel Web Analytics is mounted through `app/src/components/VercelAnalytics.tsx` using the `@vercel/analytics/react` entrypoint (**not** `/next`, which requires `next/navigation`). It is skipped when the host ends in `github.io`, because the tracking script is served by Vercel's edge and would otherwise 404 on every Pages visit.

## Accessibility and performance

- Semantic landmarks and keyboard-accessible controls
- Visible focus states and a skip link
- `prefers-reduced-motion` support throughout, including the carousel
- Responsive navigation, layouts, and card presentation
- No inline secrets or third-party analytics
