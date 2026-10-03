import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { a as renderComponent, f as renderTemplate, h as addAttribute, n as renderTransition, p as maybeRenderHead } from "./server_FTIkVOiY.mjs";
import { t as createComponent } from "./compiler_B7Puqq8M.mjs";
import { a as renderScript, i as $$LineartField, n as $$Header, r as $$BaseLayout, t as $$Footer } from "./Footer_yvp5sNH_.mjs";
import { b as getServices, o as getHeroByPage } from "./data_CENCxwns.mjs";
import { t as $$InnerHero } from "./InnerHero_BSu_j1SM.mjs";
//#region src/pages/services/index.astro
var services_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const [services, hero] = await Promise.all([getServices(), getHeroByPage("/services/")]);
	const countLabel = services.length ? `${String(services.length).padStart(2, "0")} Services` : "";
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Services" }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Header", $$Header, {})}${maybeRenderHead($$result)}<main${addAttribute(renderTransition($$result, "dhbik444", "", "page"), "data-astro-transition-scope")} id="main-content" data-page="services">${renderComponent($$result, "InnerHero", $$InnerHero, {
		"hero": hero,
		"fallback": {
			smallText: "Content That Stops the Scroll.",
			title: "Everything Your",
			title1: "Brand Needs to Be Seen",
			description: "Explore The Digital Echo's digital marketing services including content production, photography, videography, drone shoots, social media management, creative campaigns and more."
		},
		"marquee": services.map((service) => ({
			label: service.title,
			href: `/services/${service.slug}/`
		})),
		"indexLabel": "Services · 01",
		"countLabel": countLabel
	})}<section class="py-24 relative overflow-hidden">${renderComponent($$result, "LineartField", $$LineartField, {})}<div class="container relative z-10"><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">${services.map((service, index) => renderTemplate`<a${addAttribute(`/services/${service.slug}/`, "href")} class="group block p-8 border border-border hover:border-accent transition-colors duration-300" data-reveal="up"${addAttribute(index * .1, "data-delay")}><span class="mb-4 block h-10 w-10">${service.icon && /^https?:\/\//.test(service.icon) ? renderTemplate`<img${addAttribute(service.icon, "src")} alt="" class="h-10 w-10 object-contain" loading="lazy">` : renderTemplate`<span class="text-4xl leading-none">${service.icon}</span>`}</span><h2 class="text-2xl font-bold mb-4 group-hover:text-accent transition-colors duration-300">${service.title}</h2><p class="text-muted-foreground">${service.shortDescription}</p></a>`)}</div></div></section></main>${renderComponent($$result, "Footer", $$Footer, {})}${renderScript($$result, "/home/runner/work/thedigitalecho/thedigitalecho/src/pages/services/index.astro?astro&type=script&index=0&lang.ts")}` })}`;
}, "/home/runner/work/thedigitalecho/thedigitalecho/src/pages/services/index.astro", "self");
var $$file = "/home/runner/work/thedigitalecho/thedigitalecho/src/pages/services/index.astro";
var $$url = "/services/";
//#endregion
//#region \0virtual:astro:page:src/pages/services/index@_@astro
var page = () => services_exports;
//#endregion
export { page };
