# THE DIGITAL ECHO — Development Phases

> Detailed execution plan for building The Digital Echo website.
> Follow phases sequentially. Do not skip ahead.

---

## PHASE 1 — Foundation

> Goal: Working Astro project with header, footer, routing, and base styling.

### Tasks

- [ ] Initialize Astro project with TypeScript
- [ ] Configure TailwindCSS
- [ ] Setup project structure
- [ ] Create `.env.example` and `.gitignore`
- [ ] Create `BaseLayout.astro`
- [ ] Create `Header.astro` (desktop + mobile)
- [ ] Create `Footer.astro`
- [ ] Create `MobileMenu.astro`
- [ ] Setup page routing
- [ ] Create placeholder pages (Home, About, Services, Projects, Blog, Contact, 404)
- [ ] Setup global styles and typography
- [ ] Configure font loading (Inter or similar variable font)
- [ ] Create base color system
- [ ] Test basic navigation works

### Files Created

```
astro.config.mjs
tsconfig.json
tailwind.config.mjs
.env.example
.gitignore
src/
├── layouts/
│   └── BaseLayout.astro
├── components/
│   └── layout/
│       ├── Header.astro
│       ├── Footer.astro
│       └── MobileMenu.astro
├── pages/
│   ├── index.astro
│   ├── about.astro
│   ├── contact.astro
│   └── 404.astro
├── styles/
│   └── global.css
└── types/
    └── index.ts
```

### Verification

- [ ] `npm run dev` works
- [ ] All pages load
- [ ] Header navigation works
- [ ] Mobile menu opens/closes
- [ ] Typography loads correctly
- [ ] Colors match design spec

---

## PHASE 2 — Data Layer

> Goal: GraphQL client connected to WordPress, typed data fetching.

### Tasks

- [ ] Create GraphQL client (`src/graphql/client.ts`)
- [ ] Create GraphQL fragments
- [ ] Create GraphQL queries (home, pages, services, projects, posts, settings)
- [ ] Define TypeScript types (WordPressImage, SEO, Service, Project, Post, etc.)
- [ ] Setup environment variables for WordPress
- [ ] Create image handling utilities
- [ ] Test GraphQL connection
- [ ] Handle errors gracefully
- [ ] Create mock data for development

### Files Created

```
src/
├── graphql/
│   ├── client.ts
│   ├── fragments/
│   │   ├── image.ts
│   │   ├── seo.ts
│   │   ├── project.ts
│   │   └── service.ts
│   └── queries/
│       ├── home.ts
│       ├── pages.ts
│       ├── services.ts
│       ├── projects.ts
│       ├── posts.ts
│       └── settings.ts
├── types/
│   ├── wordpress.ts
│   ├── service.ts
│   ├── project.ts
│   ├── post.ts
│   └── page.ts
└── lib/
    ├── image.ts
    └── fetch.ts
```

### Verification

- [ ] GraphQL client connects
- [ ] Queries return typed data
- [ ] Error handling works
- [ ] Mock data renders on pages

---

## PHASE 3 — Pages

> Goal: All pages built with real content structure.

### Tasks

- [ ] Build Homepage (15 sections)
- [ ] Build About page
- [ ] Build Services listing page
- [ ] Build Service detail page (dynamic route)
- [ ] Build Projects listing page
- [ ] Build Project detail page (dynamic route)
- [ ] Build Blog listing page
- [ ] Build Blog article page (dynamic route)
- [ ] Build Contact page with form
- [ ] Build 404 page

### Homepage Sections (in order)

1. Hero
2. Client/Trust Strip
3. Brand Statement
4. What We Do
5. Content Production
6. Social Media
7. Drone
8. Selected Projects
9. Creative Process
10. Industries
11. Testimonials
12. The Drop/Blog
13. FAQ
14. Final CTA
15. Footer

### Files Created

```
src/
├── pages/
│   ├── index.astro
│   ├── about.astro
│   ├── contact.astro
│   ├── 404.astro
│   ├── services/
│   │   ├── index.astro
│   │   └── [slug].astro
│   ├── projects/
│   │   ├── index.astro
│   │   └── [slug].astro
│   └── blog/
│       ├── index.astro
│       └── [slug].astro
├── components/
│   ├── home/
│   │   ├── Hero.astro
│   │   ├── BrandStatement.astro
│   │   ├── ServicesPreview.astro
│   │   ├── SocialSection.astro
│   │   ├── DroneSection.astro
│   │   ├── FeaturedProjects.astro
│   │   ├── Process.astro
│   │   ├── Testimonials.astro
│   │   ├── FAQ.astro
│   │   └── FinalCTA.astro
│   ├── projects/
│   │   ├── ProjectCard.astro
│   │   ├── ProjectGrid.astro
│   │   └── ProjectGallery.astro
│   └── blog/
│       ├── BlogCard.astro
│       ├── BlogGrid.astro
│       └── ArticleContent.astro
└── layouts/
    ├── PageLayout.astro
    └── ArticleLayout.astro
```

### Verification

- [ ] Homepage renders all sections
- [ ] Service pages render dynamically
- [ ] Project pages render dynamically
- [ ] Blog pages render dynamically
- [ ] Contact form renders
- [ ] 404 page works
- [ ] All content is from WordPress/mock data

---

## PHASE 4 — Motion

> Goal: GSAP animations, ScrollTrigger, page transitions.

### Tasks

- [ ] Setup GSAP and ScrollTrigger
- [ ] Create animation utilities
- [ ] Build text animation system (split, reveal, fade)
- [ ] Build image reveal animations
- [ ] Build parallax system
- [ ] Create magnetic buttons
- [ ] Create custom cursor
- [ ] Build page loader
- [ ] Implement page transitions (Astro View Transitions)
- [ ] Add ScrollTrigger to all sections
- [ ] Respect `prefers-reduced-motion`

### Files Created

```
src/
├── animations/
│   ├── reveal.ts
│   ├── text.ts
│   ├── parallax.ts
│   ├── magnetic.ts
│   ├── horizontal.ts
│   └── pageTransitions.ts
├── components/
│   └── ui/
│       ├── MagneticButton.astro
│       ├── RevealText.astro
│       ├── RevealImage.astro
│       ├── SectionHeading.astro
│       ├── Cursor.astro
│       └── Marquee.astro
└── components/
    └── layout/
        └── PageTransition.astro
```

### Verification

- [ ] Hero animation plays on load
- [ ] Text reveals work on scroll
- [ ] Image reveals work
- [ ] Magnetic buttons work
- [ ] Custom cursor works (desktop only)
- [ ] Page transitions work
- [ ] Reduced motion disables animations
- [ ] No duplicate animations after navigation

---

## PHASE 5 — SEO & Accessibility

> Goal: Full SEO implementation and WCAG compliance.

### Tasks

- [ ] Add `<title>` and `<meta>` to all pages
- [ ] Add Open Graph metadata
- [ ] Add Twitter/X card metadata
- [ ] Add canonical URLs
- [ ] Implement JSON-LD structured data
- [ ] Create sitemap.xml
- [ ] Create robots.txt
- [ ] Add breadcrumbs
- [ ] Ensure semantic HTML throughout
- [ ] Test keyboard navigation
- [ ] Add ARIA labels where needed
- [ ] Test with screen reader
- [ ] Verify color contrast
- [ ] Add focus states
- [ ] Test form accessibility

### Verification

- [ ] Each page has unique title/description
- [ ] OG tags render correctly
- [ ] Sitemap includes all pages
- [ ] robots.txt is correct
- [ ] JSON-LD validates
- [ ] Keyboard navigation works
- [ ] Focus states visible
- [ ] Screen reader reads content correctly

---

## PHASE 6 — Performance

> Goal: Optimize for Core Web Vitals.

### Tasks

- [ ] Optimize images (formats, sizes, lazy loading)
- [ ] Optimize fonts (preloading, display: swap)
- [ ] Remove unused CSS/JS
- [ ] Minimize bundle size
- [ ] Test LCP, CLS, INP
- [ ] Optimize video loading
- [ ] Check for layout shift
- [ ] Test on slow network
- [ ] Test on mobile devices

### Verification

- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] INP < 200ms
- [ ] No render-blocking resources
- [ ] Images properly sized
- [ ] Fonts load efficiently

---

## PHASE 7 — Final QA

> Goal: Full testing and validation.

### Tasks

- [ ] Test all routes
- [ ] Test mobile navigation
- [ ] Test page transitions
- [ ] Test ScrollTrigger after navigation
- [ ] Test reduced motion
- [ ] Test keyboard navigation
- [ ] Check image loading
- [ ] Check SEO metadata
- [ ] Check structured data
- [ ] Check sitemap
- [ ] Check robots.txt
- [ ] Review Core Web Vitals
- [ ] Cross-browser testing
- [ ] Final build test

### Final Report

- [ ] WHAT WAS BUILT
- [ ] WORDPRESS / GRAPHQL REQUIREMENTS
- [ ] PAGES CREATED
- [ ] ANIMATION SYSTEM
- [ ] SEO IMPLEMENTATION
- [ ] PERFORMANCE IMPLEMENTATION
- [ ] ENVIRONMENT VARIABLES
- [ ] COMMANDS TO RUN
- [ ] KNOWN LIMITATIONS

---

## Current Session

**Active Phase:** Phase 4 (Motion) — refinements ongoing
**Started:** 2026-08-21
**Last Updated:** 2026-08-22
**Status:** In Progress

### Phase 1 — Foundation — COMPLETE
- [x] Astro v7 + TypeScript + TailwindCSS v4
- [x] BaseLayout.astro
- [x] Header.astro (transparent + scroll effect, logo `h-20 md:h-24`, `py-4 md:py-6`)
- [x] Footer.astro (logo + 3-column layout)
- [x] FullscreenNav.astro (GSAP animated overlay)
- [x] PageLoader.astro (TDE branding)
- [x] Global styles with design tokens
- [x] Inter + Geist fonts
- [x] Page routing (all pages)
- [x] 23 pages built successfully

### Phase 2 — Data Layer — COMPLETE
- [x] GraphQL client (`src/graphql/client.ts`)
- [x] GraphQL fragments (image, service, project, hero, post)
- [x] GraphQL queries (services, projects, posts, heroes, pages, settings)
- [x] TypeScript types (Service, Project, Post, Hero, etc.)
- [x] Mock data fallback for all data functions
- [x] `getHeroByPage()` — fetches all heroes, filters by `selectPage`
- [x] `normalizeHero()` — maps GraphQL to Hero type

### Phase 3 — Pages — COMPLETE
- [x] Homepage (`/`) — 14 sections
- [x] About (`/about/`)
- [x] Services listing (`/services/`)
- [x] 8 Service detail pages (`/services/[slug]/`)
- [x] Projects listing (`/projects/`)
- [x] 4 Project detail pages (`/projects/[slug]/`)
- [x] Blog listing (`/blog/`)
- [x] 3 Blog articles (`/blog/[slug]/`)
- [x] Contact (`/contact/`)
- [x] 404, Privacy, Terms, Cookie pages

### Phase 4 — Motion — IN PROGRESS
- [x] GSAP + ScrollTrigger setup
- [x] Text animation system (split into chars/words/lines)
- [x] Scroll reveal animations (up, down, left, right, fade, scale)
- [x] Parallax effects
- [x] Image clip-path reveals
- [x] Magnetic buttons (proper cleanup)
- [x] Custom cursor with states (DEFAULT, VIEW, EXPLORE)
- [x] Page loader with GSAP
- [x] `prefers-reduced-motion` respected
- [x] ProcessSection — CSS `@keyframes` (avoids GSAP cleanup conflicts)
- [x] Hero cinematic reveal (clip-path, rotationX, stagger, back.out bounce)
- [x] Video playback rate (0.5x half speed)
- [ ] Page transitions (Astro View Transitions — v7 removed, using ClientRouter)
- [ ] Horizontal scroll sections

### Phase 5 — SEO & Accessibility — COMPLETE
- [x] JSON-LD schemas (Organization, WebSite, FAQ, LocalBusiness, Breadcrumb)
- [x] Auto-generated `sitemap.xml`
- [x] `robots.txt`
- [x] Open Graph + Twitter cards
- [x] Canonical URLs
- [x] Skip-to-content link
- [x] Focus-visible states
- [x] Semantic HTML throughout

### Phase 6 — Performance — COMPLETE
- [x] Font preloading with `display=swap`
- [x] Lazy loading for below-fold images
- [x] Eager loading for hero/LCP images
- [x] Build: 23 pages in ~35s

### Phase 7 — Final QA — PENDING
- [ ] Cross-browser testing
- [ ] Mobile performance audit
- [ ] Final build verification
