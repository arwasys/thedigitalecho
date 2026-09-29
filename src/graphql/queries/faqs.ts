import { seoFragment, faqFragment } from '../fragments';

export const GET_FAQS = `
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
