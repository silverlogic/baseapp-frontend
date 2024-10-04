import { graphql } from 'react-relay'

export const ProfilesListQuery = graphql`
  query ProfilesListQuery {
    me {
      profile {
        ...ProfileItemFragment
      }
      profiles {
        ...ProfileItemFragment
      }
    }
  }
`
