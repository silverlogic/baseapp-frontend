import { ValueOf } from '@baseapp-frontend/utils'

export const CHAT_ROOM_OPTION_VALUES = {
  archive: 'archive',
  groupDetails: 'groupDetails',
  leaveGroup: 'leaveGroup',
  contactDetails: 'contactDetails',
} as const

export type ChatRoomOptionValue = ValueOf<typeof CHAT_ROOM_OPTION_VALUES>

export const DEFAULT_OPTION_ORDER: ChatRoomOptionValue[] = [
  CHAT_ROOM_OPTION_VALUES.archive,
  CHAT_ROOM_OPTION_VALUES.groupDetails,
  CHAT_ROOM_OPTION_VALUES.leaveGroup,
  CHAT_ROOM_OPTION_VALUES.contactDetails,
]
