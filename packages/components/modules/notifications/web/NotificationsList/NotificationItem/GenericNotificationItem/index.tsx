import { FC } from 'react'

import { formatRelativeTime } from '@baseapp-frontend/utils'

import { getNotificationUrl as defaultGetNotificationUrl } from '../../../../common'
import DefaultNotificationAvatar from '../Notification/NotificationAvatar'
import DefaultNotificationHeader from '../Notification/NotificationHeader'
import {
  NotificationContent as DefaultNotificationContent,
  NotificationRoot as DefaultNotificationRoot,
} from '../styled'
import { NotificationLink } from './styled'
import { GenericNotificationItemProps } from './types'

/**
 * Renders any notification from its actor, `description` and timestamp. `NotificationItemRenderer`
 * falls back to it for verbs that have no dedicated component, so a project can send new kinds of
 * notifications without a frontend change.
 */
const GenericNotificationItem: FC<GenericNotificationItemProps> = ({
  notification,
  getNotificationUrl = (item) => defaultGetNotificationUrl(item.data),
  NotificationRoot = DefaultNotificationRoot,
  NotificationContent = DefaultNotificationContent,
  NotificationAvatar = DefaultNotificationAvatar,
  NotificationAvatarProps = {},
  NotificationHeader = DefaultNotificationHeader,
  NotificationHeaderProps = {},
}) => {
  // The fragment reads a name and image only from a Profile actor; any other actor has neither.
  const actorName = notification.actor?.name
  const hasActor = !!actorName
  const url = getNotificationUrl(notification)

  const content = (
    <NotificationRoot sx={hasActor ? undefined : { gridTemplateColumns: '1fr' }}>
      {hasActor && (
        <NotificationAvatar
          actorAvatar={notification.actor?.image ?? undefined}
          actorName={actorName}
          {...NotificationAvatarProps}
        />
      )}
      <NotificationContent>
        <NotificationHeader
          message={notification.description ?? ''}
          timestamp={formatRelativeTime(notification.timestamp)}
          actorName={actorName}
          unread={notification.unread}
          {...NotificationHeaderProps}
        />
      </NotificationContent>
    </NotificationRoot>
  )

  if (!url) return content

  return <NotificationLink href={url}>{content}</NotificationLink>
}

export default GenericNotificationItem
