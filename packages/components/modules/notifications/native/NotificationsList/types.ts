import { FC } from 'react'

import { NotificationsListFragment$data } from '../../../../__generated__/NotificationsListFragment.graphql'
import { Notifications } from '../../common/types'
import { NotificationItemProps } from './NotificationItem/types'

export interface NotificationsListProps {
  /**
   * Lists only the notifications of one notification setting group, as the backend's `group` filter
   * returns them: those whose verb is the group key or starts with the group key followed by a dot,
   * plus any verb the registered group lists explicitly. "Mark all as read" then marks only this
   * group's loaded unread notifications. Needs a backend with notification setting groups; without
   * the prop the list is unchanged.
   */
  group?: string
  EmptyState?: FC
  NotificationItem?: FC<NotificationItemProps>
  NotificationItemProps?: Partial<NotificationItemProps>
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
