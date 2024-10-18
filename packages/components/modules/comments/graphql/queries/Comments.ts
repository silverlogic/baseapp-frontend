import { graphql } from 'react-relay'

export const CommentsFragmentQuery = graphql`
  fragment CommentsFragment on CommentsInterface
  @refetchable(queryName: "CommentsRefetchQuery")
  @argumentDefinitions(isCommentsOpened: { type: "Boolean", defaultValue: true }) {
    id
    __typename
    isCommentsEnabled
    commentsCount {
      total
    }

    ...CommentsList_comments @include(if: $isCommentsOpened)
    ...CommentItem_target
  }
`
