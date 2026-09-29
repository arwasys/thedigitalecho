# Session Notes — 22 Aug 2026

## Summary

Fixed hero CPT rendering bugs, added dynamic WordPress Hero data for all pages, fixed FAQ accordion click issues, added lineart backgrounds across all sections, redesigned ProcessSection with CSS animations, and refined hero styling with cinematic reveal animations.

---

## What Was Built

### Hero CPT System (WordPress Dynamic)
- Created `Hero` TypeScript type with ACF group fields
- Created `heroFragment` GraphQL fragment querying `heroSection` group
- Created `GET_ALL_HEROS` GraphQL query (fetches all, filters client-side by `selectPage`)
- Created `normalizeHero()` in `src/lib/data.ts` to map GraphQL response to Hero type
- Created `getHeroByPage()` to find hero by page path
- Created `PageHero.astro` reusable component with video background, badge, title, description, buttons
- Created mock hero data for 6 pages (/, /about/, /contact/, /services/, /projects/, /blog/)
- Updated all pages to use `<PageHero hero={hero} />` instead of hardcoded heroes

### Hero CPT Fields (WordPress ACF Group: `heroSection`)
- `selectPage` (text) — page path match (e.g., "/", "/about/")
- `smallText` (text) — badge text above title
- `videoUrl` (url) — background video
- `button1Label` (text) — primary CTA label
- `button1PageLink` (page link → plain string) — primary CTA link
- `button2Label` (text) — secondary CTA label
- `button2PageLink` (page link → plain string) — secondary CTA link
- `content` (WordPress core) — used for hero description (HTML stripped of `<p>` tags)

### Bug Fixes
- **button2Label not rendering** — Bug was in `normalizeHero()` at `src/lib/data.ts:266` — `button2Label` was hardcoded to `''` instead of `String(section?.button2Label || '')`
- **Description showing escaped HTML** — Changed from `{hero.heroDescription}` to `set:html={hero.heroDescription}` and changed `<p>` to `<div>` to avoid double wrapping
- **Description showing twice** — Removed duplicate description block in `PageHero.astro`
- **HomeHero import unused** — Removed `HomeHero` import from `index.astro`

### FAQ Accordion Fix
- Rewrote FAQ click handler using document-level event delegation
- Single permanent `click` listener on `document` instead of per-item listeners
- Prevents duplicate listener registration across page transitions
- Added `faqInitialized` guard removed in favor of event delegation pattern

### ProcessSection Redesign
- Switched from GSAP ScrollTrigger to CSS `@keyframes` animation
- Animations: `processStepReveal` (fade-up) and `processNumberReveal` (scale-in)
- Staggered delays using inline `style="animation-delay: Xs"`
- Avoids GSAP cleanup conflicts with homepage `cleanupAnimations()`

### Lineart Background Overlays
- Added subtle lineart background textures to all homepage sections and inner pages
- Images used (all `.webp` in `/assets/lineart/`):
  - `socialmedia.webp` — Social Media section
  - `drone-photography..webp` — Drone section
  - `photgrapher.webp` — Content Production section
  - `digitaloffice.webp` — CTA / Blog sections
  - `videographer.webp` — Process section
  - `video-editor.webp` — Brand Statement section
  - `sport-photography.webp` — Projects section
  - `product-photography.webp` — Services list section
  - `corporate-photography.webp` — Services detail pages
- Opacity ranges: 0.04–0.08 for subtlety
- Applied to: SocialMedia, DroneSection, ContentProduction, CTASection, ProcessSection, BrandStatement, HorizontalProjects, ServicesList, About, Contact, Services, Blog pages

### Hero Styling Refinements
- **Badge**: `bg-primary text-primary-foreground` (solid background)
- **Title**: fluid `clamp(2.5rem, 8vw, 10rem)` with `text-secondary` color
- **Description**: fluid `clamp(1.25rem, 3vw, 2.5rem)` with `color: var(--color-secondary)`
- **Video overlay**: opacity `0.1` (10% — video very visible)
- **Video element**: opacity `0.2`
- **Video**: no loop (plays once, pauses at end)
- **Video speed**: `playbackRate = 0.5` (half speed)
- **Logo**: `h-20 md:h-24` with `py-4 md:py-6` header padding

### Hero Reveal Animation (Cinematic)
- **Badge**: clip-path reveal from bottom (`inset(0% 0% 100% 0%)` → `inset(0% 0% 0% 0%)`)
- **Title lines**: clip-path reveal + 3D `rotationX: 15` tilt, staggered 0.12s
- **Description**: smooth fade-up after title
- **Buttons**: scale bounce with `back.out(1.7)` easing
- Uses `power4.out` easing for smooth deceleration
- Timeline sequence: badge → title (staggered) → description → buttons

---

## Current Design Tokens

### Colors (Light Theme — current)
| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg` | `#E8E4DE` | Cream background |
| `--color-text` | `#0A0A0F` | Dark text |
| `--color-muted` | `#8A8A8A` | Muted gray |
| `--color-accent` | `#C48A2A` | Gold accent |
| `--color-accent-blue` | `#1A3A8A` | Blue accent |
| `--color-border` | `rgba(196,138,42,0.15)` | Gold-tinted border |
| `--color-cream` | `#E8E4DE` | Logo/brand color |

### Hero Video Settings
- `video-bg__video` opacity: `0.2`
- `video-bg__overlay` opacity: `0.1` (passed as prop)
- `playbackRate`: `0.5` (half speed)
- `loop`: disabled (plays once)

---

## What's Next (Future Sessions)

### Priority 1 — High Impact
1. **Custom Cursor** — Desktop cursor with states: DEFAULT, VIEW, DRAG, OPEN, EXPLORE
2. **Project Gallery/Lightbox** — Click to open images full-screen with keyboard nav
3. **Horizontal Scroll** — Project showcase with pinned horizontal scroll on homepage

### Priority 2 — Content & Forms
4. **Contact Form** — Add Phone/WhatsApp, Website, Budget fields + validation + error/loading states
5. **About Page** — Expand with Philosophy, Team, Working Style, Capabilities sections
6. **Service Detail** — Add Visual Showcase, Benefits, Related Projects sections
7. **Blog** — Add category filter, pagination, featured article highlight

### Priority 3 — Technical
8. **README.md** — Project documentation at root
9. **ESLint + Prettier** — Code quality tooling
10. **Analytics** — GA4, Meta Pixel, LinkedIn Insight Tag loading code

### Priority 4 — SEO & Legal
11. **Cookie/Privacy Pages** — /privacy-policy/, /terms-and-conditions/, /cookie-policy/
12. **Location Pages** — If serving specific cities (Mumbai, Pune, etc.)

### Priority 5 — WordPress Schema Fixes
13. `projects` CPT — Rename to `project` (singular) or fix GraphQL query
14. `services` CPT — Rename to `service` (singular) or fix GraphQL query
15. Register in WordPress if not yet registered

---

## Known Issues / GraphQL Errors

- `Cannot query field "projects"` — WPGraphQL expects `project`/`projectBy`/`allProject`
- `Cannot query field "services"` — WPGraphQL expects `service`/`serviceBy`/`allService`
- These cause mock data fallback for project/service pages
- Hero query works correctly (`heroes` plural is correct)
