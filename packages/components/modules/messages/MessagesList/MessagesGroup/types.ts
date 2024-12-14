import { FC } from 'react'

import { MessageNode } from '../../types'
import { MessageItemProps } from './MessageItem/types'

export interface MessagesGroupProps {
  allMessages: MessageNode[]
  message: MessageNode
  messageIndex: number
  isGroup?: boolean
  allMessagesLastIndex: number
  firstUnreadMessageId?: string | null
  hasNext: boolean
  MessageItem?: FC<MessageItemProps>
  MessageItemProps?: Partial<MessageItemProps>
}
