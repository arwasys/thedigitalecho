import { brandStatementFragment } from '../fragments';

export const GET_BRAND_STATEMENTS = `
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
