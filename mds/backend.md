# THE DIGITAL ECHO — WordPress Backend Build Guide (ACF Free)

> Phase-by-phase backend plan derived from `mds/contents.md` (845 lines).
> Stack: **WordPress + WPGraphQL + ACF (Free) + WPGraphQL for ACF** · Frontend: Astro (headless).
> **Rule: complete each phase + its ✅ Verify before moving on.**

**Locked decisions**
| Decision | Choice |
|---|---|
| Media fields | ACF **URL** type → paste CDN links (no uploads) |
| Contact form | **Contact Form 7** (free, REST endpoint) |
| Page body copy | **WP page editor** (HTML) |
| Nav + footer | **WordPress menus + `siteFooter` ACF group** |

---

## 📍 PROGRESS TRACKER — FINAL (all phases complete, live-verified 26 Sep 2026)

**Status: Phases 1–9 DONE. Backend verified against live GraphQL; frontend fully dynamic (all user-visible copy from WP) and built (25 pages, 0 errors). Post-build additions (29 Sep): Contact-page offices + enquiry capture (§4.1), inner-page hero redesign (`InnerHero` on services/service-detail/about/contact/projects/blog, home keeps `PageHero`), Pricing page (§4.2) + nav changes.**

| Phase | Status | Evidence |
|---|---|---|
| 1 CPTs/taxonomies | ✅ | `projects` CPT registered (`Project` type + `project`/`projects` roots, `projectInfo` reachable); terms renamed Brand Campaigns + `Ecommerce` added |
| 2 ACF groups | ✅ | all 6 planned groups resolve on their types; `siteFooter` moved Post→Page (+ `site-settings` page ID 157); hero 131 `selectPage` → `/projects/`; stray `serviceGroup` deleted — **+ 5 dynamization groups added 26 Sep (see Phase 9)** |
| 3 Menus + footer | ✅ | 4 menus (primary / footer-explore / footer-platforms / footer-social 3) assigned to locations registered in `mu-plugins/tde-setup.php` (WPGraphQL hides menus without a theme location); `siteFooter` values saved; 3 menu URLs corrected to real frontend routes (see note below); **placeholder WhatsApp menu items deleted (26 Sep)** |
| 4 Contact Form 7 | ✅ | v6.1.7, form **ID 158**, title **"Let's Start Something Good."** (9 fields §14); REST `POST /wp-json/contact-form-7/v1/contact-forms/158/feedback` → `mail_sent`; CORS verified for `localhost:4321`/`4322`; exposed to frontend via `tdeContactForm` GraphQL field; form renders dynamically from CF7 markup (e2e-tested headless Chromium → success panel) |
| 5 SEO | ✅ | **SEOPress kept** (per user decision; Yoast skipped); mu-plugin registers `TdeSeo` + `seo` field on Post/Page/Service/Project/Testimonial/Faq with SEOPress meta + fallbacks; schemas self-fetch (invented address/geo/phone/areaServed removed) |
| 6 Content | ✅ | Services ×7 (menuOrder 1–7), pages (`about`, `contact`, `why-choose-us`, `process`, `industries`, `404`, `site-settings`), **projects ×4 + testimonials ×4 as clearly-labeled DRAFT samples** (contents.md forbids fabricated data live), blog ×3 published w/ featured images, FAQ ×10 (menu_order 1–10), **legal ×3 (IDs 254/255/256, full §-copy)** |
| 7 Media | ✅ | CDN URLs per below (heroes ×6, brand-statement reels, avatars, project galleries); **service featured images 247–253 + `serviceGallery` URLs ×7 services** |
| 8 Frontend | ✅ | fragments/queries rewritten to live schema; menus+siteFooter+faqs+testimonials+seo wired; CF7 POST; Process §9 + Industries §10 sections; `npx astro check` 0 errors, eslint 0 warnings, `npm run build` 24 pages |
| 9 Full dynamization | ✅ | every user-visible copy block now comes from WP: contact form (CF7-rendered), About, legal ×3, service content/showcase/CTA, homepage section copy (ACF `homeSections`), section chrome titles (ACF `siteText`), contact details (`siteContact`), page CTAs (`pageCta`), Why-Choose-Us, SEO schemas. Verified: check 0/0, eslint 0, build 24 pages, 12 routes 200, e2e form submit → success panel |
| 10 Enquiry capture (29 Sep) | ✅ | CF7-158 submissions → CPT **`tde_enquiry`** (mu-plugin `tde-enquiries.php`) with status workflow (New/Read/Replied/Closed), admin listing + columns + filter views + row/bulk actions + metabox, **Export CSV**; notification mail → **hey@thedigitalecho.in**. Verified: REST POST → record + Mailpit mail + Playwright admin walkthrough (see §4.1) |
| 11 Pricing page + nav (29 Sep) | ✅ | CPT **`plan`** + ACF group `planInfo` (8 fields, `scripts/wp-pricing-setup.php`) → `/pricing/` (25th page); primary menu: **"The Feed" removed**, **Pricing added before The Crew** (`wp menu item add-custom`, position 4); nav index labels renumbered. Verified: `plans{}` resolves, check 0/0, eslint 0, build 25 pages, Playwright (empty state + 3 temporary plan cards, then deleted) — see §4.2 |
| 12 Footer contact ACF (29 Sep) | ✅ | `siteContact` gained **WhatsApp Number** + **Instagram/Facebook/LinkedIn/YouTube URL** (5 fields, `scripts/wp-footer-contact-setup.php`, idempotent) → footer **Contact** column **and** the fullscreen-menu **GET IN TOUCH** block render the same email/WhatsApp/phone/social links (shared `getContactLinks()`; menu FOLLOW US block dropped as a duplicate); empty fields hide; **footer Navigate column now mirrors the primary menu** (Echo Home · What We Do · Our Work · Pricing · The Crew · Let's Talk). Verified: GraphQL `SiteContact` exposes all 12 fields, footer DOM shows email/WhatsApp/4 socials, check 0/0, eslint 0, build 25 pages |

### Corrections to the plan below (schema wins — recorded during Phase 8)
1. Root is **`services`** (never `allService`); `services(where:{orderby:{field:MENU_ORDER,order:ASC}})` works.
2. `serviceBy(uri:)` / `projectBy(uri:)` / `postBy(uri:)` / `pageBy(uri:)` all resolve (bare slug or full uri).
3. **Menus now queryable by location** (`PRIMARY`, `FOOTER_EXPLORE`, `FOOTER_PLATFORMS`, `FOOTER_SOCIAL`) *and* by slug — locations registered via mu-plugin.
4. `siteFooter` resolves on **`Page`** (`pageBy(uri:"/site-settings/")`), fields `footerTagLine` (capital L) ✓.
5. Project shape: `projectInfo { clientName idea challenge execution results serviceUsed projectDate location featured galleryUrl1..4 }` — **no `strategy`/`testimonial*` fields**; frontend maps `strategy←idea`, `result←results`; `featuredImage` exists on `Project` but sample drafts have none (normalizer falls back to `galleryUrl1`).
6. `serviceUsed` returns a **JSON array** despite `[String]`-looking schema; normalizer handles array-or-string.
7. `Faq`/`Testimonial`/`Service` have **no custom ACF fields on Faq** → FAQ = `title` (question) + `content` (answer); testimonials expose `testimonialInfo { quote clientName companyName designation photoUrl projectType }`.
8. `MediaItem` has no top-level `width`/`height` → use `mediaDetails { width height }`.
9. Draft projects/testimonials are **invisible to unauthenticated GraphQL** → `getTestimonials()` returns `[]` (section hides); `getProjects()` falls back to mock content when WP returns empty (publish real client work to replace).
10. Menu URLs fixed to frontend routes: primary `The Feed` → `/services/social-media-management/`; footer-explore `Content Studio` → `/services/content-production/`, `Social Media` → `/services/social-media-management/` (old `/social-media-marketing/` + `/content-production/` had no Astro routes).
11. CF7 `your-contact-method` is a **radio group, required by default** (no `*`) → frontend renders radio chips from CF7 markup and validates that one is checked.
12. Broken `images.pexels.com` placeholders (404) replaced with working `images.unsplash.com` URLs in 4 Astro files; blog posts got real featured images (attachments 184–186).
13. **Dynamization additions (26 Sep)**: `add_post_type_support('service','thumbnail')` + `tdeContactForm` GraphQL field in `tde-setup.php`; 5 ACF groups imported (`group_tde_sitecontact`, `group_tde_homesections`, `group_tde_pagecta`, `group_tde_servicegallery`, `group_tde_sitetext` — all `acf_import_field_group()` idempotent via `/var/folders/…/opencode/tde-acf-import.php`); legal pages 254/255/256 created; service thumbnails 247–253; placeholder WhatsApp menu items [150]/[156] deleted (fake number was leaking into `sameAs`); dummy `contactPhone` cleared (was leaking into LocalBusiness `telephone`).
14. ACF empty fields return **null over GraphQL** → never spread raw into defaults (would null them out); `getSiteData()` compacts null/undefined before merging (this crashed the `/` build once: `Cannot read properties of null (reading 'trim')`).
15. **CF7 158 trimmed to 7 fields (29 Sep, user request)**: `your-brand` (Business / Brand Name) + `your-website` (Website / Instagram) removed from the form markup *and* from the `mail` body (`Brand:` / `Website/Instagram:` lines) — `scripts/wp-cf7-remove-fields.php`, idempotent. Frontend needs no change (it renders from CF7 markup). ⚠️ `WPCF7_ContactForm::prop('mail')` returns an **array** — never cast it to `(string)` (it stringifies to `Array` and silently destroys the mail template; repair = set the full array back via `set_properties()`).
16. **Enquiry capture (29 Sep, user request)**: every CF7-158 submission is saved as CPT **`tde_enquiry`** with a status workflow, admin listing/columns/filter and CSV export (mu-plugin `tde-enquiries.php`); notification recipient for form 158 → **hey@thedigitalecho.in** (`scripts/wp-cf7-set-recipient.php`). Frontend untouched — it already posts to the CF7 REST endpoint.

### Known environment notes
- WP-CLI needs the Local socket wrapper (see session notes); `wp db query/export` broken (homebrew mysql-client auth) → use Local's mysql/mysqldump binaries.
- GraphQL app-password auth (draft testing): dedicated WP user (credentials live in local `.env` only), query needs `where:{status:DRAFT}`; frontend stays unauthenticated.
- `astro preview` currently on **:4321** (matches `PUBLIC_SITE_URL`; stale `astro dev` was killed 26 Sep).
- **Seeded placeholders the client must replace in WP admin**: `siteContact.contactWhatsappUrl` = `https://wa.me/919999999999`, `contactEmail` = `hello@thedigitalecho.com` (both shown in footer/nav/CTA); social-menu handles (`instagram.com/thedigitalecho` etc.) used in `sameAs`. Address/geo/areaServed intentionally empty (contents.md §23 — schema omits them until set).


---

## 0. Audit — live state vs contents.md (checked 25 Sep 2026)

| Item | Live state |
|---|---|
| CPTs (GraphQL) | `post`, `page`, `attachment`, `hero` (**1 post** = only `/`), `service` (**0 posts**), `testimonial` (**0 posts**), `brandstatement` (1 ✓) |
| **Projects CPT** | **MISSING** → frontend `Unknown type Project` error, falls back to mock |
| ACF groups | `heroSection` ✓ · `brandStatementsSection` ✓ · `serviceMenuLinks` **not yet in schema** |
| Yoast SEO | **not installed** (`seo` field absent on Post/Page) |
| WP menus | empty (`menus` root exists → menus plugin installed) |
| Menu locations | `MenuLocationEnum = EMPTY` (theme registers none) → **query menus by slug, not location** |
| Posts | 1 default ("Hello world!") |
| FAQ / Testimonials / Industries / Process | hardcoded in Astro frontend |
| Contact form | frontend `// TODO` — no endpoint |

---

## Free-ACF rules (no Repeater / Gallery / Options Page / Clone in free)

1. **Any repeating list → a CPT** (Services, Projects, Testimonials, FAQ).
   - That is why `serviceMenuLinks` lives *on Service posts* (one post = one menu row), not in a repeater.
2. **Static lists** (What We Create, Ideal For, Platforms, Industries, Process steps) → typed into the **WP page editor as HTML `<ul>`**.
3. **Long-form copy → WP page editor**; ACF only for short structured fields.
4. **Media → ACF `URL` fields** (Image/File would force media-library uploads).
5. **Every field group must have a GraphQL Field Name** and be assigned to a post type. Verify with introspection after each phase.
6. Field names must be **lowercase_alphanumeric** (ACF) — GraphQL exposes them as written (precedent: `title1`, `videoUrl`, `button1PageLink`).

---

# PHASE 1 — CPTs & Taxonomies (WP admin, ~20 min) · no ACF

- [x] **1.1 Create CPT `projects`** ✅ **DONE (26 Sep)** — slug `projects`, GraphQL Single Name `Project`, roots `project`/`projects`, `projectInfo` reachable
- [x] **1.2 Create taxonomy `projectCategory`** on `projects` (GraphQL Single Name `ProjectCategory`) ✅ *created — see typo note in Progress Tracker*
  - Terms (contents.md §5): Photography, Videography, Drone, Social Media, Brand Campaigns, Digital Marketing, Corporate, Ecommerce
- [x] **1.3 Create CPT `faq`** (GraphQL Single Name `Faq`) ✅ *created + entries present*
  - **title = question** · **content = answer** · **Page Order = sort order** → *no ACF fields needed*
  - 10 entries from contents.md §13
- [x] **1.4 Blog categories** (Posts → Categories): Social, Content, Growth, Creator Culture, Brand, India (§16) ✅
- [x] **1.5 Keep existing**: `hero`, `service`, `testimonial`, `brandstatement`, `post`, `page` ✅

✅ **Verify Phase 1**
```graphql
{ __schema { queryType { fields { name } } } }
```
Must now include: `projects`, `projectBy`, `projectCategories`, `faq`, `faqBy`.
Then create one draft Project + one FAQ to confirm save works.

---

# PHASE 2 — ACF Field Groups (free) · all media fields = **URL** type

### 2.1 `serviceMenuLinks` — Location: Post Type == **Services** ✅ **DONE (live-verified 25 Sep)**

| Field name | ACF type | Return value | Required | Feeds |
|---|---|---|---|---|
| `serviceMenuIcon` | **URL** | — | yes | What We Do row icon ⚠️ **renamed from plan's `serviceIcon` — schema is source of truth** |
| `servicePageUrl` | **URL** | — | no | link (defaults `/services/{slug}/` if empty) |
| `serviceShortDescription` | Textarea | — | no | services index card + meta description |
| `serviceShowInMenu` | True/False | — | no | hide this service from What We Do |

> Service **Title** = WP core `title` (don't duplicate) · order = core **Page Order** (`menuOrder`).

### 2.2 `servicePage` — Location: Post Type == **Services** ✅ **DONE (live-verified 25 Sep)**

| Field name | ACF type | Source |
|---|---|---|
| `heroTitle` | Text | §4 service H2 (e.g. "Content That Stops the Scroll.") |
| `heroDescription` | Textarea | §4 intro paragraph(s) |
| `ctaLabel` | Text | §4 CTA (e.g. "Book a Shoot →") |
| `ctaUrl` | URL | CTA target |
| `seoTitle` | Text | §4 SEO Title (until Yoast in Phase 5) |
| `seoDescription` | Textarea | §4 Meta Description |

→ **Lists go in the core editor (`content`) as HTML**, e.g.
`<ul><li>Product photography</li><li>Product videography</li>…</ul>`
(§4: *What We Create* · *Our photography services* · *We Produce* · *Ideal For* · *Platforms* · *What We Handle* · *Digital Marketing Solutions*)

### 2.3 `projectInfo` — Location: Post Type == **Projects** ✅ **RESOLVED (26 Sep): `projects` CPT registered → `projectInfo` resolves on `Project`**

| Field name | ACF type | Source | Live |
|---|---|---|---|
| `clientName` | Text | §5 | ✓ |
| `challenge` | Textarea | §5 The Challenge | ✓ |
| `idea` | Textarea | §5 The Idea | ✓ |
| `execution` | Textarea | §5 The Execution | ✓ |
| `result` | Textarea | §5 The Outcome (prose) | ❌ **absent** |
| `results` | Textarea | §5 metrics (plan name `resultMetrics`) | ✓ **renamed** |
| `serviceUsed` | Select (**multiple ✓**) → `[String]` | Photography / Videography / Social Media / Digital Marketing / Drone | ✓ **renamed from `servicesUsed`** |
| `projectDate` | Date | | ✓ |
| `location` | Text | | ✓ |
| `featured` | True/False | homepage Selected Projects | ✓ |
| `galleryUrl1` … `galleryUrl4` | **URL** | §6 "What We Created" (no Gallery field in free) | ✓ |
| *cover image* | — | **core Featured Image** (leave empty → CDN URL in featured image via URL field not possible; use `galleryUrl1` or upload — see note) | — |

> Category = `projectCategory` taxonomy (Phase 1.2). Case study (§6) = the project page itself in the editor.

### 2.4 `testimonialInfo` — Location: Post Type == **Testimonials** ✅ **BUILT (26 Sep) — on `Testimonial`, 0 posts yet**

| Field name | ACF type | Source | Live |
|---|---|---|---|
| `quote` | Textarea | §12 | ✓ |
| `clientName` | Text | §12 | ✓ |
| `companyName` | Text | §12 (plan name `company`) | ✓ **renamed** |
| `designation` | Text | §12 | ✓ |
| `projectType` | Select → `[String]` | Photography / Videography / Social Media / Drone / Digital Marketing | ✓ |
| `photoUrl` | **URL** | §12 "Photo/logo where permitted" | ✓ |

### 2.5 `siteFooter` — Location: Post Type == **Page** (slug `site-settings`, id 157) ✅ **FIXED (26 Sep): location moved Post→Page, page created, values saved, frontend wired**

| Field name | ACF type | Source | Live |
|---|---|---|---|
| `footerTagLine` | Textarea | §18 "Your Brand. Our Creative Echo." | ✓ **capital L (plan `footerTagline`)** |
| `footerBlurb` | Textarea | §18 description | ✓ |
| `footerCta` | Text | §18 "Have an idea? Let's make it echo." | ✓ |
| `footerCopyright` | Text | §18 "© 2026 The Digital Echo. All Rights Reserved." | ✓ |

> ✅ Plan query `pageBy(uri:"/site-settings/"){ title siteFooter{ footerTagLine … } }` now **resolves (26 Sep)** — group location is Page, values populated.

### 2.6 `heroSection` — exists, no schema change ✅ **6 posts / 6 pages covered (26 Sep)**

- [x] `/` Home — id 42 `YOUR BRAND / OUR CREATIVE ECHO` ✓
- [x] `/about/` The Crew — id 128 `About / The Digital Echo` ✓
- [x] `/contact/` Let's Talk — id 129 `Got A Brand / That Needs An Echo?` ✓
- [x] `/services/` Services — id 130 `Everything Your / Brand Needs to Be Seen` ✓
- [x] **`/projects/` Our Work — id 131 `Digital / Marketing & Content Production Projects`, smallText `OUR WORK` — `selectPage` corrected `/about/` → `/projects/`** ✓
- [x] `/blog/` The Drop — id 132 `Digital Marketing / Blog, Social Media Tips & Content Ideas` ✓

> ✅ `getHeroByPage('/about/')` now returns id 128 (131 reassigned to `/projects/`).
> ⚠️ Mixed link formats in `button*PageLink`: `/contact` vs `/contact/` — normalize to trailing slash (Astro handles both). *(left as-is)*

✅ **Verify Phase 2**
```graphql
{ __type(name:"ServiceMenuLinks"){ fields{ name type{ name } } } }   # or your group's name
{ services(first:5){ nodes{ title slug uri serviceMenuLinks{ serviceMenuIcon servicePageUrl } } } }   # root is `services`, not allService
{ projects(first:1){ nodes{ projectInfo{ clientName } } } } { testimonials(first:1){ nodes{ testimonialInfo{ quote } } } }
```
Every group field must resolve non-null. **Ping me here if names differ — I match code to your schema.**

---

# PHASE 3 — Menus + Footer text (nav & footer move to WP) ✅ **DONE (26 Sep)**

Create **Appearance → Menus** (4 menus). Query by **slug or location** (locations registered in `mu-plugins/tde-setup.php` — WPGraphQL hides menus with no theme location):

| Menu slug | Items (labels = §1 / §18) |
|---|---|
| `primary` | Echo Home `/` · What We Do `/services/` · The Feed `/social-media-marketing/` · Our Work `/projects/` · The Crew `/about/` · Let's Talk `/contact/` |
| `footer-explore` | Home · Services · Content Studio · Social Media · Our Work · About · Blog · Contact |
| `footer-platforms` | Instagram · Facebook · LinkedIn · WhatsApp · YouTube · Google Business Profile |
| `footer-social` | Instagram · LinkedIn · Facebook · WhatsApp (custom URLs) |

- Footer **Services column** = **dynamic from Services CPT** (no menu).
- Footer tagline/blurb/CTA/copyright = `siteFooter` group (2.5).

✅ **Verify Phase 3**
```graphql
{ menus(where:{slug:"primary"}){ nodes{ name slug menuItems{ nodes{ label url path order } } } } }
{ pageBy(uri:"/site-settings/"){ title siteFooter{ footerTagLine footerCta footerCopyright } } }
```

---

# PHASE 4 — Contact Form 7 (contents.md §14) ✅ **DONE (26 Sep) — form ID 158**

- [x] Install **Contact Form 7** (free) ✅ v6.1.7
- [x] Build the form with §14 fields:
  - Full Name* (`your-name`, placeholder "Your name")
  - Business / Brand Name* ("What's your brand called?")
  - Email Address* ("you@brand.com")
  - Phone / WhatsApp Number ("+91 XXXXX XXXXX")
  - Website / Instagram ("https://...")
  - **What do you need help with?*** — select: Photography, Videography, Drone Photography, Drone Videography, Social Media Management, Instagram Marketing, Facebook Marketing, LinkedIn Marketing, WhatsApp Marketing, Digital Marketing, Content Creation, Brand Campaign, Other
  - **Tell us about your project*** — textarea ("What's the brief? Give us the good stuff.")
  - Estimated Budget — select: Not sure yet / Under ₹25,000 / ₹25,000–₹50,000 / ₹50,000–₹1,00,000 / ₹1,00,000+ / Let's discuss
  - Preferred Contact Method — **required select** (frontend `#contact-method`): WhatsApp / Phone / Email ⚠️ CF7 field `your-contact-method` **is required** (no `*` marker shown in editor)
  - Submit label: **Let's Create →** · Success: **"You're officially on our radar. We'll get back to you soon."**
- [x] Record for the frontend (Phase 8): **form id** + REST path
  `/wp-json/contact-form-7/v1/contact-forms/158/feedback` (+ CORS origins `http://localhost:4321` + `:4322` in `mu-plugins/tde-setup.php`)

✅ **Verify**: submit once from CF7 preview → email received; REST endpoint responds via `curl`.
**Verified (26 Sep)**: full-field multipart POST → `mail_sent:true`; e2e submit from headless Chromium → success banner, zero JS errors.

### 4.1 Enquiry capture — CPT + status + CSV export ✅ **DONE (29 Sep)** (user request)

Every CF7-158 submission is stored in a custom post type **`tde_enquiry`**, and the notification mail goes to **hey@thedigitalecho.in**.

- **Plugin**: `wp-content/mu-plugins/tde-enquiries.php` (lives only in the WP install, like `tde-setup.php` — not in this repo).
- **Hook**: `wpcf7_before_send_mail` (fires only after validation / acceptance / spam checks pass, *before* the mail is sent) → `wp_insert_post( 'tde_enquiry', 'publish' )` with title `"{Name} — {Need}"` and the brief in `post_content`, then every field as **protected meta**: `_tde_status` (`new`|`read`|`replied`|`closed`), `_tde_name`, `_tde_email`, `_tde_phone`, `_tde_need`, `_tde_budget`, `_tde_contact_method`, `_tde_project`, `_tde_ip`, `_tde_submitted`, `_tde_form_id`, `_tde_fields` (full posted array), `_tde_mail_status` (`pending` → `mail_sent`/`mail_failed`, set from `wpcf7_mail_sent`/`wpcf7_mail_failed`).
  ⚠️ The record is written **even when the mail fails** — the enquiry is never lost.
- **Admin**: *Enquiries* menu (badge = count of `New`), columns Status / Name / Email / Phone / Need / Date, status filter links (`?tde_status=new`), row actions "Mark as …", bulk actions, and an **Enquiry details** metabox (read-only submission + Status dropdown). Manual creation blocked (`create_posts` → `do_not_allow`).
- **CSV**: *Export CSV* button on the list screen → `admin-post.php?action=tde_export_enquiries&_wpnonce=…`; honours the active `tde_status` filter; UTF-8 BOM so ₹ survives Excel.
- **Recipient**: CF7 form 158 `mail.recipient` = `hey@thedigitalecho.in` (script `scripts/wp-cf7-set-recipient.php`, idempotent).
- **Not in GraphQL** (`show_in_rest`/`show_in_graphql` off) — enquiries are admin-only data.

✅ **Verified (29 Sep)**: multipart POST → `mail_sent` + post created with every meta key; Mailpit (Local `:10191`) shows `To: hey@thedigitalecho.in` with correct subject/body; Playwright over wp-admin (temp auth cookie) → list columns, status views, bulk actions, menu badge, row action "Mark as Read" + notice, edit-metabox status persisted, CSV download (`tde-enquiries-…csv`, 333 B). Test record deleted after QA.

---

### 4.2 Pricing page — `plan` CPT + ACF `planInfo` ✅ **DONE (29 Sep)** (user request)

`/pricing/` (Astro `src/pages/pricing.astro`) renders **only** what is in WP — no plan copy lives in the codebase.

- **CPT `plan`** ("Pricing Plans", title = plan name, `page-attributes` → **Order** field = display order) + ACF group **`planInfo`**, both created by `scripts/wp-pricing-setup.php` (idempotent, no seed data).
- **Fields**: `planPrice` (empty ⇒ card renders **"Custom"**), `planPeriod` (`/ month`), `planSummary`, `planFeatures` (**one feature per line** — free ACF has no Repeater, so it is a textarea split in `getPricingPlans()`), `planBadge` (pill), `planHighlight` (true/false ⇒ gold border + gold price + `btn-gold`), `planCtaLabel`, `planCtaUrl` (empty ⇒ `/contact/`).
- **GraphQL**: `plans(first:50, where:{orderby:{field:MENU_ORDER,order:ASC}}){ nodes{ title planInfo{ … } } }` — drafts never reach the frontend.
- **Page**: `InnerHero` (no `/pricing/` hero record yet → in-page fallback: badge "Plans", H1 "Pricing", **static description line** "Three monthly plans — TDE Starter…", index `Pricing · 03`, chip `NN Plans`, marquee = plan names) + plan card grid (`md:2 / lg:3` cols) or, when 0 plans, a contents.md **§15** block ("Your Next Big Idea Starts Here." / "Start A Conversation →"). The animated **Scroll** cue is switched off here (`showScroll={false}`) — it read as a loading indicator under the heading.
- **Nav**: primary menu item "Pricing" → `/pricing/` inserted **before The Crew** (custom link, position 4); hero index labels renumbered (Our Work 02 · Pricing 03 · The Crew 04 · The Drop 05 · Let's Talk 06); `/pricing/` added to `sitemap.xml.ts`.
- Also removed per request: **"The Feed"** item (was position 3 → `/services/social-media-management/`) — social media management stays reachable under Services.

✅ **Verified (29 Sep)**: `plans{}` root + all 8 `planInfo` fields resolve; check 0/0, eslint 0, build **25 pages**; Playwright 1440/768/390 → empty state, then with 3 temporary plans → cards (highlighted middle card = `rgb(196,138,42)` border/price, badge, 3/5/2 features, "Custom" fallback, `overflowX: 0`, no JS errors); nav shows `04Pricing` before `05The Crew` on every page. Test plans (282–284) deleted after QA.

✅ **Live content (29 Sep)**: the 3 real plans from `mds/pricing.md` are published — **IDs 285 TDE STARTER (₹14,999/-, 7 features) · 286 TDE GROWTH (₹19,999/-, 7) · 287 TDE PREMIUM (₹24,999/-, 8)**, order 1–3, period `Month*`, no badge/highlight (none specified in the spec → all cards neutral, CTA defaults to "Let's Talk" → `/contact/`). First summary line renders as the **gold tagline**, the rest as the "Best for…" paragraph (`pricing.astro` splits on the first newline). Verified 1440 + 390: titles/taglines/prices/features exact, buttons bottom-aligned, `overflowX: 0`, no JS errors, cards reveal on scroll.

---

# PHASE 5 — SEO ✅ **DONE (26 Sep) — SEOPress (not Yoast, per user decision)**

- [x] Install **SEOPress** (free) — Yoast intentionally skipped (locked decision)
- [x] mu-plugin `tde-setup.php` registers type **`TdeSeo`** + `seo { title description canonicalUrl ogImage ogTitle ogDescription twitterTitle twitterDescription }` on Post/Page/Service/Project/Testimonial/Faq — reads SEOPress meta with sensible fallbacks
- [x] Filled per contents.md: §2 Home · §4 Services · §5 Our Work · §7 About · §14 Contact · §16 Blog

✅ **Verify**: `{ posts(first:1){ nodes{ seo{ title description } } } }` — ✅ returns per-post titles/descriptions (26 Sep)

---

# PHASE 6 — Content entry (order → contents.md refs) ✅ **DONE (26 Sep)**

- [x] 1. **Heroes ×6** — §2, §4, §5, §7, §14, §16 ✓ (ids 42, 128–132; 131 corrected → `/projects/`)
- [x] 2. **Services ×7** — §4 (01 Content Production · 02 Photography · 03 Videography · 04 Drone · 05 Social Media Management · 06 Digital Marketing · 07 Brand Content & Campaigns) + `serviceMenuLinks` + `servicePage` ✓ (ids 159–165, menuOrder 1–7)
- [x] 3. **Projects ×4** ✓ (ids 173–176) + case-study copy — §5, §6 (+ `projectCategory`, `featured`, metrics) — **DRAFT samples** (contents.md: never fabricate client work live)
- [x] 4. **Testimonials ×4** ✓ (ids 177–180) — §12 — **DRAFT samples** (real only, never fabricated quotes/metrics)
- [x] 5. **FAQ ×10** ✓ (ids 166–172…published) — §13 (title=question, content=answer, Page Order 1–10)
- [x] 6. **Pages (editor HTML)** ✓ About §7 · Why Choose Us §8 · Process §9 · Industries §10 · Contact §14 · 404 §19 + `site-settings` (id 157)
- [x] 7. **Blog** ✓ 6 categories (§16; accidental wipe restored — 181 India+Social, 182 Content+Social, 183 Content+Growth) + 3 posts (181–183) w/ featured images (184–186)
- [x] 8. **Menus + `siteFooter`** ✓ §1, §18 (Phase 3) — 3 menu URLs corrected to real routes (see corrections #10)
- [x] 9. **Microcopy** — §27–28 labels kept from frontend defaults (form/CTA copy matches contents.md in `contact.astro`)
- [x] 10. **Brand statement** ✓ already done (1 post, `we-dont-just`)

---

# PHASE 7 — Media (CDN URLs — all verified 200/206) ✅ **APPLIED (26 Sep) — heroes ×6 + brand-statement reels ×6 wired from these URLs**

**Videos** → hero `videoUrl` (×6) + BrandStatement `reel4`–`reel6`:
```
https://res.cloudinary.com/demo/video/upload/dog.mp4
https://res.cloudinary.com/demo/video/upload/sea_turtle.mp4
https://res.cloudinary.com/demo/video/upload/elephants.mp4
https://res.cloudinary.com/demo/video/upload/cld-sample-video.mp4
https://media.w3.org/2010/05/sintel/trailer.mp4
https://media.w3.org/2010/05/bunny/trailer.mp4
https://media.w3.org/2010/05/video/movie_300.mp4
```

**Images** — pattern `https://images.unsplash.com/<ID>?q=80&w=1600&auto=format&fit=crop`

| Use | IDs |
|---|---|
| Production / shoot | `photo-1492691527719-9d1e07e534b4`, `photo-1554048612-b6a482bc67e5`, `photo-1516035069371-29a1b244cc32` |
| Team / office | `photo-1521737604893-d14cc237f11d`, `photo-1497366754035-f200968a6e72`, `photo-1542744173-8e7e53415bb0`, `photo-1600880292203-757bb62b4baf`, `photo-1556761175-b413da4baf72`, `photo-1552664730-d307ca884978`, `photo-1531482615713-2afd69097998`, `photo-1517245386807-bb43f82c33c4` |
| Drone / aerial | `photo-1477959858617-67f85cf4f1df`, `photo-1449824913935-59a10b8d2000` |
| Product | `photo-1523275335684-37898b6baf30`, `photo-1505740420928-5e560c06d30e` |
| Food / fashion | `photo-1504674900247-0877df9cc836`, `photo-1445205170230-053b83016050` |
| Real estate / interior | `photo-1560518883-ce09059eeffa`, `photo-1600585154340-be6161a56a0c` |
| Social / analytics | `photo-1460925895917-afdab827c52f` |

**Avatars (testimonials)** — pattern `https://images.unsplash.com/<ID>?q=80&w=400&h=400&fit=crop&crop=faces`
`photo-1494790108377-be9c29b29330` · `photo-1507003211169-0a1dd7228f2d` · `photo-1500648767791-00dcc994a43e` · `photo-1438761681033-6461ffad8d80` · `photo-1472099645785-5658abf4ff4e` · `photo-1544005313-94ddf0286df2`

**Wildcards / extras**
- `https://picsum.photos/seed/<word>/<w>/<h>` — any-size placeholder photo
- `https://placehold.co/1600x900/12100C/F2EEE5/png?text=Project` — branded placeholder
- Cloudinary: `https://res.cloudinary.com/demo/image/upload/sample.jpg`, `dog.jpg`, `cat.jpg`, `samples/food/pot-mussels.jpg`, `samples/people/smiling-man.jpg`, `samples/landscapes/nature-mountains.jpg`
- SVG icons: `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4f7.svg` (camera), `.../1f681.svg` (drone)
- Brand icons: `https://cdn.simpleicons.org/{instagram,whatsapp,youtube}/004AAD`

> ⚠️ Public demo assets = **placeholders**. Replace with owned/CDN assets before production. All URLs are **https** (no mixed content).

---

# PHASE 8 — Frontend wiring (Astro repo) ✅ **DONE (26 Sep) — all items complete**

- [x] `src/graphql/queries/services.ts`: root is **`services`** (not `allService` — schema has no such root) + fragments `serviceMenuLinks`/`servicePage`; `orderby: MENU_ORDER ASC`; `imageFragment` **is** included now (service thumbnail support added — unused fragments in a query are a GraphQL error)
- [x] `GET_PROJECTS` / `GET_PROJECT_BY_SLUG` (Project CPT) — mock-fallback only when GraphQL returns empty (drafts are invisible unauthenticated). **Field renames applied:** `serviceUsed`, `results`, `idea`→`strategy`, `clientName`→`client`; `featured` filtered client-side (no where-arg exists)
- [x] `GET_TESTIMONIALS`, `GET_FAQS`, `GET_MENUS` (by location **and** slug) — testimonial `companyName` → `company`; `avatar` ← `photoUrl`
- [x] Heroes fetched (`getHeroByPage` for `/`, `/about/`, `/contact/`, `/services/`, `/projects/`, `/blog/`)
- [x] Contact form → POST CF7 REST `158/feedback` + CORS (origins 4321/4322) — **e2e tested**
- [x] SEO mapped: `toSeo()` in `src/lib/data.ts` ← `seo` field (TdeSeo); `BaseLayout.astro` takes `seo` prop → title/description/canonical/og/twitter (wired: home, blog slug, service slug, project slug)
- [x] Footer: 4-column grid (Navigate/Platform/Connect/Contact) from WP menus + `siteFooter` text (`footerTagLine` **capital L**, `pageBy(uri:"/site-settings/")`) with mock fallbacks; `FullscreenNav` ← primary menu + footerSocial
- [x] Replaced hardcoded sections: Testimonials (now props-driven from `getTestimonials()`), FAQ (`getFaqs()` — HTML stripped from answers), **Process §9** (`getProcessSteps()` — parses `/process/` `<ol><li><strong>NN — Title</strong> — desc` → 7 live steps replacing 4 hardcoded), **Industries §10** (new `IndustriesSection.astro` between Process and Testimonials per contents.md §19 section order, parses `/industries/` h1+p+`<ul>` → 19 tags), What We Do icons/links (service icon renders `<img>` when URL)
- [x] Verify: `npx astro check` **0 errors / 0 warnings** → eslint **0 warnings** → `npm run build` **24 pages, no GraphQL errors** → `astro preview :4322` → all 12 routes HTTP 200, zero JS errors → screenshots + contact-form e2e pass

> ⚠️ **Draft visibility**: unauthenticated GraphQL returns only `publish` → projects/testimonials currently `[]` → `getTestimonials()` returns `[]` (Testimonials section hides itself); `getProjects()` uses the documented mock fallback. Publish real client work in WP admin to swap in live content (no code change needed).

---

# PHASE 9 — Full frontend dynamization ✅ **DONE (26 Sep) — every user-visible copy block now editable in WP**

**Goal (user directive): client can update ALL site copy from the WP backend — no hardcoded user-facing text left in Astro.**

### Backend (WP) — new surface area
- [x] `mu-plugins/tde-setup.php`: `add_post_type_support('service','thumbnail')` + GraphQL object type **`TdeContactForm`** with root field `tdeContactForm { id title form successMessage }` (form id filterable via `tde_cf7_form_id`, default 158; `successMessage` ← `_messages[mail_sent_ok]`)
- [x] CF7 form 158 title → **"Let's Start Something Good."** (§14 form heading); success msg = §14 copy
- [x] ACF groups imported (all `acf_import_field_group()`, values seeded, script idempotent):
  | Group key | Location | GraphQL field | Purpose |
  |---|---|---|---|
  | `group_tde_sitecontact` | Page `site-settings` (157) | `siteContact` | email / whatsapp url / **whatsapp number** / phone / address / geo lat+lng / areaServed / **social: Instagram+Facebook+LinkedIn+YouTube URL** (5 fields added 29 Sep by `scripts/wp-footer-contact-setup.php`) |
  | `group_tde_homesections` | Page `/` (9) | `homeSections` | 24 fields: CP title+4 images, SM titles+platforms, drone eyebrow/titles/body/button, CTA titles/body/buttons |
  | `group_tde_pagecta` | Page/Service/Project/Post | `pageCta` | per-page CTA title1/title2/buttonText/buttonUrl |
  | `group_tde_servicegallery` | Service | `serviceGallery` | `galleryUrl1..4` (URL fields, free-ACF safe) |
  | `group_tde_sitetext` | Page `site-settings` (157) | `siteText` | 16 fields: section chrome titles (services/projects/blog/testimonials/faq/process/industries) + 3 button labels |
- [x] Legal pages created: **254 privacy-policy / 255 terms-and-conditions / 256 cookie-policy** (full §-copy as structured `<h2>/<h3>/<p>/<ul>` HTML)
- [x] Service featured images: attachments **247–253** (Unsplash placeholders) set as `_thumbnail_id` on services 159–165; `serviceGallery` URLs seeded ×7
- [x] Removed: placeholder WhatsApp menu items **[150] footer-platforms / [156] footer-social** (fake `wa.me/919999999999` was in `sameAs`); `contactPhone` meta cleared (dummy `+91 99999 99999` was in LocalBusiness `telephone`)

### Frontend (Astro) — what became dynamic
- [x] **Contact form**: `contact.astro` renders fields **from CF7 markup** (`parseCf7Form()` → label/name/type/placeholder/options/required; radio = chips with group validation; submit label from CF7). `FormData` posted as-is → tag names no longer hardcoded. Success sub-line ← `tdeContactForm.successMessage`; WhatsApp fallback ← `siteContact`. e2e: fill → submit → success panel ✓
- [x] **About**: WP page `/about/` content via `parseContentSections()` (statement + `Why "The Digital Echo"?` + `Our Vibe` items); Capabilities ← `getServices()`; CTA ← `pageCta`; **fabricated team/stats/values dropped** (not in contents.md §7)
- [x] **Legal ×3**: shared `LegalContent.astro` (`set:html` + scoped styles) ← `getPageContent()`; H1 derived from WP title; "Last updated" ← `post_modified`
- [x] **Service detail**: intro/sections ← `parseContentSections(service.content)` (h3-headed lists → cards; arrow-line `Idea → Concept → …` extracted to process chips); Why-Choose-Us block ← `pageBy('/why-choose-us/')`; global FAQs; showcase ← `featuredImage` + `serviceGallery`; CTA ← `pageCta`; fallbacks preserved
- [x] **Homepage sections**: `ContentProduction`/`SocialMedia`/`DroneSection`/`CTASection` props ← `getHomeSections()` (titles, images, platforms list, body, button labels/urls); CTA WhatsApp button ← `siteContact.contactWhatsappUrl`
- [x] **Section chrome**: `ServicesList`/`HorizontalProjects`/`BlogPreview`/`Testimonials`/`FAQSection`/`ProcessSection`/`IndustriesSection` heading titles + "view all" labels ← `getSiteText()` (component defaults = previous hardcoded copy)
- [x] **Contact spots**: `Footer` + `FullscreenNav` email/WhatsApp/phone ← `getSiteContact()` (conditional rendering when unset). **Footer Contact column** and the **fullscreen menu's GET IN TOUCH block** now render the *same* links — one shared helper `src/lib/contact-links.ts` (`getContactLinks()`): email, WhatsApp (label = `contactWhatsappNumber` when set, else "WhatsApp"; href = `contactWhatsappUrl` or `https://wa.me/<digits>`), phone, and the social row ← `contactSocialInstagram/Facebook/Linkedin/Youtube` (empty fields hidden). The menu's separate FOLLOW US block was removed (duplicate of those socials). **Footer Navigate column ← primary menu** (same 6 links as header/fullscreen nav; `footerExplore` menu kept as fallback only).
- [x] **SEO schemas**: `LocalBusinessSchema` self-fetches (address/geo/areaServed **omitted unless set** — invented Mumbai/geo/phone removed; catalog ← live `getServices()`; `sameAs` ← footer-social menu); `OrganizationSchema`/`WebSiteSchema` ← settings + social menu (fake `SearchAction` removed)
- [x] Data layer: `parseContentSections()`/`parseContentItem()`/`parseCf7Form()` exported; getters added (`getContactForm/getAboutPage content getPageContent/getHomeSections/getSiteContact/getSiteText/getWhyChooseUs/getSiteData`); `normalizeService` rewritten (sections/process/featuredImage/gallery/pageCta); `DEFAULT_TESTIMONIALS` **removed**; `Page`/`Service`/`Post`/`Project` types extended (`ContentSection`, `PageCta`, `Cf7Form`, …)
- [x] Verify: `npx astro check` 0 errors/0 warnings · eslint 0 warnings · `npm run build` 24 pages · all routes 200 · DOM marker checks (11 home h2s, CF7 fields, WP headings) · Playwright e2e → **success panel** · screenshots `tde-shots/d-*.png`

> ⚠️ **Placeholders to replace before launch** (now client-editable in WP): `siteContact.contactWhatsappUrl` (`wa.me/919999999999`), `contactEmail`, social-menu handles, hero WhatsApp CTA if any. Address/geo/areaServed empty by design (§23) — schema omits until set.
> ⚠️ **Reveal-animation screenshots**: full-page/mid-page Playwright shots often capture `data-reveal`/`data-text-reveal` elements at opacity 0 or shift due to lazy images — verify DOM (`text=` markers) rather than trusting mid-page screenshots.

---

## Quick reference — live schema (verified 26 Sep 2026)

```graphql
# Hero (6 posts — all selectPage values correct incl. /projects/)
{ heroes(first:10){ edges{ node{ title slug heroSection{ selectPage title1 videoUrl } } } } }
{ brandstatements(first:5){ edges{ node{ title content brandStatementsSection{ title1 title2 reel1 reel2 reel3 } } } } }

# Services (7 posts) — root is `services`, NOT allService; order via MENU_ORDER
{ services(first:50, where:{orderby:{field:MENU_ORDER,order:ASC}}){ nodes{ id title slug uri menuOrder serviceMenuLinks{ serviceMenuIcon servicePageUrl } servicePage{ heroTitle } seo{ title } } } }

# siteFooter resolves on PAGE (site-settings, id 157) — field is footerTagLine (capital L)
{ pageBy(uri:"/site-settings/"){ title siteFooter{ footerTagLine footerBlurb footerCta footerCopyright }
  siteContact{ contactEmail contactWhatsappUrl contactWhatsappNumber contactPhone contactAddress contactGeoLat contactGeoLng contactAreaServed contactSocialInstagram contactSocialFacebook contactSocialLinkedin contactSocialYoutube }
  siteText{ titleServices1 titleServices2 titleFaq btnAllServices … } } }

# Homepage section copy (Page /, id 9) — 24 fields
{ pageBy(uri:"/"){ homeSections{ cpTitle cpTitleAccent cpImage1..4 smTitle1 smTitleAccent smTitle2 smTitle2Accent smPlatforms droneEyebrow droneTitle1..3 droneBody droneButtonLabel droneButtonUrl ctaTitle1 ctaTitleAccent ctaBody ctaButton1Label ctaButton1Url ctaButton2Label } } }

# Contact Form 7 (mu-plugin field, form 158) — form holds CF7 shortcodes; frontend parses them
{ tdeContactForm { id title form successMessage } }

# Offices — Contact page left column (ACF Post Type `office` + group `group_tde_officeinfo`, created 29 Sep by scripts/wp-offices-setup.php)
# Fields: companyType (select: Head Office/Branch Office/Franchise), companyName, address (textarea, `br` new lines), phone1, phone2, email, mapEmbedUrl
{ offices(first:20, where:{orderby:{field:MENU_ORDER,order:ASC}}){ nodes{ title officeInfo{ companyType companyName address phone1 phone2 email mapEmbedUrl } } } }

# Pricing plans — Pricing page (ACF Post Type `plan` + group `group_tde_planinfo`, created 29 Sep by scripts/wp-pricing-setup.php)
# Fields: planPrice, planPeriod, planSummary, planFeatures (textarea, one per line), planBadge, planHighlight (bool), planCtaLabel, planCtaUrl
{ plans(first:50, where:{orderby:{field:MENU_ORDER,order:ASC}}){ nodes{ title menuOrder planInfo{ planPrice planPeriod planSummary planFeatures planBadge planHighlight planCtaLabel planCtaUrl } } } }

# Enquiries — CPT `tde_enquiry` (29 Sep): admin-only, deliberately NOT in GraphQL (show_in_rest/show_in_graphql off).
# Written by the CF7 158 hook in mu-plugins/tde-enquiries.php; read/export via wp-admin › Enquiries (see §4.1).

# Per-page CTA (Page/Service/Project/Post) + service gallery/thumbnail
{ pageBy(uri:"/about/"){ title content date modified pageCta{ pageCtaTitle1 pageCtaTitle2 pageCtaButtonText pageCtaButtonUrl } seo{ title } } }
{ services(first:50){ nodes{ featuredImage{ node{ sourceUrl mediaDetails{ width height } } } serviceGallery{ galleryUrl1 galleryUrl2 galleryUrl3 galleryUrl4 } pageCta{ pageCtaButtonText } } } }

# Why Choose Us (drives service-detail benefits block)
{ pageBy(uri:"/why-choose-us/"){ content } }

# Menus — by location (registered in tde-setup.php) or slug; menuItems.menu is an edge
{ menus(first:10){ nodes{ slug locations menuItems(first:50){ nodes{ label url order menu{ node{ name } } } } } } }

# Content
{ faqs(first:20, where:{orderby:{field:MENU_ORDER,order:ASC}}){ nodes{ title content menuOrder } } }
{ posts(first:10){ nodes{ title slug featuredImage{ node{ sourceUrl } } seo{ title description } } } }
{ projects(first:10){ nodes{ title slug projectInfo{ clientName idea results serviceUsed featured } featuredImage{ node{ sourceUrl mediaDetails{ width height } } } } } }
{ testimonials(first:10){ nodes{ title testimonialInfo{ quote clientName companyName designation photoUrl projectType } } } }

# Introspection (after every phase)
{ __schema { queryType { fields { name } } } }   # 62 root fields; only nodeByUri ends in "By" — serviceBy/postBy/etc still execute
```

## Known gotchas
- WPGraphQL **cannot filter by ACF group fields** → fetch all + filter client-side (same as heroes; `projectInfo.featured` has no where-arg).
- `getHeroByPage()` matches `selectPage` **exactly incl. trailing slash**: `/`, `/about/`, `/contact/`, `/services/`, `/projects/`, `/blog/`. **`/pricing/` has no hero record yet** → returns `null` and `pricing.astro` renders its own `InnerHero` `fallback` (badge "Plans", H1 "Pricing").
- Primary-menu items are **custom links, not WP pages** (no `about`/`services` page in WP) → to add a nav entry run `wp menu item add-custom primary "Label" "/route/" --position=N`; deleting is `wp menu item delete <id>`. Labels/order drive both the desktop header and `FullscreenNav` (which builds its hover panels from the same list).
- ACF group **GraphQL Field Name** decides the nested object name (e.g. `serviceMenuLinks { … }`) — introspect before wiring code. Use **field keys** with `update_field()`, never graphql names.
- Repeater-like data must be a **CPT** (free) — don't plan repeaters.
- **Menus need a theme-registered location** to appear in GraphQL — `mu-plugins/tde-setup.php` registers `primary`, `footer_explore`, `footer_platforms`, `footer_social`; query `menus{ nodes{ locations } }` or by slug.
- Unused fragments in a query = GraphQL error (add `imageFragment` to service queries — thumbnail support is ON now).
- Draft posts are invisible to unauthenticated GraphQL → frontend mock fallback (documented in `src/lib/data.ts`); testimonials → `[]` (section hides).
- ACF empty values arrive as **null** over GraphQL → compact before merging with defaults (`getSiteData()` pattern), or defaults get nulled and `.trim()` crashes the build.
- CF7 shortcode parsing (`parseCf7Form`): label text lives *around* the tag inside `<label>` — strip `[...]` from the extracted label; type regex must be `[a-z]+` + separate `(\*?)` (a `[a-z*]+` type group swallows the required star); radio is required unless `allow_empty`/`include_blank`.
- `/process/`, `/industries/`, `/why-choose-us/` are WP-only pages (no Astro routes) — their content feeds homepage/service sections via `pageBy`.
- ACF **select** fields always resolve as `[String]` over GraphQL (even single-select) → `getOffices()` normalizes `companyType` array-or-string (same trap as `serviceUsed`).
- Offices CPT is registered through the **ACF Post Type** UI record (`acf_import_post_type`) — delete that record and the type disappears; re-run `scripts/wp-offices-setup.php` (idempotent: CPT + `officeInfo` group + one starter "Head Office" entry).
- Enquiry CSV link must go to **`admin-post.php?action=…`** (hook `admin_post_…`); `admin.php?action=…` fires `admin_action_…` instead → empty 200 page with `content-length: 0`.
- PHP 8.4: `fputcsv()` **requires the `$escape` argument** — use `fputcsv( $out, $row, ',', '"', '\\' )`, otherwise a deprecation notice is emitted.
- CF7 `select`/`radio` posted values arrive as **arrays** → flatten with `wpcf7_array_flatten()`; don't call `get_posted_string()` on a field that may be missing (`trim(null)` deprecates on PHP 8.1+).
- `wpcf7_before_send_mail` is the right capture point (runs only after validation/spam pass, before the mail is sent) — `wpcf7_mail_sent`/`wpcf7_mail_failed` only tell you the mail result and fire too late to read the posted data.
- Git repo: initialised 29 Sep and pushed to **https://github.com/arwasys/thedigitalecho.git** (`main`); `.env` is gitignored, WP app-password notes redacted from these docs before the first push.
