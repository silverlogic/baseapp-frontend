import { graphql } from 'react-relay'

export const MetadataFragment = graphql`
  fragment MetadataFragment on Metadata {
    language
    metaTitle
    metaDescription
    metaRobots
    metaOgType
    metaOgImage(width: 1000, height: 1000) {
      url
    }
  }
`
