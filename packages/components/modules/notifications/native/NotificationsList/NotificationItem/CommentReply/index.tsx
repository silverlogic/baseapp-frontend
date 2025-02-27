import { FC } from 'react'

import { formatRelativeTime } from '@baseapp-frontend/utils'

import Notification from '../Notification'
import { GenericItemProps } from '../types'

const CommentReply: FC<GenericItemProps> = ({ notification }) => {
  // eslint-disable-next-line no-underscore-dangle
  const message = `added a comment to your ${notification.target?.__typename.toLowerCase()}`

  return (
    <Notification.Root>
      <Notification.Avatar actorAvatar={notification.actor?.avatar?.url} />
      <Notification.Content>
        <Notification.Content.Header
          message={message}
          timestamp={formatRelativeTime(notification.timestamp)}
          actorName={notification.actor?.fullName}
          unread={notification.unread}
        />
        <Notification.Content.Body content={notification.actionObject?.body} />
      </Notification.Content>
    </Notification.Root>
  )
}

export default CommentReply
