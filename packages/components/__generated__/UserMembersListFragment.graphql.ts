/**
 * @generated SignedSource<<ffd4f527789c78fbe402c8b2cb4992db>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ReaderFragment, RefetchableFragment } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type ProfileRoleStatus = 'ACTIVE' | 'INACTIVE' | 'PENDING' | '%future added value'
export type ProfileRoles = 'ADMIN' | 'MANAGER' | '%future added value'

export type UserMembersListFragment$data = {
  readonly id: string
  readonly members:
    | {
        readonly edges: ReadonlyArray<
          | {
              readonly node:
                | {
                    readonly id: string
                    readonly role: ProfileRoles | null | undefined
                    readonly status: ProfileRoleStatus | null | undefined
                    readonly user: {
                      readonly profile:
                        | {
                            readonly ' $fragmentSpreads': FragmentRefs<'ProfileItemFragment'>
                          }
                        | null
                        | undefined
                    }
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
        readonly totalCount: number | null | undefined
      }
    | null
    | undefined
  readonly ' $fragmentSpreads': FragmentRefs<'ProfileItemFragment'>
  readonly ' $fragmentType': 'UserMembersListFragment'
}
export type UserMembersListFragment$key = {
  readonly ' $data'?: UserMembersListFragment$data
  readonly ' $fragmentSpreads': FragmentRefs<'UserMembersListFragment'>
}

const node: ReaderFragment = (function () {
  var v0 = ['members'],
    v1 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'id',
      storageKey: null,
    },
    v2 = {
      kind: 'InlineDataFragmentSpread',
      name: 'ProfileItemFragment',
      selections: [
        v1 /*: any*/,
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
          ],
          storageKey: null,
        },
      ],
      args: null,
      argumentDefinitions: [] /*: any*/,
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
        name: 'cursor',
      },
      {
        defaultValue: 'custom',
        kind: 'LocalArgument',
        name: 'orderByStatus',
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
        fragmentPathInResult: ['node'],
        operation: require('./userMembersListPaginationRefetchable.graphql'),
        identifierInfo: {
          identifierField: 'id',
          identifierQueryVariableName: 'id',
        },
      },
    },
    name: 'UserMembersListFragment',
    selections: [
      v2 /*: any*/,
      {
        alias: 'members',
        args: [
          {
            kind: 'Variable',
            name: 'orderByStatus',
            variableName: 'orderByStatus',
          },
        ],
        concreteType: 'ProfileUserRoleConnection',
        kind: 'LinkedField',
        name: '__UserMembersFragment_members_connection',
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
                  v1 /*: any*/,
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
                        selections: [v2 /*: any*/],
                        storageKey: null,
                      },
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
      v1 /*: any*/,
    ],
    type: 'Profile',
    abstractKey: null,
  }
})()

;(node as any).hash = '038f3f85d02ec3d5e31279acd14c0269'

export default node
