/**
 * @generated SignedSource<<8de8c94cae930c0c433d32612e785daa>>
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
      name: 'name',
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
    v10 = [
      {
        kind: 'Literal',
        name: 'archived',
        value: false,
      },
      v1 /*: any*/,
      {
        kind: 'Literal',
        name: 'unreadMessages',
        value: false,
      },
    ],
    v11 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'content',
      storageKey: null,
    },
    v12 = [
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
                    v7 /*: any*/,
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
                                    v0 /*: any*/,
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
                                  selections: [v0 /*: any*/, v11 /*: any*/],
                                  storageKey: null,
                                },
                                v7 /*: any*/,
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
                                  args: null,
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
                                                v0 /*: any*/,
                                                v5 /*: any*/,
                                                v7 /*: any*/,
                                              ],
                                              storageKey: null,
                                            },
                                            v0 /*: any*/,
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
                                {
                                  alias: null,
                                  args: v12 /*: any*/,
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
                                                v5 /*: any*/,
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
                                            v11 /*: any*/,
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
                                  args: v12 /*: any*/,
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
                      storageKey: 'chatRooms(archived:false,first:5,unreadMessages:false)',
                    },
                    {
                      alias: null,
                      args: v10 /*: any*/,
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
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: 'e1671d0045de33fad71d51afa2bc42d4',
      id: null,
      metadata: {},
      name: 'ChatRoomsQuery',
      operationKind: 'query',
      text: 'query ChatRoomsQuery {\n  ...AllProfilesListFragment\n  me {\n    id\n    profile {\n      id\n      ...RoomsListFragment\n    }\n  }\n}\n\nfragment AllProfilesListFragment on Query {\n  allProfiles(first: 5, orderBy: "-created") {\n    totalCount\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      node {\n        id\n        ...ProfileItemFragment\n        __typename\n      }\n      cursor\n    }\n  }\n}\n\nfragment ChatRoomHeaderFragment on ChatRoom {\n  image(width: 100, height: 100) {\n    url\n  }\n  title\n  isGroup\n  participants {\n    edges {\n      node {\n        profile {\n          id\n          name\n          image(width: 100, height: 100) {\n            url\n          }\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment MessageItemFragment on Message {\n  id\n  content\n  created\n  extraData\n  inReplyTo {\n    id\n  }\n  isRead\n  pk\n  profile {\n    id\n  }\n  verb\n}\n\nfragment MessagesListFragment on ChatRoom {\n  id\n  participants {\n    totalCount\n  }\n  isGroup\n  unreadMessages {\n    count\n    markedUnread\n    id\n  }\n  allMessages(first: 20) {\n    totalCount\n    edges {\n      node {\n        id\n        created\n        profile {\n          id\n          name\n          image(height: 32, width: 32) {\n            url\n          }\n        }\n        isRead\n        ...MessageItemFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n\nfragment ProfileItemFragment on Profile {\n  id\n  name\n  image(width: 100, height: 100) {\n    url\n  }\n  urlPath {\n    path\n    id\n  }\n}\n\nfragment RoomFragment on ChatRoom {\n  id\n  unreadMessages {\n    count\n    markedUnread\n    id\n  }\n  lastMessageTime\n  lastMessage {\n    id\n    content\n  }\n  ...ChatRoomHeaderFragment\n  ...MessagesListFragment\n}\n\nfragment RoomsListFragment on ChatRoomsInterface {\n  __isChatRoomsInterface: __typename\n  chatRooms(first: 5, unreadMessages: false, archived: false) {\n    edges {\n      node {\n        id\n        ...RoomFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n  id\n}\n',
    },
  }
})()

;(node as any).hash = '92001c5e34f05864902f11eb244a7e16'

export default node
