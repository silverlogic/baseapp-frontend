/**
 * @generated SignedSource<<80b9f00795a6e46b6a523659be326c47>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ConcreteRequest, Mutation } from 'relay-runtime'

export type ChatRoomCreateInput = {
  clientMutationId?: string | null | undefined
  participants: ReadonlyArray<string | null | undefined>
  profileId: string
}
export type CreateChatRoomMutation$variables = {
  input: ChatRoomCreateInput
}
export type CreateChatRoomMutation$data = {
  readonly chatRoomCreate:
    | {
        readonly errors:
          | ReadonlyArray<
              | {
                  readonly field: string
                  readonly messages: ReadonlyArray<string>
                }
              | null
              | undefined
            >
          | null
          | undefined
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
export type CreateChatRoomMutation = {
  response: CreateChatRoomMutation$data
  variables: CreateChatRoomMutation$variables
}

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        defaultValue: null,
        kind: 'LocalArgument',
        name: 'input',
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
            name: 'input',
            variableName: 'input',
          },
        ],
        concreteType: 'ChatRoomCreatePayload',
        kind: 'LinkedField',
        name: 'chatRoomCreate',
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
                  v1 /*: any*/,
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
                            selections: [v1 /*: any*/],
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
          {
            alias: null,
            args: null,
            concreteType: 'ErrorType',
            kind: 'LinkedField',
            name: 'errors',
            plural: true,
            selections: [
              {
                alias: null,
                args: null,
                kind: 'ScalarField',
                name: 'field',
                storageKey: null,
              },
              {
                alias: null,
                args: null,
                kind: 'ScalarField',
                name: 'messages',
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
      name: 'CreateChatRoomMutation',
      selections: v2 /*: any*/,
      type: 'Mutation',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Operation',
      name: 'CreateChatRoomMutation',
      selections: v2 /*: any*/,
    },
    params: {
      cacheID: 'db74448ff08cffbba38c4f8939cb863f',
      id: null,
      metadata: {},
      name: 'CreateChatRoomMutation',
      operationKind: 'mutation',
      text: 'mutation CreateChatRoomMutation(\n  $input: ChatRoomCreateInput!\n) {\n  chatRoomCreate(input: $input) {\n    room {\n      node {\n        id\n        participants {\n          edges {\n            node {\n              id\n            }\n          }\n        }\n      }\n    }\n    errors {\n      field\n      messages\n    }\n  }\n}\n',
    },
  }
})()

;(node as any).hash = '7e43714ac9912309528928e478db1bd2'

export default node
