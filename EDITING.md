# EDITING GUIDE — ianbrogan.com

How to update the site content without touching code. Everything can be done
entirely in the GitHub web interface — no local tools required.

---

## How a change goes live

1. Edit a file on GitHub (click the pencil icon)
2. Scroll down → click **Commit changes**
3. GitHub Actions runs the build (~1 minute)
4. Change is live at ianbrogan.com

---

## Editing text

All text lives in `/content/*.yaml` files. Each file is heavily commented
so you know what every field controls.

**To change a piece of text:**
1. Go to the file in GitHub (e.g. `content/site.yaml`)
2. Click the pencil icon (Edit)
3. Find the field (the comments explain what each one does)
4. Change the value
5. Commit → live in ~1 min

**YAML rules:**
- Keep the indentation (spaces, not tabs)
- Text with special characters like `:` or `#` should be wrapped in quotes: `"like this"`
- Multi-line blocks use `|` followed by indented text:
  ```yaml
  body: |
    First paragraph here.

    Second paragraph here.
  ```

---

## Editing journal posts

Journal posts live in `/content/journal/` as `.mdx` files.

**To add a new post:**
1. Go to `content/journal/` on GitHub
2. Click **Add file → Create new file**
3. Name it `my-post-title.mdx`
4. Start with this frontmatter:
   ```
   ---
   title: "Your Post Title"
   date: 2026-07-01
   description: "One sentence summary shown in previews."
   tags: ["investing", "making"]
   draft: false
   ---

   Your post content here. Use Markdown formatting.
   ```
5. Commit → post appears on /journal and home page

**To hide a post (draft):** set `draft: true` in the frontmatter.

**Markdown basics in posts:**
- `## Heading` for section headers
- `**bold**` for bold text
- `*italic*` for italic
- `---` for a horizontal divider
- `> quoted text` for a blockquote

---

## Swapping images

All image paths are in the YAML content files. Images are stored in `/content/images/`.

**To add a photo:**
1. Go to `content/images/` on GitHub
2. Click **Add file → Upload files**
3. Drag your photo in, commit

**To swap a photo:**
1. Upload the new file to `/content/images/`
2. Find the matching YAML file (see `/content/README.md` for the map)
3. Change the `image:` path to match your new filename
4. Commit → image updates on the live site

**Best practices for images:**
- JPG or WebP for photos (JPG is fine)
- Keep file sizes under 2MB (Astro will optimize them automatically)
- Name files clearly: `resin-table-wide.jpg` not `IMG_4823.jpg`

---

## Contact form

The form uses Formspree. Once you have a Formspree account and form ID:

1. Open `src/components/Contact.astro`
2. Find this line: `action="https://formspree.io/f/FORMSPREE_ID"`
3. Replace `FORMSPREE_ID` with your actual ID
4. Commit

---

## Resume PDF

To update the downloadable resume:
1. Export your resume as `resume.pdf`
2. Go to `/public/` on GitHub
3. Upload the file (overwrite the existing `resume.pdf` if it exists)
4. Commit — the download button on the site will serve the new file

---

## Pages that are hidden from nav

- `/resume` — direct link only, shown in footer
- `/admissions` — for college admissions readers; not indexed by search engines

---

## What NOT to edit

Files outside `/content/` and `/public/` are code. Editing them requires
understanding Astro/TypeScript. If something looks broken after an edit outside
those folders, revert the file on GitHub (History → Revert).

The one exception: if you need to add your Formspree ID, that's in
`src/components/Contact.astro` — a one-word change, easy to find with Ctrl+F.
