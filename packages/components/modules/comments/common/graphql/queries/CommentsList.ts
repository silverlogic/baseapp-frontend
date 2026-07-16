import { useCallback, useMemo } from 'react'

import { graphql, usePaginationFragment } from 'react-relay'

import { CommentsListPaginationQuery } from '../../../../../__generated__/CommentsListPaginationQuery.graphql'
import { CommentsList_comments$key } from '../../../../../__generated__/CommentsList_comments.graphql'
import { DEFAULT_COMMENTS_ORDER_BY } from '../../constants'

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

export const useCommentList = (targetRef: CommentsList_comments$key) => {
  const result = usePaginationFragment<CommentsListPaginationQuery, CommentsList_comments$key>(
    CommentsListFragmentQuery,
    targetRef,
  )
  const { data, refetch } = result

  const comments = useMemo(
    () => data?.comments?.edges.filter((edge) => edge?.node).map((edge) => edge?.node) || [],
    [data?.comments?.edges],
  )

  // Re-sorts the already-rendered list (e.g. after pin/unpin) without dropping it while the
  // network response is in flight.
  const refetchWithOrder = useCallback(() => {
    refetch({ orderBy: DEFAULT_COMMENTS_ORDER_BY }, { fetchPolicy: 'store-and-network' })
  }, [refetch])

  return {
    ...result,
    comments,
    refetch,
    refetchWithOrder,
  }
}
