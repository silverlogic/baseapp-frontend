/**
 * @generated SignedSource<<dbc354bc61fa330ce256341cb7eb3ba4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ConcreteRequest, Query } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type NotificationsListQuery$variables = {
  count: number
  cursor?: string | null | undefined
  verbs?: string | null | undefined
}
export type NotificationsListQuery$data = {
  readonly me:
    | {
        readonly id: string
        readonly ' $fragmentSpreads': FragmentRefs<'NotificationsListFragment'>
      }
    | null
    | undefined
}
export type NotificationsListQuery = {
  response: NotificationsListQuery$data
  variables: NotificationsListQuery$variables
}

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        defaultValue: null,
        kind: 'LocalArgument',
        name: 'count',
      },
      {
        defaultValue: null,
        kind: 'LocalArgument',
        name: 'cursor',
      },
      {
        defaultValue: null,
        kind: 'LocalArgument',
        name: 'verbs',
      },
    ],
    v1 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'id',
      storageKey: null,
    },
    v2 = {
      kind: 'Variable',
      name: 'verbs',
      variableName: 'verbs',
    },
    v3 = [
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
      v2 /*: any*/,
    ],
    v4 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: '__typename',
      storageKey: null,
    },
    v5 = [
      v1 /*: any*/,
      v4 /*: any*/,
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
    ]
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Fragment',
      metadata: null,
      name: 'NotificationsListQuery',
      selections: [
        {
          alias: null,
          args: null,
          concreteType: 'User',
          kind: 'LinkedField',
          name: 'me',
          plural: false,
          selections: [
            v1 /*: any*/,
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
                v2 /*: any*/,
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
      argumentDefinitions: v0 /*: any*/,
      kind: 'Operation',
      name: 'NotificationsListQuery',
      selections: [
        {
          alias: null,
          args: null,
          concreteType: 'User',
          kind: 'LinkedField',
          name: 'me',
          plural: false,
          selections: [
            v1 /*: any*/,
            {
              alias: null,
              args: null,
              kind: 'ScalarField',
              name: 'notificationsUnreadCount',
              storageKey: null,
            },
            {
              alias: null,
              args: v3 /*: any*/,
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
                        v1 /*: any*/,
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
                            v4 /*: any*/,
                            v1 /*: any*/,
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
                                  name: 'fullName',
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
                          selections: v5 /*: any*/,
                          storageKey: null,
                        },
                        {
                          alias: null,
                          args: null,
                          concreteType: null,
                          kind: 'LinkedField',
                          name: 'actionObject',
                          plural: false,
                          selections: v5 /*: any*/,
                          storageKey: null,
                        },
                        v4 /*: any*/,
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
              args: v3 /*: any*/,
              filters: ['verbs'],
              handle: 'connection',
              key: 'user_notifications',
              kind: 'LinkedHandle',
              name: 'notifications',
            },
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: '5020e8d54e518cc03c83a9dae0d7a755',
      id: null,
      metadata: {},
      name: 'NotificationsListQuery',
      operationKind: 'query',
      text: 'query NotificationsListQuery(\n  $count: Int!\n  $cursor: String\n  $verbs: String\n) {\n  me {\n    id\n    ...NotificationsListFragment_LXqp7\n  }\n}\n\nfragment NotificationItemFragment on Notification {\n  id\n  pk\n  unread\n  timestamp\n  level\n  verb\n  description\n  data\n  actor {\n    __typename\n    id\n    ... on User {\n      avatar(width: 48, height: 48) {\n        url\n      }\n      fullName\n    }\n  }\n  target {\n    id\n    __typename\n    ... on Comment {\n      id\n      body\n    }\n  }\n  actionObject {\n    id\n    __typename\n    ... on Comment {\n      id\n      body\n    }\n  }\n}\n\nfragment NotificationsListFragment_LXqp7 on User {\n  id\n  notificationsUnreadCount\n  notifications(first: $count, after: $cursor, verbs: $verbs) {\n    edges {\n      cursor\n      node {\n        id\n        unread\n        ...NotificationItemFragment\n        __typename\n      }\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n',
    },
  }
})()

;(node as any).hash = '0554d356cc26427a8f329cf061e2faee'

export default node
