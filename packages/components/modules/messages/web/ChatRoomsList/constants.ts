export const CHAT_TAB_VALUES = {
  active: 'active',
  unread: 'unread',
  archived: 'archived',
} as const

export const CHAT_TAB_LABEL = {
  [CHAT_TAB_VALUES.active]: 'Active',
  [CHAT_TAB_VALUES.unread]: 'Unread',
  [CHAT_TAB_VALUES.archived]: 'Archived',
} as const
