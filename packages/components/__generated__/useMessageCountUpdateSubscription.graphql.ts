/**
 * @generated SignedSource<<f084cb14d72086688c6f9d22f5caaf82>>
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
                                readonly unreadMessagesCount: number | null | undefined
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
    v2 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'unreadMessagesCount',
      storageKey: null,
    },
    v3 = [
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
              v2 /*: any*/,
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
                          v2 /*: any*/,
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
      selections: v3 /*: any*/,
      type: 'Subscription',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Operation',
      name: 'useMessageCountUpdateSubscription',
      selections: v3 /*: any*/,
    },
    params: {
      cacheID: '1eced1843420ed0b61b7d8845effc2ae',
      id: null,
      metadata: {},
      name: 'useMessageCountUpdateSubscription',
      operationKind: 'subscription',
      text: 'subscription useMessageCountUpdateSubscription(\n  $profileId: ID!\n) {\n  chatRoomOnMessagesCountUpdate(profileId: $profileId) {\n    profile {\n      id\n      unreadMessagesCount\n      chatRooms {\n        totalCount\n        edges {\n          node {\n            id\n            unreadMessagesCount\n            allMessages {\n              edges {\n                node {\n                  id\n                  isRead\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}\n',
    },
  }
})()

;(node as any).hash = '89bba0acb4fe5156ef22a5201005474a'

export default node
