import { graphql } from 'react-relay'

export const UserMembersListPaginationQuery = graphql`
  query UserMembersListPaginationQuery(
    $count: Int = 10
    $cursor: String
    $orderBy: String
    $profileId: ID!
    $q: String
  ) {
    profile(id: $profileId) {
      pk
      ...UserMembersListFragment
        @arguments(count: $count, cursor: $cursor, orderBy: $orderBy, q: $q)
    }
  }
`
