import { FC } from 'react'

import { formatRelativeTime } from '@baseapp-frontend/utils'

import { useIntl } from 'react-intl'

import DefaultNotificationAvatar from '../Notification/NotificationAvatar'
import DefaultNotificationBody from '../Notification/NotificationBody'
import DefaultNotificationHeader from '../Notification/NotificationHeader'
import {
  NotificationContent as DefaultNotificationContent,
  NotificationRoot as DefaultNotificationRoot,
} from '../styled'
import { CommentCreatedProps } from './types'

const CommentCreated: FC<CommentCreatedProps> = ({
  notification,
  NotificationRoot = DefaultNotificationRoot,
  NotificationContent = DefaultNotificationContent,
  NotificationAvatar = DefaultNotificationAvatar,
  NotificationAvatarProps = {},
  NotificationHeader = DefaultNotificationHeader,
  NotificationHeaderProps = {},
  NotificationBody = DefaultNotificationBody,
  NotificationBodyProps = {},
}) => {
  const intl = useIntl()
  const message = intl.formatMessage(
    {
      id: 'notifications.commentCreated.message',
      defaultMessage:
        'commented in {target, select, comment {your comment} contentpost {your contentpost} file {your file} page {your page} other {your {target}}}',
    },
    // eslint-disable-next-line no-underscore-dangle
    { target: notification.target?.__typename?.toLowerCase?.() ?? '' },
  )

  return (
    <NotificationRoot>
      <NotificationAvatar
        actorAvatar={notification.actor?.image ?? undefined}
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
        <NotificationBody content={notification.actionObject?.body} {...NotificationBodyProps} />
      </NotificationContent>
    </NotificationRoot>
  )
}

export default CommentCreated
