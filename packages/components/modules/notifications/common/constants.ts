import { MessageDescriptor, defineMessages } from 'react-intl'

export const NOTIFICATION_VERB = {
  commentCreated: 'COMMENTS.COMMENT_CREATED',
  commentReplyCreated: 'COMMENTS.COMMENT_REPLY_CREATED',
  reactionCreated: 'REACTIONS.REACTION_CREATED',
}

export const USER_NOTIFICATIONS_KEY = 'user_notifications'

export const GROUP_NOTIFICATIONS_LIST_CONNECTION_KEY = 'GroupNotificationsList_notifications'

export const NUMBER_OF_NOTIFICATIONS_TO_LOAD_NEXT = 5

// Default copy of the NotificationSettingsGroups components (web and native); each has a prop.
export const NOTIFICATION_SETTINGS_GROUPS_MESSAGES = defineMessages({
  groupColumn: { id: 'notifications.settingsGroups.groupColumn', defaultMessage: 'Notifications' },
  lockedHint: {
    id: 'notifications.settingsGroups.lockedHint',
    defaultMessage: 'Required — these notifications cannot be turned off.',
  },
  emptyState: {
    id: 'notifications.settingsGroups.emptyState',
    defaultMessage: 'There are no notification settings to manage.',
  },
  switchLabel: {
    id: 'notifications.settingsGroups.switchLabel',
    defaultMessage: '{channel} notifications for {group}',
  },
})

export const NOTIFICATION_CHANNEL_MESSAGES: Record<string, MessageDescriptor> = defineMessages({
  ALL: { id: 'notifications.channels.all', defaultMessage: 'All' },
  IN_APP: { id: 'notifications.channels.inApp', defaultMessage: 'In-app' },
  EMAIL: { id: 'notifications.channels.email', defaultMessage: 'Email' },
  PUSH: { id: 'notifications.channels.push', defaultMessage: 'Push' },
})
