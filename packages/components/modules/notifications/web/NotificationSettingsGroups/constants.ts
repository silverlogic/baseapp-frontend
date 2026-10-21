export const DEFAULT_NOTIFICATION_CHANNEL_LABELS: Record<string, string> = {
  ALL: 'All',
  IN_APP: 'In-app',
  EMAIL: 'Email',
  PUSH: 'Push',
}

export const DEFAULT_LOCKED_HINT = 'Required — these notifications cannot be turned off.'

export const DEFAULT_EMPTY_STATE_TEXT = 'There are no notification settings to manage.'

export const DEFAULT_GROUP_COLUMN_LABEL = 'Notifications'

export const defaultGetSwitchLabel = (groupLabel: string, channelLabel: string) =>
  `${channelLabel} notifications for ${groupLabel}`
