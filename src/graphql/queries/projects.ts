import { imageFragment, seoFragment, projectFragment } from '../fragments';

export const GET_PROJECTS = `
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

export const GET_FEATURED_PROJECTS = `
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

export const GET_PROJECT_BY_SLUG = `
  ${imageFragment}
  ${seoFragment}
  ${projectFragment}
  query GetProjectBySlug($slug: String!) {
    projectBy(uri: $slug) {
      ...ProjectFragment
    }
  }
`;

export const GET_PROJECT_SLUGS = `
  query GetProjectSlugs {
    projects(first: 50) {
      nodes {
        slug
      }
    }
  }
`;
