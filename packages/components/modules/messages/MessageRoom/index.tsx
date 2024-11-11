'use client'

import { FC, Suspense } from 'react'

import { LoadingState } from '@baseapp-frontend/design-system'

import { Box } from '@mui/material'
import { useLazyLoadQuery } from 'react-relay'

import { MessageRoomQuery as MessageRoomQueryType } from '../../../__generated__/MessageRoomQuery.graphql'
import DefaultMessagesList from '../MessagesList'
import DefaultSendMessage from '../SendMessage'
import { MessageRoomQuery } from '../graphql/queries/MessageRoomQuery'
import { MessageRoomContainer } from './styled'
import { MessageRoomProps } from './types'

const MessageRoom: FC<MessageRoomProps> = ({
  roomId,
  MessagesList = DefaultMessagesList,
  MessagesListProps = {},
  SendMessage = DefaultSendMessage,
  SendMessageProps = {},
}) => {
  const { chatRoom } = useLazyLoadQuery<MessageRoomQueryType>(
    MessageRoomQuery,
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
    <MessageRoomContainer>
      <MessagesList roomRef={chatRoom} {...MessagesListProps} />
      <Box paddingRight={2}>
        <SendMessage roomId={roomId} {...SendMessageProps} />
      </Box>
    </MessageRoomContainer>
  )
}

const SuspendedMessageRoom: FC<MessageRoomProps> = (props) => (
  <Suspense fallback={<LoadingState />}>
    <MessageRoom {...props} />
  </Suspense>
)

export default SuspendedMessageRoom
