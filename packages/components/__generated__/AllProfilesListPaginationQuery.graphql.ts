/**
 * @generated SignedSource<<55c88f2688f5b804fbf33dbcd243bab6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ConcreteRequest, Query } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type AllProfilesListPaginationQuery$variables = {
  count?: number | null | undefined
  cursor?: string | null | undefined
  orderBy?: string | null | undefined
  q?: string | null | undefined
}
export type AllProfilesListPaginationQuery$data = {
  readonly ' $fragmentSpreads': FragmentRefs<'AllProfilesListFragment'>
}
export type AllProfilesListPaginationQuery = {
  response: AllProfilesListPaginationQuery$data
  variables: AllProfilesListPaginationQuery$variables
}

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        defaultValue: 5,
        kind: 'LocalArgument',
        name: 'count',
      },
      {
        defaultValue: null,
        kind: 'LocalArgument',
        name: 'cursor',
      },
      {
        defaultValue: '-created',
        kind: 'LocalArgument',
        name: 'orderBy',
      },
      {
        defaultValue: null,
        kind: 'LocalArgument',
        name: 'q',
      },
    ],
    v1 = {
      kind: 'Variable',
      name: 'orderBy',
      variableName: 'orderBy',
    },
    v2 = {
      kind: 'Variable',
      name: 'q',
      variableName: 'q',
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
      v1 /*: any*/,
      v2 /*: any*/,
    ],
    v4 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'id',
      storageKey: null,
    }
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Fragment',
      metadata: null,
      name: 'AllProfilesListPaginationQuery',
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
            v2 /*: any*/,
          ],
          kind: 'FragmentSpread',
          name: 'AllProfilesListFragment',
        },
      ],
      type: 'Query',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Operation',
      name: 'AllProfilesListPaginationQuery',
      selections: [
        {
          alias: null,
          args: v3 /*: any*/,
          concreteType: 'ProfileConnection',
          kind: 'LinkedField',
          name: 'allProfiles',
          plural: false,
          selections: [
            {
              alias: null,
              args: null,
              kind: 'ScalarField',
              name: 'totalCount',
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
                  concreteType: 'Profile',
                  kind: 'LinkedField',
                  name: 'node',
                  plural: false,
                  selections: [
                    v4 /*: any*/,
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
                        v4 /*: any*/,
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
          ],
          storageKey: null,
        },
        {
          alias: null,
          args: v3 /*: any*/,
          filters: ['orderBy', 'q'],
          handle: 'connection',
          key: 'AllProfilesListFragment_allProfiles',
          kind: 'LinkedHandle',
          name: 'allProfiles',
        },
      ],
    },
    params: {
      cacheID: '14ee435dd3957e0c7247d383714e53f4',
      id: null,
      metadata: {},
      name: 'AllProfilesListPaginationQuery',
      operationKind: 'query',
      text: 'query AllProfilesListPaginationQuery(\n  $count: Int = 5\n  $cursor: String\n  $orderBy: String = "-created"\n  $q: String = null\n) {\n  ...AllProfilesListFragment_40Ewnb\n}\n\nfragment AllProfilesListFragment_40Ewnb on Query {\n  allProfiles(after: $cursor, first: $count, orderBy: $orderBy, q: $q) {\n    totalCount\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      node {\n        id\n        ...ProfileItemFragment\n        __typename\n      }\n      cursor\n    }\n  }\n}\n\nfragment ProfileItemFragment on Profile {\n  id\n  name\n  image(width: 100, height: 100) {\n    url\n  }\n  urlPath {\n    path\n    id\n  }\n}\n',
    },
  }
})()

;(node as any).hash = '145d7609bc0dcee3b0940096fa289337'

export default node
