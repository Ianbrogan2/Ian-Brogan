# Portfolio Page (/portfolio) — Editing Guide

All portfolio content lives in `content/portfolio.yaml`. This page is organized into sections (e.g. "CTE Program Brand Identity", "Demo Reel", "Logo & Graphic Design", making/craft items, and the Culinary section with @brogan.bites items).

## What's safe to change
- Any `title` or `description` text for a project.
- The order of items (just move the blocks up or down in the file — keep the formatting/indentation the same).

## What to leave alone
- `image`, `video_url`, and `image_alt` field *names* — only change the values (the text in quotes after the colon), not the field names themselves.

## Photos still needed (all currently "coming soon" placeholders)
Each of these needs a real photo taken and dropped into `content/images/`, then the `image:` path updated in `portfolio.yaml` to point to it (or just save the new photo with the same filename as the placeholder to swap automatically):

1. **CTE program brand identity work** — photo/screenshot of the brand identity materials you designed (logo, color palette, mockups).
2. **Demo reel thumbnail** — a still frame or thumbnail image representing your video reel.
3. **Logo & graphic design collection** — a composite or grid image showing a few logo/design pieces you've made.
4. **Handmade resin table** — photo of the finished resin table, good lighting, show the inlay detail.
5. **3D-printed spoiler shelf** — photo of the finished shelf with vinyl wrap, ideally installed/in use.
6. **Kinetic 3D art piece** — photo or short video still of the kinetic piece in motion or at rest.
7. **Pastry photo (@brogan.bites)** — a plated pastry/dessert photo, well-lit, from your Instagram.
8. **Plated savory dish (@brogan.bites)** — a plated savory dish photo, same style as above.

## One more thing needed: Demo Reel video link
- In `portfolio.yaml`, find the line `video_url: ""` — this is empty right now.
- When your demo reel is uploaded to YouTube or Vimeo, paste the embed/share link here between the quotes, e.g. `video_url: "https://youtube.com/watch?v=XXXXXXX"`.

## Nothing else needs fixing
Layout, spacing, and mobile display for all portfolio sections were checked and are working correctly.
