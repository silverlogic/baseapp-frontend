import { ValueOf } from '@baseapp-frontend/utils'

import { MessagesListFragment$data } from '../../../__generated__/MessagesListFragment.graphql'
import { CHAT_ROOM_PARTICIPANT_ROLES, MESSAGE_TYPE } from './constants'

export type AllMessages = NonNullable<MessagesListFragment$data['allMessages']>
export type MessageEdges = AllMessages['edges']
export type MessageNode = NonNullable<MessageEdges[number]>['node']

export type MessageTypeOptions = ValueOf<typeof MESSAGE_TYPE>

export type ChatRoomParticipantRoles = ValueOf<typeof CHAT_ROOM_PARTICIPANT_ROLES>
