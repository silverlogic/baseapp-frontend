'use client'

import { FC, Suspense, useEffect, useRef } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { LoadingState } from '@baseapp-frontend/design-system'

import { Box } from '@mui/material'
import { useLazyLoadQuery } from 'react-relay'

import { ChatRoomQuery as ChatRoomQueryType } from '../../../__generated__/ChatRoomQuery.graphql'
import DefaultMessagesList from '../MessagesList'
import DefaultSendMessage from '../SendMessage'
import { useReadMessageMutation } from '../graphql/mutations/ReadMessages'
import { ChatRoomQuery } from '../graphql/queries/ChatRoomQuery'
import { ChatRoomContainer } from './styled'
import { ChatRoomProps } from './types'

const ChatRoom: FC<ChatRoomProps> = ({
  roomId,
  MessagesList = DefaultMessagesList,
  MessagesListProps = {},
  SendMessage = DefaultSendMessage,
  SendMessageProps = {},
}) => {
  const hasRunRef = useRef(false)
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
  const { currentProfile } = useCurrentProfile()
  const [commitMutation] = useReadMessageMutation()

  const prevProfileIdRef = useRef<string | undefined>(currentProfile?.id)
  const prevRoomIdRef = useRef<string | undefined>(chatRoom?.id)

  useEffect(() => {
    if (hasRunRef.current)
      return () => {
        if (prevProfileIdRef.current && prevRoomIdRef.current) {
          commitMutation({
            variables: {
              input: {
                roomId: prevRoomIdRef.current,
                profileId: prevProfileIdRef.current as string,
              },
            },
          })
        }
      }
    hasRunRef.current = true
    return () => {}
  }, [currentProfile?.id, chatRoom?.id])

  useEffect(() => {
    prevProfileIdRef.current = currentProfile?.id
    prevRoomIdRef.current = chatRoom?.id
  }, [currentProfile?.id, chatRoom?.id])

  // TODO: handle error for chatRoom
  if (!chatRoom) {
    return <div>Chat room not found</div>
  }

  return (
    <ChatRoomContainer>
      <MessagesList roomRef={chatRoom} {...MessagesListProps} />
      <Box paddingRight={2}>
        <SendMessage roomId={roomId} {...SendMessageProps} />
      </Box>
    </ChatRoomContainer>
  )
}

const SuspendedChatRoom: FC<ChatRoomProps> = (props) => (
  <Suspense fallback={<LoadingState />}>
    <ChatRoom {...props} />
  </Suspense>
)

export default SuspendedChatRoom
