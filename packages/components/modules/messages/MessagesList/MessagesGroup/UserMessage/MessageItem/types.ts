import { BoxProps } from '@mui/material'

import { MessageItemFragment$key } from '../../../../../../__generated__/MessageItemFragment.graphql'

export interface MessageItemProps {
  messageRef: MessageItemFragment$key
  isFirstGroupedMessage?: boolean
}

export interface MessageItemContainerProps extends BoxProps {
  isOwnMessage: boolean
  isFirstGroupedMessage?: boolean
}
