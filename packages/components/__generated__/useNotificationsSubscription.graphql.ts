/**
 * @generated SignedSource<<727988726efe06e4d4f506a40447bf11>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type useNotificationsSubscription$variables = {
  connections: ReadonlyArray<string>
}
export type useNotificationsSubscription$data = {
  readonly onNotificationChange:
    | {
        readonly createdNotification:
          | {
              readonly node:
                | {
                    readonly recipient: {
                      readonly id: string
                      readonly ' $fragmentSpreads': FragmentRefs<'NotificationUserMenuFragment'>
                    }
                    readonly ' $fragmentSpreads': FragmentRefs<'NotificationItemFragment'>
                  }
                | null
                | undefined
            }
          | null
          | undefined
        readonly deletedNotificationId: string | null | undefined
        readonly updatedNotification:
          | {
              readonly id: string
              readonly ' $fragmentSpreads': FragmentRefs<'NotificationItemFragment'>
            }
          | null
          | undefined
      }
    | null
    | undefined
}
export type useNotificationsSubscription = {
  response: useNotificationsSubscription$data
  variables: useNotificationsSubscription$variables
}

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        defaultValue: null,
        kind: 'LocalArgument',
        name: 'connections',
      },
    ],
    v1 = {
      args: null,
      kind: 'FragmentSpread',
      name: 'NotificationItemFragment',
    },
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
      name: 'deletedNotificationId',
      storageKey: null,
    },
    v4 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'pk',
      storageKey: null,
    },
    v5 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'unread',
      storageKey: null,
    },
    v6 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'timestamp',
      storageKey: null,
    },
    v7 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'level',
      storageKey: null,
    },
    v8 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'verb',
      storageKey: null,
    },
    v9 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'description',
      storageKey: null,
    },
    v10 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'data',
      storageKey: null,
    },
    v11 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: '__typename',
      storageKey: null,
    },
    v12 = {
      alias: null,
      args: null,
      concreteType: null,
      kind: 'LinkedField',
      name: 'actor',
      plural: false,
      selections: [
        v11 /*: any*/,
        v2 /*: any*/,
        {
          kind: 'InlineFragment',
          selections: [
            {
              alias: null,
              args: [
                {
                  kind: 'Literal',
                  name: 'height',
                  value: 48,
                },
                {
                  kind: 'Literal',
                  name: 'width',
                  value: 48,
                },
              ],
              concreteType: 'File',
              kind: 'LinkedField',
              name: 'avatar',
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
              storageKey: 'avatar(height:48,width:48)',
            },
            {
              alias: null,
              args: null,
              kind: 'ScalarField',
              name: 'firstName',
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: 'ScalarField',
              name: 'lastName',
              storageKey: null,
            },
          ],
          type: 'User',
          abstractKey: null,
        },
      ],
      storageKey: null,
    },
    v13 = {
      alias: null,
      args: null,
      concreteType: null,
      kind: 'LinkedField',
      name: 'target',
      plural: false,
      selections: [v2 /*: any*/, v11 /*: any*/],
      storageKey: null,
    },
    v14 = {
      alias: null,
      args: null,
      concreteType: null,
      kind: 'LinkedField',
      name: 'actionObject',
      plural: false,
      selections: [
        v2 /*: any*/,
        v11 /*: any*/,
        {
          kind: 'InlineFragment',
          selections: [
            {
              alias: null,
              args: null,
              kind: 'ScalarField',
              name: 'body',
              storageKey: null,
            },
          ],
          type: 'Comment',
          abstractKey: null,
        },
      ],
      storageKey: null,
    }
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Fragment',
      metadata: null,
      name: 'useNotificationsSubscription',
      selections: [
        {
          alias: null,
          args: null,
          concreteType: 'OnNotificationChange',
          kind: 'LinkedField',
          name: 'onNotificationChange',
          plural: false,
          selections: [
            {
              alias: null,
              args: null,
              concreteType: 'NotificationEdge',
              kind: 'LinkedField',
              name: 'createdNotification',
              plural: false,
              selections: [
                {
                  alias: null,
                  args: null,
                  concreteType: 'Notification',
                  kind: 'LinkedField',
                  name: 'node',
                  plural: false,
                  selections: [
                    v1 /*: any*/,
                    {
                      alias: null,
                      args: null,
                      concreteType: 'User',
                      kind: 'LinkedField',
                      name: 'recipient',
                      plural: false,
                      selections: [
                        v2 /*: any*/,
                        {
                          args: null,
                          kind: 'FragmentSpread',
                          name: 'NotificationUserMenuFragment',
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
              concreteType: 'Notification',
              kind: 'LinkedField',
              name: 'updatedNotification',
              plural: false,
              selections: [v2 /*: any*/, v1 /*: any*/],
              storageKey: null,
            },
            v3 /*: any*/,
          ],
          storageKey: null,
        },
      ],
      type: 'Subscription',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Operation',
      name: 'useNotificationsSubscription',
      selections: [
        {
          alias: null,
          args: null,
          concreteType: 'OnNotificationChange',
          kind: 'LinkedField',
          name: 'onNotificationChange',
          plural: false,
          selections: [
            {
              alias: null,
              args: null,
              concreteType: 'NotificationEdge',
              kind: 'LinkedField',
              name: 'createdNotification',
              plural: false,
              selections: [
                {
                  alias: null,
                  args: null,
                  concreteType: 'Notification',
                  kind: 'LinkedField',
                  name: 'node',
                  plural: false,
                  selections: [
                    v2 /*: any*/,
                    v4 /*: any*/,
                    v5 /*: any*/,
                    v6 /*: any*/,
                    v7 /*: any*/,
                    v8 /*: any*/,
                    v9 /*: any*/,
                    v10 /*: any*/,
                    v12 /*: any*/,
                    v13 /*: any*/,
                    v14 /*: any*/,
                    {
                      alias: null,
                      args: null,
                      concreteType: 'User',
                      kind: 'LinkedField',
                      name: 'recipient',
                      plural: false,
                      selections: [
                        v2 /*: any*/,
                        {
                          alias: null,
                          args: null,
                          kind: 'ScalarField',
                          name: 'notificationsUnreadCount',
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
              filters: null,
              handle: 'prependEdge',
              key: '',
              kind: 'LinkedHandle',
              name: 'createdNotification',
              handleArgs: [
                {
                  kind: 'Variable',
                  name: 'connections',
                  variableName: 'connections',
                },
              ],
            },
            {
              alias: null,
              args: null,
              concreteType: 'Notification',
              kind: 'LinkedField',
              name: 'updatedNotification',
              plural: false,
              selections: [
                v2 /*: any*/,
                v4 /*: any*/,
                v5 /*: any*/,
                v6 /*: any*/,
                v7 /*: any*/,
                v8 /*: any*/,
                v9 /*: any*/,
                v10 /*: any*/,
                v12 /*: any*/,
                v13 /*: any*/,
                v14 /*: any*/,
              ],
              storageKey: null,
            },
            v3 /*: any*/,
            {
              alias: null,
              args: null,
              filters: null,
              handle: 'deleteRecord',
              key: '',
              kind: 'ScalarHandle',
              name: 'deletedNotificationId',
            },
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: '81e0dfe4ff91c4834520f0ff12edefb5',
      id: null,
      metadata: {},
      name: 'useNotificationsSubscription',
      operationKind: 'subscription',
      text: 'subscription useNotificationsSubscription {\n  onNotificationChange {\n    createdNotification {\n      node {\n        ...NotificationItemFragment\n        recipient {\n          id\n          ...NotificationUserMenuFragment\n        }\n        id\n      }\n    }\n    updatedNotification {\n      id\n      ...NotificationItemFragment\n    }\n    deletedNotificationId\n  }\n}\n\nfragment NotificationItemFragment on Notification {\n  id\n  pk\n  unread\n  timestamp\n  level\n  verb\n  description\n  data\n  actor {\n    __typename\n    id\n    ... on User {\n      avatar(width: 48, height: 48) {\n        url\n      }\n      firstName\n      lastName\n    }\n  }\n  target {\n    id\n    __typename\n  }\n  actionObject {\n    id\n    __typename\n    ... on Comment {\n      id\n      body\n    }\n  }\n}\n\nfragment NotificationUserMenuFragment on User {\n  id\n  notificationsUnreadCount\n}\n',
    },
  }
})()

;(node as any).hash = '1bca63a0d3abbb5c3d3ca3fbfa6e7d37'

export default node
