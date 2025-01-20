import { FC, useCallback, useEffect, useMemo, useRef } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { LoadingState } from '@baseapp-frontend/design-system'

import { Box } from '@mui/material'
import { usePaginationFragment } from 'react-relay'
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso'

import { ChatRoomMessagesListPaginationQuery } from '../../../__generated__/ChatRoomMessagesListPaginationQuery.graphql'
import { MessagesListFragment$key } from '../../../__generated__/MessagesListFragment.graphql'
import { useChatRoom } from '../context'
import { MessagesListFragment } from '../graphql/fragments/MessagesList'
import { useReadMessageMutation } from '../graphql/mutations/ReadMessages'
import useMessagesListSubscription from '../graphql/subscriptions/useMessagesListSubscription'
import DefaultMessagesGroup from './MessagesGroup'
import { MESSAGES_TO_LOAD_NEXT } from './constants'
import { MessagesListProps } from './types'

const MessagesList: FC<MessagesListProps> = ({
  roomRef,
  VirtuosoProps,
  MessagesGroup = DefaultMessagesGroup,
  MessagesGroupProps = {},
}) => {
  const {
    data: room,
    loadNext,
    isLoadingNext,
    hasNext,
  } = usePaginationFragment<ChatRoomMessagesListPaginationQuery, MessagesListFragment$key>(
    MessagesListFragment,
    roomRef,
  )
  const totalNumberOfMessages = room?.allMessages?.totalCount ?? 0

  const virtuosoRef = useRef<VirtuosoHandle>(null)

  const allMessages = useMemo(
    () => room?.allMessages?.edges.filter((edge) => edge?.node).map((edge) => edge?.node) || [],
    [room?.allMessages?.edges],
  )
  const allMessagesLastIndex = Number(allMessages?.length) - 1
  const firstItemIndex = Math.max(totalNumberOfMessages - allMessages.length, 0)

  const { currentProfile } = useCurrentProfile()
  const { id: selectedRoom } = useChatRoom()
  const [commitMutation] = useReadMessageMutation()

  const getFirstUnreadMessageId = () => {
    if (room?.unreadMessages?.count === 0) return null
    return allMessages.find((message, index) => {
      const previousMessage = allMessages?.[index + 1]
      const hasPreviousMessage = !!previousMessage
      return (
        message?.profile?.id !== currentProfile?.id &&
        !message?.isRead &&
        (!hasPreviousMessage || previousMessage?.isRead)
      )
    })?.id
  }

  const firstUnreadMessageId = useMemo(getFirstUnreadMessageId, [selectedRoom, currentProfile])

  useEffect(() => {
    if (room?.unreadMessages?.count !== 0 || room?.unreadMessages.markedUnread) {
      commitMutation({
        variables: {
          input: {
            roomId: room?.id as string,
            profileId: currentProfile?.id as string,
          },
        },
      })
    }
  }, [room?.id, room?.unreadMessages?.count, currentProfile])

  useMessagesListSubscription(room?.id)

  const renderLoadingState = () => {
    if (!isLoadingNext) return <Box sx={{ height: 50 }} />

    return (
      <LoadingState
        sx={{ height: 50 }}
        CircularProgressProps={{ size: 15 }}
        aria-label="loading more messages"
      />
    )
  }

  const renderHeader = () => {
    if (allMessages.length === 0) return null

    return <div className="h-2" />
  }

  const renderMessagesGroup = useCallback(
    (index: number) => {
      const messageIndex = allMessages.length - 1 - (index - firstItemIndex)
      const message = allMessages[messageIndex]

      return (
        <MessagesGroup
          allMessages={allMessages}
          message={message}
          messageIndex={messageIndex}
          isGroup={room?.isGroup}
          allMessagesLastIndex={allMessagesLastIndex}
          firstUnreadMessageId={firstUnreadMessageId}
          hasNext={hasNext}
          {...MessagesGroupProps}
        />
      )
    },
    [
      allMessages,
      allMessagesLastIndex,
      firstItemIndex,
      hasNext,
      room?.isGroup,
      firstUnreadMessageId,
      MessagesGroup,
      MessagesGroupProps,
    ],
  )

  return (
    <Virtuoso
      ref={virtuosoRef}
      firstItemIndex={firstItemIndex}
      style={{ overflowX: 'hidden' }}
      initialTopMostItemIndex={allMessagesLastIndex}
      data={allMessages}
      itemContent={renderMessagesGroup}
      startReached={() => {
        if (hasNext) {
          loadNext(MESSAGES_TO_LOAD_NEXT)
        }
      }}
      components={{
        Header: renderLoadingState,
        Footer: renderHeader,
      }}
      // TODO: using overscan can cause Maximum call stack size exceeded error
      // overscan={MESSAGES_TO_LOAD_NEXT}
      increaseViewportBy={{ top: 100, bottom: 0 }}
      followOutput="smooth"
      {...VirtuosoProps}
    />
  )
}

export default MessagesList
