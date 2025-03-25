import { graphql } from 'react-relay'

export const PageFragments = graphql`
  fragment PageBannerBlockFields on BannerBlock {
    title
    description
    featuredImage {
      url
      altText
    }
    imagePosition
  }
  fragment PageRichTextBlockFields on RichTextBlock {
    value
  }
  fragment PageCustomImageBlockFields on CustomImageBlock {
    altText
    image {
      url
      srcSet(sizes: [300, 600, 900], format: "webp", preserveSvg: true)
    }
  }
`

export const getPageByURLPathQuery = graphql`
  query PageURLPathQuery($path: String!) {
    page(urlPath: $path) {
      id
      title
      pageType
      ancestors {
        urlPath
        title
      }
      ... on StandardPage {
        body {
          id
          field
          blockType
          ... on StreamBlock {
            blocks {
              id
              field
              blockType
              ...PageBannerBlockFields
              ...PageRichTextBlockFields
              ...PageCustomImageBlockFields
            }
          }
        }
      }
    }
  }
`
