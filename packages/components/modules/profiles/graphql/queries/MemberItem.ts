import { graphql } from 'react-relay'

export const MemberItemFragment = graphql`
  fragment MemberItemFragment on ProfileUserRole {
    id
    user {
      profile {
        ...ProfileItemFragment
      }
    }
    role
    status
  }
`
