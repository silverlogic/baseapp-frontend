import { graphql } from 'react-relay'

// TODO: remove inline fragment
export const UserProfileQuery = graphql`
  query UserProfileQuery {
    me {
      profile {
        id
        ...ProfileItemFragment
      }
    }
  }
`
