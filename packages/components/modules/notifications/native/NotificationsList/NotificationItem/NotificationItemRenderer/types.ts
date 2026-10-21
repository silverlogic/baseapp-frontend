import { FC } from 'react'

import { NotificationItemFragment$data } from '../../../../../../__generated__/NotificationItemFragment.graphql'
import { GenericNotificationItemProps } from '../GenericNotificationItem/types'

export interface NotificationItemRendererProps {
  notification: NotificationItemFragment$data
  /**
   * Renders notifications whose verb has no dedicated component. Pass `null` to render nothing for
   * them, as before this fallback existed.
   */
  GenericNotificationItem?: FC<GenericNotificationItemProps> | null
  GenericNotificationItemProps?: Partial<GenericNotificationItemProps>
}
