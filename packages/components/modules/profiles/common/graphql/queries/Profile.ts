import { graphql } from 'react-relay'

export const ProfileByIdQuery = graphql`
  query ProfileByIdQuery($id: ID!) {
    profile(id: $id) {
      ...CheckMountPermissionWrapper @arguments(perm: "delete")
      ...ProfileComponentFragment
      ...FollowToggleUpdatableFragment
    }
  }
`

export const ProfileCurrentUserQuery = graphql`
  query ProfileCurrentUserQuery {
    me {
      profile {
        id
        ...ProfileComponentFragment
      }
    }
  }
`
