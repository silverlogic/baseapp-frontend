import { ValueOf } from '@baseapp-frontend/utils'

import { MessagesListFragment$data } from '../../../__generated__/MessagesListFragment.graphql'
import { MESSAGE_TYPE } from './constants'

export type AllMessages = NonNullable<MessagesListFragment$data['allMessages']>
export type MessageEdges = AllMessages['edges']
export type MessageNode = NonNullable<MessageEdges[number]>['node']

export type MessageTypeOptions = ValueOf<typeof MESSAGE_TYPE>
