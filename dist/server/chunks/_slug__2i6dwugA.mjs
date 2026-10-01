import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { C as createAstro, a as renderComponent, f as renderTemplate, h as addAttribute, n as renderTransition, p as maybeRenderHead } from "./server_FTIkVOiY.mjs";
import { t as createComponent } from "./compiler_B7Puqq8M.mjs";
import { a as renderScript, i as $$LineartField, n as $$Header, r as $$BaseLayout, t as $$Footer } from "./Footer_D7-y0MZk.mjs";
import { _ as getProjectBySlug } from "./data_B44KnQRi.mjs";
//#region src/pages/projects/[slug].astro
var _slug__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Slug,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Slug = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Slug;
	const { slug } = Astro.params;
	const project = slug ? await getProjectBySlug(slug) : null;
	if (!project) {
		const notFound = await Astro.rewrite("/404");
		return new Response(notFound.body, {
			status: 404,
			statusText: "Not Found",
			headers: notFound.headers
		});
	}
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": project.title,
		"seo": project.seo
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Header", $$Header, {})}${maybeRenderHead($$result)}<main${addAttribute(renderTransition($$result, "fwkvbled", "", "page"), "data-astro-transition-scope")} id="main-content" data-page="project"><section class="min-h-screen relative flex items-end pt-20"><img${addAttribute(renderTransition($$result, "5buac6qq", "fade", `project-image-${project.slug}`), "data-astro-transition-scope")}${addAttribute(project.heroImage.node.sourceUrl, "src")}${addAttribute(project.heroImage.node.altText, "alt")}${addAttribute(project.heroImage.node.width || 1600, "width")}${addAttribute(project.heroImage.node.height || 900, "height")} class="absolute inset-0 w-full h-full object-cover" fetchpriority="high"><div class="absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-transparent"></div><div class="container relative z-10 pb-16"><p class="text-accent text-sm tracking-wider mb-4" data-reveal="fade">${project.clientName}</p><h1 class="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight leading-none mb-8" data-text-reveal><span class="reveal-line block">${project.title}</span></h1><div class="flex flex-wrap gap-2" data-reveal="up" data-delay="0.2">${project.category.map((cat) => renderTemplate`<span class="px-4 py-2 border border-border text-sm">${cat}</span>`)}</div></div></section><section class="py-24 border-t border-border relative overflow-hidden">${renderComponent($$result, "LineartField", $$LineartField, {})}<div class="container relative z-10"><div class="grid grid-cols-1 md:grid-cols-3 gap-12"><div data-reveal="up"><h3 class="text-sm text-muted-foreground tracking-wider mb-4">CLIENT</h3><p class="text-xl">${project.clientName}</p></div><div data-reveal="up" data-delay="0.1"><h3 class="text-sm text-muted-foreground tracking-wider mb-4">SERVICES</h3><div class="flex flex-wrap gap-2">${project.servicesUsed.map((service) => renderTemplate`<span class="text-sm">${service}</span>`)}</div></div><div data-reveal="up" data-delay="0.2"><h3 class="text-sm text-muted-foreground tracking-wider mb-4">LOCATION</h3><p class="text-xl">${project.location}</p></div></div></div></section><section class="py-24 border-t border-border relative overflow-hidden">${renderComponent($$result, "LineartField", $$LineartField, {})}<div class="container relative z-10"><div class="max-w-4xl space-y-16"><div data-reveal="up"><h2 class="text-3xl md:text-5xl font-bold mb-8">Challenge</h2><p class="text-lg text-muted-foreground leading-relaxed">${project.challenge}</p></div><div data-reveal="up"><h2 class="text-3xl md:text-5xl font-bold mb-8">Strategy</h2><p class="text-lg text-muted-foreground leading-relaxed">${project.strategy}</p></div><div data-reveal="up"><h2 class="text-3xl md:text-5xl font-bold mb-8">Execution</h2><p class="text-lg text-muted-foreground leading-relaxed">${project.execution}</p></div><div data-reveal="up"><h2 class="text-3xl md:text-5xl font-bold mb-8">Result</h2><p class="text-lg text-muted-foreground leading-relaxed">${project.result}</p></div></div></div></section>${project.gallery && project.gallery.length > 0 && renderTemplate`<section class="py-24 border-t border-border"><div class="container"><h2 class="text-3xl md:text-5xl font-bold mb-12" data-reveal="up">Gallery</h2><div class="grid grid-cols-1 md:grid-cols-2 gap-4">${project.gallery.map((img, index) => renderTemplate`<div class="aspect-[4/3] overflow-hidden cursor-pointer group" data-lightbox="gallery"${addAttribute(index, "data-lightbox-index")} data-reveal="up"${addAttribute(index * .05, "data-delay")}><img${addAttribute(img.node.sourceUrl, "src")}${addAttribute(img.node.altText, "alt")}${addAttribute(img.node.width || 1200, "width")}${addAttribute(img.node.height || 630, "height")} class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy"></div>`)}</div></div></section>`}${project.testimonial && renderTemplate`<section class="py-24 border-t border-border relative overflow-hidden">${renderComponent($$result, "LineartField", $$LineartField, {})}<div class="container text-center relative z-10"><blockquote class="text-3xl md:text-5xl font-bold max-w-4xl mx-auto mb-8" data-text-reveal><span class="reveal-line block">"${project.testimonial}"</span></blockquote><p class="text-muted-foreground" data-reveal="up" data-delay="0.2">${project.testimonialAuthor}, ${project.testimonialCompany}</p></div></section>`}<section class="py-24 border-t border-border relative overflow-hidden">${renderComponent($$result, "LineartField", $$LineartField, {})}<div class="container text-center relative z-10"><h2 class="text-4xl md:text-6xl font-bold mb-8" data-text-reveal><span class="reveal-line block">GOT A PROJECT</span><span class="reveal-line block text-accent">IN MIND?</span></h2><div data-reveal="up" data-delay="0.2"><a href="/contact/" class="btn btn-gold" data-magnetic="0.3">LET'S TALK →</a></div></div></section></main>${renderComponent($$result, "Footer", $$Footer, {})}${renderScript($$result, "/home/runner/work/thedigitalecho/thedigitalecho/src/pages/projects/[slug].astro?astro&type=script&index=0&lang.ts")}` })}`;
}, "/home/runner/work/thedigitalecho/thedigitalecho/src/pages/projects/[slug].astro", "self");
var $$file = "/home/runner/work/thedigitalecho/thedigitalecho/src/pages/projects/[slug].astro";
var $$url = "/projects/[slug]/";
//#endregion
//#region \0virtual:astro:page:src/pages/projects/[slug]@_@astro
var page = () => _slug__exports;
//#endregion
export { page };
