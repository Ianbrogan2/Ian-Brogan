# How to edit this site

All editable content now lives in numbered files inside `/content`,
the same way the EDIT files work on the Eastlake News Network site.
Each file has a big box header at the top explaining exactly what it
controls, how to edit it, and any hard rules to keep in mind.

Open the file, change the text inside the quotes, save. The site
updates automatically — no code needed.

## The files, in order

| # | File | Controls |
|---|------|----------|
| 01 | `content/site.yaml` | Hero, nav links, contact info, footer, SEO |
| 02 | `content/about.yaml` | About page story, photo, quick facts |
| 03 | `content/skills.yaml` | Skills grid on /skills |
| 04 | `content/portfolio.yaml` | Portfolio items, photos, tags, video links |
| 05 | `content/investing.yaml` | Investing philosophy page |
| 06 | `content/vision.yaml` | Vision page: target schools, career roadmap |
| 07 | `content/resume.yaml` | Resume + admissions pages |
| 08 | `content/journey.yaml` | The life-graph chart on the homepage |

## Photos still needed

- `content/images/hero-placeholder.jpg` — homepage hero photo
- `content/images/about-placeholder.jpg` — About page photo
- 8 portfolio photos listed inside `content/portfolio.yaml` (each
  item's `image:` field shows the expected path and `image_alt`
  describes what the shot should be)
- A demo reel link for the empty `video_url:` field in `content/portfolio.yaml`

## Hard rules (apply everywhere)

- Never add a phone number anywhere on the site
- Never publish specific dollar balances or returns
- Family-mentored framing only — never "self-taught"
- BlackRock framing stays soft — a connection "opens the door," never "secures a job"
- No em dashes anywhere
