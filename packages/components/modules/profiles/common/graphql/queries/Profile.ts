import { graphql } from 'react-relay'

export const ProfileByIdQuery = graphql`
  query ProfileByIdQuery($id: ID!, $perm: String!) {
    profile(id: $id) {
      ...CheckMountPermissionWrapperFragment @arguments(perm: $perm)
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
