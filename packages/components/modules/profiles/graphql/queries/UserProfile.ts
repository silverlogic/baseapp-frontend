import { graphql } from 'react-relay'

export const UserProfileQuery = graphql`
  query UserProfileQuery {
    me {
      profile {
        ...ProfileItemFragment
      }
    }
  }
`
