import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { a as renderComponent, f as renderTemplate, h as addAttribute, n as renderTransition, p as maybeRenderHead } from "./server_FTIkVOiY.mjs";
import { t as createComponent } from "./compiler_B7Puqq8M.mjs";
import { a as renderScript, i as $$LineartField, n as $$Header, r as $$BaseLayout, t as $$Footer } from "./Footer_D7-y0MZk.mjs";
import { O as parseContentSections, b as getServices, f as getPageContent, o as getHeroByPage } from "./data_B44KnQRi.mjs";
import { t as $$InnerHero } from "./InnerHero_B-vtzaF3.mjs";
import { t as $$ServiceIcon } from "./ServiceIcon_DkepUwjB.mjs";
//#region src/pages/about.astro
var about_exports = /* @__PURE__ */ __exportAll({
	default: () => $$About,
	file: () => $$file,
	url: () => $$url
});
var $$About = createComponent(async ($$result, $$props, $$slots) => {
	const [hero, aboutPage, services] = await Promise.all([
		getHeroByPage("/about/"),
		getPageContent("/about/"),
		getServices()
	]);
	const sections = (aboutPage?.content ? parseContentSections(aboutPage.content) : null)?.sections || [];
	const capabilities = services.map((s) => ({
		slug: s.slug,
		title: s.title
	}));
	const pageCta = aboutPage?.pageCta;
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": "About",
		"seo": aboutPage?.seo
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Header", $$Header, {})}${maybeRenderHead($$result)}<main${addAttribute(renderTransition($$result, "lzfqswo4", "", "page"), "data-astro-transition-scope")} id="main-content" data-page="about">${renderComponent($$result, "InnerHero", $$InnerHero, {
		"hero": hero,
		"fallback": {
			smallText: "The Crew",
			title: "About",
			title1: "The Digital Echo",
			description: "Meet The Digital Echo, a Gen Z-led digital marketing and content production company helping Indian brands create, communicate and grow online."
		},
		"marquee": capabilities.map((capability) => capability.title),
		"indexLabel": "The Crew · 04",
		"countLabel": capabilities.length ? `${String(capabilities.length).padStart(2, "0")} Capabilities` : ""
	})}<!-- Story sections from WP -->${sections.map((section, index) => renderTemplate`<section${addAttribute(["py-24 relative overflow-hidden", index > 0 && "border-t border-border"], "class:list")}>${renderComponent($$result, "LineartField", $$LineartField, {})}<div class="container relative z-10"><div class="max-w-4xl mx-auto"><h2${addAttribute(["font-bold mb-8", index === 0 ? "text-4xl md:text-6xl" : "text-3xl md:text-5xl"], "class:list")} data-reveal="up">${section.heading}</h2>${section.paragraphs.map((paragraph, pIndex) => renderTemplate`<p class="text-lg text-muted-foreground leading-relaxed mb-6" data-reveal="up"${addAttribute(.1 * (pIndex + 1), "data-delay")}>${paragraph}</p>`)}${section.items.length > 0 && renderTemplate`<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">${section.items.map((item, iIndex) => renderTemplate`<div class="p-6 border border-border" data-reveal="up"${addAttribute(iIndex * .05, "data-delay")}><span class="text-accent">→</span><span class="ml-4 font-medium">${item.title || item.text}</span>${item.title && item.desc && renderTemplate`<p class="mt-2 ml-8 text-muted-foreground">${item.desc}</p>`}</div>`)}</div>`}</div></div></section>`)}<!-- Capabilities -->${capabilities.length > 0 && renderTemplate`<section${addAttribute(["py-24 relative overflow-hidden", sections.length > 0 && "border-t border-border"], "class:list")}>${renderComponent($$result, "LineartField", $$LineartField, {})}<div class="container relative z-10"><h2 class="text-3xl md:text-5xl font-bold mb-12" data-reveal="up">Capabilities</h2><div class="grid grid-cols-2 md:grid-cols-4 gap-4">${capabilities.map((cap, index) => renderTemplate`<a${addAttribute(`/services/${cap.slug}/`, "href")} class="p-6 border border-border hover:border-accent hover:bg-accent/5 transition-all duration-300 text-center group" data-reveal="up"${addAttribute(index * .05, "data-delay")}>${renderComponent($$result, "ServiceIcon", $$ServiceIcon, { "service": cap.slug })}<span class="block mt-4 text-sm tracking-wider group-hover:text-accent transition-colors duration-300">${cap.title}</span></a>`)}</div></div></section>`}<!-- CTA --><section${addAttribute(["py-24 relative overflow-hidden", (sections.length > 0 || capabilities.length > 0) && "border-t border-border"], "class:list")}>${renderComponent($$result, "LineartField", $$LineartField, {})}<div class="container text-center relative z-10"><h2 class="text-4xl md:text-6xl font-bold mb-8" data-text-reveal><span class="reveal-line block">${pageCta?.title1 || "WANT TO JOIN"}</span><span class="reveal-line block text-accent">${pageCta?.title2 || "THE CREW?"}</span></h2><div data-reveal="up" data-delay="0.2"><a${addAttribute(pageCta?.buttonUrl || "/contact/", "href")} class="btn btn-gold" data-magnetic="0.3">${pageCta?.buttonText || "LET'S TALK →"}</a></div></div></section></main>${renderComponent($$result, "Footer", $$Footer, {})}${renderScript($$result, "/home/runner/work/thedigitalecho/thedigitalecho/src/pages/about.astro?astro&type=script&index=0&lang.ts")}` })}`;
}, "/home/runner/work/thedigitalecho/thedigitalecho/src/pages/about.astro", "self");
var $$file = "/home/runner/work/thedigitalecho/thedigitalecho/src/pages/about.astro";
var $$url = "/about/";
//#endregion
//#region \0virtual:astro:page:src/pages/about@_@astro
var page = () => about_exports;
//#endregion
export { page };
