import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { b as getServices, m as getPosts, v as getProjects } from "./data_CENCxwns.mjs";
//#region src/pages/sitemap.xml.ts
var sitemap_xml_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
var GET = async () => {
	const siteUrl = "https://thedigitalecho.in";
	const services = await getServices();
	const projects = await getProjects();
	const { posts } = await getPosts(100);
	const staticPages = [
		{
			url: `${siteUrl}/`,
			changefreq: "daily",
			priority: 1
		},
		{
			url: `${siteUrl}/about/`,
			changefreq: "monthly",
			priority: .8
		},
		{
			url: `${siteUrl}/services/`,
			changefreq: "weekly",
			priority: .9
		},
		{
			url: `${siteUrl}/projects/`,
			changefreq: "weekly",
			priority: .9
		},
		{
			url: `${siteUrl}/pricing/`,
			changefreq: "monthly",
			priority: .8
		},
		{
			url: `${siteUrl}/blog/`,
			changefreq: "daily",
			priority: .9
		},
		{
			url: `${siteUrl}/contact/`,
			changefreq: "monthly",
			priority: .7
		},
		{
			url: `${siteUrl}/privacy-policy/`,
			changefreq: "yearly",
			priority: .3
		},
		{
			url: `${siteUrl}/terms-and-conditions/`,
			changefreq: "yearly",
			priority: .3
		},
		{
			url: `${siteUrl}/cookie-policy/`,
			changefreq: "yearly",
			priority: .3
		}
	];
	const servicePages = services.map((service) => ({
		url: `${siteUrl}/services/${service.slug}/`,
		changefreq: "monthly",
		priority: .7
	}));
	const projectPages = projects.map((project) => ({
		url: `${siteUrl}/projects/${project.slug}/`,
		changefreq: "monthly",
		priority: .7
	}));
	const postPages = posts.map((post) => ({
		url: `${siteUrl}/blog/${post.slug}/`,
		changefreq: "weekly",
		priority: .6
	}));
	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[
		...staticPages,
		...servicePages,
		...projectPages,
		...postPages
	].map((page) => `  <url>
    <loc>${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join("\n")}
</urlset>`;
	return new Response(sitemap, { headers: { "Content-Type": "application/xml" } });
};
//#endregion
//#region \0virtual:astro:page:src/pages/sitemap.xml@_@ts
var page = () => sitemap_xml_exports;
//#endregion
export { page };
