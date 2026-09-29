# Session Notes — 24 Sep 2026

> Morning rollback → BrandStatement redesign (camera card + full-height GSAP marquee) → **full-site dark theme conversion, homepage complete**.

---

## Summary

1. **Rollback (start of day)** — Restored pre-session files byte-exact from the opencode session DB: `src/lib/lineart.ts`, `src/animations/lineart.ts`, `Lineart.astro`, `reveal.ts`, DroneSection/ContentProduction/SocialMedia, `index.astro`, `BrandStatement.astro`; deleted `CreateEcho.astro`.
2. **BrandStatement redesign** — Lineart img removed → Unsplash studio bg + 2-col grid: left camera-viewfinder card, right vertical GSAP marquee (3 ReelsCarousel videos, seamless loop, full-section height). Horizontal `ReelsCarousel` removed from homepage (component file kept). Word-group reveal fix in `reveal.ts`/`lineart.ts`. Marquee: no bg, radius 0, border 0. Section made light (cream wash matching hero) — root cause of earlier darkness: `ThemeToggle` sets `html.dark`, so `from-background` resolved to the dark token.
3. **Dark theme (major)** — User directive: whole website dark-only, warm dark `#12100C`, logo recolor deferred to user. Homepage fully converted + verified. **Next: inner pages page-by-page (About first).**

---

## Dark Theme Decisions (locked with user)

| Decision | Choice |
|---|---|
| Scope | **Dark-only** — no light theme, ThemeToggle detached |
| Page background | **Warm dark `#12100C`** (harmonizes with gold) |
| Logo | User will recolor later (WP-hosted SVG, external) |

---

## Design Tokens (current — dark only)

All in `src/styles/global.css`, written directly into `@theme`, `:root`, **and** `.dark` (synced identical; `html.dark` kept so shadcn `dark:` variants + `@custom-variant` still work).

| Token | Value | Notes |
|---|---|---|
| `--color-bg` / `--background` | `#12100C` | Warm dark page bg |
| `--color-text` / `--foreground` | `#F2EEE5` | Brand cream |
| `--card` / `--popover` | `#1A1712` | Elevated surfaces (Testimonials, BlogPreview) |
| `--muted` | `#24201A` | Input/hover fills (surface — NOT text) |
| `--muted-foreground` | `#A39C8D` | **Muted text** (`text-muted-foreground`) |
| `--primary` / `--accent` | `#C48A2A` | Gold |
| `--primary-foreground` / `--accent-foreground` | `#12100C` | Dark ink on gold (contrast ✓) |
| `--secondary` / `--color-accent-blue` | `#5B8CFF` | Lifted blue (replaces navy `#1A3A8A`) |
| `--secondary-foreground` | `#12100C` | Dark ink on blue |
| `--border` | `rgba(196,138,42,0.18)` | Gold-tinted |
| `--color-cream` | `#f2eee5` | Still light — used as literal cream ink where needed |
| `color-scheme` | `dark` | `:root` + `.dark` |
| BrandStatement card | `#0D0B07` | Warm near-black "screen" + gold border |
| Hero overlay `.video-bg__overlay` | `rgba(18,16,12,.85/.9/.95)` | Was cream rgba |

### Contrast rules established
- Gold buttons: `bg-primary/accent text-primary-foreground` or `text-bg` → dark ink on gold ✓
- Blue surfaces (CTA, hover fills): **`text-bg` / `hover:text-bg`** (never `text-cream`/`text-text` on `#5B8CFF`)
- `text-muted` is a **surface token** → all text must use `text-muted-foreground` (swept 79 occurrences)

---

## Dark Theme Implementation (homepage phase)

### Phase 1 — Token layer (`src/styles/global.css`)
- `@theme`: `--color-bg: #12100C`, `--color-text: #F2EEE5`, `--color-accent-blue: #5B8CFF`, `--color-border: rgba(196,138,42,0.18)`
- `:root` + `.dark` shadcn vars rewritten to the dark palette (identical values); `color-scheme: dark`
- `.video-bg__overlay` → dark warm wash
- **Lineart rule (19 imgs, no component edits):**
  ```css
  .dark img.mix-blend-multiply {
    filter: invert(1) sepia(0.3);
    mix-blend-mode: screen;
  }
  ```
  (sketches are ink-on-cream-paper → invert → white lines, screen drops paper; verified visually)
- `.dark` block kept in sync for shadcn `dark:` variants

### Phase 2 — Force dark, remove toggle
- `src/layouts/BaseLayout.astro` → `<html lang="en" class="dark">` (static, no FOUC, no localStorage)
- `src/components/layout/Header.astro` → ThemeToggle import + render removed. **`ThemeToggle.astro` kept on disk, unused** (no git — don't delete)
- Header CTA: `bg-accent-blue text-cream` → `bg-accent-blue text-bg` (cream-on-blue was ~2.7:1 ✗)

### Phase 3 — Component fixes
- `BrandStatement.astro`: `bg-[#f2eee5]` → `bg-bg`; cream inline gradient → `rgba(18,16,12,…)`; card → `bg-[#0D0B07]`; marquee edge fades `from-[#0A0A0F]/60` → `from-bg/70`
- `CTASection.astro` + `ServicesList.astro`: `hover:bg-accent-blue hover:text-text` → `hover:text-bg`
- Global sweep `text-muted` → `text-muted-foreground` (79 hits / 19 files, negative-lookahead so no `foreground-foreground` doubles)
- Reveal animations confirmed already GSAP ScrollTrigger (`initTextReveal` char flip + `data-reveal` up), headless-measured 0→1 on scroll

---

## BrandStatement (final state this session)

- Section: `bg-bg` + Unsplash camera photo (`opacity-20`, `data-bs-bg`) + dark cream-wash-style overlay, `border-b border-border`
- Left: camera viewfinder card `bg-[#0D0B07] rounded-[3rem] md:rounded-[5rem] border-border`, gold corner brackets, REC/ISO HUD strips, title `data-text-reveal` (word-group spans, no mid-word breaks), 3 paragraphs `data-reveal="up"`
- Title sizing: `text-2xl md:text-[1.5rem] lg:text-[clamp(2rem,3vw,2.75rem)]` (one line per reveal-line)
- Right: vertical GSAP marquee — wrapper `min-h-[560px] md:min-h-0 md:-my-36` (bleeds into `md:py-36`), **no bg, no radius, no border**; track absolute, `yPercent: -50`, 22s loop; slides `height: var(--bs-h)` set by ResizeObserver; 3 videos + 3 aria-hidden dupes, `mb-6` margins for exact seam; edge fades `from-bg/70`
- Videos: `/assets/sample-restaurant.mp4`, `sample-shop.mp4`, `sample-factory.mp4`
- `ReelsCarousel.astro` unreferenced (kept on disk)

---

## Verification (homepage)

- `npx astro check` → **0 errors, 0 warnings**
- `npm run build` → **23 pages**, complete
- Headless (production `astro preview` :4322): **0 console errors**; computed — body `rgb(18,16,12)`, text cream, muted `rgb(163,156,141)`, h1 `rgb(91,140,255)`, lineart `invert(1) sepia(.3)` + `screen`, `html.dark` ✓, toggle absent, loader hides
- Screenshots reviewed: hero, BrandStatement, What-We-Do, Creative Process (inverted sketch ✓), Drone SVG (gold `currentColor` ✓), Testimonials, CTA, Footer ✓

---

## Gotchas / Environment

- **No git repo** — recovery of old file versions via opencode DB: `~/.local/share/opencode/opencode.db`, table `part`; writes at `data.state.input.content`, reads at `data.state.output` (strip `N: ` prefixes, cut `(End of file…)` + `</content>`)
- **Dev server :4321 had stale Vite cache** (`504 Outdated Optimize Dep`) → unreliable screenshots; verify against `npm run build` + `astro preview` (:4322) instead; restart dev server when convenient
- Headless testing: `puppeteer-core` in `/tmp` + system Chrome; **disable `scroll-behavior: smooth`** before scripted `scrollTo` + screenshot (smooth animation made screenshots land on wrong sections)
- Video `ERR_ABORTED` for `the-digital-echo.local` hero mp4 = expected off-network, not a bug
- `ThemeToggle.astro`, `ReelsCarousel.astro`, `HomeHero.astro` (unused) kept on disk as dormant files
- Logo: `PUBLIC_LOGO_URL` → WP-hosted SVG; reads acceptably on dark (blue+gold) but user plans recolor

---

## Page-by-page dark conversion status

| Page / area | Status |
|---|---|
| **Homepage** (all 12 sections + Header/Footer/Nav/Loader) | ✅ Done + verified |
| Global token layer + `text-muted` sweep (touches all pages) | ✅ Done |
| About | ⏳ Next |
| Contact | ⏳ |
| Blog (index + slug) | ⏳ |
| Projects (index + slug) | ⏳ |
| Services (index + slug) | ⏳ |
| Privacy / Terms / Cookies / 404 | ⏳ |
| FullscreenNav / PageLoader / Cursor / Lightbox | ⚠️ Mostly token-driven — verify during page passes |
| Logo recolor | ⏳ User-owned |

## Next session
1. Convert + visually verify **About page** (grep residual light literals, check lineart invert, `bg-accent/5|10` tints, gold CTAs), then continue page-by-page per table above.
2. Per-page checklist: residual hex grep → screenshot on :4322 → contrast spot-check → `astro check` + `build`.
3. Optional cleanup later: decide fate of dormant ThemeToggle/ReelsCarousel/HomeHero; user logo recolor.
