/**
 * @generated SignedSource<<7d7b83632e53e7be35ccbbafa28ea310>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ReaderFragment, RefetchableFragment } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type ProfilesListFragment$data = {
  readonly id: string
  readonly profiles:
    | {
        readonly edges: ReadonlyArray<
          | {
              readonly cursor: string
              readonly node:
                | {
                    readonly id: string
                    readonly ' $fragmentSpreads': FragmentRefs<'ProfileItemFragment'>
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
  readonly ' $fragmentType': 'ProfilesListFragment'
}
export type ProfilesListFragment$key = {
  readonly ' $data'?: ProfilesListFragment$data
  readonly ' $fragmentSpreads': FragmentRefs<'ProfilesListFragment'>
}

const node: ReaderFragment = (function () {
  var v0 = ['profiles'],
    v1 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'id',
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
        name: 'cursor',
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
        operation: require('./profilesListRefetchable.graphql'),
        identifierInfo: {
          identifierField: 'id',
          identifierQueryVariableName: 'id',
        },
      },
    },
    name: 'ProfilesListFragment',
    selections: [
      v1 /*: any*/,
      {
        alias: 'profiles',
        args: null,
        concreteType: 'ProfileConnection',
        kind: 'LinkedField',
        name: '__ProfilesListFragment_profiles_connection',
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
                  v1 /*: any*/,
                  {
                    args: null,
                    kind: 'FragmentSpread',
                    name: 'ProfileItemFragment',
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
    ],
    type: 'User',
    abstractKey: null,
  }
})()

;(node as any).hash = '220e97b8d45724f507762ff4f3d39dce'

export default node
