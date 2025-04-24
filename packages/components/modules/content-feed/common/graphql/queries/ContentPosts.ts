import { graphql } from 'react-relay'

export const ContentPostsQuery = graphql`
  query ContentPostsQuery($count: Int!, $cursor: String, $orderBy: String) {
    ...ContentPostsFragment @arguments(count: $count, cursor: $cursor, orderBy: $orderBy)
  }
`
