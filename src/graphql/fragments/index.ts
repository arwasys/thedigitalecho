export const imageFragment = `
  fragment ImageFragment on MediaItem {
    sourceUrl
    altText
    mediaDetails {
      width
      height
      sizes {
        sourceUrl
        width
        height
      }
    }
  }
`;

export const seoFragment = `
  fragment SeoFragment on TdeSeo {
    title
    description
    canonical
    ogTitle
    ogDescription
    ogImage
    twitterTitle
    twitterDescription
    twitterImage
  }
`;

export const serviceFragment = `
  fragment ServiceFragment on Service {
    id
    databaseId
    title
    slug
    uri
    menuOrder
    content
    excerpt
    featuredImage {
      node {
        ...ImageFragment
      }
    }
    serviceGallery {
      galleryUrl1
      galleryUrl2
      galleryUrl3
      galleryUrl4
    }
    serviceMenuLinks {
      serviceMenuIcon
      servicePageUrl
      serviceShortDescription
      serviceShowInMenu
    }
    servicePage {
      ctaLabel
      ctaUrl
      heroDescription
      heroTitle
      seoTitle
      seoDescription
    }
    serviceCategories {
      nodes {
        name
        slug
      }
    }
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
`;

export const projectFragment = `
  fragment ProjectFragment on Project {
    id
    databaseId
    title
    slug
    uri
    content
    excerpt
    featuredImage {
      node {
        ...ImageFragment
      }
    }
    projectCategories {
      nodes {
        name
        slug
      }
    }
    projectInfo {
      clientName
      idea
      challenge
      execution
      results
      serviceUsed
      projectDate
      location
      featured
      galleryUrl1
      galleryUrl2
      galleryUrl3
      galleryUrl4
    }
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
`;

export const testimonialFragment = `
  fragment TestimonialFragment on Testimonial {
    id
    databaseId
    title
    testimonialInfo {
      quote
      clientName
      companyName
      designation
      photoUrl
      projectType
    }
    seo {
      ...SeoFragment
    }
  }
`;

export const faqFragment = `
  fragment FaqFragment on Faq {
    id
    databaseId
    title
    slug
    menuOrder
    content
    seo {
      ...SeoFragment
    }
  }
`;

export const heroFragment = `
  fragment HeroFragment on Hero {
    id
    title
    slug
    content
    heroSection {
      selectPage
      smallText
      title1
      videoUrl
      button1Label
      button1PageLink
      button2Label
      button2PageLink
    }
  }
`;

export const brandStatementFragment = `
  fragment BrandStatementFragment on Brandstatement {
    id
    title
    slug
    content
    brandStatementsSection {
      title1
      title2
      reel1
      reel2
      reel3
      reel4
      reel5
      reel6
    }
  }
`;

export const menuFragment = `
  fragment MenuFragment on Menu {
    id
    databaseId
    name
    slug
    count
    menuItems(first: 50) {
      nodes {
        id
        label
        url
        path
        uri
        order
        target
        parentDatabaseId
      }
    }
  }
`;

export const postFragment = `
  fragment PostFragment on Post {
    id
    title
    slug
    excerpt
    content
    featuredImage {
      node {
        ...ImageFragment
      }
    }
    author {
      node {
        name
        avatar {
          url
        }
      }
    }
    categories {
      nodes {
        name
        slug
      }
    }
    tags {
      nodes {
        name
        slug
      }
    }
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
`;
