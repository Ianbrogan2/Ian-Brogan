# PROGRESS — ianbrogan.com build

## Status: CORE BUILD COMPLETE ✅

Last updated: Summer 2026 build session.

## Done ✅

- [x] CLAUDE.md, SPEC.md, PROGRESS.md, README.md, EDITING.md, MEDIA-TODO.md
- [x] content/README.md
- [x] Package.json, astro.config.ts, tsconfig.json
- [x] Tailwind CSS 4 design system (tokens, grain, typography, buttons)
- [x] `/content` editing system — all copy in YAML/MDX, zero hardcoded
- [x] `src/lib/content.ts` typed YAML loader
- [x] Astro Content Collections config for journal
- [x] Base.astro layout (SEO, OG, JSON-LD, View Transitions)
- [x] Nav component (sticky, scroll-frosted, mobile hamburger)
- [x] Footer component
- [x] Hero section (display type, two-column, duality chip, animations)
- [x] About section (two-column, pull-quote, facts row)
- [x] Journey section — stock-market SVG life graph
  - Catmull-Rom smooth path through milestones + noise points
  - Past = solid oxblood, future = dashed sage gradient
  - Scroll-driven stroke-dashoffset animation
  - Milestone markers with tooltip cards on hover/focus
  - Accessible data-table fallback
  - Reduced-motion: static drawn state
- [x] Portfolio section (three domains, asymmetric grids)
- [x] Investing section (text + philosophy sidebar)
- [x] Skills section (4-category matrix with level indicators)
- [x] Vision section (dark oxblood bg, schools + career arc)
- [x] Journal preview section
- [x] Contact section (channels + Formspree form)
- [x] /portfolio page
- [x] /journal index page
- [x] /journal/[slug] post page
- [x] /resume page (print-optimized CV)
- [x] /admissions page (noIndex, for college readers)
- [x] Custom 404 page (mini market line graphic)
- [x] 2 sample journal posts (voice: first-person, confident, human)
- [x] public/CNAME, public/.nojekyll, public/favicon.svg, public/robots.txt
- [x] sitemap via @astrojs/sitemap
- [x] Build succeeds (astro build)
- [x] TypeScript clean (tsc --noEmit)
- [x] Responsive: 375px, 1280px verified

## Manual steps remaining (Ian's TODO)

See README.md for the full numbered list. Key items:
1. [ ] Buy domain ianbrogan.com
2. [ ] Create GitHub repo + push (or `gh repo create`)
3. [ ] Enable GitHub Pages (Source: GitHub Actions)
4. [ ] Set DNS: A records + CNAME www
5. [ ] Add Formspree form ID to `src/components/Contact.astro` line `action="https://formspree.io/f/FORMSPREE_ID"`
6. [ ] Upload real photos to `/content/images/` and update paths in YAML files
7. [ ] Drop `public/resume.pdf` (actual resume file)

## Content TODOs (see MEDIA-TODO.md for full list)
- [ ] All images are placeholders — real photos needed from Ian
- [ ] Hero image: candid photo, warm light, workbench or outdoors
- [ ] About image: candid, not posed
- [ ] Portfolio: resin table, spoiler shelf, kinetic art, crochet, CTE work, food photos
- [ ] resume.pdf in /public

## Nice-to-have follow-ups
- [ ] OG image generator (Astro endpoint or static PNG)
- [ ] apple-touch-icon.png (128×128 minimum)
- [ ] Photo grade pass once real images arrive (unified warm treatment)
- [ ] Video loop in a section background if vineyard footage exists
