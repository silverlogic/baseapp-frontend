import { FC } from 'react'

import { formatRelativeTime } from '@baseapp-frontend/utils'

import DefaultNotificationAvatar from '../Notification/NotificationAvatar'
import DefaultNotificationHeader from '../Notification/NotificationHeader'
import {
  NotificationContent as DefaultNotificationContent,
  NotificationRoot as DefaultNotificationRoot,
} from '../styled'
import { ReactionCreatedProps } from './types'

const ReactionCreated: FC<ReactionCreatedProps> = ({
  notification,
  NotificationRoot = DefaultNotificationRoot,
  NotificationContent = DefaultNotificationContent,
  NotificationAvatar = DefaultNotificationAvatar,
  NotificationAvatarProps = {},
  NotificationHeader = DefaultNotificationHeader,
  NotificationHeaderProps = {},
}) => {
  // eslint-disable-next-line no-underscore-dangle
  const message = `liked your ${notification.target?.__typename?.toLowerCase?.() ?? ''}`

  return (
    <NotificationRoot>
      <NotificationAvatar
        actorAvatar={notification.actor?.image?.url}
        actorName={notification.actor?.name}
        {...NotificationAvatarProps}
      />
      <NotificationContent>
        <NotificationHeader
          message={message}
          timestamp={formatRelativeTime(notification.timestamp)}
          actorName={notification.actor?.name}
          unread={notification.unread}
          {...NotificationHeaderProps}
        />
      </NotificationContent>
    </NotificationRoot>
  )
}

export default ReactionCreated
