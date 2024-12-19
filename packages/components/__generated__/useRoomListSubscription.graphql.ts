/**
 * @generated SignedSource<<087b933a84e193988f8e6fc01a359ed2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type useRoomListSubscription$variables = {
  connections: ReadonlyArray<string>
  profileId: string
}
export type useRoomListSubscription$data = {
  readonly chatRoomOnRoomUpdate:
    | {
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
export type useRoomListSubscription = {
  response: useRoomListSubscription$data
  variables: useRoomListSubscription$variables
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
      name: 'profileId',
    },
    v2 = [
      {
        kind: 'Variable',
        name: 'profileId',
        variableName: 'profileId',
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
    v7 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'name',
      storageKey: null,
    },
    v8 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'totalCount',
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
      name: 'useRoomListSubscription',
      selections: [
        {
          alias: null,
          args: v2 /*: any*/,
          concreteType: 'ChatRoomOnRoomUpdate',
          kind: 'LinkedField',
          name: 'chatRoomOnRoomUpdate',
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
          ],
          storageKey: null,
        },
      ],
      type: 'Subscription',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: [v1 /*: any*/, v0 /*: any*/],
      kind: 'Operation',
      name: 'useRoomListSubscription',
      selections: [
        {
          alias: null,
          args: v2 /*: any*/,
          concreteType: 'ChatRoomOnRoomUpdate',
          kind: 'LinkedField',
          name: 'chatRoomOnRoomUpdate',
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
                      concreteType: 'UnreadMessages',
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
                      selections: [v3 /*: any*/, v4 /*: any*/],
                      storageKey: null,
                    },
                    v6 /*: any*/,
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
                                  selections: [v3 /*: any*/, v7 /*: any*/, v6 /*: any*/],
                                  storageKey: null,
                                },
                                v3 /*: any*/,
                              ],
                              storageKey: null,
                            },
                          ],
                          storageKey: null,
                        },
                        v8 /*: any*/,
                      ],
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: v9 /*: any*/,
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
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: '950110109bb9b8a50fe13efe86c1b32e',
      id: null,
      metadata: {},
      name: 'useRoomListSubscription',
      operationKind: 'subscription',
      text: 'subscription useRoomListSubscription(\n  $profileId: ID!\n) {\n  chatRoomOnRoomUpdate(profileId: $profileId) {\n    room {\n      node {\n        id\n        ...RoomFragment\n      }\n    }\n  }\n}\n\nfragment ChatRoomHeaderFragment on ChatRoom {\n  image(width: 100, height: 100) {\n    url\n  }\n  title\n  participants {\n    edges {\n      node {\n        profile {\n          id\n          name\n          image(width: 100, height: 100) {\n            url\n          }\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment MessageItemFragment on Message {\n  id\n  content\n  created\n  extraData\n  inReplyTo {\n    id\n  }\n  isRead\n  pk\n  profile {\n    id\n  }\n  verb\n}\n\nfragment MessagesListFragment on ChatRoom {\n  id\n  participants {\n    totalCount\n  }\n  unreadMessages {\n    count\n    markedUnread\n  }\n  allMessages(first: 20) {\n    totalCount\n    edges {\n      node {\n        id\n        created\n        profile {\n          id\n          name\n          image(height: 32, width: 32) {\n            url\n          }\n        }\n        isRead\n        ...MessageItemFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n\nfragment RoomFragment on ChatRoom {\n  id\n  unreadMessages {\n    count\n    markedUnread\n  }\n  lastMessageTime\n  lastMessage {\n    id\n    content\n  }\n  ...ChatRoomHeaderFragment\n  ...MessagesListFragment\n}\n',
    },
  }
})()

;(node as any).hash = '0464ef194cb3243175a497ff51e98cf5'

export default node
