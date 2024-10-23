import React from 'react'

import { Box, CircularProgress } from '@mui/material'
import { useLazyLoadQuery } from 'react-relay'

import { ChatViewQuery as ChatViewQueryType } from '../../../__generated__/ChatViewQuery.graphql'
import MessagesList from '../MessagesList'
import { ChatViewQuery } from '../graphql/queries/ChatViewQuery'

export interface IChatViewProps {
  roomId: string
  profileId: string
}

const ChatView = ({ roomId, profileId }: IChatViewProps) => {
  const { chatRoom } = useLazyLoadQuery<ChatViewQueryType>(
    ChatViewQuery,
    {
      roomId,
    },
    {
      fetchPolicy: 'store-and-network',
      fetchKey: roomId,
    },
  )

  return <div>{chatRoom && <MessagesList roomRef={chatRoom} profileId={profileId} />}</div>
}

const SuspendedChatView = ({ roomId, profileId }: IChatViewProps) => (
  <React.Suspense
    fallback={
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <CircularProgress />
      </Box>
    }
  >
    <ChatView roomId={roomId} profileId={profileId} />
  </React.Suspense>
)

export default SuspendedChatView
