import { FC } from 'react'

import { NotificationSettingsGroups_user$key } from '../../../../__generated__/NotificationSettingsGroups_user.graphql'
import { NotificationSettingsGroupsCopy } from '../../common/types'

export interface NotificationSettingsGroupsContentProps extends NotificationSettingsGroupsCopy {
  user: NotificationSettingsGroups_user$key
}

export interface NotificationSettingsGroupsProps extends Omit<
  NotificationSettingsGroupsContentProps,
  'user'
> {
  /**
   * The user whose settings are shown, when the screen query already spreads
   * `NotificationSettingsGroups_user`. Without it the component fetches the current user's groups.
   */
  user?: NotificationSettingsGroups_user$key | null
  /** Shown while the groups load. Defaults to the design system's `LoadingScreen`. */
  LoadingState?: FC
}
