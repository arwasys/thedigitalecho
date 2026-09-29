# THE DIGITAL ECHO — Performance Optimization

> Performance rules and Core Web Vitals targets.

---

## Core Web Vitals Targets

| Metric | Target | Description |
|--------|--------|-------------|
| LCP | < 2.5s | Largest Contentful Paint |
| CLS | < 0.1 | Cumulative Layout Shift |
| INP | < 200ms | Interaction to Next Paint |

---

## Image Optimization

### Formats

- **WebP** — Primary format (best compression)
- **AVIF** — Where supported (better compression)
- **JPEG** — Fallback for older browsers

### Sizing

- Hero images: 1600px width max
- Content images: 1200px width max
- Thumbnails: 600px width max
- Do not use 5000px images

### Loading

```html
<!-- Hero/LCP image — eager load -->
<img 
  src="hero.webp" 
  alt="Hero image"
  width="1600"
  height="900"
  fetchpriority="high"
/>

<!-- Below-the-fold — lazy load -->
<img 
  src="content.webp" 
  alt="Content image"
  width="1200"
  height="800"
  loading="lazy"
/>
```

### Rules

- Always specify `width` and `height`
- Always include `alt` text
- Use responsive images with `srcset`
- Prevent layout shift
- Use `astro:assets` where possible

---

## Font Optimization

### Strategy

1. Preload primary font
2. Use `font-display: swap`
3. Subset fonts if possible
4. Limit font weights

### Implementation

```html
<link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin />
```

```css
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter-var.woff2') format('woff2');
  font-display: swap;
  font-weight: 100 900;
}
```

---

## JavaScript Optimization

### Rules

1. Default: HTML + CSS only
2. Progressively enhance with JS
3. Use Astro's islands architecture
4. Keep JS to absolute minimum
5. No unnecessary hydration

### What Requires JS

- GSAP animations
- ScrollTrigger
- Custom cursor
- Magnetic buttons
- Page transitions
- Form interactions

### What Does NOT Require JS

- Navigation (use CSS)
- Content display
- Basic styling
- Responsive layout

---

## CSS Optimization

### Rules

1. Use TailwindCSS for utility classes
2. Remove unused CSS
3. Minimize custom CSS
4. Use CSS containment where appropriate

### CSS Containment

```css
.section {
  contain: layout style;
}
```

---

## Video Optimization

### Rules

- Use `autoplay muted loop playsinline`
- Always include `poster` image
- Use appropriate formats (MP4, WebM)
- Compress videos
- Do not load huge videos immediately
- Lazy load below-the-fold videos

```html
<video 
  autoplay 
  muted 
  loop 
  playsinline
  poster="video-poster.webp"
>
  <source src="video.mp4" type="video/mp4" />
</video>
```

---

## Loading Strategy

### Critical (Load First)

1. HTML
2. Critical CSS
3. Hero image
4. Primary font

### Secondary (Load After)

1. Below-the-fold images
2. Videos
3. Animations
4. Non-critical scripts

---

## Render-Blocking Resources

### Avoid

- Large CSS files
- Large JS files
- Synchronous scripts
- Render-blocking fonts

### Solutions

- Inline critical CSS
- Defer non-critical JS
- Preload fonts
- Use `async` or `defer`

---

## Layout Shift Prevention

### Rules

1. Always specify image dimensions
2. Reserve space for ads/embeds
3. Use CSS `aspect-ratio`
4. Avoid inserting content above existing content

```css
.image-container {
  aspect-ratio: 16 / 9;
  width: 100%;
}
```

---

## Bundle Size Targets

| Resource | Target |
|----------|--------|
| HTML | < 50KB |
| CSS | < 50KB |
| JS | < 100KB |
| Total | < 300KB |

---

## Performance Testing

### Tools

- Lighthouse
- WebPageTest
- Chrome DevTools Performance
- Core Web Vitals Chrome Extension

### Checks

- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] INP < 200ms
- [ ] Lighthouse score > 90
- [ ] No render-blocking resources
- [ ] Images properly optimized
- [ ] Fonts loaded efficiently
- [ ] No unnecessary JavaScript
- [ ] Mobile performance acceptable
- [ ] Desktop performance excellent
