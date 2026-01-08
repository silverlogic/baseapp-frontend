import { FC, useCallback, useRef, useState } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import {
  useArchiveChatRoomMutation,
  useCheckIsAdmin,
  useNameAndAvatar,
  useUnreadChatMutation,
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
import { MembersListFragment$data } from '../../../../../../__generated__/MembersListFragment.graphql'
import { RoomTitleFragment$key } from '../../../../../../__generated__/RoomTitleFragment.graphql'
import { TitleFragment$key } from '../../../../../../__generated__/TitleFragment.graphql'
import { UnreadMessagesCountFragment$key } from '../../../../../../__generated__/UnreadMessagesCountFragment.graphql'
import { LastMessageFragment } from '../../../../common/graphql/fragments/LastMessage'
import { RoomTitleFragment } from '../../../../common/graphql/fragments/RoomTitle'
import { TitleFragment } from '../../../../common/graphql/fragments/Title'
import { UnreadMessagesCountFragment } from '../../../../common/graphql/fragments/UnreadMessagesCount'
import { LeaveGroupDialog } from '../../../__shared__/LeaveGroupDialog'
import ChatCardOptions from '../ChatCardOptions'
import { createStyles } from './styles'
import { ChatCardComponentProps } from './type'

const ChatCardComponent: FC<ChatCardComponentProps> = ({ roomRef, isArchived }) => {
  const theme = useTheme()
  const styles = createStyles(theme)
  const router = useRouter()
  const [openConfirmLeaveGroupDialog, setOpenConfirmLeaveGroupDialog] = useState(false)
  const roomId = useFragment(TitleFragment, roomRef)?.id
  const bottomDrawerRef = useRef<BottomSheetModal | undefined>(undefined)
  const [commit, isMutationInFlight] = useArchiveChatRoomMutation()
  const { currentProfile } = useCurrentProfile()
  const [commitMarkAsRead] = useUnreadChatMutation()

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

  const isGroup = !!headerFragment?.isGroup
  const { title, avatar } = useNameAndAvatar(headerFragment)
  const { lastMessageTime } = lastMessageFragment

  const { participants } = useFragment<RoomTitleFragment$key>(RoomTitleFragment, headerFragment)
  const { isSoleAdmin } = useCheckIsAdmin(participants as MembersListFragment$data['participants'])

  const lastMessage = lastMessageFragment.lastMessage?.content
  const hasUnreadMessages =
    unreadMessagesCountFragment?.unreadMessages?.markedUnread ||
    !!unreadMessagesCountFragment?.unreadMessages?.count

  const onChatCardPress = () => {
    if (!roomId) return
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

  const handleMarkAsUnread = useCallback(() => {
    bottomDrawerRef.current?.close()
    if (!roomId || !currentProfile?.id) return
    commitMarkAsRead({
      variables: {
        input: {
          roomId,
          profileId: currentProfile?.id,
        },
      },
    })
  }, [roomId, currentProfile])

  const handleChatDetails = () => {
    bottomDrawerRef.current?.close()
    if (isGroup && roomId) {
      router.push(`/group-details/${roomId}`)
      return
    }
    console.log('Not implemented yet.')
  }
  const handleGoToProfile = () => {
    bottomDrawerRef.current?.close()
    console.log('Not implemented yet.')
  }
  const handleDeleteChat = () => {
    bottomDrawerRef.current?.close()
    if (isGroup) {
      setOpenConfirmLeaveGroupDialog(true)
      return
    }
    console.log('Not implemented yet.')
  }

  return (
    <Pressable
      key={`chat-card-${roomId}`}
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
          {hasUnreadMessages && (
            <Badge>{unreadMessagesCountFragment?.unreadMessages?.count || ''}</Badge>
          )}
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
        isGroup={isGroup}
      />
      {currentProfile?.id && (
        <LeaveGroupDialog
          open={openConfirmLeaveGroupDialog}
          onClose={() => setOpenConfirmLeaveGroupDialog(false)}
          profileId={currentProfile?.id}
          roomId={roomId}
          removingParticipantId={currentProfile?.id}
          isSoleAdmin={isSoleAdmin}
        />
      )}
    </Pressable>
  )
}

export default ChatCardComponent
