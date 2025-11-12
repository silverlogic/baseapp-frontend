import React, { FC } from 'react'

import { useTheme } from '@baseapp-frontend/design-system/providers/native'

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
}) => {
  const openMenu = () => setVisible(true)
  const closeMenu = () => setVisible(false)
  const theme = useTheme()
  const styles = createStyles(theme)

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
          title={isArchived ? 'Unarchive Chat' : 'Archive Chat'}
        />
        <Menu.Item
          onPress={() => {
            closeMenu()
            handleChatDetails()
          }}
          title="Chat Details"
        />
        <Menu.Item
          onPress={() => {
            closeMenu()
            handleGoToProfile()
          }}
          title="Go to Profile"
        />
        <Menu.Item
          onPress={() => {
            closeMenu()
            handleDeleteChat()
          }}
          title="Delete Chat"
          titleStyle={styles.deleteTitleStyle}
        />
      </Menu>
    </View>
  )
}

export default ChatRoomOptions
