# ianbrogan.com

Personal site for Ian Brogan — finance, making, and craft.

Built with Astro 5 + Tailwind CSS 4 + TypeScript. Deployed to GitHub Pages.

---

## Manual steps to go live

### 1. Buy the domain
Purchase `ianbrogan.com` from Namecheap, Cloudflare Registrar, or similar.

### 2. Create the GitHub repo and push the code

If you have the `gh` CLI authenticated:
```bash
gh repo create ianbrogan --public --source=. --remote=origin --push
```

Otherwise:
1. Create a new **public** repo at github.com (name it anything — `ianbrogan` is clean)
2. Push this code:
   ```bash
   git init
   git add .
   git commit -m "initial build"
   git remote add origin https://github.com/YOUR-USERNAME/REPO-NAME.git
   git push -u origin main
   ```

### 3. Enable GitHub Pages
1. Go to the repo on GitHub
2. **Settings → Pages**
3. Under **Source**, select **GitHub Actions**
4. Save

The first push already triggered a deploy attempt. Once Pages is enabled,
it will succeed on the next push (or re-run the failed action).

### 4. Set up DNS
In your domain registrar's DNS panel, add these records:

**A records (apex domain → GitHub):**
```
Type: A  Name: @  Value: 185.199.108.153
Type: A  Name: @  Value: 185.199.109.153
Type: A  Name: @  Value: 185.199.110.153
Type: A  Name: @  Value: 185.199.111.153
```

**CNAME (www redirect):**
```
Type: CNAME  Name: www  Value: YOUR-USERNAME.github.io
```

DNS propagates in 10 minutes to 24 hours.

**AAAA records (IPv6, optional but recommended):**
```
Type: AAAA  Name: @  Value: 2606:50c0:8000::153
Type: AAAA  Name: @  Value: 2606:50c0:8001::153
Type: AAAA  Name: @  Value: 2606:50c0:8002::153
Type: AAAA  Name: @  Value: 2606:50c0:8003::153
```

### 5. Add your Formspree ID
1. Sign up at formspree.io → create a new form → copy the form ID
2. Open `src/components/Contact.astro`
3. Find: `action="https://formspree.io/f/FORMSPREE_ID"`
4. Replace `FORMSPREE_ID` with your actual ID
5. Commit and push

### 6. Add real photos
See `MEDIA-TODO.md` for the full list of needed photos.
Upload to `/content/images/` and update the paths in the YAML content files.
See `EDITING.md` for step-by-step instructions.

### 7. Add your resume PDF
Export your resume as `resume.pdf` and upload it to `/public/resume.pdf`.

---

## Everyday editing

See `EDITING.md` for a non-coder guide to updating text, adding journal posts,
and swapping photos — all doable via the GitHub web interface.

See `content/README.md` for a map of which file controls which section.

---

## Local development

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # production build
npm run typecheck  # TypeScript check
```

Node 22 recommended.
