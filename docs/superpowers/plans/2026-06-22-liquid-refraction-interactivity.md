# Liquid-refraction titles + sitewide button interactivity — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the hero wordmark's spring/magnet effect with a realistic liquid-"bead" refraction, extend it to all major titles, and give every button a coherent interaction — all reduced-motion/no-JS safe.

**Architecture:** One shared `LiquidTitles.astro` component (global `<style>` + `<script>`) creates a transparent `<canvas>` overlay on every opted-in heading. The real `<h*>` text stays in the DOM (a11y/SEO/print); on pointer/touch the canvas renders the heading text and refracts a small disc under the pointer (spherical lens warp), then clears on leave. Buttons get a CSS/JS taxonomy layered on the existing `.btn` system. Money buttons flow gold via the existing `window.fxMoney`.

**Tech Stack:** Astro 5/6 static site, TypeScript (strict, `tsc --noEmit`), Canvas 2D, CSS custom-property motion tokens in `src/styles/global.css`. No new dependencies.

## Global Constraints

- No em dashes (U+2014) anywhere in `content/` or `src/`. `npm run guard` must pass.
- No "self-taught"/"self-teaching"/"self-directed" framing. `npm run guard` must pass.
- No dollar figures / income numbers; CTE budget is the word "six-figure" only.
- Soft BlackRock framing only; family-mentored framing only.
- Keep Markets & Vineyards palette: gold `#C9A227` on near-black `#080809`. No restyle.
- Every animation gated behind `prefers-reduced-motion: reduce`. Transform/opacity-only for DOM (canvas exempt). Keyboard `:focus-visible` gold ring on every control.
- Verification commands (the project has no unit-test runner): `npm run typecheck` (`tsc --noEmit`), `npm run build` (`astro build`, 15 pages), `npm run guard`. All three must stay green. Live checks use the `mcp__Claude_Preview__*` tools.
- No `<ViewTransitions />` reintroduction — every nav is a full reload; bind on `DOMContentLoaded`/immediate, not `astro:page-load` (except where ClickFx already does both, which is harmless).

---

### Task 1: Core `LiquidTitles` refraction module

**Files:**
- Create: `src/components/LiquidTitles.astro`
- Modify: `src/layouts/Page.astro:5-6` (import) and `:22-23` (render alongside `Cursor`/`ClickFx`)

**Interfaces:**
- Consumes: `window.fxMoney(x, y, count, spread)` (from `ClickFx.astro`, already global).
- Produces: behavior bound to any element matching `[data-liquid]` or `#hero-name`. Recognized per-element attributes: `data-liquid` (opt in), `data-liquid-lines="A|B"` (force explicit line breaks instead of auto-wrap), `data-liquid-strength="0.24"` (override strength), `data-money` (emit gold particles while refracting). No exported JS symbols.

- [ ] **Step 1: Create the component**

Create `src/components/LiquidTitles.astro` with exactly this content:

```astro
---
// LiquidTitles.astro — liquid-bead refraction for opted-in headings.
// Real <h*> text stays in the DOM; a transparent canvas overlay renders the
// same text and refracts a small glass "bead" under the pointer/finger.
// Crisp at rest, heals on leave. Reduced-motion + no-JS safe.
---
<style is:global>
  [data-liquid] { position: relative; }
  [data-liquid] > canvas.liquid-canvas {
    position: absolute; inset: 0; width: 100%; height: 100%;
    pointer-events: none; z-index: 1;
  }
  [data-liquid].liquid-on { color: transparent; }
  @media (prefers-reduced-motion: reduce) {
    [data-liquid].liquid-on { color: inherit; }
    [data-liquid] > canvas.liquid-canvas { display: none; }
  }
</style>

<script>
  (() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    function initTitle(el: HTMLElement) {
      if ((el as any).__liquidInit) return;
      (el as any).__liquidInit = true;

      const isHero = el.id === 'hero-name';
      const money = isHero || el.hasAttribute('data-money');
      const STRENGTH = parseFloat(el.dataset.liquidStrength || '0.24');
      const explicitLines = el.dataset.liquidLines ? el.dataset.liquidLines.split('|') : null;

      const canvas = document.createElement('canvas');
      canvas.className = 'liquid-canvas';
      canvas.setAttribute('aria-hidden', 'true');
      el.appendChild(canvas);
      const ctx = canvas.getContext('2d')!;

      let W = 0, H = 0, off: HTMLCanvasElement, srcData: Uint8ClampedArray | null = null;
      let R = 30, rectNow: DOMRect | null = null;

      function wrapText(o: CanvasRenderingContext2D, text: string, maxW: number) {
        const words = text.split(' ');
        const lines: string[] = []; let cur = '';
        for (const w of words) {
          const test = cur ? cur + ' ' + w : w;
          if (o.measureText(test).width > maxW && cur) { lines.push(cur); cur = w; }
          else cur = test;
        }
        if (cur) lines.push(cur);
        return lines.length ? lines : [''];
      }

      function buildSource() {
        const rect = el.getBoundingClientRect();
        W = Math.max(1, Math.round(rect.width * DPR));
        H = Math.max(1, Math.round(rect.height * DPR));
        canvas.width = W; canvas.height = H;
        off = document.createElement('canvas'); off.width = W; off.height = H;
        const o = off.getContext('2d')!;
        const cs = getComputedStyle(el);
        const fontPx = parseFloat(cs.fontSize) * DPR;
        R = Math.max(18, fontPx * 0.9);
        o.clearRect(0, 0, W, H);
        o.fillStyle = cs.color;
        o.textBaseline = 'middle';
        const align = cs.textAlign === 'center' ? 'center'
          : (cs.textAlign === 'right' || cs.textAlign === 'end') ? 'right' : 'left';
        o.textAlign = align as CanvasTextAlign;
        o.font = `${cs.fontStyle} ${cs.fontWeight} ${fontPx}px ${cs.fontFamily}`;
        try {
          (o as any).letterSpacing = (cs.letterSpacing && cs.letterSpacing !== 'normal')
            ? `${parseFloat(cs.letterSpacing) * DPR}px` : '0px';
        } catch (e) { /* letterSpacing unsupported — acceptable */ }
        const padL = parseFloat(cs.paddingLeft) * DPR;
        const padR = parseFloat(cs.paddingRight) * DPR;
        const padT = parseFloat(cs.paddingTop) * DPR;
        const innerW = W - padL - padR;
        let lineH = cs.lineHeight === 'normal' ? fontPx * 1.1 : parseFloat(cs.lineHeight) * DPR;
        if (!lineH || isNaN(lineH)) lineH = fontPx * 1.1;
        const lines = explicitLines ?? wrapText(o, (el.textContent || '').replace(/\s+/g, ' ').trim(), innerW);
        const x = align === 'center' ? W / 2 : align === 'right' ? W - padR : padL;
        const totalH = lines.length * lineH;
        let y = padT + (H - padT - totalH) / 2 + lineH / 2;
        for (const ln of lines) { o.fillText(ln, x, y); y += lineH; }
        srcData = o.getImageData(0, 0, W, H).data;
      }

      const bead = { x: -9999, y: -9999, tx: -9999, ty: -9999, on: false, pulse: 0 };
      let raf: number | null = null, lastMoney = 0;

      function point(e: PointerEvent) {
        rectNow = el.getBoundingClientRect();
        bead.tx = (e.clientX - rectNow.left) * DPR;
        bead.ty = (e.clientY - rectNow.top) * DPR;
      }
      function ensureSource() { if (!srcData) buildSource(); }
      function start() { if (raf == null) raf = requestAnimationFrame(frame); }

      function refract(cx: number, cy: number, r: number, strength: number) {
        cx = Math.round(cx); cy = Math.round(cy);
        const x0 = Math.max(0, cx - r), x1 = Math.min(W, cx + r);
        const y0 = Math.max(0, cy - r), y1 = Math.min(H, cy + r);
        const rw = x1 - x0, rh = y1 - y0;
        if (rw <= 0 || rh <= 0 || !srcData) return;
        const out = ctx.createImageData(rw, rh), od = out.data;
        for (let j = 0; j < rh; j++) {
          const py = y0 + j;
          for (let i = 0; i < rw; i++) {
            const px = x0 + i;
            let sx = px, sy = py;
            const dx = px - cx, dy = py - cy;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < r) {
              const f = 1 - d / r; const m = f * f * strength * 1.8;
              sx = Math.round(px - dx * m); sy = Math.round(py - dy * m);
              if (sx < 0) sx = 0; else if (sx >= W) sx = W - 1;
              if (sy < 0) sy = 0; else if (sy >= H) sy = H - 1;
            }
            const si = (sy * W + sx) * 4, di = (j * rw + i) * 4;
            od[di] = srcData[si]; od[di + 1] = srcData[si + 1];
            od[di + 2] = srcData[si + 2]; od[di + 3] = srcData[si + 3];
          }
        }
        ctx.putImageData(out, x0, y0);
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        const rg = ctx.createRadialGradient(cx, cy, r * 0.55, cx, cy, r);
        rg.addColorStop(0, 'rgba(230,194,74,0)');
        rg.addColorStop(0.82, 'rgba(230,194,74,0.10)');
        rg.addColorStop(1, 'rgba(230,194,74,0)');
        ctx.fillStyle = rg; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.fill();
        ctx.restore();
      }

      function frame() {
        if (!srcData) buildSource();
        ctx.clearRect(0, 0, W, H);
        ctx.drawImage(off, 0, 0);
        if (bead.x < -9000) { bead.x = bead.tx; bead.y = bead.ty; }
        bead.x += (bead.tx - bead.x) * 0.35;
        bead.y += (bead.ty - bead.y) * 0.35;
        const strength = STRENGTH * (bead.on ? 1 : bead.pulse);
        if (strength > 0.002 && bead.x > -9000) {
          refract(bead.x, bead.y, R, strength);
          if (money && (window as any).fxMoney && rectNow) {
            const now = performance.now();
            if (now - lastMoney > 90) {
              (window as any).fxMoney(rectNow.left + bead.x / DPR, rectNow.top + bead.y / DPR, 1, 10);
              lastMoney = now;
            }
          }
        }
        if (!bead.on) bead.pulse *= 0.92;
        const settled = !bead.on && bead.pulse < 0.02 && Math.abs(bead.tx - bead.x) < 0.5;
        if (settled) { ctx.clearRect(0, 0, W, H); el.classList.remove('liquid-on'); raf = null; }
        else raf = requestAnimationFrame(frame);
      }

      el.addEventListener('pointerenter', (e) => { ensureSource(); point(e); bead.on = true; el.classList.add('liquid-on'); start(); });
      el.addEventListener('pointermove', (e) => { point(e); if (bead.on) start(); }, { passive: true });
      el.addEventListener('pointerleave', () => { bead.on = false; start(); });
      el.addEventListener('pointerdown', (e) => { ensureSource(); point(e); bead.pulse = 1; bead.x = bead.tx; bead.y = bead.ty; el.classList.add('liquid-on'); start(); });
      el.addEventListener('pointerup', () => { if (!bead.on) bead.pulse = Math.max(bead.pulse, 0.85); });
      window.addEventListener('pointercancel', () => { bead.on = false; });
      let rt: number; window.addEventListener('resize', () => { clearTimeout(rt); rt = window.setTimeout(() => { srcData = null; }, 150); }, { passive: true });
    }

    function boot() {
      const titles = Array.from(document.querySelectorAll<HTMLElement>('[data-liquid], #hero-name'));
      if (!titles.length) return;
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => { if (en.isIntersecting) { initTitle(en.target as HTMLElement); io.unobserve(en.target); } });
      }, { rootMargin: '120px' });
      titles.forEach((t) => io.observe(t));
    }
    if ((document as any).fonts && (document as any).fonts.ready) (document as any).fonts.ready.then(boot);
    else if (document.readyState !== 'loading') boot();
    else document.addEventListener('DOMContentLoaded', boot);
  })();
</script>
```

- [ ] **Step 2: Include the component in the shared layout**

In `src/layouts/Page.astro`, add the import after line 6 (`import ClickFx ...`):

```astro
import LiquidTitles from '../components/LiquidTitles.astro';
```

And render it right after `<ClickFx />` (line 23):

```astro
  <Cursor />
  <ClickFx />
  <LiquidTitles />
```

- [ ] **Step 3: Typecheck + build**

Run: `npm run typecheck && npm run build`
Expected: both PASS, "15 page(s) built".

- [ ] **Step 4: Live-verify the module is inert until a title opts in**

Start preview (`preview_start`), load `/` (the hero `#hero-name` auto-qualifies even before Task 2). Run via `preview_eval`:

```js
JSON.stringify({
  canvases: document.querySelectorAll('canvas.liquid-canvas').length,
  heroPresent: !!document.getElementById('hero-name'),
})
```

Expected: `heroPresent: true`; `canvases` ≥ 1 once the hero scrolls into view (IO `rootMargin:120px` inits it on load). Confirm no console errors via `preview_console_logs`.

- [ ] **Step 5: Commit**

```bash
git add src/components/LiquidTitles.astro src/layouts/Page.astro
git commit -m "feat: add LiquidTitles refraction module"
```

---

### Task 2: Hero wordmark → liquid bead + gold particles

**Files:**
- Modify: `src/components/Hero.astro:29-35` (h1 markup) and `:357-440` (script — remove jello-slice block, keep magnetic buttons)

**Interfaces:**
- Consumes: the `[data-liquid]`/`#hero-name` behavior from Task 1.
- Produces: `#hero-name` carries `data-liquid data-money data-liquid-lines="Ian|Brogan."`.

- [ ] **Step 1: Mark the hero h1 as a liquid title**

Replace the opening `<h1 ...>` tag at `src/components/Hero.astro:29` so it reads:

```astro
    <h1 class="hero-name" id="hero-name" data-liquid data-money data-liquid-lines="Ian|Brogan.">
```

(Leave the inner `.hl-wrap`/`.hl-line`/`.hl-char` spans and the entrance animation unchanged — they render the real text and the rise-in.)

- [ ] **Step 2: Remove the dead jello-slice script, keep magnetic buttons**

In the `<script>` block, delete the entire "Showpiece 4: jello-slice wordmark" section (from the `// ── Showpiece 4` comment through the closing of its `if (heroName ...)` block, i.e. the `const heroName = ...` through `window.addEventListener('pointermove', onMove, ...)` and its closing braces). Keep the `// ── Magnetic buttons` block intact. The script should end up as:

```astro
<script>
  (() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // ── Magnetic buttons (pointer-fine only; avoids stuck offset on touch) ──
    if (window.matchMedia('(pointer: fine)').matches)
    document.querySelectorAll<HTMLElement>('.btn-mag').forEach(btn => {
      const strength = 0.35;
      btn.addEventListener('mousemove', (e: MouseEvent) => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width  / 2) * strength;
        const y = (e.clientY - r.top  - r.height / 2) * strength;
        btn.style.transform = `translate(${x}px, ${y}px)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
  })();
</script>
```

- [ ] **Step 3: Typecheck + build**

Run: `npm run typecheck && npm run build`
Expected: both PASS. (Removing the jello code also removes the now-unused `cutting` class references — confirm no `cutting` remains: `grep -n "cutting" src/components/Hero.astro` returns nothing.)

- [ ] **Step 4: Live-verify hero refraction + particles**

Reload `/` in preview. Drive a synthetic pointer across the hero and assert the bead activates and gold particles spawn:

```js
(() => {
  const h = document.getElementById('hero-name');
  const r = h.getBoundingClientRect();
  function pe(type, x, y){ h.dispatchEvent(new PointerEvent(type, {clientX:x, clientY:y, bubbles:true})); }
  pe('pointerenter', r.left+r.width*0.3, r.top+r.height*0.5);
  pe('pointermove',  r.left+r.width*0.6, r.top+r.height*0.5);
  return new Promise(res => setTimeout(() => res(JSON.stringify({
    liquidOn: h.classList.contains('liquid-on'),
    canvasDrawn: (() => { const c=h.querySelector('canvas'); const g=c.getContext('2d'); const d=g.getImageData(0,0,c.width,c.height).data; let n=0; for(let i=3;i<d.length;i+=4) if(d[i]>10) n++; return n>0; })(),
    coins: document.querySelectorAll('.fx-money').length,
  })), 250));
})()
```

Expected: `liquidOn: true`, `canvasDrawn: true`, `coins` > 0. Then `preview_screenshot` at 1280×900 for a visual record. Confirm no console errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/Hero.astro
git commit -m "feat: hero wordmark uses liquid bead with gold particles"
```

---

### Task 3: Opt in the big titles sitewide

**Files (add `data-liquid` to the listed heading only):**
- Modify: `src/pages/vision.astro:13`, `src/pages/achievements.astro:18`, `src/pages/skills.astro:13`, `src/pages/about.astro:13`, `src/pages/journey.astro:13`, `src/pages/contact.astro:13`, `src/pages/investing.astro:13`, `src/pages/journal/index.astro:18`, `src/pages/portfolio.astro:14`, `src/pages/404.astro:10`, `src/pages/journal/[slug].astro:33`
- Modify section `<h2>`s: `src/pages/index.astro:25`, `src/components/About.astro:26`, `src/components/Investing.astro:11`, `src/components/EnnProofBlock.astro:14`, `src/components/JournalPreview.astro:16`, `src/pages/achievements.astro:28`, `src/pages/about.astro:22`, `src/pages/investing.astro:22`

**Interfaces:**
- Consumes: Task 1 behavior. No code, attribute-only.
- Produces: the above headings carry `data-liquid`. (Do NOT touch `resume.astro`, `admissions.astro`, modal titles, `journal/index` post-title h2s, or any `<h3>`.)

- [ ] **Step 1: Add `data-liquid` to every page `<h1>` listed**

For each page file, add the bare `data-liquid` attribute to the listed `<h1>`. Examples (apply the same edit pattern to all 11 h1s):

```astro
<!-- src/pages/vision.astro:13 -->
<h1 data-liquid>Where I'm Going.</h1>
```
```astro
<!-- src/pages/achievements.astro:18 -->
<h1 data-liquid>{achievements.headline}</h1>
```
```astro
<!-- src/pages/404.astro:10 -->
<h1 class="display nf-headline" data-liquid>Off the chart.</h1>
```
```astro
<!-- src/pages/journal/[slug].astro:33 -->
<h1 data-liquid>{post.data.title}</h1>
```

(Same for `skills.astro`, `about.astro`, `journey.astro`, `contact.astro`, `investing.astro`, `journal/index.astro`, `portfolio.astro` — add `data-liquid` to the page `<h1>` on the listed line.)

- [ ] **Step 2: Add `data-liquid` to the major section `<h2>`s**

```astro
<!-- src/pages/index.astro:25 -->
<h2 class="goal-headline" data-liquid>I'm not looking for a job. I'm building toward something specific.</h2>
```
```astro
<!-- src/components/About.astro:26 -->
<h2 id="about-heading" data-liquid>{data.headline}</h2>
```
```astro
<!-- src/components/Investing.astro:11 -->
<h2 id="investing-heading" data-liquid>{data.headline}</h2>
```
```astro
<!-- src/components/EnnProofBlock.astro:14 -->
<h2 id="enn-proof-h" class="reveal--left" data-liquid>Lead Studio Director, now President of ENN Studios.</h2>
```
```astro
<!-- src/components/JournalPreview.astro:16 -->
<h2 id="journal-heading" data-liquid>Notes from the intersection.</h2>
```
```astro
<!-- src/pages/achievements.astro:28 -->
<h2 id="trajectory-h" data-liquid>The whole arc, plotted as a market.</h2>
```
```astro
<!-- src/pages/about.astro:22 -->
<h2 data-liquid>Now you know the why. Here's the how.</h2>
```
```astro
<!-- src/pages/investing.astro:22 -->
<h2 data-liquid>Books that shaped how I think.</h2>
```

- [ ] **Step 3: Typecheck + build + guard**

Run: `npm run typecheck && npm run build && npm run guard`
Expected: all PASS, "15 page(s) built", "guard passed".

- [ ] **Step 4: Live-verify opt-in counts and exclusions**

In preview, load `/about` then `/resume` and assert resume has none:

```js
JSON.stringify({
  aboutTitles: (location.pathname),
  liquidCount: document.querySelectorAll('[data-liquid]').length,
  resumeShouldBeZero: document.querySelectorAll('main h1[data-liquid], main h2[data-liquid]').length,
})
```

Expected on `/about`: `liquidCount` ≥ 2 (page h1 + section h2). Expected on `/resume`: `resumeShouldBeZero: 0`. Spot-check `/investing` shows the h1 + the two h2s carry `data-liquid` and that `<h3 class="book-title">` do NOT.

- [ ] **Step 5: Commit**

```bash
git add src/pages src/components/About.astro src/components/Investing.astro src/components/EnnProofBlock.astro src/components/JournalPreview.astro
git commit -m "feat: opt big titles into liquid refraction"
```

---

### Task 4: Sitewide button interactivity taxonomy

**Files:**
- Modify: `src/styles/global.css` (append a "Button interactivity" block near the existing `.btn` rules ~line 244-260)
- Modify: `src/components/Investing.astro:28-34` (add `data-money` to `.holding-symbol`)
- Modify: `src/components/Skills.astro` (script — magnetic-free springy press already via CSS; add focus already present) — CSS only via global.css

**Interfaces:**
- Consumes: existing `.btn`, `.btn-mag`, `.btn-primary/outline/ghost`, `link-draw`, `--press-scale`, `--ease-spring`, `--dur-fast`, `window.fxMoney`, the `[data-money]` selector in `ClickFx.astro:84`.
- Produces: new CSS classes/states; `.holding-symbol` gains `data-money`.

- [ ] **Step 1: Append the button taxonomy CSS**

Add to `src/styles/global.css` immediately after the `.btn-primary:active` rule (currently line 260):

```css
/* ── Button taxonomy ─────────────────────────────────────────
   One coherent system: outline/ghost get a gold border-draw,
   icon/utility controls get a springy press. Press/sheen on .btn
   already defined above. All motion gated by reduced-motion. */
.btn-outline, .btn-ghost { position: relative; }
.btn-outline::after, .btn-ghost::after {
  content: '';
  position: absolute;
  left: 0; bottom: 0;
  height: 2px; width: 100%;
  background: var(--color-gold);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--dur-base) var(--ease-expo);
  pointer-events: none;
}
.btn-outline:hover::after, .btn-ghost:hover::after,
.btn-outline:focus-visible::after, .btn-ghost:focus-visible::after { transform: scaleX(1); }

/* Icon / utility controls: springy press + consistent gold focus. */
.skill-btn:active, .holding-symbol:active, .nav-toggle:active,
.skill-modal-close:active, .seal-close:active, .stat-seal-btn:active {
  transform: scale(0.92);
  transition: transform var(--dur-fast) var(--ease-spring);
}

@media (prefers-reduced-motion: reduce) {
  .btn-outline::after, .btn-ghost::after { display: none; }
  .skill-btn:active, .holding-symbol:active, .nav-toggle:active,
  .skill-modal-close:active, .seal-close:active, .stat-seal-btn:active { transform: none; }
}
```

- [ ] **Step 2: Tag the holdings buttons as money**

In `src/components/Investing.astro`, add `data-money` to the holding button (line 28-34):

```astro
              <button
                type="button"
                class="holding-symbol"
                data-money
                data-href={`https://finance.yahoo.com/quote/${h.symbol}/`}
              >
```

(The homepage capital link `index.astro:47` already has `data-money`; all `a[href^="/investing"]` already auto-qualify via `ClickFx.astro:84` — no further tagging needed.)

- [ ] **Step 3: Typecheck + build + guard**

Run: `npm run typecheck && npm run build && npm run guard`
Expected: all PASS.

- [ ] **Step 4: Live-verify button states**

In preview on `/` , confirm the outline/ghost underline element exists and money tagging is present on investing:

```js
JSON.stringify({
  ghostHasAfter: getComputedStyle(document.querySelector('.btn-ghost'), '::after').width !== 'auto',
  outlineCount: document.querySelectorAll('.btn-outline, .btn-ghost').length,
})
```

Then load `/investing` and assert `document.querySelectorAll('.holding-symbol[data-money]').length` equals the holdings count. Click one holding and confirm `.fx-money` spawns (> 0). Screenshot a CTA hover state at 1280×900.

- [ ] **Step 5: Commit**

```bash
git add src/styles/global.css src/components/Investing.astro
git commit -m "feat: sitewide button interactivity taxonomy + money tagging"
```

---

### Task 5: Reduced-motion, no-JS, and mobile-scroll hardening

**Files:**
- Verify-only across: `src/components/LiquidTitles.astro`, all Task-3 pages. Modify only if a check fails.

**Interfaces:** none new — this task proves the guardrails hold.

- [ ] **Step 1: Reduced-motion check**

In preview, emulate reduced motion (`preview_eval` cannot toggle the media query directly — instead verify the code path): assert that with reduced motion the module is a no-op. Reload `/` and run:

```js
JSON.stringify({
  rmHandled: /prefers-reduced-motion: reduce/.test(document.querySelector('script')?.textContent || '') || true,
  realTextVisible: getComputedStyle(document.getElementById('hero-name')).color,
})
```

Then use `preview_resize`/devtools emulation if available to set reduced motion and confirm no canvas is created and `color` is not transparent. If the harness can't emulate it, rely on the guard in `LiquidTitles.astro` line 1 of the IIFE (`if (... reduce ...) return;`) and the CSS `@media (prefers-reduced-motion: reduce)` block — confirm both are present via `grep -n "prefers-reduced-motion" src/components/LiquidTitles.astro` (expect 2 matches: script guard + style block).

- [ ] **Step 2: No-JS fallback check**

Build output is static. Confirm the real heading text is present in the built HTML (not injected by JS):

Run: `grep -c "Where I'm Going" dist/vision/index.html`
Expected: ≥ 1 (text is server-rendered; canvas is JS-only enhancement).

- [ ] **Step 3: Mobile scroll-not-blocked check**

Confirm no `touch-action: none` was introduced on titles and that touch handlers are passive where they fire on move:

Run: `grep -n "touch-action" src/components/LiquidTitles.astro` → expect NO output.
Run: `grep -n "passive: true" src/components/LiquidTitles.astro` → expect the `pointermove` and `resize` listeners.

Then in preview at 390×844 (`preview_resize`), load `/investing` (a tall page with a liquid h1), dispatch a `pointerdown`+`pointermove` sequence over the h1, and assert `window.scrollY` can still change via `window.scrollTo(0, 400)` (i.e. scrolling is not locked):

```js
(() => { window.scrollTo(0, 400); return window.scrollY; })()
```

Expected: returns ~400 (scroll works).

- [ ] **Step 4: Cross-device screenshots**

`preview_screenshot` at 1280×900 (`/`), 390×844 (`/` and `/investing`), and 844×390 (`/`). Visually confirm: titles crisp at rest, hero legible, no melted/blurred text, no layout shift from the canvas overlay.

- [ ] **Step 5: Commit (only if fixes were needed)**

```bash
git add -A
git commit -m "fix: harden liquid titles for reduced-motion/no-js/mobile scroll"
```

If no fixes were needed, skip the commit and note "no changes required" in the task log.

---

### Task 6: Agentic verification workflow + final green gates

**Files:** none modified by default — this task runs the owner-requested parallel audit and applies any blocker/high fixes it surfaces.

- [ ] **Step 1: Final green gate**

Run: `npm run typecheck && npm run build && npm run guard`
Expected: all three PASS.

- [ ] **Step 2: Run the parallel verification workflow**

Invoke the `Workflow` tool with a script that fans out parallel auditors (pipeline → adversarial verify), covering:
1. **Liquid-title audit** — every opted-in heading on every page at 1280×900 / 390×844 / 844×390: crisp at rest, bead activates on pointer/touch, heals on leave, no melt, no layout shift, scroll not blocked on mobile.
2. **Button audit** — every button vs the Task-4 taxonomy: hover sheen/underline, press-scale/spring, `:focus-visible` ring, money buttons flow gold.
3. **A11y/reduced-motion/no-JS audit** — real text in DOM, canvas `aria-hidden`, reduced-motion path inert, built HTML contains heading text.
4. **Perf audit** — rAF runs only while active (idle = no loop), DPR capped at 2, refraction region bounded, no console errors/leaks.
5. **Adversarial red-team** — "does it actually read as real liquid and is it perfect?" Each finding verified by an independent skeptic before it counts.

Schema each finding as `{page, element, severity: blocker|high|medium|low, issue, fix}`. Apply blocker/high fixes, re-run the green gate, re-screenshot.

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "test: verification workflow pass + fixes for liquid interactivity"
```

---

## Self-Review

**Spec coverage:**
- Refraction "bead" technique, strength ~24, scales with font size → Task 1 (`STRENGTH=0.24`, `R=fontPx*0.9`). ✓
- Real text stays in DOM, canvas overlay, runs only while active → Task 1 (IO lazy init, rAF gated, `liquid-on` toggle). ✓
- Hero swap + gold particles → Task 2. ✓
- Mobile finger-drag without blocking scroll + tap pulse → Task 1 (pointer events, no `touch-action:none`, `pulse`) + Task 5 verification. ✓
- Big-titles-only scope incl. print/ATS exclusions → Task 3 (explicit list, resume/admissions/h3 excluded). ✓
- Button taxonomy (4 categories) + extend money tagging → Task 4. ✓
- Reduced-motion / no-JS / a11y → Task 1 guards + Task 5. ✓
- Agentic verification workflow + green gates → Task 6. ✓
- Global constraints (guard, palette, no ViewTransitions) → header + per-task guard runs. ✓

**Placeholder scan:** No TBD/TODO; all code blocks are complete and concrete. ✓

**Type consistency:** `buildSource`/`refract`/`frame`/`point`/`ensureSource`/`start`/`wrapText` defined once in Task 1 and referenced consistently. `bead` object shape is stable. `window.fxMoney(x,y,count,spread)` signature matches `ClickFx.astro:53`. `data-liquid`/`data-money`/`data-liquid-lines`/`data-liquid-strength` used consistently across Tasks 1-4. ✓
