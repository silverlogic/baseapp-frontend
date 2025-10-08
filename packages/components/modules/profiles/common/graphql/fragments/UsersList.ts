import { graphql } from 'react-relay'

export const UsersListFragment = graphql`
  fragment UsersListFragment on Query
  @refetchable(queryName: "usersListPaginationRefetchable")
  @argumentDefinitions(
    count: { type: "Int", defaultValue: 10 }
    cursor: { type: "String" }
    orderBy: { type: "String" }
    q: { type: "String" }
  ) {
    users(q: $q, first: $count, after: $cursor, orderBy: $orderBy)
      @connection(key: "UsersList_users") {
      totalCount
      edges {
        cursor
        node {
          id
          ...UserItemFragment @relay(mask: false)
          profile {
            id
            ...ProfileItemFragment
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`
