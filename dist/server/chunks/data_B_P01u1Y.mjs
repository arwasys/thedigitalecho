//#region src/graphql/client.ts
var GRAPHQL_URL = "https://tde.arwasys.in/graphql";
var CACHE_TTL_MS = 6e4;
var FETCH_TIMEOUT_MS = 1e4;
var cache = /* @__PURE__ */ new Map();
var inflight = /* @__PURE__ */ new Map();
var GraphQLClient = class {
	endpoint;
	constructor(endpoint) {
		this.endpoint = endpoint;
	}
	async query(query, variables) {
		const key = JSON.stringify([query, variables ?? null]);
		const hit = cache.get(key);
		if (hit && hit.expires > Date.now()) return hit.value;
		const pending = inflight.get(key);
		if (pending) return pending;
		const request = (async () => {
			const controller = new AbortController();
			const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
			try {
				const response = await fetch(this.endpoint, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						query,
						variables
					}),
					signal: controller.signal
				});
				if (!response.ok) throw new Error(`GraphQL request failed: ${response.statusText}`);
				const json = await response.json();
				if (json.errors) throw new Error(json.errors[0].message);
				cache.set(key, {
					value: json.data,
					expires: Date.now() + CACHE_TTL_MS
				});
				return json.data;
			} catch (error) {
				console.error("GraphQL Error:", error);
				throw error;
			} finally {
				clearTimeout(timer);
				inflight.delete(key);
			}
		})();
		inflight.set(key, request);
		return request;
	}
};
var graphqlClient = new GraphQLClient(GRAPHQL_URL);
//#endregion
//#region src/graphql/fragments/index.ts
var imageFragment = `
  fragment ImageFragment on MediaItem {
    sourceUrl
    altText
    mediaDetails {
      width
      height
      sizes {
        sourceUrl
        width
        height
      }
    }
  }
`;
var seoFragment = `
  fragment SeoFragment on TdeSeo {
    title
    description
    canonical
    ogTitle
    ogDescription
    ogImage
    twitterTitle
    twitterDescription
    twitterImage
  }
`;
var serviceFragment = `
  fragment ServiceFragment on Service {
    id
    databaseId
    title
    slug
    uri
    menuOrder
    content
    excerpt
    featuredImage {
      node {
        ...ImageFragment
      }
    }
    serviceGallery {
      galleryUrl1
      galleryUrl2
      galleryUrl3
      galleryUrl4
    }
    serviceMenuLinks {
      serviceMenuIcon
      servicePageUrl
      serviceShortDescription
      serviceShowInMenu
    }
    servicePage {
      ctaLabel
      ctaUrl
      heroDescription
      heroTitle
      seoTitle
      seoDescription
    }
    serviceCategories {
      nodes {
        name
        slug
      }
    }
    pageCta {
      pageCtaTitle1
      pageCtaTitle2
      pageCtaButtonText
      pageCtaButtonUrl
    }
    seo {
      ...SeoFragment
    }
  }
`;
var projectFragment = `
  fragment ProjectFragment on Project {
    id
    databaseId
    title
    slug
    uri
    content
    excerpt
    featuredImage {
      node {
        ...ImageFragment
      }
    }
    projectCategories {
      nodes {
        name
        slug
      }
    }
    projectInfo {
      clientName
      idea
      challenge
      execution
      results
      serviceUsed
      projectDate
      location
      featured
      galleryUrl1
      galleryUrl2
      galleryUrl3
      galleryUrl4
    }
    pageCta {
      pageCtaTitle1
      pageCtaTitle2
      pageCtaButtonText
      pageCtaButtonUrl
    }
    seo {
      ...SeoFragment
    }
  }
`;
var testimonialFragment = `
  fragment TestimonialFragment on Testimonial {
    id
    databaseId
    title
    testimonialInfo {
      quote
      clientName
      companyName
      designation
      photoUrl
      projectType
    }
    seo {
      ...SeoFragment
    }
  }
`;
var faqFragment = `
  fragment FaqFragment on Faq {
    id
    databaseId
    title
    slug
    menuOrder
    content
    seo {
      ...SeoFragment
    }
  }
`;
var heroFragment = `
  fragment HeroFragment on Hero {
    id
    title
    slug
    content
    heroSection {
      selectPage
      smallText
      title1
      videoUrl
      button1Label
      button1PageLink
      button2Label
      button2PageLink
    }
  }
`;
var brandStatementFragment = `
  fragment BrandStatementFragment on Brandstatement {
    id
    title
    slug
    content
    brandStatementsSection {
      title1
      title2
      reel1
      reel2
      reel3
      reel4
      reel5
      reel6
    }
  }
`;
var menuFragment = `
  fragment MenuFragment on Menu {
    id
    databaseId
    name
    slug
    count
    menuItems(first: 50) {
      nodes {
        id
        label
        url
        path
        uri
        order
        target
        parentDatabaseId
      }
    }
  }
`;
var postFragment = `
  fragment PostFragment on Post {
    id
    title
    slug
    excerpt
    content
    featuredImage {
      node {
        ...ImageFragment
      }
    }
    author {
      node {
        name
        avatar {
          url
        }
      }
    }
    categories {
      nodes {
        name
        slug
      }
    }
    tags {
      nodes {
        name
        slug
      }
    }
    date
    modified
    pageCta {
      pageCtaTitle1
      pageCtaTitle2
      pageCtaButtonText
      pageCtaButtonUrl
    }
    seo {
      ...SeoFragment
    }
  }
`;
//#endregion
//#region src/graphql/queries/services.ts
var GET_SERVICES = `
  ${imageFragment}
  ${seoFragment}
  ${serviceFragment}
  query GetServices {
    services(first: 50, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes {
        ...ServiceFragment
      }
    }
  }
`;
var GET_SERVICE_BY_SLUG = `
  ${imageFragment}
  ${seoFragment}
  ${serviceFragment}
  query GetServiceBySlug($slug: String!) {
    serviceBy(uri: $slug) {
      ...ServiceFragment
    }
  }
`;
//#endregion
//#region src/graphql/queries/projects.ts
var GET_PROJECTS = `
  ${imageFragment}
  ${seoFragment}
  ${projectFragment}
  query GetProjects {
    projects(first: 50) {
      nodes {
        ...ProjectFragment
      }
    }
  }
`;
var GET_FEATURED_PROJECTS = `
  ${imageFragment}
  ${seoFragment}
  ${projectFragment}
  query GetFeaturedProjects {
    projects(first: 50) {
      nodes {
        ...ProjectFragment
      }
    }
  }
`;
var GET_PROJECT_BY_SLUG = `
  ${imageFragment}
  ${seoFragment}
  ${projectFragment}
  query GetProjectBySlug($slug: String!) {
    projectBy(uri: $slug) {
      ...ProjectFragment
    }
  }
`;
//#endregion
//#region src/graphql/queries/posts.ts
var GET_POSTS = `
  ${imageFragment}
  ${seoFragment}
  ${postFragment}
  query GetPosts($first: Int = 10, $after: String) {
    posts(first: $first, after: $after) {
      nodes {
        ...PostFragment
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
var GET_POST_BY_SLUG = `
  ${imageFragment}
  ${seoFragment}
  ${postFragment}
  query GetPostBySlug($slug: String!) {
    postBy(uri: $slug) {
      ...PostFragment
    }
  }
`;
`${imageFragment}${seoFragment}`;
var GET_PAGE_BY_SLUG = `
  ${seoFragment}
  query GetPageBySlug($slug: String!) {
    pageBy(uri: $slug) {
      id
      title
      slug
      content
      date
      modified
      pageCta {
        pageCtaTitle1
        pageCtaTitle2
        pageCtaButtonText
        pageCtaButtonUrl
      }
      seo {
        ...SeoFragment
      }
    }
  }
`;
var GET_HOME_SECTIONS = `
  query GetHomeSections {
    pageBy(uri: "/") {
      id
      homeSections {
        cpTitle
        cpTitleAccent
        cpImage1
        cpImage2
        cpImage3
        cpImage4
        smTitle1
        smTitleAccent
        smTitle2
        smTitle2Accent
        smPlatforms
        droneEyebrow
        droneTitle1
        droneTitle2
        droneTitle3
        droneBody
        droneButtonLabel
        droneButtonUrl
        ctaTitle1
        ctaTitleAccent
        ctaBody
        ctaButton1Label
        ctaButton1Url
        ctaButton2Label
      }
    }
  }
`;
var GET_SITE_DATA = `
  query GetSiteData {
    pageBy(uri: "/site-settings/") {
      id
      siteFooter {
        footerBlurb
        footerCopyright
        footerCta
        footerTagLine
      }
      siteContact {
        contactEmail
        contactWhatsappUrl
        contactWhatsappNumber
        contactPhone
        contactAddress
        contactGeoLat
        contactGeoLng
        contactAreaServed
        contactSocialInstagram
        contactSocialFacebook
        contactSocialLinkedin
        contactSocialYoutube
      }
      siteText {
        titleServices1
        titleServices2
        titleProjects1
        titleProjects2
        titleBlog1
        titleBlog2
        titleTestimonials1
        titleTestimonials2
        titleFaq
        titleProcess1
        titleProcess2
        titleIndustries1
        titleIndustries2
        btnAllServices
        btnViewAllProjects
        btnViewAllArticles
      }
    }
  }
`;
var GET_WHY_CHOOSE_US = `
  query GetWhyChooseUs {
    pageBy(uri: "/why-choose-us/") {
      id
      title
      content
    }
  }
`;
//#endregion
//#region src/graphql/queries/contact.ts
var GET_CONTACT_FORM = `
  query GetContactForm {
    tdeContactForm {
      id
      title
      form
      successMessage
    }
  }
`;
var GET_OFFICES = `
  query GetOffices {
    offices(first: 50, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes {
        id
        title
        officeInfo {
          companyType
          companyName
          address
          phone1
          phone2
          email
          mapEmbedUrl
        }
      }
    }
  }
`;
//#endregion
//#region src/graphql/queries/pricing.ts
var GET_PRICING_PLANS = `
  query GetPricingPlans {
    plans(first: 50, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes {
        id
        title
        menuOrder
        planInfo {
          planPrice
          planPeriod
          planSummary
          planFeatures
          planBadge
          planHighlight
          planCtaLabel
          planCtaUrl
        }
      }
    }
  }
`;
//#endregion
//#region src/graphql/queries/settings.ts
var GET_SITE_SETTINGS = `
  query GetSiteSettings {
    generalSettings {
      title
      description
      url
    }
  }
`;
//#endregion
//#region src/graphql/queries/heroes.ts
var GET_ALL_HEROS = `
  ${heroFragment}
  query GetAllHeroes {
    heroes(first: 50) {
      edges {
        node {
          ...HeroFragment
        }
      }
    }
  }
`;
//#endregion
//#region src/graphql/queries/brandStatement.ts
var GET_BRAND_STATEMENTS = `
  ${brandStatementFragment}
  query GetBrandStatements {
    brandstatements(first: 10) {
      edges {
        node {
          ...BrandStatementFragment
        }
      }
    }
  }
`;
//#endregion
//#region src/graphql/queries/menus.ts
var GET_MENUS = `
  ${menuFragment}
  query GetMenus {
    menus(first: 10) {
      nodes {
        ...MenuFragment
      }
    }
  }
`;
//#endregion
//#region src/graphql/queries/faqs.ts
var GET_FAQS = `
  ${seoFragment}
  ${faqFragment}
  query GetFaqs {
    faqs(first: 50) {
      nodes {
        ...FaqFragment
      }
    }
  }
`;
//#endregion
//#region src/graphql/queries/testimonials.ts
var GET_TESTIMONIALS = `
  ${seoFragment}
  ${testimonialFragment}
  query GetTestimonials {
    testimonials(first: 50) {
      nodes {
        ...TestimonialFragment
      }
    }
  }
`;
//#endregion
//#region src/lib/mock-data/services.ts
var caps = (...names) => [{
	heading: "Capabilities",
	paragraphs: [],
	items: names.map((text) => ({ text }))
}];
var mockServices = [
	{
		id: "1",
		title: "Content Production",
		slug: "content-production",
		shortDescription: "Photography, videography, and brand content that stops the scroll.",
		description: "We create visual stories that make people stop scrolling.",
		heroTitle: "CONTENT THAT STOPS THE SCROLL.",
		heroDescription: "Professional photography and videography for brands.",
		featuredImage: { node: {
			sourceUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1600&h=900&fit=crop",
			altText: "Content Production",
			width: 1600,
			height: 900
		} },
		gallery: [],
		icon: "📸",
		serviceCategory: "content",
		sections: caps("Photography", "Videography", "Brand Content", "Product Photography"),
		process: [
			"Strategy",
			"Concept",
			"Production",
			"Delivery"
		],
		pageCta: null,
		seo: {
			title: "Content Production | The Digital Echo",
			description: "Content production services.",
			canonical: "https://thedigitalecho.com/services/content-production/",
			ogImage: "",
			ogTitle: "",
			ogDescription: "",
			twitterTitle: "",
			twitterDescription: "",
			twitterImage: ""
		}
	},
	{
		id: "2",
		title: "Photography",
		slug: "photography",
		shortDescription: "Visual storytelling through the lens.",
		description: "Every brand has a story. We tell it through striking photography.",
		heroTitle: "VISUAL STORIES THAT SPEAK.",
		heroDescription: "Professional photography for brands.",
		featuredImage: { node: {
			sourceUrl: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=1600&h=900&fit=crop",
			altText: "Photography",
			width: 1600,
			height: 900
		} },
		gallery: [],
		icon: "📷",
		serviceCategory: "content",
		sections: caps("Product Photography", "Lifestyle", "Corporate", "Events"),
		process: [
			"Brief",
			"Shoot",
			"Edit",
			"Deliver"
		],
		pageCta: null,
		seo: {
			title: "Photography | The Digital Echo",
			description: "Photography services.",
			canonical: "https://thedigitalecho.com/services/photography/",
			ogImage: "",
			ogTitle: "",
			ogDescription: "",
			twitterTitle: "",
			twitterDescription: "",
			twitterImage: ""
		}
	},
	{
		id: "3",
		title: "Videography",
		slug: "videography",
		shortDescription: "Cinematic video content for digital platforms.",
		description: "From brand films to social reels, we create video content.",
		heroTitle: "VIDEOS THAT MOVE PEOPLE.",
		heroDescription: "Cinematic videography for the digital age.",
		featuredImage: { node: {
			sourceUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1600&h=900&fit=crop",
			altText: "Videography",
			width: 1600,
			height: 900
		} },
		gallery: [],
		icon: "🎬",
		serviceCategory: "content",
		sections: caps("Brand Films", "Social Reels", "Corporate Videos", "Ads"),
		process: [
			"Concept",
			"Script",
			"Shoot",
			"Edit",
			"Delivery"
		],
		pageCta: null,
		seo: {
			title: "Videography | The Digital Echo",
			description: "Videography services.",
			canonical: "https://thedigitalecho.com/services/videography/",
			ogImage: "",
			ogTitle: "",
			ogDescription: "",
			twitterTitle: "",
			twitterDescription: "",
			twitterImage: ""
		}
	},
	{
		id: "4",
		title: "Drone Photography",
		slug: "drone-photography",
		shortDescription: "Aerial perspectives that change the game.",
		description: "Drone photography that reveals your brand from a new angle.",
		heroTitle: "CHANGE THE PERSPECTIVE.",
		heroDescription: "Aerial photography for brands.",
		featuredImage: { node: {
			sourceUrl: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1600&h=900&fit=crop",
			altText: "Drone Photography",
			width: 1600,
			height: 900
		} },
		gallery: [],
		icon: "🚁",
		serviceCategory: "drone",
		sections: caps("Aerial Photography", "Real Estate", "Events", "Construction"),
		process: [
			"Survey",
			"Flight",
			"Capture",
			"Process"
		],
		pageCta: null,
		seo: {
			title: "Drone Photography | The Digital Echo",
			description: "Drone photography services.",
			canonical: "https://thedigitalecho.com/services/drone-photography/",
			ogImage: "",
			ogTitle: "",
			ogDescription: "",
			twitterTitle: "",
			twitterDescription: "",
			twitterImage: ""
		}
	},
	{
		id: "5",
		title: "Drone Videography",
		slug: "drone-videography",
		shortDescription: "Cinematic aerial video content.",
		description: "Cinematic drone footage that takes your brand to new heights.",
		heroTitle: "FLY ABOVE THE NOISE.",
		heroDescription: "Aerial videography for brands.",
		featuredImage: { node: {
			sourceUrl: "https://images.unsplash.com/photo-1506947411487-a56738267384?w=1600&h=900&fit=crop",
			altText: "Drone Videography",
			width: 1600,
			height: 900
		} },
		gallery: [],
		icon: "🛩️",
		serviceCategory: "drone",
		sections: caps("Aerial Video", "Site Surveys", "Promotional", "Events"),
		process: [
			"Plan",
			"Fly",
			"Capture",
			"Edit"
		],
		pageCta: null,
		seo: {
			title: "Drone Videography | The Digital Echo",
			description: "Drone videography services.",
			canonical: "https://thedigitalecho.com/services/drone-videography/",
			ogImage: "",
			ogTitle: "",
			ogDescription: "",
			twitterTitle: "",
			twitterDescription: "",
			twitterImage: ""
		}
	},
	{
		id: "6",
		title: "Social Media Management",
		slug: "social-media-management",
		shortDescription: "Your feed called. It wants better content.",
		description: "We manage your social media so you can focus on what you do best.",
		heroTitle: "YOUR FEED CALLED. IT WANTS BETTER CONTENT.",
		heroDescription: "Social media management that works.",
		featuredImage: { node: {
			sourceUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1600&h=900&fit=crop",
			altText: "Social Media Management",
			width: 1600,
			height: 900
		} },
		gallery: [],
		icon: "📱",
		serviceCategory: "social",
		sections: caps("Instagram", "Facebook", "LinkedIn", "YouTube", "WhatsApp"),
		process: [
			"Audit",
			"Strategy",
			"Content",
			"Publish",
			"Analyze"
		],
		pageCta: null,
		seo: {
			title: "Social Media Management | The Digital Echo",
			description: "Social media management.",
			canonical: "https://thedigitalecho.com/services/social-media-management/",
			ogImage: "",
			ogTitle: "",
			ogDescription: "",
			twitterTitle: "",
			twitterDescription: "",
			twitterImage: ""
		}
	},
	{
		id: "7",
		title: "Digital Marketing",
		slug: "digital-marketing",
		shortDescription: "Marketing that actually converts.",
		description: "Data-driven digital marketing that puts your brand in front of the right people.",
		heroTitle: "MARKETING THAT MATTERS.",
		heroDescription: "Digital marketing that drives results.",
		featuredImage: { node: {
			sourceUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&h=900&fit=crop",
			altText: "Digital Marketing",
			width: 1600,
			height: 900
		} },
		gallery: [],
		icon: "📊",
		serviceCategory: "marketing",
		sections: caps("Google Ads", "Meta Ads", "LinkedIn Ads", "Analytics"),
		process: [
			"Research",
			"Strategy",
			"Execute",
			"Optimize"
		],
		pageCta: null,
		seo: {
			title: "Digital Marketing | The Digital Echo",
			description: "Digital marketing services.",
			canonical: "https://thedigitalecho.com/services/digital-marketing/",
			ogImage: "",
			ogTitle: "",
			ogDescription: "",
			twitterTitle: "",
			twitterDescription: "",
			twitterImage: ""
		}
	},
	{
		id: "8",
		title: "SEO",
		slug: "seo",
		shortDescription: "Be found when it matters.",
		description: "Search engine optimization that gets your brand to the top of Google.",
		heroTitle: "BE FOUND. BE CHOSEN.",
		heroDescription: "SEO that drives organic growth.",
		featuredImage: { node: {
			sourceUrl: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=1600&h=900&fit=crop",
			altText: "SEO",
			width: 1600,
			height: 900
		} },
		gallery: [],
		icon: "🔍",
		serviceCategory: "marketing",
		sections: caps("Technical SEO", "Content Strategy", "Link Building", "Local SEO"),
		process: [
			"Audit",
			"Strategy",
			"Implement",
			"Monitor"
		],
		pageCta: null,
		seo: {
			title: "SEO Services | The Digital Echo",
			description: "SEO services.",
			canonical: "https://thedigitalecho.com/services/seo/",
			ogImage: "",
			ogTitle: "",
			ogDescription: "",
			twitterTitle: "",
			twitterDescription: "",
			twitterImage: ""
		}
	}
];
//#endregion
//#region src/lib/mock-data/projects.ts
var mockProjects = [
	{
		id: "1",
		title: "Brand Refresh for TechStart",
		slug: "techstart-brand-refresh",
		clientName: "TechStart",
		clientLogo: { node: {
			sourceUrl: "https://via.placeholder.com/200x60/080808/C8FF00?text=TechStart",
			altText: "TechStart",
			width: 200,
			height: 60
		} },
		heroImage: { node: {
			sourceUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1600&h=900&fit=crop",
			altText: "TechStart Project",
			width: 1600,
			height: 900
		} },
		gallery: [],
		video: "",
		category: ["Branding", "Social Media"],
		servicesUsed: ["Content Production", "Social Media Management"],
		challenge: "TechStart needed a complete brand overhaul to appeal to a younger demographic.",
		strategy: "We developed a bold, modern visual identity with Gen Z-friendly messaging.",
		execution: "Created 50+ content pieces, managed social media for 3 months.",
		result: "300% increase in social media engagement, 150% growth in followers.",
		testimonial: "The Digital Echo completely transformed our brand.",
		testimonialAuthor: "Priya Sharma",
		testimonialCompany: "TechStart",
		projectDate: "2026-01-15",
		location: "Mumbai",
		featured: true,
		seo: {
			title: "TechStart Brand Refresh | The Digital Echo",
			description: "How The Digital Echo transformed TechStart.",
			canonical: "https://thedigitalecho.com/projects/techstart-brand-refresh/",
			ogImage: "",
			ogTitle: "",
			ogDescription: "",
			twitterTitle: "",
			twitterDescription: "",
			twitterImage: ""
		}
	},
	{
		id: "2",
		title: "Social Campaign for FreshBite",
		slug: "freshbite-social-campaign",
		clientName: "FreshBite",
		clientLogo: { node: {
			sourceUrl: "https://via.placeholder.com/200x60/080808/C8FF00?text=FreshBite",
			altText: "FreshBite",
			width: 200,
			height: 60
		} },
		heroImage: { node: {
			sourceUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1600&h=900&fit=crop",
			altText: "FreshBite Campaign",
			width: 1600,
			height: 900
		} },
		gallery: [],
		video: "",
		category: ["Social Media", "Campaigns"],
		servicesUsed: [
			"Social Media Management",
			"Photography",
			"Videography"
		],
		challenge: "FreshBite wanted to increase brand awareness among food enthusiasts.",
		strategy: "We created a content-first strategy with stunning food photography.",
		execution: "Produced 100+ content pieces, ran targeted ad campaigns.",
		result: "500% increase in Instagram engagement, 200% increase in orders.",
		testimonial: "Our social media went from zero to hero.",
		testimonialAuthor: "Rahul Verma",
		testimonialCompany: "FreshBite",
		projectDate: "2026-02-20",
		location: "Pune",
		featured: true,
		seo: {
			title: "FreshBite Campaign | The Digital Echo",
			description: "FreshBite social media campaign.",
			canonical: "https://thedigitalecho.com/projects/freshbite-social-campaign/",
			ogImage: "",
			ogTitle: "",
			ogDescription: "",
			twitterTitle: "",
			twitterDescription: "",
			twitterImage: ""
		}
	},
	{
		id: "3",
		title: "Drone Campaign for BuildRight",
		slug: "buildright-drone-campaign",
		clientName: "BuildRight",
		clientLogo: { node: {
			sourceUrl: "https://via.placeholder.com/200x60/080808/C8FF00?text=BuildRight",
			altText: "BuildRight",
			width: 200,
			height: 60
		} },
		heroImage: { node: {
			sourceUrl: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&h=900&fit=crop",
			altText: "BuildRight Drone",
			width: 1600,
			height: 900
		} },
		gallery: [],
		video: "",
		category: ["Drone", "Corporate"],
		servicesUsed: ["Drone Photography", "Drone Videography"],
		challenge: "BuildRight needed to showcase their construction projects from unique angles.",
		strategy: "We used drone photography and videography to capture stunning aerial views.",
		execution: "Filmed 20+ construction sites over 2 months.",
		result: "Won industry award for best construction marketing campaign.",
		testimonial: "The drone footage changed how we present our work.",
		testimonialAuthor: "Amit Patel",
		testimonialCompany: "BuildRight",
		projectDate: "2026-03-10",
		location: "Delhi",
		featured: true,
		seo: {
			title: "BuildRight Drone Campaign | The Digital Echo",
			description: "BuildRight drone marketing.",
			canonical: "https://thedigitalecho.com/projects/buildright-drone-campaign/",
			ogImage: "",
			ogTitle: "",
			ogDescription: "",
			twitterTitle: "",
			twitterDescription: "",
			twitterImage: ""
		}
	},
	{
		id: "4",
		title: "E-commerce for StyleHub",
		slug: "stylehub-ecommerce",
		clientName: "StyleHub",
		clientLogo: { node: {
			sourceUrl: "https://via.placeholder.com/200x60/080808/C8FF00?text=StyleHub",
			altText: "StyleHub",
			width: 200,
			height: 60
		} },
		heroImage: { node: {
			sourceUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&h=900&fit=crop",
			altText: "StyleHub",
			width: 1600,
			height: 900
		} },
		gallery: [],
		video: "",
		category: ["Ecommerce", "Photography"],
		servicesUsed: [
			"Photography",
			"Digital Marketing",
			"Social Media Management"
		],
		challenge: "StyleHub needed to increase online sales through better content and marketing.",
		strategy: "We created a comprehensive content and digital marketing strategy.",
		execution: "Shot 500+ product images, ran Google and Meta ad campaigns.",
		result: "400% increase in online sales within 6 months.",
		testimonial: "Our online sales have never been better.",
		testimonialAuthor: "Neha Gupta",
		testimonialCompany: "StyleHub",
		projectDate: "2026-04-05",
		location: "Mumbai",
		featured: false,
		seo: {
			title: "StyleHub E-commerce | The Digital Echo",
			description: "StyleHub e-commerce project.",
			canonical: "https://thedigitalecho.com/projects/stylehub-ecommerce/",
			ogImage: "",
			ogTitle: "",
			ogDescription: "",
			twitterTitle: "",
			twitterDescription: "",
			twitterImage: ""
		}
	}
];
//#endregion
//#region src/lib/mock-data/posts.ts
var mockPosts = [
	{
		id: "1",
		title: "Why Gen Z Brands Need a Different Approach",
		slug: "gen-z-brands-different-approach",
		excerpt: "Gen Z doesn't respond to traditional marketing. Here's what works instead.",
		content: "<p>Gen Z is the first generation to grow up entirely in the digital age. They have unique preferences when it comes to brands and marketing.</p><p>Here's what you need to know to connect with them effectively.</p>",
		featuredImage: { node: {
			sourceUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=630&fit=crop",
			altText: "Gen Z Marketing",
			width: 1200,
			height: 630
		} },
		author: {
			name: "The Digital Echo",
			avatar: { url: "" }
		},
		categories: [{
			name: "Marketing",
			slug: "marketing"
		}],
		tags: [{
			name: "Gen Z",
			slug: "gen-z"
		}, {
			name: "Marketing",
			slug: "marketing"
		}],
		publishedDate: "2026-01-10",
		modifiedDate: "2026-01-10",
		seo: {
			title: "Why Gen Z Brands Need a Different Approach",
			description: "Gen Z marketing guide.",
			canonical: "https://thedigitalecho.com/blog/gen-z-brands-different-approach/",
			ogImage: "",
			ogTitle: "",
			ogDescription: "",
			twitterTitle: "",
			twitterDescription: "",
			twitterImage: ""
		}
	},
	{
		id: "2",
		title: "The Power of Visual Content in 2026",
		slug: "power-of-visual-content-2026",
		excerpt: "Visual content is king. Here's why you need to invest in it.",
		content: "<p>In 2026, visual content is more important than ever. Here's how to make it work for your brand.</p>",
		featuredImage: { node: {
			sourceUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&h=630&fit=crop",
			altText: "Visual Content",
			width: 1200,
			height: 630
		} },
		author: {
			name: "The Digital Echo",
			avatar: { url: "" }
		},
		categories: [{
			name: "Content",
			slug: "content"
		}],
		tags: [{
			name: "Visual Content",
			slug: "visual-content"
		}],
		publishedDate: "2026-02-05",
		modifiedDate: "2026-02-05",
		seo: {
			title: "Power of Visual Content 2026",
			description: "Visual content guide.",
			canonical: "https://thedigitalecho.com/blog/power-of-visual-content-2026/",
			ogImage: "",
			ogTitle: "",
			ogDescription: "",
			twitterTitle: "",
			twitterDescription: "",
			twitterImage: ""
		}
	},
	{
		id: "3",
		title: "Drone Photography: A Complete Guide",
		slug: "drone-photography-complete-guide",
		excerpt: "Everything you need to know about drone photography for your brand.",
		content: "<p>Drone photography has revolutionized how we capture the world. Here's your complete guide.</p>",
		featuredImage: { node: {
			sourceUrl: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1200&h=630&fit=crop",
			altText: "Drone Photography",
			width: 1200,
			height: 630
		} },
		author: {
			name: "The Digital Echo",
			avatar: { url: "" }
		},
		categories: [{
			name: "Photography",
			slug: "photography"
		}],
		tags: [{
			name: "Drone",
			slug: "drone"
		}, {
			name: "Photography",
			slug: "photography"
		}],
		publishedDate: "2026-03-15",
		modifiedDate: "2026-03-15",
		seo: {
			title: "Drone Photography Guide",
			description: "Drone photography guide.",
			canonical: "https://thedigitalecho.com/blog/drone-photography-complete-guide/",
			ogImage: "",
			ogTitle: "",
			ogDescription: "",
			twitterTitle: "",
			twitterDescription: "",
			twitterImage: ""
		}
	}
];
//#endregion
//#region src/lib/mock-data/heroes.ts
var mockHeroes = [
	{
		id: "hero-home",
		title: "YOUR BRAND. OUR CREATIVE",
		title1: "ECHO.",
		slug: "home",
		selectPage: "/",
		smallText: "Digital Marketing & Content Studio",
		heroDescription: "A Gen Z-led digital marketing and content production company creating content, campaigns and digital experiences people actually remember.",
		videoUrl: "/assets/hero-section-video1.mp4",
		button1Label: "LET'S MAKE SOME NOISE",
		button1PageLink: "/contact/",
		button2Label: "SEE THE WORK",
		button2PageLink: "/projects/"
	},
	{
		id: "hero-about",
		title1: "",
		title: "WE'RE THE GENERATION THAT GREW UP ONLINE.",
		slug: "about",
		selectPage: "/about/",
		smallText: "About The Digital Echo",
		heroDescription: "We're a team of creatives, strategists, and storytellers who believe content should make people feel something.",
		videoUrl: "",
		button1Label: "MEET THE CREW",
		button1PageLink: "/about/",
		button2Label: "",
		button2PageLink: ""
	},
	{
		id: "hero-contact",
		title1: "",
		title: "GOT A BRAND THAT NEEDS AN ECHO?",
		slug: "contact",
		selectPage: "/contact/",
		smallText: "Let's Create Together",
		heroDescription: "Got a brand that needs an echo? Let's talk about your next project.",
		videoUrl: "",
		button1Label: "WHATSAPP US",
		button1PageLink: "https://wa.me/919999999999",
		button2Label: "",
		button2PageLink: ""
	},
	{
		id: "hero-services",
		title1: "",
		title: "EVERYTHING YOUR BRAND NEEDS TO BE SEEN.",
		slug: "services",
		selectPage: "/services/",
		smallText: "Our Services",
		heroDescription: "Photography, videography, drone shoots, social media management and digital marketing — all under one roof.",
		videoUrl: "",
		button1Label: "EXPLORE SERVICES",
		button1PageLink: "/services/",
		button2Label: "",
		button2PageLink: ""
	},
	{
		id: "hero-projects",
		title1: "",
		title: "WORK > WORDS.",
		slug: "projects",
		selectPage: "/projects/",
		smallText: "Our Portfolio",
		heroDescription: "See what we have created for brands across India.",
		videoUrl: "",
		button1Label: "VIEW ALL PROJECTS",
		button1PageLink: "/projects/",
		button2Label: "",
		button2PageLink: ""
	},
	{
		id: "hero-blog",
		title1: "",
		title: "THE DROP.",
		slug: "blog",
		selectPage: "/blog/",
		smallText: "Insights & Stories",
		heroDescription: "Thoughts, stories, and insights from the world of digital marketing and content creation.",
		videoUrl: "",
		button1Label: "",
		button1PageLink: "",
		button2Label: "",
		button2PageLink: ""
	}
];
//#endregion
//#region src/lib/mock-data/brandStatement.ts
var mockBrandStatement = {
	id: "brandstatement-mock",
	slug: "we-dont-just",
	title: "We Don't Just",
	title1: "Create Content.",
	title2: "We create echo",
	fullTitle: "We Don't Just Create Content. We create echo",
	content: "",
	paragraphs: [
		"From professional photography and videography to social media marketing and brand storytelling, we create digital experiences designed around your audience. Whether it's a product launch, a new business, a campaign, or your everyday social media presence, we turn ideas into content that feels real and connects with people.",
		"Our approach to digital marketing is simple: understand the brand first, then create content that sounds and looks like it belongs to it. We combine creativity, strategy, visual storytelling, and platform-specific content to help brands build a stronger online presence.",
		"Need scroll-stopping visuals? Our photography and videography bring your products, people, and ideas to life. Want your social media to actually feel alive? Our social media management helps you stay consistent, relevant, and connected across platforms like Instagram, Facebook, LinkedIn, and WhatsApp."
	],
	reels: [
		"/assets/sample-restaurant.mp4",
		"/assets/sample-shop.mp4",
		"/assets/sample-factory.mp4"
	]
};
//#endregion
//#region src/lib/data.ts
function fetchFailed(error, message) {
	throw error;
}
function toSeo(raw) {
	return {
		title: raw?.title || "",
		description: raw?.description || "",
		canonical: raw?.canonical || "",
		ogImage: raw?.ogImage || "",
		ogTitle: raw?.ogTitle || "",
		ogDescription: raw?.ogDescription || "",
		twitterTitle: raw?.twitterTitle || "",
		twitterDescription: raw?.twitterDescription || "",
		twitterImage: raw?.twitterImage || ""
	};
}
function stripHtml(html) {
	return String(html || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}
function withTrailingSlash(href) {
	if (!href || !href.startsWith("/") || href.includes("#") || href.includes("?")) return href;
	return href.endsWith("/") ? href : `${href}/`;
}
function normalizePost(raw) {
	return {
		id: raw.id || "",
		title: raw.title || "",
		slug: raw.slug || "",
		excerpt: raw.excerpt || "",
		content: raw.content || "",
		featuredImage: raw.featuredImage || { node: {
			sourceUrl: "",
			altText: ""
		} },
		author: raw.author?.node || raw.author || { name: "Unknown" },
		categories: Array.isArray(raw.categories) ? raw.categories : raw.categories?.nodes || [],
		tags: Array.isArray(raw.tags) ? raw.tags : raw.tags?.nodes || [],
		publishedDate: raw.publishedDate || raw.date || "",
		modifiedDate: raw.modifiedDate || raw.modified || "",
		pageCta: normalizePageCta(raw.pageCta),
		seo: toSeo(raw.seo)
	};
}
function normalizeProject(raw) {
	const info = raw.projectInfo;
	const gallery = [
		"galleryUrl1",
		"galleryUrl2",
		"galleryUrl3",
		"galleryUrl4"
	].map((key) => info?.[key]).filter(Boolean).map((url) => ({ node: {
		sourceUrl: url,
		altText: raw.title || ""
	} }));
	const heroImage = raw.featuredImage || (gallery[0] ? { node: {
		...gallery[0].node,
		width: 1600,
		height: 900
	} } : { node: {
		sourceUrl: "",
		altText: ""
	} });
	const servicesUsed = Array.isArray(info?.serviceUsed) ? info.serviceUsed : typeof info?.serviceUsed === "string" && info.serviceUsed ? info.serviceUsed.split(",").map((s) => s.trim()).filter(Boolean) : [];
	return {
		id: String(raw.id || ""),
		title: raw.title || "",
		slug: raw.slug || "",
		clientName: info?.clientName || "",
		clientLogo: { node: {
			sourceUrl: "",
			altText: ""
		} },
		heroImage,
		gallery,
		video: "",
		category: Array.isArray(raw.projectCategories?.nodes) ? raw.projectCategories.nodes.map((c) => c.name) : [],
		servicesUsed,
		challenge: info?.challenge || "",
		strategy: info?.idea || "",
		execution: info?.execution || "",
		result: info?.results || "",
		testimonial: "",
		testimonialAuthor: "",
		testimonialCompany: "",
		projectDate: info?.projectDate || "",
		location: info?.location || "",
		featured: Boolean(info?.featured),
		pageCta: normalizePageCta(raw.pageCta),
		seo: toSeo(raw.seo)
	};
}
function normalizePageCta(raw) {
	if (!raw || !raw.pageCtaTitle1 && !raw.pageCtaTitle2 && !raw.pageCtaButtonText) return null;
	return {
		title1: raw.pageCtaTitle1 || "",
		title2: raw.pageCtaTitle2 || "",
		buttonText: raw.pageCtaButtonText || "",
		buttonUrl: withTrailingSlash(raw.pageCtaButtonUrl || "")
	};
}
function normalizeService(raw) {
	const links = raw.serviceMenuLinks;
	const page = raw.servicePage;
	const galleryFields = raw.serviceGallery;
	const { intro, sections } = parseContentSections(raw.content || "");
	let process = [];
	const processSection = sections.find((s) => /process/i.test(s.heading));
	const arrowIndex = processSection ? processSection.paragraphs.findIndex((p) => p.includes("→")) : -1;
	if (processSection && arrowIndex >= 0) {
		process = processSection.paragraphs[arrowIndex].split("→").map((s) => s.trim()).filter(Boolean);
		processSection.paragraphs.splice(arrowIndex, 1);
	}
	const img = raw.featuredImage?.node;
	const featuredImage = img ? { node: {
		sourceUrl: img.sourceUrl,
		altText: img.altText || "",
		width: img.mediaDetails?.width || img.width,
		height: img.mediaDetails?.height || img.height
	} } : null;
	const gallery = [
		"galleryUrl1",
		"galleryUrl2",
		"galleryUrl3",
		"galleryUrl4"
	].map((key) => galleryFields?.[key]).filter(Boolean).map((url) => ({ node: {
		sourceUrl: url,
		altText: raw.title || ""
	} }));
	return {
		id: String(raw.id || ""),
		title: raw.title || "",
		slug: raw.slug || "",
		uri: raw.uri || "",
		menuOrder: typeof raw.menuOrder === "number" ? raw.menuOrder : void 0,
		shortDescription: links?.serviceShortDescription || stripHtml(raw.excerpt || ""),
		description: intro || page?.heroDescription || stripHtml(raw.excerpt || ""),
		heroTitle: page?.heroTitle || "",
		heroDescription: page?.heroDescription || "",
		ctaLabel: page?.ctaLabel || "",
		ctaUrl: withTrailingSlash(page?.ctaUrl || ""),
		featuredImage,
		gallery,
		icon: links?.serviceMenuIcon || "",
		serviceCategory: raw.serviceCategories?.nodes?.[0]?.name || "",
		sections,
		process,
		pageCta: normalizePageCta(raw.pageCta),
		seo: raw.seo ? {
			...toSeo(raw.seo),
			title: raw.seo.title || page?.seoTitle || "",
			description: raw.seo.description || page?.seoDescription || ""
		} : void 0
	};
}
async function getSiteSettings() {
	try {
		const settings = (await graphqlClient.query(GET_SITE_SETTINGS)).generalSettings;
		return {
			title: settings.title || "The Digital Echo",
			description: settings.description || "Digital Marketing & Content Production",
			url: settings.url || "http://localhost:4321",
			logo: "https://tde.arwasys.in/wp-content/uploads/2026/08/the-Digital-Echo-Logo.svg"
		};
	} catch (e) {
		fetchFailed(e, "Failed to fetch site settings:");
		return {
			title: "The Digital Echo",
			description: "Digital Marketing & Content Production",
			url: "http://localhost:4321",
			logo: "https://tde.arwasys.in/wp-content/uploads/2026/08/the-Digital-Echo-Logo.svg"
		};
	}
}
async function getServices() {
	try {
		const nodes = (await graphqlClient.query(GET_SERVICES)).services.nodes.map(normalizeService);
		return nodes.length ? nodes : mockServices;
	} catch (e) {
		fetchFailed(e, "Failed to fetch services, using mock data:");
		return mockServices;
	}
}
async function getServiceBySlug(slug) {
	try {
		const data = await graphqlClient.query(GET_SERVICE_BY_SLUG, { slug });
		if (data.serviceBy) return normalizeService(data.serviceBy);
		return mockServices.find((s) => s.slug === slug) || null;
	} catch (e) {
		fetchFailed(e, "Failed to fetch service, using mock data:");
		return mockServices.find((s) => s.slug === slug) || null;
	}
}
async function getProjects() {
	try {
		const nodes = (await graphqlClient.query(GET_PROJECTS)).projects.nodes.map(normalizeProject);
		return nodes.length ? nodes : mockProjects;
	} catch (e) {
		fetchFailed(e, "Failed to fetch projects, using mock data:");
		return mockProjects;
	}
}
async function getFeaturedProjects() {
	try {
		const nodes = (await graphqlClient.query(GET_FEATURED_PROJECTS)).projects.nodes.map(normalizeProject).filter((p) => p.featured);
		return nodes.length ? nodes : mockProjects.filter((p) => p.featured);
	} catch (e) {
		fetchFailed(e, "Failed to fetch featured projects, using mock data:");
		return mockProjects.filter((p) => p.featured);
	}
}
async function getProjectBySlug(slug) {
	try {
		const data = await graphqlClient.query(GET_PROJECT_BY_SLUG, { slug });
		if (data.projectBy) return normalizeProject(data.projectBy);
		return mockProjects.find((p) => p.slug === slug) || null;
	} catch (e) {
		fetchFailed(e, "Failed to fetch project, using mock data:");
		return mockProjects.find((p) => p.slug === slug) || null;
	}
}
async function getPosts(first = 10, after) {
	try {
		const data = await graphqlClient.query(GET_POSTS, {
			first,
			after
		});
		return {
			posts: data.posts.nodes.map(normalizePost),
			...data.posts.pageInfo
		};
	} catch (e) {
		fetchFailed(e, "Failed to fetch posts, using mock data:");
		return {
			posts: mockPosts,
			hasNextPage: false,
			endCursor: ""
		};
	}
}
async function getPostBySlug(slug) {
	try {
		const data = await graphqlClient.query(GET_POST_BY_SLUG, { slug });
		return data.postBy ? normalizePost(data.postBy) : null;
	} catch (e) {
		fetchFailed(e, "Failed to fetch post, using mock data:");
		return mockPosts.find((p) => p.slug === slug) || null;
	}
}
function normalizeHero(raw) {
	const section = raw.heroSection;
	return {
		id: String(raw.id || ""),
		title: String(raw.title || ""),
		slug: String(raw.slug || ""),
		selectPage: String(section?.selectPage || ""),
		smallText: String(section?.smallText || ""),
		title1: String(section?.title1 || ""),
		heroDescription: String(raw.content || "").replace(/<\/?p[^>]*>/gi, ""),
		videoUrl: String(section?.videoUrl || ""),
		button1Label: String(section?.button1Label || ""),
		button1PageLink: withTrailingSlash(String(section?.button1PageLink || "")),
		button2Label: String(section?.button2Label || ""),
		button2PageLink: withTrailingSlash(String(section?.button2PageLink || ""))
	};
}
function getHeroEdges(data) {
	return data?.heroes?.edges?.map((e) => e.node) || [];
}
async function getHeroByPage(selectPage) {
	try {
		const match = getHeroEdges(await graphqlClient.query(GET_ALL_HEROS)).find((node) => {
			return node.heroSection?.selectPage === selectPage;
		});
		return match ? normalizeHero(match) : null;
	} catch (e) {
		fetchFailed(e, "Failed to fetch hero, using mock data:");
		return mockHeroes.find((h) => h.selectPage === selectPage) || null;
	}
}
async function getHeroes() {
	try {
		return getHeroEdges(await graphqlClient.query(GET_ALL_HEROS)).map(normalizeHero);
	} catch (e) {
		fetchFailed(e, "Failed to fetch heroes, using mock data:");
		return mockHeroes;
	}
}
function toMediaUrl(value) {
	if (!value) return "";
	if (typeof value === "string") return value;
	if (typeof value.url === "string") return value.url;
	if (typeof value.node?.url === "string") return value.node.url;
	if (typeof value.node?.sourceUrl === "string") return value.node.sourceUrl;
	return "";
}
function splitParagraphs(html) {
	const blocks = html.match(/<p[^>]*>[\s\S]*?<\/p>/gi);
	if (blocks?.length) return blocks.map((b) => b.replace(/^<p[^>]*>/i, "").replace(/<\/p>$/i, "").trim()).filter(Boolean);
	const plain = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
	return plain ? [plain] : [];
}
function normalizeBrandStatement(raw) {
	const section = raw.brandStatementsSection;
	const title = String(raw.title || "");
	const title1 = String(section?.title1 || "");
	const title2 = String(section?.title2 || "");
	const content = String(raw.content || "");
	const reels = [
		"reel1",
		"reel2",
		"reel3",
		"reel4",
		"reel5",
		"reel6"
	].map((key) => toMediaUrl(section?.[key])).filter(Boolean);
	return {
		id: String(raw.id || ""),
		slug: String(raw.slug || ""),
		title,
		title1,
		title2,
		fullTitle: [
			title,
			title1,
			title2
		].filter(Boolean).join(" "),
		content,
		paragraphs: splitParagraphs(content),
		reels
	};
}
async function getBrandStatement() {
	try {
		const match = (await graphqlClient.query(GET_BRAND_STATEMENTS))?.brandstatements?.edges?.[0]?.node;
		if (!match) return mockBrandStatement;
		const statement = normalizeBrandStatement(match);
		return statement.reels.length ? statement : {
			...statement,
			reels: mockBrandStatement.reels
		};
	} catch (e) {
		fetchFailed(e, "Failed to fetch brand statement, using mock data:");
		return mockBrandStatement;
	}
}
var EMPTY_MENUS = {
	primary: [],
	footerExplore: [],
	footerPlatforms: [],
	footerSocial: []
};
function slugToGroup(slug) {
	switch (slug) {
		case "primary": return "primary";
		case "footer-explore": return "footerExplore";
		case "footer-platforms": return "footerPlatforms";
		case "footer-social": return "footerSocial";
		default: return null;
	}
}
async function getMenus() {
	try {
		const data = await graphqlClient.query(GET_MENUS);
		const groups = { ...EMPTY_MENUS };
		for (const menu of data.menus.nodes) {
			const key = slugToGroup(menu.slug);
			if (!key) continue;
			groups[key] = (menu.menuItems?.nodes || []).map((n) => ({
				label: n.label || "",
				url: withTrailingSlash(n.url || n.uri || n.path || ""),
				path: n.path || "",
				order: typeof n.order === "number" ? n.order : void 0,
				target: n.target || ""
			})).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
		}
		return groups;
	} catch (e) {
		fetchFailed(e, "Failed to fetch menus:");
		return EMPTY_MENUS;
	}
}
async function getFaqs() {
	try {
		return (await graphqlClient.query(GET_FAQS)).faqs.nodes.slice().sort((a, b) => (a.menuOrder ?? 0) - (b.menuOrder ?? 0)).map((n) => ({
			question: n.title || "",
			answer: stripHtml(n.content || "")
		}));
	} catch (e) {
		fetchFailed(e, "Failed to fetch FAQs:");
		return [];
	}
}
async function getTestimonials() {
	try {
		return (await graphqlClient.query(GET_TESTIMONIALS)).testimonials.nodes.map((n) => ({
			quote: n.testimonialInfo?.quote || "",
			author: n.testimonialInfo?.clientName || n.title || "",
			company: n.testimonialInfo?.companyName || "",
			avatar: n.testimonialInfo?.photoUrl || void 0,
			designation: n.testimonialInfo?.designation || void 0
		})).filter((t) => t.quote);
	} catch (e) {
		fetchFailed(e, "Failed to fetch testimonials:");
		return [];
	}
}
var DEFAULT_CONTACT = {
	contactEmail: "",
	contactWhatsappUrl: "",
	contactWhatsappNumber: "",
	contactPhone: "",
	contactAddress: "",
	contactGeoLat: "",
	contactGeoLng: "",
	contactAreaServed: "",
	contactSocialInstagram: "",
	contactSocialFacebook: "",
	contactSocialLinkedin: "",
	contactSocialYoutube: ""
};
var DEFAULT_SITE_TEXT = {
	titleServices1: "Our",
	titleServices2: "Services",
	titleProjects1: "Selected",
	titleProjects2: "Work",
	titleBlog1: "Latest",
	titleBlog2: "Journal",
	titleTestimonials1: "Words from our",
	titleTestimonials2: "Clients",
	titleFaq: "Frequently Asked Questions",
	titleProcess1: "Our",
	titleProcess2: "Process",
	titleIndustries1: "Industries",
	titleIndustries2: "We Serve",
	btnAllServices: "View all services",
	btnViewAllProjects: "View all work",
	btnViewAllArticles: "View all articles"
};
async function getSiteData() {
	const fallback = {
		footer: {
			footerBlurb: "",
			footerCopyright: `© ${(/* @__PURE__ */ new Date()).getFullYear()} The Digital Echo. All Rights Reserved.`,
			footerCta: "",
			footerTagLine: "CREATE. CONNECT. ECHO."
		},
		contact: DEFAULT_CONTACT,
		text: DEFAULT_SITE_TEXT
	};
	try {
		const page = (await graphqlClient.query(GET_SITE_DATA)).pageBy;
		if (!page) return fallback;
		const compact = (obj) => Object.fromEntries(Object.entries(obj || {}).filter(([, v]) => v !== null && v !== void 0));
		return {
			footer: {
				footerBlurb: page.siteFooter?.footerBlurb || "",
				footerCopyright: page.siteFooter?.footerCopyright || fallback.footer.footerCopyright,
				footerCta: page.siteFooter?.footerCta || "",
				footerTagLine: page.siteFooter?.footerTagLine || fallback.footer.footerTagLine
			},
			contact: {
				...DEFAULT_CONTACT,
				...compact(page.siteContact)
			},
			text: {
				...DEFAULT_SITE_TEXT,
				...compact(page.siteText)
			}
		};
	} catch (e) {
		fetchFailed(e, "Failed to fetch site data:");
		return fallback;
	}
}
async function getSiteContact() {
	return (await getSiteData()).contact;
}
async function getSiteText() {
	return (await getSiteData()).text;
}
async function getContactForm() {
	try {
		const form = (await graphqlClient.query(GET_CONTACT_FORM)).tdeContactForm;
		if (!form) return null;
		const parsed = parseCf7Form(form.form || "");
		return {
			id: String(form.id || ""),
			title: decodeEntities(stripHtml(form.title || "")).trim(),
			form: form.form || "",
			successMessage: form.successMessage || "",
			...parsed
		};
	} catch (e) {
		fetchFailed(e, "Failed to fetch contact form:");
		return null;
	}
}
async function getOffices() {
	try {
		const nodes = (await graphqlClient.query(GET_OFFICES)).offices?.nodes || [];
		const str = (v) => Array.isArray(v) ? String(v[0] ?? "") : String(v ?? "");
		return nodes.filter((n) => Boolean(n)).map((n) => {
			const info = n.officeInfo || {};
			const address = str(info.address).replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]+>/g, "").trim();
			const mapEmbedUrl = str(info.mapEmbedUrl).trim();
			return {
				id: str(n.id),
				title: str(n.title),
				companyType: str(info.companyType).trim(),
				companyName: str(info.companyName).trim() || str(n.title).trim(),
				address,
				phone1: str(info.phone1).trim(),
				phone2: str(info.phone2).trim(),
				email: str(info.email).trim(),
				mapUrl: /^https?:\/\//i.test(mapEmbedUrl) ? mapEmbedUrl : ""
			};
		}).filter((o) => Boolean(o.companyName || o.address || o.phone1 || o.phone2 || o.email || o.mapUrl));
	} catch (e) {
		fetchFailed(e, "Failed to fetch offices:");
		return [];
	}
}
async function getPricingPlans() {
	try {
		const nodes = (await graphqlClient.query(GET_PRICING_PLANS)).plans?.nodes || [];
		const str = (v) => Array.isArray(v) ? String(v[0] ?? "") : String(v ?? "");
		const toLines = (v) => str(v).replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]+>/g, "").split(/\r?\n/).map((line) => line.replace(/^[-•*]\s*/, "").trim()).filter(Boolean);
		return nodes.filter((n) => Boolean(n)).map((n) => {
			const info = n.planInfo || {};
			const ctaUrl = str(info.planCtaUrl).trim();
			return {
				id: str(n.id),
				title: str(n.title).trim(),
				price: str(info.planPrice).trim(),
				period: str(info.planPeriod).trim(),
				summary: toLines(info.planSummary).join("\n"),
				features: toLines(info.planFeatures),
				badge: str(info.planBadge).trim(),
				highlighted: info.planHighlight === true || info.planHighlight === 1,
				ctaLabel: str(info.planCtaLabel).trim(),
				ctaUrl: withTrailingSlash(ctaUrl) || "/contact/"
			};
		}).filter((plan) => Boolean(plan.title));
	} catch (e) {
		fetchFailed(e, "Failed to fetch pricing plans:");
		return [];
	}
}
async function getWhyChooseUs() {
	const empty = {
		heading: "Why Choose Us",
		paragraphs: [],
		items: []
	};
	try {
		const parsed = parseContentSections((await graphqlClient.query(GET_WHY_CHOOSE_US)).pageBy?.content || "");
		const section = parsed.sections[0];
		if (!section) return {
			...empty,
			paragraphs: parsed.introParagraphs
		};
		return {
			heading: section.heading || empty.heading,
			paragraphs: section.paragraphs,
			items: section.items
		};
	} catch (e) {
		fetchFailed(e, "Failed to fetch why-choose-us:");
		return empty;
	}
}
async function getHomeSections() {
	try {
		const sections = (await graphqlClient.query(GET_HOME_SECTIONS)).pageBy?.homeSections || null;
		if (!sections) return null;
		return {
			...sections,
			ctaButton1Url: withTrailingSlash(sections.ctaButton1Url || "")
		};
	} catch (e) {
		fetchFailed(e, "Failed to fetch home sections:");
		return null;
	}
}
async function getPageContent(uri) {
	try {
		const raw = (await graphqlClient.query(GET_PAGE_BY_SLUG, { slug: uri })).pageBy;
		if (!raw) return null;
		return {
			id: String(raw.id || ""),
			title: raw.title || "",
			slug: raw.slug || "",
			content: raw.content || "",
			date: raw.date || "",
			modified: raw.modified || "",
			pageCta: normalizePageCta(raw.pageCta),
			seo: toSeo(raw.seo)
		};
	} catch (e) {
		fetchFailed(e, `Failed to fetch page ${uri}:`);
		return null;
	}
}
function decodeEntities(html) {
	return String(html || "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, "\"").replace(/&#0?39;/g, "'").replace(/&nbsp;/g, " ").replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code))).replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)));
}
function htmlToText(html) {
	return decodeEntities(stripHtml(html));
}
function parseContentItem(liHtml) {
	const strong = liHtml.match(/<strong[^>]*>([\s\S]*?)<\/strong>([\s\S]*)$/i);
	if (strong) {
		const title = decodeEntities(stripHtml(strong[1])).trim();
		const rest = decodeEntities(stripHtml(strong[2])).replace(/^[—–-]\s*/, "").trim();
		return {
			title,
			desc: rest,
			text: rest ? `${title} — ${rest}` : title
		};
	}
	return { text: decodeEntities(stripHtml(liHtml)).trim() };
}
function parseContentSections(html) {
	const parts = String(html || "").split(/<h[1-3][^>]*>/i);
	const introHtml = parts[0] || "";
	const introParagraphs = [];
	for (const p of introHtml.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)) {
		const t = decodeEntities(stripHtml(p[1])).trim();
		if (t) introParagraphs.push(t);
	}
	const intro = introParagraphs.length ? introParagraphs.join(" ") : decodeEntities(stripHtml(introHtml)).trim();
	const sections = [];
	for (let i = 1; i < parts.length; i++) {
		const m = parts[i].match(/^([^<]*)<\/h[1-3]>([\s\S]*)$/i);
		if (!m) continue;
		const heading = decodeEntities(stripHtml(m[1])).trim();
		const body = m[2];
		const section = {
			heading,
			paragraphs: [],
			items: []
		};
		const listMatch = body.match(/<(?:ul|ol)[^>]*>([\s\S]*?)<\/(?:ul|ol)>/i);
		if (listMatch) for (const li of listMatch[1].matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)) section.items.push(parseContentItem(li[1]));
		const noLists = body.replace(/<(?:ul|ol)[^>]*>[\s\S]*?<\/(?:ul|ol)>/gi, "");
		for (const p of noLists.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)) {
			const t = decodeEntities(stripHtml(p[1])).trim();
			if (t) section.paragraphs.push(t);
		}
		const h3s = Array.from(noLists.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/gi));
		for (const h3 of h3s) section.items.push({
			title: decodeEntities(stripHtml(h3[1])).trim(),
			desc: "",
			text: decodeEntities(stripHtml(h3[1])).trim()
		});
		sections.push(section);
	}
	return {
		intro,
		introParagraphs,
		sections
	};
}
var CF7_INPUT_TYPES = {
	text: "text",
	email: "email",
	tel: "tel",
	url: "url",
	textarea: "textarea",
	select: "select",
	radio: "radio"
};
function parseCf7Form(html) {
	const fields = [];
	const raw = String(html || "");
	const blocks = raw.match(/<(label|fieldset)[\s\S]*?<\/\1>/gi) || [];
	for (const block of blocks) {
		const tagMatch = block.match(/\[([a-z]+)(\*?)\s+([^\]]+)\]/i);
		if (!tagMatch) continue;
		const cf7Type = tagMatch[1].toLowerCase();
		if (cf7Type === "submit") continue;
		const type = CF7_INPUT_TYPES[cf7Type];
		if (!type) continue;
		const required = tagMatch[2] === "*" || type === "radio" && !/allow_empty|include_blank/i.test(tagMatch[3]);
		const rest = tagMatch[3];
		const name = rest.match(/^([a-z0-9_-]+)/i)?.[1] || "";
		if (!name) continue;
		const legend = block.match(/<legend[^>]*>([\s\S]*?)<\/legend>/i);
		let label = decodeEntities(stripHtml(legend ? legend[1] : block.replace(/^<label[^>]*>/i, "").replace(/<\/label>$/i, ""))).replace(/\[[^\]]*\]/g, "").replace(/\s*\*+\s*$/, "").trim();
		const options = type === "select" || type === "radio" ? Array.from(rest.matchAll(/"([^"]*)"/g)).map((m) => decodeEntities(m[1])) : [];
		const placeholder = rest.match(/\bplaceholder\s+"([^"]*)"/i)?.[1];
		const autocomplete = rest.match(/\bautocomplete:([a-z]+)/i)?.[1];
		const includeBlank = type === "select" && /\binclude_blank\b/i.test(rest);
		if (!label) label = name.replace(/^your-/, "").replace(/-/g, " ");
		if (includeBlank) options.unshift("");
		fields.push({
			type,
			name,
			label,
			placeholder,
			autocomplete,
			required,
			options
		});
	}
	const submit = raw.match(/\[submit\s+"([^"]*)"\]/);
	return {
		fields,
		submitLabel: submit ? decodeEntities(submit[1]).trim() : "Send"
	};
}
var DEFAULT_PROCESS_STEPS = [
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
];
async function getProcessSteps() {
	try {
		const html = (await graphqlClient.query(GET_PAGE_BY_SLUG, { slug: "/process/" })).pageBy?.content || "";
		const steps = [];
		const re = /<li>\s*<strong>\s*(\d+)\s*—\s*([^<]+?)\s*<\/strong>\s*—\s*([^<]+?)\s*<\/li>/g;
		let m;
		while ((m = re.exec(html)) !== null) steps.push({
			num: m[1],
			title: decodeEntities(m[2]).trim(),
			desc: decodeEntities(m[3]).trim()
		});
		return steps.length ? steps : DEFAULT_PROCESS_STEPS;
	} catch (e) {
		fetchFailed(e, "Failed to fetch process steps:");
		return DEFAULT_PROCESS_STEPS;
	}
}
var DEFAULT_INDUSTRIES = {
	heading: "Different Businesses. Same Digital Problem.",
	intro: "You need people to notice you. We work with businesses across multiple industries.",
	industries: [
		"Ecommerce",
		"Fashion",
		"Beauty & Cosmetics",
		"Food & Restaurants",
		"Hospitality",
		"Real Estate",
		"Education",
		"Healthcare",
		"Manufacturing",
		"Technology",
		"Startups",
		"Professional Services",
		"Retail",
		"Automotive",
		"Architecture & Interior Design",
		"Events",
		"Lifestyle",
		"Personal Brands",
		"B2B Companies"
	]
};
async function getIndustriesSection() {
	try {
		const html = (await graphqlClient.query(GET_PAGE_BY_SLUG, { slug: "/industries/" })).pageBy?.content || "";
		const heading = decodeEntities(html.match(/<h1>([^<]+)<\/h1>/)?.[1] || "").trim();
		const intro = decodeEntities(html.match(/<p>([^<]+)<\/p>/)?.[1] || "").trim();
		const listHtml = html.match(/<ul>([\s\S]*?)<\/ul>/)?.[1] || "";
		const industries = Array.from(listHtml.matchAll(/<li>([\s\S]*?)<\/li>/g)).map((li) => decodeEntities(li[1]).trim()).filter(Boolean);
		if (!industries.length) return DEFAULT_INDUSTRIES;
		return {
			heading: heading || DEFAULT_INDUSTRIES.heading,
			intro: intro || DEFAULT_INDUSTRIES.intro,
			industries
		};
	} catch (e) {
		fetchFailed(e, "Failed to fetch industries:");
		return DEFAULT_INDUSTRIES;
	}
}
//#endregion
export { getSiteText as C, parseContentSections as D, htmlToText as E, mockBrandStatement as O, getSiteSettings as S, getWhyChooseUs as T, getProjects as _, getHeroByPage as a, getSiteContact as b, getIndustriesSection as c, getPageContent as d, getPostBySlug as f, getProjectBySlug as g, getProcessSteps as h, getFeaturedProjects as i, getMenus as l, getPricingPlans as m, getContactForm as n, getHeroes as o, getPosts as p, getFaqs as r, getHomeSections as s, getBrandStatement as t, getOffices as u, getServiceBySlug as v, getTestimonials as w, getSiteData as x, getServices as y };
