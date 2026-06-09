# SPEC.md — ianbrogan.com

Full specification in my own words, derived from the build prompt.

## What this site is

Ian Brogan's personal "brag-sheet" and living journal. Audience: college
admissions officers (Cal Poly SLO, UC Davis, UC Berkeley) and future career
contacts. The governing idea is a deliberate duality — Ian lives at the
intersection of financial precision and the warmth of craft and vineyards.
Every design decision should evoke that tension.

## Who Ian is (what the copy must convey)

- 17, rising senior, summer 2026
- Self-taught investor since age 10 — real account, real markets, taught himself
  from primary sources (financial statements, fund letters, Buffett)
- Career path: BlackRock internship → junior data analyst → senior data analyst
  → fund manager → retire to a vineyard
- ADHD framed as his greatest asset — the engine behind his range
- A medically necessary independent study year became a launchpad for
  self-teaching 3D design, printing, woodworking, and the full Adobe suite
- Lead Studio Director: TV/Film/Digital Media program
- Entrusted with ~$100K budget to revamp a CTE program (summer 2026)
- Self-taught advanced cooking and pastry — documents at @brogan.bites
- Made a handmade resin table and a self-designed, 3D-printed, vinyl-wrapped
  spoiler shelf

Hard rule: never publish specific dollar balances or investment returns.
Hard rule: no phone number anywhere.
Copy voice: first person, confident, specific, never cheesy or adjective-stuffed.

## Art direction (binding law)

"Markets & Vineyards" — two worlds in deliberate tension.
See `SKILL.md` (the installed `site-art-direction` skill) for the full law.

Key points:
- Fraunces variable serif for display headlines (with opsz axis)
- DM Sans for body text
- Palette: deep oxblood #6B1F2A, bone #F4EFE6, near-black ink #161311,
  antique gold #C9A227 (sparingly), vine-sage #4A5340
- Asymmetric editorial layouts — not centered, not symmetric grids
- Grain overlay on the body for texture and depth
- Real photos as the backbone — styled placeholders where missing, never
  illustrations or stock art
- Scroll-driven staggered reveal animations with slow exponential easing
- Reduced-motion respected throughout

## Pages

1. **/ (home)** — Hero + About + Journey + Portfolio (preview) + Investing + Skills + Vision + Journal preview + Contact
2. **/portfolio** — Full portfolio all three sections
3. **/journal** — Journal index
4. **/journal/[slug]** — Individual post
5. **/resume** — Print-optimized one-page CV, sourced from resume.yaml
6. **/admissions** — noIndex; same content reframed for UC/Cal Poly readers
7. **404** — Custom on-brand not-found page

## Journey section (centerpiece)

A literal stock-market equity curve SVG:
- X axis: age (10 to 55+)
- Y axis: growth index (starts 100, rises to ~3000 at vineyard)
- Past milestones: solid oxblood line, labeled data points
- Future projection: dashed line, hue drifts toward sage
- "NOW" vertical gold dashed marker at present age (17.5)
- Scroll-driven animation: stroke-dashoffset draw as you scroll
- Milestone markers reveal tooltip cards on hover/focus
- Accessible data-table fallback under a `<details>` element
- Reduced-motion: static fully-drawn state
- All data editable from content/journey.yaml

## Content/editing system

Every user-facing string and image path is in `/content`.
YAML for structured data, MDX for journal posts.
All YAML files are heavily commented with plain-English field descriptions.
Editing workflow: pencil icon on GitHub → commit → live in ~1 minute.
No local tools required for content updates.

## Technical requirements

- Astro 5, Tailwind CSS 4, TypeScript strict
- `astro.config.ts`: `site: "https://ianbrogan.com"`, no `base`
- `public/CNAME` = `ianbrogan.com`
- `public/.nojekyll`
- `.github/workflows/deploy.yml` using `withastro/action`
- Sitemap, robots.txt, JSON-LD Person schema, OG tags, favicon
- Semantic HTML, keyboard nav, focus states, WCAG AA contrast
- `prefers-reduced-motion` respected everywhere
- View Transitions for navigation
- Lazy image loading, no layout shift
- Self-hosted fonts (fontsource) — no Google Fonts runtime requests
