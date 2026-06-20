# /content - editing map

Every piece of user-facing text and every image path on the site lives in
this directory. Edit here; commit; the site updates in ~1 minute.

For step-by-step editing instructions, see `/EDITING.md` at the project root.

---

## File → section map

| File | Controls |
|------|----------|
| `site.yaml` | Page title, meta description, nav links, hero headline/subhead/CTAs, contact info (email, Instagram), footer |
| `about.yaml` | About section: headline, body paragraphs, pull-quote, facts row, image |
| `journey.yaml` | Journey stock-market graph: milestones with ages/values/labels, volatility noise points |
| `portfolio.yaml` | Portfolio sections (Design & Media, Maker, Culinary): titles, descriptions, items, images, tags |
| `skills.yaml` | Skills matrix: four categories, items, and skill levels |
| `investing.yaml` | Investing section: headline, body copy, philosophy bullets, career note |
| `vision.yaml` | Vision section: schools list, career arc stages, closing line |
| `resume.yaml` | /resume and /admissions pages: education, experience, skills summary, projects, interests |
| `journal/` | Blog posts - one .mdx file per post |
| `images/` | All photos used on the site |

---

## Image naming convention

```
[section]-[description].jpg

Examples:
  hero-ian.jpg
  about-ian-workshop.jpg
  maker-resin-table.jpg
  culinary-pastry-croissant.jpg
```

See `MEDIA-TODO.md` at the project root for the full list of needed photos.

---

## Hard rules (do not edit these)

- **No phone numbers** anywhere on the site (in any file)
- **No specific dollar amounts or investment returns** in any copy
- The `chart:` block at the bottom of `journey.yaml` - do not edit (rendering config)
