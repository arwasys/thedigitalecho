import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { a as renderComponent, f as renderTemplate, h as addAttribute, n as renderTransition, p as maybeRenderHead } from "./server_FTIkVOiY.mjs";
import { t as createComponent } from "./compiler_B7Puqq8M.mjs";
import { i as renderScript, n as $$Header, r as $$BaseLayout, t as $$Footer } from "./Footer_BMX3sx4e.mjs";
import { a as getHeroByPage, m as getPricingPlans } from "./data_DjV83Vdc.mjs";
import { t as $$LineartField } from "./LineartField_BfVyaSoD.mjs";
import { t as $$InnerHero } from "./InnerHero_B_NRYTSE.mjs";
//#region src/pages/pricing.astro
var pricing_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Pricing,
	file: () => $$file,
	url: () => $$url
});
var $$Pricing = createComponent(async ($$result, $$props, $$slots) => {
	const [hero, plans] = await Promise.all([getHeroByPage("/pricing/"), getPricingPlans()]);
	const countLabel = plans.length ? `${String(plans.length).padStart(2, "0")} Plans` : "";
	const cards = plans.map((plan) => {
		const lines = plan.summary.split("\n").map((line) => line.trim()).filter(Boolean);
		const split = lines.length > 1;
		return {
			...plan,
			tagline: split ? lines[0] : "",
			body: (split ? lines.slice(1) : lines).join(" ")
		};
	});
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Pricing" }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Header", $$Header, {})}${maybeRenderHead($$result)}<main${addAttribute(renderTransition($$result, "jexmn6gm", "", "page"), "data-astro-transition-scope")} id="main-content" data-page="pricing">${renderComponent($$result, "InnerHero", $$InnerHero, {
		"hero": hero,
		"fallback": {
			smallText: "Plans",
			title: "Pricing",
			description: "Three monthly plans — TDE Starter, TDE Growth and TDE Premium — for consistent content, shoots and steady growth.\nCompare what's included in each plan and its monthly price below."
		},
		"marquee": plans.map((plan) => plan.title),
		"indexLabel": "Pricing · 03",
		"countLabel": countLabel,
		"showScroll": false
	})}<section class="py-24 relative overflow-hidden">${renderComponent($$result, "LineartField", $$LineartField, {})}<div class="container relative z-10">${plans.length > 0 ? renderTemplate`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">${cards.map((plan, index) => renderTemplate`<article${addAttribute(["relative flex flex-col p-8 border transition-colors duration-300", plan.highlighted ? "border-accent bg-accent/[0.04]" : "border-border hover:border-accent/60"], "class:list")} data-reveal="up"${addAttribute(index * .1, "data-delay")}>${plan.badge && renderTemplate`<span class="absolute -top-3 left-8 inline-block bg-accent text-bg px-3 py-1 text-[11px] font-bold uppercase tracking-widest">${plan.badge}</span>`}<h2 class="text-2xl font-bold">${plan.title}</h2>${plan.tagline && renderTemplate`<p class="mt-3 text-[11px] font-bold uppercase tracking-[0.18em] text-accent">${plan.tagline}</p>`}${plan.body && renderTemplate`<p class="mt-3 text-sm leading-relaxed text-muted-foreground">${plan.body}</p>`}<div class="mt-6 flex items-end gap-2"><span${addAttribute(["text-4xl font-bold leading-none", plan.highlighted && "text-accent"], "class:list")}>${plan.price || "Custom"}</span>${plan.period && renderTemplate`<span class="pb-1 text-sm text-muted-foreground">${plan.period}</span>`}</div>${plan.features.length > 0 && renderTemplate`<ul class="mt-8 flex-1 space-y-3">${plan.features.map((feature) => renderTemplate`<li class="flex items-start gap-3 text-sm"><span class="mt-0.5 text-accent" aria-hidden="true">✓</span><span>${feature}</span></li>`)}</ul>`}<div class="mt-8"><a${addAttribute(plan.ctaUrl, "href")}${addAttribute(["btn w-full", plan.highlighted ? "btn-gold" : "btn-black"], "class:list")} data-magnetic="0.3">${plan.ctaLabel || "Let's Talk"} →</a></div></article>`)}</div>` : renderTemplate`<div class="max-w-2xl mx-auto text-center"><h2 class="mb-6 text-4xl font-bold md:text-5xl" data-text-reveal><span class="reveal-line block">Your Next Big Idea</span><span class="reveal-line block text-accent">Starts Here.</span></h2><p class="mx-auto mb-8 max-w-xl text-lg text-muted-foreground" data-reveal="up" data-delay="0.2">Have a project in mind? Don't overthink it. Tell us what you're trying to create.</p><div data-reveal="up" data-delay="0.3"><a href="/contact/" class="btn btn-gold" data-magnetic="0.3">Start A Conversation →</a></div></div>`}</div></section></main>${renderComponent($$result, "Footer", $$Footer, {})}${renderScript($$result, "/home/runner/work/thedigitalecho/thedigitalecho/src/pages/pricing.astro?astro&type=script&index=0&lang.ts")}` })}`;
}, "/home/runner/work/thedigitalecho/thedigitalecho/src/pages/pricing.astro", "self");
var $$file = "/home/runner/work/thedigitalecho/thedigitalecho/src/pages/pricing.astro";
var $$url = "/pricing/";
//#endregion
//#region \0virtual:astro:page:src/pages/pricing@_@astro
var page = () => pricing_exports;
//#endregion
export { page };
