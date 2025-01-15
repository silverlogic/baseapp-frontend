/**
 * @generated SignedSource<<0acbbcc74eacb15353d70c5fac0f581f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ConcreteRequest, Query } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type chatRoomsPaginationQuery$variables = {
  archived?: boolean | null | undefined
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
      defaultValue: false,
      kind: 'LocalArgument',
      name: 'archived',
    },
    v1 = {
      defaultValue: 5,
      kind: 'LocalArgument',
      name: 'count',
    },
    v2 = {
      defaultValue: null,
      kind: 'LocalArgument',
      name: 'cursor',
    },
    v3 = {
      defaultValue: null,
      kind: 'LocalArgument',
      name: 'id',
    },
    v4 = {
      defaultValue: '',
      kind: 'LocalArgument',
      name: 'q',
    },
    v5 = {
      defaultValue: false,
      kind: 'LocalArgument',
      name: 'unreadMessages',
    },
    v6 = [
      {
        kind: 'Variable',
        name: 'id',
        variableName: 'id',
      },
    ],
    v7 = {
      kind: 'Variable',
      name: 'archived',
      variableName: 'archived',
    },
    v8 = {
      kind: 'Variable',
      name: 'q',
      variableName: 'q',
    },
    v9 = {
      kind: 'Variable',
      name: 'unreadMessages',
      variableName: 'unreadMessages',
    },
    v10 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: '__typename',
      storageKey: null,
    },
    v11 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'id',
      storageKey: null,
    },
    v12 = [
      {
        kind: 'Variable',
        name: 'after',
        variableName: 'cursor',
      },
      v7 /*: any*/,
      {
        kind: 'Variable',
        name: 'first',
        variableName: 'count',
      },
      v8 /*: any*/,
      v9 /*: any*/,
    ],
    v13 = [
      {
        alias: null,
        args: null,
        kind: 'ScalarField',
        name: 'url',
        storageKey: null,
      },
    ]
  return {
    fragment: {
      argumentDefinitions: [
        v0 /*: any*/,
        v1 /*: any*/,
        v2 /*: any*/,
        v3 /*: any*/,
        v4 /*: any*/,
        v5 /*: any*/,
      ],
      kind: 'Fragment',
      metadata: null,
      name: 'chatRoomsPaginationQuery',
      selections: [
        {
          alias: null,
          args: v6 /*: any*/,
          concreteType: null,
          kind: 'LinkedField',
          name: 'node',
          plural: false,
          selections: [
            {
              args: [
                v7 /*: any*/,
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
                v8 /*: any*/,
                v9 /*: any*/,
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
      argumentDefinitions: [
        v0 /*: any*/,
        v1 /*: any*/,
        v2 /*: any*/,
        v4 /*: any*/,
        v5 /*: any*/,
        v3 /*: any*/,
      ],
      kind: 'Operation',
      name: 'chatRoomsPaginationQuery',
      selections: [
        {
          alias: null,
          args: v6 /*: any*/,
          concreteType: null,
          kind: 'LinkedField',
          name: 'node',
          plural: false,
          selections: [
            v10 /*: any*/,
            v11 /*: any*/,
            {
              kind: 'InlineFragment',
              selections: [
                {
                  alias: null,
                  args: v12 /*: any*/,
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
                              selections: [
                                v11 /*: any*/,
                                {
                                  alias: null,
                                  args: null,
                                  kind: 'ScalarField',
                                  name: 'content',
                                  storageKey: null,
                                },
                              ],
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
                                  value: 2,
                                },
                              ],
                              concreteType: 'ChatRoomParticipantConnection',
                              kind: 'LinkedField',
                              name: 'participants',
                              plural: false,
                              selections: [
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
                                            v11 /*: any*/,
                                            {
                                              alias: null,
                                              args: null,
                                              kind: 'ScalarField',
                                              name: 'name',
                                              storageKey: null,
                                            },
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
                                              selections: v13 /*: any*/,
                                              storageKey: 'image(height:100,width:100)',
                                            },
                                          ],
                                          storageKey: null,
                                        },
<<<<<<< HEAD
=======
                                        {
                                          alias: null,
                                          args: null,
                                          kind: 'ScalarField',
                                          name: 'role',
                                          storageKey: null,
                                        },
>>>>>>> ca42a63 (feat: leave chatroom as admin)
                                        v11 /*: any*/,
                                      ],
                                      storageKey: null,
                                    },
                                  ],
                                  storageKey: null,
                                },
                              ],
                              storageKey: 'participants(first:2)',
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
                              selections: v13 /*: any*/,
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
                                v11 /*: any*/,
                              ],
                              storageKey: null,
                            },
                            v10 /*: any*/,
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
                  storageKey: null,
                },
                {
                  alias: null,
                  args: v12 /*: any*/,
                  filters: ['q', 'unreadMessages', 'archived'],
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
<<<<<<< HEAD
      cacheID: 'b1100ee4f24d18cdd232451eaaf87847',
=======
      cacheID: '7ebe7a99706098bde0517d1d04caf7b8',
>>>>>>> ca42a63 (feat: leave chatroom as admin)
      id: null,
      metadata: {},
      name: 'chatRoomsPaginationQuery',
      operationKind: 'query',
<<<<<<< HEAD
      text: 'query chatRoomsPaginationQuery(\n  $archived: Boolean = false\n  $count: Int = 5\n  $cursor: String\n  $q: String = ""\n  $unreadMessages: Boolean = false\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...RoomsListFragment_3I5PKK\n    id\n  }\n}\n\nfragment GroupTitleFragment on ChatRoom {\n  id\n  image(width: 144, height: 144) {\n    url\n  }\n  title\n}\n\nfragment LastMessageFragment on ChatRoom {\n  id\n  lastMessageTime\n  lastMessage {\n    id\n    content\n  }\n}\n\nfragment RoomTitleFragment on ChatRoom {\n  id\n  participants(first: 2) {\n    edges {\n      node {\n        profile {\n          id\n          name\n          image(width: 100, height: 100) {\n            url\n          }\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment RoomsListFragment_3I5PKK on ChatRoomsInterface {\n  __isChatRoomsInterface: __typename\n  chatRooms(first: $count, after: $cursor, q: $q, unreadMessages: $unreadMessages, archived: $archived) {\n    edges {\n      node {\n        id\n        ...LastMessageFragment\n        ...TitleFragment\n        ...UnreadMessagesCountFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n  id\n}\n\nfragment TitleFragment on ChatRoom {\n  id\n  isGroup\n  ...RoomTitleFragment\n  ...GroupTitleFragment\n}\n\nfragment UnreadMessagesCountFragment on ChatRoom {\n  id\n  unreadMessages {\n    count\n    markedUnread\n    id\n  }\n}\n',
=======
      text: 'query chatRoomsPaginationQuery(\n  $archived: Boolean = false\n  $count: Int = 5\n  $cursor: String\n  $q: String = ""\n  $unreadMessages: Boolean = false\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...RoomsListFragment_3I5PKK\n    id\n  }\n}\n\nfragment GroupTitleFragment on ChatRoom {\n  id\n  image(width: 144, height: 144) {\n    url\n  }\n  title\n}\n\nfragment LastMessageFragment on ChatRoom {\n  id\n  lastMessageTime\n  lastMessage {\n    id\n    content\n  }\n}\n\nfragment RoomTitleFragment on ChatRoom {\n  id\n  participants(first: 2) {\n    edges {\n      node {\n        profile {\n          id\n          name\n          image(width: 100, height: 100) {\n            url\n          }\n        }\n        role\n        id\n      }\n    }\n  }\n}\n\nfragment RoomsListFragment_3I5PKK on ChatRoomsInterface {\n  __isChatRoomsInterface: __typename\n  chatRooms(first: $count, after: $cursor, q: $q, unreadMessages: $unreadMessages, archived: $archived) {\n    edges {\n      node {\n        id\n        ...LastMessageFragment\n        ...TitleFragment\n        ...UnreadMessagesCountFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n  id\n}\n\nfragment TitleFragment on ChatRoom {\n  id\n  isGroup\n  ...RoomTitleFragment\n  ...GroupTitleFragment\n}\n\nfragment UnreadMessagesCountFragment on ChatRoom {\n  id\n  unreadMessages {\n    count\n    markedUnread\n    id\n  }\n}\n',
>>>>>>> ca42a63 (feat: leave chatroom as admin)
    },
  }
})()

;(node as any).hash = '3a66898cb96bbf4ce999aa5ad9822ca0'

export default node
