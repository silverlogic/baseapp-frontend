import { NotificationSettingsGroups_user$key } from '../../../../../__generated__/NotificationSettingsGroups_user.graphql'
import { NotificationSettingChannel, NotificationSettingGroup } from '../../types'

export interface UseNotificationSettingsGroupsOptions {
  user: NotificationSettingsGroups_user$key
}

export interface UseNotificationSettingsGroupsReturn {
  groups: ReadonlyArray<NotificationSettingGroup>
  /** The channels offered by any of the groups, in the order they first appear. */
  channels: NotificationSettingChannel[]
  /**
   * Turns one channel of one group on or off. The switch moves at once and goes back if the server
   * rejects the change; locked groups are left alone.
   */
  setChannelActive: (group: string, channel: NotificationSettingChannel, isActive: boolean) => void
  isMutationInFlight: boolean
}
