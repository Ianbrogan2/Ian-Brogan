# About Page (/about) — Editing Guide

This page reuses the same content as the About section on the home page.

## Story content
- What it is: your story, the 4 paragraphs, headline, subhead, pull-quote, and stat row.
- Controlled by: `content/about.yaml`.
- Safe to change: `headline`, `subhead`, all 4 `body` paragraphs, `duality_quote`, and the 4 items under `facts` (label/value pairs).
- Leave alone: the `image` path itself (just swap the photo file, see below — don't rename the path unless you also update it here).

## Photo needed
- File: `content/images/about-placeholder.jpg`
- Currently shows: "Ian Brogan, photo coming soon"
- What to take/upload: a good-quality photo of yourself — casual but put-together, ideally somewhere that feels "you" (at a desk with monitors, outdoors, with a project you've made, etc.). Landscape or portrait orientation both work, but make sure the subject (you) is roughly centered since the photo gets cropped on different screen sizes.
- To swap: just save your new photo as `about-placeholder.jpg` in `content/images/` (replacing the placeholder), or save it under a new filename and update the `image:` line in `content/about.yaml` to match.

## Nothing else needs fixing on this page
Layout, spacing, and mobile display were all checked and are working correctly.
