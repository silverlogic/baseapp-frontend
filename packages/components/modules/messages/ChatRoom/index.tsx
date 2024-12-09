'use client'

import { FC, Suspense } from 'react'

import { LoadingState } from '@baseapp-frontend/design-system'

import { Box } from '@mui/material'
import { useLazyLoadQuery } from 'react-relay'

import { ChatRoomQuery as ChatRoomQueryType } from '../../../__generated__/ChatRoomQuery.graphql'
import DefaultMessagesList from '../MessagesList'
import DefaultSendMessage from '../SendMessage'
import { ChatRoomQuery } from '../graphql/queries/ChatRoomQuery'
import ChatRoomHeader from './ChatRoomHeader'
import { ChatBodyContainer, ChatRoomContainer } from './styled'
import { ChatRoomProps } from './types'

const ChatRoom: FC<ChatRoomProps> = ({
  roomId,
  MessagesList = DefaultMessagesList,
  MessagesListProps = {},
  SendMessage = DefaultSendMessage,
  SendMessageProps = {},
}) => {
  // TODO: pre load this query and instead of lazyload
  const { chatRoom } = useLazyLoadQuery<ChatRoomQueryType>(
    ChatRoomQuery,
    {
      roomId,
    },
    {
      fetchPolicy: 'store-and-network',
      fetchKey: roomId,
    },
  )

  // TODO: handle error for chatRoom
  if (!chatRoom) {
    return <div>Chat room not found</div>
  }

  return (
    <ChatRoomContainer>
      <ChatRoomHeader roomHeaderRef={chatRoom} />
      <ChatBodyContainer>
        <MessagesList roomRef={chatRoom} {...MessagesListProps} />
        <Box paddingRight={2}>
          <SendMessage roomId={roomId} {...SendMessageProps} />
        </Box>
      </ChatBodyContainer>
    </ChatRoomContainer>
  )
}

const SuspendedChatRoom: FC<ChatRoomProps> = (props) => (
  <Suspense fallback={<LoadingState />}>
    <ChatRoom {...props} />
  </Suspense>
)

export default SuspendedChatRoom
