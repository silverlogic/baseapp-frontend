import { MessagesListFragment$data } from '../../__generated__/MessagesListFragment.graphql'

export type AllMessages = NonNullable<MessagesListFragment$data['allMessages']>
export type MessageEdges = AllMessages['edges']
export type MessageNode = NonNullable<MessageEdges[number]>['node']
