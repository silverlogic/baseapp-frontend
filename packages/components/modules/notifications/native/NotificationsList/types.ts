import { FC } from 'react'

import { NotificationItemProps } from './NotificationItem/types'

export interface NotificationsListProps {
  EmptyState?: FC
  fetchKey?: number
  NotificationItem?: FC<NotificationItemProps>
  NotificationItemProps?: Partial<NotificationItemProps>
}
