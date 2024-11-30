/**
 * @generated SignedSource<<9122eddc8565511648fff888985f63a5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ConcreteRequest, Query } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type profilesListRefetchable$variables = {
  count?: number | null | undefined
  cursor?: string | null | undefined
  id: string
}
export type profilesListRefetchable$data = {
  readonly node:
    | {
        readonly ' $fragmentSpreads': FragmentRefs<'ProfilesListFragment'>
      }
    | null
    | undefined
}
export type profilesListRefetchable = {
  response: profilesListRefetchable$data
  variables: profilesListRefetchable$variables
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
        name: 'id',
      },
    ],
    v1 = [
      {
        kind: 'Variable',
        name: 'id',
        variableName: 'id',
      },
    ],
    v2 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: '__typename',
      storageKey: null,
    },
    v3 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'id',
      storageKey: null,
    },
    v4 = [
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
    ]
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Fragment',
      metadata: null,
      name: 'profilesListRefetchable',
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
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
              ],
              kind: 'FragmentSpread',
              name: 'ProfilesListFragment',
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
      name: 'profilesListRefetchable',
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: null,
          kind: 'LinkedField',
          name: 'node',
          plural: false,
          selections: [
            v2 /*: any*/,
            v3 /*: any*/,
            {
              kind: 'InlineFragment',
              selections: [
                {
                  alias: null,
                  args: v4 /*: any*/,
                  concreteType: 'ProfileConnection',
                  kind: 'LinkedField',
                  name: 'profiles',
                  plural: false,
                  selections: [
                    {
                      alias: null,
                      args: null,
                      concreteType: 'ProfileEdge',
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
                          concreteType: 'Profile',
                          kind: 'LinkedField',
                          name: 'node',
                          plural: false,
                          selections: [
                            v3 /*: any*/,
                            {
                              alias: null,
                              args: null,
                              kind: 'ScalarField',
                              name: 'name',
                              storageKey: null,
                            },
                            {
                              alias: null,
                              args: [
                                {
                                  kind: 'Literal',
                                  name: 'height',
                                  value: 100,
                                },
                                {
                                  kind: 'Literal',
                                  name: 'width',
                                  value: 100,
                                },
                              ],
                              concreteType: 'File',
                              kind: 'LinkedField',
                              name: 'image',
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
                              storageKey: 'image(height:100,width:100)',
                            },
                            {
                              alias: null,
                              args: null,
                              concreteType: 'URLPath',
                              kind: 'LinkedField',
                              name: 'urlPath',
                              plural: false,
                              selections: [
                                {
                                  alias: null,
                                  args: null,
                                  kind: 'ScalarField',
                                  name: 'path',
                                  storageKey: null,
                                },
                                v3 /*: any*/,
                              ],
                              storageKey: null,
                            },
                            v2 /*: any*/,
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
                  args: v4 /*: any*/,
                  filters: null,
                  handle: 'connection',
                  key: 'ProfilesListFragment_profiles',
                  kind: 'LinkedHandle',
                  name: 'profiles',
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
      cacheID: '4076e2b1f754ffe0e086cd58c1941149',
      id: null,
      metadata: {},
      name: 'profilesListRefetchable',
      operationKind: 'query',
      text: 'query profilesListRefetchable(\n  $count: Int = 10\n  $cursor: String\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...ProfilesListFragment_1G22uz\n    id\n  }\n}\n\nfragment ProfileItemFragment on Profile {\n  id\n  name\n  image(width: 100, height: 100) {\n    url\n  }\n  urlPath {\n    path\n    id\n  }\n}\n\nfragment ProfilesListFragment_1G22uz on User {\n  id\n  profiles(first: $count, after: $cursor) {\n    edges {\n      cursor\n      node {\n        id\n        ...ProfileItemFragment\n        __typename\n      }\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n',
    },
  }
})()

;(node as any).hash = '220e97b8d45724f507762ff4f3d39dce'

export default node
