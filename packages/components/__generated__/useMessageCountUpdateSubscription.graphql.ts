/**
 * @generated SignedSource<<2599ef209ba3fbbc434d26f3c87b62ca>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type useMessageCountUpdateSubscription$variables = {
  profileId: string
}
export type useMessageCountUpdateSubscription$data = {
  readonly chatRoomOnMessagesCountUpdate:
    | {
        readonly profile:
          | {
              readonly chatRooms:
                | {
                    readonly edges: ReadonlyArray<
                      | {
                          readonly node:
                            | {
                                readonly __typename: 'ChatRoom'
                                readonly id: string
                                readonly unreadMessagesCount: number | null | undefined
                                readonly ' $fragmentSpreads': FragmentRefs<'RoomFragment'>
                              }
                            | null
                            | undefined
                        }
                      | null
                      | undefined
                    >
                    readonly totalCount: number | null | undefined
                  }
                | null
                | undefined
              readonly id: string
              readonly unreadMessagesCount: number | null | undefined
            }
          | null
          | undefined
      }
    | null
    | undefined
}
export type useMessageCountUpdateSubscription = {
  response: useMessageCountUpdateSubscription$data
  variables: useMessageCountUpdateSubscription$variables
}

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        defaultValue: null,
        kind: 'LocalArgument',
        name: 'profileId',
      },
    ],
    v1 = [
      {
        kind: 'Variable',
        name: 'profileId',
        variableName: 'profileId',
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
      name: 'unreadMessagesCount',
      storageKey: null,
    },
    v4 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'totalCount',
      storageKey: null,
    },
    v5 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: '__typename',
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
      name: 'content',
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
      name: 'useMessageCountUpdateSubscription',
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: 'ChatRoomOnMessagesCountUpdate',
          kind: 'LinkedField',
          name: 'chatRoomOnMessagesCountUpdate',
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
                v3 /*: any*/,
                {
                  alias: null,
                  args: null,
                  concreteType: 'ChatRoomConnection',
                  kind: 'LinkedField',
                  name: 'chatRooms',
                  plural: false,
                  selections: [
                    v4 /*: any*/,
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
                            v2 /*: any*/,
                            v5 /*: any*/,
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
      argumentDefinitions: v0 /*: any*/,
      kind: 'Operation',
      name: 'useMessageCountUpdateSubscription',
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: 'ChatRoomOnMessagesCountUpdate',
          kind: 'LinkedField',
          name: 'chatRoomOnMessagesCountUpdate',
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
                v3 /*: any*/,
                {
                  alias: null,
                  args: null,
                  concreteType: 'ChatRoomConnection',
                  kind: 'LinkedField',
                  name: 'chatRooms',
                  plural: false,
                  selections: [
                    v4 /*: any*/,
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
                            v2 /*: any*/,
                            v5 /*: any*/,
                            v3 /*: any*/,
                            v7 /*: any*/,
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
                              selections: [v2 /*: any*/, v8 /*: any*/],
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
                                v4 /*: any*/,
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
                                        v2 /*: any*/,
                                        {
                                          alias: null,
                                          args: null,
                                          concreteType: 'Profile',
                                          kind: 'LinkedField',
                                          name: 'profile',
                                          plural: false,
                                          selections: [
                                            v2 /*: any*/,
                                            v5 /*: any*/,
                                            v9 /*: any*/,
                                            v7 /*: any*/,
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
                              args: v10 /*: any*/,
                              concreteType: 'MessageConnection',
                              kind: 'LinkedField',
                              name: 'allMessages',
                              plural: false,
                              selections: [
                                v4 /*: any*/,
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
                                        v8 /*: any*/,
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
                                        v5 /*: any*/,
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
      ],
    },
    params: {
      cacheID: 'a300524a7d6b366a4ddef0f8e692e2a5',
      id: null,
      metadata: {},
      name: 'useMessageCountUpdateSubscription',
      operationKind: 'subscription',
      text: 'subscription useMessageCountUpdateSubscription(\n  $profileId: ID!\n) {\n  chatRoomOnMessagesCountUpdate(profileId: $profileId) {\n    profile {\n      id\n      unreadMessagesCount\n      chatRooms {\n        totalCount\n        edges {\n          node {\n            id\n            __typename\n            unreadMessagesCount\n            ...RoomFragment\n          }\n        }\n      }\n    }\n  }\n}\n\nfragment MessageItemFragment on Message {\n  id\n  content\n  created\n  extraData\n  inReplyTo {\n    id\n  }\n  isRead\n  pk\n  profile {\n    id\n  }\n  verb\n}\n\nfragment MessagesListFragment on ChatRoom {\n  id\n  participants {\n    totalCount\n  }\n  unreadMessagesCount\n  allMessages(first: 20) {\n    totalCount\n    edges {\n      node {\n        id\n        created\n        profile {\n          id\n          name\n          image(height: 32, width: 32) {\n            url\n          }\n        }\n        isRead\n        ...MessageItemFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n\nfragment RoomFragment on ChatRoom {\n  id\n  unreadMessagesCount\n  image(width: 100, height: 100) {\n    url\n  }\n  lastMessageTime\n  lastMessage {\n    id\n    content\n  }\n  title\n  participants {\n    totalCount\n    edges {\n      node {\n        id\n        profile {\n          id\n          __typename\n          name\n          image(width: 100, height: 100) {\n            url\n          }\n        }\n      }\n    }\n  }\n  ...MessagesListFragment\n}\n',
    },
  }
})()

;(node as any).hash = 'e23433aa9b2d395b7154b98e1503417f'

export default node
