import { ValueOf } from '@baseapp-frontend/utils'

export const MAXIMUM_DIFF_TO_GROUP_MESSAGES_CREATED_TIME = 3 // in minutes

export const MESSAGE_TYPE = {
  user: 'USER_MESSAGE',
  system: 'SYSTEM_GENERATED',
} as const

export type MessageTypeOptions = ValueOf<typeof MESSAGE_TYPE>
