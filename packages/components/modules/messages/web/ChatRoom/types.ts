import { FC } from 'react'

import { MessageCreateProps } from '../MessageCreate/types'
import { MessagesListProps } from '../MessagesList/types'

export interface ChatRoomProps {
  roomId: string
  MessagesList?: FC<MessagesListProps>
  MessagesListProps?: Partial<MessagesListProps>
  SendMessage?: FC<MessageCreateProps>
  SendMessageProps?: Partial<MessageCreateProps>
  onDisplayGroupDetailsClicked: () => void
}
