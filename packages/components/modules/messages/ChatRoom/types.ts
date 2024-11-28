import { FC } from 'react'

import { MessagesListProps } from '../MessagesList/types'
import { SendMessageProps } from '../SendMessage/types'

export interface ChatRoomProps {
  roomId: string
  MessagesList?: FC<MessagesListProps>
  MessagesListProps?: Partial<MessagesListProps>
  SendMessage?: FC<SendMessageProps>
  SendMessageProps?: Partial<SendMessageProps>
}
