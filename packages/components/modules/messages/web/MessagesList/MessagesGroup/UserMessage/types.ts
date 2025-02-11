import { FC } from 'react'

import { MessageNode } from '../../../../common'
import { MessageItemProps } from './MessageItem/types'

export interface UserMessageProps {
  allMessages: MessageNode[]
  message: MessageNode
  messageIndex: number
  isGroup?: boolean
  allMessagesLastIndex: number
  MessageItem?: FC<MessageItemProps>
  MessageItemProps?: Partial<MessageItemProps>
}
