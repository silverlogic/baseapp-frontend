import { graphql, usePaginationFragment } from 'react-relay'

import { CommentsListPaginationQuery } from '../../../../__generated__/CommentsListPaginationQuery.graphql'
import { CommentsList_comments$key } from '../../../../__generated__/CommentsList_comments.graphql'

export const CommentsListFragmentQuery = graphql`
  fragment CommentsList_comments on CommentsInterface
  @refetchable(queryName: "CommentsListPaginationQuery")
  @argumentDefinitions(
    count: { type: "Int", defaultValue: 5 }
    cursor: { type: "String" }
    orderBy: { type: "String", defaultValue: "-is_pinned,-created" }
    q: { type: "String" }
  ) {
    id
    commentsCount {
      total
    }
    comments(first: $count, after: $cursor, q: $q, orderBy: $orderBy)
      @connection(key: "CommentsList_comments", filters: []) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          isPinned
          ...CommentItem_comment
        }
      }
    }

    ...CommentItem_target
  }
`

export const useCommentList = (targetRef: CommentsList_comments$key) =>
  usePaginationFragment<CommentsListPaginationQuery, CommentsList_comments$key>(
    CommentsListFragmentQuery,
    targetRef,
  )
