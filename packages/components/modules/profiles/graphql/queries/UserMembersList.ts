import { graphql } from 'react-relay'

export const UserMembersListPaginationQuery = graphql`
  query UserMembersListPaginationQuery(
    $count: Int = 10
    $cursor: String
    $orderByStatus: String
    $profileId: ID!
  ) {
    profile(id: $profileId) {
      pk
      ...UserMembersListFragment
        @arguments(count: $count, cursor: $cursor, orderByStatus: $orderByStatus)
    }
  }
`

export const UserMembersListFragment = graphql`
  fragment UserMembersListFragment on Profile
  @refetchable(queryName: "userMembersListPaginationRefetchable")
  @argumentDefinitions(
    count: { type: "Int", defaultValue: 10 }
    cursor: { type: "String" }
    orderByStatus: { type: "String", defaultValue: "custom" }
  ) {
    ...ProfileItemFragment
    members(first: $count, after: $cursor, orderByStatus: $orderByStatus)
      @connection(key: "UserMembersFragment_members", filters: ["orderByStatus"]) {
      totalCount
      edges {
        node {
          ...MemberItemFragment
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`
