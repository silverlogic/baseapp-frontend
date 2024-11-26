/**
 * @generated SignedSource<<90594853ede98080a5f45b3437de98c7>>
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
    v4 = [
      {
        kind: 'Variable',
        name: 'id',
        variableName: 'id',
      },
    ],
    v5 = {
      kind: 'Variable',
      name: 'q',
      variableName: 'q',
    },
    v6 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: '__typename',
      storageKey: null,
    },
    v7 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'id',
      storageKey: null,
    },
    v8 = [
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
      v5 /*: any*/,
    ],
    v9 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'unreadMessagesCount',
      storageKey: null,
    },
    v10 = [
      {
        alias: null,
        args: null,
        kind: 'ScalarField',
        name: 'url',
        storageKey: null,
      },
    ],
    v11 = {
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
      selections: v10 /*: any*/,
      storageKey: 'image(height:100,width:100)',
    },
    v12 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'content',
      storageKey: null,
    },
    v13 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'totalCount',
      storageKey: null,
    },
    v14 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'name',
      storageKey: null,
    },
    v15 = [
      {
        kind: 'Literal',
        name: 'first',
        value: 20,
      },
    ],
    v16 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'cursor',
      storageKey: null,
    },
    v17 = {
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
      argumentDefinitions: [v0 /*: any*/, v1 /*: any*/, v2 /*: any*/, v3 /*: any*/],
      kind: 'Fragment',
      metadata: null,
      name: 'chatRoomsPaginationQuery',
      selections: [
        {
          alias: null,
          args: v4 /*: any*/,
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
                v5 /*: any*/,
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
      argumentDefinitions: [v0 /*: any*/, v1 /*: any*/, v3 /*: any*/, v2 /*: any*/],
      kind: 'Operation',
      name: 'chatRoomsPaginationQuery',
      selections: [
        {
          alias: null,
          args: v4 /*: any*/,
          concreteType: null,
          kind: 'LinkedField',
          name: 'node',
          plural: false,
          selections: [
            v6 /*: any*/,
            v7 /*: any*/,
            {
              kind: 'InlineFragment',
              selections: [
                {
                  alias: null,
                  args: v8 /*: any*/,
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
                            v7 /*: any*/,
                            v9 /*: any*/,
                            v11 /*: any*/,
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
                              selections: [v7 /*: any*/, v12 /*: any*/],
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
                                v13 /*: any*/,
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
                                        v7 /*: any*/,
                                        {
                                          alias: null,
                                          args: null,
                                          concreteType: 'Profile',
                                          kind: 'LinkedField',
                                          name: 'profile',
                                          plural: false,
                                          selections: [
                                            v7 /*: any*/,
                                            v6 /*: any*/,
                                            v14 /*: any*/,
                                            v11 /*: any*/,
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
                              args: v15 /*: any*/,
                              concreteType: 'MessageConnection',
                              kind: 'LinkedField',
                              name: 'allMessages',
                              plural: false,
                              selections: [
                                v13 /*: any*/,
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
                                        v7 /*: any*/,
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
                                            v7 /*: any*/,
                                            v14 /*: any*/,
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
                                              selections: v10 /*: any*/,
                                              storageKey: 'image(height:32,width:32)',
                                            },
                                          ],
                                          storageKey: null,
                                        },
                                        v12 /*: any*/,
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
                                          selections: [v7 /*: any*/],
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
                                        v6 /*: any*/,
                                      ],
                                      storageKey: null,
                                    },
                                    v16 /*: any*/,
                                  ],
                                  storageKey: null,
                                },
                                v17 /*: any*/,
                              ],
                              storageKey: 'allMessages(first:20)',
                            },
                            {
                              alias: null,
                              args: v15 /*: any*/,
                              filters: null,
                              handle: 'connection',
                              key: 'chatRoom_allMessages',
                              kind: 'LinkedHandle',
                              name: 'allMessages',
                            },
                            v6 /*: any*/,
                          ],
                          storageKey: null,
                        },
                        v16 /*: any*/,
                      ],
                      storageKey: null,
                    },
                    v17 /*: any*/,
                  ],
                  storageKey: null,
                },
                {
                  alias: null,
                  args: v8 /*: any*/,
                  filters: ['q'],
                  handle: 'connection',
                  key: 'roomsList_chatRooms',
                  kind: 'LinkedHandle',
                  name: 'chatRooms',
                },
                v9 /*: any*/,
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
      cacheID: 'd2e62465c109463b6975a50af0ffa5c5',
      id: null,
      metadata: {},
      name: 'chatRoomsPaginationQuery',
      operationKind: 'query',
      text: 'query chatRoomsPaginationQuery(\n  $count: Int = 5\n  $cursor: String\n  $q: String = null\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...RoomsListFragment_XhAmI\n    id\n  }\n}\n\nfragment MessageItemFragment on Message {\n  id\n  content\n  created\n  extraData\n  inReplyTo {\n    id\n  }\n  pk\n  profile {\n    id\n  }\n  verb\n}\n\nfragment MessagesListFragment on ChatRoom {\n  id\n  participants {\n    totalCount\n  }\n  allMessages(first: 20) {\n    totalCount\n    edges {\n      node {\n        id\n        created\n        profile {\n          id\n          name\n          image(height: 32, width: 32) {\n            url\n          }\n        }\n        ...MessageItemFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n\nfragment RoomFragment on ChatRoom {\n  id\n  unreadMessagesCount\n  image(width: 100, height: 100) {\n    url\n  }\n  lastMessageTime\n  lastMessage {\n    id\n    content\n  }\n  title\n  participants {\n    totalCount\n    edges {\n      node {\n        id\n        profile {\n          id\n          __typename\n          name\n          image(width: 100, height: 100) {\n            url\n          }\n        }\n      }\n    }\n  }\n  ...MessagesListFragment\n}\n\nfragment RoomsListFragment_XhAmI on ChatRoomsInterface {\n  __isChatRoomsInterface: __typename\n  id\n  chatRooms(first: $count, after: $cursor, q: $q) {\n    edges {\n      node {\n        id\n        unreadMessagesCount\n        ...RoomFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n  unreadMessagesCount\n}\n',
    },
  }
})()

;(node as any).hash = '503f16e1be2d090bcacfff6d0c023a45'

export default node
