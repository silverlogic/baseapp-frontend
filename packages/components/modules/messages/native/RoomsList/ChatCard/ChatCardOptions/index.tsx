import { FC, useMemo } from 'react'

import { BottomDrawer } from '@baseapp-frontend/design-system/components/native/drawers'
import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

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

  const chatOrGroup = isGroup ? 'Group' : 'Chat'

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
            {isArchived ? `Unarchive ${chatOrGroup}` : `Archive ${chatOrGroup}`}
          </Text>
        </Pressable>
        {/* TODO Not implemented yet */}
        <Pressable onPress={handleMarkAsUnread} style={styles.modalItem}>
          <Text variant="body2" color="high">
            Mark as Unread
          </Text>
        </Pressable>
        <Pressable onPress={handleChatDetails} style={styles.modalItem}>
          <Text variant="body2" color="high">
            {chatOrGroup} Details
          </Text>
        </Pressable>
        {!isGroup && (
          <Pressable onPress={handleGoToProfile} style={styles.modalItem}>
            <Text variant="body2" color="high">
              Go to Profile
            </Text>
          </Pressable>
        )}
      </View>
      <View style={[styles.modalContent, { borderBottomWidth: 0 }]}>
        <Pressable onPress={handleDeleteChat} style={styles.modalItem}>
          <Text variant="body2" style={{ color: theme.colors.error.main }}>
            {isGroup ? 'Leave Group' : 'Delete Chat'}
          </Text>
        </Pressable>
      </View>
    </BottomDrawer>
  )
}

export default ChatCardOptions
