/**
 * @generated SignedSource<<7996b543ce632b642a54dc9cafabc4c6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ConcreteRequest, Mutation } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type ChatRoomReadMessagesInput = {
  clientMutationId?: string | null | undefined
  messageIds?: ReadonlyArray<string | null | undefined> | null | undefined
  profileId: string
  roomId: string
}
export type ReadMessagesMutation$variables = {
  input: ChatRoomReadMessagesInput
}
export type ReadMessagesMutation$data = {
  readonly chatRoomReadMessages:
    | {
        readonly errors:
          | ReadonlyArray<
              | {
                  readonly field: string
                  readonly messages: ReadonlyArray<string>
                }
              | null
              | undefined
            >
          | null
          | undefined
        readonly room:
          | {
              readonly id: string
              readonly unreadMessages:
                | {
                    readonly count: number
                    readonly markedUnread: boolean
                  }
                | null
                | undefined
              readonly ' $fragmentSpreads': FragmentRefs<'RoomFragment'>
            }
          | null
          | undefined
      }
    | null
    | undefined
}
export type ReadMessagesMutation = {
  response: ReadMessagesMutation$data
  variables: ReadMessagesMutation$variables
}

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        defaultValue: null,
        kind: 'LocalArgument',
        name: 'input',
      },
    ],
    v1 = [
      {
        kind: 'Variable',
        name: 'input',
        variableName: 'input',
      },
    ],
    v2 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'id',
      storageKey: null,
    },
    v3 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'count',
      storageKey: null,
    },
    v4 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'markedUnread',
      storageKey: null,
    },
    v5 = {
      alias: null,
      args: null,
      concreteType: 'ErrorType',
      kind: 'LinkedField',
      name: 'errors',
      plural: true,
      selections: [
        {
          alias: null,
          args: null,
          kind: 'ScalarField',
          name: 'field',
          storageKey: null,
        },
        {
          alias: null,
          args: null,
          kind: 'ScalarField',
          name: 'messages',
          storageKey: null,
        },
      ],
      storageKey: null,
    },
    v6 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'content',
      storageKey: null,
    },
    v7 = [
      {
        alias: null,
        args: null,
        kind: 'ScalarField',
        name: 'url',
        storageKey: null,
      },
    ],
    v8 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'totalCount',
      storageKey: null,
    },
    v9 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'name',
      storageKey: null,
    },
    v10 = [
      {
        kind: 'Literal',
        name: 'first',
        value: 20,
      },
    ]
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Fragment',
      metadata: null,
      name: 'ReadMessagesMutation',
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: 'ChatRoomReadMessagesPayload',
          kind: 'LinkedField',
          name: 'chatRoomReadMessages',
          plural: false,
          selections: [
            {
              alias: null,
              args: null,
              concreteType: 'ChatRoom',
              kind: 'LinkedField',
              name: 'room',
              plural: false,
              selections: [
                v2 /*: any*/,
                {
                  alias: null,
                  args: null,
                  concreteType: 'UnreadMessageCount',
                  kind: 'LinkedField',
                  name: 'unreadMessages',
                  plural: false,
                  selections: [v3 /*: any*/, v4 /*: any*/],
                  storageKey: null,
                },
                {
                  args: null,
                  kind: 'FragmentSpread',
                  name: 'RoomFragment',
                },
              ],
              storageKey: null,
            },
            v5 /*: any*/,
          ],
          storageKey: null,
        },
      ],
      type: 'Mutation',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Operation',
      name: 'ReadMessagesMutation',
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: 'ChatRoomReadMessagesPayload',
          kind: 'LinkedField',
          name: 'chatRoomReadMessages',
          plural: false,
          selections: [
            {
              alias: null,
              args: null,
              concreteType: 'ChatRoom',
              kind: 'LinkedField',
              name: 'room',
              plural: false,
              selections: [
                v2 /*: any*/,
                {
                  alias: null,
                  args: null,
                  concreteType: 'UnreadMessageCount',
                  kind: 'LinkedField',
                  name: 'unreadMessages',
                  plural: false,
                  selections: [v3 /*: any*/, v4 /*: any*/, v2 /*: any*/],
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  kind: 'ScalarField',
                  name: 'lastMessageTime',
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  concreteType: 'Message',
                  kind: 'LinkedField',
                  name: 'lastMessage',
                  plural: false,
                  selections: [
                    v2 /*: any*/,
                    v6 /*: any*/,
                    {
                      alias: null,
                      args: null,
                      kind: 'ScalarField',
                      name: 'contentPlainText',
                      storageKey: null,
                    },
                  ],
                  storageKey: null,
                },
                {
                  alias: null,
                  args: [
                    {
                      kind: 'Literal',
                      name: 'height',
                      value: 144,
                    },
                    {
                      kind: 'Literal',
                      name: 'width',
                      value: 144,
                    },
                  ],
                  concreteType: 'File',
                  kind: 'LinkedField',
                  name: 'image',
                  plural: false,
                  selections: v7 /*: any*/,
                  storageKey: 'image(height:144,width:144)',
                },
                {
                  alias: null,
                  args: null,
                  kind: 'ScalarField',
                  name: 'title',
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  kind: 'ScalarField',
                  name: 'isGroup',
                  storageKey: null,
                },
                {
                  alias: null,
                  args: [
                    {
                      kind: 'Literal',
                      name: 'first',
                      value: 5,
                    },
                  ],
                  concreteType: 'ChatRoomParticipantConnection',
                  kind: 'LinkedField',
                  name: 'participants',
                  plural: false,
                  selections: [
                    v8 /*: any*/,
                    {
                      alias: null,
                      args: null,
                      concreteType: 'ChatRoomParticipantEdge',
                      kind: 'LinkedField',
                      name: 'edges',
                      plural: true,
                      selections: [
                        {
                          alias: null,
                          args: null,
                          concreteType: 'ChatRoomParticipant',
                          kind: 'LinkedField',
                          name: 'node',
                          plural: false,
                          selections: [
                            {
                              alias: null,
                              args: null,
                              concreteType: 'Profile',
                              kind: 'LinkedField',
                              name: 'profile',
                              plural: false,
                              selections: [
                                v2 /*: any*/,
                                v9 /*: any*/,
                                {
                                  alias: null,
                                  args: [
                                    {
                                      kind: 'Literal',
                                      name: 'height',
                                      value: 100,
                                    },
                                    {
                                      kind: 'Literal',
                                      name: 'width',
                                      value: 100,
                                    },
                                  ],
                                  concreteType: 'File',
                                  kind: 'LinkedField',
                                  name: 'image',
                                  plural: false,
                                  selections: v7 /*: any*/,
                                  storageKey: 'image(height:100,width:100)',
                                },
                              ],
                              storageKey: null,
                            },
                            v2 /*: any*/,
                          ],
                          storageKey: null,
                        },
                      ],
                      storageKey: null,
                    },
                  ],
                  storageKey: 'participants(first:5)',
                },
                {
                  alias: null,
                  args: v10 /*: any*/,
                  concreteType: 'MessageConnection',
                  kind: 'LinkedField',
                  name: 'allMessages',
                  plural: false,
                  selections: [
                    v8 /*: any*/,
                    {
                      alias: null,
                      args: null,
                      concreteType: 'MessageEdge',
                      kind: 'LinkedField',
                      name: 'edges',
                      plural: true,
                      selections: [
                        {
                          alias: null,
                          args: null,
                          concreteType: 'Message',
                          kind: 'LinkedField',
                          name: 'node',
                          plural: false,
                          selections: [
                            v2 /*: any*/,
                            {
                              alias: null,
                              args: null,
                              kind: 'ScalarField',
                              name: 'created',
                              storageKey: null,
                            },
                            {
                              alias: null,
                              args: null,
                              concreteType: 'Profile',
                              kind: 'LinkedField',
                              name: 'profile',
                              plural: false,
                              selections: [
                                v2 /*: any*/,
                                v9 /*: any*/,
                                {
                                  alias: null,
                                  args: [
                                    {
                                      kind: 'Literal',
                                      name: 'height',
                                      value: 32,
                                    },
                                    {
                                      kind: 'Literal',
                                      name: 'width',
                                      value: 32,
                                    },
                                  ],
                                  concreteType: 'File',
                                  kind: 'LinkedField',
                                  name: 'image',
                                  plural: false,
                                  selections: v7 /*: any*/,
                                  storageKey: 'image(height:32,width:32)',
                                },
                              ],
                              storageKey: null,
                            },
                            {
                              alias: null,
                              args: null,
                              kind: 'ScalarField',
                              name: 'isRead',
                              storageKey: null,
                            },
                            v6 /*: any*/,
                            {
                              alias: null,
                              args: null,
                              kind: 'ScalarField',
                              name: 'extraData',
                              storageKey: null,
                            },
                            {
                              alias: null,
                              args: null,
                              concreteType: 'Message',
                              kind: 'LinkedField',
                              name: 'inReplyTo',
                              plural: false,
                              selections: [v2 /*: any*/],
                              storageKey: null,
                            },
                            {
                              alias: null,
                              args: null,
                              kind: 'ScalarField',
                              name: 'pk',
                              storageKey: null,
                            },
                            {
                              alias: null,
                              args: null,
                              kind: 'ScalarField',
                              name: 'verb',
                              storageKey: null,
                            },
                            {
                              alias: null,
                              args: null,
                              kind: 'ScalarField',
                              name: '__typename',
                              storageKey: null,
                            },
                          ],
                          storageKey: null,
                        },
                        {
                          alias: null,
                          args: null,
                          kind: 'ScalarField',
                          name: 'cursor',
                          storageKey: null,
                        },
                      ],
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      concreteType: 'PageInfo',
                      kind: 'LinkedField',
                      name: 'pageInfo',
                      plural: false,
                      selections: [
                        {
                          alias: null,
                          args: null,
                          kind: 'ScalarField',
                          name: 'hasNextPage',
                          storageKey: null,
                        },
                        {
                          alias: null,
                          args: null,
                          kind: 'ScalarField',
                          name: 'endCursor',
                          storageKey: null,
                        },
                      ],
                      storageKey: null,
                    },
                  ],
                  storageKey: 'allMessages(first:20)',
                },
                {
                  alias: null,
                  args: v10 /*: any*/,
                  filters: null,
                  handle: 'connection',
                  key: 'chatRoom_allMessages',
                  kind: 'LinkedHandle',
                  name: 'allMessages',
                },
              ],
              storageKey: null,
            },
            v5 /*: any*/,
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: 'ada9b2e30f399a2ae6e91358f63236d1',
      id: null,
      metadata: {},
      name: 'ReadMessagesMutation',
      operationKind: 'mutation',
      text: 'mutation ReadMessagesMutation(\n  $input: ChatRoomReadMessagesInput!\n) {\n  chatRoomReadMessages(input: $input) {\n    room {\n      id\n      unreadMessages {\n        count\n        markedUnread\n        id\n      }\n      ...RoomFragment\n    }\n    errors {\n      field\n      messages\n    }\n  }\n}\n\nfragment ChatRoomHeaderFragment on ChatRoom {\n  id\n  image(width: 144, height: 144) {\n    url\n  }\n  title\n  isGroup\n  participants(first: 5) {\n    totalCount\n    edges {\n      node {\n        profile {\n          id\n          name\n          image(width: 100, height: 100) {\n            url\n          }\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment MessageItemFragment on Message {\n  id\n  content\n  created\n  extraData\n  inReplyTo {\n    id\n  }\n  isRead\n  pk\n  profile {\n    id\n  }\n  verb\n}\n\nfragment MessagesListFragment on ChatRoom {\n  id\n  isGroup\n  unreadMessages {\n    count\n    markedUnread\n    id\n  }\n  allMessages(first: 20) {\n    totalCount\n    edges {\n      node {\n        id\n        created\n        profile {\n          id\n          name\n          image(height: 32, width: 32) {\n            url\n          }\n        }\n        isRead\n        ...MessageItemFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n\nfragment RoomFragment on ChatRoom {\n  id\n  unreadMessages {\n    count\n    markedUnread\n    id\n  }\n  lastMessageTime\n  lastMessage {\n    id\n    content\n    contentPlainText\n  }\n  ...ChatRoomHeaderFragment\n  ...MessagesListFragment\n}\n',
    },
  }
})()

;(node as any).hash = '74e8ca248a5168c5ce8623b79103f75d'

export default node
