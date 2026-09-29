# THE DIGITAL ECHO — Components

> Reusable component catalog and patterns.
> Last updated: 2026-09-23

---

## Layout Components

### Header.astro

Transparent fixed header with scroll-aware background.

**Props:** None (uses WordPress settings)

**Features:**
- Logo (`h-20 md:h-24`, `py-4 md:py-6` padding)
- Desktop: Logo left, CTA "LET'S TALK" + hamburger right
- Mobile: Logo + hamburger only
- Scroll-aware: adds background on scroll
- FullscreenNav toggle

---

### Footer.astro

Site-wide footer with logo and columns.

**Props:** None (uses WordPress settings)

**Features:**
- Logo at top
- 3-column grid: Navigate, Connect, Get In Touch
- Social links (Instagram, LinkedIn, Facebook, WhatsApp, YouTube)
- Blue section labels
- "Create. Connect. Echo." microcopy

---

### FullscreenNav.astro

Full-screen animated navigation overlay.

**Props:** None

**Features:**
- GSAP sequential reveal animation
- Numbered items left column (01-05)
- Contact/social right column
- ESC to close
- ARIA labels
- Managed by `#fullscreen-nav` with `data-open` attribute

---

### PageLoader.astro

Page loading animation.

**Props:** None

**Features:**
- Logo reveal with "THE DIGITAL ECHO" text
- GSAP timeline animation
- Auto-dismisses after load
- Blue/gold alternating text

---

## UI Components

### PageHero.astro

**Reusable hero component** used by all pages.

**Props:**
- `hero: Hero | null` — Hero data from WordPress/mock
- `overlayOpacity?: number` — Video overlay opacity (default: `0.1`)

**Features:**
- Video background (plays once, no loop, 0.5x speed)
- Overlay gradient (cream-tinted)
- Badge (smallText) — `bg-primary text-primary-foreground`
- Title — fluid `clamp(2.5rem, 8vw, 10rem)`, `text-secondary`
- Description — fluid `clamp(1.25rem, 3vw, 2.5rem)`, `color: var(--color-secondary)`, HTML rendered via `set:html`
- Two CTA buttons (primary + secondary)
- Cinematic GSAP reveal animation (clip-path, rotationX, stagger, bounce)

---

### VideoBackground.astro

Standalone video background (used outside PageHero where needed).

**Props:**
- `src: string` — Video URL
- `overlayOpacity?: number`

---

### ServiceIcon.astro

SVG icons for services.

**Props:**
- `name: string` — Icon name

**Icons available:** camera, video, drone, megaphone, globe, pen, users, mail, image, share

---

### Lineart.astro

Animated scroll-drawn line-art background. **NEW 2026-09-23 (pilot).**

**Props:**
- `name: string` — Subject key (see `src/lib/lineart.ts`)
- `class?: string` — Color utilities only (e.g. `text-accent`, `text-accent-blue`)
- `strokeWidth?: number` — Default `1.2`

**Usage:** place inside a section with `data-lineart-section`:

```astro
<section class="relative overflow-hidden" data-lineart-section>
  <Lineart name="socialmedia" class="text-accent-blue" />
  <div class="container relative z-10">…</div>
</section>
```

**Behavior:** full-section SVG (`absolute inset-0 w-full h-full`, `preserveAspectRatio="xMidYMid slice"`); draws in on scroll, fades to `opacity: 0.18` backdrop, then section content reveals (see `mds/animations.md` → "Lineart SVG Draw-On"). Content must be `relative z-10` to sit above it.

**Subjects authored (pilot):** `drone`, `photographer`, `socialmedia`. Awaiting: `video-editor`, `digitaloffice`, `videographer`, `sport`, `product`, `corporate`.

### FaqAccordion.astro

FAQ accordion item.

**Props:**
- `question: string`
- `answer: string`
- `index: number`

**Features:**
- Document-level click delegation (single listener)
- Accordion open/close with max-height transition
- Chevron rotation
- aria-expanded attribute

---

## Section Components (Homepage)

### BrandStatement.astro

Large editorial statement section.

**Content:** "WE DON'T JUST CREATE CONTENT. WE CREATE AN ECHO."

**Features:**
- ScrollTrigger text reveal (line-by-line)
- Lineart background (`video-editor.webp` — pending `<Lineart name="video-editor">` swap)
- 3D perspective text animation

---

### ReelsCarousel.astro

Auto-scrolling reels/videos carousel.

**Features:**
- Infinite horizontal scroll (CSS animation)
- 6 video slides (3 unique, repeated)
- Auto-play, muted, loop

---

### ServicesList.astro

"WHAT WE DO." service list with icons.

**Features:**
- Service items with SVG icons
- Hover: expand, color change, arrow appear
- "ALL SERVICES" CTA
- Lineart background (`product-photography.webp`)
- Data from WordPress/mock

---

### ContentProduction.astro

"CONTENT THAT STOPS THE SCROLL." section.

**Features:**
- 4-column image grid
- Hover scale effect
- Lineart: `<Lineart name="photographer" class="text-accent"/>` (2026-09-23)

---

### SocialMedia.astro

"YOUR FEED CALLED." platform showcase.

**Features:**
- Platform names: Instagram, Facebook, LinkedIn, WhatsApp, YouTube, Google
- Hover color transition
- Lineart: `<Lineart name="socialmedia" class="text-accent-blue"/>` (2026-09-23)

---

### DroneSection.astro

Full-bleed drone showcase.

**Features:**
- Full-section drone line-art draws in then fades to backdrop: `<Lineart name="drone" class="text-accent"/>` (2026-09-23)
- "CHANGE THE PERSPECTIVE." heading
- CTA to drone services

---

### HorizontalProjects.astro

"WORK > WORDS." horizontal scroll projects.

**Features:**
- Horizontal scroll with pinned section
- Project cards with hover overlay
- "VIEW ALL PROJECTS" CTA
- Lineart background (`sport-photography.webp`)
- GSAP horizontal scroll animation

---

### ProcessSection.astro

"CREATIVE PROCESS." 4-step section.

**Features:**
- 4 process steps (Discovery, Strategy, Create, Echo)
- CSS `@keyframes` animation (not GSAP — avoids cleanup conflicts)
- Staggered animation delays
- Lineart background (`videographer.webp`)

---

### Testimonials.astro

Client testimonials.

**Features:**
- 3 testimonial cards
- Quote text, author name, company, avatar initials
- Reveal animation

---

### BlogPreview.astro

"THE DROP." recent articles.

**Features:**
- 3-column article grid
- Category badges
- Hover zoom on images
- "VIEW ALL ARTICLES" CTA
- Data from WordPress/posts

---

### FAQSection.astro

FAQ accordion section.

**Features:**
- 4 FAQ items
- Document-level click delegation
- Accordion open/close
- GSAP-safe (no per-item listeners)

---

### CTASection.astro

Final call-to-action section.

**Features:**
- "LET'S MAKE SOME NOISE."
- WhatsApp button
- Lineart background (`digitaloffice.webp`)

---

## SEO Components

### OrganizationSchema.astro
JSON-LD Organization schema.

### WebSiteSchema.astro
JSON-LD WebSite schema.

### FAQSchema.astro
JSON-LD FAQPage schema. Takes `faqs` prop.

### LocalBusinessSchema.astro
JSON-LD LocalBusiness schema.

### BreadcrumbSchema.astro
JSON-LD BreadcrumbList schema.
