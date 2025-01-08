import { ValueOf } from '@baseapp-frontend/utils'

export const CHAT_ROOM_PARTICIPANT_ROLES = {
  admin: 'ADMIN',
  member: 'MEMBER',
} as const

export type ChatRoomParticipantRoles = ValueOf<typeof CHAT_ROOM_PARTICIPANT_ROLES>
