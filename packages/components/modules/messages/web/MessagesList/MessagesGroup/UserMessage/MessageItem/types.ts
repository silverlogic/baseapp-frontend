import { BoxProps } from '@mui/material'

import {
  MessageItemFragment$data,
  MessageItemFragment$key,
} from '../../../../../../../__generated__/MessageItemFragment.graphql'

export interface MessageItemProps {
  messageRef: MessageItemFragment$key
  isFirstGroupedMessage?: boolean
  isGroup?: boolean
}

export interface MessageContentProps {
  message: MessageItemFragment$data
}

export interface MessageItemContainerProps extends BoxProps {
  isOwnMessage: boolean
  isFirstGroupedMessage?: boolean
}
