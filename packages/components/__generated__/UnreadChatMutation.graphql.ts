/**
 * @generated SignedSource<<f3c79191ebfebbde0933c64f098645a7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ConcreteRequest, Mutation } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

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
              readonly ' $fragmentSpreads': FragmentRefs<'UnreadMessagesCountFragment'>
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
                  args: null,
                  kind: 'FragmentSpread',
                  name: 'UnreadMessagesCountFragment',
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
                    v2 /*: any*/,
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
      cacheID: 'b5c9682f04c174e181c522db06feb0a5',
      id: null,
      metadata: {},
      name: 'UnreadChatMutation',
      operationKind: 'mutation',
      text: 'mutation UnreadChatMutation(\n  $input: ChatRoomUnreadInput!\n) {\n  chatRoomUnread(input: $input) {\n    room {\n      id\n      ...UnreadMessagesCountFragment\n    }\n    errors {\n      field\n      messages\n    }\n  }\n}\n\nfragment UnreadMessagesCountFragment on ChatRoom {\n  id\n  unreadMessages {\n    count\n    markedUnread\n    id\n  }\n}\n',
    },
  }
})()

;(node as any).hash = 'fb95629ed4c89ffb9689a72b91d6cefa'

export default node
