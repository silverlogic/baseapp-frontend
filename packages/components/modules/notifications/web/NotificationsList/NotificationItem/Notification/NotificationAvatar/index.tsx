import { FC } from 'react'

import { AvatarWithPlaceholder } from '@baseapp-frontend/design-system/components/web/avatars'

import { NotificationAvatarProps } from './types'

const NotificationAvatar: FC<NotificationAvatarProps> = ({ actorAvatar, actorName }) => (
  <AvatarWithPlaceholder
    width={40}
    height={40}
    alt={actorName ?? `Notification's user avatar`}
    src={actorAvatar ?? ''}
  />
)

export default NotificationAvatar
