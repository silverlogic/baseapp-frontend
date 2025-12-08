import { FC } from 'react'

import { formatRelativeTime } from '@baseapp-frontend/utils'

import Notification from '../Notification'
import NotificationContent from '../Notification/NotificationContent'
import { GenericItemProps } from '../types'

const ReactionCreated: FC<GenericItemProps> = ({ notification }) => {
  // eslint-disable-next-line no-underscore-dangle
  const message = `liked your ${notification.target?.__typename.toLowerCase()}`

  return (
    <Notification.Root>
      <Notification.Avatar actorAvatar={notification.actor?.image?.url} />
      <NotificationContent>
        <NotificationContent.Header
          message={message}
          timestamp={formatRelativeTime(notification.timestamp)}
          actorName={notification.actor?.name}
          unread={notification.unread}
        />
        <NotificationContent.Body content={notification.target?.body} />
      </NotificationContent>
    </Notification.Root>
  )
}

export default ReactionCreated
