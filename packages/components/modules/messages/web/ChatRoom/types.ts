import { FC } from 'react'

import { PreloadedQuery } from 'react-relay'

import { ChatRoomQuery as ChatRoomQueryType } from '../../../../__generated__/ChatRoomQuery.graphql'
import { MessagesListProps } from '../MessagesList/types'
import { SendMessageProps } from '../SendMessage/types'

export interface ChatRoomProps {
  roomId: string
  roomRef: PreloadedQuery<ChatRoomQueryType>
  MessagesList?: FC<MessagesListProps>
  MessagesListProps?: Partial<MessagesListProps>
  SendMessage?: FC<SendMessageProps>
  SendMessageProps?: Partial<SendMessageProps>
  onDisplayGroupDetailsClicked: () => void
}
