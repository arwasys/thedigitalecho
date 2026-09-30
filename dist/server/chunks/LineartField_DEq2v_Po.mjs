import { C as createAstro, f as renderTemplate, h as addAttribute, p as maybeRenderHead } from "./server_FTIkVOiY.mjs";
import { t as createComponent } from "./compiler_B7Puqq8M.mjs";
import { i as renderScript } from "./Footer_DFDe9_Mq.mjs";
//#region src/components/ui/LineartField.astro
createAstro("https://astro.build");
var $$LineartField = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$LineartField;
	const { class: className = "" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(`lineart-field ${className}`, "class")} data-lineart-field aria-hidden="true" data-astro-cid-mfgcvck6>${[
		"corporate-photography.webp",
		"digitaloffice.webp",
		"drone-photography..webp",
		"photgrapher.webp",
		"product-photography.webp",
		"socialmedia.webp",
		"sport-photography.webp",
		"video-editor.webp",
		"videographer.webp"
	].map((src) => renderTemplate`<img${addAttribute(`/assets/lineart/${src}`, "src")} alt="" loading="lazy" decoding="async" class="lineart-float" data-lineart-float data-astro-cid-mfgcvck6>`)}</div>${renderScript($$result, "/home/runner/work/thedigitalecho/thedigitalecho/src/components/ui/LineartField.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/runner/work/thedigitalecho/thedigitalecho/src/components/ui/LineartField.astro", void 0);
//#endregion
export { $$LineartField as t };
