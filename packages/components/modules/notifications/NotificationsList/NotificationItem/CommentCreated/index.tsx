import { FC } from 'react'

import { formatRelativeTime } from '@baseapp-frontend/utils'

import Notification from '../Notification'
import NotificationContent from '../Notification/NotificationContent'
import { GenericItemProps } from '../types'

const CommentCreated: FC<GenericItemProps> = ({ notification }) => {
  // eslint-disable-next-line no-underscore-dangle
  const message = `added a comment to your ${notification.target?.__typename.toLowerCase()}`

  return (
    <Notification.Root>
      <Notification.Avatar
        actorAvatar={notification.actor?.avatar?.url ?? ''}
        actorName={notification.actor?.fullName ?? ''}
      />
      <NotificationContent>
        <NotificationContent.Header
          message={message}
          timestamp={formatRelativeTime(notification.timestamp)}
          actorName={notification.actor?.fullName ?? ''}
          unread={notification.unread}
        />
        <NotificationContent.Body content={notification.actionObject?.body ?? ''} />
      </NotificationContent>
    </Notification.Root>
  )
}

export default CommentCreated
