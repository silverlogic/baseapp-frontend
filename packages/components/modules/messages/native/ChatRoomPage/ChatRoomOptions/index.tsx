import React, { FC } from 'react'

import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { useIntl } from 'react-intl'
import { View } from 'react-native'
import { IconButton, Menu } from 'react-native-paper'

import { createStyles } from './styles'
import { ChatRoomOptionsProps } from './type'

const ChatRoomOptions: FC<ChatRoomOptionsProps> = ({
  visible,
  setVisible,
  isArchived,
  handleArchiveChat,
  handleChatDetails,
  handleGoToProfile,
  handleDeleteChat,
  isArchiveMutationInFlight,
  isGroup = false,
}) => {
  const openMenu = () => setVisible(true)
  const closeMenu = () => setVisible(false)
  const theme = useTheme()
  const styles = createStyles(theme)
  const intl = useIntl()

  const archiveTitle = isGroup
    ? intl.formatMessage({
        id: 'messages.chatRoomOptions.archiveGroup',
        defaultMessage: 'Archive Group',
      })
    : intl.formatMessage({ id: 'messages.shared.archiveChat', defaultMessage: 'Archive Chat' })
  const unarchiveTitle = isGroup
    ? intl.formatMessage({
        id: 'messages.chatRoomOptions.unarchiveGroup',
        defaultMessage: 'Unarchive Group',
      })
    : intl.formatMessage({ id: 'messages.shared.unarchiveChat', defaultMessage: 'Unarchive Chat' })
  const detailsTitle = isGroup
    ? intl.formatMessage({
        id: 'messages.chatRoom.options.groupDetails',
        defaultMessage: 'Group Details',
      })
    : intl.formatMessage({
        id: 'messages.chatRoomOptions.chatDetails',
        defaultMessage: 'Chat Details',
      })
  const deleteTitle = isGroup
    ? intl.formatMessage({ id: 'messages.shared.leaveGroup', defaultMessage: 'Leave Group' })
    : intl.formatMessage({
        id: 'messages.chatRoomOptions.deleteChat',
        defaultMessage: 'Delete Chat',
      })

  return (
    <View>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <View>
            <IconButton icon="dots-vertical" size={22} onPress={openMenu} />
          </View>
        }
        anchorPosition="bottom"
        contentStyle={styles.menuContentStyle}
        style={styles.menuStyle}
      >
        <Menu.Item
          onPress={() => {
            closeMenu()
            handleArchiveChat()
          }}
          disabled={isArchiveMutationInFlight}
          title={isArchived ? unarchiveTitle : archiveTitle}
        />
        {/* TODO: Not implemented yet */}
        <Menu.Item
          onPress={() => {
            closeMenu()
            handleChatDetails()
          }}
          title={detailsTitle}
        />
        {!isGroup && (
          <Menu.Item
            onPress={() => {
              closeMenu()
              handleGoToProfile()
            }}
            title={intl.formatMessage({
              id: 'messages.chatRoomOptions.goToProfile',
              defaultMessage: 'Go to Profile',
            })}
          />
        )}
        <Menu.Item
          onPress={() => {
            closeMenu()
            handleDeleteChat()
          }}
          title={deleteTitle}
          titleStyle={styles.deleteTitleStyle}
        />
      </Menu>
    </View>
  )
}

export default ChatRoomOptions
