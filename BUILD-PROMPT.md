# MISSION: Build & ship ianbrogan.com — make it look REAL and HUMAN, not AI-generated

You have full permissions and full autonomy. Build the entire site end-to-end and do
not stop until the Definition of Done is met. Only pause for actions needing a
credential or that are irreversible (domain purchase, GitHub auth, DNS, Formspree
ID); do the surrounding work and leave a labeled TODO. Otherwise keep going.
Implement, don't suggest. Do not interview me — the spec is below.

## CRITICAL — USE THE SKILLS (this is how we beat the "AI look")
- A skill named **site-art-direction** is installed for this project. Load it and
  treat it as binding LAW for every visual decision. It bans generic AI aesthetics
  and defines the "Markets & Vineyards" direction, the typography/color/motion rules,
  and the photographic-realism imagery rules.
- If the **frontend-design** skill is available, use it too.
- The single biggest reason a site reads as "AI" is that the design is invented from
  nothing and uses no real photos. We fix that two ways, below.

## ANTI-AI STRATEGY (do these first, before generic building)
1. **Borrow human taste.** Check for a `/references` folder or `REFERENCES.md` at the
   project root. If it exists (reference-site URLs, screenshots, or a moodboard),
   study it and MATCH its caliber, layout language, pacing, type feeling, and mood.
   This is the taste target — do not regress to template defaults. If it's empty,
   still follow the site-art-direction skill rigorously.
2. **Use the owner's REAL photos.** Real images live in `/content/images` (his actual
   work: resin table, 3D prints, film/media, food from @brogan.bites, etc.). Build
   the site AROUND those real photos — they are the #1 "a real human made this"
   signal. Apply one cohesive warm grade across all of them. Where a real photo is
   missing, use a neutral styled placeholder captioned with the exact shot needed and
   logged in MEDIA-TODO.md — NEVER fake it with illustrations or vector art.

## OPERATING PROTOCOL
- PLAN FIRST. Before any feature, write: `CLAUDE.md` (stack, commands, conventions,
  the "content lives only in /content" rule, deploy facts, and "always obey the
  site-art-direction skill"), `SPEC.md` (full spec in your words), `PROGRESS.md`
  (living checklist you update).
- CONTEXT DISCIPLINE. Your context auto-compacts; do NOT cut scope as it fills. Save
  state + next steps to PROGRESS.md before compaction so you finish the whole build.
- VERIFY YOURSELF. After each major area: run build, typecheck, lint; fix all errors.
  If a headless browser is available, screenshot every page at 375/768/1280/1920px
  and fix layout/contrast/spacing issues. Then do a dedicated design-critique pass
  against the site-art-direction skill and raise quality until it would NOT read as
  AI-generated.
- Commit continuously with clean, conventional messages.

## WHO & WHAT
Ian Brogan, 17, rising senior (summer 2026). A personal "brag-sheet" + living journal
for college applications (Cal Poly SLO, UC Davis, UC Berkeley) and future career
outreach. Governing idea: Ian lives at the intersection of two worlds — the precision
of finance/markets/data, and the warmth/craft/tranquility of design, making, and
vineyards. Every choice should make a reader feel that duality.

## CONTENT BRIEF (write all copy from this — first person, confident, specific, never
## cheesy or adjective-stuffed; show, don't boast)
- Business Economics major; minor in Data Analytics & Excel Modeling; weighing a 2nd
  minor in Viticulture & Enology OR Film/Production.
- Self-taught investor since age 10 (now 17): built/grew a personal investment
  account; taught himself markets, funds, financial statements. HARD RULE: never
  publish specific dollar balances; frame investing around skill, discipline, and the
  journey, not figures.
- Career vision: BlackRock internship (foot in the door via family) -> junior data
  analyst -> senior data analyst -> fund manager -> compound wealth & mastery ->
  family -> retire to a vineyard.
- Origin: fascinated young by money, markets, funds, "the complex spiderwebs that
  create businesses"; fell for vineyards through wine tours with his aunts.
- ADHD framed as his single greatest asset — the engine behind his range and output.
- A medically necessary year of independent study became a launchpad: self-taught
  2D/3D design, graphics, 3D printing.
- Maker: modular kinetic 3D art; woodworking; a handmade resin table; a self-designed,
  3D-printed, vinyl-wrapped "spoiler shelf"; crochet.
- TV/Film & Digital Media: promoted to LEAD STUDIO DIRECTOR. Full Adobe suite
  (Photoshop, Lightroom, Premiere Pro, After Effects, Illustrator), logo & graphic
  design, video editing, color grading, audio.
- Entrusted with ~$100,000 budget for a CTE program revamp launching summer 2026.
- Learned to code; began web/site design.
- Culinary: self-taught advanced cooking & pastry.

CONTACT (centralize in /content): email ianbrogan2@hotmail.com; Instagram main
@ianbrogan1227; Instagram food @brogan.bites. NO phone displayed (leave a commented,
disabled slot + commented slots for LinkedIn/GitHub).

## TECH
- GitHub Pages, fully static. Astro + TypeScript + Tailwind CSS unless you have a
  clearly better, justified reason. Astro Content Collections for the journal,
  astro:assets for images, View Transitions for cinematic navigation. Lean deps, no
  trackers, no paid deps.

## EDITING SYSTEM (a non-coder CMS, editable from github.com itself)
- 100% of user-facing text and image PATHS live in a single top-level `/content`
  directory. Components contain ZERO hardcoded copy or image paths.
- Markdown/MDX for prose & journal; one heavily-commented data file per section (YAML
  preferred) for short strings/links/paths. Plain-English comments on every field;
  fragile zones fenced with "DO NOT EDIT BELOW" guards.
- Images: swap by uploading to /content/images via GitHub's "Add file -> Upload
  files" and editing one path string. Works entirely in-browser (pencil edit +
  github.dev); committing triggers deploy and goes live in ~1 min.
- Ship EDITING.md (non-coder, numbered steps) and /content/README.md (maps each
  section to its file).

## PAGES / SECTIONS
1. Home / Hero (draft 3 headline options, pick best; signature markets×vineyard visual)
2. About / My Story (bio, ADHD-as-asset, the two worlds)
3. Journey — render the timeline as a LITERAL, realistic STOCK-MARKET LINE GRAPH of
   his life: X axis = time (age 10 -> 17 -> projected future), Y axis = growth. An
   upward equity-curve line with realistic volatility (small dips and rises, NOT a
   smooth arc), gridlines, and axis labels. Each life milestone is a labeled data
   point on the line (opened investment account at 10; independent-study pivot; lead
   studio director; $100k CTE budget; college; BlackRock; fund manager; vineyard).
   PAST = solid line; FUTURE GOALS = a dashed/ghosted PROJECTION extending the line
   (a forecast). Scroll-driven: the line draws itself as you scroll and each marker
   reveals a detail card on reach/hover. Build it as custom SVG (stroke-dashoffset
   draw) for full aesthetic control, styled on-brand (oxblood/gold line on bone, faint
   grain); optionally let the line's hue drift toward vineyard tones near the "retire
   to a vineyard" end to fuse the two worlds. All milestones come from ONE editable
   /content data file (age/date, label, description, value). Provide an accessible
   text/list + data-table fallback and a static drawn state for reduced-motion.
4. Portfolio (Design & Media + demo-reel slot; Maker; Culinary -> @brogan.bites) using
   his REAL photos from /content/images
5. Investing (focus, philosophy, self-taught journey — skills, not $)
6. Vision / Goals (target schools, roadmap to fund manager, vineyard endgame)
7. Journal (updatable blog via content collection; ship 2 sample posts)
8. Contact (email, both Instagrams, working Formspree form behind FORMSPREE_ID TODO,
   resume download button -> /public/resume.pdf placeholder; no phone)
9. Skills (a scannable matrix: Finance & Data / Design & Media / Making & Craft /
   Culinary; editable from /content)
10. Résumé print view at /resume (clean one-page CV via print stylesheet, sourced from
    the same /content data — no duplicated copy)
11. Admissions view at /admissions (story reframed for UC/Cal Poly readers; same
    content system; keep out of public nav)
12. Custom on-brand 404

## PERFORMANCE / SEO / A11Y
- Lighthouse ~95+ all four categories; optimized/responsive images; lazy-load; no
  layout shift; minimal JS.
- Per-page titles/descriptions; canonical URLs; Open Graph + Twitter cards; generated
  OG image; sitemap.xml; robots.txt; favicon set; JSON-LD Person schema (name,
  education aspirations, sameAs to his Instagrams).
- Semantic HTML, keyboard nav, focus states, alt text, AA contrast, reduced-motion.

## DEPLOYMENT (Astro + GitHub Pages custom domain — get exactly right)
- astro.config: set `site: "https://ianbrogan.com"` and DO NOT set `base` (base
  breaks internal links on an apex custom domain).
- Add `public/CNAME` = `ianbrogan.com` and an empty `public/.nojekyll` (Jekyll
  ignores Astro's `_astro/` dir and breaks CSS/JS without it).
- Add `.github/workflows/deploy.yml` using the official `withastro/action`, deploying
  to Pages on every push to main. Permissions: contents: read, pages: write,
  id-token: write. Node 22. Repo must be public.
- In README, list my manual steps: (1) buy ianbrogan.com; (2) create repo + push (or
  `gh repo create` if gh is authenticated — try it, else document); (3) enable Pages
  (Source: GitHub Actions); (4) DNS: apex A records 185.199.108.153 / .109.153 /
  .110.153 / .111.153 (+ AAAA if supported), CNAME www -> <username>.github.io;
  (5) add Formspree ID; (6) drop in real media + resume.pdf. Do NOT buy the domain or
  edit DNS yourself.

## DEFINITION OF DONE (don't stop until all true)
- [ ] CLAUDE.md, SPEC.md, PROGRESS.md, README.md, EDITING.md, MEDIA-TODO.md exist.
- [ ] site-art-direction skill rules followed throughout; honest self-review says it
      does NOT look AI-generated.
- [ ] Build succeeds; typecheck + lint clean.
- [ ] Every text string and image editable from /content alone via GitHub web UI; no
      hardcoded copy in components.
- [ ] Real photos from /content/images used as the backbone of the visuals; missing
      ones are neutral captioned placeholders logged in MEDIA-TODO.md (never faked
      with illustrations).
- [ ] Lighthouse ~95+ across the board; responsive + beautiful at 375/768/1280/1920px.
- [ ] A11y + SEO + JSON-LD + OG + sitemap + robots + favicon all present.
- [ ] All nav/links work; 2 sample journal posts; résumé button + Formspree form
      wired; /resume, /admissions, custom 404 present; no phone anywhere.
- [ ] Journey renders as a realistic stock-market line graph (solid past + dashed
      projected future) that scroll-draws, with milestones from one editable /content
      file and an accessible text/data-table fallback.
- [ ] astro.config has site, no base; public/CNAME + public/.nojekyll present;
      deploy.yml committed.

## EXECUTION ORDER
1. `pwd`, list dir. Load the site-art-direction (and frontend-design) skill.
2. Check /references and /content/images; design to those.
3. Write CLAUDE.md, SPEC.md, PROGRESS.md.
4. Build the /content editing system + config first; wire components to it.
5. Build pages following the art-direction skill; then motion/signature moments.
6. Performance + SEO + a11y. Deployment files. Verify build.
7. Design-critique self-review vs the skill; raise quality; fix. Summarize + list my
   remaining manual steps.

Begin now. Plan first, then build the whole thing — and make it look human.
