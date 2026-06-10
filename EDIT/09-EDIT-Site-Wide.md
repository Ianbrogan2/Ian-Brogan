# Site-Wide Settings — Editing Guide

This file controls things that appear on EVERY page: the navigation menu, footer, contact info, and site title/description (used by Google search results).

## Controlled by: `content/site.yaml`

### Page title & description (SEO)
- `meta.title`, `meta.tagline`, `meta.description` — this is what shows up in Google search results and browser tabs. Safe to edit, just keep it accurate and reasonably short.
- `meta.url` — your site's web address. Leave alone unless your domain changes.

### Contact info (shown in footer/contact page)
- `contact.email` — your email address. Safe to update if it changes.
- `contact.instagram_main_handle` / `contact.instagram_main_url` — your main Instagram. Safe to update.
- `contact.instagram_food_handle` / `contact.instagram_food_url` — your @brogan.bites food Instagram. Safe to update.
- The lines starting with `#` for `linkedin_url` and `github_url` are turned OFF. If you want to add a LinkedIn or GitHub link to the site, remove the `#` at the start of that line and fill in the URL — but it's safest to ask for help the first time so the formatting stays correct.
- The `phone` line is permanently disabled per your rule of no phone number on the site — leave this alone.

### Navigation menu (top bar links)
- `nav_links` — the list of pages shown in the menu (About, Portfolio, Investing, Skills, Vision, Contact) and their order. You can reorder these by moving the blocks up/down, but don't change the `href` values (these are the actual page addresses and must stay as-is, e.g. `/about`).

### Footer
- `footer.tagline` — the small text in the footer ("Finance · Economics · Markets | ianbrogan.com"). Safe to edit.
- `footer.copyright_name` — your name as shown in the copyright line. Safe to edit.

### Hero (homepage banner)
- Covered in **01-EDIT-Home.md** — same file, just a different section (`hero:`).

## Ticker tape (the scrolling stock symbols under the nav bar)
- This is NOT controlled by a content file — it's built into the website's code (`src/components/Nav.astro`) using a service called TradingView.
- If you want to change which stock symbols scroll across the top (currently things like PANW, CRWD, etc.), this requires a small code edit — ask for help rather than editing this file directly, since one typo can break the whole nav bar.

## Nothing else needs fixing
The navigation menu, ticker tape, and footer were all checked on mobile and desktop and are displaying correctly with no visual glitches.
