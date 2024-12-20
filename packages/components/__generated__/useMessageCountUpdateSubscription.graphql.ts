/**
 * @generated SignedSource<<f2072ee2d74a13c850320cbc07ff184e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime'

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
                                readonly allMessages:
                                  | {
                                      readonly edges: ReadonlyArray<
                                        | {
                                            readonly node:
                                              | {
                                                  readonly id: string
                                                  readonly isRead: boolean | null | undefined
                                                }
                                              | null
                                              | undefined
                                          }
                                        | null
                                        | undefined
                                      >
                                    }
                                  | null
                                  | undefined
                                readonly id: string
                                readonly unreadMessages:
                                  | {
                                      readonly count: number | null | undefined
                                      readonly markedUnread: boolean | null | undefined
                                    }
                                  | null
                                  | undefined
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
    v1 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'id',
      storageKey: null,
    },
    v2 = [
      {
        alias: null,
        args: [
          {
            kind: 'Variable',
            name: 'profileId',
            variableName: 'profileId',
          },
        ],
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
              v1 /*: any*/,
              {
                alias: null,
                args: null,
                kind: 'ScalarField',
                name: 'unreadMessagesCount',
                storageKey: null,
              },
              {
                alias: null,
                args: null,
                concreteType: 'ChatRoomConnection',
                kind: 'LinkedField',
                name: 'chatRooms',
                plural: false,
                selections: [
                  {
                    alias: null,
                    args: null,
                    kind: 'ScalarField',
                    name: 'totalCount',
                    storageKey: null,
                  },
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
                          v1 /*: any*/,
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
                            concreteType: 'MessageConnection',
                            kind: 'LinkedField',
                            name: 'allMessages',
                            plural: false,
                            selections: [
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
                                      v1 /*: any*/,
                                      {
                                        alias: null,
                                        args: null,
                                        kind: 'ScalarField',
                                        name: 'isRead',
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
    ]
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Fragment',
      metadata: null,
      name: 'useMessageCountUpdateSubscription',
      selections: v2 /*: any*/,
      type: 'Subscription',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Operation',
      name: 'useMessageCountUpdateSubscription',
      selections: v2 /*: any*/,
    },
    params: {
      cacheID: '14333857437b14661f927afc905ac42f',
      id: null,
      metadata: {},
      name: 'useMessageCountUpdateSubscription',
      operationKind: 'subscription',
      text: 'subscription useMessageCountUpdateSubscription(\n  $profileId: ID!\n) {\n  chatRoomOnMessagesCountUpdate(profileId: $profileId) {\n    profile {\n      id\n      unreadMessagesCount\n      chatRooms {\n        totalCount\n        edges {\n          node {\n            id\n            unreadMessages {\n              count\n              markedUnread\n            }\n            allMessages {\n              edges {\n                node {\n                  id\n                  isRead\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}\n',
    },
  }
})()

;(node as any).hash = '732b81c0387021db798a893ce5a6c449'

export default node
