import { graphql } from 'react-relay'

// TODO: remove inline fragment
export const ProfilesListQuery = graphql`
  query ProfilesListQuery {
    me {
      profiles {
        ...ProfileItemInlineFragment
      }
    }
  }
`
