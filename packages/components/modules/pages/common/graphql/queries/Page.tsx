import { graphql } from 'react-relay'

export const PageURLPathQuery = graphql`
  query PageURLPathQuery($path: String!) {
    urlPath(path: $path) {
      id
      path
      target {
        __typename
        id

        metadata {
          ...MetadataFragment
        }

        ... on Page {
          ...PageComponentFragment
        }

        ... on Profile {
          ...ProfileComponentFragment
        }
      }
    }
  }
`
