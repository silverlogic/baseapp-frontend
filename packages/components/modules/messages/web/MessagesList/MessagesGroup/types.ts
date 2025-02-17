import { FC } from 'react'

import { SystemMessageProps } from './SystemMessage/types'
import { UserMessageProps } from './UserMessage/types'
import { MessageNode } from '../../../common'

export interface MessagesGroupProps {
  allMessages: MessageNode[]
  message: MessageNode
  messageIndex: number
  isGroup?: boolean
  allMessagesLastIndex: number
  firstUnreadMessageId?: string | null
  hasNext: boolean
  SystemMessage?: FC<SystemMessageProps>
  SystemMessageProps?: Partial<SystemMessageProps>
  UserMessage?: FC<UserMessageProps>
  UserMessageProps?: Partial<UserMessageProps>
}
