/**
 * @generated SignedSource<<df0e6774f0f32a894e8d0ec2f6a25314>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ConcreteRequest, Query } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type notificationsListRefetchable$variables = {
  count?: number | null | undefined
  cursor?: string | null | undefined
  id: string
  verbs?: string | null | undefined
}
export type notificationsListRefetchable$data = {
  readonly node:
    | {
        readonly ' $fragmentSpreads': FragmentRefs<'NotificationsListFragment'>
      }
    | null
    | undefined
}
export type notificationsListRefetchable = {
  response: notificationsListRefetchable$data
  variables: notificationsListRefetchable$variables
}

const node: ConcreteRequest = (function () {
  var v0 = {
      defaultValue: 10,
      kind: 'LocalArgument',
      name: 'count',
    },
    v1 = {
      defaultValue: null,
      kind: 'LocalArgument',
      name: 'cursor',
    },
    v2 = {
      defaultValue: null,
      kind: 'LocalArgument',
      name: 'id',
    },
    v3 = {
      defaultValue: null,
      kind: 'LocalArgument',
      name: 'verbs',
    },
    v4 = [
      {
        kind: 'Variable',
        name: 'id',
        variableName: 'id',
      },
    ],
    v5 = {
      kind: 'Variable',
      name: 'verbs',
      variableName: 'verbs',
    },
    v6 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: '__typename',
      storageKey: null,
    },
    v7 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'id',
      storageKey: null,
    },
    v8 = [
      {
        kind: 'Variable',
        name: 'after',
        variableName: 'cursor',
      },
      {
        kind: 'Variable',
        name: 'first',
        variableName: 'count',
      },
      v5 /*: any*/,
    ]
  return {
    fragment: {
      argumentDefinitions: [v0 /*: any*/, v1 /*: any*/, v2 /*: any*/, v3 /*: any*/],
      kind: 'Fragment',
      metadata: null,
      name: 'notificationsListRefetchable',
      selections: [
        {
          alias: null,
          args: v4 /*: any*/,
          concreteType: null,
          kind: 'LinkedField',
          name: 'node',
          plural: false,
          selections: [
            {
              args: [
                {
                  kind: 'Variable',
                  name: 'count',
                  variableName: 'count',
                },
                {
                  kind: 'Variable',
                  name: 'cursor',
                  variableName: 'cursor',
                },
                v5 /*: any*/,
              ],
              kind: 'FragmentSpread',
              name: 'NotificationsListFragment',
            },
          ],
          storageKey: null,
        },
      ],
      type: 'Query',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: [v0 /*: any*/, v1 /*: any*/, v3 /*: any*/, v2 /*: any*/],
      kind: 'Operation',
      name: 'notificationsListRefetchable',
      selections: [
        {
          alias: null,
          args: v4 /*: any*/,
          concreteType: null,
          kind: 'LinkedField',
          name: 'node',
          plural: false,
          selections: [
            v6 /*: any*/,
            v7 /*: any*/,
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
                {
                  alias: null,
                  args: v8 /*: any*/,
                  concreteType: 'NotificationConnection',
                  kind: 'LinkedField',
                  name: 'notifications',
                  plural: false,
                  selections: [
                    {
                      alias: null,
                      args: null,
                      concreteType: 'NotificationEdge',
                      kind: 'LinkedField',
                      name: 'edges',
                      plural: true,
                      selections: [
                        {
                          alias: null,
                          args: null,
                          kind: 'ScalarField',
                          name: 'cursor',
                          storageKey: null,
                        },
                        {
                          alias: null,
                          args: null,
                          concreteType: 'Notification',
                          kind: 'LinkedField',
                          name: 'node',
                          plural: false,
                          selections: [
                            v7 /*: any*/,
                            {
                              alias: null,
                              args: null,
                              kind: 'ScalarField',
                              name: 'unread',
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
                              name: 'timestamp',
                              storageKey: null,
                            },
                            {
                              alias: null,
                              args: null,
                              kind: 'ScalarField',
                              name: 'level',
                              storageKey: null,
                            },
                            {
                              alias: null,
                              args: null,
                              kind: 'ScalarField',
                              name: 'verb',
                              storageKey: null,
                            },
                            {
                              alias: null,
                              args: null,
                              kind: 'ScalarField',
                              name: 'description',
                              storageKey: null,
                            },
                            {
                              alias: null,
                              args: null,
                              kind: 'ScalarField',
                              name: 'data',
                              storageKey: null,
                            },
                            {
                              alias: null,
                              args: null,
                              concreteType: null,
                              kind: 'LinkedField',
                              name: 'actor',
                              plural: false,
                              selections: [
                                v6 /*: any*/,
                                v7 /*: any*/,
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
                            {
                              alias: null,
                              args: null,
                              concreteType: null,
                              kind: 'LinkedField',
                              name: 'target',
                              plural: false,
                              selections: [v7 /*: any*/, v6 /*: any*/],
                              storageKey: null,
                            },
                            {
                              alias: null,
                              args: null,
                              concreteType: null,
                              kind: 'LinkedField',
                              name: 'actionObject',
                              plural: false,
                              selections: [
                                v7 /*: any*/,
                                v6 /*: any*/,
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
                            },
                            v6 /*: any*/,
                          ],
                          storageKey: null,
                        },
                      ],
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      concreteType: 'PageInfo',
                      kind: 'LinkedField',
                      name: 'pageInfo',
                      plural: false,
                      selections: [
                        {
                          alias: null,
                          args: null,
                          kind: 'ScalarField',
                          name: 'hasNextPage',
                          storageKey: null,
                        },
                        {
                          alias: null,
                          args: null,
                          kind: 'ScalarField',
                          name: 'endCursor',
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
                  args: v8 /*: any*/,
                  filters: ['verbs'],
                  handle: 'connection',
                  key: 'user_notifications',
                  kind: 'LinkedHandle',
                  name: 'notifications',
                },
              ],
              type: 'User',
              abstractKey: null,
            },
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: '1d0d65a5d3faca2600fadfad0e062e85',
      id: null,
      metadata: {},
      name: 'notificationsListRefetchable',
      operationKind: 'query',
      text: 'query notificationsListRefetchable(\n  $count: Int = 10\n  $cursor: String\n  $verbs: String\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...NotificationsListFragment_LXqp7\n    id\n  }\n}\n\nfragment NotificationItemFragment on Notification {\n  id\n  pk\n  unread\n  timestamp\n  level\n  verb\n  description\n  data\n  actor {\n    __typename\n    id\n    ... on User {\n      avatar(width: 48, height: 48) {\n        url\n      }\n      firstName\n      lastName\n    }\n  }\n  target {\n    id\n    __typename\n  }\n  actionObject {\n    id\n    __typename\n    ... on Comment {\n      id\n      body\n    }\n  }\n}\n\nfragment NotificationsListFragment_LXqp7 on User {\n  id\n  notificationsUnreadCount\n  notifications(first: $count, after: $cursor, verbs: $verbs) {\n    edges {\n      cursor\n      node {\n        id\n        unread\n        ...NotificationItemFragment\n        __typename\n      }\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n',
    },
  }
})()

;(node as any).hash = 'a6a3cbaf1db8c4d17187ab6631bf2764'

export default node
