import { FC } from 'react'

import { CommentTextFieldProps } from '@baseapp-frontend/design-system'

import { CommentItem_comment$data } from '../../../__generated__/CommentItem_comment.graphql'

export interface CommentUpdateProps {
  comment: CommentItem_comment$data
  onCancel: () => void
  CommentTextField?: FC<CommentTextFieldProps>
  CommentTextFieldProps?: Partial<CommentTextFieldProps>
  CommentUpsertActions?: FC
}
