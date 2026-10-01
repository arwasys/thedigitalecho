import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { C as createAstro, a as renderComponent, f as renderTemplate, h as addAttribute, n as renderTransition, o as Fragment, p as maybeRenderHead, x as unescapeHTML } from "./server_FTIkVOiY.mjs";
import { t as createComponent } from "./compiler_B7Puqq8M.mjs";
import { a as renderScript, i as $$LineartField, n as $$Header, r as $$BaseLayout, t as $$Footer } from "./Footer_D7-y0MZk.mjs";
import { p as getPostBySlug } from "./data_B44KnQRi.mjs";
import { t as $$BreadcrumbSchema } from "./BreadcrumbSchema_BA5c6Vh2.mjs";
//#region src/components/seo/ArticleSchema.astro
createAstro("https://astro.build");
var $$ArticleSchema = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ArticleSchema;
	const { title, description, url, image = "https://thedigitalecho.in/og-image.jpg", datePublished, dateModified, author = "The Digital Echo" } = Astro.props;
	return renderTemplate`<script type="application/ld+json">${unescapeHTML(JSON.stringify({
		"@context": "https://schema.org",
		"@type": "Article",
		headline: title,
		description,
		image,
		url,
		datePublished,
		dateModified: dateModified || datePublished,
		author: {
			"@type": "Person",
			name: author
		},
		publisher: {
			"@type": "Organization",
			name: "The Digital Echo",
			logo: {
				"@type": "ImageObject",
				url: "https://thedigitalecho.in/logo.png"
			}
		}
	}))}<\/script>`;
}, "/home/runner/work/thedigitalecho/thedigitalecho/src/components/seo/ArticleSchema.astro", void 0);
//#endregion
//#region src/pages/blog/[slug].astro
var _slug__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Slug,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Slug = createComponent(async ($$result, $$props, $$slots) => {
	const Astro2 = $$result.createAstro($$props, $$slots);
	Astro2.self = $$Slug;
	const { slug } = Astro2.params;
	const post = slug ? await getPostBySlug(slug) : null;
	if (!post) {
		const notFound = await Astro2.rewrite("/404");
		return new Response(notFound.body, {
			status: 404,
			statusText: "Not Found",
			headers: notFound.headers
		});
	}
	const siteUrl = "https://thedigitalecho.in";
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": post.title,
		"description": post.excerpt,
		"seo": post.seo
	}, { "default": ($$result2) => renderTemplate`${renderComponent($$result2, "ArticleSchema", $$ArticleSchema, {
		"title": post.title,
		"description": post.excerpt,
		"url": `${siteUrl}/blog/${post.slug}/`,
		"image": post.featuredImage?.node.sourceUrl,
		"datePublished": post.publishedDate,
		"dateModified": post.modifiedDate
	})}${renderComponent($$result2, "BreadcrumbSchema", $$BreadcrumbSchema, { "items": [
		{
			name: "Home",
			url: siteUrl
		},
		{
			name: "The Drop",
			url: `${siteUrl}/blog/`
		},
		{
			name: post.title,
			url: `${siteUrl}/blog/${post.slug}/`
		}
	] })}${renderComponent($$result2, "Header", $$Header, {})}${maybeRenderHead($$result2)}<main${addAttribute(renderTransition($$result2, "vsev7mas", "", "page"), "data-astro-transition-scope")} id="main-content" data-page="post"><article><section class="pt-32 pb-16 relative overflow-hidden">${renderComponent($$result2, "LineartField", $$LineartField, {})}<div class="container relative z-10"><div class="max-w-4xl mx-auto"><div class="flex gap-2 mb-6" data-reveal="fade">${post.categories.map((cat) => renderTemplate`<span class="text-xs text-accent tracking-wider">${cat.name}</span>`)}</div><h1 class="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-none mb-8" data-text-reveal><span class="reveal-line block">${post.title}</span></h1><div class="flex items-center gap-4 text-muted-foreground" data-reveal="up" data-delay="0.2"><span>${post.author.name}</span><span>•</span><time${addAttribute(post.publishedDate, "datetime")}>${new Date(post.publishedDate).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric"
	})}</time></div></div></div></section>${post.featuredImage && renderTemplate`<section class="pb-16"><div class="container"><div class="max-w-5xl mx-auto aspect-[16/9] overflow-hidden" data-image-reveal><img${addAttribute(renderTransition($$result2, "5scyomm6", "fade", `blog-image-${post.slug}`), "data-astro-transition-scope")}${addAttribute(post.featuredImage.node.sourceUrl, "src")}${addAttribute(post.featuredImage.node.altText, "alt")}${addAttribute(post.featuredImage.node.width || 1200, "width")}${addAttribute(post.featuredImage.node.height || 630, "height")} class="w-full h-full object-cover" fetchpriority="high"></div></div></section>`}<section class="pb-24"><div class="container"><div class="max-w-3xl mx-auto prose prose-invert prose-lg">${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate`${unescapeHTML(post.content)}` })}</div></div></section></article><section class="py-24 border-t border-border relative overflow-hidden">${renderComponent($$result2, "LineartField", $$LineartField, {})}<div class="container text-center relative z-10"><h2 class="text-4xl md:text-6xl font-bold mb-8" data-text-reveal><span class="reveal-line block">WANT MORE?</span></h2><div data-reveal="up" data-delay="0.2"><a href="/blog/" class="btn btn-black">← BACK TO THE DROP</a></div></div></section></main>${renderComponent($$result2, "Footer", $$Footer, {})}${renderScript($$result2, "/home/runner/work/thedigitalecho/thedigitalecho/src/pages/blog/[slug].astro?astro&type=script&index=0&lang.ts")}` })}`;
}, "/home/runner/work/thedigitalecho/thedigitalecho/src/pages/blog/[slug].astro", "self");
var $$file = "/home/runner/work/thedigitalecho/thedigitalecho/src/pages/blog/[slug].astro";
var $$url = "/blog/[slug]/";
//#endregion
//#region \0virtual:astro:page:src/pages/blog/[slug]@_@astro
var page = () => _slug__exports;
//#endregion
export { page };
