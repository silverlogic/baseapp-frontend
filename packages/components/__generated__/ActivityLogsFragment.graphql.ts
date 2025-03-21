/**
 * @generated SignedSource<<a0e0f33be280b1cb77648b563497e8ff>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ReaderFragment, RefetchableFragment } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type ActivityLogsFragment$data = {
  readonly activityLogs:
    | {
        readonly edges: ReadonlyArray<
          | {
              readonly node:
                | {
                    readonly createdAt: any
                    readonly events:
                      | {
                          readonly edges: ReadonlyArray<
                            | {
                                readonly node:
                                  | {
                                      readonly diff: any | null | undefined
                                      readonly label: string | null | undefined
                                    }
                                  | null
                                  | undefined
                              }
                            | null
                            | undefined
                          >
                        }
                      | null
                      | undefined
                    readonly id: string
                    readonly url: string | null | undefined
                    readonly user:
                      | {
                          readonly avatar:
                            | {
                                readonly url: string
                              }
                            | null
                            | undefined
                          readonly email: string | null | undefined
                          readonly fullName: string | null | undefined
                          readonly id: string
                        }
                      | null
                      | undefined
                    readonly verb: string | null | undefined
                  }
                | null
                | undefined
            }
          | null
          | undefined
        >
        readonly pageInfo: {
          readonly endCursor: string | null | undefined
          readonly hasNextPage: boolean
        }
      }
    | null
    | undefined
  readonly ' $fragmentType': 'ActivityLogsFragment'
}
export type ActivityLogsFragment$key = {
  readonly ' $data'?: ActivityLogsFragment$data
  readonly ' $fragmentSpreads': FragmentRefs<'ActivityLogsFragment'>
}

const node: ReaderFragment = (function () {
  var v0 = ['activityLogs'],
    v1 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'id',
      storageKey: null,
    },
    v2 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'url',
      storageKey: null,
    }
  return {
    argumentDefinitions: [
      {
        defaultValue: 10,
        kind: 'LocalArgument',
        name: 'count',
      },
      {
        defaultValue: null,
        kind: 'LocalArgument',
        name: 'createdFrom',
      },
      {
        defaultValue: null,
        kind: 'LocalArgument',
        name: 'createdTo',
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
    kind: 'Fragment',
    metadata: {
      connection: [
        {
          count: 'count',
          cursor: 'cursor',
          direction: 'forward',
          path: v0 /*: any*/,
        },
      ],
      refetch: {
        connection: {
          forward: {
            count: 'count',
            cursor: 'cursor',
          },
          backward: null,
          path: v0 /*: any*/,
        },
        fragmentPathInResult: [],
        operation: require('./ActivityLogsPaginationQuery.graphql'),
      },
    },
    name: 'ActivityLogsFragment',
    selections: [
      {
        alias: 'activityLogs',
        args: [
          {
            kind: 'Variable',
            name: 'createdFrom',
            variableName: 'createdFrom',
          },
          {
            kind: 'Variable',
            name: 'createdTo',
            variableName: 'createdTo',
          },
          {
            kind: 'Variable',
            name: 'userName',
            variableName: 'userName',
          },
        ],
        concreteType: 'ActivityLogConnection',
        kind: 'LinkedField',
        name: '__ActivityLogs_activityLogs_connection',
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
                  v1 /*: any*/,
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
                    concreteType: 'NodeLogEventConnection',
                    kind: 'LinkedField',
                    name: 'events',
                    plural: false,
                    selections: [
                      {
                        alias: null,
                        args: null,
                        concreteType: 'NodeLogEventEdge',
                        kind: 'LinkedField',
                        name: 'edges',
                        plural: true,
                        selections: [
                          {
                            alias: null,
                            args: null,
                            concreteType: 'NodeLogEvent',
                            kind: 'LinkedField',
                            name: 'node',
                            plural: false,
                            selections: [
                              {
                                alias: null,
                                args: null,
                                kind: 'ScalarField',
                                name: 'label',
                                storageKey: null,
                              },
                              {
                                alias: null,
                                args: null,
                                kind: 'ScalarField',
                                name: 'diff',
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
                    kind: 'ScalarField',
                    name: 'verb',
                    storageKey: null,
                  },
                  v2 /*: any*/,
                  {
                    alias: null,
                    args: null,
                    concreteType: 'User',
                    kind: 'LinkedField',
                    name: 'user',
                    plural: false,
                    selections: [
                      v1 /*: any*/,
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
                        selections: [v2 /*: any*/],
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
    ],
    type: 'Query',
    abstractKey: null,
  }
})()

;(node as any).hash = '331e3d4312fbe40053110fe98844df70'

export default node
