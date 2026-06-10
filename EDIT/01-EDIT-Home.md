# Home Page (/) — Editing Guide

The home page pulls content from several files. Here's what each section is and where it lives.

## Hero (top banner — "I think in markets. I make by hand.")
- What it is: the big headline and photo at the very top of the site.
- Controlled by: `content/site.yaml` → the `hero:` section.
- Safe to change: `headline`, `headline_line2`, `subhead`, button labels (`cta_primary_label`, `cta_secondary_label`).
- Leave alone: `cta_primary_href` / `cta_secondary_href` (these are links to other sections, don't break them).
- **Photo needed**: `content/images/hero-placeholder.jpg` — currently shows "Ian Brogan, photo coming soon." Needs a strong portrait/headshot of you, ideally the same one used in About or a different one if you want variety.

## About / My Story section
- What it is: the "My name is Ian Brogan" story block with the 4 paragraphs and the stat row.
- Controlled by: `content/about.yaml`.
- Safe to change: `headline`, `subhead`, the 4 paragraphs in `body`, `duality_quote`, and the `facts` (the 4 small stat callouts: "Started investing / Age 10", etc.)
- **Photo needed**: `content/images/about-placeholder.jpg` — currently shows "Ian Brogan, photo coming soon." A casual/working photo (at a desk, with a laptop, etc.) works well here.

## Journey / Life Graph (the stock-chart-style timeline)
- What it is: the animated chart showing your life milestones as a rising stock line.
- Controlled by: `content/journey.yaml`.
- Safe to change: the `label` and `description` text for any milestone. You can also adjust `value` numbers to change how steep the line looks (higher = steeper rise).
- Leave alone: anything below the line `# --- chart rendering --- DO NOT EDIT BELOW THIS LINE ---` (controls how the chart is drawn, not content).
- No photos needed for this section.

## "Read the full story" / Goal section
- What it is: the call-to-action box near the bottom of the home page with the gold button.
- Controlled by: `src/pages/index.astro` (this one IS code — if you want to change this text, ask Claude/a developer rather than editing directly).
- Nothing broken here, no action needed.

## Nothing else to do here
Everything else on the home page (nav bar, ticker tape, footer) is covered in **09-EDIT-Site-Wide.md**.
