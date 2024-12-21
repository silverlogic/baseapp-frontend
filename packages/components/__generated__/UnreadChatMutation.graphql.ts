/**
 * @generated SignedSource<<5aa83cdec1d1f95ae9653aaf4fe87d36>>
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
                    readonly count: number
                    readonly markedUnread: boolean
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
      name: 'count',
      storageKey: null,
    },
    v4 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'markedUnread',
      storageKey: null,
    },
    v5 = {
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
      argumentDefinitions: v0 /*: any*/,
      kind: 'Fragment',
      metadata: null,
      name: 'UnreadChatMutation',
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
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
                v2 /*: any*/,
                {
                  alias: null,
                  args: null,
                  concreteType: 'UnreadMessageCount',
                  kind: 'LinkedField',
                  name: 'unreadMessages',
                  plural: false,
                  selections: [v3 /*: any*/, v4 /*: any*/],
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
            v5 /*: any*/,
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
      name: 'UnreadChatMutation',
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
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
                v2 /*: any*/,
                {
                  alias: null,
                  args: null,
                  concreteType: 'UnreadMessageCount',
                  kind: 'LinkedField',
                  name: 'unreadMessages',
                  plural: false,
                  selections: [v3 /*: any*/, v4 /*: any*/, v2 /*: any*/],
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
            v5 /*: any*/,
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: 'a95fee2710fb461b830252379ad489f5',
      id: null,
      metadata: {},
      name: 'UnreadChatMutation',
      operationKind: 'mutation',
      text: 'mutation UnreadChatMutation(\n  $input: ChatRoomUnreadInput!\n) {\n  chatRoomUnread(input: $input) {\n    room {\n      id\n      unreadMessages {\n        count\n        markedUnread\n        id\n      }\n    }\n    errors {\n      field\n      messages\n    }\n  }\n}\n',
    },
  }
})()

;(node as any).hash = '82a5073d544e44997f36bec7b9547edc'

export default node
