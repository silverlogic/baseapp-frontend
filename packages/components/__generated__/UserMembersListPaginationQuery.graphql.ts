/**
 * @generated SignedSource<<5217aecc6cf81c52b03e9d986eff97c4>>
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
  orderBy?: string | null | undefined
  profileId: string
}
export type UserMembersListPaginationQuery$data = {
  readonly profile:
    | {
        readonly pk: number
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
        name: 'orderBy',
      },
      {
        defaultValue: null,
        kind: 'LocalArgument',
        name: 'profileId',
      },
    ],
    v1 = [
      {
        kind: 'Variable',
        name: 'id',
        variableName: 'profileId',
      },
    ],
    v2 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'pk',
      storageKey: null,
    },
    v3 = {
      kind: 'Variable',
      name: 'orderBy',
      variableName: 'orderBy',
    },
    v4 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'id',
      storageKey: null,
    },
    v5 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'name',
      storageKey: null,
    },
    v6 = {
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
    v7 = {
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
      v3 /*: any*/,
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
          args: v1 /*: any*/,
          concreteType: 'Profile',
          kind: 'LinkedField',
          name: 'profile',
          plural: false,
          selections: [
            v2 /*: any*/,
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
                v3 /*: any*/,
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
          args: v1 /*: any*/,
          concreteType: 'Profile',
          kind: 'LinkedField',
          name: 'profile',
          plural: false,
          selections: [
            v2 /*: any*/,
            v4 /*: any*/,
            v5 /*: any*/,
            v6 /*: any*/,
            v7 /*: any*/,
            {
              alias: null,
              args: v8 /*: any*/,
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
                        v4 /*: any*/,
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
                              selections: [v4 /*: any*/, v5 /*: any*/, v6 /*: any*/, v7 /*: any*/],
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
              args: v8 /*: any*/,
              filters: ['orderBy'],
              handle: 'connection',
              key: 'UserMembersFragment_members',
              kind: 'LinkedHandle',
              name: 'members',
            },
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: 'e889baf91ade9a8612108dfa2583a2c8',
      id: null,
      metadata: {},
      name: 'UserMembersListPaginationQuery',
      operationKind: 'query',
      text: 'query UserMembersListPaginationQuery(\n  $count: Int = 10\n  $cursor: String\n  $orderBy: String\n  $profileId: ID!\n) {\n  profile(id: $profileId) {\n    pk\n    ...UserMembersListFragment_32czeo\n    id\n  }\n}\n\nfragment MemberItemFragment on ProfileUserRole {\n  id\n  user {\n    profile {\n      ...ProfileItemFragment\n      id\n    }\n    id\n  }\n  role\n  status\n}\n\nfragment ProfileItemFragment on Profile {\n  id\n  name\n  image(width: 100, height: 100) {\n    url\n  }\n  urlPath {\n    path\n    id\n  }\n}\n\nfragment UserMembersListFragment_32czeo on Profile {\n  ...ProfileItemFragment\n  members(first: $count, after: $cursor, orderBy: $orderBy) {\n    totalCount\n    edges {\n      node {\n        ...MemberItemFragment\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  id\n}\n',
    },
  }
})()

;(node as any).hash = 'bc02b9d42e6f3e087d064c23c98c1a16'

export default node
