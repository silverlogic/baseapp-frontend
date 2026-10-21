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
