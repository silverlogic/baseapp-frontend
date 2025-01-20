/**
 * @generated SignedSource<<13703386b1a0dc3c0c167df73f3cc551>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ConcreteRequest, Mutation } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type ChatRoomEditMessageInput = {
  clientMutationId?: string | null | undefined
  content: string
  id: string
}
export type MessageUpdateMutation$variables = {
  input: ChatRoomEditMessageInput
}
export type MessageUpdateMutation$data = {
  readonly chatRoomEditMessage:
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
        readonly message:
          | {
              readonly node:
                | {
                    readonly content: string | null | undefined
                    readonly id: string
                    readonly ' $fragmentSpreads': FragmentRefs<'MessageItemFragment'>
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
export type MessageUpdateMutation = {
  response: MessageUpdateMutation$data
  variables: MessageUpdateMutation$variables
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
        kind: 'Variable',
        name: 'input',
        variableName: 'input',
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
      name: 'content',
      storageKey: null,
    },
    v4 = {
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
    v5 = [v2 /*: any*/]
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Fragment',
      metadata: null,
      name: 'MessageUpdateMutation',
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: 'ChatRoomEditMessagePayload',
          kind: 'LinkedField',
          name: 'chatRoomEditMessage',
          plural: false,
          selections: [
            {
              alias: null,
              args: null,
              concreteType: 'MessageEdge',
              kind: 'LinkedField',
              name: 'message',
              plural: false,
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
                    v3 /*: any*/,
                    {
                      args: null,
                      kind: 'FragmentSpread',
                      name: 'MessageItemFragment',
                    },
                  ],
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
            v4 /*: any*/,
          ],
          storageKey: null,
        },
      ],
      type: 'Mutation',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Operation',
      name: 'MessageUpdateMutation',
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: 'ChatRoomEditMessagePayload',
          kind: 'LinkedField',
          name: 'chatRoomEditMessage',
          plural: false,
          selections: [
            {
              alias: null,
              args: null,
              concreteType: 'MessageEdge',
              kind: 'LinkedField',
              name: 'message',
              plural: false,
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
                      selections: v5 /*: any*/,
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      kind: 'ScalarField',
                      name: 'isRead',
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
                      concreteType: 'Profile',
                      kind: 'LinkedField',
                      name: 'profile',
                      plural: false,
                      selections: v5 /*: any*/,
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      kind: 'ScalarField',
                      name: 'verb',
                      storageKey: null,
                    },
                  ],
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
            v4 /*: any*/,
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: 'f9b41a8750ea7be70eae5f1bccf57cbd',
      id: null,
      metadata: {},
      name: 'MessageUpdateMutation',
      operationKind: 'mutation',
      text: 'mutation MessageUpdateMutation(\n  $input: ChatRoomEditMessageInput!\n) {\n  chatRoomEditMessage(input: $input) {\n    message {\n      node {\n        id\n        content\n        ...MessageItemFragment\n      }\n    }\n    errors {\n      field\n      messages\n    }\n  }\n}\n\nfragment MessageItemFragment on Message {\n  id\n  content\n  created\n  extraData\n  inReplyTo {\n    id\n  }\n  isRead\n  pk\n  profile {\n    id\n  }\n  verb\n}\n',
    },
  }
})()

;(node as any).hash = 'b118f4853919251adbfb8bcdbf909ca5'

export default node
