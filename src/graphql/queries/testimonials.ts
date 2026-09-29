import { seoFragment, testimonialFragment } from '../fragments';

export const GET_TESTIMONIALS = `
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
