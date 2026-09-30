import { graphqlClient } from '../graphql/client';
import { GET_SERVICES, GET_SERVICE_BY_SLUG, GET_SERVICE_SLUGS } from '../graphql/queries/services';
import {
  GET_PROJECTS,
  GET_FEATURED_PROJECTS,
  GET_PROJECT_BY_SLUG,
  GET_PROJECT_SLUGS,
} from '../graphql/queries/projects';
import { GET_POSTS, GET_POST_BY_SLUG, GET_POST_SLUGS } from '../graphql/queries/posts';
import {
  GET_HOME_PAGE,
  GET_PAGE_BY_SLUG,
  GET_HOME_SECTIONS,
  GET_SITE_DATA,
  GET_WHY_CHOOSE_US,
} from '../graphql/queries/pages';
import { GET_CONTACT_FORM, GET_OFFICES } from '../graphql/queries/contact';
import { GET_PRICING_PLANS } from '../graphql/queries/pricing';
import { GET_SITE_SETTINGS } from '../graphql/queries/settings';
import { GET_ALL_HEROS } from '../graphql/queries/heroes';
import { GET_BRAND_STATEMENTS } from '../graphql/queries/brandStatement';
import { GET_MENUS } from '../graphql/queries/menus';
import { GET_FAQS } from '../graphql/queries/faqs';
import { GET_TESTIMONIALS } from '../graphql/queries/testimonials';
import type {
  Service,
  Project,
  Post,
  WordPressImage,
  SEO,
  FAQ,
  Testimonial,
  MenuItem,
  MenuGroup,
  SiteFooter,
  ProcessStep,
  IndustriesSectionData,
  ContentItem,
  ContentSection,
  PageCta,
  SiteContact,
  SiteText,
  HomeSections,
  Cf7Form,
  Cf7Field,
  Page,
  Office,
  PricingPlan,
} from '../types';
import { mockServices } from './mock-data/services';
import { mockProjects } from './mock-data/projects';
import { mockPosts } from './mock-data/posts';
import { mockHeroes } from './mock-data/heroes';
import { mockBrandStatement } from './mock-data/brandStatement';
import type { Hero, BrandStatement } from '../types';

const USE_MOCK_DATA =
  !import.meta.env.WORDPRESS_GRAPHQL_URL ||
  import.meta.env.WORDPRESS_GRAPHQL_URL === 'https://example.com/graphql';

/**
 * Shared catch handler. Strict mode must be active while `astro build`
 * prerenders pages (CI sets STRICT_FETCH=1 for the build process) so broken
 * WordPress data fails the build loudly — but it must NOT be baked into the
 * deployed bundle, or every SSR request would hard-fail whenever WordPress
 * is unreachable. Hence the second condition: the running server only goes
 * strict if its own process env opts in (never do this on cPanel — the site
 * must degrade gracefully and serve stale content instead).
 */
function fetchFailed(error: unknown, message: string): void {
  const runtimeEnv = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env;
  const strict = import.meta.env.STRICT_FETCH === '1' && runtimeEnv?.STRICT_FETCH === '1';
  if (strict) throw error;
  console.error(message, error);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toSeo(raw: any): SEO {
  return {
    title: raw?.title || '',
    description: raw?.description || '',
    canonical: raw?.canonical || '',
    ogImage: raw?.ogImage || '',
    ogTitle: raw?.ogTitle || '',
    ogDescription: raw?.ogDescription || '',
    twitterTitle: raw?.twitterTitle || '',
    twitterDescription: raw?.twitterDescription || '',
    twitterImage: raw?.twitterImage || '',
  };
}

function stripHtml(html: string): string {
  return String(html || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Internal WordPress links often ship without a trailing slash (`/contact`).
 * The server then answers with a redirect, which feels like the page
 * "automatically jumping" elsewhere — normalize internal hrefs at the source.
 */
export function withTrailingSlash(href: string): string {
  if (!href || !href.startsWith('/') || href.includes('#') || href.includes('?')) return href;
  return href.endsWith('/') ? href : `${href}/`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizePost(raw: Record<string, any>): Post {
  return {
    id: raw.id || '',
    title: raw.title || '',
    slug: raw.slug || '',
    excerpt: raw.excerpt || '',
    content: raw.content || '',
    featuredImage: raw.featuredImage || { node: { sourceUrl: '', altText: '' } },
    author: raw.author?.node || raw.author || { name: 'Unknown' },
    categories: Array.isArray(raw.categories) ? raw.categories : raw.categories?.nodes || [],
    tags: Array.isArray(raw.tags) ? raw.tags : raw.tags?.nodes || [],
    publishedDate: raw.publishedDate || raw.date || '',
    modifiedDate: raw.modifiedDate || raw.modified || '',
    pageCta: normalizePageCta(raw.pageCta),
    seo: toSeo(raw.seo),
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeProject(raw: Record<string, any>): Project {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const info = raw.projectInfo as any;
  const gallery: WordPressImage[] = ['galleryUrl1', 'galleryUrl2', 'galleryUrl3', 'galleryUrl4']
    .map((key) => info?.[key])
    .filter(Boolean)
    .map((url: string) => ({ node: { sourceUrl: url, altText: raw.title || '' } }));
  const heroImage: WordPressImage =
    raw.featuredImage ||
    (gallery[0]
      ? { node: { ...gallery[0].node, width: 1600, height: 900 } }
      : { node: { sourceUrl: '', altText: '' } });
  const servicesUsed: string[] = Array.isArray(info?.serviceUsed)
    ? info.serviceUsed
    : typeof info?.serviceUsed === 'string' && info.serviceUsed
      ? info.serviceUsed
          .split(',')
          .map((s: string) => s.trim())
          .filter(Boolean)
      : [];

  return {
    id: String(raw.id || ''),
    title: raw.title || '',
    slug: raw.slug || '',
    clientName: info?.clientName || '',
    clientLogo: { node: { sourceUrl: '', altText: '' } },
    heroImage,
    gallery,
    video: '',
    category: Array.isArray(raw.projectCategories?.nodes)
      ? raw.projectCategories.nodes.map((c: { name: string }) => c.name)
      : [],
    servicesUsed,
    challenge: info?.challenge || '',
    strategy: info?.idea || '',
    execution: info?.execution || '',
    result: info?.results || '',
    testimonial: '',
    testimonialAuthor: '',
    testimonialCompany: '',
    projectDate: info?.projectDate || '',
    location: info?.location || '',
    featured: Boolean(info?.featured),
    pageCta: normalizePageCta(raw.pageCta),
    seo: toSeo(raw.seo),
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizePageCta(raw: any): PageCta | null {
  if (!raw || (!raw.pageCtaTitle1 && !raw.pageCtaTitle2 && !raw.pageCtaButtonText)) return null;
  return {
    title1: raw.pageCtaTitle1 || '',
    title2: raw.pageCtaTitle2 || '',
    buttonText: raw.pageCtaButtonText || '',
    buttonUrl: withTrailingSlash(raw.pageCtaButtonUrl || ''),
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeService(raw: Record<string, any>): Service {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const links = raw.serviceMenuLinks as any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const page = raw.servicePage as any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const galleryFields = raw.serviceGallery as any;
  const { intro, sections } = parseContentSections(raw.content || '');

  // Process lives in WP content as "Idea → Concept → ..." under a Process heading.
  let process: string[] = [];
  const processSection = sections.find((s) => /process/i.test(s.heading));
  const arrowIndex = processSection
    ? processSection.paragraphs.findIndex((p) => p.includes('→'))
    : -1;
  if (processSection && arrowIndex >= 0) {
    process = processSection.paragraphs[arrowIndex]
      .split('→')
      .map((s) => s.trim())
      .filter(Boolean);
    processSection.paragraphs.splice(arrowIndex, 1);
  }

  const img = raw.featuredImage?.node;
  const featuredImage = img
    ? {
        node: {
          sourceUrl: img.sourceUrl,
          altText: img.altText || '',
          width: img.mediaDetails?.width || img.width,
          height: img.mediaDetails?.height || img.height,
        },
      }
    : null;

  const gallery: WordPressImage[] = ['galleryUrl1', 'galleryUrl2', 'galleryUrl3', 'galleryUrl4']
    .map((key) => galleryFields?.[key])
    .filter(Boolean)
    .map((url: string) => ({ node: { sourceUrl: url, altText: raw.title || '' } }));

  return {
    id: String(raw.id || ''),
    title: raw.title || '',
    slug: raw.slug || '',
    uri: raw.uri || '',
    menuOrder: typeof raw.menuOrder === 'number' ? raw.menuOrder : undefined,
    shortDescription: links?.serviceShortDescription || stripHtml(raw.excerpt || ''),
    description: intro || page?.heroDescription || stripHtml(raw.excerpt || ''),
    heroTitle: page?.heroTitle || '',
    heroDescription: page?.heroDescription || '',
    ctaLabel: page?.ctaLabel || '',
    ctaUrl: withTrailingSlash(page?.ctaUrl || ''),
    featuredImage,
    gallery,
    icon: links?.serviceMenuIcon || '',
    serviceCategory: raw.serviceCategories?.nodes?.[0]?.name || '',
    sections,
    process,
    pageCta: normalizePageCta(raw.pageCta),
    seo: raw.seo
      ? {
          ...toSeo(raw.seo),
          title: raw.seo.title || page?.seoTitle || '',
          description: raw.seo.description || page?.seoDescription || '',
        }
      : undefined,
  };
}

export async function getSiteSettings() {
  if (USE_MOCK_DATA) {
    return {
      title: 'The Digital Echo',
      description: 'Digital Marketing & Content Production',
      url: 'http://localhost:4321',
      logo: import.meta.env.PUBLIC_LOGO_URL || null,
    };
  }
  try {
    const data = await graphqlClient.query<{
      generalSettings: { title: string; description: string; url: string };
    }>(GET_SITE_SETTINGS);
    const settings = data.generalSettings;

    return {
      title: settings.title || 'The Digital Echo',
      description: settings.description || 'Digital Marketing & Content Production',
      url: settings.url || 'http://localhost:4321',
      logo: import.meta.env.PUBLIC_LOGO_URL || null,
    };
  } catch (e) {
    fetchFailed(e, 'Failed to fetch site settings:');
    return {
      title: 'The Digital Echo',
      description: 'Digital Marketing & Content Production',
      url: 'http://localhost:4321',
      logo: import.meta.env.PUBLIC_LOGO_URL || null,
    };
  }
}

export async function getServices(): Promise<Service[]> {
  if (USE_MOCK_DATA) return mockServices;
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = await graphqlClient.query<{ services: { nodes: any[] } }>(GET_SERVICES);
    const nodes = data.services.nodes.map(normalizeService);
    return nodes.length ? nodes : mockServices;
  } catch (e) {
    fetchFailed(e, 'Failed to fetch services, using mock data:');
    return mockServices;
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  if (USE_MOCK_DATA) return mockServices.find((s) => s.slug === slug) || null;
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = await graphqlClient.query<{ serviceBy: any }>(GET_SERVICE_BY_SLUG, { slug });
    if (data.serviceBy) return normalizeService(data.serviceBy);
    return mockServices.find((s) => s.slug === slug) || null;
  } catch (e) {
    fetchFailed(e, 'Failed to fetch service, using mock data:');
    return mockServices.find((s) => s.slug === slug) || null;
  }
}

export async function getServiceSlugs(): Promise<string[]> {
  if (USE_MOCK_DATA) return mockServices.map((s) => s.slug);
  try {
    const data = await graphqlClient.query<{ services: { nodes: { slug: string }[] } }>(
      GET_SERVICE_SLUGS,
    );
    const slugs = data.services.nodes.map((s) => s.slug);
    return slugs.length ? slugs : mockServices.map((s) => s.slug);
  } catch (e) {
    fetchFailed(e, 'Failed to fetch service slugs, using mock data:');
    return mockServices.map((s) => s.slug);
  }
}

// NOTE: projects/testimonials are seeded as DRAFT samples in WordPress (contents.md
// forbids fabricated case studies going live). Unauthenticated GraphQL cannot see
// drafts, so an empty response falls back to the front-end mock content until real
// client work is published.
export async function getProjects(): Promise<Project[]> {
  if (USE_MOCK_DATA) return mockProjects;
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = await graphqlClient.query<{ projects: { nodes: any[] } }>(GET_PROJECTS);
    const nodes = data.projects.nodes.map(normalizeProject);
    return nodes.length ? nodes : mockProjects;
  } catch (e) {
    fetchFailed(e, 'Failed to fetch projects, using mock data:');
    return mockProjects;
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  if (USE_MOCK_DATA) return mockProjects.filter((p) => p.featured);
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = await graphqlClient.query<{ projects: { nodes: any[] } }>(GET_FEATURED_PROJECTS);
    const nodes = data.projects.nodes.map(normalizeProject).filter((p) => p.featured);
    return nodes.length ? nodes : mockProjects.filter((p) => p.featured);
  } catch (e) {
    fetchFailed(e, 'Failed to fetch featured projects, using mock data:');
    return mockProjects.filter((p) => p.featured);
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (USE_MOCK_DATA) return mockProjects.find((p) => p.slug === slug) || null;
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = await graphqlClient.query<{ projectBy: any }>(GET_PROJECT_BY_SLUG, { slug });
    if (data.projectBy) return normalizeProject(data.projectBy);
    return mockProjects.find((p) => p.slug === slug) || null;
  } catch (e) {
    fetchFailed(e, 'Failed to fetch project, using mock data:');
    return mockProjects.find((p) => p.slug === slug) || null;
  }
}

export async function getProjectSlugs(): Promise<string[]> {
  if (USE_MOCK_DATA) return mockProjects.map((p) => p.slug);
  try {
    const data = await graphqlClient.query<{ projects: { nodes: { slug: string }[] } }>(
      GET_PROJECT_SLUGS,
    );
    const slugs = data.projects.nodes.map((p) => p.slug);
    return slugs.length ? slugs : mockProjects.map((p) => p.slug);
  } catch (e) {
    fetchFailed(e, 'Failed to fetch project slugs, using mock data:');
    return mockProjects.map((p) => p.slug);
  }
}

export async function getPosts(
  first = 10,
  after?: string,
): Promise<{ posts: Post[]; hasNextPage: boolean; endCursor: string }> {
  if (USE_MOCK_DATA) return { posts: mockPosts, hasNextPage: false, endCursor: '' };
  try {
    const data = await graphqlClient.query<{
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      posts: { nodes: any[]; pageInfo: { hasNextPage: boolean; endCursor: string } };
    }>(GET_POSTS, { first, after });
    return { posts: data.posts.nodes.map(normalizePost), ...data.posts.pageInfo };
  } catch (e) {
    fetchFailed(e, 'Failed to fetch posts, using mock data:');
    return { posts: mockPosts, hasNextPage: false, endCursor: '' };
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (USE_MOCK_DATA) return mockPosts.find((p) => p.slug === slug) || null;
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = await graphqlClient.query<{ postBy: any }>(GET_POST_BY_SLUG, { slug });
    return data.postBy ? normalizePost(data.postBy) : null;
  } catch (e) {
    fetchFailed(e, 'Failed to fetch post, using mock data:');
    return mockPosts.find((p) => p.slug === slug) || null;
  }
}

export async function getPostSlugs(): Promise<string[]> {
  if (USE_MOCK_DATA) return mockPosts.map((p) => p.slug);
  try {
    const data = await graphqlClient.query<{ posts: { nodes: { slug: string }[] } }>(
      GET_POST_SLUGS,
    );
    return data.posts.nodes.map((p) => p.slug);
  } catch (e) {
    fetchFailed(e, 'Failed to fetch post slugs, using mock data:');
    return mockPosts.map((p) => p.slug);
  }
}

export async function getHomePage() {
  if (USE_MOCK_DATA) {
    return {
      services: mockServices.slice(0, 6),
      featuredProjects: mockProjects.filter((p) => p.featured),
      recentPosts: mockPosts.slice(0, 3),
    };
  }
  try {
    const data = await graphqlClient.query(GET_HOME_PAGE);
    return data;
  } catch (e) {
    fetchFailed(e, 'Failed to fetch home page, using mock data:');
    return {
      services: mockServices.slice(0, 6),
      featuredProjects: mockProjects.filter((p) => p.featured),
      recentPosts: mockPosts.slice(0, 3),
    };
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeHero(raw: Record<string, any>): Hero {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const section = raw.heroSection as any;
  return {
    id: String(raw.id || ''),
    title: String(raw.title || ''),
    slug: String(raw.slug || ''),
    selectPage: String(section?.selectPage || ''),
    smallText: String(section?.smallText || ''),
    title1: String(section?.title1 || ''),
    heroDescription: String(raw.content || '').replace(/<\/?p[^>]*>/gi, ''),
    videoUrl: String(section?.videoUrl || ''),
    button1Label: String(section?.button1Label || ''),
    button1PageLink: withTrailingSlash(String(section?.button1PageLink || '')),
    button2Label: String(section?.button2Label || ''),
    button2PageLink: withTrailingSlash(String(section?.button2PageLink || '')),
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getHeroEdges(data: any): Record<string, unknown>[] {
  return data?.heroes?.edges?.map((e: { node: Record<string, unknown> }) => e.node) || [];
}

export async function getHeroByPage(selectPage: string): Promise<Hero | null> {
  if (USE_MOCK_DATA) return mockHeroes.find((h) => h.selectPage === selectPage) || null;
  try {
    const data = await graphqlClient.query<{
      heroes: { edges: { node: Record<string, unknown> }[] };
    }>(GET_ALL_HEROS);
    const allEdges = getHeroEdges(data);
    const match = allEdges.find((node) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const section = node.heroSection as any;
      return section?.selectPage === selectPage;
    });
    return match ? normalizeHero(match) : null;
  } catch (e) {
    fetchFailed(e, 'Failed to fetch hero, using mock data:');
    return mockHeroes.find((h) => h.selectPage === selectPage) || null;
  }
}

export async function getHeroes(): Promise<Hero[]> {
  if (USE_MOCK_DATA) return mockHeroes;
  try {
    const data = await graphqlClient.query<{
      heroes: { edges: { node: Record<string, unknown> }[] };
    }>(GET_ALL_HEROS);
    return getHeroEdges(data).map(normalizeHero);
  } catch (e) {
    fetchFailed(e, 'Failed to fetch heroes, using mock data:');
    return mockHeroes;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toMediaUrl(value: any): string {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (typeof value.url === 'string') return value.url;
  if (typeof value.node?.url === 'string') return value.node.url;
  if (typeof value.node?.sourceUrl === 'string') return value.node.sourceUrl;
  return '';
}

function splitParagraphs(html: string): string[] {
  const blocks = html.match(/<p[^>]*>[\s\S]*?<\/p>/gi);
  if (blocks?.length) {
    return blocks
      .map((b) =>
        b
          .replace(/^<p[^>]*>/i, '')
          .replace(/<\/p>$/i, '')
          .trim(),
      )
      .filter(Boolean);
  }
  const plain = html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return plain ? [plain] : [];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeBrandStatement(raw: Record<string, any>): BrandStatement {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const section = raw.brandStatementsSection as any;
  const title = String(raw.title || '');
  const title1 = String(section?.title1 || '');
  const title2 = String(section?.title2 || '');
  const content = String(raw.content || '');
  const reels = ['reel1', 'reel2', 'reel3', 'reel4', 'reel5', 'reel6']
    .map((key) => toMediaUrl(section?.[key]))
    .filter(Boolean);

  return {
    id: String(raw.id || ''),
    slug: String(raw.slug || ''),
    title,
    title1,
    title2,
    fullTitle: [title, title1, title2].filter(Boolean).join(' '),
    content,
    paragraphs: splitParagraphs(content),
    reels,
  };
}

export async function getBrandStatement(): Promise<BrandStatement> {
  if (USE_MOCK_DATA) return mockBrandStatement;
  try {
    const data = await graphqlClient.query<{
      brandstatements?: { edges?: { node: Record<string, unknown> }[] };
    }>(GET_BRAND_STATEMENTS);
    const match = data?.brandstatements?.edges?.[0]?.node;
    if (!match) return mockBrandStatement;
    const statement = normalizeBrandStatement(match);
    return statement.reels.length ? statement : { ...statement, reels: mockBrandStatement.reels };
  } catch (e) {
    fetchFailed(e, 'Failed to fetch brand statement, using mock data:');
    return mockBrandStatement;
  }
}

const EMPTY_MENUS: MenuGroup = {
  primary: [],
  footerExplore: [],
  footerPlatforms: [],
  footerSocial: [],
};

function slugToGroup(slug: string): keyof MenuGroup | null {
  switch (slug) {
    case 'primary':
      return 'primary';
    case 'footer-explore':
      return 'footerExplore';
    case 'footer-platforms':
      return 'footerPlatforms';
    case 'footer-social':
      return 'footerSocial';
    default:
      return null;
  }
}

export async function getMenus(): Promise<MenuGroup> {
  if (USE_MOCK_DATA) return EMPTY_MENUS;
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = await graphqlClient.query<{ menus: { nodes: any[] } }>(GET_MENUS);
    const groups: MenuGroup = { ...EMPTY_MENUS };
    for (const menu of data.menus.nodes) {
      const key = slugToGroup(menu.slug);
      if (!key) continue;
      const items: MenuItem[] = (menu.menuItems?.nodes || [])
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((n: any): MenuItem => ({
          label: n.label || '',
          url: withTrailingSlash(n.url || n.uri || n.path || ''),
          path: n.path || '',
          order: typeof n.order === 'number' ? n.order : undefined,
          target: n.target || '',
        }))
        .sort((a: MenuItem, b: MenuItem) => (a.order ?? 0) - (b.order ?? 0));
      groups[key] = items;
    }
    return groups;
  } catch (e) {
    fetchFailed(e, 'Failed to fetch menus:');
    return EMPTY_MENUS;
  }
}

export async function getFaqs(): Promise<FAQ[]> {
  if (USE_MOCK_DATA) return [];
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = await graphqlClient.query<{ faqs: { nodes: any[] } }>(GET_FAQS);
    return (
      data.faqs.nodes
        .slice()
        .sort((a, b) => (a.menuOrder ?? 0) - (b.menuOrder ?? 0))
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((n: any): FAQ => ({
          question: n.title || '',
          answer: stripHtml(n.content || ''),
        }))
    );
  } catch (e) {
    fetchFailed(e, 'Failed to fetch FAQs:');
    return [];
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  if (USE_MOCK_DATA) return [];
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = await graphqlClient.query<{ testimonials: { nodes: any[] } }>(GET_TESTIMONIALS);
    const items: Testimonial[] = data.testimonials.nodes
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((n: any): Testimonial => ({
        quote: n.testimonialInfo?.quote || '',
        author: n.testimonialInfo?.clientName || n.title || '',
        company: n.testimonialInfo?.companyName || '',
        avatar: n.testimonialInfo?.photoUrl || undefined,
        designation: n.testimonialInfo?.designation || undefined,
      }))
      .filter((t) => t.quote);
    // Draft samples are invisible to unauthenticated queries — client sees [] until publishing.
    return items;
  } catch (e) {
    fetchFailed(e, 'Failed to fetch testimonials:');
    return [];
  }
}

interface SiteData {
  footer: SiteFooter;
  contact: SiteContact;
  text: SiteText;
}

const DEFAULT_CONTACT: SiteContact = {
  contactEmail: '',
  contactWhatsappUrl: '',
  contactWhatsappNumber: '',
  contactPhone: '',
  contactAddress: '',
  contactGeoLat: '',
  contactGeoLng: '',
  contactAreaServed: '',
  contactSocialInstagram: '',
  contactSocialFacebook: '',
  contactSocialLinkedin: '',
  contactSocialYoutube: '',
};

const DEFAULT_SITE_TEXT: SiteText = {
  titleServices1: 'Our',
  titleServices2: 'Services',
  titleProjects1: 'Selected',
  titleProjects2: 'Work',
  titleBlog1: 'Latest',
  titleBlog2: 'Journal',
  titleTestimonials1: 'Words from our',
  titleTestimonials2: 'Clients',
  titleFaq: 'Frequently Asked Questions',
  titleProcess1: 'Our',
  titleProcess2: 'Process',
  titleIndustries1: 'Industries',
  titleIndustries2: 'We Serve',
  btnAllServices: 'View all services',
  btnViewAllProjects: 'View all work',
  btnViewAllArticles: 'View all articles',
};

export async function getSiteData(): Promise<SiteData> {
  const fallback: SiteData = {
    footer: {
      footerBlurb: '',
      footerCopyright: `© ${new Date().getFullYear()} The Digital Echo. All Rights Reserved.`,
      footerCta: '',
      footerTagLine: 'CREATE. CONNECT. ECHO.',
    },
    contact: DEFAULT_CONTACT,
    text: DEFAULT_SITE_TEXT,
  };
  if (USE_MOCK_DATA) return fallback;
  try {
    const data = await graphqlClient.query<{
      pageBy?: {
        siteFooter?: Partial<SiteFooter> | null;
        siteContact?: Partial<SiteContact> | null;
        siteText?: Partial<SiteText> | null;
      } | null;
    }>(GET_SITE_DATA);
    const page = data.pageBy;
    if (!page) return fallback;
    // ACF returns null for empty fields — never let null overwrite defaults.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const compact = (obj: Record<string, any> | null | undefined): Record<string, any> =>
      Object.fromEntries(
        Object.entries(obj || {}).filter(([, v]) => v !== null && v !== undefined),
      );
    return {
      footer: {
        footerBlurb: page.siteFooter?.footerBlurb || '',
        footerCopyright: page.siteFooter?.footerCopyright || fallback.footer.footerCopyright,
        footerCta: page.siteFooter?.footerCta || '',
        footerTagLine: page.siteFooter?.footerTagLine || fallback.footer.footerTagLine,
      },
      contact: { ...DEFAULT_CONTACT, ...compact(page.siteContact) },
      text: { ...DEFAULT_SITE_TEXT, ...compact(page.siteText) },
    };
  } catch (e) {
    fetchFailed(e, 'Failed to fetch site data:');
    return fallback;
  }
}

export async function getSiteFooter(): Promise<SiteFooter> {
  return (await getSiteData()).footer;
}

export async function getSiteContact(): Promise<SiteContact> {
  return (await getSiteData()).contact;
}

export async function getSiteText(): Promise<SiteText> {
  return (await getSiteData()).text;
}

export async function getContactForm(): Promise<Cf7Form | null> {
  if (USE_MOCK_DATA) return null;
  try {
    const data = await graphqlClient.query<{
      tdeContactForm?: { id: string; title: string; form: string; successMessage: string } | null;
    }>(GET_CONTACT_FORM);
    const form = data.tdeContactForm;
    if (!form) return null;
    const parsed = parseCf7Form(form.form || '');
    return {
      id: String(form.id || ''),
      title: decodeEntities(stripHtml(form.title || '')).trim(),
      form: form.form || '',
      successMessage: form.successMessage || '',
      ...parsed,
    };
  } catch (e) {
    fetchFailed(e, 'Failed to fetch contact form:');
    return null;
  }
}

/**
 * Contact page offices (`office` CPT → `officeInfo` ACF group).
 * `companyType` is an ACF select, which WPGraphQL exposes as `[String]`
 * even for single-select — normalize to a plain string.
 */
export async function getOffices(): Promise<Office[]> {
  if (USE_MOCK_DATA) return [];
  try {
    const data = await graphqlClient.query<{
      offices?: { nodes?: Array<Record<string, unknown> | null> | null } | null;
    }>(GET_OFFICES);
    const nodes = data.offices?.nodes || [];

    const str = (v: unknown): string => (Array.isArray(v) ? String(v[0] ?? '') : String(v ?? ''));

    return nodes
      .filter((n): n is Record<string, unknown> => Boolean(n))
      .map((n): Office => {
        const info = (n.officeInfo || {}) as Record<string, unknown>;
        const address = str(info.address)
          .replace(/<br\s*\/?>/gi, '\n')
          .replace(/<[^>]+>/g, '')
          .trim();
        const mapEmbedUrl = str(info.mapEmbedUrl).trim();
        return {
          id: str(n.id),
          title: str(n.title),
          companyType: str(info.companyType).trim(),
          // Fall back to the post title when the ACF Company Name is empty.
          companyName: str(info.companyName).trim() || str(n.title).trim(),
          address,
          phone1: str(info.phone1).trim(),
          phone2: str(info.phone2).trim(),
          email: str(info.email).trim(),
          mapUrl: /^https?:\/\//i.test(mapEmbedUrl) ? mapEmbedUrl : '',
        };
      })
      .filter((o) =>
        Boolean(o.companyName || o.address || o.phone1 || o.phone2 || o.email || o.mapUrl),
      );
  } catch (e) {
    fetchFailed(e, 'Failed to fetch offices:');
    return [];
  }
}

/**
 * Pricing page plans (`plan` CPT → `planInfo` ACF group), ordered by the
 * Order field. Drafts are never returned (published plans only).
 */
export async function getPricingPlans(): Promise<PricingPlan[]> {
  if (USE_MOCK_DATA) return [];
  try {
    const data = await graphqlClient.query<{
      plans?: { nodes?: Array<Record<string, unknown> | null> | null } | null;
    }>(GET_PRICING_PLANS);
    const nodes = data.plans?.nodes || [];

    const str = (v: unknown): string => (Array.isArray(v) ? String(v[0] ?? '') : String(v ?? ''));
    const toLines = (v: unknown): string[] =>
      str(v)
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<[^>]+>/g, '')
        .split(/\r?\n/)
        .map((line) => line.replace(/^[-•*]\s*/, '').trim())
        .filter(Boolean);

    return nodes
      .filter((n): n is Record<string, unknown> => Boolean(n))
      .map((n): PricingPlan => {
        const info = (n.planInfo || {}) as Record<string, unknown>;
        const ctaUrl = str(info.planCtaUrl).trim();
        return {
          id: str(n.id),
          title: str(n.title).trim(),
          price: str(info.planPrice).trim(),
          period: str(info.planPeriod).trim(),
          summary: toLines(info.planSummary).join('\n'),
          features: toLines(info.planFeatures),
          badge: str(info.planBadge).trim(),
          highlighted: info.planHighlight === true || info.planHighlight === 1,
          ctaLabel: str(info.planCtaLabel).trim(),
          ctaUrl: withTrailingSlash(ctaUrl) || '/contact/',
        };
      })
      .filter((plan) => Boolean(plan.title));
  } catch (e) {
    fetchFailed(e, 'Failed to fetch pricing plans:');
    return [];
  }
}

export async function getWhyChooseUs(): Promise<{
  heading: string;
  paragraphs: string[];
  items: ContentItem[];
}> {
  const empty = { heading: 'Why Choose Us', paragraphs: [], items: [] };
  if (USE_MOCK_DATA) return empty;
  try {
    const data = await graphqlClient.query<{ pageBy?: { content?: string } | null }>(
      GET_WHY_CHOOSE_US,
    );
    const parsed = parseContentSections(data.pageBy?.content || '');
    const section = parsed.sections[0];
    if (!section) return { ...empty, paragraphs: parsed.introParagraphs };
    return {
      heading: section.heading || empty.heading,
      paragraphs: section.paragraphs,
      items: section.items,
    };
  } catch (e) {
    fetchFailed(e, 'Failed to fetch why-choose-us:');
    return empty;
  }
}

export async function getHomeSections(): Promise<HomeSections | null> {
  if (USE_MOCK_DATA) return null;
  try {
    const data = await graphqlClient.query<{
      pageBy?: { homeSections?: HomeSections | null } | null;
    }>(GET_HOME_SECTIONS);
    const sections = data.pageBy?.homeSections || null;
    if (!sections) return null;
    return { ...sections, ctaButton1Url: withTrailingSlash(sections.ctaButton1Url || '') };
  } catch (e) {
    fetchFailed(e, 'Failed to fetch home sections:');
    return null;
  }
}

export async function getPageContent(uri: string): Promise<Page | null> {
  if (USE_MOCK_DATA) return null;
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = await graphqlClient.query<{ pageBy?: Record<string, any> | null }>(
      GET_PAGE_BY_SLUG,
      { slug: uri },
    );
    const raw = data.pageBy;
    if (!raw) return null;
    return {
      id: String(raw.id || ''),
      title: raw.title || '',
      slug: raw.slug || '',
      content: raw.content || '',
      date: raw.date || '',
      modified: raw.modified || '',
      pageCta: normalizePageCta(raw.pageCta),
      seo: toSeo(raw.seo),
    };
  } catch (e) {
    fetchFailed(e, `Failed to fetch page ${uri}:`);
    return null;
  }
}

function decodeEntities(html: string): string {
  return String(html || '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)));
}

/** HTML → plain text (tags stripped, entities decoded). */
export function htmlToText(html: string): string {
  return decodeEntities(stripHtml(html));
}

/**
 * Parse an editor `<li>` into a content item.
 * Handles `<li><strong>Title</strong> — description</li>` and plain `<li>text</li>`.
 */
function parseContentItem(liHtml: string): ContentItem {
  const strong = liHtml.match(/<strong[^>]*>([\s\S]*?)<\/strong>([\s\S]*)$/i);
  if (strong) {
    const title = decodeEntities(stripHtml(strong[1])).trim();
    const rest = decodeEntities(stripHtml(strong[2]))
      .replace(/^[—–-]\s*/, '')
      .trim();
    return { title, desc: rest, text: rest ? `${title} — ${rest}` : title };
  }
  const text = decodeEntities(stripHtml(liHtml)).trim();
  return { text };
}

/**
 * Split WP editor HTML into an intro (content before the first heading) plus
 * heading sections. Each section carries paragraphs and list items.
 * Used by the About page and service detail pages (client edits HTML in WP).
 */
export function parseContentSections(html: string): {
  intro: string;
  introParagraphs: string[];
  sections: ContentSection[];
} {
  const clean = String(html || '');
  const parts = clean.split(/<h[1-3][^>]*>/i);
  const introHtml = parts[0] || '';
  const introParagraphs: string[] = [];
  for (const p of introHtml.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)) {
    const t = decodeEntities(stripHtml(p[1])).trim();
    if (t) introParagraphs.push(t);
  }
  const intro = introParagraphs.length
    ? introParagraphs.join(' ')
    : decodeEntities(stripHtml(introHtml)).trim();

  const sections: ContentSection[] = [];
  for (let i = 1; i < parts.length; i++) {
    const m = parts[i].match(/^([^<]*)<\/h[1-3]>([\s\S]*)$/i);
    if (!m) continue;
    const heading = decodeEntities(stripHtml(m[1])).trim();
    const body = m[2];
    const section: ContentSection = { heading, paragraphs: [], items: [] };

    const listMatch = body.match(/<(?:ul|ol)[^>]*>([\s\S]*?)<\/(?:ul|ol)>/i);
    if (listMatch) {
      for (const li of listMatch[1].matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)) {
        section.items.push(parseContentItem(li[1]));
      }
    }

    const noLists = body.replace(/<(?:ul|ol)[^>]*>[\s\S]*?<\/(?:ul|ol)>/gi, '');
    for (const p of noLists.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)) {
      const t = decodeEntities(stripHtml(p[1])).trim();
      if (t) section.paragraphs.push(t);
    }
    // h3 title/description pairs (e.g. Cookie Policy "Cookies We Use" cards)
    const h3s = Array.from(noLists.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/gi));
    for (const h3 of h3s) {
      section.items.push({
        title: decodeEntities(stripHtml(h3[1])).trim(),
        desc: '',
        text: decodeEntities(stripHtml(h3[1])).trim(),
      });
    }

    sections.push(section);
  }
  return { intro, introParagraphs, sections };
}

/** Map a CF7 shortcode type to an input kind used by the contact form. */
const CF7_INPUT_TYPES: Record<string, Cf7Field['type']> = {
  text: 'text',
  email: 'email',
  tel: 'tel',
  url: 'url',
  textarea: 'textarea',
  select: 'select',
  radio: 'radio',
};

/**
 * Parse Contact Form 7 form markup into structured fields so labels,
 * placeholders, options and required flags come from the CF7 editor.
 */
function parseCf7Form(html: string): { fields: Cf7Field[]; submitLabel: string } {
  const fields: Cf7Field[] = [];
  const raw = String(html || '');

  const blocks = raw.match(/<(label|fieldset)[\s\S]*?<\/\1>/gi) || [];
  for (const block of blocks) {
    const tagMatch = block.match(/\[([a-z]+)(\*?)\s+([^\]]+)\]/i);
    if (!tagMatch) continue;
    const cf7Type = tagMatch[1].toLowerCase();
    if (cf7Type === 'submit') continue;
    const type = CF7_INPUT_TYPES[cf7Type];
    if (!type) continue;

    const required =
      tagMatch[2] === '*' || (type === 'radio' && !/allow_empty|include_blank/i.test(tagMatch[3]));
    const rest = tagMatch[3];
    const name = rest.match(/^([a-z0-9_-]+)/i)?.[1] || '';
    if (!name) continue;

    const legend = block.match(/<legend[^>]*>([\s\S]*?)<\/legend>/i);
    const labelHtml = legend
      ? legend[1]
      : block.replace(/^<label[^>]*>/i, '').replace(/<\/label>$/i, '');
    let label = decodeEntities(stripHtml(labelHtml))
      .replace(/\[[^\]]*\]/g, '')
      .replace(/\s*\*+\s*$/, '')
      .trim();

    const options =
      type === 'select' || type === 'radio'
        ? Array.from(rest.matchAll(/"([^"]*)"/g)).map((m) => decodeEntities(m[1]))
        : [];
    const placeholder = rest.match(/\bplaceholder\s+"([^"]*)"/i)?.[1];
    const autocomplete = rest.match(/\bautocomplete:([a-z]+)/i)?.[1];
    const includeBlank = type === 'select' && /\binclude_blank\b/i.test(rest);

    if (!label) label = name.replace(/^your-/, '').replace(/-/g, ' ');
    if (includeBlank) options.unshift('');

    fields.push({ type, name, label, placeholder, autocomplete, required, options });
  }

  const submit = raw.match(/\[submit\s+"([^"]*)"\]/);
  const submitLabel = submit ? decodeEntities(submit[1]).trim() : 'Send';
  return { fields, submitLabel };
}

const DEFAULT_PROCESS_STEPS: ProcessStep[] = [
  { num: '01', title: 'Discovery', desc: 'We learn your brand, goals, and audience.' },
  { num: '02', title: 'Strategy', desc: 'We craft a plan that actually works.' },
  { num: '03', title: 'Create', desc: 'We produce content that stops the scroll.' },
  { num: '04', title: 'Echo', desc: 'We amplify your brand everywhere.' },
];

export async function getProcessSteps(): Promise<ProcessStep[]> {
  if (USE_MOCK_DATA) return DEFAULT_PROCESS_STEPS;
  try {
    const data = await graphqlClient.query<{ pageBy?: { content?: string } | null }>(
      GET_PAGE_BY_SLUG,
      { slug: '/process/' },
    );
    const html = data.pageBy?.content || '';
    const steps: ProcessStep[] = [];
    const re = /<li>\s*<strong>\s*(\d+)\s*—\s*([^<]+?)\s*<\/strong>\s*—\s*([^<]+?)\s*<\/li>/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(html)) !== null) {
      steps.push({
        num: m[1],
        title: decodeEntities(m[2]).trim(),
        desc: decodeEntities(m[3]).trim(),
      });
    }
    return steps.length ? steps : DEFAULT_PROCESS_STEPS;
  } catch (e) {
    fetchFailed(e, 'Failed to fetch process steps:');
    return DEFAULT_PROCESS_STEPS;
  }
}

const DEFAULT_INDUSTRIES: IndustriesSectionData = {
  heading: 'Different Businesses. Same Digital Problem.',
  intro: 'You need people to notice you. We work with businesses across multiple industries.',
  industries: [
    'Ecommerce',
    'Fashion',
    'Beauty & Cosmetics',
    'Food & Restaurants',
    'Hospitality',
    'Real Estate',
    'Education',
    'Healthcare',
    'Manufacturing',
    'Technology',
    'Startups',
    'Professional Services',
    'Retail',
    'Automotive',
    'Architecture & Interior Design',
    'Events',
    'Lifestyle',
    'Personal Brands',
    'B2B Companies',
  ],
};

export async function getIndustriesSection(): Promise<IndustriesSectionData> {
  if (USE_MOCK_DATA) return DEFAULT_INDUSTRIES;
  try {
    const data = await graphqlClient.query<{ pageBy?: { content?: string } | null }>(
      GET_PAGE_BY_SLUG,
      { slug: '/industries/' },
    );
    const html = data.pageBy?.content || '';
    const heading = decodeEntities(html.match(/<h1>([^<]+)<\/h1>/)?.[1] || '').trim();
    const intro = decodeEntities(html.match(/<p>([^<]+)<\/p>/)?.[1] || '').trim();
    const listHtml = html.match(/<ul>([\s\S]*?)<\/ul>/)?.[1] || '';
    const industries = Array.from(listHtml.matchAll(/<li>([\s\S]*?)<\/li>/g))
      .map((li) => decodeEntities(li[1]).trim())
      .filter(Boolean);
    if (!industries.length) return DEFAULT_INDUSTRIES;
    return {
      heading: heading || DEFAULT_INDUSTRIES.heading,
      intro: intro || DEFAULT_INDUSTRIES.intro,
      industries,
    };
  } catch (e) {
    fetchFailed(e, 'Failed to fetch industries:');
    return DEFAULT_INDUSTRIES;
  }
}
