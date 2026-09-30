import { C as createAstro, f as renderTemplate, h as addAttribute, p as maybeRenderHead, x as unescapeHTML } from "./server_FTIkVOiY.mjs";
import { t as createComponent } from "./compiler_B7Puqq8M.mjs";
import { i as renderScript } from "./Footer_BMX3sx4e.mjs";
//#region src/components/ui/InnerHero.astro
createAstro("https://astro.build");
var $$InnerHero = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$InnerHero;
	const { hero, fallback = {}, marquee = [], indexLabel = "", countLabel = "", showScroll = true } = Astro.props;
	const smallText = (hero?.smallText?.trim() || fallback.smallText || "").trim();
	const titleLines = (hero?.title?.trim() || fallback.title || "The Digital Echo").split("\n").filter(Boolean);
	const title1 = (hero?.title1?.trim() || fallback.title1 || "").trim();
	const rawDescription = (hero?.heroDescription?.trim() || fallback.description || "").trim();
	const escapeHtml = (value) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
	const descriptionHtml = rawDescription ? /<[a-z][\s\S]*>/i.test(rawDescription) ? rawDescription : rawDescription.split(/\n+/).filter(Boolean).map((line) => `<div>${escapeHtml(line)}</div>`).join("") : "";
	const isLongTitle = titleLines.join(" ").length + title1.length > 42;
	const hasVideo = Boolean(hero?.videoUrl && hero.videoUrl.trim() !== "");
	const hasButton1 = Boolean(hero?.button1Label && hero.button1PageLink);
	const hasButton2 = Boolean(hero?.button2Label && hero.button2PageLink);
	const ticker = marquee.map((item) => typeof item === "string" ? {
		label: item,
		href: ""
	} : {
		label: item.label || "",
		href: item.href || ""
	}).filter((item) => item.label && item.label.trim());
	const tickerItems = ticker.length ? [...ticker, ...ticker] : [];
	return renderTemplate`${maybeRenderHead($$result)}<section class="inner-hero" data-inner-hero data-astro-cid-5sg37vnx><div class="container inner-hero__grid" data-astro-cid-5sg37vnx><div class="inner-hero__text" data-astro-cid-5sg37vnx><div class="inner-hero__eyebrow" data-astro-cid-5sg37vnx>${smallText && renderTemplate`<span class="hero-badge inner-hero__badge" data-reveal="fade" data-astro-cid-5sg37vnx>${smallText}</span>`}${indexLabel && renderTemplate`<span class="inner-hero__index" data-reveal="fade" data-delay="0.1" data-astro-cid-5sg37vnx>${indexLabel}</span>`}</div><div class="inner-hero__rule" data-reveal="fade" data-delay="0.15" aria-hidden="true" data-astro-cid-5sg37vnx></div><h1${addAttribute(["inner-hero__title", isLongTitle && "inner-hero__title--long"], "class:list")} data-text-reveal data-astro-cid-5sg37vnx>${titleLines.map((line) => renderTemplate`<span class="hero-title-line block" data-astro-cid-5sg37vnx>${line}</span>`)}${title1 && renderTemplate`<span class="hero-title-line block text-accent" data-astro-cid-5sg37vnx>${title1}</span>`}</h1>${descriptionHtml && renderTemplate`<div class="inner-hero__desc" data-reveal="up" data-delay="0.35" data-astro-cid-5sg37vnx>${unescapeHTML(descriptionHtml)}</div>`}${(hasButton1 || hasButton2) && renderTemplate`<div class="inner-hero__actions" data-reveal="up" data-delay="0.5" data-astro-cid-5sg37vnx>${hasButton1 && renderTemplate`<a${addAttribute(hero.button1PageLink, "href")} class="btn btn-gold" data-magnetic="0.3" data-astro-cid-5sg37vnx>${hero.button1Label} →</a>`}${hasButton2 && renderTemplate`<a${addAttribute(hero.button2PageLink, "href")} class="btn btn-black" data-magnetic="0.3" data-astro-cid-5sg37vnx>${hero.button2Label} →</a>`}</div>`}${showScroll && renderTemplate`<div class="inner-hero__scroll" data-reveal="fade" data-delay="0.7" aria-hidden="true" data-astro-cid-5sg37vnx><span data-astro-cid-5sg37vnx>Scroll</span><span class="inner-hero__scroll-line" data-astro-cid-5sg37vnx></span></div>`}</div><div class="inner-hero__media" data-reveal="scale" data-delay="0.35" data-astro-cid-5sg37vnx><div class="inner-hero__frame" data-astro-cid-5sg37vnx>${hasVideo ? renderTemplate`<video data-inner-hero-video autoplay muted loop playsinline preload="metadata" data-astro-cid-5sg37vnx><source${addAttribute(hero.videoUrl, "src")} type="video/mp4" data-astro-cid-5sg37vnx></video>` : renderTemplate`<div class="inner-hero__frame-still" data-astro-cid-5sg37vnx></div>`}${countLabel && renderTemplate`<span class="inner-hero__chip" data-astro-cid-5sg37vnx>${countLabel}</span>`}</div></div></div>${tickerItems.length > 0 && renderTemplate`<div class="inner-hero__marquee" data-astro-cid-5sg37vnx><div class="inner-hero__track" data-astro-cid-5sg37vnx>${tickerItems.map((item, index) => renderTemplate`<span class="inner-hero__item"${addAttribute(index >= ticker.length ? "true" : void 0, "aria-hidden")} data-astro-cid-5sg37vnx><span class="inner-hero__star" data-astro-cid-5sg37vnx>✦</span>${item.href ? renderTemplate`<a${addAttribute(item.href, "href")} class="inner-hero__link"${addAttribute(index >= ticker.length ? "-1" : void 0, "tabindex")} data-astro-cid-5sg37vnx>${item.label}</a>` : item.label}</span>`)}</div></div>`}</section>${renderScript($$result, "/home/runner/work/thedigitalecho/thedigitalecho/src/components/ui/InnerHero.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/runner/work/thedigitalecho/thedigitalecho/src/components/ui/InnerHero.astro", void 0);
//#endregion
export { $$InnerHero as t };
