/**
 * @generated SignedSource<<1ccb4ef3183869c662dc4a70b535479d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ReaderFragment, RefetchableFragment } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type UserMembersListFragment$data = {
  readonly canChangeRole: boolean | null | undefined
  readonly id: string
  readonly members:
    | {
        readonly edges: ReadonlyArray<
          | {
              readonly node:
                | {
                    readonly ' $fragmentSpreads': FragmentRefs<'MemberItemFragment'>
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
  var v0 = ['members']
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
        defaultValue: null,
        kind: 'LocalArgument',
        name: 'orderBy',
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
      {
        alias: 'canChangeRole',
        args: [
          {
            kind: 'Literal',
            name: 'perm',
            value: 'baseapp_profiles.change_profileuserrole',
          },
        ],
        kind: 'ScalarField',
        name: 'hasPerm',
        storageKey: 'hasPerm(perm:"baseapp_profiles.change_profileuserrole")',
      },
      {
        args: null,
        kind: 'FragmentSpread',
        name: 'ProfileItemFragment',
      },
      {
        alias: 'members',
        args: [
          {
            kind: 'Variable',
            name: 'orderBy',
            variableName: 'orderBy',
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
                  {
                    args: null,
                    kind: 'FragmentSpread',
                    name: 'MemberItemFragment',
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
        args: null,
        kind: 'ScalarField',
        name: 'id',
        storageKey: null,
      },
    ],
    type: 'Profile',
    abstractKey: null,
  }
})()

;(node as any).hash = '8337f3f7c24d4eeb8d4c2495429a0d71'

export default node
