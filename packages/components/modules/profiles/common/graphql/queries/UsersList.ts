import { graphql } from 'react-relay'

export const UsersListPaginationQuery = graphql`
  query UsersListPaginationQuery($count: Int = 10, $cursor: String, $orderBy: String, $q: String) {
    ...UsersListFragment @arguments(count: $count, cursor: $cursor, orderBy: $orderBy, q: $q)
  }
`
