import { ReactElement } from 'react'

import { ReactionTypes } from '../../../../__generated__/ReactionButtonMutation.graphql'
import {
  ReactionButton_target$data,
  ReactionButton_target$key,
} from '../../../../__generated__/ReactionButton_target.graphql'

type ReactionButtonChildren<TEvent> = (props: {
  handleReaction: (e: TEvent) => void
  isLoading: boolean
  target: ReactionButton_target$data
}) => ReactElement | null

export interface ReactionButtonProps<TEvent> {
  target: ReactionButton_target$key
  reactionType: ReactionTypes
  children: ReactionButtonChildren<TEvent>
  handleError?: () => void
  handleSuccess?: () => void
  onClick?: (e: TEvent) => void
}

export interface WebReactionButtonProps extends ReactionButtonProps<React.MouseEvent<Element>> {}
