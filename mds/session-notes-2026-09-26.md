# Session Notes — 26 Sep 2026

> **Backend build-out complete (backend.md Phases 1–7, all data entered) → Phase 8 frontend rewired to live WordPress GraphQL → Phase 9 full dynamization (every user-visible copy block now WP-editable) → verified (astro check 0 errors, eslint 0 warnings, 24-page build, all routes 200, contact-form e2e → success panel).**

---

## Summary

1. **Defect fixes (Phase 1/2 leftovers)** — registered `projects` CPT (GraphQL `Project` → `projectInfo` reachable); hero id 131 `selectPage` `/about/` → `/projects/`; `siteFooter` ACF group relocated Post → Page + created `site-settings` page (id 157); deleted stray empty `serviceGroup`; renamed term `Brand Compaigns` → `Brand Campaigns`, added `Ecommerce`.
2. **Phase 3 menus** — 4 menus built (primary 6 / footer-explore 8 / footer-platforms 6 / footer-social 4 = 24 items) + locations registered in `mu-plugins/tde-setup.php` (WPGraphQL hides menus without a theme location); `siteFooter` values saved; 3 menu URLs corrected to real Astro routes (see below).
3. **Phase 4 CF7** — form **ID 158** (9 fields, §14); REST verified `mail_sent`; CORS origins `localhost:4321`/`4322`; ⚠️ `your-contact-method` **is required** (no `*` marker).
4. **Phase 5 SEO** — kept **SEOPress** (locked decision, Yoast skipped); mu-plugin registers `TdeSeo` + `seo` on Post/Page/Service/Project/Testimonial/Faq (SEOPress meta + fallbacks).
5. **Phase 6 content** — Services ×7 (159–165, menuOrder 1–7), pages incl. `site-settings`, **projects ×4 (173–176) + testimonials ×4 (177–180) as clearly-labeled DRAFT samples** (contents.md forbids fabricated data live), FAQ ×10 (menu_order 1–10), blog ×3 (181–183) published with featured images (184–186), hero ×6 all pages covered.
6. **Phase 7 media** — CDN URLs wired into heroes/brand-statement; all `images.pexels.com` placeholders (404) replaced with working `images.unsplash.com` URLs (4 files); blog thumbs sideloaded from downloaded JPEGs (remote import rejects file type).
7. **Phase 8 frontend** — GraphQL layer rewritten to the *actual* live schema (not the plan's guesses); menus/siteFooter/faqs/testimonials/seo wired into Footer, FullscreenNav, Testimonials, FAQSection, BaseLayout; CF7 POST from `contact.astro`; **Process (§9) + Industries (§10) homepage sections wired** — `getProcessSteps()` parses the `/process/` page `<ol>` (7 live steps replace 4 hardcoded), new `IndustriesSection.astro` parses `/industries/` (19 tags) and sits between Process and Testimonials per contents.md section order.
8. **Verification** — combined GraphQL spot-check green; `npx astro check` 0/0; eslint 0 warnings (fixed pre-existing unused `hero` in `blog/[slug].astro`); `npm run build` 24 pages no GraphQL errors; preview all 12 routes 200, zero JS errors; Playwright screenshots confirm live FAQ/services/footer; **contact form e2e submit → `mail_sent`**.
9. **Phase 9 dynamization (user: "please do above all dynamics")** — CF7 form rendered from WP markup (no label/option maps left), About/legal ×3/service detail/homepage section copy/section chrome titles/contact details/page CTAs/SEO schemas all read from WP (5 new ACF groups + `tdeContactForm` + service thumbnails/gallery + legal pages 254–256); fabricated team/stats/benefits/default-testimonials dropped; ACF-null merge + CF7 parser bugs fixed; schemas no longer emit invented address/geo/phone. Full detail in the "Full dynamization pass" section below.

---

## Environment / tooling (reusable)

| Thing | How |
|---|---|
| WP-CLI | `export SOCK="/Users/abid/Library/Application Support/Local/run/dR0PvBSQS/mysql/mysqld.sock"; export MYSQL_UNIX_PORT="$SOCK"; wp() { php -d mysqli.default_socket="$SOCK" /Users/abid/bin/wp --path="$HOME/Local Sites/the-digital-echo/app/public" "$@"; }` (zsh arrays are 1-indexed) |
| SQL | `wp db query` **broken** (homebrew mysql-client auth) → Local binaries: `/Users/abid/Library/Application Support/Local/lightning-services/mysql-8.0.35+4/bin/darwin-arm64/bin/mysql --socket=$SOCK -uroot -proot local` |
| Backups | `…/T/opencode/tde-backups/pre-phases-20260926.sql`, `after-phases-1-6.sql` |
| Ports | stale `astro dev` killed; single `astro preview` (pid 15108) on **:4321**; `PUBLIC_SITE_URL=http://localhost:4321` |
| Playwright | temp dir `/var/folders/5y/…/T/opencode/tde-shots` (own `npm i playwright@1.63.0` + chromium headless shell) |
| GraphQL app password (draft testing only) | credentials redacted — stored in the local `.env` (never committed); query needs `where:{status:DRAFT}` — **frontend stays unauthenticated** |

---

## Live schema facts (schema wins over plan — all verified by introspection)

- Root has **62 fields**; only `nodeByUri` ends in "By" yet `serviceBy/postBy/projectBy/pageBy` all execute. Root is **`services`** (never `allService`); `services(where:{orderby:{field:MENU_ORDER,order:ASC}})` works.
- **Menus**: query by location (`PRIMARY`, `FOOTER_EXPLORE`, `FOOTER_PLATFORMS`, `FOOTER_SOCIAL` — registered in mu-plugin) or slug; `menuItems.nodes.menu` is an **edge** (`menu{node{name}}`).
- `siteFooter` resolves on **Page**: `pageBy(uri:"/site-settings/"){ siteFooter{ footerTagLine footerBlurb footerCta footerCopyright } }` — `footerTagLine` capital L.
- **Project**: `projectInfo { clientName idea challenge execution results serviceUsed projectDate location featured galleryUrl1..4 }` — no `strategy`/`testimonial*`; `featuredImage` exists but sample drafts have none (normalizer falls back to `galleryUrl1`); **`featured` has no where-arg** → filter client-side.
- `serviceUsed` returns a **JSON array** despite `[String]`-looking schema → normalizer handles array-or-string.
- **Testimonial**: `testimonialInfo { quote clientName companyName designation photoUrl projectType }`; frontend maps `company`/`avatar`/`designation`.
- **Faq**: no ACF — `title` = question, `content` = answer (HTML → `stripHtml()`), `menuOrder` = sort.
- **Service**: no `featuredImage`/thumbnail support → **don't** add `imageFragment` to service queries (unused fragment = GraphQL error); icon via `serviceMenuLinks.serviceMenuIcon` (URL → `<img>`).
- `MediaItem`: no top-level `width/height` → `mediaDetails { width height }`.
- 6 heroes all correct (`selectPage`: `/`, `/about/`, `/contact/`, `/services/`, `/projects/`, `/blog/`).

---

## Draft visibility decision (important)

Unauthenticated GraphQL returns **only `publish`** → projects/testimonials currently `[]`. `src/lib/data.ts` falls back to front-end mock content **when WP returns empty** (code comment documents this). Publish the samples (or real client work) in WP admin → live data swaps in with **no code change**. No fabricated metrics/quotes go live (contents.md rule).

---

## Menu URL fixes (via `update_post_meta` — `wp menu item update --url` silently no-ops)

| Menu | Item | Old (404) | New |
|---|---|---|---|
| primary | The Feed | `/social-media-marketing/` | `/services/social-media-management/` |
| footer-explore | Content Studio | `/content-production/` | `/services/content-production/` |
| footer-explore | Social Media | `/social-media-marketing/` | `/services/social-media-management/` |

---

## Phase 8 — files changed (frontend)

| File | Change |
|---|---|
| `src/graphql/fragments/index.ts` | rewritten: image/seo(`on TdeSeo`)/service/project/testimonial/faq/hero/brandStatement/menu/post fragments |
| `src/graphql/queries/*.ts` | `services.ts` (MENU_ORDER, no imageFragment), `projects.ts` (featured client-side), `posts.ts` (+seo), `pages.ts` (GET_HOME_PAGE fixed, GET_SITE_FOOTER), **new** `menus.ts`/`faqs.ts`/`testimonials.ts` |
| `src/lib/data.ts` | `toSeo`, `stripHtml`, `normalizeService/Project/Testimonial`, empty→mock fallbacks, **new** `getMenus/getFaqs/getTestimonials/getSiteFooter` |
| `src/types/index.ts` | Service seo/icon optional + uri/menuOrder; Testimonial `{quote,author,company,avatar,designation}`; + `MenuItem/MenuGroup/SiteFooter` |
| `src/layouts/BaseLayout.astro` | `seo` prop → title/description/canonical/og/twitter (wired from home/blog/service/project pages) |
| `src/pages/contact.astro` | CF7 REST POST (`158/feedback`, full FormData mapping incl. required `your-contact-method` select), success/error handling |
| `src/components/layout/Footer.astro` | 4-col grid from WP menus + siteFooter (tagline/blurb/copyright) w/ fallbacks |
| `src/components/layout/FullscreenNav.astro` | primary menu + footerSocial, dynamic numbering; `global.css` `.fullscreen-nav__label` → `text-transform: uppercase` |
| `src/components/Testimonials.astro`, `pages/index.astro`, `services/index.astro`, `sections/FAQSection.astro` | props-driven from `getTestimonials/getFaqs/getMenus`; FAQ hardcoded block removed; icon `<img>` support |
| `src/components/sections/ProcessSection.astro` | accepts `steps` prop; grid `sm:grid-cols-2 md:grid-cols-4` (7 items → 4+3); default = old 4 steps |
| `src/components/sections/IndustriesSection.astro` **(new)** | heading/intro/tags from WP `/industries/`; hover-gold tag grid |
| `src/lib/data.ts` + `src/types/index.ts` | `+getProcessSteps`, `+getIndustriesSection`, `+decodeEntities`; types `ProcessStep`, `IndustriesSectionData` |
| `src/pages/blog/[slug].astro` | removed unused `hero` fetch (lint fix) |
| Astro placeholders | pexels → unsplash in `ContentProduction.astro`, `BlogPreview.astro`, `HorizontalProjects.astro`, `services/[slug].astro` |

---

## Verification results (all green)

```
npx astro check     → 0 errors, 0 warnings
npm run lint        → 0 warnings (1 pre-existing warning fixed)
npm run build       → 24 pages, no GraphQL errors, Complete!
routes (preview :4322) → 12/12 HTTP 200, zero JS errors
GraphQL spot-check → 7 services (seo+links all non-null), 10 FAQs,
                     3 posts (featuredImage+seo), 6 heroes, 4 menus,
                     24 menu items, siteFooter ok, drafts → [] (expected)
Contact form e2e    → mail_sent (Playwright, full field set)
screenshots         → hero/footer/live FAQ×10/live services×6 confirmed
homepage (post-build) → 7 process steps (The Brief…The Optimise), 19 industry
                        tags, BrandStatement CPT, 0 JS errors
```

**Ports reconciled**: stale `astro dev` (pid 2952) killed; single `astro preview` now serves **:4321** (matches `PUBLIC_SITE_URL`). `/process/`, `/industries/`, `/why-choose-us/` are WP-only pages (never Astro routes — their content now feeds homepage sections instead).

---

## Full dynamization pass (Phase 9 — user: "check, every content is dynamic?" → "please do above all dynamics")

**Audit result** (explore agent): backend mostly done, but contact form (labels/options/submit), About (~90%), 3 legal pages, service detail (benefits/dead sections), homepage section components (CP/Social/Drone/CTA), section chrome headings, Footer/FullscreenNav contact details, SEO schemas (invented Mumbai address/geo/phone/areaServed, fake SearchAction) and fake `DEFAULT_TESTIMONIALS` were still hardcoded.

### Backend added
- `tde-setup.php`: service thumbnail support + `tdeContactForm { id title form successMessage }` root field (form 158; success ← `_messages['mail_sent_ok']`).
- CF7 158 title → "Let's Start Something Good." (§14).
- 5 ACF groups via idempotent `tde-acf-import.php` (keys `field_tde_*`): siteContact / homeSections / pageCta / serviceGallery / siteText — all values seeded; GraphQL exposes `siteContact`, `homeSections`, `siteText`, `pageCta`, `serviceGallery`.
- Legal pages 254/255/256 (structured HTML) — `pageBy(uri:"/privacy-policy/")` resolves.
- Service featured images attachments 247–253 → `_thumbnail_id` on 159–165; gallery URLs seeded ×7.
- Cleanup: deleted fake WhatsApp menu items [150]/[156] (were in `sameAs`); cleared dummy `contactPhone` (was in LocalBusiness `telephone`). Address/geo/areaServed left empty → schema omits (§23).

### Frontend changed
- **data.ts**: `parseContentSections`/`parseContentItem`/`parseCf7Form` (+ 2 bug fixes: star-greedy type regex, shortcode left in label); `normalizeService` rewrite (intro/sections/arrow-process/featuredImage/gallery/pageCta); new getters `getContactForm/getPageContent/getHomeSections/getSiteContact/getSiteText/getWhyChooseUs/getSiteData`; `DEFAULT_TESTIMONIALS` removed (→ `[]`, section hides); `Page`/`Service`/`Post`/`Project` types extended; `getSiteData()` compacts ACF **null** values (build crash fix: `Cannot read properties of null (reading 'trim')`).
- **Queries**: `GET_CONTACT_FORM`, `GET_HOME_SECTIONS`, `GET_SITE_DATA`, `GET_WHY_CHOOSE_US`; `GET_PAGE_BY_SLUG` += date/modified/pageCta; service fragment += featuredImage/serviceGallery/pageCta (+imageFragment in queries); project/post fragments += pageCta.
- **Pages**: `contact.astro` (form fully rendered from CF7 markup, radio chips, FormData posted as tag names), `about.astro` (WP sections + live capabilities + pageCta; fabricated team/stats dropped), legal ×3 (shared `LegalContent.astro`, H1 from WP title, Last updated ← modified), `services/[slug].astro` (sections renderer, why-choose-us, global FAQs, showcase, pageCta), `index.astro` (homeSections + siteText + siteContact props).
- **Components**: ContentProduction/SocialMedia/DroneSection/CTASection props; ServicesList/HorizontalProjects/BlogPreview/Testimonials/FAQSection/ProcessSection/IndustriesSection chrome-title props (defaults = old copy); Footer/FullscreenNav contact; LocalBusiness/Organization/WebSite schemas self-fetch.

### Verification (all green)
```
astro check   → 0 errors, 0 warnings (9 pre-existing is:inline hints)
eslint        → 0 errors, 0 warnings
build         → 24 pages, Complete! (twice — once after null-merge fix,
                once after menu/meta cleanup)
routes :4321  → 12/12 HTTP 200
DOM markers   → home: 11 h2s incl. CONTENT THAT / YOUR FEED / CHANGE THE
                PERSPECTIVE. / LET'S MAKE SOME NOISE. / CREATIVE PROCESS.
                contact: 9 your-* inputs + Full Name + Preferred Contact Method
                about: statement + Why "The Digital Echo"? + Our Vibe
                privacy: Information We Collect + Last updated: September 2026
                service: showcase imgs + Idea→Concept process
schema        → no telephone/address/geo (unset); sameAs = social menu only
e2e (Playwright) → filled CF7 fields, submitted, SUCCESS panel shown,
                   d-contact-success.png captured
screenshots   → tde-shots/d-*.png, s-*.png (about/contact/CTA verified visually;
                mid-page home shots unreliable — reveal opacity + lazy layout shift)
```

---

## Post-Phase 9 tweaks (same session — user requests)

1. **BrandStatement → About button**: camera-viewfinder card got an "About Us →" button (`href="/about/"`, accent outline style, `data-magnetic`) below the paragraphs (`BrandStatement.astro`).
2. **LineartField (9-image float animation, homepage non-video sections)**: new `src/components/ui/LineartField.astro` renders all 9 `public/assets/lineart/*.webp` as absolute floats and runs an infinite GSAP cycle per image: **fade in (peak opacity 0.08–0.18) → drift/rotate 8–15s → fade out → 2–7s hidden pause → respawn** in a new spot. Design details:
   - 3×3 grid cells, shuffled per field → each image owns a spawn zone (no clustering).
   - Radial `mask-image` fades edges (no hard rectangles); `mix-blend-multiply` matches existing static lineart.
   - Content containers forced `relative z-10`; field `z-index:0` → text always above (verified via elementFromPoint).
   - `astro:page-load` init + `astro:before-swap` tween-kill (ClientRouter-safe); `prefers-reduced-motion` → static faint placement.
   - Added to all 10 rendered non-video home sections (Testimonials adds an 11th when published); **BrandStatement (video) and hero excluded**.
   - **Bug fixed mid-flight**: `gsap.utils.random(min,max,1)` snaps to integers — made opacity targets 0/1 and scale 0/2 (invisible or full-opacity floats). Removed precision arg → true floats.
    - Verification: `astro check` 0/0, eslint 0, build 24 pages, routes 200, per-float opacity traces show full fade-out/fade-in cycles, no page errors; screenshots `tde-shots/lf2-*.png`.
3. **Old lineart removed (user: "remove svg + corner lineart images, keep the new floats")**:
   - Deleted `<Lineart />` SVG usages from ContentProduction/SocialMedia/DroneSection **and their `data-lineart-section` attributes** — that attribute used to bypass `initScrollReveal`/`initTextReveal` (reveals were driven by the SVG timeline), so removing it keeps those sections' reveal animations on the standard path (verified: CP/Drone h2 + chars opacity 1 after scroll).
   - Deleted **19 static corner `<img>` wrappers** (site-wide): 5 homepage sections (ServicesList, HorizontalProjects, IndustriesSection, ProcessSection, CTASection) + about ×3 (incl. the `{index % 2 === 1 && …}` conditional) + projects/[slug] ×4 + blog/[slug] ×2 + services/index ×1 + services/[slug] ×4, plus CTA's "Lineart background overlay" comment.
   - **Kept**: all `LineartField` floats (10 fields / 90 floats on home) — verified count unchanged.
   - Now-unused files (left in place, safe to delete later): `src/components/ui/Lineart.astro`, `src/lib/lineart.ts` (SVG path data); `src/animations/lineart.ts` `initLineart()` is a no-op (still called by `reveal.ts`).
   - Note: inner pages (about/services/blog/projects) now have **no** lineart at all — floats are homepage-only; drop `<LineartField />` into any page/section to extend.
   - Verification: `astro check` 0/0, eslint 0, build 24 pages, 0 `svg[data-lineart]`, 0 non-float lineart imgs (home + inner pages), no page errors; screenshots `tde-shots/rm-*.png`.
   - **End of session** (user: "enough for today").

---

## Docs updated

- `mds/backend.md` — PROGRESS TRACKER: Phases 1–9 FINAL; Phase 9 section (backend surface + frontend mapping + placeholder warnings); corrections #9/#11–14; env notes (port :4321, placeholder list); Quick reference += siteContact/homeSections/tdeContactForm/pageCta/serviceGallery/why-choose-us; gotchas += ACF nulls, CF7 parsing, WP-only pages; Phase 8 imageFragment note corrected.
- `mds/session-notes-2026-09-26.md` — this file (Phase 9 + Post-Phase 9 sections appended).

---

## Open items / next session

1. **Publish projects/testimonials** when real client work exists (or delete samples) — frontend picks them up automatically (Testimonials section hides while `[]`).
2. ~~Ports: kill stale astro dev on :4321~~ — **done** (preview single on :4321).
3. **No git repo** — back up manually; consider `git init` before further edits.
4. SEOPress meta values per page (§2/§4/§5/§7/§14/§16) can be refined in WP admin — `seo` already falls back sensibly.
5. ~~Why Choose Us hardcoded benefits~~ — **done** (service page reads `pageBy('/why-choose-us/')`).
6. **Client TODO (placeholder values in WP admin)**: replace `siteContact.contactWhatsappUrl` (`wa.me/919999999999`), `contactEmail`, social-menu profile handles; set address/geo/areaServed only if real (schema auto-includes when set); service `serviceGallery` URLs currently Unsplash placeholders; service featured images 247–253 are Unsplash placeholders.
7. Logo recolor (from 24 Sep) still with user; inner-page dark-theme conversion (from 24 Sep) still pending if that track resumes.
8. Optional follow-ups from the 26 Sep tweaks: delete now-unused `Lineart.astro` + `lib/lineart.ts` (+ `initLineart` wiring in `reveal.ts` if no future SVG use); add `<LineartField />` to inner pages if lineart there is wanted again (see Post-Phase 9 item 3).
