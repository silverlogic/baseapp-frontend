import React from 'react'

import CommentCreate from '../..'
import { CommentReplyProvider } from '../../../../common'
import { CommentCreateProps } from '../../types'

const CommentCreateWithProvider = (props: CommentCreateProps) => (
  <CommentReplyProvider>
    <CommentCreate {...props} />
  </CommentReplyProvider>
)

export default CommentCreateWithProvider
