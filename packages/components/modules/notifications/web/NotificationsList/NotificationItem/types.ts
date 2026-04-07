import { FC } from 'react'

import { NotificationItemFragment$key } from '../../../../../__generated__/NotificationItemFragment.graphql'
import { NotificationItemRendererProps } from './NotificationItemRenderer/types'

export interface NotificationItemProps {
  notification: NotificationItemFragment$key
  NotificationItemRenderer?: FC<NotificationItemRendererProps>
  NotificationItemRendererProps?: Partial<NotificationItemRendererProps>
}
