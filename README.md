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

Create a `.env` file:

```env
WORDPRESS_GRAPHQL_URL=http://your-wordpress-site.com/graphql
PUBLIC_SITE_URL=http://localhost:4321
PUBLIC_LOGO_URL=
PUBLIC_GA_ID=
PUBLIC_META_PIXEL_ID=
PUBLIC_LINKEDIN_PARTNER_ID=
```

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

Compatible with:
- Vercel
- Netlify
- Cloudflare
- Static hosting

## License

Private — The Digital Echo
