import { FC } from 'react'

import { MessageItemProps } from './MessageItem/types'
import { MessageNode } from '../../../../common'

export interface UserMessageProps {
  allMessages: MessageNode[]
  message: MessageNode
  messageIndex: number
  isGroup?: boolean
  allMessagesLastIndex: number
  MessageItem?: FC<MessageItemProps>
  MessageItemProps?: Partial<MessageItemProps>
}
