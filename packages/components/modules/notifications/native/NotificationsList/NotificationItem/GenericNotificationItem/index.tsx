import { FC } from 'react'

import { formatRelativeTime } from '@baseapp-frontend/utils'

import Notification from '../Notification'
import { GenericNotificationItemProps } from './types'

/**
 * Renders any notification from its actor, `description` and timestamp. `NotificationItemRenderer`
 * falls back to it for verbs that have no dedicated component, so a project can send new kinds of
 * notifications without an app change. Pressing it is handled by `NotificationItem`'s `onPress`.
 */
const GenericNotificationItem: FC<GenericNotificationItemProps> = ({ notification }) => {
  // The fragment reads a name and image only from a Profile actor; any other actor has neither.
  const actorName = notification.actor?.name

  return (
    <Notification.Root>
      {!!actorName && <Notification.Avatar actorAvatar={notification.actor?.image ?? undefined} />}
      <Notification.Content>
        <Notification.Content.Header
          message={notification.description ?? ''}
          timestamp={formatRelativeTime(notification.timestamp)}
          actorName={actorName}
          unread={notification.unread}
        />
      </Notification.Content>
    </Notification.Root>
  )
}

export default GenericNotificationItem
