import { FC } from 'react'

import { MessagesListFragment$data } from '../../../../__generated__/MessagesListFragment.graphql'
import { MessageNode } from '../../types'
import { MessageItemProps } from './MessageItem/types'

type Participants = NonNullable<MessagesListFragment$data['participants']>

export interface MessagesGroupProps {
  allMessages: MessageNode[]
  message: MessageNode
  messageIndex: number
  roomParticipantsCount: Participants['totalCount']
  allMessagesLastIndex: number
  hasNext: boolean
  MessageItem?: FC<MessageItemProps>
  MessageItemProps?: Partial<MessageItemProps>
}
