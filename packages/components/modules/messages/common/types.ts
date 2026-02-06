import { ValueOf } from '@baseapp-frontend/utils'

import { MessagesListFragment$data } from '../../../__generated__/MessagesListFragment.graphql'
import { CHAT_ROOM_PARTICIPANT_ROLES, MESSAGE_TYPE } from './utils'

export interface TitleAndImage {
  title: string
  image?: string | File | Blob | null
}

export interface AddRemoveParticipants {
  addParticipants?: any[]
  participants?: any[]
  removeParticipants?: any[]
}

export interface CreateOrEditGroup extends TitleAndImage, AddRemoveParticipants {}

export type AllMessages = NonNullable<MessagesListFragment$data['allMessages']>
export type MessageEdges = AllMessages['edges']
export type MessageNode = NonNullable<MessageEdges[number]>['node']

export type MessageTypeOptions = ValueOf<typeof MESSAGE_TYPE>

export type ChatRoomParticipantRoles = ValueOf<typeof CHAT_ROOM_PARTICIPANT_ROLES>

export interface UploadablesObj {
  [key: string]: File | Blob
}
