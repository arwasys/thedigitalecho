import { heroFragment } from '../fragments';

export const GET_ALL_HEROS = `
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
