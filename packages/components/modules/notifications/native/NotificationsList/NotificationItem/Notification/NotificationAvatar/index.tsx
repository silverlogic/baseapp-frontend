import { FC } from 'react'

import { AvatarWithPlaceholder } from '@baseapp-frontend/design-system/components/native/avatars'
import { View } from '@baseapp-frontend/design-system/components/native/views'

import { NotificationAvatarProps } from './types'

const NotificationAvatar: FC<NotificationAvatarProps> = ({ actorAvatar }) => (
  <View>
    <AvatarWithPlaceholder imgSource={actorAvatar} />
  </View>
)

export default NotificationAvatar
