import { menuFragment } from '../fragments';

export const GET_MENUS = `
  ${menuFragment}
  query GetMenus {
    menus(first: 10) {
      nodes {
        ...MenuFragment
      }
    }
  }
`;
