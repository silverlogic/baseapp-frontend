import { FC } from 'react'

import { useNameAndAvatar } from '@baseapp-frontend/components/messages/common'
import { AvatarWithPlaceholder } from '@baseapp-frontend/design-system/components/native/avatars'
import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { View } from '@baseapp-frontend/design-system/components/native/views'

import { Pressable } from 'react-native'

import { createStyles } from './styles'
import { ChatRoomHeaderProps } from './types'

const ChatRoomHeader: FC<ChatRoomHeaderProps> = ({ roomHeader, onChatDetailsClicked }) => {
  const { title, avatar } = useNameAndAvatar(roomHeader)
  const styles = createStyles()

  return (
    <Pressable style={styles.profileCard} onPress={onChatDetailsClicked}>
      <AvatarWithPlaceholder imgSource={avatar} size={32} />
      <View style={styles.profileInfo}>
        <Text variant="subtitle1">{title}</Text>
      </View>
    </Pressable>
  )
}

export default ChatRoomHeader
