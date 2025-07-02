import { graphql, usePaginationFragment } from 'react-relay'

import { ContentPostsFragment$key } from '../../../../../__generated__/ContentPostsFragment.graphql'
import { ContentPostsPaginationQuery } from '../../../../../__generated__/ContentPostsPaginationQuery.graphql'

export const ContentPostsFragmentQuery = graphql`
  fragment ContentPostsFragment on Query
  @argumentDefinitions(
    cursor: { type: "String" }
    count: { type: "Int", defaultValue: 5 }
    orderBy: { type: "String", defaultValue: "-created" }
  )
  @refetchable(queryName: "ContentPostsPaginationQuery") {
    contentPosts(first: $count, after: $cursor, orderBy: $orderBy)
      @connection(key: "ContentPostsFragment_contentPosts") {
      totalCount
      edges {
        node {
          ...ContentPost_post
        }
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
        startCursor
      }
    }
  }
`

export const useContentPosts = (targetRef: ContentPostsFragment$key) =>
  usePaginationFragment<ContentPostsPaginationQuery, ContentPostsFragment$key>(
    ContentPostsFragmentQuery,
    targetRef,
  )
