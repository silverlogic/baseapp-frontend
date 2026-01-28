import { FC } from 'react'

import { CircledAvatar } from '@baseapp-frontend/design-system/components/native/avatars'
import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { View } from '@baseapp-frontend/design-system/components/native/views'

import { formatHandle } from '../../../../__shared__/common'
import { createStyles } from './styles'
import { ProfileSummaryProps } from './types'

const ProfileSummary: FC<ProfileSummaryProps> = ({ name, avatar, username }) => {
  const styles = createStyles()

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <CircledAvatar imgSource={avatar} size={128} />
        <View style={styles.profileInfo}>
          <Text variant="subtitle1" color="high">
            {name}
          </Text>
          {username && (
            <Text variant="body2" color="low">
              {formatHandle(username)}
            </Text>
          )}
        </View>
      </View>
    </View>
  )
}

export default ProfileSummary
