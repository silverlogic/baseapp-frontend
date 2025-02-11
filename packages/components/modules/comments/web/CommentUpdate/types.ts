import { type FC } from 'react'

import type { CommentItem_comment$data } from '../../../../__generated__/CommentItem_comment.graphql'
import type { SocialInputProps } from '../../../__shared__/web'

export interface CommentUpdateProps {
  comment: CommentItem_comment$data
  onCancel: () => void
  SocialInput?: FC<SocialInputProps>
  SocialInputProps?: Partial<SocialInputProps>
}
