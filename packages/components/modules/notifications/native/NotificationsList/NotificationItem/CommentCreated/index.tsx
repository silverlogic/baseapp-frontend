import { FC } from 'react'

import { formatRelativeTime } from '@baseapp-frontend/utils'

import { useIntl } from 'react-intl'

import Notification from '../Notification'
import { GenericItemProps } from '../types'

const CommentCreated: FC<GenericItemProps> = ({ notification }) => {
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
    <Notification.Root>
      <Notification.Avatar actorAvatar={notification.actor?.image ?? undefined} />
      <Notification.Content>
        <Notification.Content.Header
          message={message}
          timestamp={formatRelativeTime(notification.timestamp, { intl })}
          actorName={notification.actor?.name}
          unread={notification.unread}
        />
        <Notification.Content.Body content={notification.actionObject?.body} />
      </Notification.Content>
    </Notification.Root>
  )
}

export default CommentCreated
