/**
 * @generated SignedSource<<a4f3f90ec5364339278ecee62c6282f3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ConcreteRequest, Mutation } from 'relay-runtime'

export type NotificationsMarkAllAsReadInput = {
  clientMutationId?: string | null | undefined
  read: boolean
}
export type NotificationsMarkAllAsReadMutation$variables = {
  input: NotificationsMarkAllAsReadInput
}
export type NotificationsMarkAllAsReadMutation$data = {
  readonly notificationsMarkAllAsRead:
    | {
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
export type NotificationsMarkAllAsReadMutation = {
  response: NotificationsMarkAllAsReadMutation$data
  variables: NotificationsMarkAllAsReadMutation$variables
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
    }
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Fragment',
      metadata: null,
      name: 'NotificationsMarkAllAsReadMutation',
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: 'NotificationsMarkAllAsReadPayload',
          kind: 'LinkedField',
          name: 'notificationsMarkAllAsRead',
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
      name: 'NotificationsMarkAllAsReadMutation',
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: 'NotificationsMarkAllAsReadPayload',
          kind: 'LinkedField',
          name: 'notificationsMarkAllAsRead',
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
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: 'a11d630beface00eb5af3e151d4990b0',
      id: null,
      metadata: {},
      name: 'NotificationsMarkAllAsReadMutation',
      operationKind: 'mutation',
      text: 'mutation NotificationsMarkAllAsReadMutation(\n  $input: NotificationsMarkAllAsReadInput!\n) {\n  notificationsMarkAllAsRead(input: $input) {\n    recipient {\n      __typename\n      id\n      notificationsUnreadCount\n    }\n  }\n}\n',
    },
  }
})()

;(node as any).hash = 'e279aaf7402cac25fd7acbce4f1b9504'

export default node
