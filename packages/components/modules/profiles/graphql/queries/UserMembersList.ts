import { graphql } from 'react-relay'

export const UserMembersListPaginationQuery = graphql`
  query UserMembersListPaginationQuery($count: Int = 10, $cursor: String, $orderByStatus: String) {
    me {
      ...UserMembersListFragment
        @arguments(count: $count, cursor: $cursor, orderByStatus: $orderByStatus)
    }
  }
`

export const UserMembersListFragment = graphql`
  fragment UserMembersListFragment on User
  @refetchable(queryName: "userMembersListPaginationRefetchable")
  @argumentDefinitions(
    count: { type: "Int", defaultValue: 10 }
    cursor: { type: "String" }
    orderByStatus: { type: "String", defaultValue: "custom" }
  ) {
    profile {
      ...ProfileItemFragment
      members(first: $count, after: $cursor, orderByStatus: $orderByStatus)
        @connection(key: "UserMembersFragment_members", filters: ["orderByStatus"]) {
        totalCount
        edges {
          node {
            id
            user {
              profile {
                ...ProfileItemFragment
              }
            }
            role
            status
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`
