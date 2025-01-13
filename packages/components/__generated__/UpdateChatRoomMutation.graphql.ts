/**
 * @generated SignedSource<<a22146b2722884d840b00c17b5add531>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ConcreteRequest, Mutation } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type ChatRoomUpdateInput = {
  addParticipants?: ReadonlyArray<string | null | undefined> | null | undefined
  clientMutationId?: string | null | undefined
  deleteImage?: boolean | null | undefined
  profileId: string
  removeParticipants?: ReadonlyArray<string | null | undefined> | null | undefined
  roomId: string
  title?: string | null | undefined
}
export type UpdateChatRoomMutation$variables = {
  input: ChatRoomUpdateInput
}
export type UpdateChatRoomMutation$data = {
  readonly chatRoomUpdate:
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
              readonly node:
                | {
                    readonly id: string
                    readonly ' $fragmentSpreads': FragmentRefs<'RoomFragment'>
                  }
                | null
                | undefined
            }
          | null
          | undefined
      }
    | null
    | undefined
}
export type UpdateChatRoomMutation = {
  response: UpdateChatRoomMutation$data
  variables: UpdateChatRoomMutation$variables
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
    v4 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'content',
      storageKey: null,
    },
    v5 = [
      {
        alias: null,
        args: null,
        kind: 'ScalarField',
        name: 'url',
        storageKey: null,
      },
    ],
    v6 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'totalCount',
      storageKey: null,
    },
    v7 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'name',
      storageKey: null,
    },
    v8 = [
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
      name: 'UpdateChatRoomMutation',
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: 'ChatRoomUpdatePayload',
          kind: 'LinkedField',
          name: 'chatRoomUpdate',
          plural: false,
          selections: [
            {
              alias: null,
              args: null,
              concreteType: 'ChatRoomEdge',
              kind: 'LinkedField',
              name: 'room',
              plural: false,
              selections: [
                {
                  alias: null,
                  args: null,
                  concreteType: 'ChatRoom',
                  kind: 'LinkedField',
                  name: 'node',
                  plural: false,
                  selections: [
                    v2 /*: any*/,
                    {
                      args: null,
                      kind: 'FragmentSpread',
                      name: 'RoomFragment',
                    },
                  ],
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
            v3 /*: any*/,
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
      name: 'UpdateChatRoomMutation',
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: 'ChatRoomUpdatePayload',
          kind: 'LinkedField',
          name: 'chatRoomUpdate',
          plural: false,
          selections: [
            {
              alias: null,
              args: null,
              concreteType: 'ChatRoomEdge',
              kind: 'LinkedField',
              name: 'room',
              plural: false,
              selections: [
                {
                  alias: null,
                  args: null,
                  concreteType: 'ChatRoom',
                  kind: 'LinkedField',
                  name: 'node',
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
                      selections: [
                        {
                          alias: null,
                          args: null,
                          kind: 'ScalarField',
                          name: 'count',
                          storageKey: null,
                        },
                        {
                          alias: null,
                          args: null,
                          kind: 'ScalarField',
                          name: 'markedUnread',
                          storageKey: null,
                        },
                        v2 /*: any*/,
                      ],
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
                      selections: [v2 /*: any*/, v4 /*: any*/],
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
                      selections: v5 /*: any*/,
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
                        v6 /*: any*/,
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
                                    v7 /*: any*/,
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
                                      selections: v5 /*: any*/,
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
                      args: v8 /*: any*/,
                      concreteType: 'MessageConnection',
                      kind: 'LinkedField',
                      name: 'allMessages',
                      plural: false,
                      selections: [
                        v6 /*: any*/,
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
                                    v7 /*: any*/,
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
                                      selections: v5 /*: any*/,
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
                                v4 /*: any*/,
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
                      args: v8 /*: any*/,
                      filters: null,
                      handle: 'connection',
                      key: 'chatRoom_allMessages',
                      kind: 'LinkedHandle',
                      name: 'allMessages',
                    },
                  ],
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
            v3 /*: any*/,
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: '5c0ef63c9db6b08fe729bb04aef94b75',
      id: null,
      metadata: {},
      name: 'UpdateChatRoomMutation',
      operationKind: 'mutation',
      text: 'mutation UpdateChatRoomMutation(\n  $input: ChatRoomUpdateInput!\n) {\n  chatRoomUpdate(input: $input) {\n    room {\n      node {\n        id\n        ...RoomFragment\n      }\n    }\n    errors {\n      field\n      messages\n    }\n  }\n}\n\nfragment ChatRoomHeaderFragment on ChatRoom {\n  id\n  image(width: 144, height: 144) {\n    url\n  }\n  title\n  isGroup\n  participants(first: 5) {\n    totalCount\n    edges {\n      node {\n        profile {\n          id\n          name\n          image(width: 100, height: 100) {\n            url\n          }\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment MessageItemFragment on Message {\n  id\n  content\n  created\n  extraData\n  inReplyTo {\n    id\n  }\n  isRead\n  pk\n  profile {\n    id\n  }\n  verb\n}\n\nfragment MessagesListFragment on ChatRoom {\n  id\n  isGroup\n  unreadMessages {\n    count\n    markedUnread\n    id\n  }\n  allMessages(first: 20) {\n    totalCount\n    edges {\n      node {\n        id\n        created\n        profile {\n          id\n          name\n          image(height: 32, width: 32) {\n            url\n          }\n        }\n        isRead\n        ...MessageItemFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n\nfragment RoomFragment on ChatRoom {\n  id\n  unreadMessages {\n    count\n    markedUnread\n    id\n  }\n  lastMessageTime\n  lastMessage {\n    id\n    content\n  }\n  ...ChatRoomHeaderFragment\n  ...MessagesListFragment\n}\n',
    },
  }
})()

;(node as any).hash = '185a438c9dcbf08ccb129010469add25'

export default node
