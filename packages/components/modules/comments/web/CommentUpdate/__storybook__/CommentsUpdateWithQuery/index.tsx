import React from 'react'

import { graphql, useFragment, useLazyLoadQuery } from 'react-relay'

import CommentUpdate from '../..'
import {
  CommentItem_comment$data,
  CommentItem_comment$key,
} from '../../../../../../__generated__/CommentItem_comment.graphql'
import { CommentsUpdateWithQuery as Query } from '../../../../../../__generated__/CommentsUpdateWithQuery.graphql'
import { CommentItemFragmentQuery, CommentReplyProvider } from '../../../../common'
import { CommentUpdateProps } from '../../types'

const CommentsUpdateWithQuery = (props: CommentUpdateProps) => {
  const data = useLazyLoadQuery<Query>(
    graphql`
      query CommentsUpdateWithQuery @relay_test_operation {
        target: node(id: "test-id") {
          ...CommentItem_comment
        }
      }
    `,
    {},
  )
  const comment = useFragment<CommentItem_comment$key>(CommentItemFragmentQuery, data.target)

  return (
    <CommentReplyProvider>
      <CommentUpdate {...props} comment={comment as CommentItem_comment$data} />
    </CommentReplyProvider>
  )
}

export default CommentsUpdateWithQuery
