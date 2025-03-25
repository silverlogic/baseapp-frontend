import { graphql } from 'react-relay'

export const PageBannerBlockFields = graphql`
  fragment PageBannerBlockFields on BannerBlock {
    title
    description
    featuredImage {
      url
      altText
    }
    imagePosition
  }
`

export const PageRichTextBlockFields = graphql`
  fragment PageRichTextBlockFields on RichTextBlock {
    value
  }
`

export const PageCustomImageBlockFields = graphql`
  fragment PageCustomImageBlockFields on CustomImageBlock {
    altText
    image {
      url
      srcSet(sizes: [300, 600, 900], format: "webp", preserveSvg: true)
      altText
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
