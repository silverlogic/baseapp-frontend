export const NOTIFICATION_VERB = {
  commentCreated: 'COMMENTS.COMMENT_CREATED',
  commentReplyCreated: 'COMMENTS.COMMENT_REPLY_CREATED',
  reactionCreated: 'REACTIONS.REACTION_CREATED',
}

export const USER_NOTIFICATIONS_KEY = 'user_notifications'

export const GROUP_NOTIFICATIONS_LIST_CONNECTION_KEY = 'GroupNotificationsList_notifications'

export const NUMBER_OF_NOTIFICATIONS_TO_LOAD_NEXT = 5

// Default copy of the NotificationSettingsGroups components (web and native).
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
