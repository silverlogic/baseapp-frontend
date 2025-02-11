/**
 * @generated SignedSource<<9909ff0e747bad882f24497a64e673d0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ConcreteRequest, Mutation } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type ChatRoomDeleteMessageInput = {
  clientMutationId?: string | null | undefined
  id: string
}
export type MessageDeleteMutation$variables = {
  input: ChatRoomDeleteMessageInput
}
export type MessageDeleteMutation$data = {
  readonly chatRoomDeleteMessage:
    | {
        readonly deletedMessage:
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
      }
    | null
    | undefined
}
export type MessageDeleteMutation = {
  response: MessageDeleteMutation$data
  variables: MessageDeleteMutation$variables
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
    v4 = [v2 /*: any*/]
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Fragment',
      metadata: null,
      name: 'MessageDeleteMutation',
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: 'ChatRoomDeleteMessagePayload',
          kind: 'LinkedField',
          name: 'chatRoomDeleteMessage',
          plural: false,
          selections: [
            {
              alias: null,
              args: null,
              concreteType: 'MessageEdge',
              kind: 'LinkedField',
              name: 'deletedMessage',
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
            v3 /*: any*/,
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
      name: 'MessageDeleteMutation',
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: 'ChatRoomDeleteMessagePayload',
          kind: 'LinkedField',
          name: 'chatRoomDeleteMessage',
          plural: false,
          selections: [
            {
              alias: null,
              args: null,
              concreteType: 'MessageEdge',
              kind: 'LinkedField',
              name: 'deletedMessage',
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
                      name: 'created',
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      kind: 'ScalarField',
                      name: 'deleted',
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
                      selections: v4 /*: any*/,
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
                      selections: v4 /*: any*/,
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
            v3 /*: any*/,
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: '57bd31ca9624f859028a3c854a98f61b',
      id: null,
      metadata: {},
      name: 'MessageDeleteMutation',
      operationKind: 'mutation',
      text: 'mutation MessageDeleteMutation(\n  $input: ChatRoomDeleteMessageInput!\n) {\n  chatRoomDeleteMessage(input: $input) {\n    deletedMessage {\n      node {\n        id\n        ...MessageItemFragment\n      }\n    }\n    errors {\n      field\n      messages\n    }\n  }\n}\n\nfragment MessageItemFragment on Message {\n  id\n  content\n  created\n  deleted\n  extraData\n  inReplyTo {\n    id\n  }\n  isRead\n  pk\n  profile {\n    id\n  }\n  verb\n}\n',
    },
  }
})()

;(node as any).hash = '38727c34bf606f192ca4718677e40962'

export default node
