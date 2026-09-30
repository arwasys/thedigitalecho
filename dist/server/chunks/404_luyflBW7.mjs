import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { a as renderComponent, f as renderTemplate, h as addAttribute, n as renderTransition, p as maybeRenderHead } from "./server_FTIkVOiY.mjs";
import { t as createComponent } from "./compiler_B7Puqq8M.mjs";
import { n as $$Header, r as $$BaseLayout, t as $$Footer } from "./Footer_Bf44ULlV.mjs";
import { t as $$LineartField } from "./LineartField_QuUUhn2W.mjs";
//#region src/pages/404.astro
var _404_exports = /* @__PURE__ */ __exportAll({
	default: () => $$404,
	file: () => $$file,
	url: () => $$url
});
var $$404 = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "404" }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Header", $$Header, {})}${maybeRenderHead($$result)}<main${addAttribute(renderTransition($$result, "uej6cr26", "", "page"), "data-astro-transition-scope")}><section class="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">${renderComponent($$result, "LineartField", $$LineartField, {})}<div class="container text-center relative z-10"><h1 class="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight leading-none mb-8">404</h1><p class="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">This page doesn't exist. Yet.</p><a href="/" class="btn btn-gold">GO HOME →</a></div></section></main>${renderComponent($$result, "Footer", $$Footer, {})}` })}`;
}, "/home/runner/work/thedigitalecho/thedigitalecho/src/pages/404.astro", "self");
var $$file = "/home/runner/work/thedigitalecho/thedigitalecho/src/pages/404.astro";
var $$url = "/404/";
//#endregion
//#region \0virtual:astro:page:src/pages/404@_@astro
var page = () => _404_exports;
//#endregion
export { page };
