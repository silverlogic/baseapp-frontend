import type { MouseEvent } from 'react'

import type { ReactionButton_target$key } from '../../../../../__generated__/ReactionButton_target.graphql'

export interface CommentReactionButtonProps {
  target: ReactionButton_target$key
  onClick?: (e: MouseEvent) => void
}
