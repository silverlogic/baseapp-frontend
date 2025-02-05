/**
 * @generated SignedSource<<a4cbca51dd8a19245a2aedab4b6d42cc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ConcreteRequest, Query } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type ActivityLogsPaginationQuery$variables = {
  count?: number | null | undefined
  cursor?: string | null | undefined
  userName?: string | null | undefined
}
export type ActivityLogsPaginationQuery$data = {
  readonly ' $fragmentSpreads': FragmentRefs<'ActivityLogsFragment'>
}
export type ActivityLogsPaginationQuery = {
  response: ActivityLogsPaginationQuery$data
  variables: ActivityLogsPaginationQuery$variables
}

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        defaultValue: 10,
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
        name: 'userName',
      },
    ],
    v1 = {
      kind: 'Variable',
      name: 'userName',
      variableName: 'userName',
    },
    v2 = [
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
      v1 /*: any*/,
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
      kind: 'ScalarField',
      name: 'url',
      storageKey: null,
    }
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Fragment',
      metadata: null,
      name: 'ActivityLogsPaginationQuery',
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
            v1 /*: any*/,
          ],
          kind: 'FragmentSpread',
          name: 'ActivityLogsFragment',
        },
      ],
      type: 'Query',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Operation',
      name: 'ActivityLogsPaginationQuery',
      selections: [
        {
          alias: null,
          args: v2 /*: any*/,
          concreteType: 'ActivityLogConnection',
          kind: 'LinkedField',
          name: 'activityLogs',
          plural: false,
          selections: [
            {
              alias: null,
              args: null,
              concreteType: 'ActivityLogEdge',
              kind: 'LinkedField',
              name: 'edges',
              plural: true,
              selections: [
                {
                  alias: null,
                  args: null,
                  concreteType: 'ActivityLog',
                  kind: 'LinkedField',
                  name: 'node',
                  plural: false,
                  selections: [
                    v3 /*: any*/,
                    {
                      alias: null,
                      args: null,
                      kind: 'ScalarField',
                      name: 'createdAt',
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      kind: 'ScalarField',
                      name: 'verb',
                      storageKey: null,
                    },
                    v4 /*: any*/,
                    {
                      alias: null,
                      args: null,
                      concreteType: 'User',
                      kind: 'LinkedField',
                      name: 'user',
                      plural: false,
                      selections: [
                        v3 /*: any*/,
                        {
                          alias: null,
                          args: null,
                          kind: 'ScalarField',
                          name: 'fullName',
                          storageKey: null,
                        },
                        {
                          alias: null,
                          args: null,
                          kind: 'ScalarField',
                          name: 'email',
                          storageKey: null,
                        },
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
                          selections: [v4 /*: any*/],
                          storageKey: 'avatar(height:48,width:48)',
                        },
                      ],
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      kind: 'ScalarField',
                      name: '__typename',
                      storageKey: null,
                    },
                  ],
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  kind: 'ScalarField',
                  name: 'cursor',
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
                  name: 'endCursor',
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  kind: 'ScalarField',
                  name: 'hasNextPage',
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
          args: v2 /*: any*/,
          filters: ['userName'],
          handle: 'connection',
          key: 'ActivityLogs_activityLogs',
          kind: 'LinkedHandle',
          name: 'activityLogs',
        },
      ],
    },
    params: {
      cacheID: 'e0144e7ded781597d8d6bb739897328d',
      id: null,
      metadata: {},
      name: 'ActivityLogsPaginationQuery',
      operationKind: 'query',
      text: 'query ActivityLogsPaginationQuery(\n  $count: Int = 10\n  $cursor: String\n  $userName: String = null\n) {\n  ...ActivityLogsFragment_1nuDWg\n}\n\nfragment ActivityLogsFragment_1nuDWg on Query {\n  activityLogs(first: $count, after: $cursor, userName: $userName) {\n    edges {\n      node {\n        id\n        createdAt\n        verb\n        url\n        user {\n          id\n          fullName\n          email\n          avatar(width: 48, height: 48) {\n            url\n          }\n        }\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n',
    },
  }
})()

;(node as any).hash = '89365a3b6109a48bbc293c75f9d7174a'

export default node
