import { Dispatch, FC, SetStateAction } from 'react'

import { LoadingStateProps } from '@baseapp-frontend/design-system/components/web/displays'

import { NotificationItemProps } from './NotificationItem/types'

export interface NotificationsListProps {
  setIsDrawerOpened: Dispatch<SetStateAction<boolean>>
  EmptyState?: FC
  LoadingState?: FC<LoadingStateProps>
  LoadingStateProps?: Partial<LoadingStateProps>
  NotificationItem?: FC<NotificationItemProps>
  NotificationItemProps?: Partial<NotificationItemProps>
}
