import { NotificationSettingsGroups_user$data } from '../../../__generated__/NotificationSettingsGroups_user.graphql'
import { NotificationsListFragment$data } from '../../../__generated__/NotificationsListFragment.graphql'

export type Notifications = NonNullable<NotificationsListFragment$data['notifications']>
export type NotificationsEdges = Notifications['edges']
export type NotificationsNode = NonNullable<NotificationsEdges[number]>['node']

export type NotificationSettingGroup =
  NotificationSettingsGroups_user$data['notificationSettingGroups'][number]
export type NotificationSettingChannel = NotificationSettingGroup['channels'][number]['channel']

/** One channel of one notification setting group, set on or off. */
export interface NotificationSettingChange {
  group: string
  channel: NotificationSettingChannel
  isActive: boolean
}

export interface NotificationSettingsGroupsCopy {
  /** Label per channel, keyed by channel (`ALL`, `IN_APP`, `EMAIL`, `PUSH`). */
  channelLabels?: Partial<Record<string, string>>
  /** Heading of the group names (the column header on web). */
  groupColumnLabel?: string
  /** Shown under a locked group, whose switches are disabled. */
  lockedHint?: string
  /** Shown when the viewer has no groups to manage. */
  emptyStateText?: string
  /** Accessible name of each switch. */
  getSwitchLabel?: (groupLabel: string, channelLabel: string) => string
}
