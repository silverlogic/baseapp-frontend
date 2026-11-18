import { FC } from 'react'

import { formatRelativeTime } from '@baseapp-frontend/utils'

import { useIntl } from 'react-intl'

import Notification from '../Notification'
import NotificationContent from '../Notification/NotificationContent'
import { GenericItemProps } from '../types'

const ReactionCreated: FC<GenericItemProps> = ({ notification }) => {
  const intl = useIntl()
  const message = intl.formatMessage(
    {
      id: 'notifications.reactionCreated.message',
      defaultMessage:
        'liked {target, select, comment {your comment} contentpost {your contentpost} file {your file} page {your page} other {your {target}}}',
    },
    // eslint-disable-next-line no-underscore-dangle
    { target: notification.target?.__typename?.toLowerCase?.() ?? '' },
  )

  return (
    <Notification.Root>
      <Notification.Avatar actorAvatar={notification.actor?.image ?? undefined} />
      <NotificationContent>
        <NotificationContent.Header
          message={message}
          timestamp={formatRelativeTime(notification.timestamp, { intl })}
          actorName={notification.actor?.name}
          unread={notification.unread}
        />
      </NotificationContent>
    </Notification.Root>
  )
}

export default ReactionCreated
