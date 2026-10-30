import { GroupNotificationsList_user$data } from '../../../../../__generated__/GroupNotificationsList_user.graphql'

export interface UseGroupNotificationsListReturn {
  data: GroupNotificationsList_user$data | null | undefined
  loadNext: (count: number) => void
  isLoadingNext: boolean
  hasNext: boolean
  refetchNotifications: () => void
  /** The loaded unread notifications of the group: what "Mark all as read" marks in this list. */
  unreadNotificationIds: ReadonlyArray<string>
}
