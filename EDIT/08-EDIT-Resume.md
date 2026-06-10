# Résumé Page (/resume) — Editing Guide

This page (and the hidden `/admissions` page for college admissions readers) both pull from ONE file, so editing it updates both pages at once.

## Controlled by: `content/resume.yaml`

### Sections you can safely edit
- **name, tagline, email, instagram, location** — top of file, basic info.
- **education** — list of schools/programs. Each entry has `institution`, `degree`, `minors`, `years`, `note`. Safe to edit any of these, or add a new entry by copying the format of an existing one.
- **experience** — your jobs/roles. Each has `title`, `org`, `years`, and a list of `bullets`. Safe to edit text, add/remove bullets.
- **skills_summary** — the categories and skill lists shown in the Skills section of the résumé.
- **projects** — your portfolio projects (Resin Table, Spoiler Shelf, @brogan.bites). Safe to edit `description`, add new projects following the same format.
- **interests** — the list of interests at the bottom. Safe to add/remove/reorder.

## IMPORTANT — hard rules for this page
- **No phone number** — there's a reminder comment at the top of the file. Do not add a phone field.
- **No specific dollar amounts** — e.g. the CTE program description says "a six-figure budget" on purpose, not an exact number. Keep similar language if you update it.

## No photos needed
The résumé is text-only by design (so it prints cleanly as a PDF).

## Nothing else needs fixing
The page was fixed for readability (the text was previously too light/invisible on the white background — now fixed) and for mobile layout (header and contact info now stack properly on phones, print buttons no longer overflow). Both mobile and desktop versions were checked and look correct, and the "Print / Save PDF" button works.
