import { FC } from 'react'

import { CommentItem_comment$data } from '../../../__generated__/CommentItem_comment.graphql'
import { type SocialInputProps } from '../../__shared__/SocialInput/types'

export interface CommentUpdateProps {
  comment: CommentItem_comment$data
  onCancel: () => void
  SocialInput?: FC<SocialInputProps>
  SocialInputProps?: Partial<SocialInputProps>
}
