import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { a as renderComponent, f as renderTemplate, h as addAttribute, n as renderTransition, p as maybeRenderHead } from "./server_FTIkVOiY.mjs";
import { t as createComponent } from "./compiler_B7Puqq8M.mjs";
import { i as renderScript, n as $$Header, r as $$BaseLayout, t as $$Footer } from "./Footer_Br2m03Kd.mjs";
import { a as getHeroByPage, p as getPosts } from "./data_B_P01u1Y.mjs";
import { t as $$InnerHero } from "./InnerHero_3FUJV5c7.mjs";
//#region src/pages/blog/index.astro
var blog_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const [{ posts }, hero] = await Promise.all([getPosts(20), getHeroByPage("/blog/")]);
	const allCategories = posts.flatMap((post) => post.categories.map((c) => c.name));
	const categories = [...new Set(allCategories)];
	const featured = posts[0];
	const remaining = posts.slice(1);
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "The Drop" }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Header", $$Header, {})}${maybeRenderHead($$result)}<main${addAttribute(renderTransition($$result, "gtb2bimz", "", "page"), "data-astro-transition-scope")} id="main-content" data-page="blog">${renderComponent($$result, "InnerHero", $$InnerHero, {
		"hero": hero,
		"fallback": {
			smallText: "The Drop",
			title: "Digital",
			title1: "Blog, Social Media Tips & Content Ideas",
			description: "The Drop.\nDigital marketing changes fast.\nWe write about what's actually happening."
		},
		"marquee": categories,
		"indexLabel": "The Drop · 05",
		"countLabel": posts.length ? `${String(posts.length).padStart(2, "0")} Articles` : ""
	})}<!-- Featured Article -->${featured && renderTemplate`<section class="py-24"><div class="container"><a${addAttribute(`/blog/${featured.slug}/`, "href")} class="group block grid grid-cols-1 lg:grid-cols-2 gap-8 items-center" data-reveal="up">${featured.featuredImage && renderTemplate`<div class="aspect-[16/9] overflow-hidden"><img${addAttribute(featured.featuredImage.node.sourceUrl, "src")}${addAttribute(featured.featuredImage.node.altText, "alt")}${addAttribute(featured.featuredImage.node.width || 1200, "width")}${addAttribute(featured.featuredImage.node.height || 630, "height")} class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"></div>`}<div><span class="text-xs text-accent tracking-wider uppercase mb-4 block">Featured</span><div class="flex gap-2 mb-4">${featured.categories.map((cat) => renderTemplate`<span class="text-xs text-accent-blue tracking-wider">${cat.name}</span>`)}</div><h2 class="text-3xl md:text-4xl font-bold mb-4 group-hover:text-accent transition-colors duration-300">${featured.title}</h2><p class="text-muted-foreground text-lg mb-6 line-clamp-3">${featured.excerpt}</p><div class="flex items-center gap-4 text-sm text-muted-foreground"><span>${featured.author.name}</span><span>•</span><time${addAttribute(featured.publishedDate, "datetime")}>${new Date(featured.publishedDate).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric"
	})}</time></div></div></a></div></section>`}<!-- Category Filter --><section${addAttribute(["py-12", featured && "border-t border-border"], "class:list")}><div class="container"><div class="flex flex-wrap gap-3 justify-center" data-reveal="up"><button class="category-filter" data-category="all" data-active="true">ALL</button>${categories.map((cat) => renderTemplate`<button class="category-filter"${addAttribute(cat.toLowerCase(), "data-category")}>${cat.toUpperCase()}</button>`)}</div></div></section><!-- Articles Grid --><section class="py-12"><div class="container"><div id="articles-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">${remaining.map((post, index) => renderTemplate`<a${addAttribute(`/blog/${post.slug}/`, "href")} class="group block article-card"${addAttribute(post.categories.map((c) => c.name.toLowerCase()).join(","), "data-categories")} data-reveal="up"${addAttribute(index * .1, "data-delay")}>${post.featuredImage && renderTemplate`<div class="aspect-[16/10] overflow-hidden mb-6"><img${addAttribute(post.featuredImage.node.sourceUrl, "src")}${addAttribute(post.featuredImage.node.altText, "alt")}${addAttribute(post.featuredImage.node.width || 1200, "width")}${addAttribute(post.featuredImage.node.height || 630, "height")} class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy"></div>`}<div class="flex gap-2 mb-4">${post.categories.map((cat) => renderTemplate`<span class="text-xs text-accent tracking-wider">${cat.name}</span>`)}</div><h2 class="text-xl font-bold mb-3 group-hover:text-accent transition-colors duration-300">${post.title}</h2><p class="text-muted-foreground line-clamp-2 text-sm">${post.excerpt}</p><p class="text-xs text-muted-foreground mt-4">${new Date(post.publishedDate).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric"
	})}</p></a>`)}</div><div id="no-results" class="hidden text-center py-16"><p class="text-muted-foreground text-lg">No articles found in this category.</p></div></div></section></main>${renderComponent($$result, "Footer", $$Footer, {})}${renderScript($$result, "/home/runner/work/thedigitalecho/thedigitalecho/src/pages/blog/index.astro?astro&type=script&index=0&lang.ts")}` })}`;
}, "/home/runner/work/thedigitalecho/thedigitalecho/src/pages/blog/index.astro", "self");
var $$file = "/home/runner/work/thedigitalecho/thedigitalecho/src/pages/blog/index.astro";
var $$url = "/blog";
//#endregion
//#region \0virtual:astro:page:src/pages/blog/index@_@astro
var page = () => blog_exports;
//#endregion
export { page };
