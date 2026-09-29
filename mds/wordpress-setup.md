# THE DIGITAL ECHO — WordPress Setup Guide

> WordPress + WPGraphQL configuration for headless setup.

---

## Required Plugins

| Plugin | Purpose |
|--------|---------|
| WPGraphQL | GraphQL API |
| WPGraphiQL | Schema inspection |
| Advanced Custom Fields (ACF) | Custom fields |
| WPGraphQL for ACF | Expose ACF fields via GraphQL |
| Yoast SEO (optional) | SEO metadata |
| Yoast SEO for WPGraphQL | Expose SEO data via GraphQL |

---

## WordPress Content Model

### Pages

Create these pages in WordPress:

- Home
- About
- Services
- Contact

### Custom Post Type: Services

**Post Type:** `services`

| Field | Type | Notes |
|-------|------|-------|
| title | Text | Service name |
| slug | Text | URL-friendly name |
| shortDescription | Textarea | Brief description |
| description | WYSIWYG | Full description |
| heroTitle | Text | Hero heading |
| heroDescription | Textarea | Hero subtext |
| featuredImage | Image | Primary image |
| gallery | Gallery | Image gallery |
| icon | Image or Text | Service icon |
| serviceCategory | Select | Category grouping |
| features | Repeater | List of features |
| process | Repeater | Step-by-step process |
| faq | Repeater | Question + answer pairs |
| seoTitle | Text | SEO title |
| seoDescription | Textarea | SEO description |

**Services to create:**

1. Content Production
2. Photography
3. Videography
4. Drone Photography
5. Drone Videography
6. Social Media Management
7. Digital Marketing
8. Content Creation
9. Creative Campaigns
10. SEO
11. Local SEO
12. WhatsApp Marketing

### Custom Post Type: Projects

**Post Type:** `projects`

| Field | Type | Notes |
|-------|------|-------|
| title | Text | Project name |
| slug | Text | URL-friendly name |
| clientName | Text | Client name |
| clientLogo | Image | Client logo |
| heroImage | Image | Primary image |
| gallery | Gallery | Image gallery |
| video | Text | Video URL |
| category | Taxonomy | Project categories |
| servicesUsed | Relationship | Related services |
| challenge | WYSIWYG | Problem statement |
| strategy | WYSIWYG | Approach |
| execution | WYSIWYG | Implementation |
| result | WYSIWYG | Outcome |
| testimonial | Textarea | Client quote |
| testimonialAuthor | Text | Quote author |
| testimonialCompany | Text | Author company |
| projectDate | Date | Completion date |
| location | Text | Project location |
| featured | True/False | Featured projects |
| seoTitle | Text | SEO title |
| seoDescription | Textarea | SEO description |

**Project Categories:**

- Photography
- Videography
- Drone
- Social Media
- Digital Marketing
- Branding
- Campaigns
- Corporate
- Ecommerce

### Blog Posts

Use standard WordPress posts.

| Field | Source |
|-------|--------|
| title | WordPress |
| slug | WordPress |
| excerpt | WordPress |
| content | WordPress |
| featuredImage | WordPress |
| author | WordPress |
| categories | WordPress |
| tags | WordPress |
| publishedDate | WordPress |
| modifiedDate | WordPress |
| SEO metadata | Yoast (if installed) |

---

## GraphQL Schema Inspection

Before writing queries, inspect the actual schema:

1. Go to WordPress admin
2. Navigate to GraphQL > IDE (GraphiQL)
3. Run introspection query:

```graphql
{
  __schema {
    queryType {
      fields {
        name
        description
        args {
          name
          type {
            name
          }
        }
        type {
          name
          kind
          fields {
            name
            type {
              name
            }
          }
        }
      }
    }
  }
}
```

4. Check actual field names
5. Adapt code to match actual schema

---

## Environment Configuration

Create `.env` file:

```env
WORDPRESS_GRAPHQL_URL=https://your-wordpress-site.com/graphql
PUBLIC_SITE_URL=https://thedigitalecho.com
```

---

## Common Queries

### Get All Services

```graphql
query GetServices {
  services {
    nodes {
      id
      title
      slug
      shortDescription
      featuredImage {
        node {
          sourceUrl
          altText
          width
          height
        }
      }
    }
  }
}
```

### Get Single Service

```graphql
query GetService($slug: String!) {
  serviceBy(uri: $slug) {
    id
    title
    slug
    shortDescription
    description
    heroTitle
    heroDescription
    featuredImage {
      node {
        sourceUrl
        altText
        width
        height
      }
    }
    gallery {
      nodes {
        sourceUrl
        altText
        width
        height
      }
    }
  }
}
```

### Get All Projects

```graphql
query GetProjects {
  projects {
    nodes {
      id
      title
      slug
      clientName
      heroImage {
        node {
          sourceUrl
          altText
          width
          height
        }
      }
      category
      featured
    }
  }
}
```

### Get Single Project

```graphql
query GetProject($slug: String!) {
  projectBy(uri: $slug) {
    id
    title
    slug
    clientName
    clientLogo {
      node {
        sourceUrl
        altText
      }
    }
    heroImage {
      node {
        sourceUrl
        altText
        width
        height
      }
    }
    gallery {
      nodes {
        sourceUrl
        altText
        width
        height
      }
    }
    video
    category
    servicesUsed
    challenge
    strategy
    execution
    result
    testimonial
    testimonialAuthor
    testimonialCompany
    projectDate
    location
    featured
  }
}
```

### Get Blog Posts

```graphql
query GetPosts {
  posts {
    nodes {
      id
      title
      slug
      excerpt
      featuredImage {
        node {
          sourceUrl
          altText
          width
          height
        }
      }
      author {
        node {
          name
          avatar {
            url
          }
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
      date
      modified
    }
  }
}
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| GraphQL returns null | Check field names match schema |
| Missing fields | Verify ACF field groups are assigned to post type |
| CORS errors | Configure WordPress CORS headers |
| Auth errors | Check GraphQL endpoint URL |

---

## WordPress CORS Configuration

Add to `functions.php`:

```php
add_action('init', function() {
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
  header('Access-Control-Allow-Headers: Content-Type, Authorization');
});
```
