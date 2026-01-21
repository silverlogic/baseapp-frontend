import { FC } from 'react'

import { useGroupNameAndAvatar } from '@baseapp-frontend/components/messages/common'
import { CircledAvatar } from '@baseapp-frontend/design-system/components/native/avatars'
import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { View } from '@baseapp-frontend/design-system/components/native/views'

import { createStyles } from './styles'
import { GroupProfileProps } from './types'

const GroupProfile: FC<GroupProfileProps> = ({ group }) => {
  const { title, avatar } = useGroupNameAndAvatar(group)
  const participantsCount = group?.participantsCount ?? 0
  const styles = createStyles()

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <CircledAvatar imgSource={avatar} size={128} />
        <View style={styles.profileInfo}>
          <Text variant="subtitle1" color="high">
            {title}
          </Text>
          <Text variant="body2" color="low">
            {participantsCount} {participantsCount === 1 ? 'member' : 'members'}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default GroupProfile
