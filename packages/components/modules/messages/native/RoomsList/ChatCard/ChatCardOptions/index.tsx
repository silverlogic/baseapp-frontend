import { FC, useMemo } from 'react'

import { BottomDrawer } from '@baseapp-frontend/design-system/components/native/drawers'
import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { FormattedMessage } from 'react-intl'
import { Pressable } from 'react-native'

import { createStyles } from './styles'
import { ChatCardOptionsProps } from './type'

const ChatCardOptions: FC<ChatCardOptionsProps> = ({
  bottomDrawerRef,
  handleSheetChanges,
  handleArchiveChat,
  handleMarkAsUnread,
  handleChatDetails,
  handleGoToProfile,
  handleDeleteChat,
  isArchived,
  isArchiveMutationInFlight,
  isGroup = false,
}) => {
  const theme = useTheme()
  const styles = createStyles(theme)
  const snapPoints = useMemo(() => ['50%', '90%'], [])

  return (
    <BottomDrawer
      bottomDrawerRef={bottomDrawerRef}
      handleSheetChanges={handleSheetChanges}
      snapPoints={snapPoints}
    >
      <View style={styles.modalContent}>
        <Pressable
          onPress={handleArchiveChat}
          style={styles.modalItem}
          disabled={isArchiveMutationInFlight}
        >
          <Text variant="body2" color="high">
            {isArchived && isGroup && (
              <FormattedMessage
                id="messages.chatRoomOptions.unarchiveGroup"
                defaultMessage="Unarchive Group"
              />
            )}
            {isArchived && !isGroup && (
              <FormattedMessage
                id="messages.shared.unarchiveChat"
                defaultMessage="Unarchive Chat"
              />
            )}
            {!isArchived && isGroup && (
              <FormattedMessage
                id="messages.chatRoomOptions.archiveGroup"
                defaultMessage="Archive Group"
              />
            )}
            {!isArchived && !isGroup && (
              <FormattedMessage id="messages.shared.archiveChat" defaultMessage="Archive Chat" />
            )}
          </Text>
        </Pressable>
        {/* TODO Not implemented yet */}
        <Pressable onPress={handleMarkAsUnread} style={styles.modalItem}>
          <Text variant="body2" color="high">
            <FormattedMessage
              id="messages.chatRoomItem.markAsUnread"
              defaultMessage="Mark as Unread"
            />
          </Text>
        </Pressable>
        <Pressable onPress={handleChatDetails} style={styles.modalItem}>
          <Text variant="body2" color="high">
            {isGroup ? (
              <FormattedMessage
                id="messages.chatRoom.options.groupDetails"
                defaultMessage="Group Details"
              />
            ) : (
              <FormattedMessage
                id="messages.chatRoomOptions.chatDetails"
                defaultMessage="Chat Details"
              />
            )}
          </Text>
        </Pressable>
        {!isGroup && (
          <Pressable onPress={handleGoToProfile} style={styles.modalItem}>
            <Text variant="body2" color="high">
              <FormattedMessage
                id="messages.chatRoomOptions.goToProfile"
                defaultMessage="Go to Profile"
              />
            </Text>
          </Pressable>
        )}
      </View>
      <View style={[styles.modalContent, { borderBottomWidth: 0 }]}>
        <Pressable onPress={handleDeleteChat} style={styles.modalItem}>
          <Text variant="body2" style={{ color: theme.colors.error.main }}>
            {isGroup ? (
              <FormattedMessage id="messages.shared.leaveGroup" defaultMessage="Leave Group" />
            ) : (
              <FormattedMessage
                id="messages.chatRoomOptions.deleteChat"
                defaultMessage="Delete Chat"
              />
            )}
          </Text>
        </Pressable>
      </View>
    </BottomDrawer>
  )
}

export default ChatCardOptions
