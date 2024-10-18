import { graphql, useLazyLoadQuery } from 'react-relay'

import CommentsList from '../..'
import { CommentsListWithQuery as Query } from '../../../../../__generated__/CommentsListWithQuery.graphql'
import { CommentsList_comments$key } from '../../../../../__generated__/CommentsList_comments.graphql'
import CommentReplyProvider from '../../../context/CommentReplyProvider'
import { CommentsListProps } from '../../types'

const CommentsListWithQuery = (props: CommentsListProps) => {
  const data = useLazyLoadQuery<Query>(
    graphql`
      query CommentsListWithQuery @relay_test_operation {
        target: node(id: "test-id") {
          ...CommentsList_comments
        }
      }
    `,
    {},
  )

  return (
    <CommentReplyProvider>
      <CommentsList
        {...props}
        target={data.target as CommentsList_comments$key}
        subscriptionsEnabled={false}
      />
    </CommentReplyProvider>
  )
}

export default CommentsListWithQuery
