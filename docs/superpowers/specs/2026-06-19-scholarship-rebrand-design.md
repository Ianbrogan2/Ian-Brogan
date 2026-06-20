# ianbrogan.com — Scholarship Rebrand Design Spec

Date: 2026-06-19
Status: Approved decisions captured; awaiting final spec review before implementation planning.

This is a content, information-architecture, and interactivity rebrand. The "Markets & Vineyards" color scheme, typography, and dark editorial aesthetic stay exactly as they are. The single purpose of the site becomes: help Ian Brogan win college scholarships.

---

## 0. Decisions locked with Ian (this session)

- **Profile assets to surface (all four):** bilingualism/biliteracy, military-connected family (grandfather Air Force; father civilian engineer on Navy programs), heritage/ancestry (Spanish, Mexican, Irish, German), and Jewish community membership (Ohr Shalom, framed as community not hobby).
- **Fine-motor condition:** leave it OFF. Only the existing ADHD framing stays. No second medical disclosure.
- **Intended minor:** Data Analytics + Viticulture & Enology. Remove "Excel Modeling" (not a real minor).
- **CTE program relaunch:** in progress right now (summer 2026). Frame in present tense as ongoing leadership, never as a finished/shipped accomplishment.
- **Hero direction (from brainstorm):** character-first and scholarship-legible, not a finance-only identity line.
- **Nav order:** About → Achievements → Portfolio → Investing → Skills → Vision → Contact (already correct; Achievements is the 2nd item).

---

## 1. Purpose & Audience

**Who actually sees this site:** scholarship reviewers, interviewers, and recommenders. They arrive from a business-card QR code, a link in an application's "Additional Information" field, a recommender's email, or an Instagram bio. They are almost always on a phone, spend 15 to 30 seconds, and skim rather than read.

Evidence: a visual-credibility verdict forms in ~50ms; a stay/leave decision in ~10 seconds; only ~20 to 28% of body text gets read, in an F-pattern; ~57% of attention lands above the fold.

**What they need in the first screen:** within 5 seconds a reviewer must be able to answer "what does this kid do, and what is the single most impressive thing about him?" Answer: a college-bound student leader who is leading a six-figure rebrand of his school's broadcast program, backs it with real academic credentials, and thinks like an investor.

**One-sentence positioning:** ianbrogan.com is the contextual brag-sheet-plus-portfolio layer that the applications themselves cannot hold. Cal Poly SLO (Multi-Criteria Admission) and the UCs (Personal Insight Questions) strip out free-text activity descriptions, so the site supplies the evidence, artifacts, and narrative the forms have no room for.

---

## 2. Information Architecture

Keep the existing page set. This is tightening and reframing, not a teardown.

| # | Page | What changes |
|---|------|--------------|
| 1 | Home | Tighten hero to a 5-second value prop; add a credentials strip and an ENN proof block above the fold; move the BlackRock/fund-manager arc below the fold; remove fabricated market data. |
| 2 | Achievements | The centerpiece. Convert the flat timeline into expandable responsibility/decision/result case studies; decode the Golden State Seal; reframe rank as "Top 14%"; add coursework count badges; surface service by impact; add biliteracy. |
| 3 | About | Add a short, authentic roots note (heritage + community + military family) using only confirmed facts; front-load the opening lines. |
| 4 | Portfolio | Remove every placeholder image and empty-video tile from the live build; lead with the ENN flagship; add outbound "verify" links. (Blocked on real assets, see Section 8.) |
| 5 | Investing | Reframe as proof of intellectual curiosity and self-direction; lead each holding tooltip with a concrete artifact/process, not an adjective; family-mentored framing only. |
| 6 | Skills | Surface one concrete artifact in each always-visible card summary; open each modal with a made object, not an adjective. |
| 7 | Vision | Raise the three target schools and programs above the fold; add a quiet "Applying fall 2026" line; minor = Data Analytics + Viticulture & Enology; keep BlackRock soft and aunt-attributed. |
| 8 | Resume / Admissions | Reorder so Honors and Activities lead, Experience follows; ship a real one-page downloadable PDF; keep raw "84/632" rank on the print version; carry the decoded Seal line; fix the minor. |
| 9 | Contact | Add reciprocal Instagram links. |
| - | Journal | Compliance fixes: strip all em dashes, remove "self-taught" tag/language, tighten the health-year post to factual-plus-output. |

Not built: any public scholarship-deadline tracker; any vCard QR (would expose a phone field, which is banned); any separate QR-only landing page (the QR points at Home).

---

## 3. Homepage (above the fold first)

### 3a. Hero (character-first, scholarship-legible)
- Keep his name as the H1. Keep the existing thesis voice ("I think in markets. I make by hand.") only as an optional sub-headline.
- Add one plain-language value-prop sub-line under ~15 words. Direction: "Senior heading into Business Economics. Studio Director leading a six-figure rebrand of his school's broadcast program."
- Add one trajectory sentence linking past to future. Direction: "Investing since age 10, building since freshman year, aimed at a career in fund management." BlackRock stays off the hero.
- Cut the two-paragraph ADHD/markets essay out of the hero; it moves below the fold or to About.
- Reduce three CTAs to two, plus a "Download Resume" button pointing to the real PDF.
- Remove the "Hedge Fund / Management goal" hero stat. Replace with a credential, not an ambition.

### 3b. Credentials strip (last element in the first viewport)
Four stats, large numerals, short labels, left-aligned, hairline gold rule between:
- **4.22** weighted GPA (small "3.81 unweighted" sublabel)
- **Top 14%** of class (small "84 of 632" support) — rank gets the least visual weight (84/632 = top 13.3%; "Top 14%" is the honest non-overstating ceiling)
- **130+** service hours
- **Golden State Seal** (Merit Diploma)

No count-up animation on this strip (see Section 6). On mobile, reduce the large top padding so name + sub-line + strip all fit on the first phone screen.

### 3c. ENN proof block (high on Home)
A compact band below the credentials strip: role arc Lead Studio Director → President, ENN Studios; the six-figure CTE relaunch (word only, framed present-tense as in progress); named real deliverables (new logo set, on-air graphics system, standardized production workflow, the launched program website). Include one real artifact image as the first lower-fold credibility anchor. Markets/investing is the co-equal second pillar, not subordinate.

### 3d. Section order on Home
1. Hero + value prop + trajectory line
2. Credentials strip
3. ENN proof block (leadership) + one real photo
4. Markets/investing pillar (initiative + curiosity)
5. Then the longer BlackRock/fund-manager "Goal" narrative and life-story prose (below the fold)

### 3e. Remove fabricated market data (prerequisite)
`Hero.astro` hardcodes invented quotes ("S&P 500 +0.68%", "10Y TSY 4.41%", "VIX 13.82"). On a finance-credibility site, fake quotes are the opposite of the disciplined-investor signal. Remove the chips, or replace them with clearly evergreen non-quote content (a thin strip of real coursework/skills/credentials). Whatever remains must never push credentials below the fold. Keep existing `prefers-reduced-motion` and `aria-hidden` handling. The decorative TradingView-style ticker tape across all pages is reviewed under the same rule: it must not read as live market data it is not.

---

## 4. The Achievements Page as Centerpiece

The page a QR or application link most likely lands on after Home. It already has the right buckets; the job is to turn a timesheet into something a committee can score.

### 4a. Stat strip = page hero (skim-optimized)
- First, above-the-fold, left-aligned. Same four stats as Home.
- Decode the Golden State Seal via a click-to-open modal (reuse the existing `Skills.astro` modal pattern, keyboard-accessible, never hover-only). Replace the vague "academic excellence and civic engagement" with objective criteria. Direction: "California State Board of Education honor for B+ or higher mastery across six core subject areas." Optionally link the official CDE definition.
- Reframe rank to "Top 14%" headline with "84 of 632" as smaller support.

### 4b. Coursework rigor
Add count badges to the existing group headers: AP 4 / Honors 4 / CTE 2, sourced from `achievements.yaml`. List the real courses plainly. Do not invent an advanced-math claim (there is no AP Calc/Stats). Name the CTE pair as a recognized California Arts, Media & Entertainment (AME) pathway.

### 4c. Leadership timeline → responsibility/decision/result case studies
Four real, chronological entries (do not delete the independent-study year; do not invent a tidy three-node arc). Render each as a layer-cake: bold Role + Organization + Grade/Year heading line, then a one-line concrete-deliverable bullet, so a header-only scan conveys the arc. Make each node click-to-expand (reuse the Skills modal) into a three-beat panel weighted toward the action beat:
- RESPONSIBILITY — what he was handed
- DECISION / ACTION — what he chose and built
- RESULT — what shipped and what the next class inherits

For the marquee ENN President / Studio Director entry, build a Before → After two-column micro-panel (inherited program state vs relaunched state). Open every ENN line with a precise true verb (Directed, Relaunched, Standardized, Built). Reference the budget only as "six-figure." Add one first-person "why it mattered" line tying it to the finance-plus-design "two worlds" theme. Use systems-for-successors framing; only claim he mentored/trained peers if that literally happened. No em dashes.

Pair the ENN entry with real artifacts (before/after logo, the graphics system, a broadcast frame) and short captions. This is the single highest-leverage authenticity move and is blocked on real photos existing (Section 8).

The four nodes, accurately:
- Vice President, DLI Club (Gr 9)
- Independent-study year (Gr 10, 2023-2024) — a distinct neutral node, framed factually: "Completed most of the year via independent study due to a health complication; stayed on track, held a 4.22 weighted GPA, and earned the Golden State Seal." Never an excuse for the unweighted GPA, never placed adjacent to a GPA figure.
- Lead Studio Director, ENN Studios (Gr 11)
- President, ENN Studios (Gr 12) — strongest entry, ends the arc.

### 4d. Biliteracy (new, per decision)
Add a credential line framing DLI Club VP + AP Spanish Language + the immersion pathway as biliteracy, not just a club entry. Ties authentically to heritage and the elementary-school service. If Ian holds the California Seal of Biliteracy, name it; otherwise frame as the immersion/AP-Spanish pathway only.

### 4e. Service: impact, not hours
Surface concentration with the real figures: "100 of 130+ hours on one program." Lead with the ENN program-rebuild story as the primary service narrative; present the 30 elementary-school hours as a secondary "return to roots" note. Keep the 100/30 split and the "30 required" sublabel. No count-up on the hours figure.

---

## 5. Profile-Asset Strategy (identity & context, never a sympathy play)

Governing tone: asset-framed, capability-first, factual, brief. Every item below is true and Ian has opted in this session. Committees fund strength and self-advocacy, not hardship performance.

- **Heritage & roots (About, short note):** state the confirmed ancestry (Spanish, Mexican, Irish, German) plainly, and tie it to lived community: Dual Language Immersion since elementary school, freshman DLI Club VP, mentoring at his old elementary school, and the Ohr Shalom connection as genuine community membership. Never imply first-generation status (his mother is a counselor).
- **Bilingualism as a credential:** see 4d. Frame DLI + AP Spanish + immersion pathway as biliteracy.
- **Military-connected family (one honest line):** "My grandfather served in the U.S. Air Force, and my father is a civilian mechanical engineer who works on Navy programs." Lead with the grandfather's service. Do not imply active-duty dependency.
- **Jewish community membership:** reframe Ohr Shalom from a lifestyle detail into authentic community membership a heritage committee recognizes. Stays genuine, never a checkbox.
- **The independent-study health year as academic grit:** the stronger, lower-pity framing is that he held a 4.22 weighted GPA, earned the Seal, and completed APs through a medical year on independent study. State it once, factually, in the timeline.
- **Fine-motor condition:** OFF, per decision. Existing ADHD framing stays as-is and stays out of the hero.

---

## 6. Interactivity & Motion Spec

Principle: every interactive pattern must surface the strongest evidence fast and never hide load-bearing facts behind a click a 15-to-90-second reviewer will not make. One orchestrated motion moment. Motion animates once, eases, stays 200 to 400ms, persists its end-state.

Add / keep:
- Expandable case-study timeline on Achievements (the one signature interaction): responsibility/decision/result modal per node, reusing the existing Skills click modal (`<button>` + `role=dialog`, Escape + backdrop close, `aria-expanded`).
- The ENN rebrand renders as an always-expanded block, never collapsed behind an accordion.
- Always-visible artifact/metric in each Skills card summary and Investing tooltip (lead with the made object). Confirm tap parity and target size at 375px.
- Real downloadable PDF resume at `public/resume.pdf`: single column, ~10 to 14 quantified bullets, professional email, no phone number, no dollar figures, "six-figure" wording only. Keep the visible plain-text `ianbrogan.com` URL so it survives PDF export.
- One restrained on-load hero sequence (consolidate the existing chart-draw / chip / grid-fade / name-rise into a single moment). The credentials strip and value-prop line are fully present at first paint, not animated in late.
- Fast (<0.1s) hover-lift on Portfolio/Investing cards.

### Expanded interactivity layer (per Ian's request, within the credibility guardrails)

The site already has a strong, underused interactive foundation: `Journey.astro` is a scroll-drawn SVG equity curve (solid past line, dashed projected future, `getTotalLength` stroke-dash animation gated by IntersectionObserver, clickable keyboard-accessible milestone markers driving a description panel, plus an accessible data-table fallback), and `Cursor.astro` is a custom dot+ring cursor with hover/click states gated to pointer devices. We surface and extend these rather than invent new gimmicks. Every addition keeps the rule: key facts stay visible without interaction, everything is keyboard-operable, and all motion is `prefers-reduced-motion` gated.

1. **Signature moment: promote the equity-curve Journey graph to a scholarship-facing centerpiece.** Re-point its milestones to the academic/leadership arc (started investing at 10, DLI VP freshman, independent-study year as a dip-then-recovery node, Lead Studio Director, ENN President, Golden State Seal, college/fund-manager future as the dashed projection). Mount it on the Achievements page (and optionally a condensed teaser on Home). The "my life as a rising equity curve" concept is the single most on-brand, memorable, non-generic interaction the site can have, and it literally visualizes growth and trajectory, which is exactly the past-to-future narrative committees fund. The static milestone list and a11y table keep all facts readable with zero interaction.
2. **Before / After drag-to-compare slider** for the ENN rebrand (old identity vs relaunched identity): a draggable handle, keyboard-operable (arrow keys), with a static fallback caption. Genuinely interactive and it *is* the proof of the work. Built now with labeled placeholders; lights up when real assets land (Section 8 dependency).
3. **Sticky scroll-spy sub-nav + thin gold scroll-progress bar** on the long Achievements page: a small in-page section nav that highlights the active section as you scroll, plus a 2px gold progress line at the top. Premium feel, aids the skimming reviewer, hides nothing.
4. **Expandable responsibility/decision/result timeline cards** (the case-study interaction from Section 4c) reusing the Skills modal pattern: header-only scan by default, full case study on click.
5. **One orchestrated staggered on-load reveal** for the hero + credentials strip (eased, ~200 to 400ms, key facts present at first paint, not animated in late).
6. **Richer hover microinteractions** consistent with the existing gold-underline/card-lift vocabulary, and extend the custom cursor's hover-target list to every new interactive element (timeline cards, slider handle, sub-nav).

These deliberately do NOT include the research-banned patterns below; "more interactivity" means more *purposeful, owner-initiated, accessible* interaction, not motion that hides facts or fakes data.

Motion decision (resolving conflicting research): NO new count-up on the Achievements stat strip. It animates a decimal GPA and a rank where lower is better and briefly shows a wrong mid-tween number. Render 4.22, Top 13%, 130+, and the Seal as static numerals. If any motion is wanted there, use a single subtle fade/slide-in of the whole strip on load.

Accessibility musts (some are current defects):
- Add `:focus-visible` styling (none exists in `global.css` today). Use a gold ring plus a non-color cue (thickness/offset).
- WCAG 2.2 target sizes: 24x24px minimum, 44px for primary skill cards. Verify at 375px.
- Contrast: verify gold `#C9A227` on bg `#080809` for any text under 18.66px/24px and for the focus ring; use a lighter gold (`#DDB83A`) for small text if it misses AA.
- Keep the global `prefers-reduced-motion` kill-switch and gate any JS counter at the script level with `matchMedia`.

Avoid as AI-slop / credibility risks: blanket fade-in on every section; snap (non-eased) transitions; scroll-reveal of stat numbers, body copy, or the timeline; count-up on rank/text awards/decimals; autoplay video; auto-advancing carousels; parallax; scroll-jacking; continuous peripheral auto-scroll; decorative-only motion; fabricated live-data effects.

---

## 7. Finance / Maker Content → Proof of Traits

Reframe interior pages as evidence of scholarship-relevant traits (self-direction, initiative, intellectual curiosity, follow-through), not job-portfolio pieces. Keep Ian's real range; breadth reads as a coherent maker/analyst identity. Add a one-line framing connector per cluster tying back to the "markets + making" thesis.

- **Investing** is his strongest finance-aptitude differentiator (macro-to-micro framework: Dalio cycles, reading 10-Ks and earnings calls, the PANW/CRWD thesis, RSP equal-weight reasoning) but it lives where a fast reviewer never reaches. Surface a one-line teaser on Home/Achievements; keep the full framework on the page. Lead each holding tooltip with process/artifact ("reads 10-Ks and earnings calls," "investing since age 10 in a family-mentored brokerage account"). Never "self-taught," never any dollar/balance/return figure. Family-mentored only.
- **Skills:** open each modal on a specific made object (resin piece, CAD model, the ENN graphics system, a @brogan.bites bake). Surface one artifact in the always-visible summary.
- **Portfolio:** lead with the fully documented ENN flagship (working reel + real before/after identity images + brief outcome), reachable in one click from Home. Remove every placeholder image and empty-video tile from the live build.
- **The website itself** is direct evidence of the Data Analytics + design/media minors. Frame it once, modestly: "I designed and built this site as part of my media and data work." Never "hand-coded it myself in Astro" (the build was AI-assisted); avoid tool-name jargon.
- **Outbound "verify" links** on marquee claims (ENN broadcast/channel, the school CTE page, @brogan.bites, the CDE Seal definition) so a skeptical reviewer finds real third-party proof.

---

## 8. Prioritized Implementation List

**Tier 1 — Hard-rule compliance and credibility liabilities (verified live, do first):**
1. Strip all em dashes from `content/journal/*.mdx` (17 across the two posts) and rewrite affected sentences; add a build-time grep guard for U+2014 across `content/`.
2. Remove "self-taught" tag and "self-teaching/self-directed" language from `content/journal/learning-the-market-at-ten.mdx`, `content/journal/the-year-i-built-things.mdx`, and `content/journey.yaml` (lines ~31, ~43); rewrite to family-mentored.
3. Remove fabricated market data: the hardcoded chips in `Hero.astro` and any invented prices in the ticker.
4. Fix the fabricated minor in `resume.yaml` (~line 29): Data Analytics + Viticulture & Enology.
5. Tighten the health-year journal post to factual-plus-output; align title/description to resilience-and-output.
6. Correct future-dated overclaiming: CTE relaunch is in progress (present tense), in `resume.yaml` (~line 79) and `journey.yaml` (~lines 55, 60).

**Tier 2 — Above-the-fold value and the centerpiece:**
7. Home hero rebuild (`Hero.astro`): value-prop sub-line + trajectory line, cut the essay, fix the "Hedge Fund" stat, two CTAs + Download Resume, reduce mobile top padding.
8. Home credentials strip + ENN proof block + one real artifact image; reorder sections so the finance arc sits below the fold.
9. Achievements leadership rebuild (`achievements.yaml` + Achievements page/component): layer-cake headings, grade labels, click-to-expand responsibility/decision/result modals, ENN before/after panel, first-person "why it mattered" line, verb-led lines.
10. Decode the Golden State Seal with objective CDE criteria; make it a click modal; reframe rank to "Top 13%."
11. Coursework count badges (AP 4 / Honors 4 / CTE 2); name the CTE AME pathway; add the biliteracy credential.
12. Service reframe: "100 of 130+ hours on one program," ENN-led narrative primary, elementary secondary.

**Tier 3 — Profile assets, artifacts, verification, conversion funnel:**
13. About roots note: confirmed heritage (Spanish, Mexican, Irish, German), Jewish community membership, military-connected family (grandfather Air Force, father civilian Navy engineer); front-load opening lines.
14. Ship `public/resume.pdf` (one page, quantified bullets, no phone/no dollars, six-figure wording) and wire the Download button. Reorder Resume page so Honors + Activities lead.
15. Real photos / Portfolio fixes: upload real ENN, maker, and @brogan.bites images; remove all placeholders and empty-video tiles; lead with the ENN flagship + working reel. (Tracked as its own asset-production task; blocks 4c artifact pairing.)
16. Verification links on marquee claims (ENN broadcast/channel, school CTE page, @brogan.bites, CDE Seal).
17. Cross-page consistency audit: identical ENN title sequence, dates, "six-figure," GPA/rank, and "130+" across Portfolio, Achievements, Resume, About, Vision (never "131").
18. Skills/Investing: surface one artifact in each always-visible summary; lead tooltips/modals with made objects; family-mentored everywhere.
19. Vision: raise the three schools + programs above the fold; add "Applying fall 2026"; minor = Data Analytics + Viticulture & Enology; keep BlackRock soft.

**Tier 4 — Accessibility and off-page funnel:**
20. Add `:focus-visible` (gold ring + non-color cue); verify 24/44px targets and gold-on-black contrast at 375px.
21. Consolidate hero motion to one on-load sequence; gate any JS counters behind `matchMedia`; ensure no scroll-reveal of stats/copy/timeline.
22. Off-page funnel: add a subordinate `ianbrogan.com` link to the ENN email signature; add a rendered `website` field to the resume contact block; point both Instagram bios at the site; add reciprocal outbound IG links on Contact/Skills.
23. Create the missing `og-image.png` so shared links preview cleanly.
24. Run a literal 5-second test of Home with two people; revise the hero sub-line until both can state his intended major and most impressive achievement.

---

## 9. Evidence Appendix

- Reviewers skim, fast, on phones, mostly above the fold (~20 to 28% of text read, F-pattern, ~57% attention above the fold; a personal site gets seconds). Sources: NN/g F-pattern & attention research; Fastweb first-pass timing.
- First impressions are near-instant: visual-credibility verdict in ~50ms, stay/leave in ~10s. Source: Lindgaard et al.; NN/g 10-second value-prop.
- Grades and course rigor outrank everything; class rank barely counts. NACAC Fall 2023: 76.8% rate grades in college-prep courses "considerably important," 63.8% curriculum strength, vs 5.5% class rank, 4.9% test scores. → lead with GPA + rigor, demote rank to "Top 14%."
- Depth and demonstrated impact beat breadth and hour counts; strongest leadership copy follows responsibility → action → result. → expandable case-study timeline, "100 of 130+ on one program."
- Ian's target schools strip free-text activity descriptions (Cal Poly SLO Multi-Criteria Admission; UC Personal Insight Questions; no Common App). → the site is the brag-sheet/portfolio layer the applications can't hold.
- Committees fund a clear past-to-future narrative and asset-framed identity over hardship performance. → trajectory line; resilience as grit, not sympathy.
- Reviewers distrust marketese and unverifiable claims and reward show-don't-tell with concrete artifacts (NN/g anti-marketese; MIT show-don't-tell). → decode the Seal, pair ENN with real artifacts, add verify links.
- Fabricated data destroys credibility on a finance site; over-polished AI-sounding prose is penalized. → remove fake quotes; keep plain first-person voice.
- Motion helps only when purposeful, single, eased, <400ms, accessibility-gated; scroll-reveal of high-stakes content measurably hurts comprehension (WCAG 2.2 / 2.3.3 / 2.5.8). → one orchestrated moment; `:focus-visible`; no count-up on the stat strip.
- A real one-page downloadable PDF and a controllable off-page funnel determine whether the site is ever seen. → ship `resume.pdf`, wire signatures/bios, keep durable plain URLs.

---

## Hard rules (apply to every change above)

- No phone number anywhere.
- No specific dollar amounts, balances, returns, or income; the program budget is "six-figure" in words only.
- Family-mentored framing only; never "self-taught."
- BlackRock stays soft: aunt "used to work there and still has connections that can open the door."
- No em dashes anywhere.
- Keep the existing color scheme and Markets & Vineyards aesthetic; this is content/IA/interactivity, not a visual restyle.
