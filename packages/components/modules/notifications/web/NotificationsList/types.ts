import { Dispatch, FC, SetStateAction } from 'react'

import { LoadingStateProps } from '@baseapp-frontend/design-system/components/web/displays'

import { BoxProps } from '@mui/system'

import { NotificationsListFragment$data } from '../../../../__generated__/NotificationsListFragment.graphql'
import { Notifications } from '../../common/types'
import { EmptyStateProps } from './EmptyState/types'
import { NotificationItemProps } from './NotificationItem/types'

export interface NotificationsListProps {
  setIsDrawerOpened: Dispatch<SetStateAction<boolean>>
  /**
   * Lists only the notifications of one notification setting group, as the backend's `group` filter
   * returns them: those whose verb is the group key or starts with the group key followed by a dot,
   * plus any verb the registered group lists explicitly. "Mark all as read" then marks only this
   * group's loaded unread notifications. Needs a backend with notification setting groups; without
   * the prop the list is unchanged.
   */
  group?: string
  EmptyState?: FC<EmptyStateProps>
  EmptyStateProps?: Partial<EmptyStateProps>
  LoadingState?: FC<LoadingStateProps>
  LoadingStateProps?: Partial<LoadingStateProps>
  NotificationItem?: FC<NotificationItemProps>
  NotificationItemProps?: Partial<NotificationItemProps>
  HeaderContainer?: FC<BoxProps>
  ListContainer?: FC<BoxProps>
}

type NotificationsListData = Pick<NotificationsListFragment$data, 'notificationsUnreadCount'> & {
  notifications: { edges: Notifications['edges'] } | null | undefined
}

export interface NotificationsListContentProps extends Omit<NotificationsListProps, 'group'> {
  data: NotificationsListData | null | undefined
  loadNext: (count: number) => void
  isLoadingNext: boolean
  hasNext: boolean
  refetchNotifications: () => void
  /**
   * The unread notifications "Mark all as read" marks, when the list does not hold every
   * notification of the user (a list filtered by group). Without it the button marks all of them.
   */
  unreadNotificationIds?: ReadonlyArray<string>
}
