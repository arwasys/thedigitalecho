import { imageFragment, seoFragment, serviceFragment } from '../fragments';

export const GET_SERVICES = `
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

export const GET_SERVICE_BY_SLUG = `
  ${imageFragment}
  ${seoFragment}
  ${serviceFragment}
  query GetServiceBySlug($slug: String!) {
    serviceBy(uri: $slug) {
      ...ServiceFragment
    }
  }
`;

export const GET_SERVICE_SLUGS = `
  query GetServiceSlugs {
    services(first: 50) {
      nodes {
        slug
      }
    }
  }
`;
