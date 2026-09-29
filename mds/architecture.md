# THE DIGITAL ECHO — Project Architecture

> Technical architecture and file organization guide.
> Last updated: 2026-08-22

---

## Project Structure

```
thedigitalecho/
├── public/
│   ├── favicon.svg
│   ├── og-image.jpg
│   ├── robots.txt
│   ├── assets/
│   │   ├── lineart/                  # Lineart background textures
│   │   │   ├── socialmedia.webp
│   │   │   ├── drone-photography..webp
│   │   │   ├── photgrapher.webp
│   │   │   ├── digitaloffice.webp
│   │   │   ├── videographer.webp
│   │   │   ├── video-editor.webp
│   │   │   ├── sport-photography.webp
│   │   │   ├── product-photography.webp
│   │   │   └── corporate-photography.webp
│   │   ├── sample-restaurant.mp4     # Reels carousel videos
│   │   ├── sample-shop.mp4
│   │   └── sample-factory.mp4
│   └── fonts/
├── src/
│   ├── animations/
│   │   ├── reveal.ts                 # Scroll reveal, text reveal, image reveal, parallax
│   │   └── magnetic.ts              # Magnetic button effect
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.astro          # Transparent header, scroll-aware, logo + hamburger
│   │   │   ├── Footer.astro          # Logo + nav + social + contact columns
│   │   │   ├── FullscreenNav.astro   # Full-screen overlay navigation (GSAP)
│   │   │   ├── MobileMenu.astro      # Mobile hamburger menu
│   │   │   └── PageLoader.astro      # Page loading animation
│   │   ├── sections/
│   │   │   ├── BrandStatement.astro  # "WE DON'T JUST CREATE CONTENT..."
│   │   │   ├── ReelsCarousel.astro   # Auto-scrolling reels carousel
│   │   │   ├── ServicesList.astro    # "WHAT WE DO." service list with icons
│   │   │   ├── ContentProduction.astro # "CONTENT THAT STOPS THE SCROLL."
│   │   │   ├── SocialMedia.astro     # "YOUR FEED CALLED." platforms
│   │   │   ├── DroneSection.astro    # "CHANGE THE PERSPECTIVE." full-bleed
│   │   │   ├── HorizontalProjects.astro # "WORK > WORDS." horizontal scroll
│   │   │   ├── ProcessSection.astro  # "CREATIVE PROCESS." 4-step (CSS animation)
│   │   │   ├── Testimonials.astro    # Client testimonials
│   │   │   ├── BlogPreview.astro     # "THE DROP." recent articles
│   │   │   ├── FAQSection.astro      # FAQ accordion (document-level delegation)
│   │   │   └── CTASection.astro      # "LET'S MAKE SOME NOISE."
│   │   ├── seo/
│   │   │   ├── OrganizationSchema.astro
│   │   │   ├── WebSiteSchema.astro
│   │   │   ├── FAQSchema.astro
│   │   │   ├── LocalBusinessSchema.astro
│   │   │   └── BreadcrumbSchema.astro
│   │   └── ui/
│   │       ├── PageHero.astro        # Reusable hero (video + badge + title + desc + buttons)
│   │       ├── VideoBackground.astro # Standalone video background component
│   │       ├── ServiceIcon.astro     # SVG icons for services
│   │       ├── ThemeToggle.astro     # Theme toggle (unused currently)
│   │       └── FaqAccordion.astro    # FAQ item component
│   ├── graphql/
│   │   ├── client.ts                 # GraphQL fetch client
│   │   ├── fragments/
│   │   │   └── index.ts             # imageFragment, serviceFragment, projectFragment, heroFragment, postFragment
│   │   └── queries/
│   │       ├── heroes.ts            # GET_ALL_HEROS (fetches all, filter client-side)
│   │       ├── services.ts          # GET_SERVICES, GET_SERVICE_BY_SLUG, GET_SERVICE_SLUGS
│   │       ├── projects.ts          # GET_PROJECTS, GET_FEATURED_PROJECTS, GET_PROJECT_BY_SLUG, GET_PROJECT_SLUGS
│   │       ├── posts.ts             # GET_POSTS, GET_POST_BY_SLUG, GET_POST_SLUGS
│   │       ├── pages.ts            # GET_HOME_PAGE
│   │       └── settings.ts         # GET_SITE_SETTINGS
│   ├── layouts/
│   │   └── BaseLayout.astro          # Main layout with header, footer, FullscreenNav, PageLoader
│   ├── lib/
│   │   ├── data.ts                   # All data fetching functions + normalizers
│   │   ├── image.ts                  # Image utilities
│   │   └── mock-data/
│   │       ├── services.ts           # Mock service data (8 services)
│   │       ├── projects.ts           # Mock project data (4 projects)
│   │       ├── posts.ts             # Mock blog posts (3 posts)
│   │       └── heroes.ts            # Mock hero data (6 pages)
│   ├── pages/
│   │   ├── index.astro               # Homepage (14 sections)
│   │   ├── about.astro               # About page
│   │   ├── contact.astro             # Contact page
│   │   ├── 404.astro                 # 404 page
│   │   ├── privacy-policy.astro      # Privacy policy
│   │   ├── terms-and-conditions.astro # Terms
│   │   ├── cookie-policy.astro       # Cookie policy
│   │   ├── services/
│   │   │   ├── index.astro           # Services listing
│   │   │   └── [slug].astro          # Service detail (dynamic)
│   │   ├── projects/
│   │   │   ├── index.astro           # Projects listing
│   │   │   └── [slug].astro          # Project detail (dynamic)
│   │   └── blog/
│   │       ├── index.astro           # Blog listing
│   │       └── [slug].astro          # Blog article (dynamic)
│   ├── styles/
│   │   └── global.css                # TailwindCSS v4 + custom utilities + video-bg styles
│   └── types/
│       └── index.ts                  # All TypeScript types (Hero, Service, Project, Post, etc.)
├── mds/                              # Project documentation
├── inspire/                          # Design inspiration reference
├── .env                              # Environment variables
├── astro.config.mjs                  # Astro config (Site, integrations, vite)
├── package.json
└── tsconfig.json
```

---

## Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Astro | v7 | Framework (SSG) |
| TypeScript | Latest | Type safety |
| TailwindCSS | v4 | Styling (CSS-first config) |
| GSAP | Latest | Animations |
| ScrollTrigger | Latest | Scroll-based animations |
| GraphQL | - | Data fetching |
| WordPress | - | Headless CMS |
| WPGraphQL | - | GraphQL API |
| Geist + Inter | Variable | Typography |

---

## Key Design Tokens

### Colors (Light Theme — Active)

```css
:root {
  --background: oklch(0.935 0.01 80);    /* #E8E4DE cream */
  --foreground: oklch(0.165 0.006 60);    /* #0A0A0F dark */
  --primary: oklch(0.58 0.14 65);         /* #C48A2A gold */
  --secondary: oklch(0.22 0.1 260);       /* #1A3A8A blue */
  --accent: oklch(0.58 0.14 65);          /* gold */
  --muted: oklch(0.88 0.01 80);           /* light gray */
  --border: oklch(0.85 0.03 65 / 30%);   /* gold tint */
}
```

### Video Background Settings

```css
.video-bg__video { opacity: 0.2; }           /* video element */
.video-bg__overlay { opacity: 0.1; }          /* overlay (passed as prop) */
/* playbackRate: 0.5 (half speed) — set via JS */
/* loop: disabled (plays once) */
```

---

## GraphQL Schema Notes

### Hero CPT (`hero` / `heroes`)
- ACF Group field: `heroSection` with fields: `selectPage`, `smallText`, `videoUrl`, `button1Label`, `button1PageLink`, `button2Label`, `button2PageLink`
- WordPress core fields: `id`, `title`, `slug`, `content` (used for description)
- WPGraphQL **cannot filter** by ACF Group fields — fetch all and filter client-side
- Page link fields return plain strings (e.g., `"/contact"`)

### Known GraphQL Errors
- `projects` → WPGraphQL expects `project`/`projectBy`/`allProject` (singular)
- `services` → WPGraphQL expects `service`/`serviceBy`/`allService` (singular)
- These fall back to mock data until WordPress CPT names are corrected
