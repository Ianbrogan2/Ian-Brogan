# Scholarship Rebrand Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reframe ianbrogan.com so its single purpose is winning college scholarships: fix live hard-rule violations, surface academic/leadership/service merit above the fold, turn Achievements into the centerpiece, add purposeful interactivity, and route the off-page funnel.

**Architecture:** Astro static site, content-driven. Copy and data live in `/content/*.yaml` and `/content/journal/*.mdx`, typed and loaded through `src/lib/content.ts`, rendered by `.astro` components in `src/components/` and pages in `src/pages/`. Styling is per-component `<style>` blocks plus `src/styles/global.css`. Interactivity is vanilla TS in component `<script>` blocks. No test framework exists, so each task's "test cycle" is: (a) grep guards for content rules, (b) `npm run typecheck` + `npm run build` for type/build safety, (c) Claude_Preview screenshots at 1280px and 375px for visual/interactive tasks.

**Tech Stack:** Astro 5/6, TypeScript (strict), YAML content, MDX (journal), Tailwind v4 (via vite plugin) + custom CSS variables, Fraunces + DM Sans variable fonts, sharp.

## Global Constraints

Every task implicitly includes these. Copied verbatim from the spec's Hard Rules:

- No phone number anywhere on the site.
- No specific dollar amounts, balances, returns, or income; the program budget is the word "six-figure" only, never a number.
- Family-mentored framing only; never "self-taught" / "self-teaching" / "self-directed" in body copy or tags.
- BlackRock stays soft: aunt "used to work there and still has connections that can open the door"; never "works there" / "securing a job".
- No em dashes (U+2014 `—`) anywhere. Use commas, colons, or periods.
- Keep the Markets & Vineyards color scheme and aesthetic. This is content/IA/interactivity, not a visual restyle. Colors: `--color-bg #080809`, `--color-gold #C9A227`, cream text `#EDE8DF`. Display font Fraunces, body DM Sans.
- Real figures, verbatim: GPA 4.22 weighted / 3.81 unweighted; Class Rank 84 of 632 (present as "Top 14%"); 130+ community service hours (100 ENN / 30 elementary); minor = Data Analytics + Viticulture & Enology; CTE relaunch is in progress (present tense), never "shipped" or future-dated.
- Verification project commands: `npm run typecheck`, `npm run build`. Dev preview via Claude_Preview MCP (`preview_start`, then `preview_screenshot`/`preview_resize`).

---

## File Structure

Files created or modified, grouped by responsibility:

**Content (copy + data):**
- `content/journal/learning-the-market-at-ten.mdx` — remove em dashes + self-taught tag (Task 1, 2)
- `content/journal/the-year-i-built-things.mdx` — remove em dashes + self-taught language; tighten health framing (Task 1, 2, 5)
- `content/journey.yaml` — remove self-teaching/self-directed; present-tense CTE; reframe milestones to scholarship arc (Task 2, 5, 16)
- `content/resume.yaml` — fix minor; reorder is in component; present-tense CTE; add website field (Task 4, 5, 11)
- `content/vision.yaml` — minor fix; schools framing; soft BlackRock (Task 4, 15)
- `content/site.yaml` — hero copy fields if hero reads from here; tagline (Task 6)
- `content/about.yaml` — roots note + front-load (Task 10)
- `content/achievements.yaml` — layer-cake + R/D/R + ENN before/after + biliteracy + service reframe + decoded Seal + grade labels (Task 8)
- `content/investing.yaml`, `content/skills.yaml` — artifact-led summaries, family-mentored (Task 14)

**Library / types:**
- `src/lib/content.ts` — extend `AchievementsData`, `ResumeData`, `JourneyData` interfaces as needed (Task 8, 11, 16)

**Components:**
- `src/components/Hero.astro` — rebuild copy, remove fake data, fix stats, CTAs (Task 3, 6)
- `src/components/CredentialsStrip.astro` — NEW: 4-stat strip (Task 7)
- `src/components/EnnProofBlock.astro` — NEW: ENN leadership band for Home (Task 7)
- `src/components/Achievements.astro` — expandable timeline, Seal modal, badges, rank, service (Task 9)
- `src/components/BeforeAfterSlider.astro` — NEW: drag-to-compare (Task 17)
- `src/components/Journey.astro` — reuse on Achievements; ensure mountable standalone (Task 16)
- `src/components/Investing.astro`, `src/components/Skills.astro` — artifact summaries (Task 14)

**Pages:**
- `src/pages/index.astro` — section order: hero, credentials, ENN, investing teaser, goal (Task 7)
- `src/pages/achievements.astro` — mount Journey + slider + scroll-spy sub-nav + progress bar (Task 9, 16, 17, 18)
- `src/pages/resume.astro` — section reorder + Download button wiring (Task 11)
- `src/pages/portfolio.astro` — remove placeholders, ENN flagship, verify links (Task 12)
- `src/pages/vision.astro` — schools above fold (Task 15)
- `src/pages/contact.astro` — reciprocal IG links (Task 20)

**Styles / assets:**
- `src/styles/global.css` — `:focus-visible`, scroll-progress utility (Task 19)
- `public/resume.pdf` — NEW one-page resume (Task 11)
- `public/og-image.png` — verify it renders (already exists) (Task 20)

**Build guard:**
- `package.json` — add a `guard` script grepping for U+2014 and banned phrases (Task 1)

---

# PHASE 1 — Tier 1: Compliance (verified live violations)

### Task 1: Strip em dashes from journal posts + add a build guard

**Files:**
- Modify: `content/journal/the-year-i-built-things.mdx` (11 em dashes), `content/journal/learning-the-market-at-ten.mdx` (description line + 6 in body)
- Modify: `package.json` (add guard script)

**Interfaces:**
- Produces: a `npm run guard` script other tasks run as a regression check.

- [ ] **Step 1: Find every em dash**

Run: `cd "/Users/ianbrogan/Documents/ENN WEBSITE/Ian Brogan" && grep -rn $'—' content/`
Expected: lines in the two journal MDX files (and confirm nowhere else).

- [ ] **Step 2: Rewrite each em-dash sentence** in both MDX files, replacing `—` with a comma, colon, or period and adjusting wording so it reads naturally. Example rewrites (apply the same approach to all occurrences):
  - `setback — and an unexpected answer` → `setback. It turned into the most productive stretch of my life, and an unexpected answer to a question I didn't know I was asking.`
  - `navigate around — it was disruptive` → `navigate around. It was disruptive`
  - `the same loop I'd learned in investing — form a thesis` → `the same loop I'd learned in investing: form a thesis`
  - `That feeling —` → `That feeling,`
  - `naturally to me — but which I've learned` → `naturally to me, but which I've learned`
  - `every decision I made — the ones` → `every decision I made, the ones`
  - `taking a class — I was watching` → handled in Task 2 (rewritten away from self-teaching)
  - `a deficit of attention — that's not quite right` → `a deficit of attention. That is not quite right`
  - `a detour — I'm not recommending` → `a detour. I am not recommending`
  - `optionality — that time spent` → `optionality: that time spent`

- [ ] **Step 3: Add the guard script** to `package.json` scripts block:

```json
"guard": "! grep -rIn $'\\u2014' content/ src/ && ! grep -rInE 'self-taught|self-teaching|self-directed' content/journal src/ content/journey.yaml && echo 'guard passed'"
```

- [ ] **Step 4: Run the guard for em dashes**

Run: `cd "/Users/ianbrogan/Documents/ENN WEBSITE/Ian Brogan" && grep -rn $'—' content/ || echo "no em dashes"`
Expected: `no em dashes`

- [ ] **Step 5: Commit**

```bash
git add -A 2>/dev/null; echo "(repo not git-tracked; skip commit, rely on file saves)"
```
Note: this project is not a git repo. Treat each "Commit" step as a checkpoint marker; if `git` is later initialized, run the shown `git add`/`git commit`.

---

### Task 2: Remove "self-taught" framing everywhere; rewrite to family/observed-learning

**Files:**
- Modify: `content/journal/learning-the-market-at-ten.mdx` (frontmatter tag line 5)
- Modify: `content/journal/the-year-i-built-things.mdx` (body: "I wasn't taking a class — I was watching tutorials", "learning by trying")
- Modify: `content/journey.yaml:31` ("a launchpad for self-teaching design"), `:43` ("all self-directed")

- [ ] **Step 1: Locate occurrences**

Run: `grep -rInE 'self-taught|self-teaching|self-directed' content/`
Expected: tag in `learning-the-market-at-ten.mdx`, two lines in `journey.yaml`, body line(s) in `the-year-i-built-things.mdx`, plus the hard-rule comment lines in resume/about/investing (leave comments alone).

- [ ] **Step 2: Edit the journal tag** in `learning-the-market-at-ten.mdx` line 5:

From: `tags: ["investing", "markets", "self-taught"]`
To: `tags: ["investing", "markets", "family-mentored"]`

- [ ] **Step 3: Rewrite journey.yaml lines 31 and 43** (final copy also adjusted in Task 16, but make it rule-compliant now):

Line 31 from `"A medical pivot, not a setback. It became a launchpad for self-teaching design, 3D printing, and craft."`
to `"A medical pivot, not a setback. It became the year I went deep on design, 3D printing, and craft."`

Line 43 from `"...Mastered the full Adobe suite, all self-directed."`
to `"...Built real fluency across the full Adobe suite."`

- [ ] **Step 4: Rewrite the journal body** in `the-year-i-built-things.mdx`:

`I wasn't taking a class — I was watching tutorials until I understood the underlying principles, then going off-tutorial and learning by trying.`
to `I learned the way I learn best: following tutorials until the underlying principles clicked, then going off-tutorial to test what I understood.`

- [ ] **Step 5: Run the guard**

Run: `cd "/Users/ianbrogan/Documents/ENN WEBSITE/Ian Brogan" && grep -rInE 'self-taught|self-teaching|self-directed' content/journal content/journey.yaml || echo "clean"`
Expected: `clean`

- [ ] **Step 6: Checkpoint commit** (see Task 1 note).

---

### Task 3: Remove fabricated market data from the hero

**Files:**
- Modify: `src/components/Hero.astro:22-30` (the three `.data-chip` divs), and the related CSS (`:154-177`) and reduced-motion reference (`:368`) if chips removed.

**Interfaces:**
- Produces: a hero background with no fabricated quotes. The decorative `.hero-chart` SVG line (abstract, no numbers) MAY stay as texture since it shows no data values.

- [ ] **Step 1: Delete the three data-chip divs** (`src/components/Hero.astro` lines 22-30), leaving the `.hero-grid` and `.hero-chart` in `.hero-bg`. The abstract gold line has no axis labels or numbers, so it is not fabricated data; keep it.

- [ ] **Step 2: Remove now-dead CSS**: delete `.data-chip`, `.chip-a/b/c`, `.chip-dot*` rules (lines ~154-177) and remove `.data-chip` from the reduced-motion selector list (line ~368) and the `@media (max-width: 900px) { .data-chip { display:none } }` rule (line ~377).

- [ ] **Step 3: Typecheck + build**

Run: `cd "/Users/ianbrogan/Documents/ENN WEBSITE/Ian Brogan" && npm run typecheck && npm run build`
Expected: build completes with no errors referencing `data-chip`.

- [ ] **Step 4: Visual check** via Claude_Preview: `preview_start`, screenshot Home at 1280px. Expected: hero shows the name, no floating "S&P 500 / VIX / 10Y TSY" chips.

- [ ] **Step 5: Checkpoint commit.**

---

### Task 4: Fix the fabricated minor (Data Analytics + Viticulture & Enology)

**Files:**
- Modify: `content/resume.yaml:29`
- Modify: `content/vision.yaml` (school program notes / any "Excel Modeling" mention)

- [ ] **Step 1: Grep for the bad minor**

Run: `grep -rn "Excel Modeling" content/`
Expected: `resume.yaml:29` and possibly `vision.yaml`.

- [ ] **Step 2: Edit `resume.yaml:29`**

From: `minors: "Data Analytics & Excel Modeling; weighing Viticulture & Enology or Film/Production"`
To: `minors: "Data Analytics and Viticulture & Enology"`

- [ ] **Step 3: Edit any `vision.yaml`** occurrence of "Excel Modeling" to "Data Analytics" (the program names in vision are per-school; keep "Business Economics + Data Analytics" and where a vineyard minor fits use "Viticulture & Enology").

- [ ] **Step 4: Verify gone**

Run: `grep -rn "Excel Modeling" content/ || echo "clean"`
Expected: `clean`

- [ ] **Step 5: Checkpoint commit.**

---

### Task 5: Tighten the health-year post + present-tense the CTE relaunch

**Files:**
- Modify: `content/journal/the-year-i-built-things.mdx` (description + opening)
- Modify: `content/journey.yaml:55` ("launching summer 2026"), `:60` ("Present, Summer 2026")
- Modify: `content/resume.yaml:79` (Summer 2026 experience entry)

- [ ] **Step 1: Tighten the journal description** (frontmatter) to one factual sentence plus output, no em dash (coordinate with Task 1):

To: `description: "A medical year on independent study became the most productive stretch of my life: the year I learned to design, build, and finish real things."`

- [ ] **Step 2: Present-tense the CTE claim in `journey.yaml:55`**

From: `"Entrusted with a six-figure budget to overhaul a CTE program launching summer 2026."`
To: `"Entrusted with a six-figure budget to lead my school's CTE broadcast program through a full relaunch, the work I'm leading right now."`

- [ ] **Step 3: Fix `journey.yaml:60`** label/description so "Present" reads as current ongoing leadership, not a finished launch. Set the description to `"Leading the ENN Studios relaunch and building toward college."`

- [ ] **Step 4: Fix `resume.yaml:79`** "CTE Program Revamp, Lead / Summer 2026" so the bullet reads present-progressive, e.g. bullet: `"Leading a six-figure relaunch of the school's CTE broadcast program: curriculum, equipment, and brand identity (in progress, 2026)."`

- [ ] **Step 5: Build**

Run: `cd "/Users/ianbrogan/Documents/ENN WEBSITE/Ian Brogan" && npm run build`
Expected: success.

- [ ] **Step 6: Checkpoint commit.**

---

# PHASE 2 — Tier 2: Above-the-fold value + the centerpiece

### Task 6: Hero rebuild (scholarship-legible)

**Files:**
- Modify: `src/components/Hero.astro` (kicker line 38, essay 48-62, CTAs 65-69, stats 72-87, mobile padding 382)

**Interfaces:**
- Consumes: `site.contact.email`.
- Produces: a hero whose first screen states major + signature achievement; a "Download Resume" CTA pointing to `/resume.pdf` (created in Task 11; link can exist before the file, but verify after Task 11).

- [ ] **Step 1: Replace the kicker** (line 38) from `Finance · Economics · Markets` to `Student · Leader · Investor`.

- [ ] **Step 2: Replace the two-paragraph essay** (`.hero-essay`, lines 48-62) with a tight value prop + trajectory line:

```html
<div class="hero-essay">
  <p class="hero-valueprop">
    Senior heading into Business Economics. Studio Director leading a
    six-figure rebrand of my school's broadcast program, with a 4.22 GPA
    and the Golden State Seal Merit Diploma behind it.
  </p>
  <p class="hero-trajectory">
    Investing since age ten, building since freshman year, aimed at a career
    in fund management.
  </p>
</div>
```

- [ ] **Step 3: Replace the CTAs** (lines 65-69) with two primary paths plus a resume download:

```html
<div class="hero-cta">
  <a href="/achievements" class="btn btn-primary btn-mag">My Achievements</a>
  <a href="/about" class="btn btn-outline-light btn-mag">My Story</a>
  <a href="/resume.pdf" class="btn btn-ghost" target="_blank" rel="noopener">Download Resume</a>
</div>
```

- [ ] **Step 4: Fix the stats bar** (lines 72-87). Remove the "Hedge Fund / Management goal" stat. Keep the two count-up stats but replace the third with a credential. New third stat (static, no count-up):

```html
<div class="hstat">
  <span class="hstat-num">Top 14%</span>
  <span class="hstat-label">Class rank, 84 of 632</span>
</div>
```
(Leave the "7 / Years in markets" and "17 / Years old" count-ups; they are facts, not fabricated data.)

- [ ] **Step 5: Reduce mobile top padding** (line 382) from `padding-top: 11rem;` to `padding-top: 7.5rem;` so the credential-bearing hero fits the first phone screen. Also remove the line that hides the third CTA on mobile (`.hero-cta .btn:last-child { display: none; }`, line 384) so Download Resume stays reachable; instead let CTAs wrap.

- [ ] **Step 6: Typecheck + build + preview** Home at 1280px and 375px.
Run: `npm run typecheck && npm run build`
Expected: pass; screenshots show major + achievement legible in the first screen on both sizes.

- [ ] **Step 7: Checkpoint commit.**

---

### Task 7: Home credentials strip + ENN proof block + section reorder

**Files:**
- Create: `src/components/CredentialsStrip.astro`
- Create: `src/components/EnnProofBlock.astro`
- Modify: `src/pages/index.astro` (section order)
- Read: `content/achievements.yaml` (source the stats so they never drift)

**Interfaces:**
- Consumes: `getAchievements().stats` for the strip.
- Produces: `<CredentialsStrip />` and `<EnnProofBlock />` usable on any page.

- [ ] **Step 1: Create `src/components/CredentialsStrip.astro`** rendering four static stats from `achievements.yaml` (no count-up), left-aligned, hairline gold dividers:

```astro
---
import { getAchievements } from '../lib/content';
const { stats } = getAchievements();
---
<section class="cred-strip" aria-label="Credentials at a glance">
  <ul class="cred-grid" role="list">
    {stats.map((s) => (
      <li class="cred">
        <span class="cred-value">{s.value}</span>
        <span class="cred-label">{s.label}</span>
        {s.sublabel && <span class="cred-sub">{s.sublabel}</span>}
      </li>
    ))}
  </ul>
</section>
<style>
  .cred-strip { border-block: 1px solid var(--color-border); background: var(--color-surface); }
  .cred-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--color-border);
    list-style: none; margin: 0; padding: 0; max-width: 1320px; margin-inline: auto; }
  .cred { background: var(--color-bg); padding: clamp(1.25rem,3vw,2rem) clamp(1rem,2vw,1.5rem);
    display: flex; flex-direction: column; gap: 0.3rem; }
  .cred-value { font-family: var(--font-display); font-weight: 700; color: var(--color-gold);
    font-size: clamp(1.4rem,3vw,2.2rem); line-height: 1.05; }
  .cred-label { font-size: 0.78rem; color: var(--color-text); font-weight: 600; }
  .cred-sub { font-size: 0.72rem; color: var(--color-muted); }
  @media (max-width: 760px) { .cred-grid { grid-template-columns: repeat(2,1fr); } }
</style>
```

- [ ] **Step 2: Confirm `achievements.yaml` stats use "Top 14%"** (the third stat). If it still says rank without percentile, update the `stats` entry to `value: "Top 14%"`, `label: "Class Rank"`, `sublabel: "84 of 632"` (full content rewrite is Task 8; this keeps the strip correct meanwhile).

- [ ] **Step 3: Create `src/components/EnnProofBlock.astro`** (leadership band; budget as word only; one artifact image slot with placeholder + alt describing the needed shot):

```astro
---
// Static leadership proof band for the homepage.
---
<section class="enn-proof" aria-labelledby="enn-proof-h">
  <div class="container enn-proof-inner">
    <div class="enn-proof-text">
      <span class="eyebrow">Leadership</span>
      <h2 id="enn-proof-h">Lead Studio Director, then President of ENN Studios.</h2>
      <p>
        I'm leading a six-figure relaunch of my school's broadcast program:
        a new logo set, an on-air graphics system, a standardized production
        workflow, and the program's website. It's the work I'm proudest of,
        and the next class inherits the systems I built.
      </p>
      <a href="/achievements" class="btn btn-primary">See the full record</a>
    </div>
    <figure class="enn-proof-art">
      <img src="/content/images/enn-flagship-placeholder.jpg"
           alt="PLACEHOLDER, replace with a real ENN broadcast frame or the new graphics package"
           width="640" height="420" loading="lazy" />
    </figure>
  </div>
</section>
<style>
  .enn-proof { background: var(--color-bg); border-bottom: 1px solid var(--color-border); }
  .enn-proof-inner { display: grid; grid-template-columns: 1.2fr 1fr; gap: clamp(2rem,5vw,5rem);
    align-items: center; padding-block: clamp(3rem,6vw,6rem); }
  .enn-proof-text h2 { font-family: var(--font-display); color: var(--color-text);
    font-size: clamp(1.6rem,3vw,2.4rem); line-height: 1.2; margin: 0.75rem 0 1rem; }
  .enn-proof-text p { color: var(--color-text-dim); line-height: 1.7; margin-bottom: 1.75rem; max-width: 52ch; }
  .enn-proof-art img { width: 100%; height: auto; border: 1px solid var(--color-border); object-fit: cover; }
  @media (max-width: 820px) { .enn-proof-inner { grid-template-columns: 1fr; } }
</style>
```

- [ ] **Step 4: Reorder `src/pages/index.astro`** so the body order is: `<Hero />`, `<CredentialsStrip />`, `<EnnProofBlock />`, then the existing "Goal" section (move it below). Import the two new components at the top.

- [ ] **Step 5: Typecheck + build + preview** Home at 1280px and 375px.
Expected: hero → credentials strip → ENN proof → goal. On mobile the strip is 2x2.

- [ ] **Step 6: Checkpoint commit.**

---

### Task 8: Achievements content rebuild (data layer)

**Files:**
- Modify: `content/achievements.yaml` (stats incl. decoded Seal + Top 14%; leadership R/D/R fields + grade labels + ENN before/after + why-it-mattered; coursework counts implicit; biliteracy; service reframe)
- Modify: `src/lib/content.ts` (`AchievementsData` interface: add `responsibility`/`decision`/`result`/`grade`/`whyItMattered` to leadership entries; add `beforeAfter` to the ENN entry; add a `biliteracy` field; add `sealCriteria`)

**Interfaces:**
- Produces: the typed shape the Achievements component (Task 9) consumes. Exact additions:
  - `leadership[]` gains: `grade: string`, `responsibility: string`, `decision: string`, `result: string`, `whyItMattered?: string`, and for ENN `beforeAfter?: { before: string; after: string }`.
  - top-level gains: `sealCriteria: string`, `biliteracy: string`.

- [ ] **Step 1: Extend the interface** in `src/lib/content.ts` `AchievementsData`:

```ts
export interface AchievementsData {
  headline: string; subhead: string;
  stats: { value: string; label: string; sublabel?: string }[];
  sealCriteria: string;
  biliteracy: string;
  leadership: {
    years: string; grade: string; role: string; org: string;
    description: string;
    responsibility: string; decision: string; result: string;
    whyItMattered?: string;
    beforeAfter?: { before: string; after: string };
  }[];
  coursework: { ap: string[]; honors: string[]; cte: string[] };
  service: { headline: string; items: { hours: string; role: string; description: string }[] };
  closing: string;
}
```

- [ ] **Step 2: Update `stats` in `achievements.yaml`** so the third stat is `value: "Top 14%"`, `label: "Class Rank"`, `sublabel: "84 of 632"`; keep GPA, service hours, Golden State Seal. Add the decoded Seal as a top-level field:

```yaml
sealCriteria: "A California State Board of Education honor for demonstrating B+ or higher mastery across six core subject areas."
biliteracy: "Bilingual through my school's Dual Language Immersion pathway since elementary school, plus AP Spanish Language. I served as Vice President of the DLI Club my freshman year."
```

- [ ] **Step 3: Rewrite each `leadership` entry** with grade label and three beats. Use these exact values (verb-led, no em dashes, budget as word only):

```yaml
leadership:
  - years: "2022 to 2023"
    grade: "Freshman"
    role: "Vice President"
    org: "Dual Language Immersion Club"
    description: "Helped lead the club's events and fundraising as a freshman."
    responsibility: "Stepped into a leadership seat as a freshman in the immersion program I'd been part of since elementary school."
    decision: "Organized club events and ran fundraising so the program had the resources to keep growing."
    result: "Built early experience leading peers and raising money, the same skills I'd later use running a studio."
  - years: "2023 to 2024"
    grade: "Sophomore"
    role: "Independent Study"
    org: "A medical year, on my own schedule"
    description: "Completed most of the year via independent study due to a health complication, and stayed on track."
    responsibility: "Kept my academics moving through a health complication with no normal class schedule."
    decision: "Held a full course load on independent study and went deep on design, CAD, and making in the time I had."
    result: "Held a 4.22 weighted GPA and earned the Golden State Seal Merit Diploma without missing a step."
  - years: "2024 to 2025"
    grade: "Junior"
    role: "Lead Studio Director"
    org: "ENN Studios (Eastlake News Network)"
    description: "Promoted to lead director of the daily broadcast."
    responsibility: "Took over daily production for the school's broadcast program."
    decision: "Directed, edited, color graded, and ran audio and graphics for every episode, and set the production standard."
    result: "Raised the quality bar of the daily broadcast and earned the trust that led to the presidency."
  - years: "2025 to 2026"
    grade: "Senior"
    role: "President"
    org: "ENN Studios (Eastlake News Network)"
    description: "Leading a six-figure relaunch of the program."
    responsibility: "Entrusted as president with a six-figure budget to relaunch the entire CTE broadcast program."
    decision: "Rebuilt the program's identity and systems: a new logo set, an on-air graphics system, a standardized production workflow, and a new program website."
    result: "Shipping a relaunched program this year, with repeatable systems the next class can operate. Owning a rebuild this size taught me to think in systems, the same way I think about markets."
    whyItMattered: "This is where my two worlds met: the design eye and the systems thinking I use on a portfolio, applied to building something real that outlasts me."
    beforeAfter:
      before: "Inherited: an aging identity, ad hoc graphics, and no standard workflow."
      after: "Relaunched: a unified logo set, a reusable on-air graphics system, a documented production pipeline, and a live program website."
```

- [ ] **Step 4: Reframe `service`** to lead with concentration and impact:

```yaml
service:
  headline: "130+ service hours, 100 of them on one program"
  items:
    - hours: "100 hours"
      role: "ENN Studios rebuild"
      description: "Most of my service went into rebuilding the broadcast program: graphics, systems, and an identity the next class inherits."
    - hours: "30 hours"
      role: "Elementary school, a return to roots"
      description: "Volunteered back at my old elementary school, the same place my Dual Language Immersion path began."
```

- [ ] **Step 5: Typecheck + build**
Run: `npm run typecheck && npm run build`
Expected: pass (component still renders old shape until Task 9; if build errors on missing fields in the component, proceed to Task 9 which consumes them).

- [ ] **Step 6: Checkpoint commit.**

---

### Task 9: Achievements component (interactive centerpiece)

**Files:**
- Modify: `src/components/Achievements.astro`

**Interfaces:**
- Consumes: `AchievementsData` from Task 8 (`sealCriteria`, `biliteracy`, leadership `grade`/`responsibility`/`decision`/`result`/`whyItMattered`/`beforeAfter`).
- Produces: the rendered centerpiece; a reusable `.am-modal` pattern (mirrors `Skills.astro`).

- [ ] **Step 1: Render the stat strip** as the page hero block (static, left-aligned). Make the Golden State Seal stat a button that opens a modal showing `data.sealCriteria`. Reuse the modal markup/scripting pattern from `src/components/Skills.astro` (button + `role="dialog"`, Escape + backdrop close, `aria-expanded`).

- [ ] **Step 2: Add coursework count badges** to each group header: render `AP {ap.length}`, `Honors {honors.length}`, `CTE {cte.length}`. Under the CTE group add a caption: `California Arts, Media & Entertainment (AME) pathway`.

- [ ] **Step 3: Add the biliteracy credential** as its own small card near coursework, rendering `data.biliteracy`.

- [ ] **Step 4: Render the leadership timeline as layer-cake + expandable.** For each entry show a header row (`{role} · {org}` + `{grade}, {years}`) and the one-line `description` always visible. Add a "View case study" button that opens a modal containing the three beats labeled RESPONSIBILITY / DECISION & ACTION / RESULT, the optional `whyItMattered` line, and for the entry with `beforeAfter` a two-column Before/After panel. Code for the expandable controller (vanilla TS, keyboard accessible, reduced-motion safe):

```html
<script>
  const cards = document.querySelectorAll<HTMLElement>('.am-case');
  cards.forEach((card) => {
    const btn = card.querySelector<HTMLButtonElement>('.am-case-toggle');
    const panel = card.querySelector<HTMLElement>('.am-case-panel');
    if (!btn || !panel) return;
    btn.addEventListener('click', () => {
      const open = card.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
      panel.hidden = !open;
    });
  });
</script>
```
Each `.am-case-panel` starts with the `hidden` attribute; `.am-case.open .am-case-panel` is shown via removing `hidden`. The header text (role, org, grade, one-line description) is always visible so a no-click scan still conveys the arc.

- [ ] **Step 5: Update the service section** to render `service.headline` and the two items (100/30) with the "30 required" note retained.

- [ ] **Step 6: Typecheck + build + preview** `/achievements` at 1280px and 375px. Interact: click a case-study toggle (screenshot open state), click the Seal stat (screenshot modal). Verify keyboard: Tab to a toggle, Enter opens, Escape closes the Seal modal.
Run: `npm run typecheck && npm run build`
Expected: pass; screenshots show layer-cake headers, badges, expandable case studies, Before/After panel on the ENN entry.

- [ ] **Step 7: Checkpoint commit.**

---

# PHASE 3 — Tier 3: Profile assets, artifacts, verification, funnel

### Task 10: About roots note + front-loaded opening

**Files:**
- Modify: `content/about.yaml`

- [ ] **Step 1: Front-load the opening** so the first body paragraph leads with identity + the strongest signal, not throat-clearing. Keep the established voice.

- [ ] **Step 2: Add a "roots" block** (new body paragraph or a `roots:` field rendered on the About page) using only confirmed facts, asset-framed, no sympathy tone:

```yaml
# add as a new body paragraph
- "My roots run through a few communities at once. I'm Spanish, Mexican, Irish, and German, I grew up in a Dual Language Immersion program I later helped lead, and I spend Friday nights with my community at Ohr Shalom. My grandfather served in the U.S. Air Force, and my dad is a civilian mechanical engineer who works on Navy programs. All of it is part of how I see the world."
```

- [ ] **Step 3: Confirm no first-gen implication** anywhere (mother is a counselor). Grep About for any "first generation" phrasing and remove if present.

- [ ] **Step 4: Build + preview** `/about`. Expected: roots paragraph renders, opening leads strong.

- [ ] **Step 5: Checkpoint commit.**

---

### Task 11: Resume page reorder + real downloadable PDF

**Files:**
- Modify: `src/pages/resume.astro` (section order: Education, Honors & Awards, Activities & Community Service, Experience, Skills, Projects, Interests; keep raw "84/632" on print)
- Modify: `content/resume.yaml` (add `website` + ensure contact has no phone)
- Create: `public/resume.pdf`

- [ ] **Step 1: Reorder the resume sections** in `src/pages/resume.astro` so Honors & Awards and Activities & Community Service render immediately after Education and before Experience. (These sections already exist from prior work; move the JSX blocks.)

- [ ] **Step 2: Keep raw rank on the resume.** On the resume page the rank stays "84 of 632" (formal documents expect the fraction); the "Top 14%" framing is web-only. Verify `resume.yaml` education note reads "GPA 4.22 weighted / 3.81 unweighted, Class Rank 84/632".

- [ ] **Step 3: Add a rendered `website` line** to the resume contact block in `resume.astro`: `<span>ianbrogan.com</span>` as plain text plus a link, so it survives PDF export.

- [ ] **Step 4: Generate `public/resume.pdf`.** Use the print view: `preview_start`, open `/resume`, and produce a one-page PDF (via the browser print-to-PDF on the print-optimized `/resume` route which already has `@media print` styles). Save to `public/resume.pdf`. Verify: no phone number, no dollar figures, "six-figure" wording only, plain-text `ianbrogan.com` visible.

- [ ] **Step 5: Verify the hero Download button** (Task 6) resolves: build, then confirm `/resume.pdf` is served (file exists in `public/`).
Run: `ls "/Users/ianbrogan/Documents/ENN WEBSITE/Ian Brogan/public/resume.pdf"`
Expected: path prints.

- [ ] **Step 6: Checkpoint commit.**

---

### Task 12: Portfolio fixes (remove placeholders, ENN flagship, verify links)

**Files:**
- Modify: `src/pages/portfolio.astro` and/or `content/portfolio.yaml`

**Interfaces:**
- Consumes: `getPortfolio()`.

- [ ] **Step 1: Audit live tiles.** Grep `content/portfolio.yaml` for `placeholder` images and empty `video_url:` fields.
Run: `grep -nE "placeholder|video_url: \"\"|video_url: ''" content/portfolio.yaml`

- [ ] **Step 2: Remove or hide** any item whose only image is a placeholder AND has no real media, so no "coming soon" / dead play icon shows a reviewer. If an item has a real description but no asset, render it as a text-only card (no broken image/video), not a placeholder tile.

- [ ] **Step 3: Lead with the ENN flagship.** Reorder so the ENN broadcast project is the first portfolio item, with its real reel `video_url` when available (asset dependency, Task 15-assets). Until the reel exists, render the ENN item as a text + outcome card linking to the live ENN channel.

- [ ] **Step 4: Add "verify" links** on marquee items: ENN broadcast/channel URL, @brogan.bites, school CTE page. Use `target="_blank" rel="noopener"`.

- [ ] **Step 5: Build + preview** `/portfolio`. Expected: no placeholder/broken tiles; ENN leads; outbound links work.

- [ ] **Step 6: Checkpoint commit.**

---

### Task 13: Cross-page consistency audit

**Files:**
- Read across: `content/*.yaml`, `content/journal/*.mdx`

- [ ] **Step 1: Grep for drift.**
Run: `grep -rniE "131|hedge fund|works at blackrock|self-taught|\\\$[0-9]|100,000|220" content/ src/`
Expected: no `131` (must be "130+"), no "hedge fund", no "works at BlackRock", no dollar figures, no income.

- [ ] **Step 2: Normalize the ENN title sequence** (Lead Studio Director → President), the dates, "six-figure", "4.22"/"Top 14%"/"84 of 632", and "130+" so they match across Portfolio, Achievements, Resume, About, Vision, Journey.

- [ ] **Step 3: Re-run the guard** (`npm run guard`) and the drift grep. Expected: clean.

- [ ] **Step 4: Checkpoint commit.**

---

### Task 14: Skills + Investing artifact-led summaries

**Files:**
- Modify: `content/skills.yaml` (ensure each visible item leads with a made object where possible; family-mentored)
- Modify: `content/investing.yaml` (holding blurbs lead with process/artifact; family-mentored)
- Modify: `src/components/Skills.astro` / `src/components/Investing.astro` only if a summary line needs surfacing outside the modal/tooltip

- [ ] **Step 1: Investing** — confirm each holding blurb and the body lead with a concrete process/artifact ("reads 10-Ks and earnings calls", "family-mentored brokerage account since age 10"); confirm zero dollar/return figures and zero "self-taught".

- [ ] **Step 2: Skills** — for each skill, ensure the always-visible card carries a one-line artifact hook (the modal `detail` already has depth); if the component only shows the name, add a short `summary` surfaced on the card. Lead with the made object, not an adjective.

- [ ] **Step 3: Add one framing connector line** per cluster tying it to the markets+making thesis (e.g., an intro line on Investing/Skills pages).

- [ ] **Step 4: Build + preview** `/skills` and `/investing`. Expected: artifact-led summaries visible without interaction.

- [ ] **Step 5: Checkpoint commit.**

---

### Task 15: Vision page (schools above the fold)

**Files:**
- Modify: `src/pages/vision.astro`, `content/vision.yaml`

- [ ] **Step 1: Raise the three target schools + programs** above the fold (render the schools block first, before the long career arc). Add a quiet line "Applying fall 2026."

- [ ] **Step 2: Minor consistency** — Data Analytics + Viticulture & Enology (per Task 4); the vineyard minor naturally fits UC Davis.

- [ ] **Step 3: Keep BlackRock soft** — confirm `vision.yaml` career arc says aunt "used to work there and still has connections that can open the door".

- [ ] **Step 4: Build + preview** `/vision` at 1280px and 375px. Expected: schools visible first.

- [ ] **Step 5: Checkpoint commit.**

---

# PHASE 4 — Tier 4: Interactivity, accessibility, funnel

### Task 16: Surface + reframe the Journey equity-curve graph onto Achievements

**Files:**
- Modify: `content/journey.yaml` (reframe milestone labels/descriptions to the scholarship arc; remove remaining career-only framing; present-tense current node, done in Task 5)
- Modify: `src/pages/achievements.astro` (mount `<Journey />` as the signature interactive section)
- Read: `src/components/Journey.astro` (confirm it is self-contained and mountable outside `/journey`)

**Interfaces:**
- Consumes: `getJourney()`; `Journey.astro` already renders the scroll-drawn SVG with clickable milestones.

- [ ] **Step 1: Confirm `Journey.astro` is mountable standalone** (it reads `getJourney()` internally and has its own script/styles). If it relies on a parent wrapper, none is required, it self-contains.

- [ ] **Step 2: Reframe milestone copy** in `journey.yaml` so the labeled points tell the scholarship arc: keep "First investment account", reframe the sophomore node to "Independent study year, stayed on track", keep "Lead Studio Director", add/keep "President, ENN Studios", and ensure the Golden State Seal appears as a labeled milestone. Future nodes (College, BlackRock soft, fund manager, vineyard) stay as the dashed projection. No "self-*", no dollar figures, BlackRock soft.

- [ ] **Step 3: Mount the graph on `/achievements`** as a titled section ("My trajectory") below the stat strip and above or interleaved with the leadership case studies. Import and render `<Journey />`.

- [ ] **Step 4: Build + preview** `/achievements`. Scroll the graph into view (the IntersectionObserver triggers the line draw); screenshot the drawn curve; click a milestone marker and screenshot the description panel update. Verify reduced-motion: the curve shows fully drawn with motion disabled.
Run: `npm run typecheck && npm run build`
Expected: pass; graph draws and milestones are interactive.

- [ ] **Step 5: Checkpoint commit.**

---

### Task 17: Before/After drag-to-compare slider (ENN rebrand)

**Files:**
- Create: `src/components/BeforeAfterSlider.astro`
- Modify: `src/pages/achievements.astro` (mount within or near the ENN case study)

**Interfaces:**
- Props: `before: string` (img src), `after: string` (img src), `beforeAlt: string`, `afterAlt: string`, `beforeLabel?: string`, `afterLabel?: string`.
- Produces: a keyboard-operable comparison slider with a static fallback.

- [ ] **Step 1: Create the component** (range input drives the clip; works with keyboard arrows; placeholders until real assets):

```astro
---
interface Props { before: string; after: string; beforeAlt: string; afterAlt: string; beforeLabel?: string; afterLabel?: string; }
const { before, after, beforeAlt, afterAlt, beforeLabel = 'Before', afterLabel = 'After' } = Astro.props;
---
<figure class="ba" aria-label={`${beforeLabel} and ${afterLabel} comparison`}>
  <div class="ba-stage">
    <img class="ba-after" src={after} alt={afterAlt} />
    <div class="ba-before-wrap"><img class="ba-before" src={before} alt={beforeAlt} /></div>
    <input class="ba-range" type="range" min="0" max="100" value="50"
           aria-label="Reveal before or after image" />
    <span class="ba-tag ba-tag-l">{beforeLabel}</span>
    <span class="ba-tag ba-tag-r">{afterLabel}</span>
  </div>
</figure>
<style>
  .ba-stage { position: relative; overflow: hidden; border: 1px solid var(--color-border); }
  .ba-stage img { display: block; width: 100%; height: auto; }
  .ba-before-wrap { position: absolute; inset: 0; width: 50%; overflow: hidden; border-right: 2px solid var(--color-gold); }
  .ba-before-wrap img { width: 200%; max-width: none; }
  .ba-range { position: absolute; inset: 0; width: 100%; opacity: 0; cursor: ew-resize; }
  .ba-range:focus-visible { opacity: 0.001; outline: 3px solid var(--color-gold); outline-offset: 2px; }
  .ba-tag { position: absolute; bottom: 0.6rem; font-size: 0.62rem; letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--color-text); background: rgba(8,8,9,0.7); padding: 0.25rem 0.5rem; }
  .ba-tag-l { left: 0.6rem; } .ba-tag-r { right: 0.6rem; }
</style>
<script>
  document.querySelectorAll<HTMLElement>('.ba').forEach((ba) => {
    const range = ba.querySelector<HTMLInputElement>('.ba-range');
    const wrap = ba.querySelector<HTMLElement>('.ba-before-wrap');
    if (!range || !wrap) return;
    const sync = () => { wrap.style.width = range.value + '%'; };
    range.addEventListener('input', sync); sync();
  });
</script>
```

- [ ] **Step 2: Mount it** in `/achievements` near the ENN case study with labeled placeholders:
`<BeforeAfterSlider before="/content/images/enn-before-placeholder.jpg" after="/content/images/enn-after-placeholder.jpg" beforeAlt="PLACEHOLDER old ENN identity" afterAlt="PLACEHOLDER relaunched ENN identity" />`

- [ ] **Step 3: Build + preview**, drag the handle (screenshot two positions), Tab to the range and arrow-key it. Expected: clip reveals; keyboard works; focus ring visible.

- [ ] **Step 4: Checkpoint commit.** Note in the task: real images are an asset dependency (Task 12-assets); the slider is functional with placeholders.

---

### Task 18: Scroll-spy sticky sub-nav + scroll-progress bar on Achievements

**Files:**
- Modify: `src/pages/achievements.astro` (add the sub-nav + progress bar)

- [ ] **Step 1: Add a thin gold scroll-progress bar** fixed at the top of the Achievements page:

```html
<div id="am-progress" aria-hidden="true"></div>
<style>
  #am-progress { position: fixed; top: 0; left: 0; height: 2px; width: 0; background: var(--color-gold); z-index: 200; }
</style>
<script>
  const bar = document.getElementById('am-progress');
  if (bar) {
    const onScroll = () => {
      const h = document.documentElement;
      const pct = h.scrollTop / (h.scrollHeight - h.clientHeight || 1) * 100;
      bar.style.width = pct + '%';
    };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }
</script>
```

- [ ] **Step 2: Add a sticky in-page sub-nav** listing the page's sections (Credentials, Trajectory, Leadership, Coursework, Service) as anchor links to section `id`s; highlight the active section with an IntersectionObserver toggling an `.active` class. Give each Achievements section a matching `id`.

```html
<script>
  const links = document.querySelectorAll<HTMLAnchorElement>('.am-subnav a');
  const map = new Map([...links].map((a) => [a.getAttribute('href')!.slice(1), a]));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) {
      links.forEach((l) => l.classList.remove('active'));
      map.get(e.target.id)?.classList.add('active');
    }});
  }, { rootMargin: '-40% 0px -55% 0px' });
  document.querySelectorAll('[data-am-section]').forEach((s) => io.observe(s));
</script>
```

- [ ] **Step 3: Build + preview**, scroll and screenshot: progress bar fills, active sub-nav item changes. On mobile (375px) confirm the sub-nav collapses sensibly (horizontal scroll row or hidden).

- [ ] **Step 4: Checkpoint commit.**

---

### Task 19: Accessibility pass

**Files:**
- Modify: `src/styles/global.css` (add `:focus-visible`)
- Review: all new interactive components

- [ ] **Step 1: Add global `:focus-visible`** to `global.css` (gold ring + non-color cue via offset/width):

```css
:focus-visible {
  outline: 3px solid var(--color-gold);
  outline-offset: 2px;
  border-radius: 2px;
}
```

- [ ] **Step 2: Verify contrast** of gold `#C9A227` on `#080809` for any small text and the focus ring. For text under ~18.66px/24px that fails AA, switch that text to `#DDB83A`. Check the credential sublabels and stat labels specifically.

- [ ] **Step 3: Verify target sizes** at 375px: interactive controls ≥ 24x24px, primary skill/case toggles ≥ 44px. Adjust padding where needed.

- [ ] **Step 4: Confirm no scroll-reveal of stats/copy/timeline** and that any JS animation (Journey draw, hero count-up) is gated by `matchMedia('(prefers-reduced-motion: reduce)')` or a CSS `@media (prefers-reduced-motion: reduce)` fallback that shows end-state.

- [ ] **Step 5: Build + preview** with reduced motion: run `preview_eval` to set `matchMedia` reduced or screenshot to confirm content is fully present without animation. Tab through Home and Achievements; screenshot a visible focus ring.

- [ ] **Step 6: Checkpoint commit.**

---

### Task 20: Off-page funnel + share preview

**Files:**
- Modify: `src/pages/contact.astro` (reciprocal IG links)
- Verify: `public/og-image.png` (already exists) renders in share preview
- Modify (outside site repo, optional): `/Users/ianbrogan/Documents/ENN WEBSITE/email-signature.html` (add subordinate ianbrogan.com link)

- [ ] **Step 1: Add reciprocal Instagram links** on Contact (@ianbrogan1227) and link @brogan.bites from the Skills culinary anchor.

- [ ] **Step 2: Verify the OG image.** Confirm `public/og-image.png` is a real image (not the placeholder) and that `site.yaml meta.og_image` points to `/og-image.png`. If the PNG is a stub, regenerate from `og-image.svg`.
Run: `file "/Users/ianbrogan/Documents/ENN WEBSITE/Ian Brogan/public/og-image.png"`
Expected: a valid PNG with sensible dimensions.

- [ ] **Step 3: Add a subordinate site link** to the ENN email signature file if present, pointing to `https://ianbrogan.com` (kept secondary to the ENN brand).

- [ ] **Step 4: Build.** Expected: success.

- [ ] **Step 5: Checkpoint commit.**

---

### Task 21: Final QA sweep

**Files:** none (verification only)

- [ ] **Step 1: Full build + typecheck.**
Run: `cd "/Users/ianbrogan/Documents/ENN WEBSITE/Ian Brogan" && npm run typecheck && npm run build && npm run guard`
Expected: all pass; guard prints "guard passed".

- [ ] **Step 2: Drift grep.**
Run: `grep -rniE "131|hedge fund|self-taught|—|\\\$[0-9]" content/ src/ || echo "clean"`
Expected: `clean`.

- [ ] **Step 3: Preview sweep** at 1280px and 375px for Home, Achievements, About, Vision, Resume, Portfolio, Investing, Skills, Contact. Screenshot each. Confirm: credentials visible in Home's first screen; Achievements case studies + graph + slider + sub-nav work; no placeholder/broken media.

- [ ] **Step 4: 5-second test.** Show Home to two people; each must be able to state Ian's intended major and most impressive achievement within 5 seconds. Revise the hero value-prop line if either cannot.

- [ ] **Step 5: Final checkpoint commit.**

---

## Self-Review (completed by planner)

- **Spec coverage:** every spec section maps to a task. §1 purpose → informs all; §2 IA → Tasks 6-21 by page; §3 Home → Tasks 3,6,7; §4 Achievements → Tasks 8,9,16,17,18; §5 profile assets → Tasks 8 (biliteracy/independent-study), 10 (roots/heritage/military/Jewish), fine-motor intentionally omitted per decision; §6 interactivity → Tasks 9,16,17,18,19; §7 finance/maker → Tasks 12,14; §8 implementation tiers → phase ordering; §9 evidence → drove the choices. Tier 1 items 1-6 → Tasks 1-5. Tier 2 7-12 → Tasks 6-9. Tier 3 13-19 → Tasks 10-15. Tier 4 20-24 → Tasks 18-21 + 16-17.
- **Placeholder scan:** image `src`es are intentionally labeled PLACEHOLDER with alt text naming the needed shot (a tracked asset dependency, not a plan gap). No "TBD/implement later" steps.
- **Type consistency:** `AchievementsData` additions in Task 8 (`sealCriteria`, `biliteracy`, leadership `grade`/`responsibility`/`decision`/`result`/`whyItMattered`/`beforeAfter`) are exactly the fields consumed in Task 9. `BeforeAfterSlider` prop names in Task 17 match its mount in the same task.
- **Known dependency:** the highest-leverage authenticity move (real ENN/maker/@brogan.bites photos) is an asset-production task the user must complete; every component is built to work with placeholders and "light up" when real files replace them.
