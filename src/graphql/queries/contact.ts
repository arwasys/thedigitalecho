export const GET_CONTACT_FORM = `
  query GetContactForm {
    tdeContactForm {
      id
      title
      form
      successMessage
    }
  }
`;

export const GET_OFFICES = `
  query GetOffices {
    offices(first: 50, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes {
        id
        title
        officeInfo {
          companyType
          companyName
          address
          phone1
          phone2
          email
          mapEmbedUrl
        }
      }
    }
  }
`;
