export interface WordPressImageNode {
  sourceUrl: string;
  altText: string;
  width?: number;
  height?: number;
  mediaDetails?: {
    width: number;
    height: number;
    sizes: Array<{
      sourceUrl: string;
      width: number;
      height: number;
    }>;
  };
}

export interface WordPressImage {
  node: WordPressImageNode;
}

export type ImageLike =
  WordPressImage | { sourceUrl: string; altText: string; width?: number; height?: number };

export interface SEO {
  title: string;
  description: string;
  canonical: string;
  ogImage: string;
  ogTitle: string;
  ogDescription: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  company: string;
  avatar?: string;
  designation?: string;
}

export interface ContentItem {
  title?: string;
  desc?: string;
  text: string;
}

export interface ContentSection {
  heading: string;
  paragraphs: string[];
  items: ContentItem[];
}

export interface PageCta {
  title1: string;
  title2: string;
  buttonText: string;
  buttonUrl: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  uri?: string;
  menuOrder?: number;
  shortDescription: string;
  description: string;
  heroTitle?: string;
  heroDescription?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  featuredImage?: WordPressImage | null;
  gallery: WordPressImage[];
  icon?: string;
  serviceCategory?: string;
  sections: ContentSection[];
  process: string[];
  pageCta?: PageCta | null;
  seo?: SEO;
}

export interface MenuItem {
  label: string;
  url: string;
  path?: string;
  order?: number;
  target?: string;
}

export interface MenuGroup {
  primary: MenuItem[];
  footerExplore: MenuItem[];
  footerPlatforms: MenuItem[];
  footerSocial: MenuItem[];
}

export interface SiteFooter {
  footerBlurb: string;
  footerCopyright: string;
  footerCta: string;
  footerTagLine: string;
}

export interface SiteContact {
  contactEmail: string;
  contactWhatsappUrl: string;
  contactPhone: string;
  contactAddress: string;
  contactGeoLat: string;
  contactGeoLng: string;
  contactAreaServed: string;
}

/** One row of the `officeInfo` ACF group on the `office` CPT (Contact page). */
export interface Office {
  id: string;
  title: string;
  companyType: string;
  companyName: string;
  address: string;
  phone1: string;
  phone2: string;
  email: string;
  /** Google Maps embed URL (the iframe `src`) — only rendered when it is http(s). */
  mapUrl: string;
}

export interface SiteText {
  titleServices1: string;
  titleServices2: string;
  titleProjects1: string;
  titleProjects2: string;
  titleBlog1: string;
  titleBlog2: string;
  titleTestimonials1: string;
  titleTestimonials2: string;
  titleFaq: string;
  titleProcess1: string;
  titleProcess2: string;
  titleIndustries1: string;
  titleIndustries2: string;
  btnAllServices: string;
  btnViewAllProjects: string;
  btnViewAllArticles: string;
}

export interface HomeSections {
  cpTitle: string;
  cpTitleAccent: string;
  cpImage1: string;
  cpImage2: string;
  cpImage3: string;
  cpImage4: string;
  smTitle1: string;
  smTitleAccent: string;
  smTitle2: string;
  smTitle2Accent: string;
  smPlatforms: string;
  droneEyebrow: string;
  droneTitle1: string;
  droneTitle2: string;
  droneTitle3: string;
  droneBody: string;
  droneButtonLabel: string;
  droneButtonUrl: string;
  ctaTitle1: string;
  ctaTitleAccent: string;
  ctaBody: string;
  ctaButton1Label: string;
  ctaButton1Url: string;
  ctaButton2Label: string;
}

export interface Cf7Field {
  type: 'text' | 'email' | 'tel' | 'url' | 'textarea' | 'select' | 'radio';
  name: string;
  label: string;
  placeholder?: string;
  autocomplete?: string;
  required: boolean;
  options: string[];
}

export interface Cf7Form {
  id: string;
  title: string;
  form: string;
  successMessage: string;
  fields: Cf7Field[];
  submitLabel: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  clientName: string;
  clientLogo: WordPressImage;
  heroImage: WordPressImage;
  gallery: WordPressImage[];
  video: string;
  category: string[];
  servicesUsed: string[];
  challenge: string;
  strategy: string;
  execution: string;
  result: string;
  testimonial: string;
  testimonialAuthor: string;
  testimonialCompany: string;
  projectDate: string;
  location: string;
  featured: boolean;
  pageCta?: PageCta | null;
  seo: SEO;
}

export interface PostAuthor {
  name: string;
  avatar?: WordPressImage | { url: string };
}

export interface PostCategory {
  name: string;
  slug: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: WordPressImage;
  author: PostAuthor;
  categories: PostCategory[];
  tags: PostCategory[];
  publishedDate: string;
  modifiedDate: string;
  pageCta?: PageCta | null;
  seo: SEO;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  date?: string;
  modified?: string;
  pageCta?: PageCta | null;
  seo: SEO;
}

export interface Hero {
  id: string;
  title: string;
  title1: string;
  slug: string;
  selectPage: string;
  smallText: string;
  heroDescription: string;
  videoUrl: string;
  button1Label: string;
  button1PageLink: string;
  button2Label: string;
  button2PageLink: string;
}

export interface BrandStatement {
  id: string;
  slug: string;
  title: string;
  title1: string;
  title2: string;
  fullTitle: string;
  content: string;
  paragraphs: string[];
  reels: string[];
}

export interface ProcessStep {
  num: string;
  title: string;
  desc: string;
}

export interface IndustriesSectionData {
  heading: string;
  intro: string;
  industries: string[];
}
