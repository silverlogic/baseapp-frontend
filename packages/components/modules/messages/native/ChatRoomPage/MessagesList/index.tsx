import { FC, Suspense, useCallback, useEffect, useMemo, useRef } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { LoadingScreen } from '@baseapp-frontend/design-system/components/native/displays'
import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { FlatList, TextInput as NativeTextInput } from 'react-native'
import { usePaginationFragment } from 'react-relay'

import { ChatRoomMessagesListPaginationQuery } from '../../../../../__generated__/ChatRoomMessagesListPaginationQuery.graphql'
import { MessagesListFragment$key } from '../../../../../__generated__/MessagesListFragment.graphql'
import {
  MESSAGE_TYPE,
  MessagesListFragment,
  useReadMessageMutation,
  withChatRoomProvider,
} from '../../../common'
import MessageCreate from '../../MessageCreate'
import { useMessagesListSubscription } from '../../graphql/subscriptions/useMessagesListSubscription'
import { MessagesGroup as DefaultMessagesGroup } from './MessagesGroup'
import { createStyles } from './styles'
import { MessagesListProps } from './types'

const MessagesList: FC<MessagesListProps> = ({
  roomRef,
  MessagesGroup = DefaultMessagesGroup,
  MessagesGroupProps = {},
}) => {
  const flatListRef = useRef(null)
  const messageCreateRef = useRef<NativeTextInput>(null)

  const {
    data: room,
    loadNext,
    isLoadingNext,
    hasNext,
  } = usePaginationFragment<ChatRoomMessagesListPaginationQuery, MessagesListFragment$key>(
    MessagesListFragment,
    roomRef,
  )

  const roomId = room?.id || ''

  const theme = useTheme()
  const styles = createStyles(theme)

  const totalNumberOfMessages = room?.allMessages?.totalCount ?? 0

  const allMessages = useMemo(
    () => room?.allMessages?.edges.filter((edge) => edge?.node).map((edge) => edge?.node) || [],
    [room?.allMessages?.edges],
  )
  const allMessagesLastIndex = Number(allMessages?.length) - 1
  const firstItemIndex = Math.max(totalNumberOfMessages - allMessages.length, 0)

  const { currentProfile } = useCurrentProfile()

  const getFirstUnreadMessageId = () => {
    if (!room?.unreadMessages?.count) return null
    const userMessages = allMessages.filter((message) => message?.messageType === MESSAGE_TYPE.user)
    const unreadMessage = userMessages.find((message, index) => {
      const previousMessage = userMessages?.[index + 1]
      const hasPreviousMessage = !!previousMessage
      return (
        message?.profile?.id !== currentProfile?.id &&
        !message?.isRead &&
        (!hasPreviousMessage || previousMessage?.isRead)
      )
    })

    if (!unreadMessage) return null

    return unreadMessage.id
  }

  const firstUnreadMessageId = useMemo(getFirstUnreadMessageId, [
    roomId,
    currentProfile,
    allMessages,
  ])

  const [commitMutation] = useReadMessageMutation()

  useEffect(() => {
    if (room?.unreadMessages?.count !== 0 || room?.unreadMessages.markedUnread) {
      setTimeout(() => {
        commitMutation({
          variables: {
            input: {
              roomId: room?.id as string,
              profileId: currentProfile?.id as string,
            },
          },
        })
      }, 1000)
    }
  }, [room?.id, room?.unreadMessages?.count, currentProfile?.id])

  useMessagesListSubscription(room.id, currentProfile?.id!)

  const renderMessagesGroup = useCallback(
    (index: number) => {
      const message = allMessages[index]

      return (
        <MessagesGroup
          allMessages={allMessages}
          message={message}
          messageIndex={index}
          isGroup={room?.isGroup}
          allMessagesLastIndex={allMessagesLastIndex}
          firstUnreadMessageId={firstUnreadMessageId}
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
    <View style={styles.flatListWrapper}>
      <FlatList
        scrollEventThrottle={16}
        ref={flatListRef}
        data={allMessages}
        keyExtractor={(item, i) => (item && item.id) || i.toString()}
        renderItem={({ index }) => renderMessagesGroup(index)}
        inverted
        contentContainerStyle={styles.flatListContentContainer}
        onEndReached={() => {
          if (hasNext && !isLoadingNext) {
            loadNext(10)
          }
        }}
        ListFooterComponent={isLoadingNext ? <LoadingScreen /> : null}
        style={styles.flatList}
        onStartReachedThreshold={0.1}
      />
      <MessageCreate targetObjectId={roomId} ref={messageCreateRef} />
    </View>
  )
}

const MessagesListWithProvider = withChatRoomProvider(MessagesList)

const SuspendedMessagesList = (props: MessagesListProps) => (
  <Suspense>
    <MessagesListWithProvider {...props} />
  </Suspense>
)

export default SuspendedMessagesList
