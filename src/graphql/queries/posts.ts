import { imageFragment, seoFragment, postFragment } from '../fragments';

export const GET_POSTS = `
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

export const GET_POST_BY_SLUG = `
  ${imageFragment}
  ${seoFragment}
  ${postFragment}
  query GetPostBySlug($slug: String!) {
    postBy(uri: $slug) {
      ...PostFragment
    }
  }
`;

export const GET_POST_SLUGS = `
  query GetPostSlugs {
    posts(first: 100) {
      nodes {
        slug
      }
    }
  }
`;
