/**
 * @generated SignedSource<<2019611df1126cfaea95f44b33087e85>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ConcreteRequest, Query } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type NotificationsPopoverWithQuery$variables = Record<PropertyKey, never>
export type NotificationsPopoverWithQuery$data = {
  readonly target:
    | {
        readonly ' $fragmentSpreads': FragmentRefs<'NotificationsPopoverFragment'>
      }
    | null
    | undefined
}
export type NotificationsPopoverWithQuery = {
  response: NotificationsPopoverWithQuery$data
  variables: NotificationsPopoverWithQuery$variables
}

const node: ConcreteRequest = (function () {
  var v0 = [
    {
      kind: 'Literal',
      name: 'id',
      value: 'test-id',
    },
  ]
  return {
    fragment: {
      argumentDefinitions: [],
      kind: 'Fragment',
      metadata: null,
      name: 'NotificationsPopoverWithQuery',
      selections: [
        {
          alias: 'target',
          args: v0 /*: any*/,
          concreteType: null,
          kind: 'LinkedField',
          name: 'node',
          plural: false,
          selections: [
            {
              args: null,
              kind: 'FragmentSpread',
              name: 'NotificationsPopoverFragment',
            },
          ],
          storageKey: 'node(id:"test-id")',
        },
      ],
      type: 'Query',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: [],
      kind: 'Operation',
      name: 'NotificationsPopoverWithQuery',
      selections: [
        {
          alias: 'target',
          args: v0 /*: any*/,
          concreteType: null,
          kind: 'LinkedField',
          name: 'node',
          plural: false,
          selections: [
            {
              alias: null,
              args: null,
              kind: 'ScalarField',
              name: '__typename',
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: 'ScalarField',
              name: 'id',
              storageKey: null,
            },
            {
              kind: 'InlineFragment',
              selections: [
                {
                  alias: null,
                  args: null,
                  kind: 'ScalarField',
                  name: 'notificationsUnreadCount',
                  storageKey: null,
                },
              ],
              type: 'User',
              abstractKey: null,
            },
          ],
          storageKey: 'node(id:"test-id")',
        },
      ],
    },
    params: {
      cacheID: 'd209f52a732e0b615d9d587c64ee7ba1',
      id: null,
      metadata: {
        relayTestingSelectionTypeInfo: {
          target: {
            enumValues: null,
            nullable: true,
            plural: false,
            type: 'Node',
          },
          'target.__typename': {
            enumValues: null,
            nullable: false,
            plural: false,
            type: 'String',
          },
          'target.id': {
            enumValues: null,
            nullable: false,
            plural: false,
            type: 'ID',
          },
          'target.notificationsUnreadCount': {
            enumValues: null,
            nullable: true,
            plural: false,
            type: 'Int',
          },
        },
      },
      name: 'NotificationsPopoverWithQuery',
      operationKind: 'query',
      text: 'query NotificationsPopoverWithQuery {\n  target: node(id: "test-id") {\n    __typename\n    ...NotificationsPopoverFragment\n    id\n  }\n}\n\nfragment NotificationUserMenuFragment on User {\n  id\n  notificationsUnreadCount\n}\n\nfragment NotificationsPopoverFragment on User {\n  ...NotificationUserMenuFragment\n}\n',
    },
  }
})()

;(node as any).hash = '2bc67125981d8f8d37483054ac8830f0'

export default node
