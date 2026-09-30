import { C as createAstro, f as renderTemplate, x as unescapeHTML } from "./server_FTIkVOiY.mjs";
import { t as createComponent } from "./compiler_B7Puqq8M.mjs";
//#region src/components/seo/BreadcrumbSchema.astro
createAstro("https://astro.build");
var $$BreadcrumbSchema = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$BreadcrumbSchema;
	const { items } = Astro.props;
	const schema = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: item.name,
			item: item.url
		}))
	};
	return renderTemplate`<script type="application/ld+json">${unescapeHTML(JSON.stringify(schema))}<\/script>`;
}, "/home/runner/work/thedigitalecho/thedigitalecho/src/components/seo/BreadcrumbSchema.astro", void 0);
//#endregion
export { $$BreadcrumbSchema as t };
