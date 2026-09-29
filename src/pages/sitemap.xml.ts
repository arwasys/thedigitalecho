import type { APIRoute } from 'astro';
import { getServices, getProjects, getPosts } from '../lib/data';

export const GET: APIRoute = async () => {
  const siteUrl = import.meta.env.PUBLIC_SITE_URL || 'https://thedigitalecho.com';

  const services = await getServices();
  const projects = await getProjects();
  const { posts } = await getPosts(100);

  const staticPages = [
    { url: siteUrl, changefreq: 'daily', priority: 1.0 },
    { url: `${siteUrl}/about/`, changefreq: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/services/`, changefreq: 'weekly', priority: 0.9 },
    { url: `${siteUrl}/projects/`, changefreq: 'weekly', priority: 0.9 },
    { url: `${siteUrl}/blog/`, changefreq: 'daily', priority: 0.9 },
    { url: `${siteUrl}/contact/`, changefreq: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/privacy-policy/`, changefreq: 'yearly', priority: 0.3 },
    { url: `${siteUrl}/terms-and-conditions/`, changefreq: 'yearly', priority: 0.3 },
    { url: `${siteUrl}/cookie-policy/`, changefreq: 'yearly', priority: 0.3 },
  ];

  const servicePages = services.map((service) => ({
    url: `${siteUrl}/services/${service.slug}/`,
    changefreq: 'monthly',
    priority: 0.7,
  }));

  const projectPages = projects.map((project) => ({
    url: `${siteUrl}/projects/${project.slug}/`,
    changefreq: 'monthly',
    priority: 0.7,
  }));

  const postPages = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}/`,
    changefreq: 'weekly',
    priority: 0.6,
  }));

  const allPages = [...staticPages, ...servicePages, ...projectPages, ...postPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
