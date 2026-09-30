# The Digital Echo — Headless Astro Website

> A premium, high-performance website for The Digital Echo — a Gen Z-led digital marketing and content production company in India.

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Astro v7 | Framework |
| TypeScript | Type safety |
| TailwindCSS v4 | Styling |
| GSAP + ScrollTrigger | Animations |
| shadcn/ui | UI components |
| GraphQL | WordPress data layer |
| WordPress | Headless CMS |

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Variables

Create a `.env` file (gitignored — never commit it):

```env
# WordPress GraphQL endpoint (headless CMS)
WORDPRESS_GRAPHQL_URL=https://tde.arwasys.in/graphql

# Public frontend origin — feeds canonical/OG/schema/sitemap/robots
PUBLIC_SITE_URL=https://thedigitalecho.in

# Logo (WordPress Media Library URL)
PUBLIC_LOGO_URL=https://tde.arwasys.in/wp-content/uploads/…/logo.svg

# Analytics (optional)
PUBLIC_GA_ID=
PUBLIC_META_PIXEL_ID=
PUBLIC_LINKEDIN_PARTNER_ID=

# Fail loudly instead of silently falling back to mock content when the
# WordPress GraphQL API is unreachable (set in CI + production builds)
STRICT_FETCH=1
```

`PUBLIC_*` values are inlined **at build time** — they must exist before `npm run build`.

## Project Structure

```
thedigitalecho/
├── public/               # Static assets
├── src/
│   ├── animations/       # GSAP animation modules
│   ├── components/       # Astro components
│   │   ├── layout/       # Header, Footer, MobileMenu, PageLoader
│   │   ├── ui/           # Cursor, Lightbox, VideoBackground, etc.
│   │   └── seo/          # JSON-LD schema components
│   ├── graphql/          # GraphQL client, queries, fragments
│   ├── layouts/          # BaseLayout
│   ├── lib/              # Data fetching, utilities, mock data
│   ├── pages/            # All routes
│   ├── styles/           # Global CSS
│   └── types/            # TypeScript types
├── mds/                  # Project documentation
├── astro.config.mjs
├── tailwind.config.mjs
└── tsconfig.json
```

## Features

- **Islands Architecture** — Minimal JS, maximum performance
- **GSAP Animations** — ScrollTrigger, text reveals, parallax, magnetic buttons
- **Custom Cursor** — Desktop cursor with state changes
- **Page Transitions** — Astro ClientRouter with fade transitions
- **Lightbox** — Full-screen image gallery with keyboard nav
- **Horizontal Scroll** — Pinned project showcase section
- **SEO** — JSON-LD, Open Graph, sitemap, robots.txt
- **Accessibility** — WCAG compliant, prefers-reduced-motion support
- **Responsive** — Optimized for 360px to 1920px

## WordPress Setup

Required plugins:
- WPGraphQL
- Advanced Custom Fields (ACF)
- WPGraphQL for ACF

Required custom post types:
- `services` — Service offerings
- `projects` — Client projects

## Deployment

**Hybrid SSR on cPanel** — `output: 'server'` + `@astrojs/node` (standalone).
Pages render on demand (always in sync with WordPress); the legal pages opt out
with `export const prerender = true`.

### Architecture

| Piece | URL |
|---|---|
| WordPress (headless API) | `https://tde.arwasys.in/graphql` → `WORDPRESS_GRAPHQL_URL` |
| Astro frontend | `https://thedigitalecho.in` → `PUBLIC_SITE_URL` |

### One-time cPanel setup

1. **Git Version Control** → clone `https://github.com/arwasys/thedigitalecho.git`
   (branch `main`) into a directory **outside** `public_html` (e.g. `~/thedigitalecho`).
2. Create `~/thedigitalecho/.env` (see Environment Variables above).
3. **Setup Node.js App** → Create: Node **≥22.12** · Production ·
   application root `thedigitalecho` · URL `https://thedigitalecho.in` ·
   startup file **`dist/server/entry.mjs`**.
4. **Run NPM Install** → **Run JS Script** `build` → **Start**.
5. Point `thedigitalecho.in` (+ `www` → redirect) at the server; run **AutoSSL**.

### Each release

Git Version Control → **Pull** → Setup Node.js App → Run JS Script `build` → **Restart**.

### Fallback (no Node on the host)

Static build: `npm run build` → deploy `dist/client`… to `public_html`, or let
GitHub Actions build on push. Same SEO (full HTML), content updates need a rebuild.

## License

Private — The Digital Echo
