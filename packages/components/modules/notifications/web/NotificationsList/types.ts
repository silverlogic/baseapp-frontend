import { Dispatch, FC, SetStateAction } from 'react'

import { LoadingStateProps } from '@baseapp-frontend/design-system/components/web/displays'

import { BoxProps } from '@mui/system'

import { EmptyStateProps } from './EmptyState/types'
import { NotificationItemProps } from './NotificationItem/types'

export interface NotificationsListProps {
  setIsDrawerOpened: Dispatch<SetStateAction<boolean>>
  EmptyState?: FC<EmptyStateProps>
  EmptyStateProps?: Partial<EmptyStateProps>
  LoadingState?: FC<LoadingStateProps>
  LoadingStateProps?: Partial<LoadingStateProps>
  NotificationItem?: FC<NotificationItemProps>
  NotificationItemProps?: Partial<NotificationItemProps>
  HeaderContainer?: FC<BoxProps>
  ListContainer?: FC<BoxProps>
}
