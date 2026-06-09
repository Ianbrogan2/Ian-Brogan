# CLAUDE.md — ianbrogan.com

## Stack
- **Astro 5** (static output, `astro build` → `dist/`)
- **Tailwind CSS 4** via `@tailwindcss/vite` (CSS-based config in `src/styles/global.css`)
- **TypeScript** (strict mode)
- **`@fontsource-variable/fraunces`** — display serif (self-hosted)
- **`@fontsource-variable/dm-sans`** — body sans (self-hosted)
- **`yaml`** npm package — reads `/content/*.yaml` at build time
- **Astro Content Collections** — journal posts from `/content/journal/*.mdx`
- **`@astrojs/sitemap`**, **`@astrojs/mdx`** integrations

## Commands
```bash
npm run dev        # dev server at http://localhost:4321
npm run build      # production build → dist/
npm run preview    # preview the dist/ build
npm run typecheck  # tsc --noEmit
```

## Architecture

### Content lives ONLY in `/content`
Every user-facing string and image path is in `/content`. Components contain zero hardcoded copy.

| File | What it drives |
|------|---------------|
| `content/site.yaml` | Meta, nav, contact, hero |
| `content/about.yaml` | About section |
| `content/journey.yaml` | Journey stock-market graph milestones |
| `content/portfolio.yaml` | Portfolio sections and items |
| `content/skills.yaml` | Skills matrix |
| `content/investing.yaml` | Investing section |
| `content/vision.yaml` | Vision/Goals section |
| `content/resume.yaml` | /resume and /admissions pages |
| `content/journal/*.mdx` | Blog posts |
| `content/images/` | All images |

### Content loading
Non-journal content: `src/lib/content.ts` reads YAML via the `yaml` package at build time.
Journal: Astro Content Collections with `glob()` loader, defined in `src/content/config.ts`.

### Pages
| Route | File |
|-------|------|
| `/` | `src/pages/index.astro` |
| `/portfolio` | `src/pages/portfolio.astro` |
| `/journal` | `src/pages/journal/index.astro` |
| `/journal/[slug]` | `src/pages/journal/[slug].astro` |
| `/resume` | `src/pages/resume.astro` |
| `/admissions` | `src/pages/admissions.astro` (noIndex) |
| `/404` | `src/pages/404.astro` |

## Art direction law
**Always obey the `site-art-direction` skill** for every visual decision. The governing concept is "Markets & Vineyards" — two worlds in deliberate tension. Key rules:
- Fraunces (display serif) for headlines, DM Sans for body — never Inter/Roboto
- Dominant bone background, oxblood accent, gold sparingly
- Asymmetric editorial layouts — never centered hero + 3 cards
- Grain/texture overlays, no flat fills
- Real photos backbone; styled placeholders with captions where missing
- Journey section = centerpiece stock-market SVG graph

## Deployment
- GitHub Pages, apex domain, `public/CNAME` = `ianbrogan.com`
- `public/.nojekyll` prevents Jekyll from breaking `_astro/` assets
- `astro.config.ts`: `site: "https://ianbrogan.com"`, NO `base` setting
- Deploy workflow: `.github/workflows/deploy.yml` (push to main → build → Pages)
- Node 22, `npm ci`, `npm run build`, upload `dist/` artifact
