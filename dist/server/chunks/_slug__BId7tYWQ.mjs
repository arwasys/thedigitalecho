import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { C as createAstro, a as renderComponent, f as renderTemplate, h as addAttribute, n as renderTransition, p as maybeRenderHead, x as unescapeHTML } from "./server_FTIkVOiY.mjs";
import { t as createComponent } from "./compiler_B7Puqq8M.mjs";
import { a as renderScript, i as $$LineartField, n as $$Header, r as $$BaseLayout, t as $$Footer } from "./Footer_D7-y0MZk.mjs";
import { E as getWhyChooseUs, b as getServices, g as getProcessSteps, i as getFaqs, o as getHeroByPage, v as getProjects, y as getServiceBySlug } from "./data_B44KnQRi.mjs";
import { t as $$InnerHero } from "./InnerHero_B-vtzaF3.mjs";
import { t as $$BreadcrumbSchema } from "./BreadcrumbSchema_BA5c6Vh2.mjs";
import { t as $$FAQSchema } from "./FAQSchema_CzHhhNrj.mjs";
//#region src/components/sections/ServicesNav.astro
createAstro("https://astro.build");
var $$ServicesNav = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ServicesNav;
	const { services, currentSlug } = Astro.props;
	const total = String(services.length).padStart(2, "0");
	return renderTemplate`${maybeRenderHead($$result)}<section class="py-24 border-t border-border relative overflow-hidden" data-astro-cid-icw3qmju>${renderComponent($$result, "LineartField", $$LineartField, { "data-astro-cid-icw3qmju": true })}<div class="container relative z-10" data-astro-cid-icw3qmju><div class="services-nav__head" data-reveal="up" data-astro-cid-icw3qmju><h2 class="text-3xl md:text-5xl font-bold" data-astro-cid-icw3qmju>All Services</h2><span class="services-nav__count" data-astro-cid-icw3qmju>${total} services</span></div><div class="services-nav" data-astro-cid-icw3qmju>${services.map((item, index) => {
		const num = String(index + 1).padStart(2, "0");
		return item.slug === currentSlug ? renderTemplate`<span class="service-row service-row--current" aria-current="page" data-astro-cid-icw3qmju><span class="service-row__content" data-astro-cid-icw3qmju><span class="service-row__num" data-astro-cid-icw3qmju>${num}</span><span class="service-row__title" data-astro-cid-icw3qmju>${item.title}</span></span><span class="service-row__tag" data-astro-cid-icw3qmju>You're here</span></span>` : renderTemplate`<a${addAttribute(`/services/${item.slug}/`, "href")} class="service-row" data-cursor="explore" data-astro-cid-icw3qmju><span class="service-row__content" data-astro-cid-icw3qmju><span class="service-row__num" data-astro-cid-icw3qmju>${num}</span><span class="service-row__title" data-astro-cid-icw3qmju>${item.title}</span></span><svg class="service-row__arrow" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true" data-astro-cid-icw3qmju><line x1="7" y1="17" x2="17" y2="7" data-astro-cid-icw3qmju></line><polyline points="7 7 17 7 17 17" data-astro-cid-icw3qmju></polyline></svg></a>`;
	})}</div></div></section>`;
}, "/home/runner/work/thedigitalecho/thedigitalecho/src/components/sections/ServicesNav.astro", void 0);
//#endregion
//#region src/components/seo/ServiceSchema.astro
createAstro("https://astro.build");
var $$ServiceSchema = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ServiceSchema;
	const { name, description, url } = Astro.props;
	return renderTemplate`<script type="application/ld+json">${unescapeHTML(JSON.stringify({
		"@context": "https://schema.org",
		"@type": "Service",
		name,
		description,
		url,
		provider: {
			"@type": "Organization",
			name: "The Digital Echo",
			url: "https://thedigitalecho.in"
		},
		areaServed: "IN",
		serviceType: name
	}))}<\/script>`;
}, "/home/runner/work/thedigitalecho/thedigitalecho/src/components/seo/ServiceSchema.astro", void 0);
//#endregion
//#region src/pages/services/[slug].astro
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
	const service = slug ? await getServiceBySlug(slug) : null;
	if (!service) {
		const notFound = await Astro2.rewrite("/404");
		return new Response(notFound.body, {
			status: 404,
			statusText: "Not Found",
			headers: notFound.headers
		});
	}
	const [allProjects, hero, whyChooseUs, faqs, allProcessSteps, allServices] = await Promise.all([
		getProjects(),
		getHeroByPage("/services/"),
		getWhyChooseUs(),
		getFaqs(),
		getProcessSteps(),
		getServices()
	]);
	const relatedProjects = allProjects.filter((p) => p.servicesUsed.some((s) => s.toLowerCase().includes(service.title.toLowerCase().split(" ")[0]))).slice(0, 3);
	const processSteps = service.process.length ? service.process : allProcessSteps.map((s) => s.title);
	const servicePosition = allServices.findIndex((s) => s.slug === service.slug);
	const serviceIndex = String((servicePosition < 0 ? 0 : servicePosition) + 1).padStart(2, "0");
	const serviceTotal = String(allServices.length).padStart(2, "0");
	const detailHero = hero ? {
		...hero,
		title: service.title,
		title1: "",
		smallText: service.heroTitle || "",
		heroDescription: service.heroDescription || service.shortDescription || ""
	} : null;
	const siteUrl = "https://thedigitalecho.in";
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": service.title,
		"description": service.seo?.description || service.shortDescription,
		"seo": service.seo
	}, { "default": ($$result2) => renderTemplate`${renderComponent($$result2, "ServiceSchema", $$ServiceSchema, {
		"name": service.title,
		"description": service.description,
		"url": `${siteUrl}/services/${service.slug}/`
	})}${faqs.length > 0 && renderTemplate`${renderComponent($$result2, "FAQSchema", $$FAQSchema, { "faqs": faqs })}`}${renderComponent($$result2, "BreadcrumbSchema", $$BreadcrumbSchema, { "items": [
		{
			name: "Home",
			url: siteUrl
		},
		{
			name: "Services",
			url: `${siteUrl}/services/`
		},
		{
			name: service.title,
			url: `${siteUrl}/services/${service.slug}/`
		}
	] })}${renderComponent($$result2, "Header", $$Header, {})}${maybeRenderHead($$result2)}<main${addAttribute(renderTransition($$result2, "q5ym2my5", "", "page"), "data-astro-transition-scope")} id="main-content" data-page="service"><!-- Hero -->${renderComponent($$result2, "InnerHero", $$InnerHero, {
		"hero": detailHero,
		"fallback": {
			smallText: service.heroTitle || "",
			title: service.title,
			description: service.heroDescription || service.shortDescription || ""
		},
		"marquee": allServices.map((item) => ({
			label: item.title,
			href: `/services/${item.slug}/`
		})),
		"indexLabel": `Services · ${serviceIndex}`,
		"countLabel": allServices.length ? `${serviceIndex} / ${serviceTotal}` : ""
	})}<!-- About --><section class="py-24 relative overflow-hidden">${renderComponent($$result2, "LineartField", $$LineartField, {})}<div class="container relative z-10"><div class="max-w-4xl mx-auto"><h2 class="text-3xl md:text-5xl font-bold mb-8" data-reveal="up">About ${service.title}</h2><p class="text-lg text-muted-foreground leading-relaxed" data-reveal="up" data-delay="0.1">${service.description}</p></div></div></section><!-- Visual Showcase -->${service.featuredImage && renderTemplate`<section class="py-24 border-t border-border"><div class="container"><div class="aspect-[16/9] overflow-hidden" data-image-reveal><img${addAttribute(service.featuredImage.node.sourceUrl, "src")}${addAttribute(service.featuredImage.node.altText, "alt")}${addAttribute(service.featuredImage.node.width || 1600, "width")}${addAttribute(service.featuredImage.node.height || 900, "height")} class="w-full h-full object-cover" fetchpriority="high"></div></div></section>`}${service.gallery && service.gallery.length > 0 && renderTemplate`<section class="py-24 border-t border-border"><div class="container"><h2 class="text-3xl md:text-5xl font-bold mb-12" data-reveal="up">Showcase</h2><div class="grid grid-cols-1 md:grid-cols-2 gap-4">${service.gallery.map((img, index) => renderTemplate`<div class="aspect-[4/3] overflow-hidden" data-reveal="up"${addAttribute(index * .05, "data-delay")}><img${addAttribute(img.node.sourceUrl, "src")}${addAttribute(img.node.altText, "alt")}${addAttribute(img.node.width || 1200, "width")}${addAttribute(img.node.height || 630, "height")} class="w-full h-full object-cover" loading="lazy"></div>`)}</div></div></section>`}<!-- Content sections (edited in WP) -->${service.sections.length > 0 && renderTemplate`<section class="py-24 border-t border-border relative overflow-hidden">${renderComponent($$result2, "LineartField", $$LineartField, {})}<div class="container relative z-10"><div class="max-w-4xl space-y-16">${service.sections.map((section) => renderTemplate`<div><h2 class="text-3xl md:text-5xl font-bold mb-6" data-reveal="up">${section.heading}</h2>${section.paragraphs.map((paragraph) => renderTemplate`<p class="text-lg text-muted-foreground leading-relaxed mb-4" data-reveal="up">${paragraph}</p>`)}${section.items.length > 0 && renderTemplate`<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">${section.items.map((item, index) => renderTemplate`<div class="p-6 border border-border" data-reveal="up"${addAttribute(index * .05, "data-delay")}><span class="text-accent">→</span><span class="ml-4 font-medium">${item.title || item.text}</span>${item.title && item.desc && renderTemplate`<p class="mt-2 ml-8 text-muted-foreground">${item.desc}</p>`}</div>`)}</div>`}</div>`)}</div></div></section>`}<!-- Why Choose Us -->${whyChooseUs.items.length > 0 && renderTemplate`<section class="py-24 border-t border-border relative overflow-hidden">${renderComponent($$result2, "LineartField", $$LineartField, {})}<div class="container relative z-10"><div class="grid grid-cols-1 lg:grid-cols-2 gap-16"><div data-reveal="up"><h2 class="text-3xl md:text-5xl font-bold mb-8">${whyChooseUs.heading}</h2>${whyChooseUs.paragraphs.map((paragraph) => renderTemplate`<p class="text-lg text-muted-foreground leading-relaxed mb-4">${paragraph}</p>`)}</div><div class="space-y-4">${whyChooseUs.items.map((item, index) => renderTemplate`<div class="flex items-start gap-4 p-4 border border-border" data-reveal="up"${addAttribute(index * .05, "data-delay")}><span class="text-accent mt-1">✓</span><span>${item.title && renderTemplate`<strong>${item.title}</strong>`}${item.title && item.desc && " — "}${item.desc || (!item.title ? item.text : "")}</span></div>`)}</div></div></div></section>`}<!-- Process -->${processSteps.length > 0 && renderTemplate`<section class="py-24 border-t border-border relative overflow-hidden">${renderComponent($$result2, "LineartField", $$LineartField, {})}<div class="container relative z-10"><h2 class="text-3xl md:text-5xl font-bold mb-12" data-reveal="up">Process</h2><div class="grid grid-cols-1 md:grid-cols-4 gap-8">${processSteps.map((step, index) => renderTemplate`<div class="text-center" data-reveal="up"${addAttribute(index * .1, "data-delay")}><span class="text-6xl font-bold text-accent block mb-4">0${index + 1}</span><span class="text-xl">${step}</span></div>`)}</div></div></section>`}<!-- Related Projects -->${relatedProjects.length > 0 && renderTemplate`<section class="py-24 border-t border-border"><div class="container"><h2 class="text-3xl md:text-5xl font-bold mb-12" data-reveal="up">Related Work</h2><div class="grid grid-cols-1 md:grid-cols-3 gap-8">${relatedProjects.map((project, index) => renderTemplate`<a${addAttribute(`/projects/${project.slug}/`, "href")} class="group block relative overflow-hidden aspect-[16/10]" data-reveal="up"${addAttribute(index * .1, "data-delay")}><img${addAttribute(project.heroImage?.node?.sourceUrl || "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&h=450&auto=format&fit=crop", "src")}${addAttribute(project.title, "alt")} class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy"><div class="absolute inset-0 bg-bg/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6"><div><p class="text-sm text-muted-foreground mb-2">${project.clientName}</p><h3 class="text-xl font-bold">${project.title}</h3></div></div></a>`)}</div></div></section>`}<!-- FAQ -->${faqs.length > 0 && renderTemplate`<section class="py-24 border-t border-border relative overflow-hidden">${renderComponent($$result2, "LineartField", $$LineartField, {})}<div class="container relative z-10"><h2 class="text-3xl md:text-5xl font-bold mb-12" data-reveal="up">FAQ</h2><div class="max-w-3xl space-y-8">${faqs.map((item, index) => renderTemplate`<div class="border-b border-border pb-8" data-reveal="up"${addAttribute(index * .1, "data-delay")}><h3 class="text-xl font-bold mb-4">${item.question}</h3><p class="text-muted-foreground">${item.answer}</p></div>`)}</div></div></section>`}<!-- Service interlinks -->${renderComponent($$result2, "ServicesNav", $$ServicesNav, {
		"services": allServices,
		"currentSlug": service.slug
	})}<!-- CTA --><section class="py-24 border-t border-border relative overflow-hidden">${renderComponent($$result2, "LineartField", $$LineartField, {})}<div class="container text-center relative z-10"><h2 class="text-4xl md:text-6xl font-bold mb-8" data-text-reveal><span class="reveal-line block">${service.pageCta?.title1 || "READY TO"}</span><span class="reveal-line block text-accent">${service.pageCta?.title2 || "GET STARTED?"}</span></h2><div data-reveal="up" data-delay="0.2"><a${addAttribute(service.pageCta?.buttonUrl || "/contact/", "href")} class="btn btn-gold" data-magnetic="0.3">${service.pageCta?.buttonText || "LET'S TALK →"}</a></div></div></section></main>${renderComponent($$result2, "Footer", $$Footer, {})}${renderScript($$result2, "/home/runner/work/thedigitalecho/thedigitalecho/src/pages/services/[slug].astro?astro&type=script&index=0&lang.ts")}` })}`;
}, "/home/runner/work/thedigitalecho/thedigitalecho/src/pages/services/[slug].astro", "self");
var $$file = "/home/runner/work/thedigitalecho/thedigitalecho/src/pages/services/[slug].astro";
var $$url = "/services/[slug]/";
//#endregion
//#region \0virtual:astro:page:src/pages/services/[slug]@_@astro
var page = () => _slug__exports;
//#endregion
export { page };
