import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { C as createAstro, a as renderComponent, f as renderTemplate, h as addAttribute, n as renderTransition, p as maybeRenderHead } from "./server_FTIkVOiY.mjs";
import { t as createComponent } from "./compiler_B7Puqq8M.mjs";
import { i as renderScript, n as $$Header, r as $$BaseLayout, t as $$Footer } from "./Footer_Bf44ULlV.mjs";
import { _ as getProjects, a as getHeroByPage } from "./data_DjV83Vdc.mjs";
import { t as $$InnerHero } from "./InnerHero_DZpJTrOO.mjs";
//#region src/components/ui/OptimizedImage.astro
createAstro("https://astro.build");
var $$OptimizedImage = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$OptimizedImage;
	const { src, alt, width, height, loading = "lazy", fetchpriority = "auto", class: className = "", sizes = "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw", widths = [
		640,
		768,
		1024,
		1280,
		1600
	] } = Astro.props;
	const srcSet = widths.filter((w) => w <= width).map((w) => `${src}?w=${w} ${w}w`).join(", ");
	return renderTemplate`${maybeRenderHead($$result)}<img${addAttribute(src, "src")}${addAttribute(alt, "alt")}${addAttribute(width, "width")}${addAttribute(height, "height")}${addAttribute(loading, "loading")}${addAttribute(fetchpriority, "fetchpriority")} decoding="async"${addAttribute(className, "class")}${addAttribute(sizes, "sizes")}${addAttribute(srcSet, "srcset")}>`;
}, "/home/runner/work/thedigitalecho/thedigitalecho/src/components/ui/OptimizedImage.astro", void 0);
//#endregion
//#region src/pages/projects/index.astro
var projects_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const [projects, hero] = await Promise.all([getProjects(), getHeroByPage("/projects/")]);
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Projects" }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Header", $$Header, {})}${maybeRenderHead($$result)}<main${addAttribute(renderTransition($$result, "5urdjo6x", "", "page"), "data-astro-transition-scope")} id="main-content" data-page="projects">${renderComponent($$result, "InnerHero", $$InnerHero, {
		"hero": hero,
		"fallback": {
			smallText: "Our Work",
			title: "Digital",
			title1: "Marketing & Content Production Projects",
			description: "We Could Tell You We're Good.\nBut We'd Rather Show You.\nWelcome to the part where we stop talking.\nExplore projects we've worked on across content production, photography, videography, social media and digital marketing."
		},
		"marquee": projects.map((project) => project.title),
		"indexLabel": "Our Work · 02",
		"countLabel": projects.length ? `${String(projects.length).padStart(2, "0")} Projects` : ""
	})}<section class="py-24"><div class="container"><div class="grid grid-cols-1 md:grid-cols-2 gap-8">${projects.map((project, index) => renderTemplate`<a${addAttribute(`/projects/${project.slug}/`, "href")} class="group block relative overflow-hidden aspect-[16/10]" data-reveal="up"${addAttribute(index * .1, "data-delay")}>${renderComponent($$result, "OptimizedImage", $$OptimizedImage, {
		"src": project.heroImage.node.sourceUrl,
		"alt": project.heroImage.node.altText,
		"width": project.heroImage.node.width || 1600,
		"height": project.heroImage.node.height || 900,
		"class": "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105",
		"loading": "lazy",
		"data-astro-transition-scope": renderTransition($$result, "czpnffpk", "fade", `project-image-${project.slug}`)
	})}<div class="absolute inset-0 bg-bg/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8"><div><p class="text-sm text-muted-foreground mb-2">${project.clientName}</p><h2 class="text-2xl md:text-3xl font-bold">${project.title}</h2><p class="text-accent mt-4">VIEW CASE STUDY →</p></div></div></a>`)}</div></div></section></main>${renderComponent($$result, "Footer", $$Footer, {})}${renderScript($$result, "/home/runner/work/thedigitalecho/thedigitalecho/src/pages/projects/index.astro?astro&type=script&index=0&lang.ts")}` })}`;
}, "/home/runner/work/thedigitalecho/thedigitalecho/src/pages/projects/index.astro", "self");
var $$file = "/home/runner/work/thedigitalecho/thedigitalecho/src/pages/projects/index.astro";
var $$url = "/projects/";
//#endregion
//#region \0virtual:astro:page:src/pages/projects/index@_@astro
var page = () => projects_exports;
//#endregion
export { page };
