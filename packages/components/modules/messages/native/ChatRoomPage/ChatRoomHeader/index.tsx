import { FC } from 'react'

import { TitleFragment, useNameAndAvatar } from '@baseapp-frontend/components/messages/common'
import { AvatarWithPlaceholder } from '@baseapp-frontend/design-system/components/native/avatars'
import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { View } from '@baseapp-frontend/design-system/components/native/views'

import { useFragment } from 'react-relay'

import { createStyles } from './styles'
import { ChatRoomHeaderProps } from './types'

const ChatRoomHeader: FC<ChatRoomHeaderProps> = ({ roomRef }) => {
  const roomHeader = useFragment(TitleFragment, roomRef)
  const { title, avatar } = useNameAndAvatar(roomHeader)
  const styles = createStyles()

  return (
    <View style={styles.profileCard}>
      <AvatarWithPlaceholder imgSource={avatar} size={32} />
      <View style={styles.profileInfo}>
        <Text variant="subtitle1">{title}</Text>
      </View>
    </View>
  )
}

export default ChatRoomHeader
