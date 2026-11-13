import { defineMessages } from 'react-intl'

export const CHAT_TAB_VALUES = {
  active: 'active',
  unread: 'unread',
  archived: 'archived',
  groups: 'groups',
} as const

export const CHAT_TAB_LABEL = defineMessages({
  [CHAT_TAB_VALUES.active]: { id: 'messages.chatRoomsList.tabs.active', defaultMessage: 'Active' },
  [CHAT_TAB_VALUES.unread]: { id: 'messages.chatRoomsList.tabs.unread', defaultMessage: 'Unread' },
  [CHAT_TAB_VALUES.archived]: {
    id: 'messages.chatRoomsList.tabs.archived',
    defaultMessage: 'Archived',
  },
  [CHAT_TAB_VALUES.groups]: { id: 'messages.chatRoomsList.tabs.groups', defaultMessage: 'Groups' },
})
