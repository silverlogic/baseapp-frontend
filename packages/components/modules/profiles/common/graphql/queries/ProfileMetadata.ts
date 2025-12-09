import { graphql } from 'react-relay'

export const ProfileMetadataQuery = graphql`
  query ProfileMetadataQuery($id: ID!) {
    profile(id: $id) {
      id
      metadata {
        ...MetadataFragment
      }
    }
  }
`
