/**
 * @generated SignedSource<<95c8a7f03531267e7c8ce1c80f13d30c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ConcreteRequest, Mutation } from 'relay-runtime'

export type ChatRoomCreateInput = {
  clientMutationId?: string | null | undefined
  isGroup?: boolean | null | undefined
  participants: ReadonlyArray<string | null | undefined>
  profileId: string
  title?: string | null | undefined
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
                    readonly image:
                      | {
                          readonly url: string
                        }
                      | null
                      | undefined
                    readonly isGroup: boolean
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
                    readonly title: string | null | undefined
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
                    kind: 'ScalarField',
                    name: 'isGroup',
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
                    selections: [
                      {
                        alias: null,
                        args: null,
                        kind: 'ScalarField',
                        name: 'url',
                        storageKey: null,
                      },
                    ],
                    storageKey: 'image(height:144,width:144)',
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
      cacheID: 'd8d24898ea619cfb15ef2a1419b1a422',
      id: null,
      metadata: {},
      name: 'CreateChatRoomMutation',
      operationKind: 'mutation',
      text: 'mutation CreateChatRoomMutation(\n  $input: ChatRoomCreateInput!\n) {\n  chatRoomCreate(input: $input) {\n    room {\n      node {\n        id\n        isGroup\n        title\n        image(width: 144, height: 144) {\n          url\n        }\n        participants {\n          edges {\n            node {\n              id\n            }\n          }\n        }\n      }\n    }\n    errors {\n      field\n      messages\n    }\n  }\n}\n',
    },
  }
})()

;(node as any).hash = 'f6345ccafee3018b2d5680676d1cdd8c'

export default node
