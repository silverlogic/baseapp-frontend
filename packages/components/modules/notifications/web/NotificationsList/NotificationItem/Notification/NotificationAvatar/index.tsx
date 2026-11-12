import { FC } from 'react'

import { AvatarWithPlaceholder } from '@baseapp-frontend/design-system/components/web/avatars'

import { useIntl } from 'react-intl'

import { NotificationAvatarProps } from './types'

const NotificationAvatar: FC<NotificationAvatarProps> = ({ actorAvatar, actorName }) => {
  const intl = useIntl()

  return (
    <AvatarWithPlaceholder
      width={40}
      height={40}
      alt={
        actorName ??
        intl.formatMessage({
          id: 'notifications.item.avatarAlt',
          defaultMessage: "Notification's user avatar",
        })
      }
      src={actorAvatar ?? ''}
    />
  )
}

export default NotificationAvatar
