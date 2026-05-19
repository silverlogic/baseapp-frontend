import { ValueOf } from '@baseapp-frontend/utils'

export const CHAT_ROOM_OPTION_VALUES = {
  archive: 'archive',
  chatDetails: 'chatDetails',
  goToProfile: 'goToProfile',
  delete: 'delete',
} as const

export type ChatRoomOptionValue = ValueOf<typeof CHAT_ROOM_OPTION_VALUES>

export const DEFAULT_OPTION_ORDER: ChatRoomOptionValue[] = [
  CHAT_ROOM_OPTION_VALUES.archive,
  CHAT_ROOM_OPTION_VALUES.chatDetails,
  CHAT_ROOM_OPTION_VALUES.goToProfile,
  CHAT_ROOM_OPTION_VALUES.delete,
]
