import { useRef } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import {
  useArchiveChatRoomMutation,
  useNameAndAvatar,
} from '@baseapp-frontend/components/messages/common'
import { AvatarWithPlaceholder } from '@baseapp-frontend/design-system/components/native/avatars'
import { Badge } from '@baseapp-frontend/design-system/components/native/badges'
import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'
import { formatRelativeTime } from '@baseapp-frontend/utils'

import { type BottomSheetModal } from '@gorhom/bottom-sheet'
import { useRouter } from 'expo-router'
import { Pressable } from 'react-native'
import { useFragment } from 'react-relay'

import { LastMessageFragment$key } from '../../../../../../__generated__/LastMessageFragment.graphql'
import { RoomsListFragment$key } from '../../../../../../__generated__/RoomsListFragment.graphql'
import { TitleFragment$key } from '../../../../../../__generated__/TitleFragment.graphql'
import { UnreadMessagesCountFragment$key } from '../../../../../../__generated__/UnreadMessagesCountFragment.graphql'
import { LastMessageFragment } from '../../../../common/graphql/fragments/LastMessage'
import { TitleFragment } from '../../../../common/graphql/fragments/Title'
import { UnreadMessagesCountFragment } from '../../../../common/graphql/fragments/UnreadMessagesCount'
import ChatCardOptions from '../ChatCardOptions'
import { createStyles } from './styles'

const ChatCard = ({
  roomRef,
  isArchived,
}: {
  roomRef: RoomsListFragment$key
  isArchived: boolean
}) => {
  const theme = useTheme()
  const styles = createStyles(theme)
  const router = useRouter()
  const roomId = useFragment(TitleFragment, roomRef)?.id
  const bottomDrawerRef = useRef<BottomSheetModal | undefined>(undefined)
  const [commit, isMutationInFlight] = useArchiveChatRoomMutation()
  const { currentProfile } = useCurrentProfile()

  const lastMessageFragment = useFragment<LastMessageFragment$key>(
    LastMessageFragment,
    roomRef as unknown as LastMessageFragment$key,
  )
  const headerFragment = useFragment<TitleFragment$key>(
    TitleFragment,
    roomRef as unknown as TitleFragment$key,
  )
  const unreadMessagesCountFragment = useFragment<UnreadMessagesCountFragment$key>(
    UnreadMessagesCountFragment,
    roomRef as unknown as UnreadMessagesCountFragment$key,
  )

  const { title, avatar } = useNameAndAvatar(headerFragment)
  const { lastMessageTime } = lastMessageFragment

  const lastMessage = lastMessageFragment.lastMessage?.content
  const hasUnreadMessages =
    unreadMessagesCountFragment?.unreadMessages?.markedUnread ||
    !!unreadMessagesCountFragment?.unreadMessages?.count

  const onChatCardPress = () => {
    router.push(`/rooms/${roomId}`)
  }

  const onChatCardLongPress = () => {
    bottomDrawerRef.current?.present()
  }

  const handleArchiveChat = () => {
    if (currentProfile?.id && roomId) {
      commit({
        variables: {
          input: {
            roomId,
            profileId: currentProfile.id,
            archive: !isArchived,
          },
        },
      })
    }
    bottomDrawerRef.current?.close()
  }

  const handleMarkAsUnread = () => {
    alert('Mark as Unread functionality not implemented yet.')
    bottomDrawerRef.current?.close()
  }
  const handleChatDetails = () => {
    alert('Chat Details functionality not implemented yet.')
    bottomDrawerRef.current?.close()
  }
  const handleGoToProfile = () => {
    alert('Go to Profile functionality not implemented yet.')
    bottomDrawerRef.current?.close()
  }
  const handleDeleteChat = () => {
    alert('Delete Chat functionality not implemented yet.')
    bottomDrawerRef.current?.close()
  }

  return (
    <Pressable
      key={`chat-card-${roomRef}`}
      onPress={onChatCardPress}
      onLongPress={onChatCardLongPress}
    >
      <View style={styles.profileCard}>
        <AvatarWithPlaceholder imgSource={avatar} size={48} />
        <View style={styles.profileInfo}>
          <Text variant="subtitle1">{title}</Text>
          {lastMessage && lastMessageTime ? (
            <View style={styles.lastMessageContainer}>
              <Text
                variant="caption"
                style={styles.lastMessageText}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {formatRelativeTime(lastMessageTime)} • {lastMessage}
              </Text>
            </View>
          ) : null}
        </View>
        <View style={styles.profileCounterContainer}>
          {hasUnreadMessages && <Badge>{unreadMessagesCountFragment?.unreadMessages?.count}</Badge>}
        </View>
      </View>
      <ChatCardOptions
        bottomDrawerRef={bottomDrawerRef}
        handleSheetChanges={() => {}}
        handleArchiveChat={handleArchiveChat}
        handleMarkAsUnread={handleMarkAsUnread}
        handleChatDetails={handleChatDetails}
        handleGoToProfile={handleGoToProfile}
        handleDeleteChat={handleDeleteChat}
        isArchiveMutationInFlight={isMutationInFlight}
        isArchived={isArchived}
      />
    </Pressable>
  )
}

export { ChatCard }
