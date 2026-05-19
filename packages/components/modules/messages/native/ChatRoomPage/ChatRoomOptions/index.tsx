import React, { FC } from 'react'

import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { View } from 'react-native'
import { IconButton, Menu } from 'react-native-paper'

import { CHAT_ROOM_OPTION_VALUES } from './constants'
import type { ChatRoomOptionValue } from './constants'
import { createStyles } from './styles'
import { ChatRoomOptionsProps } from './type'
import { getVisibleOptions } from './utils'

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
  hiddenOptions = [],
}) => {
  const openMenu = () => setVisible(true)
  const closeMenu = () => setVisible(false)
  const theme = useTheme()
  const styles = createStyles(theme)

  const chatOrGroup = isGroup ? 'Group' : 'Chat'

  const renderOption = (value: ChatRoomOptionValue) => {
    switch (value) {
      case CHAT_ROOM_OPTION_VALUES.archive:
        return (
          <Menu.Item
            key={value}
            onPress={() => {
              closeMenu()
              handleArchiveChat()
            }}
            disabled={isArchiveMutationInFlight}
            title={isArchived ? `Unarchive ${chatOrGroup}` : `Archive ${chatOrGroup}`}
          />
        )
      case CHAT_ROOM_OPTION_VALUES.chatDetails:
        return (
          <Menu.Item
            key={value}
            onPress={() => {
              closeMenu()
              handleChatDetails()
            }}
            title={`${chatOrGroup} Details`}
          />
        )
      case CHAT_ROOM_OPTION_VALUES.goToProfile:
        return (
          <Menu.Item
            key={value}
            onPress={() => {
              closeMenu()
              handleGoToProfile()
            }}
            title="Go to Profile"
          />
        )
      case CHAT_ROOM_OPTION_VALUES.delete:
        return (
          <Menu.Item
            key={value}
            onPress={() => {
              closeMenu()
              handleDeleteChat()
            }}
            title={isGroup ? 'Leave Group' : 'Delete Chat'}
            titleStyle={styles.deleteTitleStyle}
          />
        )
      default:
        return null
    }
  }

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
        {getVisibleOptions({ hiddenOptions, isGroup }).map(renderOption)}
      </Menu>
    </View>
  )
}

export default ChatRoomOptions
