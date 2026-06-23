# Liquid-refraction titles + sitewide button interactivity

Date: 2026-06-22
Status: Approved design, pending spec review

## Problem

The hero wordmark's current effect is a per-glyph spring/magnet displacement: letters
translate away from the cursor. It does not read as "liquid." A previous attempt at a
real goo look used an SVG `feGaussianBlur` filter, which melted large display type into
an unreadable blob (especially at mobile clamp sizes) and was removed.

The owner wants titles that look like they are made of real liquid you can cut through,
with the distortion staying small and realistic (not letters flying apart). The effect
should extend to titles across the whole site, and every button should gain a coherent
interaction. There must be a touch-native equivalent since phones have no cursor.

## Chosen approach: localized refraction (the "liquid bead")

Decided after building three live canvas prototypes and a refined second round. The
winner is **refraction**, not displacement: crisp text seen through a small bead of
liquid/glass that bends the light under it, sharp everywhere else.

Mechanically: render the heading's exact text to an offscreen canvas, then each frame
copy it to a visible overlay canvas. Inside a small radius around the pointer, sample
each destination pixel from a *displaced* source coordinate (a spherical lens warp:
`displacement = (1 - d/R)^2 * STRENGTH`, pulling toward the bead center). Everything
outside the bead is copied 1:1, so the text stays crisp. A faint gold radial rim sells
the glass. When the pointer leaves, the overlay clears and the real text shows through
again — instant "self-heal."

This avoids the prior failure mode: there is no global blur, the resting text is never
distorted, and the distortion is bounded to a small moving region.

### Locked parameters
- Technique: **A — droplet/bead refraction** (point lens following the pointer).
- Resting distortion strength: **~24** on the prototype's 4–60 slider scale
  (`STRENGTH = 0.24`), tuned per-heading if a specific title needs less.
- Bead radius: proportional to font size (~0.75× cap height) so small headings get a
  small bead and large headings a large one — the effect scales automatically.

## Architecture

### `LiquidTitle` shared module (`src/scripts/liquid-title.ts`, loaded once in `Base.astro`)

Responsibilities, kept in one focused unit:
1. Select all headings opted in via a `data-liquid` attribute, plus the hero `#hero-name`.
2. For each, lazily (via `IntersectionObserver`, only when scrolled into view) create an
   absolutely-positioned `<canvas>` overlay matching the heading's box and device-pixel
   ratio. The canvas is `aria-hidden="true"`.
3. Render the heading's text to an offscreen canvas using the heading's *computed* font
   (family, weight, size, `opsz`, letter-spacing, color) so the canvas is pixel-identical
   to the DOM text. Glyph ink only — transparent background — so the real page background
   shows through unchanged and refraction simply bends the letterforms.
4. Run the refraction rAF loop **only while a pointer/touch is over the heading**. On
   `pointerenter`/`touchstart` near the title, add a class that makes the real text ink
   transparent and reveal the canvas; on `pointerleave`/`touchend`, stop the loop, clear
   the canvas, restore the real ink. Idle cost is zero.
5. Reposition/redraw on resize and on font load (`document.fonts.ready`).

The real `<h*>` element always stays in the DOM (screen readers, copy-paste, SEO, print).
The canvas only augments it on interaction.

### Hero wordmark specifics
- Replace the existing spring/magnet `.hl-char` script in `Hero.astro` with the
  `LiquidTitle` treatment on `#hero-name`. Keep the existing line-rise entrance animation.
- The hero (and money-related titles only) emit a few gold dollar-flow particles via the
  existing `window.fxMoney(x, y, count, spread)` as the bead cuts across — throttled so it
  streams a small number, not a flood. This realizes "the slice leaves gold."
- The per-glyph `.hl-char` span structure can be simplified to a flat string inside
  `#hero-name` since the canvas now owns the visual; keep two lines ("Ian" / "Brogan.")
  for the entrance.

### Mobile / touch
- The bead follows `touchmove` across a title — same effect, finger-driven.
- **Never block scrolling**: touch handlers are passive and never `preventDefault`, so a
  drag still scrolls the page while the bead plays as the finger passes. No `touch-action:
  none` on titles.
- A tap with no drag fires a single one-shot bead pulse at the touch point that decays,
  so non-draggers still get feedback.
- No gyroscope, no iOS motion-permission prompts.

### Accessibility & reduced motion
- `prefers-reduced-motion: reduce` → the module never initializes; real crisp text only.
- Canvas overlays are `aria-hidden`; the heading text is unchanged in the a11y tree.
- Titles are decorative-augmented, not controls — no new focus/keyboard semantics needed.
- Print/utility pages excluded (see scope) so print output is unaffected.

## Scope: which titles get the bead

"Big titles only" — page `<h1>`s and major section `<h2>`s opt in with `data-liquid`.
Small, repeated `<h3>`s stay plain so the effect stays premium.

**Gets the bead (`data-liquid`):**
- Hero `#hero-name` "Ian Brogan." — special, emits gold particles.
- Page `<h1>`s: vision, achievements, skills, about, journey, contact, investing,
  journal index, portfolio, 404, journal post (`[slug]`).
- Major section `<h2>`s: index `.goal-headline`, `About` headline, `Investing` headline,
  `EnnProofBlock`, `JournalPreview`, achievements `#trajectory-h`, about-page "Now you
  know the why" `<h2>`, investing-page "Books that shaped" `<h2>`.

**Stays plain (no bead):**
- All `<h3>`s (book titles, skill categories, holdings header, vision/achievements
  section titles, portfolio, journal post-title h3, journey labels, modal titles).
- Print/ATS pages: `resume` (`<h1>` name + section `<h2>`s) and `admissions` headings —
  excluded to keep print output and ATS parsing clean.
- Repeated `journal/index` post-title `<h2>`s (small, list-scale).

**Money particles also fire on:** the hero, plus any `data-money` button/heading
(capital/investing context) — never on ordinary headings.

## Sitewide button interactivity taxonomy

One coherent system, layered on the existing `.btn` infrastructure (gold sheen `::before`,
`--press-scale`, `.btn-mag` magnetic, `link-draw` underline already in `global.css`).

| Category | Elements | Interaction |
|---|---|---|
| Primary / CTA | `.btn-primary`, hero CTAs | magnetic pull (`.btn-mag`, pointer-fine), gold sheen wipe on hover, press-dip |
| Money / capital | index capital link, investing-page CTAs, `a[href^="/investing"]`, `.holding-symbol` | everything above **plus** gold dollar-flow on press via `fxMoney` |
| Outline / ghost / text | `.btn-outline`, `.btn-ghost`, inline links | animated gold underline / border-draw on hover, press-scale |
| Icon / utility | `.nav-toggle`, modal closes, `.skill-btn`, `.holding-symbol` | springy press (scale + ease-spring), gold `:focus-visible` ring |

Rules:
- All motion-heavy interactions gated behind `prefers-reduced-motion` and, where they
  track the pointer, `(pointer: fine)`.
- Every interactive control keeps a visible `:focus-visible` gold ring for keyboard users.
- Extend the existing `[data-money]` set: tag every capital/investing-related button so the
  dollar-flow is consistent, not just on the one homepage link.

## What is explicitly out of scope
- No visual restyle: the Markets & Vineyards palette (gold `#C9A227` on near-black) and
  type (Fraunces / DM Sans) are unchanged.
- No return of `<ViewTransitions />` / gold-sweep page transitions (removed earlier; every
  nav is a full reload).
- No gyroscope/device-motion features.
- No content changes; all existing content rules (no em dashes, no dollar figures, soft
  BlackRock framing, family-mentored framing) continue to hold and `npm run guard` must pass.

## Verification (per owner request: agentic workflow)
After implementation, run a parallel agentic workflow that:
1. Audits the liquid-title module across every page and breakpoint (desktop, mobile
   portrait, mobile landscape) for legibility, scroll-not-blocked, reduced-motion, and
   no-JS fallback.
2. Audits every button against the taxonomy for hover/press/focus states and money-flow
   correctness.
3. Adversarially red-teams "does it actually look like real liquid, and is it perfect" plus
   performance (idle cost, rAF only-while-active, dpr correctness).
4. `npm run typecheck && npm run build && npm run guard` all green, plus live preview
   screenshots at 390×844, 844×390, and 1280×900.

## Success criteria
- Hero and every opted-in title show a small, realistic liquid-bead refraction on
  pointer/touch, crisp at rest, instantly healing on leave.
- Works by finger-drag on touch without blocking scroll; tap gives a one-shot pulse.
- Every button has a defined, working interaction in its category, with money buttons
  flowing gold on press.
- Reduced-motion and no-JS users get crisp static text and basic fades; nothing breaks.
- Build, typecheck, and guard pass; verification workflow finds no blocker issues.
