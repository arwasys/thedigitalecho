export const GET_PRICING_PLANS = `
  query GetPricingPlans {
    plans(first: 50, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes {
        id
        title
        menuOrder
        planInfo {
          planPrice
          planPeriod
          planSummary
          planFeatures
          planBadge
          planHighlight
          planCtaLabel
          planCtaUrl
        }
      }
    }
  }
`;
