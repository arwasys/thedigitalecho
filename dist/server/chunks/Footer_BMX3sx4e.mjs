import { C as createAstro, a as renderComponent, f as renderTemplate, g as createRenderInstruction, h as addAttribute, l as renderSlot, m as renderHead, n as renderTransition, p as maybeRenderHead } from "./server_FTIkVOiY.mjs";
import { t as createComponent } from "./compiler_B7Puqq8M.mjs";
import { E as htmlToText, S as getSiteSettings, b as getSiteContact, l as getMenus, o as getHeroes, x as getSiteData, y as getServices } from "./data_DjV83Vdc.mjs";
//#region node_modules/astro/dist/runtime/server/render/script.js
async function renderScript(result, id) {
	const inlined = result.inlinedScripts.get(id);
	let content = "";
	if (inlined != null) {
		if (inlined) content = `<script type="module">${inlined}<\/script>`;
	} else {
		const resolved = await result.resolve(id);
		content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"><\/script>`;
	}
	return createRenderInstruction({
		type: "script",
		id,
		content
	});
}
//#endregion
//#region src/components/ui/Cursor.astro
var $$Cursor = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<div data-astro-transition-persist="cursor" class="cursor" aria-hidden="true" data-astro-cid-4eplhncs><div class="cursor__dot" data-astro-cid-4eplhncs></div><div class="cursor__ring" data-astro-cid-4eplhncs></div><div class="cursor__label" data-astro-cid-4eplhncs></div></div>`;
}, "/home/runner/work/thedigitalecho/thedigitalecho/src/components/ui/Cursor.astro", "self");
//#endregion
//#region src/components/ui/Lightbox.astro
var $$Lightbox = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<div id="lightbox" class="lightbox" role="dialog" aria-label="Image gallery" aria-hidden="true" data-astro-cid-y5cttm4a><div class="lightbox__backdrop" data-astro-cid-y5cttm4a></div><button class="lightbox__close" aria-label="Close gallery" data-astro-cid-y5cttm4a><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-astro-cid-y5cttm4a><line x1="18" y1="6" x2="6" y2="18" data-astro-cid-y5cttm4a></line><line x1="6" y1="6" x2="18" y2="18" data-astro-cid-y5cttm4a></line></svg></button><button class="lightbox__prev" aria-label="Previous image" data-astro-cid-y5cttm4a><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-astro-cid-y5cttm4a><polyline points="15 18 9 12 15 6" data-astro-cid-y5cttm4a></polyline></svg></button><button class="lightbox__next" aria-label="Next image" data-astro-cid-y5cttm4a><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-astro-cid-y5cttm4a><polyline points="9 6 15 12 9 18" data-astro-cid-y5cttm4a></polyline></svg></button><div class="lightbox__content" data-astro-cid-y5cttm4a><img class="lightbox__image" src="" alt="" data-astro-cid-y5cttm4a></div><div class="lightbox__counter" data-astro-cid-y5cttm4a><span class="lightbox__current" data-astro-cid-y5cttm4a>1</span> / <span class="lightbox__total" data-astro-cid-y5cttm4a>1</span></div></div>${renderScript($$result, "/home/runner/work/thedigitalecho/thedigitalecho/src/components/ui/Lightbox.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/runner/work/thedigitalecho/thedigitalecho/src/components/ui/Lightbox.astro", void 0);
//#endregion
//#region src/components/ui/BackToTop.astro
var $$BackToTop = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<button class="back-to-top" data-back-to-top type="button" aria-label="Back to top" data-astro-cid-rcz5ofpd><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-astro-cid-rcz5ofpd><line x1="12" y1="19" x2="12" y2="5" data-astro-cid-rcz5ofpd></line><polyline points="5 12 12 5 19 12" data-astro-cid-rcz5ofpd></polyline></svg></button>${renderScript($$result, "/home/runner/work/thedigitalecho/thedigitalecho/src/components/ui/BackToTop.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/runner/work/thedigitalecho/thedigitalecho/src/components/ui/BackToTop.astro", void 0);
//#endregion
//#region src/components/seo/Analytics.astro
var $$Analytics = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${""}${""}${""}<script>
  document.addEventListener('astro:page-load', function() {
    if (typeof gtag === 'function') {
      gtag('event', 'page_view', { page_path: window.location.pathname });
    }
    if (typeof fbq === 'function') {
      fbq('track', 'PageView');
    }
  });
<\/script>`;
}, "/home/runner/work/thedigitalecho/thedigitalecho/src/components/seo/Analytics.astro", void 0);
//#endregion
//#region src/lib/contact-links.ts
/**
* Shared by the footer Contact column and the fullscreen menu's "Get in touch"
* block, so both always show exactly the same links.
*
* WhatsApp: label = the ACF number when set (falls back to the word
* "WhatsApp"); href = the stored wa.me link, else `wa.me/<digits>` built from
* the number. Socials are hidden entirely when their URL is empty (free ACF:
* one URL field per platform).
*/
function getContactLinks(contact) {
	const whatsappDigits = (contact.contactWhatsappNumber || "").replace(/\D/g, "");
	const whatsappHref = contact.contactWhatsappUrl || (whatsappDigits ? `https://wa.me/${whatsappDigits}` : "");
	const socials = [
		{
			label: "Instagram",
			url: contact.contactSocialInstagram || ""
		},
		{
			label: "Facebook",
			url: contact.contactSocialFacebook || ""
		},
		{
			label: "LinkedIn",
			url: contact.contactSocialLinkedin || ""
		},
		{
			label: "YouTube",
			url: contact.contactSocialYoutube || ""
		}
	].filter((social) => Boolean(social.url));
	return {
		email: contact.contactEmail || "",
		phone: contact.contactPhone || "",
		whatsappHref,
		whatsappLabel: contact.contactWhatsappNumber || "WhatsApp",
		socials
	};
}
//#endregion
//#region src/components/layout/FullscreenNav.astro
var $$FullscreenNav = createComponent(async ($$result, $$props, $$slots) => {
	const [menus, contact, settings, services, heroes] = await Promise.all([
		getMenus(),
		getSiteContact(),
		getSiteSettings(),
		getServices(),
		getHeroes()
	]);
	const toPath = (href) => {
		if (!href) return "";
		if (href.startsWith("/")) return href;
		try {
			return new URL(href).pathname;
		} catch {
			return href;
		}
	};
	const normPath = (href) => toPath(href).replace(/\/+$/, "") || "/";
	const baseItems = menus.primary.length ? menus.primary.map((item) => ({
		label: item.label,
		href: item.url
	})) : [
		{
			label: "WORK",
			href: "/projects/"
		},
		{
			label: "SERVICES",
			href: "/services/"
		},
		{
			label: "ABOUT",
			href: "/about/"
		},
		{
			label: "THE DROP",
			href: "/blog/"
		}
	];
	const items = baseItems.some((item) => normPath(item.href) === "/contact") ? baseItems : [...baseItems, {
		label: "LET'S TALK",
		href: "/contact/"
	}];
	const contactLinks = getContactLinks(contact);
	const itemHrefByKey = /* @__PURE__ */ new Map();
	for (const item of items) {
		const key = normPath(item.href);
		if (!itemHrefByKey.has(key)) itemHrefByKey.set(key, item.href);
	}
	const panels = {};
	for (const hero of heroes) {
		const key = normPath(hero.selectPage);
		if (!itemHrefByKey.has(key)) continue;
		const headings = [...hero.title.split("\n").map((line) => line.trim()).filter(Boolean).map((text) => ({ text })), ...hero.title1.trim() ? [{
			text: hero.title1.trim(),
			accent: true
		}] : []];
		const description = htmlToText(hero.heroDescription);
		panels[key] = {
			href: itemHrefByKey.get(key),
			eyebrow: hero.smallText.trim() || void 0,
			headings,
			description: description || void 0
		};
	}
	for (const service of services) {
		const key = normPath(`/services/${service.slug}/`);
		if (panels[key] || !itemHrefByKey.has(key)) continue;
		const description = htmlToText(service.heroDescription || "");
		if (!service.heroTitle && !description) continue;
		panels[key] = {
			href: itemHrefByKey.get(key),
			eyebrow: service.title || void 0,
			headings: service.heroTitle ? [{ text: service.heroTitle }] : [],
			description: description || void 0
		};
	}
	const serviceItems = services.map((service) => ({
		label: service.title,
		href: `/services/${service.slug}/`
	}));
	if (serviceItems.length) panels["/services"] = {
		eyebrow: "Services",
		headings: [],
		items: serviceItems
	};
	return renderTemplate`${maybeRenderHead($$result)}<div id="fullscreen-nav" class="fullscreen-nav" data-open="false"><button id="nav-close" class="fullscreen-nav__close" aria-label="Close menu"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button><!-- Logo — top center --><div class="fullscreen-nav__logo">${settings.logo ? renderTemplate`<a href="/" class="fullscreen-nav__logo-link"><img${addAttribute(settings.logo, "src")}${addAttribute(settings.title, "alt")} class="h-14 md:h-20 w-auto"></a>` : renderTemplate`<a href="/" class="fullscreen-nav__logo-text">THE <span>DIGITAL</span> ECHO</a>`}</div><div class="fullscreen-nav__inner"><!-- Left: Menu Items --><nav class="fullscreen-nav__menu" aria-label="Main menu">${items.map((item, index) => {
		const key = normPath(item.href);
		return renderTemplate`<a${addAttribute(item.href, "href")}${addAttribute(["fullscreen-nav__item", key === "/contact" && "text-accent"], "class:list")}${addAttribute(panels[key] ? key : null, "data-nav-panel")}><span class="fullscreen-nav__number">${String(index + 1).padStart(2, "0")}</span><span class="fullscreen-nav__label">${item.label}</span></a>`;
	})}</nav><!-- Right: hover reveal panel --><div class="fullscreen-nav__panel">${Object.entries(panels).map(([key, panel]) => {
		const Wrapper = panel.href && !panel.items ? "a" : "div";
		const wrapperHref = panel.href && !panel.items ? panel.href : void 0;
		return renderTemplate`<div class="fullscreen-nav__panel-list"${addAttribute(key, "data-panel")}>${renderComponent($$result, "Wrapper", Wrapper, {
			"href": wrapperHref,
			"class": "fullscreen-nav__panel-body"
		}, { "default": ($$result) => renderTemplate`${panel.eyebrow && renderTemplate`<p class="fullscreen-nav__panel-eyebrow fullscreen-nav__panel-anim" style="--i: 0">${panel.eyebrow}</p>`}${panel.headings.map((heading, i) => renderTemplate`<p${addAttribute([
			"fullscreen-nav__panel-heading",
			"fullscreen-nav__panel-anim",
			heading.accent && "is-accent"
		], "class:list")}${addAttribute(`--i: ${i + 1}`, "style")}>${heading.text}</p>`)}${panel.description && renderTemplate`<p class="fullscreen-nav__panel-desc fullscreen-nav__panel-anim"${addAttribute(`--i: ${panel.headings.length + 1}`, "style")}>${panel.description}</p>`}` })}${panel.items?.map((sub, i) => renderTemplate`<a${addAttribute(sub.href, "href")} class="fullscreen-nav__panel-item fullscreen-nav__panel-anim"${addAttribute(`--i: ${i + 1}`, "style")}><span class="fullscreen-nav__panel-num">${String(i + 1).padStart(2, "0")}</span><span class="fullscreen-nav__panel-label">${sub.label}</span><span class="fullscreen-nav__panel-arrow" aria-hidden="true">→</span></a>`)}</div>`;
	})}</div></div><!-- Bottom row: Get in touch — same links as the footer Contact column --><div class="fullscreen-nav__footer">${(contactLinks.email || contactLinks.whatsappHref || contactLinks.phone || contactLinks.socials.length > 0) && renderTemplate`<div class="fullscreen-nav__foot-block"><p class="fullscreen-nav__contact-label">GET IN TOUCH</p><div class="fullscreen-nav__foot-links">${contactLinks.email && renderTemplate`<a${addAttribute(`mailto:${contactLinks.email}`, "href")} class="fullscreen-nav__contact-value">${contactLinks.email}</a>`}${contactLinks.whatsappHref && renderTemplate`<a${addAttribute(contactLinks.whatsappHref, "href")} class="fullscreen-nav__contact-value" target="_blank" rel="noopener noreferrer">${contactLinks.whatsappLabel}</a>`}${contactLinks.phone && renderTemplate`<a${addAttribute(`tel:${contactLinks.phone.replace(/\s+/g, "")}`, "href")} class="fullscreen-nav__contact-value">${contactLinks.phone}</a>`}${contactLinks.socials.map((social) => renderTemplate`<a${addAttribute(social.url, "href")} class="fullscreen-nav__contact-value" target="_blank" rel="noopener noreferrer">${social.label}</a>`)}</div></div>`}</div></div>${renderScript($$result, "/home/runner/work/thedigitalecho/thedigitalecho/src/components/layout/FullscreenNav.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/runner/work/thedigitalecho/thedigitalecho/src/components/layout/FullscreenNav.astro", void 0);
//#endregion
//#region node_modules/astro/components/ClientRouter.astro
createAstro("https://astro.build");
var $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ClientRouter;
	const { fallback = "animate" } = Astro.props;
	return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "/home/runner/work/thedigitalecho/thedigitalecho/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/runner/work/thedigitalecho/thedigitalecho/node_modules/astro/components/ClientRouter.astro", void 0);
//#endregion
//#region src/layouts/BaseLayout.astro
createAstro("https://astro.build");
var $$BaseLayout = createComponent(async ($$result, $$props, $$slots) => {
	const Astro2 = $$result.createAstro($$props, $$slots);
	Astro2.self = $$BaseLayout;
	const { title, description, ogImage = "/og-image.jpg", seo } = Astro2.props;
	const settings = await getSiteSettings();
	const siteUrl = "https://thedigitalecho.in";
	const fullTitle = seo?.title || (title === "Home" ? `${settings.title} | ${settings.description}` : `${title} | ${settings.title}`);
	const metaDescription = seo?.description || description || settings.description;
	const canonicalUrl = `${siteUrl}${Astro2.url.pathname}`;
	const toAbsoluteUrl = (value) => !value ? "" : value.startsWith("http") ? value : `${siteUrl}${value.startsWith("/") ? "" : "/"}${value}`;
	const seoOgImage = toAbsoluteUrl(seo?.ogImage || ogImage);
	const seoOgTitle = seo?.ogTitle || fullTitle;
	const seoOgDescription = seo?.ogDescription || metaDescription;
	const seoTwitterTitle = seo?.twitterTitle || fullTitle;
	const seoTwitterDescription = seo?.twitterDescription || metaDescription;
	const seoTwitterImage = toAbsoluteUrl(seo?.twitterImage || seoOgImage);
	return renderTemplate`<html lang="en" class="dark"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="description"${addAttribute(metaDescription, "content")}><link rel="canonical"${addAttribute(canonicalUrl, "href")}><!-- Open Graph --><meta property="og:title"${addAttribute(seoOgTitle, "content")}><meta property="og:description"${addAttribute(seoOgDescription, "content")}><meta property="og:image"${addAttribute(seoOgImage, "content")}><meta property="og:url"${addAttribute(canonicalUrl, "content")}><meta property="og:type" content="website"><meta property="og:site_name"${addAttribute(settings.title, "content")}><!-- Twitter/X --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"${addAttribute(seoTwitterTitle, "content")}><meta name="twitter:description"${addAttribute(seoTwitterDescription, "content")}><meta name="twitter:image"${addAttribute(seoTwitterImage, "content")}><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" media="print" onload="this.media='all'"><noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"></noscript><title>${fullTitle}</title>${renderComponent($$result, "ClientRouter", $$ClientRouter, {})}${renderComponent($$result, "Analytics", $$Analytics, {})}${renderHead($$result)}</head><body class="min-h-screen bg-bg text-text antialiased"><a href="#main-content" class="skip-link">Skip to main content</a>${renderComponent($$result, "FullscreenNav", $$FullscreenNav, {})}${renderSlot($$result, $$slots["default"])}${renderComponent($$result, "Cursor", $$Cursor, {})}${renderComponent($$result, "Lightbox", $$Lightbox, {})}${renderComponent($$result, "BackToTop", $$BackToTop, {})}${renderScript($$result, "/home/runner/work/thedigitalecho/thedigitalecho/src/layouts/BaseLayout.astro?astro&type=script&index=0&lang.ts")}${renderScript($$result, "/home/runner/work/thedigitalecho/thedigitalecho/src/layouts/BaseLayout.astro?astro&type=script&index=1&lang.ts")}</body></html>`;
}, "/home/runner/work/thedigitalecho/thedigitalecho/src/layouts/BaseLayout.astro", void 0);
//#endregion
//#region src/components/layout/Header.astro
var $$Header = createComponent(async ($$result, $$props, $$slots) => {
	const settings = await getSiteSettings();
	return renderTemplate`${maybeRenderHead($$result)}<header${addAttribute(renderTransition($$result, "cykaeyu2", "none", "header"), "data-astro-transition-scope")} id="site-header" class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"><div class="container flex items-center justify-between py-4 md:py-6"><!-- Logo --><a href="/" class="flex items-center hover:opacity-80 transition-opacity duration-300 relative z-10">${settings.logo ? renderTemplate`<img${addAttribute(settings.logo, "src")}${addAttribute(settings.title, "alt")} class="h-20 md:h-24 w-auto">` : renderTemplate`<span class="text-sm font-bold tracking-widest uppercase transition-colors duration-300">THE <span class="text-accent">DIGITAL</span> ECHO</span>`}</a><!-- Right Side: CTA + Hamburger --><div class="flex items-center gap-6 relative z-10"><a href="/contact/" class="btn btn-blue btn-sm hidden md:inline-flex" data-magnetic="0.3">LET'S TALK →</a><!-- Hamburger Menu Toggle --><button id="menu-toggle" class="flex flex-col gap-2 p-2 group" aria-label="Toggle menu" aria-expanded="false"><span class="w-8 h-0.5 bg-text transition-all duration-300 group-hover:bg-accent"></span><span class="w-8 h-0.5 bg-text transition-all duration-300 group-hover:bg-accent"></span></button></div></div></header>${renderScript($$result, "/home/runner/work/thedigitalecho/thedigitalecho/src/components/layout/Header.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/runner/work/thedigitalecho/thedigitalecho/src/components/layout/Header.astro", "self");
//#endregion
//#region src/components/layout/Footer.astro
var $$Footer = createComponent(async ($$result, $$props, $$slots) => {
	const [settings, menus, siteData] = await Promise.all([
		getSiteSettings(),
		getMenus(),
		getSiteData()
	]);
	const { footer, contact } = siteData;
	const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
	const fallbackExplore = [
		{
			label: "What We Do",
			url: "/services/"
		},
		{
			label: "Our Work",
			url: "/projects/"
		},
		{
			label: "The Crew",
			url: "/about/"
		},
		{
			label: "The Drop",
			url: "/blog/"
		},
		{
			label: "Let's Talk",
			url: "/contact/"
		}
	];
	const fallbackSocial = [
		{
			label: "Instagram",
			url: "https://instagram.com/thedigitalecho"
		},
		{
			label: "LinkedIn",
			url: "https://linkedin.com/company/thedigitalecho"
		},
		{
			label: "Facebook",
			url: "https://facebook.com/thedigitalecho"
		},
		{
			label: "WhatsApp",
			url: contact.contactWhatsappUrl || "https://wa.me/"
		},
		{
			label: "YouTube",
			url: "https://youtube.com/@thedigitalecho"
		}
	];
	const exploreLinks = menus.primary.length ? menus.primary.map((item) => ({
		label: item.label,
		url: item.url
	})) : menus.footerExplore.length ? menus.footerExplore : fallbackExplore;
	const platformLinks = menus.footerPlatforms;
	const socialLinks = menus.footerSocial.length ? menus.footerSocial : fallbackSocial;
	const { whatsappHref, whatsappLabel, socials: contactSocials } = getContactLinks(contact);
	function isExternal(url) {
		return /^https?:\/\//.test(url);
	}
	return renderTemplate`${maybeRenderHead($$result)}<footer class="border-t border-border"><div class="container py-16 md:py-24"><!-- Logo --><div class="mb-12 md:mb-16"><a href="/" class="inline-block hover:opacity-80 transition-opacity duration-300">${settings.logo ? renderTemplate`<img${addAttribute(settings.logo, "src")}${addAttribute(settings.title, "alt")} class="h-16 md:h-20 w-auto">` : renderTemplate`<span class="text-lg font-bold tracking-widest uppercase">THE DIGITAL ECHO</span>`}</a>${footer.footerBlurb && renderTemplate`<p class="mt-4 max-w-md text-sm text-muted-foreground">${footer.footerBlurb}</p>`}</div><!-- Links Grid --><div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 min-w-0 [overflow-wrap:anywhere]"><!-- Explore --><div><h3 class="text-xs font-medium tracking-wider uppercase text-accent-blue mb-6">Navigate</h3><nav class="flex flex-col gap-3">${exploreLinks.map((link) => renderTemplate`<a${addAttribute(link.url, "href")} class="text-lg hover:text-accent transition-colors duration-300">${link.label}</a>`)}</nav></div><!-- Platform -->${platformLinks.length > 0 && renderTemplate`<div><h3 class="text-xs font-medium tracking-wider uppercase text-accent-blue mb-6">Platform</h3><nav class="flex flex-col gap-3">${platformLinks.map((link) => renderTemplate`<a${addAttribute(link.url, "href")} class="text-lg hover:text-accent transition-colors duration-300"${addAttribute(isExternal(link.url) ? "_blank" : void 0, "target")}${addAttribute(isExternal(link.url) ? "noopener noreferrer" : void 0, "rel")}>${link.label}</a>`)}</nav></div>`}<!-- Social --><div><h3 class="text-xs font-medium tracking-wider uppercase text-accent-blue mb-6">Connect</h3><nav class="flex flex-col gap-3">${socialLinks.map((link) => renderTemplate`<a${addAttribute(link.url, "href")} class="text-lg hover:text-accent transition-colors duration-300"${addAttribute(isExternal(link.url) ? "_blank" : void 0, "target")}${addAttribute(isExternal(link.url) ? "noopener noreferrer" : void 0, "rel")}>${link.label}</a>`)}</nav></div><!-- Contact --><div><h3 class="text-xs font-medium tracking-wider uppercase text-accent-blue mb-6">Contact</h3><div class="flex flex-col gap-3 text-lg">${contact.contactEmail && renderTemplate`<a${addAttribute(`mailto:${contact.contactEmail}`, "href")} class="hover:text-accent transition-colors duration-300">${contact.contactEmail}</a>`}${whatsappHref && renderTemplate`<a${addAttribute(whatsappHref, "href")} class="hover:text-accent transition-colors duration-300" target="_blank" rel="noopener noreferrer">${whatsappLabel}</a>`}${contact.contactPhone && renderTemplate`<a${addAttribute(`tel:${contact.contactPhone.replace(/\s+/g, "")}`, "href")} class="hover:text-accent transition-colors duration-300">${contact.contactPhone}</a>`}</div>${contactSocials.length > 0 && renderTemplate`<div class="mt-5 flex flex-wrap gap-x-5 gap-y-2">${contactSocials.map((social) => renderTemplate`<a${addAttribute(social.url, "href")} class="text-sm tracking-wider uppercase text-muted-foreground hover:text-accent transition-colors duration-300" target="_blank" rel="noopener noreferrer">${social.label}</a>`)}</div>`}</div></div><!-- Bottom Bar --><div class="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border"><p class="text-sm text-muted-foreground">${footer.footerCopyright || `© ${currentYear} ${settings.title}. All rights reserved.`}</p><nav class="flex gap-4 text-sm text-muted-foreground"><a href="/privacy-policy/" class="hover:text-accent transition-colors duration-300">Privacy</a><a href="/terms-and-conditions/" class="hover:text-accent transition-colors duration-300">Terms</a><a href="/cookie-policy/" class="hover:text-accent transition-colors duration-300">Cookies</a></nav><p class="text-sm text-muted-foreground font-medium tracking-wider">${footer.footerTagLine || "CREATE. CONNECT. ECHO."}</p></div></div></footer>`;
}, "/home/runner/work/thedigitalecho/thedigitalecho/src/components/layout/Footer.astro", void 0);
//#endregion
export { renderScript as i, $$Header as n, $$BaseLayout as r, $$Footer as t };
