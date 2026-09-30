import { imageFragment, seoFragment } from '../fragments';

export const GET_HOME_PAGE = `
  ${imageFragment}
  ${seoFragment}
  query GetHomePage {
    pageBy(uri: "/") {
      id
      title
      slug
      seo {
        ...SeoFragment
      }
    }
    services(first: 6, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes {
        id
        title
        slug
        excerpt
        menuOrder
        serviceMenuLinks {
          serviceMenuIcon
          serviceShortDescription
        }
      }
    }
    projects(first: 4) {
      nodes {
        id
        title
        slug
        projectInfo {
          clientName
          featured
        }
        featuredImage {
          node {
            ...ImageFragment
          }
        }
      }
    }
    posts(first: 3) {
      nodes {
        id
        title
        slug
        excerpt
        date
        featuredImage {
          node {
            ...ImageFragment
          }
        }
      }
    }
  }
`;

export const GET_PAGE_BY_SLUG = `
  ${seoFragment}
  query GetPageBySlug($slug: String!) {
    pageBy(uri: $slug) {
      id
      title
      slug
      content
      date
      modified
      pageCta {
        pageCtaTitle1
        pageCtaTitle2
        pageCtaButtonText
        pageCtaButtonUrl
      }
      seo {
        ...SeoFragment
      }
    }
  }
`;

export const GET_HOME_SECTIONS = `
  query GetHomeSections {
    pageBy(uri: "/") {
      id
      homeSections {
        cpTitle
        cpTitleAccent
        cpImage1
        cpImage2
        cpImage3
        cpImage4
        smTitle1
        smTitleAccent
        smTitle2
        smTitle2Accent
        smPlatforms
        droneEyebrow
        droneTitle1
        droneTitle2
        droneTitle3
        droneBody
        droneButtonLabel
        droneButtonUrl
        ctaTitle1
        ctaTitleAccent
        ctaBody
        ctaButton1Label
        ctaButton1Url
        ctaButton2Label
      }
    }
  }
`;

export const GET_SITE_DATA = `
  query GetSiteData {
    pageBy(uri: "/site-settings/") {
      id
      siteFooter {
        footerBlurb
        footerCopyright
        footerCta
        footerTagLine
      }
      siteContact {
        contactEmail
        contactWhatsappUrl
        contactWhatsappNumber
        contactPhone
        contactAddress
        contactGeoLat
        contactGeoLng
        contactAreaServed
        contactSocialInstagram
        contactSocialFacebook
        contactSocialLinkedin
        contactSocialYoutube
      }
      siteText {
        titleServices1
        titleServices2
        titleProjects1
        titleProjects2
        titleBlog1
        titleBlog2
        titleTestimonials1
        titleTestimonials2
        titleFaq
        titleProcess1
        titleProcess2
        titleIndustries1
        titleIndustries2
        btnAllServices
        btnViewAllProjects
        btnViewAllArticles
      }
    }
  }
`;

export const GET_WHY_CHOOSE_US = `
  query GetWhyChooseUs {
    pageBy(uri: "/why-choose-us/") {
      id
      title
      content
    }
  }
`;

export const GET_SITE_FOOTER = `
  query GetSiteFooter {
    pageBy(uri: "/site-settings/") {
      id
      title
      siteFooter {
        footerBlurb
        footerCopyright
        footerCta
        footerTagLine
      }
    }
  }
`;
