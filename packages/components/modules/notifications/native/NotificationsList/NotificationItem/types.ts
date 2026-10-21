import { FC } from 'react'

import {
  NotificationItemFragment$data,
  NotificationItemFragment$key,
} from '../../../../../__generated__/NotificationItemFragment.graphql'
import { NotificationItemRendererProps } from './NotificationItemRenderer/types'

export interface NotificationItemProps {
  notification: NotificationItemFragment$key
  NotificationItemRenderer?: FC<NotificationItemRendererProps>
  NotificationItemRendererProps?: Partial<NotificationItemRendererProps>
  refetch: VoidFunction
  /**
   * Called when the notification is pressed, after it is marked as read; e.g. to navigate to
   * `getNotificationUrl(notification.data)`.
   */
  onPress?: (notification: NotificationItemFragment$data) => void
}

export interface GenericItemProps {
  notification: NotificationItemFragment$data
}
