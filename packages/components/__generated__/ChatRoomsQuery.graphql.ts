/**
 * @generated SignedSource<<f0b0139cc989acbbd4d0cb7f9de6ddd2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ConcreteRequest, Query } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type ChatRoomsQuery$variables = Record<PropertyKey, never>
export type ChatRoomsQuery$data = {
  readonly me:
    | {
        readonly id: string
        readonly profile:
          | {
              readonly id: string
              readonly ' $fragmentSpreads': FragmentRefs<'RoomsListFragment'>
            }
          | null
          | undefined
      }
    | null
    | undefined
  readonly ' $fragmentSpreads': FragmentRefs<'AllProfilesListFragment'>
}
export type ChatRoomsQuery = {
  response: ChatRoomsQuery$data
  variables: ChatRoomsQuery$variables
}

const node: ConcreteRequest = (function () {
  var v0 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'id',
      storageKey: null,
    },
    v1 = {
      kind: 'Literal',
      name: 'first',
      value: 5,
    },
    v2 = [
      v1 /*: any*/,
      {
        kind: 'Literal',
        name: 'orderBy',
        value: '-created',
      },
    ],
    v3 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'totalCount',
      storageKey: null,
    },
    v4 = {
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
    v5 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'pk',
      storageKey: null,
    },
    v6 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'name',
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
      name: '__typename',
      storageKey: null,
    },
    v9 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'cursor',
      storageKey: null,
    },
    v10 = [v1 /*: any*/],
    v11 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'unreadMessagesCount',
      storageKey: null,
    },
    v12 = {
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
    v13 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'content',
      storageKey: null,
    },
    v14 = [
      {
        kind: 'Literal',
        name: 'first',
        value: 20,
      },
    ]
  return {
    fragment: {
      argumentDefinitions: [],
      kind: 'Fragment',
      metadata: null,
      name: 'ChatRoomsQuery',
      selections: [
        {
          args: null,
          kind: 'FragmentSpread',
          name: 'AllProfilesListFragment',
        },
        {
          alias: null,
          args: null,
          concreteType: 'User',
          kind: 'LinkedField',
          name: 'me',
          plural: false,
          selections: [
            v0 /*: any*/,
            {
              alias: null,
              args: null,
              concreteType: 'Profile',
              kind: 'LinkedField',
              name: 'profile',
              plural: false,
              selections: [
                v0 /*: any*/,
                {
                  args: null,
                  kind: 'FragmentSpread',
                  name: 'RoomsListFragment',
                },
              ],
              storageKey: null,
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
      argumentDefinitions: [],
      kind: 'Operation',
      name: 'ChatRoomsQuery',
      selections: [
        {
          alias: null,
          args: v2 /*: any*/,
          concreteType: 'ProfileConnection',
          kind: 'LinkedField',
          name: 'allProfiles',
          plural: false,
          selections: [
            v3 /*: any*/,
            v4 /*: any*/,
            {
              alias: null,
              args: null,
              concreteType: 'ProfileEdge',
              kind: 'LinkedField',
              name: 'edges',
              plural: true,
              selections: [
                {
                  alias: null,
                  args: null,
                  concreteType: 'Profile',
                  kind: 'LinkedField',
                  name: 'node',
                  plural: false,
                  selections: [
                    v0 /*: any*/,
                    v5 /*: any*/,
                    v6 /*: any*/,
                    {
                      alias: null,
                      args: [
                        {
                          kind: 'Literal',
                          name: 'height',
                          value: 48,
                        },
                        {
                          kind: 'Literal',
                          name: 'width',
                          value: 48,
                        },
                      ],
                      concreteType: 'File',
                      kind: 'LinkedField',
                      name: 'image',
                      plural: false,
                      selections: v7 /*: any*/,
                      storageKey: 'image(height:48,width:48)',
                    },
                    {
                      alias: null,
                      args: null,
                      concreteType: 'URLPath',
                      kind: 'LinkedField',
                      name: 'urlPath',
                      plural: false,
                      selections: [
                        {
                          alias: null,
                          args: null,
                          kind: 'ScalarField',
                          name: 'path',
                          storageKey: null,
                        },
                        v0 /*: any*/,
                      ],
                      storageKey: null,
                    },
                    v8 /*: any*/,
                  ],
                  storageKey: null,
                },
                v9 /*: any*/,
              ],
              storageKey: null,
            },
          ],
          storageKey: 'allProfiles(first:5,orderBy:"-created")',
        },
        {
          alias: null,
          args: v2 /*: any*/,
          filters: ['orderBy', 'q'],
          handle: 'connection',
          key: 'AllProfilesListFragment_allProfiles',
          kind: 'LinkedHandle',
          name: 'allProfiles',
        },
        {
          alias: null,
          args: null,
          concreteType: 'User',
          kind: 'LinkedField',
          name: 'me',
          plural: false,
          selections: [
            v0 /*: any*/,
            {
              alias: null,
              args: null,
              concreteType: 'Profile',
              kind: 'LinkedField',
              name: 'profile',
              plural: false,
              selections: [
                v0 /*: any*/,
                {
                  kind: 'InlineFragment',
                  selections: [
                    {
                      alias: null,
                      args: v10 /*: any*/,
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
                                v0 /*: any*/,
                                v11 /*: any*/,
                                v12 /*: any*/,
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
                                  selections: [v0 /*: any*/, v13 /*: any*/],
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
                                    v3 /*: any*/,
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
                                            v0 /*: any*/,
                                            {
                                              alias: null,
                                              args: null,
                                              concreteType: 'Profile',
                                              kind: 'LinkedField',
                                              name: 'profile',
                                              plural: false,
                                              selections: [
                                                v0 /*: any*/,
                                                v8 /*: any*/,
                                                v6 /*: any*/,
                                                v12 /*: any*/,
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
                                  args: v14 /*: any*/,
                                  concreteType: 'MessageConnection',
                                  kind: 'LinkedField',
                                  name: 'allMessages',
                                  plural: false,
                                  selections: [
                                    v3 /*: any*/,
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
                                            v0 /*: any*/,
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
                                                v0 /*: any*/,
                                                v6 /*: any*/,
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
                                            v13 /*: any*/,
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
                                              selections: [v0 /*: any*/],
                                              storageKey: null,
                                            },
                                            v5 /*: any*/,
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
                                        v9 /*: any*/,
                                      ],
                                      storageKey: null,
                                    },
                                    v4 /*: any*/,
                                  ],
                                  storageKey: 'allMessages(first:20)',
                                },
                                {
                                  alias: null,
                                  args: v14 /*: any*/,
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
                            v9 /*: any*/,
                          ],
                          storageKey: null,
                        },
                        v4 /*: any*/,
                      ],
                      storageKey: 'chatRooms(first:5)',
                    },
                    {
                      alias: null,
                      args: v10 /*: any*/,
                      filters: ['q'],
                      handle: 'connection',
                      key: 'roomsList_chatRooms',
                      kind: 'LinkedHandle',
                      name: 'chatRooms',
                    },
                    v11 /*: any*/,
                  ],
                  type: 'ChatRoomsInterface',
                  abstractKey: '__isChatRoomsInterface',
                },
              ],
              storageKey: null,
            },
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: '8e8cc1f1c6a69c0e11cff5d53c2b0db4',
      id: null,
      metadata: {},
      name: 'ChatRoomsQuery',
      operationKind: 'query',
      text: 'query ChatRoomsQuery {\n  ...AllProfilesListFragment\n  me {\n    id\n    profile {\n      id\n      ...RoomsListFragment\n    }\n  }\n}\n\nfragment AllProfilesListFragment on Query {\n  allProfiles(first: 5, orderBy: "-created") {\n    totalCount\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      node {\n        id\n        pk\n        name\n        image(width: 48, height: 48) {\n          url\n        }\n        urlPath {\n          path\n          id\n        }\n        __typename\n      }\n      cursor\n    }\n  }\n}\n\nfragment MessageItemFragment on Message {\n  id\n  content\n  created\n  extraData\n  inReplyTo {\n    id\n  }\n  pk\n  profile {\n    id\n  }\n  verb\n}\n\nfragment MessagesListFragment on ChatRoom {\n  id\n  participants {\n    totalCount\n  }\n  allMessages(first: 20) {\n    totalCount\n    edges {\n      node {\n        id\n        created\n        profile {\n          id\n          name\n          image(height: 32, width: 32) {\n            url\n          }\n        }\n        ...MessageItemFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n\nfragment RoomFragment on ChatRoom {\n  id\n  unreadMessagesCount\n  image(width: 100, height: 100) {\n    url\n  }\n  lastMessageTime\n  lastMessage {\n    id\n    content\n  }\n  title\n  participants {\n    totalCount\n    edges {\n      node {\n        id\n        profile {\n          id\n          __typename\n          name\n          image(width: 100, height: 100) {\n            url\n          }\n        }\n      }\n    }\n  }\n  ...MessagesListFragment\n}\n\nfragment RoomsListFragment on ChatRoomsInterface {\n  __isChatRoomsInterface: __typename\n  id\n  chatRooms(first: 5) {\n    edges {\n      node {\n        id\n        unreadMessagesCount\n        ...RoomFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n  unreadMessagesCount\n}\n',
    },
  }
})()

;(node as any).hash = '92001c5e34f05864902f11eb244a7e16'

export default node
