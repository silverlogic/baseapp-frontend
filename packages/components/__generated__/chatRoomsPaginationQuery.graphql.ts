/**
 * @generated SignedSource<<0da3b8f334193df5e7fb534994876c50>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ConcreteRequest, Query } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type chatRoomsPaginationQuery$variables = {
  count?: number | null | undefined
  cursor?: string | null | undefined
  id: string
  q?: string | null | undefined
  unreadMessages?: boolean | null | undefined
}
export type chatRoomsPaginationQuery$data = {
  readonly node:
    | {
        readonly ' $fragmentSpreads': FragmentRefs<'RoomsListFragment'>
      }
    | null
    | undefined
}
export type chatRoomsPaginationQuery = {
  response: chatRoomsPaginationQuery$data
  variables: chatRoomsPaginationQuery$variables
}

const node: ConcreteRequest = (function () {
  var v0 = {
      defaultValue: 5,
      kind: 'LocalArgument',
      name: 'count',
    },
    v1 = {
      defaultValue: null,
      kind: 'LocalArgument',
      name: 'cursor',
    },
    v2 = {
      defaultValue: null,
      kind: 'LocalArgument',
      name: 'id',
    },
    v3 = {
      defaultValue: null,
      kind: 'LocalArgument',
      name: 'q',
    },
    v4 = {
      defaultValue: false,
      kind: 'LocalArgument',
      name: 'unreadMessages',
    },
    v5 = [
      {
        kind: 'Variable',
        name: 'id',
        variableName: 'id',
      },
    ],
    v6 = {
      kind: 'Variable',
      name: 'q',
      variableName: 'q',
    },
    v7 = {
      kind: 'Variable',
      name: 'unreadMessages',
      variableName: 'unreadMessages',
    },
    v8 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: '__typename',
      storageKey: null,
    },
    v9 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'id',
      storageKey: null,
    },
    v10 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'unreadMessagesCount',
      storageKey: null,
    },
    v11 = [
      {
        kind: 'Variable',
        name: 'after',
        variableName: 'cursor',
      },
      {
        kind: 'Variable',
        name: 'first',
        variableName: 'count',
      },
      v6 /*: any*/,
      v7 /*: any*/,
    ],
    v12 = [
      {
        alias: null,
        args: null,
        kind: 'ScalarField',
        name: 'url',
        storageKey: null,
      },
    ],
    v13 = {
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
      selections: v12 /*: any*/,
      storageKey: 'image(height:100,width:100)',
    },
    v14 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'content',
      storageKey: null,
    },
    v15 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'totalCount',
      storageKey: null,
    },
    v16 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'name',
      storageKey: null,
    },
    v17 = [
      {
        kind: 'Literal',
        name: 'first',
        value: 20,
      },
    ],
    v18 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'cursor',
      storageKey: null,
    },
    v19 = {
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
    }
  return {
    fragment: {
      argumentDefinitions: [v0 /*: any*/, v1 /*: any*/, v2 /*: any*/, v3 /*: any*/, v4 /*: any*/],
      kind: 'Fragment',
      metadata: null,
      name: 'chatRoomsPaginationQuery',
      selections: [
        {
          alias: null,
          args: v5 /*: any*/,
          concreteType: null,
          kind: 'LinkedField',
          name: 'node',
          plural: false,
          selections: [
            {
              args: [
                {
                  kind: 'Variable',
                  name: 'count',
                  variableName: 'count',
                },
                {
                  kind: 'Variable',
                  name: 'cursor',
                  variableName: 'cursor',
                },
                v6 /*: any*/,
                v7 /*: any*/,
              ],
              kind: 'FragmentSpread',
              name: 'RoomsListFragment',
            },
          ],
          storageKey: null,
        },
      ],
      type: 'Query',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: [v0 /*: any*/, v1 /*: any*/, v3 /*: any*/, v4 /*: any*/, v2 /*: any*/],
      kind: 'Operation',
      name: 'chatRoomsPaginationQuery',
      selections: [
        {
          alias: null,
          args: v5 /*: any*/,
          concreteType: null,
          kind: 'LinkedField',
          name: 'node',
          plural: false,
          selections: [
            v8 /*: any*/,
            v9 /*: any*/,
            {
              kind: 'InlineFragment',
              selections: [
                v10 /*: any*/,
                {
                  alias: null,
                  args: v11 /*: any*/,
                  concreteType: 'ChatRoomConnection',
                  kind: 'LinkedField',
                  name: 'chatRooms',
                  plural: false,
                  selections: [
                    {
                      alias: null,
                      args: null,
                      concreteType: 'ChatRoomEdge',
                      kind: 'LinkedField',
                      name: 'edges',
                      plural: true,
                      selections: [
                        {
                          alias: null,
                          args: null,
                          concreteType: 'ChatRoom',
                          kind: 'LinkedField',
                          name: 'node',
                          plural: false,
                          selections: [
                            v9 /*: any*/,
                            v10 /*: any*/,
                            v13 /*: any*/,
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
                              selections: [v9 /*: any*/, v14 /*: any*/],
                              storageKey: null,
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
                              concreteType: 'ChatRoomParticipantConnection',
                              kind: 'LinkedField',
                              name: 'participants',
                              plural: false,
                              selections: [
                                v15 /*: any*/,
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
                                        v9 /*: any*/,
                                        {
                                          alias: null,
                                          args: null,
                                          concreteType: 'Profile',
                                          kind: 'LinkedField',
                                          name: 'profile',
                                          plural: false,
                                          selections: [
                                            v9 /*: any*/,
                                            v8 /*: any*/,
                                            v16 /*: any*/,
                                            v13 /*: any*/,
                                          ],
                                          storageKey: null,
                                        },
                                      ],
                                      storageKey: null,
                                    },
                                  ],
                                  storageKey: null,
                                },
                              ],
                              storageKey: null,
                            },
                            {
                              alias: null,
                              args: v17 /*: any*/,
                              concreteType: 'MessageConnection',
                              kind: 'LinkedField',
                              name: 'allMessages',
                              plural: false,
                              selections: [
                                v15 /*: any*/,
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
                                        v9 /*: any*/,
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
                                            v9 /*: any*/,
                                            v16 /*: any*/,
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
                                              selections: v12 /*: any*/,
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
                                        v14 /*: any*/,
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
                                          selections: [v9 /*: any*/],
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
                                        v8 /*: any*/,
                                      ],
                                      storageKey: null,
                                    },
                                    v18 /*: any*/,
                                  ],
                                  storageKey: null,
                                },
                                v19 /*: any*/,
                              ],
                              storageKey: 'allMessages(first:20)',
                            },
                            {
                              alias: null,
                              args: v17 /*: any*/,
                              filters: null,
                              handle: 'connection',
                              key: 'chatRoom_allMessages',
                              kind: 'LinkedHandle',
                              name: 'allMessages',
                            },
                            v8 /*: any*/,
                          ],
                          storageKey: null,
                        },
                        v18 /*: any*/,
                      ],
                      storageKey: null,
                    },
                    v19 /*: any*/,
                  ],
                  storageKey: null,
                },
                {
                  alias: null,
                  args: v11 /*: any*/,
                  filters: ['q', 'unreadMessages'],
                  handle: 'connection',
                  key: 'roomsList_chatRooms',
                  kind: 'LinkedHandle',
                  name: 'chatRooms',
                },
              ],
              type: 'ChatRoomsInterface',
              abstractKey: '__isChatRoomsInterface',
            },
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: '2498718df6928cbf601ebbe7166e32f4',
      id: null,
      metadata: {},
      name: 'chatRoomsPaginationQuery',
      operationKind: 'query',
      text: 'query chatRoomsPaginationQuery(\n  $count: Int = 5\n  $cursor: String\n  $q: String = null\n  $unreadMessages: Boolean = false\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...RoomsListFragment_4kOb3U\n    id\n  }\n}\n\nfragment MessageItemFragment on Message {\n  id\n  content\n  created\n  extraData\n  inReplyTo {\n    id\n  }\n  isRead\n  pk\n  profile {\n    id\n  }\n  verb\n}\n\nfragment MessagesListFragment on ChatRoom {\n  id\n  participants {\n    totalCount\n  }\n  unreadMessagesCount\n  allMessages(first: 20) {\n    totalCount\n    edges {\n      node {\n        id\n        created\n        profile {\n          id\n          name\n          image(height: 32, width: 32) {\n            url\n          }\n        }\n        isRead\n        ...MessageItemFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n\nfragment RoomFragment on ChatRoom {\n  id\n  unreadMessagesCount\n  image(width: 100, height: 100) {\n    url\n  }\n  lastMessageTime\n  lastMessage {\n    id\n    content\n  }\n  title\n  participants {\n    totalCount\n    edges {\n      node {\n        id\n        profile {\n          id\n          __typename\n          name\n          image(width: 100, height: 100) {\n            url\n          }\n        }\n      }\n    }\n  }\n  ...MessagesListFragment\n}\n\nfragment RoomsListFragment_4kOb3U on ChatRoomsInterface {\n  __isChatRoomsInterface: __typename\n  id\n  unreadMessagesCount\n  chatRooms(first: $count, after: $cursor, q: $q, unreadMessages: $unreadMessages) {\n    edges {\n      node {\n        id\n        unreadMessagesCount\n        ...RoomFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n',
    },
  }
})()

;(node as any).hash = 'cf8dd10e5de039944535e8c431f1adfb'

export default node
