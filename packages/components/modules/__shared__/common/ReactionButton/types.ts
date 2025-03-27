import { ReactElement } from 'react'

import { ReactionTypes } from '../../../../__generated__/ReactionButtonMutation.graphql'
import {
  ReactionButton_target$data,
  ReactionButton_target$key,
} from '../../../../__generated__/ReactionButton_target.graphql'

type ReactionButtonChildren = (props: {
  handleReaction: () => void
  isLoading: boolean
  target: ReactionButton_target$data
}) => ReactElement | null

export interface ReactionButtonProps {
  target: ReactionButton_target$key
  reactionType: ReactionTypes
  children: ReactionButtonChildren
  handleError?: () => void
  handleSuccess?: () => void
}
