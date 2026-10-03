import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { C as createAstro, a as renderComponent, f as renderTemplate, h as addAttribute, n as renderTransition, p as maybeRenderHead, x as unescapeHTML } from "./server_FTIkVOiY.mjs";
import { t as createComponent } from "./compiler_B7Puqq8M.mjs";
import { a as renderScript, i as $$LineartField, n as $$Header, r as $$BaseLayout, t as $$Footer } from "./Footer_yvp5sNH_.mjs";
import { C as getSiteSettings, T as getTestimonials, a as getFeaturedProjects, b as getServices, c as getHomeSections, g as getProcessSteps, i as getFaqs, k as mockBrandStatement, l as getIndustriesSection, m as getPosts, n as getBrandStatement, o as getHeroByPage, t as SITE_LOGO_URL, u as getMenus, w as getSiteText, x as getSiteContact } from "./data_CENCxwns.mjs";
import { t as $$ServiceIcon } from "./ServiceIcon_DkepUwjB.mjs";
import { t as $$FAQSchema } from "./FAQSchema_CzHhhNrj.mjs";
import "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { jsx } from "react/jsx-runtime";
//#region src/components/layout/PageLoader.astro
var $$PageLoader = createComponent(($$result, $$props, $$slots) => {
	const logoUrl = SITE_LOGO_URL;
	return renderTemplate`${maybeRenderHead($$result)}<div id="page-loader" class="fixed inset-0 z-[100] bg-bg flex items-center justify-center"><div class="text-center"><div class="loader-logo">${logoUrl ? renderTemplate`<img${addAttribute(logoUrl, "src")} alt="The Digital Echo" class="h-24 md:h-32 w-auto">` : renderTemplate`<span class="text-4xl md:text-6xl font-bold tracking-tight text-accent">TDE</span>`}</div><div class="loader-line h-0.5 bg-accent mt-4 origin-left scale-x-0"></div></div></div>${renderScript($$result, "/home/runner/work/thedigitalecho/thedigitalecho/src/components/layout/PageLoader.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/runner/work/thedigitalecho/thedigitalecho/src/components/layout/PageLoader.astro", void 0);
//#endregion
//#region src/components/seo/OrganizationSchema.astro
var $$OrganizationSchema = createComponent(async ($$result, $$props, $$slots) => {
	const [settings, menus] = await Promise.all([getSiteSettings(), getMenus()]);
	const siteUrl = "https://thedigitalecho.in";
	const name = settings.title || "The Digital Echo";
	const url = siteUrl;
	const logo = settings.logo || void 0;
	const description = settings.description || "Gen Z-led digital marketing and content production company creating content, campaigns and digital experiences people actually remember.";
	const sameAs = menus.footerSocial.map((link) => link.url).filter((linkUrl) => /^https?:\/\//.test(linkUrl));
	const schema = {
		"@context": "https://schema.org",
		"@type": "Organization",
		name,
		url,
		description
	};
	if (logo) schema.logo = logo;
	if (sameAs.length) schema.sameAs = sameAs;
	return renderTemplate`<script type="application/ld+json">${unescapeHTML(JSON.stringify(schema))}<\/script>`;
}, "/home/runner/work/thedigitalecho/thedigitalecho/src/components/seo/OrganizationSchema.astro", void 0);
//#endregion
//#region src/components/seo/WebSiteSchema.astro
var $$WebSiteSchema = createComponent(async ($$result, $$props, $$slots) => {
	const schema = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: (await getSiteSettings()).title || "The Digital Echo",
		url: "https://thedigitalecho.in"
	};
	return renderTemplate`<script type="application/ld+json">${unescapeHTML(JSON.stringify(schema))}<\/script>`;
}, "/home/runner/work/thedigitalecho/thedigitalecho/src/components/seo/WebSiteSchema.astro", void 0);
//#endregion
//#region src/components/seo/LocalBusinessSchema.astro
var $$LocalBusinessSchema = createComponent(async ($$result, $$props, $$slots) => {
	const [settings, contact, services, menus] = await Promise.all([
		getSiteSettings(),
		getSiteContact(),
		getServices(),
		getMenus()
	]);
	const siteUrl = "https://thedigitalecho.in";
	const name = "The Digital Echo";
	const description = settings.description || "Gen Z-led digital marketing and content production company in India";
	const url = siteUrl;
	const telephone = contact.contactPhone.trim();
	const email = contact.contactEmail.trim();
	const address = contact.contactAddress.trim() ? {
		"@type": "PostalAddress",
		streetAddress: contact.contactAddress.trim()
	} : void 0;
	const lat = Number(contact.contactGeoLat);
	const lng = Number(contact.contactGeoLng);
	const geo = contact.contactGeoLat && contact.contactGeoLng && !Number.isNaN(lat) && !Number.isNaN(lng) ? {
		"@type": "GeoCoordinates",
		latitude: lat,
		longitude: lng
	} : void 0;
	const areaServed = contact.contactAreaServed ? contact.contactAreaServed.split(",").map((area) => area.trim()).filter(Boolean).map((area) => ({
		"@type": "City",
		name: area
	})) : void 0;
	const sameAs = menus.footerSocial.map((link) => link.url).filter((linkUrl) => /^https?:\/\//.test(linkUrl));
	const schema = {
		"@context": "https://schema.org",
		"@type": "ProfessionalService",
		name,
		description,
		url,
		priceRange: "₹₹",
		hasOfferCatalog: {
			"@type": "OfferCatalog",
			name: "Digital Marketing Services",
			itemListElement: services.map((service) => ({
				"@type": "Offer",
				itemOffered: {
					"@type": "Service",
					name: service.title
				}
			}))
		}
	};
	if (telephone) schema.telephone = telephone;
	if (email) schema.email = email;
	if (address) schema.address = address;
	if (geo) schema.geo = geo;
	if (areaServed && areaServed.length) schema.areaServed = areaServed;
	if (sameAs.length) schema.sameAs = sameAs;
	return renderTemplate`<script type="application/ld+json">${unescapeHTML(JSON.stringify(schema))}<\/script>`;
}, "/home/runner/work/thedigitalecho/thedigitalecho/src/components/seo/LocalBusinessSchema.astro", void 0);
//#endregion
//#region src/components/ui/PageHero.astro
createAstro("https://astro.build");
var $$PageHero = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$PageHero;
	const { hero, overlayOpacity = .1 } = Astro.props;
	const hasVideo = hero?.videoUrl && hero.videoUrl.trim() !== "";
	const hasButton1 = hero?.button1Label && hero.button1PageLink;
	const hasButton2 = hero?.button2Label && hero.button2PageLink;
	return renderTemplate`${maybeRenderHead($$result)}<div class="video-bg">${hasVideo ? renderTemplate`<video class="video-bg__video" autoplay muted playsinline><source${addAttribute(hero.videoUrl, "src")} type="video/mp4"></video>` : renderTemplate`<div class="video-bg__video" style="background: var(--color-bg);"></div>`}<div class="video-bg__overlay"${addAttribute(`opacity: ${overlayOpacity}`, "style")}></div><div class="video-bg__content">${renderScript($$result, "/home/runner/work/thedigitalecho/thedigitalecho/src/components/ui/PageHero.astro?astro&type=script&index=0&lang.ts")}${hero?.smallText && renderTemplate`<div class="hero-badge inline-block mb-6 px-4 py-2 bg-primary text-primary-foreground text-xs tracking-widest uppercase" data-reveal="fade">${hero.smallText}</div>`}${hero?.title && renderTemplate`<h1 class="text-[clamp(2.5rem,8vw,10rem)] font-bold tracking-tight leading-[0.9] mb-8 text-text" data-text-reveal>${hero.title.split("\n").map((line) => renderTemplate`<span class="hero-title-line block">${line}</span>`)}${hero.title1 && renderTemplate`<span class="hero-title-line block text-accent">${hero.title1}</span>`}</h1>`}${hero?.heroDescription && renderTemplate`<div class="hero-description max-w-3xl mx-auto mb-12" data-reveal="up" data-delay="0.4">${unescapeHTML(hero.heroDescription)}</div>`}${(hasButton1 || hasButton2) && renderTemplate`<div class="flex flex-col sm:flex-row gap-4 justify-center" data-reveal="up" data-delay="0.6">${hasButton1 && renderTemplate`<a${addAttribute(hero.button1PageLink, "href")} class="hero-btn btn btn-gold" data-magnetic="0.3">${hero.button1Label} →</a>`}${hasButton2 && renderTemplate`<a${addAttribute(hero.button2PageLink, "href")} class="hero-btn btn btn-black" data-magnetic="0.3">${hero.button2Label} →</a>`}</div>`}</div></div>`;
}, "/home/runner/work/thedigitalecho/thedigitalecho/src/components/ui/PageHero.astro", void 0);
//#endregion
//#region src/components/sections/BrandStatement.astro
createAstro("https://astro.build");
var $$BrandStatement = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$BrandStatement;
	const { statement } = Astro.props;
	const { title, title1, title2, fullTitle, paragraphs, reels } = statement ?? mockBrandStatement;
	return renderTemplate`${maybeRenderHead($$result)}<section class="relative overflow-hidden border-b border-border py-24 md:py-36 bg-bg" data-brand-statement data-astro-cid-zswcddbr><!-- Background image (content-creation studio scene) --><img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1920&auto=format&fit=crop" alt="" class="absolute inset-0 w-full h-full object-cover opacity-20" loading="lazy" aria-hidden="true" data-bs-bg data-astro-cid-zswcddbr><div class="absolute inset-0 pointer-events-none" style="background: linear-gradient(to bottom, rgba(18,16,12,0.85) 0%, rgba(18,16,12,0.9) 50%, rgba(18,16,12,0.95) 100%);" aria-hidden="true" data-astro-cid-zswcddbr></div><div class="container relative z-10" data-astro-cid-zswcddbr><div class="grid md:grid-cols-2 gap-8 md:gap-12 items-stretch" data-astro-cid-zswcddbr><!-- Left: camera viewfinder card --><div class="relative overflow-hidden rounded-[3rem] md:rounded-[5rem] border border-border bg-[#0D0B07] text-[#F2EEE5] p-8 md:p-12" data-bs-card data-reveal="up" data-astro-cid-zswcddbr><!-- Corner brackets --><span class="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-accent rounded-tl-2xl" aria-hidden="true" data-astro-cid-zswcddbr></span><span class="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-accent rounded-tr-2xl" aria-hidden="true" data-astro-cid-zswcddbr></span><span class="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-accent rounded-bl-2xl" aria-hidden="true" data-astro-cid-zswcddbr></span><span class="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-accent rounded-br-2xl" aria-hidden="true" data-astro-cid-zswcddbr></span><!-- Top HUD --><div class="flex items-center justify-between text-[11px] tracking-[0.2em] uppercase text-white/60 mb-8 md:mb-10 px-2" data-astro-cid-zswcddbr><span class="flex items-center gap-2" data-astro-cid-zswcddbr><span class="w-2 h-2 rounded-full bg-red-500 animate-pulse" aria-hidden="true" data-astro-cid-zswcddbr></span>REC · CREATE ECHO</span><span data-astro-cid-zswcddbr>ISO 400</span></div><!-- Title --><h2 class="text-2xl md:text-[1.5rem] lg:text-[clamp(2rem,3vw,2.75rem)] font-bold tracking-tight leading-tight uppercase brand-statement" data-text-reveal${addAttribute(fullTitle, "aria-label")} data-astro-cid-zswcddbr><span class="reveal-line block" data-astro-cid-zswcddbr>${title}</span>${title1 && renderTemplate`<span class="reveal-line block text-accent-blue" data-astro-cid-zswcddbr>${title1}</span>`}${title2 && renderTemplate`<span class="reveal-line block text-accent" data-astro-cid-zswcddbr>${title2}</span>`}</h2><!-- Content --><div class="mt-8 md:mt-10 space-y-5" data-reveal="up" data-astro-cid-zswcddbr>${paragraphs.map((paragraph) => renderTemplate`<p class="text-base md:text-lg leading-relaxed text-white/70" data-astro-cid-zswcddbr>${unescapeHTML(paragraph)}</p>`)}</div><!-- About CTA --><div class="mt-8 md:mt-10" data-reveal="up" data-delay="0.15" data-astro-cid-zswcddbr><a href="/about/" class="btn btn-gold" data-magnetic="0.3" data-astro-cid-zswcddbr>About Us →</a></div><!-- Bottom HUD --><div class="flex items-center justify-between text-[11px] tracking-[0.2em] uppercase text-white/60 mt-8 md:mt-10 px-2" data-astro-cid-zswcddbr><span class="flex items-center gap-2" data-astro-cid-zswcddbr><span class="w-4 h-4 rounded-full border border-accent" aria-hidden="true" data-astro-cid-zswcddbr></span>TDE / 01</span><span data-astro-cid-zswcddbr>REC 4K · 24FPS</span></div></div><!-- Right: vertical video marquee --><div class="relative min-h-[560px] overflow-hidden" data-bs-scroller data-reveal="up" data-astro-cid-zswcddbr><div class="bs-track absolute top-0 left-0 w-full flex flex-col" data-astro-cid-zswcddbr><!-- Videos (set 1) -->${reels.map((src) => renderTemplate`<div class="bs-slide flex-shrink-0 rounded-3xl overflow-hidden border border-border mb-6" data-astro-cid-zswcddbr><video class="w-full h-full object-cover" autoplay muted loop playsinline data-astro-cid-zswcddbr><source${addAttribute(src, "src")} type="video/mp4" data-astro-cid-zswcddbr></video></div>`)}<!-- Videos (duplicate for seamless loop) -->${reels.map((src) => renderTemplate`<div class="bs-slide flex-shrink-0 rounded-3xl overflow-hidden border border-border mb-6" aria-hidden="true" data-astro-cid-zswcddbr><video class="w-full h-full object-cover" autoplay muted loop playsinline data-astro-cid-zswcddbr><source${addAttribute(src, "src")} type="video/mp4" data-astro-cid-zswcddbr></video></div>`)}</div><!-- Edge fades --><div class="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-bg/70 to-transparent pointer-events-none" aria-hidden="true" data-astro-cid-zswcddbr></div><div class="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-bg/70 to-transparent pointer-events-none" aria-hidden="true" data-astro-cid-zswcddbr></div></div></div></div></section>${renderScript($$result, "/home/runner/work/thedigitalecho/thedigitalecho/src/components/sections/BrandStatement.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/runner/work/thedigitalecho/thedigitalecho/src/components/sections/BrandStatement.astro", void 0);
//#endregion
//#region src/components/sections/ServicesList.astro
createAstro("https://astro.build");
var $$ServicesList = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ServicesList;
	const { services, title1 = "WHAT", title2 = "WE DO.", allServicesLabel = "ALL SERVICES →" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<section class="pt-24 pb-24 border-b border-border relative overflow-hidden" data-astro-cid-us7ti7v3>${renderComponent($$result, "LineartField", $$LineartField, { "data-astro-cid-us7ti7v3": true })}<div class="container relative z-10" data-astro-cid-us7ti7v3><h2 class="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight leading-none mb-16 brand-statement" data-astro-cid-us7ti7v3><span class="reveal-line block text-accent-blue" data-astro-cid-us7ti7v3>${title1}</span><span class="reveal-line block" data-astro-cid-us7ti7v3>${title2}</span></h2><div class="services-list" data-astro-cid-us7ti7v3>${services.slice(0, 6).map((service) => renderTemplate`<a${addAttribute(`/services/${service.slug}/`, "href")} class="service-item" data-cursor="explore" data-astro-cid-us7ti7v3><div class="service-item__content" data-astro-cid-us7ti7v3><div class="service-item__icon" data-astro-cid-us7ti7v3>${renderComponent($$result, "ServiceIcon", $$ServiceIcon, {
		"service": service.slug,
		"data-astro-cid-us7ti7v3": true
	})}</div><span class="service-item__title" data-astro-cid-us7ti7v3>${service.title}</span></div><svg class="service-item__arrow" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-astro-cid-us7ti7v3><line x1="7" y1="17" x2="17" y2="7" data-astro-cid-us7ti7v3></line><polyline points="7 7 17 7 17 17" data-astro-cid-us7ti7v3></polyline></svg></a>`)}</div><div class="mt-12" data-reveal="up" data-astro-cid-us7ti7v3><a href="/services/" class="btn btn-blue" data-astro-cid-us7ti7v3>${allServicesLabel}</a></div></div></section>`;
}, "/home/runner/work/thedigitalecho/thedigitalecho/src/components/sections/ServicesList.astro", void 0);
//#endregion
//#region src/components/sections/ContentProduction.astro
createAstro("https://astro.build");
var $$ContentProduction = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ContentProduction;
	const { title = "CONTENT THAT", titleAccent = "STOPS THE SCROLL.", images = [
		"https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=600&h=800&auto=format&fit=crop",
		"https://images.unsplash.com/photo-1554048612-b6a482bc67e5?q=80&w=600&h=800&auto=format&fit=crop",
		"https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&h=800&auto=format&fit=crop",
		"https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=600&h=800&auto=format&fit=crop"
	] } = Astro.props;
	const slots = [
		0,
		1,
		2,
		3
	].map((i) => images[i] || images[i % Math.max(images.length, 1)] || "");
	const alts = [
		"Content",
		"Photography",
		"Videography",
		"Brand Content"
	];
	return renderTemplate`${maybeRenderHead($$result)}<section class="py-24 border-b border-border relative overflow-hidden">${renderComponent($$result, "LineartField", $$LineartField, {})}<div class="container relative z-10"><h2 class="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight leading-none mb-16" data-text-reveal><span class="reveal-line block">${title}</span><span class="reveal-line block text-accent">${titleAccent}</span></h2><div class="grid grid-cols-2 md:grid-cols-4 gap-4" data-reveal="up">${slots.map((src, index) => src && renderTemplate`<div class="aspect-[3/4] bg-border/20 overflow-hidden"><img${addAttribute(src, "src")}${addAttribute(alts[index], "alt")} class="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy"></div>`)}</div></div></section>`;
}, "/home/runner/work/thedigitalecho/thedigitalecho/src/components/sections/ContentProduction.astro", void 0);
//#endregion
//#region src/components/sections/SocialMedia.astro
createAstro("https://astro.build");
var $$SocialMedia = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$SocialMedia;
	const { title1 = "YOUR FEED", titleAccent = "CALLED.", title2 = "IT WANTS", title2Accent = "BETTER CONTENT.", platforms = "Instagram\nFacebook\nLinkedIn\nWhatsApp\nYouTube\nGoogle" } = Astro.props;
	const platformList = platforms.split(/\n|,/).map((p) => p.trim()).filter(Boolean);
	return renderTemplate`${maybeRenderHead($$result)}<section class="py-24 border-b border-border overflow-hidden relative">${renderComponent($$result, "LineartField", $$LineartField, {})}<div class="container relative z-10"><h2 class="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight leading-none mb-4" data-text-reveal><span class="reveal-line block">${title1}</span><span class="reveal-line block text-accent-blue">${titleAccent}</span></h2><h3 class="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight leading-none mb-16 text-accent" data-text-reveal><span class="reveal-line block">${title2}</span><span class="reveal-line block">${title2Accent}</span></h3><div class="flex flex-wrap justify-center gap-8 md:gap-16" data-reveal="up">${platformList.map((platform) => renderTemplate`<span class="text-2xl md:text-4xl font-bold text-muted-foreground hover:text-accent-blue transition-colors duration-300 cursor-default">${platform}</span>`)}</div></div></section>`;
}, "/home/runner/work/thedigitalecho/thedigitalecho/src/components/sections/SocialMedia.astro", void 0);
//#endregion
//#region src/components/sections/DroneSection.astro
createAstro("https://astro.build");
var $$DroneSection = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$DroneSection;
	const { eyebrow = "AERIAL SERVICES", title1 = "CHANGE", title2 = "THE", title3 = "PERSPECTIVE.", body = "Drone photography and videography that reveals your brand from angles no one else can capture.", buttonLabel = "EXPLORE DRONE SERVICES →", buttonUrl = "/services/drone-photography/" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<section class="relative min-h-screen flex items-center justify-center overflow-hidden" data-astro-cid-sc3tal7h><!-- Aerial view video background --><video class="aerial-bg__video" autoplay muted loop playsinline preload="metadata" aria-hidden="true" tabindex="-1" data-astro-cid-sc3tal7h><source${addAttribute("https://tde.arwasys.in/wp-content/uploads/2026/10/aerial_view.mp4", "src")} type="video/mp4" data-astro-cid-sc3tal7h></video><div class="aerial-bg__overlay" aria-hidden="true" data-astro-cid-sc3tal7h></div>${renderComponent($$result, "LineartField", $$LineartField, { "data-astro-cid-sc3tal7h": true })}<!-- Content --><div class="container relative z-10 text-center py-32" data-astro-cid-sc3tal7h><p class="text-sm tracking-[0.3em] uppercase text-accent-blue mb-6" data-reveal="fade" data-astro-cid-sc3tal7h>${eyebrow}</p><h2 class="text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tight leading-[0.85]" data-text-reveal data-astro-cid-sc3tal7h><span class="reveal-line block text-accent-blue" data-astro-cid-sc3tal7h>${title1}</span><span class="reveal-line block" data-astro-cid-sc3tal7h>${title2}</span><span class="reveal-line block text-accent" data-astro-cid-sc3tal7h>${title3}</span></h2><p class="text-lg md:text-xl text-text/70 max-w-xl mx-auto mt-10 leading-relaxed" data-reveal="up" data-delay="0.3" data-astro-cid-sc3tal7h>${body}</p><div class="mt-10" data-reveal="up" data-delay="0.5" data-astro-cid-sc3tal7h><a${addAttribute(buttonUrl, "href")} class="btn btn-gold" data-magnetic="0.3" data-astro-cid-sc3tal7h>${buttonLabel}</a></div></div></section>${renderScript($$result, "/home/runner/work/thedigitalecho/thedigitalecho/src/components/sections/DroneSection.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/runner/work/thedigitalecho/thedigitalecho/src/components/sections/DroneSection.astro", void 0);
//#endregion
//#region src/components/sections/HorizontalProjects.astro
createAstro("https://astro.build");
var $$HorizontalProjects = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$HorizontalProjects;
	const { projects, title1 = "WORK", title2 = "> WORDS.", viewAllLabel = "VIEW ALL PROJECTS →" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<section class="border-b border-border overflow-hidden relative" data-horizontal>${renderComponent($$result, "LineartField", $$LineartField, {})}<div class="container pt-24 pb-8 md:pt-48 md:pb-12 relative z-10"><div class="flex items-end justify-between"><h2 class="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight leading-none" data-text-reveal><span class="reveal-line block">${title1}</span><span class="reveal-line block text-accent">${title2}</span></h2><a href="/projects/" class="text-sm tracking-wider uppercase hover:text-accent transition-colors duration-300 hidden md:block" data-reveal="fade">${viewAllLabel}</a></div></div><div class="horizontal-items flex gap-6 px-6 md:px-12 pb-24 md:pb-48">${projects.slice(0, 6).map((project) => renderTemplate`<a${addAttribute(`/projects/${project.slug}/`, "href")} class="flex-shrink-0 w-[85vw] md:w-[60vw] lg:w-[45vw] group relative overflow-hidden aspect-[16/10]" data-cursor="view" data-cursor-label="VIEW"><img${addAttribute(renderTransition($$result, "np7tbzmq", "fade", `project-image-${project.slug}`), "data-astro-transition-scope")}${addAttribute(project.heroImage?.node?.sourceUrl || "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&h=450&auto=format&fit=crop", "src")}${addAttribute(project.title, "alt")} class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy"><div class="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8"><p class="text-accent text-sm tracking-wider mb-2">${project.clientName}</p><h3 class="text-2xl md:text-4xl font-bold mb-4">${project.title}</h3><p class="text-accent text-sm tracking-wider">VIEW CASE STUDY →</p></div></a>`)}</div></section>`;
}, "/home/runner/work/thedigitalecho/thedigitalecho/src/components/sections/HorizontalProjects.astro", "self");
//#endregion
//#region src/components/sections/ProcessSection.astro
createAstro("https://astro.build");
var $$ProcessSection = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ProcessSection;
	const { steps = [
		{
			num: "01",
			title: "Discovery",
			desc: "We learn your brand, goals, and audience."
		},
		{
			num: "02",
			title: "Strategy",
			desc: "We craft a plan that actually works."
		},
		{
			num: "03",
			title: "Create",
			desc: "We produce content that stops the scroll."
		},
		{
			num: "04",
			title: "Echo",
			desc: "We amplify your brand everywhere."
		}
	], title1 = "CREATIVE", title2 = "PROCESS." } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<section class="py-24 border-b border-border relative overflow-hidden" data-astro-cid-4licqjuy>${renderComponent($$result, "LineartField", $$LineartField, { "data-astro-cid-4licqjuy": true })}<div class="container relative z-10" data-astro-cid-4licqjuy><h2 class="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight leading-none mb-16" data-text-reveal data-astro-cid-4licqjuy><span class="reveal-line block text-accent-blue" data-astro-cid-4licqjuy>${title1}</span><span class="reveal-line block" data-astro-cid-4licqjuy>${title2}</span></h2><div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8" data-astro-cid-4licqjuy>${steps.map((step, index) => renderTemplate`<div class="text-center md:text-left process-step"${addAttribute(`animation-delay: ${index * .15}s`, "style")} data-astro-cid-4licqjuy><span class="text-6xl font-bold text-accent block mb-4" data-astro-cid-4licqjuy>${step.num}</span><h3 class="text-2xl font-bold mb-2" data-astro-cid-4licqjuy>${step.title}</h3><p class="text-muted-foreground" data-astro-cid-4licqjuy>${step.desc}</p></div>`)}</div></div></section>`;
}, "/home/runner/work/thedigitalecho/thedigitalecho/src/components/sections/ProcessSection.astro", void 0);
//#endregion
//#region src/components/sections/IndustriesSection.astro
createAstro("https://astro.build");
var $$IndustriesSection = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$IndustriesSection;
	const { data, title1 = "INDUSTRIES", title2 = "WE WORK WITH." } = Astro.props;
	return renderTemplate`${data && data.industries.length > 0 && renderTemplate`${maybeRenderHead($$result)}<section class="py-24 border-b border-border relative overflow-hidden">${renderComponent($$result, "LineartField", $$LineartField, {})}<div class="container relative z-10"><h2 class="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight leading-none mb-8" data-text-reveal><span class="reveal-line block text-accent-blue">${title1}</span><span class="reveal-line block">${title2}</span></h2><p class="text-lg text-muted-foreground max-w-2xl mb-4" data-reveal="up">${data.heading}</p><p class="text-muted-foreground max-w-2xl mb-12" data-reveal="up">${data.intro}</p><ul class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">${data.industries.map((industry, index) => renderTemplate`<li class="border border-border px-4 py-3 text-sm sm:text-base hover:border-accent hover:text-accent transition-colors duration-300" data-reveal="up"${addAttribute(index * .03, "data-delay")}>${industry}</li>`)}</ul></div></section>`}`;
}, "/home/runner/work/thedigitalecho/thedigitalecho/src/components/sections/IndustriesSection.astro", void 0);
//#endregion
//#region src/lib/utils.ts
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
//#endregion
//#region src/components/ui/card.tsx
function Card({ className, size = "default", ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "card",
		"data-size": size,
		className: cn("group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl bg-card py-(--card-spacing) text-sm text-card-foreground ring-1 ring-foreground/10 [--card-spacing:--spacing(4)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl", className),
		...props
	});
}
function CardHeader({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "card-header",
		className: cn("group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)", className),
		...props
	});
}
function CardTitle({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "card-title",
		className: cn("font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm", className),
		...props
	});
}
function CardContent({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "card-content",
		className: cn("px-(--card-spacing)", className),
		...props
	});
}
//#endregion
//#region src/components/sections/Testimonials.astro
createAstro("https://astro.build");
var $$Testimonials = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Testimonials;
	const { testimonials = [], title1 = "WORD", title2 = "OF MOUTH." } = Astro.props;
	return renderTemplate`${testimonials.length > 0 && renderTemplate`${maybeRenderHead($$result)}<section class="py-24 border-b border-border relative overflow-hidden">${renderComponent($$result, "LineartField", $$LineartField, {})}<div class="container relative z-10"><h2 class="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight leading-none mb-16" data-text-reveal><span class="reveal-line block">${title1}</span><span class="reveal-line block text-accent">${title2}</span></h2><div class="grid grid-cols-1 md:grid-cols-3 gap-8">${testimonials.map((t, index) => renderTemplate`${renderComponent($$result, "Card", Card, {
		"className": "p-8 bg-card border-border",
		"data-reveal": "up",
		"data-delay": index * .1
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "CardContent", CardContent, { "className": "p-0" }, { "default": ($$result) => renderTemplate`<p class="text-lg mb-8 leading-relaxed">"${t.quote}"</p><footer class="flex items-center gap-4">${t.avatar ? renderTemplate`<img${addAttribute(t.avatar, "src")}${addAttribute(t.author, "alt")} class="h-12 w-12 rounded-full object-cover shrink-0" loading="lazy">` : renderTemplate`<div class="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold shrink-0">${t.author.split(" ").map((n) => n[0]).join("")}</div>`}<div><p class="font-bold">${t.author}</p><p class="text-sm text-muted-foreground">${t.company}${t.designation ? ` · ${t.designation}` : ""}</p></div></footer>` })}` })}`)}</div></div></section>`}`;
}, "/home/runner/work/thedigitalecho/thedigitalecho/src/components/sections/Testimonials.astro", void 0);
//#endregion
//#region src/components/sections/BlogPreview.astro
createAstro("https://astro.build");
var $$BlogPreview = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$BlogPreview;
	const { posts, title1 = "THE", title2 = "DROP.", viewAllLabel = "VIEW ALL ARTICLES →" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<section class="py-24 border-b border-border relative overflow-hidden">${renderComponent($$result, "LineartField", $$LineartField, {})}<div class="container relative z-10"><div class="flex items-end justify-between mb-16"><h2 class="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight leading-none" data-text-reveal><span class="reveal-line block">${title1}</span><span class="reveal-line block text-accent">${title2}</span></h2><a href="/blog/" class="text-sm tracking-wider uppercase hover:text-accent transition-colors duration-300 hidden md:block" data-reveal="fade">${viewAllLabel}</a></div><div class="grid grid-cols-1 md:grid-cols-3 gap-8">${posts.map((post, index) => renderTemplate`<a${addAttribute(`/blog/${post.slug}/`, "href")} data-reveal="up"${addAttribute(index * .1, "data-delay")} data-cursor="view" data-cursor-label="READ">${renderComponent($$result, "Card", Card, { "className": "group overflow-hidden bg-card border-border hover:border-accent transition-all duration-300 cursor-pointer" }, { "default": ($$result) => renderTemplate`<div class="aspect-video overflow-hidden"><img${addAttribute(renderTransition($$result, "kfpqnvc7", "fade", `blog-image-${post.slug}`), "data-astro-transition-scope")}${addAttribute(post.featuredImage?.node?.sourceUrl || "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&h=450&auto=format&fit=crop", "src")}${addAttribute(post.title, "alt")} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy"></div>${renderComponent($$result, "CardHeader", CardHeader, {}, { "default": ($$result) => renderTemplate`<div class="flex gap-2">${post.categories?.slice(0, 2).map((cat) => renderTemplate`<span class="text-xs text-accent-blue tracking-wider">${cat.name}</span>`)}</div>${renderComponent($$result, "CardTitle", CardTitle, { "className": "text-xl font-bold group-hover:text-accent transition-colors duration-300" }, { "default": ($$result) => renderTemplate`${post.title}` })}` })}` })}</a>`)}</div></div></section>`;
}, "/home/runner/work/thedigitalecho/thedigitalecho/src/components/sections/BlogPreview.astro", "self");
//#endregion
//#region src/components/ui/FaqAccordion.astro
createAstro("https://astro.build");
var $$FaqAccordion = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$FaqAccordion;
	const { faqs } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div class="max-w-3xl space-y-0 faq-container" data-reveal="up">${faqs.map((faq, index) => renderTemplate`<div class="faq-item border-b border-border"${addAttribute(index, "data-faq-index")}><button class="faq-trigger w-full text-left py-6 flex items-center justify-between gap-4 group" aria-expanded="false"${addAttribute(index, "data-faq-index")}><h3 class="text-xl font-bold group-hover:text-accent transition-colors duration-300">${faq.question}</h3><svg class="faq-icon w-5 h-5 shrink-0 text-muted-foreground transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg></button><div class="faq-content overflow-hidden" style="max-height: 0; transition: max-height 0.3s ease;"><p class="text-muted-foreground leading-relaxed pb-6">${faq.answer}</p></div></div>`)}</div>${renderScript($$result, "/home/runner/work/thedigitalecho/thedigitalecho/src/components/ui/FaqAccordion.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/runner/work/thedigitalecho/thedigitalecho/src/components/ui/FaqAccordion.astro", void 0);
//#endregion
//#region src/components/sections/FAQSection.astro
createAstro("https://astro.build");
var $$FAQSection = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$FAQSection;
	const { faqs, title = "FAQ." } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<section class="py-24 border-b border-border relative overflow-hidden">${renderComponent($$result, "LineartField", $$LineartField, {})}<div class="container relative z-10"><h2 class="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight leading-none mb-16" data-text-reveal><span class="reveal-line block">${title}</span></h2>${renderComponent($$result, "FaqAccordion", $$FaqAccordion, { "faqs": faqs })}</div></section>`;
}, "/home/runner/work/thedigitalecho/thedigitalecho/src/components/sections/FAQSection.astro", void 0);
//#endregion
//#region src/components/sections/CTASection.astro
createAstro("https://astro.build");
var $$CTASection = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$CTASection;
	const { title1 = "LET'S MAKE", titleAccent = "SOME NOISE.", body = "Got a brand that needs an echo? Let's talk about your next project.", button1Label = "LET'S TALK →", button1Url = "/contact/", button2Label = "WHATSAPP US →", button2Url = "" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<section class="py-24 md:py-48 border-b border-border relative overflow-hidden">${renderComponent($$result, "LineartField", $$LineartField, {})}<div class="container text-center relative z-10"><h2 class="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight leading-none mb-8" data-text-reveal><span class="reveal-line block text-accent-blue">${title1}</span><span class="reveal-line block text-accent">${titleAccent}</span></h2><p class="text-lg text-muted-foreground max-w-xl mx-auto mb-12" data-reveal="up" data-delay="0.2">${body}</p><div class="flex flex-col sm:flex-row gap-4 justify-center" data-reveal="up" data-delay="0.3"><a${addAttribute(button1Url, "href")} class="btn btn-gold" data-magnetic="0.3">${button1Label}</a>${button2Url && renderTemplate`<a${addAttribute(button2Url, "href")} target="_blank" rel="noopener noreferrer" class="btn btn-blue" data-magnetic="0.3">${button2Label}</a>`}</div></div></section>`;
}, "/home/runner/work/thedigitalecho/thedigitalecho/src/components/sections/CTASection.astro", void 0);
//#endregion
//#region src/pages/index.astro
var pages_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => ""
});
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const [services, featuredProjects, { posts }, hero, brandStatement, faqs, testimonials, processSteps, industries, [homeSections, siteContact, siteText]] = await Promise.all([
		getServices(),
		getFeaturedProjects(),
		getPosts(3),
		getHeroByPage("/"),
		getBrandStatement(),
		getFaqs(),
		getTestimonials(),
		getProcessSteps(),
		getIndustriesSection(),
		Promise.all([
			getHomeSections(),
			getSiteContact(),
			getSiteText()
		])
	]);
	const cpImages = [
		homeSections?.cpImage1,
		homeSections?.cpImage2,
		homeSections?.cpImage3,
		homeSections?.cpImage4
	].filter(Boolean);
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Home" }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "OrganizationSchema", $$OrganizationSchema, {})}${renderComponent($$result, "WebSiteSchema", $$WebSiteSchema, {})}${renderComponent($$result, "FAQSchema", $$FAQSchema, { "faqs": faqs })}${renderComponent($$result, "LocalBusinessSchema", $$LocalBusinessSchema, {})}${renderComponent($$result, "PageLoader", $$PageLoader, {})}${renderComponent($$result, "Header", $$Header, {})}${maybeRenderHead($$result)}<main${addAttribute(renderTransition($$result, "v5paxn7m", "", "page"), "data-astro-transition-scope")} id="main-content" data-page="home">${renderComponent($$result, "PageHero", $$PageHero, { "hero": hero })}${renderComponent($$result, "BrandStatement", $$BrandStatement, { "statement": brandStatement })}${renderComponent($$result, "ServicesList", $$ServicesList, {
		"services": services,
		"title1": siteText.titleServices1,
		"title2": siteText.titleServices2,
		"allServicesLabel": siteText.btnAllServices
	})}${renderComponent($$result, "ContentProduction", $$ContentProduction, {
		"title": homeSections?.cpTitle,
		"titleAccent": homeSections?.cpTitleAccent,
		"images": cpImages.length ? cpImages : void 0
	})}${renderComponent($$result, "SocialMedia", $$SocialMedia, {
		"title1": homeSections?.smTitle1,
		"titleAccent": homeSections?.smTitleAccent,
		"title2": homeSections?.smTitle2,
		"title2Accent": homeSections?.smTitle2Accent,
		"platforms": homeSections?.smPlatforms
	})}${renderComponent($$result, "DroneSection", $$DroneSection, {
		"eyebrow": homeSections?.droneEyebrow,
		"title1": homeSections?.droneTitle1,
		"title2": homeSections?.droneTitle2,
		"title3": homeSections?.droneTitle3,
		"body": homeSections?.droneBody,
		"buttonLabel": homeSections?.droneButtonLabel,
		"buttonUrl": homeSections?.droneButtonUrl
	})}${renderComponent($$result, "HorizontalProjects", $$HorizontalProjects, {
		"projects": featuredProjects,
		"title1": siteText.titleProjects1,
		"title2": siteText.titleProjects2,
		"viewAllLabel": siteText.btnViewAllProjects
	})}${renderComponent($$result, "ProcessSection", $$ProcessSection, {
		"steps": processSteps,
		"title1": siteText.titleProcess1,
		"title2": siteText.titleProcess2
	})}${renderComponent($$result, "IndustriesSection", $$IndustriesSection, {
		"data": industries,
		"title1": siteText.titleIndustries1,
		"title2": siteText.titleIndustries2
	})}${renderComponent($$result, "Testimonials", $$Testimonials, {
		"testimonials": testimonials,
		"title1": siteText.titleTestimonials1,
		"title2": siteText.titleTestimonials2
	})}${renderComponent($$result, "BlogPreview", $$BlogPreview, {
		"posts": posts,
		"title1": siteText.titleBlog1,
		"title2": siteText.titleBlog2,
		"viewAllLabel": siteText.btnViewAllArticles
	})}${renderComponent($$result, "FAQSection", $$FAQSection, {
		"faqs": faqs,
		"title": siteText.titleFaq
	})}${renderComponent($$result, "CTASection", $$CTASection, {
		"title1": homeSections?.ctaTitle1,
		"titleAccent": homeSections?.ctaTitleAccent,
		"body": homeSections?.ctaBody,
		"button1Label": homeSections?.ctaButton1Label,
		"button1Url": homeSections?.ctaButton1Url,
		"button2Label": homeSections?.ctaButton2Label,
		"button2Url": siteContact.contactWhatsappUrl
	})}</main>${renderComponent($$result, "Footer", $$Footer, {})}` })}${renderScript($$result, "/home/runner/work/thedigitalecho/thedigitalecho/src/pages/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/runner/work/thedigitalecho/thedigitalecho/src/pages/index.astro", "self");
var $$file = "/home/runner/work/thedigitalecho/thedigitalecho/src/pages/index.astro";
//#endregion
//#region \0virtual:astro:page:src/pages/index@_@astro
var page = () => pages_exports;
//#endregion
export { page };
