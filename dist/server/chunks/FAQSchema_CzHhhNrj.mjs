import { C as createAstro, f as renderTemplate, x as unescapeHTML } from "./server_FTIkVOiY.mjs";
import { t as createComponent } from "./compiler_B7Puqq8M.mjs";
//#region src/components/seo/FAQSchema.astro
createAstro("https://astro.build");
var $$FAQSchema = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$FAQSchema;
	const { faqs } = Astro.props;
	const schema = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: faqs.map((faq) => ({
			"@type": "Question",
			name: faq.question,
			acceptedAnswer: {
				"@type": "Answer",
				text: faq.answer
			}
		}))
	};
	return renderTemplate`<script type="application/ld+json">${unescapeHTML(JSON.stringify(schema))}<\/script>`;
}, "/home/runner/work/thedigitalecho/thedigitalecho/src/components/seo/FAQSchema.astro", void 0);
//#endregion
export { $$FAQSchema as t };
