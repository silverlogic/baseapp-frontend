import { FC } from 'react'

import { LoadingStateProps } from '@baseapp-frontend/design-system/components/web/displays'

import { BoxProps } from '@mui/material'

import { NotificationSettingsGroups_user$key } from '../../../../__generated__/NotificationSettingsGroups_user.graphql'
import { NotificationSettingsGroupsCopy } from '../../common/types'

export type { NotificationSettingsGroupsCopy }

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
