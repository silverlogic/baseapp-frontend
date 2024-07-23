import { graphql, useLazyLoadQuery } from 'react-relay'

import CommentItem from '../..'
import { CommentItemWithQuery as Query } from '../../../../../__generated__/CommentItemWithQuery.graphql'
import { CommentItem_comment$key } from '../../../../../__generated__/CommentItem_comment.graphql'
import CommentReplyProvider from '../../../context/comments/CommentReplyProvider'
import { CommentItemProps } from '../../types'

const CommentItemWithQuery = (props: CommentItemProps) => {
  const data = useLazyLoadQuery<Query>(
    graphql`
      query CommentItemWithQuery @relay_test_operation {
        target: node(id: "test-id") {
          ...CommentItem_comment
        }
      }
    `,
    {},
  )

  return (
    <CommentReplyProvider>
      <CommentItem
        {...props}
        comment={data.target as CommentItem_comment$key}
        subscriptionsEnabled={false}
      />
    </CommentReplyProvider>
  )
}

export default CommentItemWithQuery
