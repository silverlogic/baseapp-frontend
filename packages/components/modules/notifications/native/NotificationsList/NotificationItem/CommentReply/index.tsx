import { FC } from 'react'

import { useIntl } from 'react-intl'

import { formatRelativeTime } from '../../../../../__shared__/common'
import Notification from '../Notification'
import { GenericItemProps } from '../types'

const CommentReply: FC<GenericItemProps> = ({ notification }) => {
  const intl = useIntl()
  const message = intl.formatMessage({
    id: 'notifications.commentReply.message',
    defaultMessage: 'replied to your comment',
  })

  return (
    <Notification.Root>
      <Notification.Avatar actorAvatar={notification.actor?.image ?? undefined} />
      <Notification.Content>
        <Notification.Content.Header
          message={message}
          timestamp={formatRelativeTime(intl, notification.timestamp)}
          actorName={notification.actor?.name}
          unread={notification.unread}
        />
        <Notification.Content.Body content={notification.actionObject?.body} />
      </Notification.Content>
    </Notification.Root>
  )
}

export default CommentReply
