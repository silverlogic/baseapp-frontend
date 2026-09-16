import { type FC } from 'react'

import type { MentionsSearchController } from '@baseapp-frontend/design-system/components/web/inputs'

import type { CommentItem_comment$data } from '../../../../__generated__/CommentItem_comment.graphql'
import type { SocialInputProps } from '../../../__shared__/web'

export interface CommentUpdateProps {
  comment: CommentItem_comment$data
  onCancel: () => void
  SocialInput?: FC<SocialInputProps>
  SocialInputProps?: Partial<SocialInputProps>
  mentionsController?: MentionsSearchController
  disableMentions?: boolean
}
