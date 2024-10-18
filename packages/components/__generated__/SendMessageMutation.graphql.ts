/**
 * @generated SignedSource<<3c5159ec498498e39327d88a08880033>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ConcreteRequest, Mutation } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type ChatRoomSendMessageInput = {
  clientMutationId?: string | null | undefined
  content: string
  inReplyToId?: string | null | undefined
  profileId: string
  roomId: string
}
export type SendMessageMutation$variables = {
  connections: ReadonlyArray<string>
  input: ChatRoomSendMessageInput
}
export type SendMessageMutation$data = {
  readonly chatRoomSendMessage:
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
export type SendMessageMutation = {
  response: SendMessageMutation$data
  variables: SendMessageMutation$variables
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
      name: 'input',
    },
    v2 = [
      {
        kind: 'Variable',
        name: 'input',
        variableName: 'input',
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
    }
  return {
    fragment: {
      argumentDefinitions: [v0 /*: any*/, v1 /*: any*/],
      kind: 'Fragment',
      metadata: null,
      name: 'SendMessageMutation',
      selections: [
        {
          alias: null,
          args: v2 /*: any*/,
          concreteType: 'ChatRoomSendMessagePayload',
          kind: 'LinkedField',
          name: 'chatRoomSendMessage',
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
      argumentDefinitions: [v1 /*: any*/, v0 /*: any*/],
      kind: 'Operation',
      name: 'SendMessageMutation',
      selections: [
        {
          alias: null,
          args: v2 /*: any*/,
          concreteType: 'ChatRoomSendMessagePayload',
          kind: 'LinkedField',
          name: 'chatRoomSendMessage',
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
                    v3 /*: any*/,
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
                      name: 'content',
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
                      name: 'created',
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
              filters: null,
              handle: 'prependEdge',
              key: '',
              kind: 'LinkedHandle',
              name: 'message',
              handleArgs: [
                {
                  kind: 'Variable',
                  name: 'connections',
                  variableName: 'connections',
                },
              ],
            },
            v4 /*: any*/,
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: '2d701e1c799355ad8305f593fa42a5f6',
      id: null,
      metadata: {},
      name: 'SendMessageMutation',
      operationKind: 'mutation',
      text: 'mutation SendMessageMutation(\n  $input: ChatRoomSendMessageInput!\n) {\n  chatRoomSendMessage(input: $input) {\n    message {\n      node {\n        id\n        ...MessageItemFragment\n      }\n    }\n    errors {\n      field\n      messages\n    }\n  }\n}\n\nfragment MessageItemFragment on Message {\n  id\n  inReplyTo {\n    id\n  }\n  content\n  pk\n  created\n}\n',
    },
  }
})()

;(node as any).hash = '7fd0124ce48b9ceff7e9bf2091d0709e'

export default node
