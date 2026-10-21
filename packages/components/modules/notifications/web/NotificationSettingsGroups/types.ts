import { FC } from 'react'

import { LoadingStateProps } from '@baseapp-frontend/design-system/components/web/displays'

import { BoxProps } from '@mui/material'

import { NotificationSettingsGroups_user$key } from '../../../../__generated__/NotificationSettingsGroups_user.graphql'

export interface NotificationSettingsGroupsCopy {
  /** Column header per channel, keyed by channel (`ALL`, `IN_APP`, `EMAIL`, `PUSH`). */
  channelLabels?: Partial<Record<string, string>>
  /** Header of the column that names the groups. */
  groupColumnLabel?: string
  /** Shown under a locked group, whose switches are disabled. */
  lockedHint?: string
  /** Shown when the viewer has no groups to manage. */
  emptyStateText?: string
  /** Accessible name of each switch. */
  getSwitchLabel?: (groupLabel: string, channelLabel: string) => string
}

export interface NotificationSettingsGroupsContentProps extends NotificationSettingsGroupsCopy {
  user: NotificationSettingsGroups_user$key
  Container?: FC<BoxProps>
}

export interface NotificationSettingsGroupsProps extends Omit<
  NotificationSettingsGroupsContentProps,
  'user'
> {
  /**
   * The user whose settings are shown, when the page query already spreads
   * `NotificationSettingsGroups_user`. Without it the component fetches the current user's groups.
   */
  user?: NotificationSettingsGroups_user$key | null
  LoadingState?: FC<LoadingStateProps>
  LoadingStateProps?: Partial<LoadingStateProps>
}
