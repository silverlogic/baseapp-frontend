/**
 * @generated SignedSource<<a2f4331e38ec781c687362dea7018395>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime'

export type useRoomListSubscription$variables = {
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
                    readonly participants:
                      | {
                          readonly edges: ReadonlyArray<
                            | {
                                readonly node:
                                  | {
                                      readonly id: string
                                      readonly profile:
                                        | {
                                            readonly id: string
                                            readonly image:
                                              | {
                                                  readonly url: string
                                                }
                                              | null
                                              | undefined
                                            readonly name: string | null | undefined
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
                    readonly unreadMessagesCount: number | null | undefined
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
    v3 = [
      {
        alias: null,
        args: v1 /*: any*/,
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
                  v2 /*: any*/,
                  {
                    alias: null,
                    args: v1 /*: any*/,
                    kind: 'ScalarField',
                    name: 'unreadMessagesCount',
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
                        kind: 'ScalarField',
                        name: 'totalCount',
                        storageKey: null,
                      },
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
                                    selections: [
                                      {
                                        alias: null,
                                        args: null,
                                        kind: 'ScalarField',
                                        name: 'url',
                                        storageKey: null,
                                      },
                                    ],
                                    storageKey: 'image(height:100,width:100)',
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
      name: 'useRoomListSubscription',
      selections: v3 /*: any*/,
      type: 'Subscription',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Operation',
      name: 'useRoomListSubscription',
      selections: v3 /*: any*/,
    },
    params: {
      cacheID: 'dac3049317997dc691ed9dab91bf01d7',
      id: null,
      metadata: {},
      name: 'useRoomListSubscription',
      operationKind: 'subscription',
      text: 'subscription useRoomListSubscription(\n  $profileId: ID!\n) {\n  chatRoomOnRoomUpdate(profileId: $profileId) {\n    room {\n      node {\n        id\n        unreadMessagesCount(profileId: $profileId)\n        participants {\n          totalCount\n          edges {\n            node {\n              id\n              profile {\n                id\n                name\n                image(width: 100, height: 100) {\n                  url\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}\n',
    },
  }
})()

;(node as any).hash = 'd8272abb91ea52f3b85b72d4efb2a6a8'

export default node
