import { graphql } from 'react-relay'

export const MetadataURLPathQuery = graphql`
  query MetadataURLPathQuery($path: String!) {
    urlPath(path: $path) {
      id
      path
      target {
        __typename
        id

        metadata {
          ...MetadataFragment
        }
      }
    }
  }
`
