export const MAXIMUM_DIFF_TO_GROUP_MESSAGES_CREATED_TIME = 3 // in minutes

export const MESSAGE_TYPE = {
  user: 'USER_MESSAGE',
  system: 'SYSTEM_GENERATED',
} as const

export const CHAT_ROOM_PARTICIPANT_ROLES = {
  admin: 'ADMIN',
  member: 'MEMBER',
} as const

export const ADMIN_LABEL = 'Admin'
