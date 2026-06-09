---
name: site-art-direction
description: Art direction and anti-"AI-slop" design law for building ianbrogan.com (Ian Brogan's personal site). Use this skill whenever designing, building, styling, or refining ANY page, section, component, or visual element of this website. It enforces a distinctive "Markets & Vineyards" editorial aesthetic, photographic vineyard realism, the use of the owner's real photos, reference-matching, and a hard ban on generic AI defaults.
---

# Site Art Direction — make it look REAL and HUMAN, never AI-generated

This site keeps coming out looking "AI-generated." That happens when the design is
invented from a blank page and lands on safe defaults. Your job is the opposite:
commit hard to ONE specific, human, editorial aesthetic and execute it with
precision. Generic = failure here, no matter how "clean" it looks.

## The non-negotiable mandate
- Commit to a clear, bold conceptual direction and execute every detail to match.
- Refined minimalism and rich maximalism both work; timid, evenly-distributed,
  centered, template-y design does NOT.
- Before declaring anything done, run a brutal self-critique: "Would a stranger
  guess an AI made this?" If yes, it's wrong — redo it.

## The concept: "Markets & Vineyards"
The site lives on a deliberate TENSION between two worlds:
- VINEYARD side — warm, lush, photographic, soft-focus, tranquil, human.
- FINANCE side — cool, sharp, precise, exact, analytical.
Let each be fully itself; never blend them into a muddy beige middle. The contrast
IS the identity.

## Anti-AI hard rules (these are bans)
- NO generic fonts: never Inter, Roboto, Arial, Helvetica, or system stacks. Never
  default to Space Grotesk either. Choose a distinctive, characterful DISPLAY type
  for headlines paired with a refined body type. Type carries the whole design.
- NO clichéd color: never purple/blue gradients on white. Commit to a DOMINANT color
  with sharp, sparing accents — not a timid, evenly spread palette. Use CSS variables.
- NO predictable layouts: avoid the centered hero + three feature cards pattern,
  perfectly symmetric grids, and uniform section heights. Use asymmetry, overlap,
  diagonal flow, grid-breaking elements, and intentional negative space.
- NO flat solid-color backgrounds as the default: build atmosphere and depth —
  grain/noise overlays, real material textures, layered transparencies, dramatic but
  tasteful shadows.

## Typography direction
- Distinctive editorial display serif for headlines (e.g. Fraunces variable with
  optical sizing) + a clean, slightly characterful sans for body. Push scale contrast
  hard: large, confident headlines; calm, readable body. Deliberate type scale and
  vertical rhythm.

## Color direction (starting point — refine, keep cohesive, verify WCAG AA)
- Deep oxblood/burgundy #6B1F2A and darker #3D1119
- Warm bone/cream #F4EFE6 and #EAE3D6
- Warm near-black ink #161311
- Muted antique gold accent #C9A227 (use sparingly)
- Optional vine-sage #4A5340

## Motion
- One well-orchestrated page-load with STAGGERED reveals delivers more delight than
  scattered micro-interactions. Add tasteful scroll choreography and surprising hover
  states. Use custom easing curves (weighty, slow) — never the default `ease`. Prefer
  smooth-scroll for a premium feel. ALWAYS honor prefers-reduced-motion.

## Signature moment — the Journey as a market graph
Render Ian's life timeline as a LITERAL, realistic stock-market line graph: an upward
equity curve over time (age 10 -> now -> projected future) with gridlines, axis
labels, realistic volatility, milestone data points, a SOLID past and a DASHED
projected future, that scroll-draws on-brand (oxblood/gold line on bone, faint grain).
This is the centerpiece that fuses the two worlds — treat it as a hero-level moment,
not a generic timeline component.

## IMAGERY = the #1 thing that makes it look human
- ALL nature/vineyard/plant imagery must be PHOTOGRAPHIC — real photos or cut-outs
  made from real photos. BANNED: vector/illustrated leaves, flat botanical SVGs,
  cartoon foliage, AI-cartoon plants, and 3D-rendered plants (rendered foliage reads
  fake). 3D is allowed only for OBJECTS (barrel, bottle, the resin table).
- USE THE OWNER'S REAL PHOTOS. He already has photos of his real work (resin table,
  3D prints, film/media, food from @brogan.bites) and they live in /content/images.
  Build the site AROUND those real images. Real photos of his real life are the
  single biggest "a real person made this" signal — lean on them everywhere.
- Make every image feel like one consistently graded set: warm, slightly desaturated,
  soft contrast, gentle grain. Apply a unifying treatment so mixed sources cohere.
- Layer real-photo botanical cut-outs at section EDGES with a subtle slow sway. Use
  parallax depth (blurred foreground / sharp mid / hazy background). If graded
  vineyard video exists in /content, loop it quietly behind a section title (muted,
  compressed, lazy, reduced-motion-safe).
- Where a real asset is missing, use a NEUTRAL styled placeholder at the right aspect
  ratio, captioned with the exact shot needed, and logged in MEDIA-TODO.md. NEVER
  fake the look with illustrations or stock-emoji.

## Borrow human taste: reference-matching
- If a /references folder or REFERENCES.md exists (reference-site URLs, screenshots,
  or a moodboard), treat it as the TASTE TARGET. Match its caliber, layout language,
  pacing, type feeling, and mood. References define the bar; do not regress to
  template defaults.

## Sophistication guardrails (avoid kitsch)
- No script/"wine label" fonts, no grape clip-art, no all-burgundy walls, no cheesy
  flourishes. Vineyard = lush, warm, real. Finance = sharp, clean, exact. When in
  doubt, remove ornament and trust type, space, and one strong real photo.

## Done gate
Before finishing any view, verify: distinctive non-generic type ✓, dominant
committed color ✓, asymmetric/editorial layout ✓, real photographic imagery with a
cohesive grade ✓, atmosphere/texture not flat fills ✓, one orchestrated motion
moment ✓, honestly would NOT read as AI-generated ✓.
