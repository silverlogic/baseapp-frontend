/**
 * @generated SignedSource<<19973e03f96279570ada8d066a149d0b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ConcreteRequest, Query } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type ActivityLogsQuery$variables = {
  after?: string | null | undefined
  first?: number | null | undefined
}
export type ActivityLogsQuery$data = {
  readonly ' $fragmentSpreads': FragmentRefs<'ActivityLogsFragment'>
}
export type ActivityLogsQuery = {
  response: ActivityLogsQuery$data
  variables: ActivityLogsQuery$variables
}

const node: ConcreteRequest = (function () {
  var v0 = {
      defaultValue: null,
      kind: 'LocalArgument',
      name: 'after',
    },
    v1 = {
      defaultValue: null,
      kind: 'LocalArgument',
      name: 'first',
    },
    v2 = [
      {
        kind: 'Variable',
        name: 'after',
        variableName: 'after',
      },
      {
        kind: 'Variable',
        name: 'first',
        variableName: 'first',
      },
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
      argumentDefinitions: [v0 /*: any*/, v1 /*: any*/],
      kind: 'Fragment',
      metadata: null,
      name: 'ActivityLogsQuery',
      selections: [
        {
          args: [
            {
              kind: 'Variable',
              name: 'count',
              variableName: 'first',
            },
            {
              kind: 'Variable',
              name: 'cursor',
              variableName: 'after',
            },
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
      argumentDefinitions: [v1 /*: any*/, v0 /*: any*/],
      kind: 'Operation',
      name: 'ActivityLogsQuery',
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
          filters: null,
          handle: 'connection',
          key: 'ActivityLogs_activityLogs',
          kind: 'LinkedHandle',
          name: 'activityLogs',
        },
      ],
    },
    params: {
      cacheID: '23080349fdcee969cb4dfd8eb05d574d',
      id: null,
      metadata: {},
      name: 'ActivityLogsQuery',
      operationKind: 'query',
      text: 'query ActivityLogsQuery(\n  $first: Int\n  $after: String\n) {\n  ...ActivityLogsFragment_3JmDlL\n}\n\nfragment ActivityLogsFragment_3JmDlL on Query {\n  activityLogs(first: $first, after: $after) {\n    edges {\n      node {\n        id\n        createdAt\n        verb\n        url\n        user {\n          id\n          fullName\n          email\n          avatar(width: 48, height: 48) {\n            url\n          }\n        }\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n',
    },
  }
})()

;(node as any).hash = 'daa3b9b572d3c7596c5dc4d6185f9be9'

export default node
