# THE DIGITAL ECHO — SEO Checklist

> SEO, AEO, AIO, and GEO implementation guide.

---

## SEO Technical Checklist

### Per Page

- [ ] Unique `<title>` tag
- [ ] Unique `<meta name="description">`
- [ ] Canonical URL
- [ ] One `<h1>` tag
- [ ] Logical heading hierarchy (h1 > h2 > h3...)
- [ ] Open Graph tags (og:title, og:description, og:image, og:url)
- [ ] Twitter/X card tags
- [ ] JSON-LD structured data
- [ ] Semantic HTML structure
- [ ] Image alt text
- [ ] Internal links

### Site-Wide

- [ ] Sitemap.xml generated
- [ ] Robots.txt configured
- [ ] SSL/HTTPS enabled
- [ ] Clean URLs
- [ ] No duplicate content
- [ ] No orphan pages
- [ ] Mobile responsive
- [ ] 404 page exists

---

## Open Graph Tags

```html
<meta property="og:title" content="Page Title | The Digital Echo" />
<meta property="og:description" content="Page description" />
<meta property="og:image" content="https://thedigitalecho.com/og-image.jpg" />
<meta property="og:url" content="https://thedigitalecho.com/page/" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="The Digital Echo" />
```

---

## Twitter/X Card Tags

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Page Title | The Digital Echo" />
<meta name="twitter:description" content="Page description" />
<meta name="twitter:image" content="https://thedigitalecho.com/og-image.jpg" />
```

---

## JSON-LD Structured Data

### Organization

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "The Digital Echo",
  "url": "https://thedigitalecho.com",
  "logo": "https://thedigitalecho.com/logo.png",
  "description": "Gen Z-led digital marketing and content production company",
  "sameAs": [
    "https://instagram.com/thedigitalecho",
    "https://linkedin.com/company/thedigitalecho",
    "https://facebook.com/thedigitalecho",
    "https://youtube.com/thedigitalecho"
  ]
}
```

### WebSite

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "The Digital Echo",
  "url": "https://thedigitalecho.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://thedigitalecho.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

### Service

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Service Name",
  "description": "Service description",
  "provider": {
    "@type": "Organization",
    "name": "The Digital Echo"
  },
  "areaServed": "IN",
  "serviceType": "Digital Marketing"
}
```

### Article (Blog)

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Article Title",
  "image": "https://thedigitalecho.com/article-image.jpg",
  "author": {
    "@type": "Person",
    "name": "Author Name"
  },
  "publisher": {
    "@type": "Organization",
    "name": "The Digital Echo",
    "logo": {
      "@type": "ImageObject",
      "url": "https://thedigitalecho.com/logo.png"
    }
  },
  "datePublished": "2026-01-01",
  "dateModified": "2026-01-01"
}
```

### FAQPage

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What does The Digital Echo do?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Digital Echo is a Gen Z-led digital marketing and content production company."
      }
    }
  ]
}
```

### BreadcrumbList

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://thedigitalecho.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Services",
      "item": "https://thedigitalecho.com/services"
    }
  ]
}
```

---

## AEO — Answer Engine Optimization

Place direct answers near the top of relevant pages.

### Example Questions

| Page | Question | Answer |
|------|----------|--------|
| Home | What does The Digital Echo do? | Digital marketing and content production |
| Services | What services do you offer? | Photography, videography, drone, social media, SEO |
| About | Who is The Digital Echo? | Gen Z-led creative agency in India |
| Contact | How can I contact The Digital Echo? | Fill out the form or WhatsApp us |

---

## AIO — AI Search Optimization

Clearly communicate:

- **Who** is The Digital Echo?
- **What** services do they provide?
- **Who** do they serve?
- **Where** do they operate?
- **What** makes them different?
- **What** projects have they completed?
- **How** can someone contact them?

Use clear entity relationships in content.

---

## GEO — Geographic Optimization

### Target Locations

- Mumbai
- Thane
- Navi Mumbai
- Pune
- Delhi
- Bengaluru
- Hyderabad
- Ahmedabad

### Rules

- Only create location pages if business genuinely serves that location
- Each location page must have unique, useful content
- Do not create hundreds of location pages
- Include local business schema where applicable

---

## Sitemap Structure

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://thedigitalecho.com/</loc>
    <lastmod>2026-01-01</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://thedigitalecho.com/about/</loc>
    <lastmod>2026-01-01</lastmod>
    <priority>0.8</priority>
  </url>
  <!-- ... more URLs -->
</urlset>
```

### Include

- Pages
- Services
- Projects
- Blog
- Location pages (if applicable)

### Exclude

- 404 page
- Draft content
- Private content
- Admin pages
- Preview URLs

---

## Robots.txt

```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /draft/

Sitemap: https://thedigitalecho.com/sitemap.xml
```

---

## Title Formula

```
Page Name | The Digital Echo
```

Examples:
- Home: `The Digital Echo | Digital Marketing & Content Production`
- Services: `Services | The Digital Echo`
- Service: `Photography Services | The Digital Echo`
- Project: `Project Name | The Digital Echo`
- Blog: `Article Title | The Digital Echo`

---

## Meta Description Formula

```
[Service/Topic] by The Digital Echo. [Key benefit]. [CTA].
```

Example:
- Photography services by The Digital Echo. Professional content that stops the scroll. Get a free consultation.
