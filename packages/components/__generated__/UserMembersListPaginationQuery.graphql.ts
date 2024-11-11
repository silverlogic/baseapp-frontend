/**
 * @generated SignedSource<<5590b423755faa5cae40c081ea26fb23>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ConcreteRequest, Query } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type UserMembersListPaginationQuery$variables = {
  count?: number | null | undefined
  cursor?: string | null | undefined
  orderByStatus?: string | null | undefined
}
export type UserMembersListPaginationQuery$data = {
  readonly me:
    | {
        readonly ' $fragmentSpreads': FragmentRefs<'UserMembersListFragment'>
      }
    | null
    | undefined
}
export type UserMembersListPaginationQuery = {
  response: UserMembersListPaginationQuery$data
  variables: UserMembersListPaginationQuery$variables
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
        name: 'orderByStatus',
      },
    ],
    v1 = {
      kind: 'Variable',
      name: 'orderByStatus',
      variableName: 'orderByStatus',
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
      name: 'name',
      storageKey: null,
    },
    v4 = {
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
    v5 = {
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
        v2 /*: any*/,
      ],
      storageKey: null,
    },
    v6 = [
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
    ]
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Fragment',
      metadata: null,
      name: 'UserMembersListPaginationQuery',
      selections: [
        {
          alias: null,
          args: null,
          concreteType: 'User',
          kind: 'LinkedField',
          name: 'me',
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
                v1 /*: any*/,
              ],
              kind: 'FragmentSpread',
              name: 'UserMembersListFragment',
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
      name: 'UserMembersListPaginationQuery',
      selections: [
        {
          alias: null,
          args: null,
          concreteType: 'User',
          kind: 'LinkedField',
          name: 'me',
          plural: false,
          selections: [
            {
              alias: null,
              args: null,
              concreteType: 'Profile',
              kind: 'LinkedField',
              name: 'profile',
              plural: false,
              selections: [
                v2 /*: any*/,
                v3 /*: any*/,
                v4 /*: any*/,
                v5 /*: any*/,
                {
                  alias: null,
                  args: v6 /*: any*/,
                  concreteType: 'ProfileUserRoleConnection',
                  kind: 'LinkedField',
                  name: 'members',
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
                      concreteType: 'ProfileUserRoleEdge',
                      kind: 'LinkedField',
                      name: 'edges',
                      plural: true,
                      selections: [
                        {
                          alias: null,
                          args: null,
                          concreteType: 'ProfileUserRole',
                          kind: 'LinkedField',
                          name: 'node',
                          plural: false,
                          selections: [
                            v2 /*: any*/,
                            {
                              alias: null,
                              args: null,
                              concreteType: 'User',
                              kind: 'LinkedField',
                              name: 'user',
                              plural: false,
                              selections: [
                                {
                                  alias: null,
                                  args: null,
                                  concreteType: 'Profile',
                                  kind: 'LinkedField',
                                  name: 'profile',
                                  plural: false,
                                  selections: [
                                    v2 /*: any*/,
                                    v3 /*: any*/,
                                    v4 /*: any*/,
                                    v5 /*: any*/,
                                  ],
                                  storageKey: null,
                                },
                                v2 /*: any*/,
                              ],
                              storageKey: null,
                            },
                            {
                              alias: null,
                              args: null,
                              kind: 'ScalarField',
                              name: 'role',
                              storageKey: null,
                            },
                            {
                              alias: null,
                              args: null,
                              kind: 'ScalarField',
                              name: 'status',
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
                  args: v6 /*: any*/,
                  filters: ['orderByStatus'],
                  handle: 'connection',
                  key: 'UserMembersFragment_members',
                  kind: 'LinkedHandle',
                  name: 'members',
                },
              ],
              storageKey: null,
            },
            v2 /*: any*/,
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: '01fb387e0c0ef07a4b949c31accf3a0c',
      id: null,
      metadata: {},
      name: 'UserMembersListPaginationQuery',
      operationKind: 'query',
      text: 'query UserMembersListPaginationQuery(\n  $count: Int = 10\n  $cursor: String\n  $orderByStatus: String\n) {\n  me {\n    ...UserMembersListFragment_Kswkm\n    id\n  }\n}\n\nfragment ProfileItemFragment on Profile {\n  id\n  name\n  image(width: 100, height: 100) {\n    url\n  }\n  urlPath {\n    path\n    id\n  }\n}\n\nfragment UserMembersListFragment_Kswkm on User {\n  profile {\n    ...ProfileItemFragment\n    members(first: $count, after: $cursor, orderByStatus: $orderByStatus) {\n      totalCount\n      edges {\n        node {\n          id\n          user {\n            profile {\n              ...ProfileItemFragment\n              id\n            }\n            id\n          }\n          role\n          status\n          __typename\n        }\n        cursor\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n    id\n  }\n  id\n}\n',
    },
  }
})()

;(node as any).hash = '5925af2542eb06c4457a1e16c1591fd9'

export default node
