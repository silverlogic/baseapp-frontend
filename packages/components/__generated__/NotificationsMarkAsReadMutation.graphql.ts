/**
 * @generated SignedSource<<6fa920771fe1f2348b09495ed550e086>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ConcreteRequest, Mutation } from 'relay-runtime'

export type NotificationsMarkAsReadInput = {
  clientMutationId?: string | null | undefined
  notificationIds?: ReadonlyArray<string> | null | undefined
  read: boolean
}
export type NotificationsMarkAsReadMutation$variables = {
  input: NotificationsMarkAsReadInput
}
export type NotificationsMarkAsReadMutation$data = {
  readonly notificationsMarkAsRead:
    | {
        readonly notifications:
          | ReadonlyArray<
              | {
                  readonly id: string
                  readonly unread: boolean
                }
              | null
              | undefined
            >
          | null
          | undefined
        readonly recipient:
          | {
              readonly id: string
              readonly notificationsUnreadCount: number | null | undefined
            }
          | null
          | undefined
      }
    | null
    | undefined
}
export type NotificationsMarkAsReadMutation = {
  response: NotificationsMarkAsReadMutation$data
  variables: NotificationsMarkAsReadMutation$variables
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
      name: 'notificationsUnreadCount',
      storageKey: null,
    },
    v4 = {
      alias: null,
      args: null,
      concreteType: 'Notification',
      kind: 'LinkedField',
      name: 'notifications',
      plural: true,
      selections: [
        v2 /*: any*/,
        {
          alias: null,
          args: null,
          kind: 'ScalarField',
          name: 'unread',
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
      name: 'NotificationsMarkAsReadMutation',
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: 'NotificationsMarkAsReadPayload',
          kind: 'LinkedField',
          name: 'notificationsMarkAsRead',
          plural: false,
          selections: [
            {
              alias: null,
              args: null,
              concreteType: null,
              kind: 'LinkedField',
              name: 'recipient',
              plural: false,
              selections: [v2 /*: any*/, v3 /*: any*/],
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
      name: 'NotificationsMarkAsReadMutation',
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: 'NotificationsMarkAsReadPayload',
          kind: 'LinkedField',
          name: 'notificationsMarkAsRead',
          plural: false,
          selections: [
            {
              alias: null,
              args: null,
              concreteType: null,
              kind: 'LinkedField',
              name: 'recipient',
              plural: false,
              selections: [
                {
                  alias: null,
                  args: null,
                  kind: 'ScalarField',
                  name: '__typename',
                  storageKey: null,
                },
                v2 /*: any*/,
                v3 /*: any*/,
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
      cacheID: '0698b685c49a59a3df4f281ad894f4e3',
      id: null,
      metadata: {},
      name: 'NotificationsMarkAsReadMutation',
      operationKind: 'mutation',
      text: 'mutation NotificationsMarkAsReadMutation(\n  $input: NotificationsMarkAsReadInput!\n) {\n  notificationsMarkAsRead(input: $input) {\n    recipient {\n      __typename\n      id\n      notificationsUnreadCount\n    }\n    notifications {\n      id\n      unread\n    }\n  }\n}\n',
    },
  }
})()

;(node as any).hash = '0cbe23296c6c313d6443121d9695dc09'

export default node
