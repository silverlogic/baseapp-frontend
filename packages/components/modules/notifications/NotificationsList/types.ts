import { Dispatch, FC, SetStateAction } from 'react'

import { LoadingStateProps } from '@baseapp-frontend/design-system'

import { NotificationItemProps } from './NotificationItem/types'
import { NotificationItemRendererProps } from './NotificationItemRenderer/types'

export interface NotificationsListProps {
  setIsDrawerOpened: Dispatch<SetStateAction<boolean>>
  EmptyState?: FC
  LoadingState?: FC<LoadingStateProps>
  LoadingStateProps?: LoadingStateProps
  NotificationItem?: FC<NotificationItemProps>
  NotificationItemRenderer?: FC<NotificationItemRendererProps>
}
