'use client'

import { FC, Suspense } from 'react'

import { LoadingState } from '@baseapp-frontend/design-system/components/web/displays'

import { Box } from '@mui/material'
import { usePaginationFragment, usePreloadedQuery } from 'react-relay'

import { ChatRoomParticipantsPaginationQuery } from '../../../../__generated__/ChatRoomParticipantsPaginationQuery.graphql'
import { ChatRoomQuery as ChatRoomQueryType } from '../../../../__generated__/ChatRoomQuery.graphql'
import { MembersListFragment$key } from '../../../../__generated__/MembersListFragment.graphql'
import { ChatRoomQuery, MembersListFragment } from '../../common'
import DefaultMessagesList from '../MessagesList'
import DefaultSendMessage from '../SendMessage'
import ChatRoomHeader from './ChatRoomHeader'
import { ChatBodyContainer, ChatRoomContainer } from './styled'
import { ChatRoomProps } from './types'

const ChatRoom: FC<ChatRoomProps> = ({
  roomId,
  roomRef,
  MessagesList = DefaultMessagesList,
  MessagesListProps = {},
  SendMessage = DefaultSendMessage,
  SendMessageProps = {},
  onDisplayGroupDetailsClicked,
}) => {
  const { chatRoom } = usePreloadedQuery<ChatRoomQueryType>(ChatRoomQuery, roomRef)

  const { data, loadNext, isLoadingNext, hasNext, refetch } = usePaginationFragment<
    ChatRoomParticipantsPaginationQuery,
    MembersListFragment$key
  >(MembersListFragment, chatRoom)

  const members = data?.memberList
  // TODO: handle error for chatRoom
  if (!chatRoom) {
    return <div>Chat room not found</div>
  }

  return (
    <ChatRoomContainer>
      <ChatRoomHeader
        isArchived={!!chatRoom.isArchived}
        participantsCount={chatRoom.participantsCount}
        roomTitleRef={chatRoom}
        onDisplayGroupDetailsClicked={onDisplayGroupDetailsClicked}
        roomId={roomId}
      />
      <ChatBodyContainer>
        <MessagesList roomRef={chatRoom} {...MessagesListProps} />
        <Box paddingRight={2}>
          <SendMessage
            roomId={roomId}
            chatRoomMembers={members?.edges ?? []}
            loadNext={loadNext}
            isLoadingNext={isLoadingNext}
            hasNext={hasNext}
            refetch={refetch}
            {...SendMessageProps}
          />
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
