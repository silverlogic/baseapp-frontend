/**
 * @generated SignedSource<<a2fd2a7dcccbae3b741f2d7eebdd6f34>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ConcreteRequest, Mutation } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type ChatRoomCreateInput = {
  clientMutationId?: string | null | undefined
  isGroup?: boolean | null | undefined
  participants: ReadonlyArray<string | null | undefined>
  profileId: string
  title?: string | null | undefined
}
export type CreateChatRoomMutation$variables = {
  connections: ReadonlyArray<string>
  input: ChatRoomCreateInput
}
export type CreateChatRoomMutation$data = {
  readonly chatRoomCreate:
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
export type CreateChatRoomMutation = {
  response: CreateChatRoomMutation$data
  variables: CreateChatRoomMutation$variables
}

const node: ConcreteRequest = (function () {
  var v0 = {
      defaultValue: null,
      kind: 'LocalArgument',
      name: 'connections',
    },
    v1 = {
      defaultValue: null,
      kind: 'LocalArgument',
      name: 'input',
    },
    v2 = [
      {
        kind: 'Variable',
        name: 'input',
        variableName: 'input',
      },
    ],
    v3 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'id',
      storageKey: null,
    },
    v4 = {
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
    v5 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'content',
      storageKey: null,
    },
    v6 = [
      {
        alias: null,
        args: null,
        kind: 'ScalarField',
        name: 'url',
        storageKey: null,
      },
    ],
    v7 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'totalCount',
      storageKey: null,
    },
    v8 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'name',
      storageKey: null,
    },
    v9 = [
      {
        kind: 'Literal',
        name: 'first',
        value: 20,
      },
    ]
  return {
    fragment: {
      argumentDefinitions: [v0 /*: any*/, v1 /*: any*/],
      kind: 'Fragment',
      metadata: null,
      name: 'CreateChatRoomMutation',
      selections: [
        {
          alias: null,
          args: v2 /*: any*/,
          concreteType: 'ChatRoomCreatePayload',
          kind: 'LinkedField',
          name: 'chatRoomCreate',
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
                    v3 /*: any*/,
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
            v4 /*: any*/,
          ],
          storageKey: null,
        },
      ],
      type: 'Mutation',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: [v1 /*: any*/, v0 /*: any*/],
      kind: 'Operation',
      name: 'CreateChatRoomMutation',
      selections: [
        {
          alias: null,
          args: v2 /*: any*/,
          concreteType: 'ChatRoomCreatePayload',
          kind: 'LinkedField',
          name: 'chatRoomCreate',
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
                    v3 /*: any*/,
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
                        v3 /*: any*/,
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
                      selections: [
                        v3 /*: any*/,
                        v5 /*: any*/,
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
                      selections: v6 /*: any*/,
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
                        v7 /*: any*/,
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
                                    v3 /*: any*/,
                                    v8 /*: any*/,
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
                                      selections: v6 /*: any*/,
                                      storageKey: 'image(height:100,width:100)',
                                    },
                                  ],
                                  storageKey: null,
                                },
                                v3 /*: any*/,
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
                      args: v9 /*: any*/,
                      concreteType: 'MessageConnection',
                      kind: 'LinkedField',
                      name: 'allMessages',
                      plural: false,
                      selections: [
                        v7 /*: any*/,
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
                                v3 /*: any*/,
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
                                    v3 /*: any*/,
                                    v8 /*: any*/,
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
                                      selections: v6 /*: any*/,
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
                                v5 /*: any*/,
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
                                  selections: [v3 /*: any*/],
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
                      args: v9 /*: any*/,
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
            {
              alias: null,
              args: null,
              filters: null,
              handle: 'prependEdge',
              key: '',
              kind: 'LinkedHandle',
              name: 'room',
              handleArgs: [
                {
                  kind: 'Variable',
                  name: 'connections',
                  variableName: 'connections',
                },
              ],
            },
            v4 /*: any*/,
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: '5e63471f61335060d21c123aadd9b879',
      id: null,
      metadata: {},
      name: 'CreateChatRoomMutation',
      operationKind: 'mutation',
      text: 'mutation CreateChatRoomMutation(\n  $input: ChatRoomCreateInput!\n) {\n  chatRoomCreate(input: $input) {\n    room {\n      node {\n        id\n        ...RoomFragment\n      }\n    }\n    errors {\n      field\n      messages\n    }\n  }\n}\n\nfragment ChatRoomHeaderFragment on ChatRoom {\n  id\n  image(width: 144, height: 144) {\n    url\n  }\n  title\n  isGroup\n  participants(first: 5) {\n    totalCount\n    edges {\n      node {\n        profile {\n          id\n          name\n          image(width: 100, height: 100) {\n            url\n          }\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment MessageItemFragment on Message {\n  id\n  content\n  created\n  extraData\n  inReplyTo {\n    id\n  }\n  isRead\n  pk\n  profile {\n    id\n  }\n  verb\n}\n\nfragment MessagesListFragment on ChatRoom {\n  id\n  isGroup\n  unreadMessages {\n    count\n    markedUnread\n    id\n  }\n  allMessages(first: 20) {\n    totalCount\n    edges {\n      node {\n        id\n        created\n        profile {\n          id\n          name\n          image(height: 32, width: 32) {\n            url\n          }\n        }\n        isRead\n        ...MessageItemFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n\nfragment RoomFragment on ChatRoom {\n  id\n  unreadMessages {\n    count\n    markedUnread\n    id\n  }\n  lastMessageTime\n  lastMessage {\n    id\n    content\n    contentPlainText\n  }\n  ...ChatRoomHeaderFragment\n  ...MessagesListFragment\n}\n',
    },
  }
})()

;(node as any).hash = '5005ae78d2089bd950489282945277de'

export default node
