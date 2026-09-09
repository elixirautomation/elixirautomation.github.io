# elixirautomation.github.io

Static portfolio for Abhilash Sharma, built as dependency-free HTML, CSS, and JavaScript for GitHub Pages.

## Local preview

```bash
python3 -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000).

## Structure

- `index.html` — semantic portfolio content and SEO metadata
- `styles.css` — responsive dark/light visual system, animation, and print rules
- `script.js` — theme, command palette, reveal motion, counters, navigation, and accessibility interactions
- `assets/favicon.svg` — site icon
- `assets/og-card.svg` — social sharing image
- `manifest.webmanifest` — install metadata
- `robots.txt` and `sitemap.xml` — crawler metadata

## Architecture choice

The site intentionally uses platform-native HTML, CSS, and JavaScript. The visual system and interactions do not require a framework, so the published GitHub Page has no bundle, dependency installation, hydration, or build pipeline. If the portfolio later gains routed case studies, a CMS, or shared interactive components, the sections can be migrated incrementally to Vite and React without changing the content model or visual tokens.

## Deployment

The repository is designed to publish directly from the default branch through GitHub Pages. No build step or package installation is required.

## Accessibility and performance

- Semantic landmarks and keyboard-accessible controls
- Visible focus states and a skip link
- `prefers-reduced-motion` support
- Responsive navigation and layouts
- No runtime dependencies or third-party JavaScript
