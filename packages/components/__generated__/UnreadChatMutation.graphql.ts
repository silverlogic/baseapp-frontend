/**
 * @generated SignedSource<<02b8381612f47b357400105930f18b82>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ConcreteRequest, Mutation } from 'relay-runtime'

export type ChatRoomUnreadInput = {
  clientMutationId?: string | null | undefined
  profileId: string
  roomId: string
}
export type UnreadChatMutation$variables = {
  input: ChatRoomUnreadInput
}
export type UnreadChatMutation$data = {
  readonly chatRoomUnread:
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
}
export type UnreadChatMutation = {
  response: UnreadChatMutation$data
  variables: UnreadChatMutation$variables
}

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        defaultValue: null,
        kind: 'LocalArgument',
        name: 'input',
      },
    ],
    v1 = [
      {
        alias: null,
        args: [
          {
            kind: 'Variable',
            name: 'input',
            variableName: 'input',
          },
        ],
        concreteType: 'ChatRoomUnreadPayload',
        kind: 'LinkedField',
        name: 'chatRoomUnread',
        plural: false,
        selections: [
          {
            alias: null,
            args: null,
            concreteType: 'ChatRoom',
            kind: 'LinkedField',
            name: 'room',
            plural: false,
            selections: [
              {
                alias: null,
                args: null,
                kind: 'ScalarField',
                name: 'id',
                storageKey: null,
              },
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
      name: 'UnreadChatMutation',
      selections: v1 /*: any*/,
      type: 'Mutation',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Operation',
      name: 'UnreadChatMutation',
      selections: v1 /*: any*/,
    },
    params: {
      cacheID: '4d9724bd26bcdedc2cc87395d6e1d138',
      id: null,
      metadata: {},
      name: 'UnreadChatMutation',
      operationKind: 'mutation',
      text: 'mutation UnreadChatMutation(\n  $input: ChatRoomUnreadInput!\n) {\n  chatRoomUnread(input: $input) {\n    room {\n      id\n      unreadMessages {\n        count\n        markedUnread\n      }\n    }\n    errors {\n      field\n      messages\n    }\n  }\n}\n',
    },
  }
})()

;(node as any).hash = '82a5073d544e44997f36bec7b9547edc'

export default node
