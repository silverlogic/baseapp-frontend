/**
 * @generated SignedSource<<b43c76e7c3d878e82162d5c3e47978cb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ReaderFragment, RefetchableFragment } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type AllProfilesListFragment$data = {
  readonly allProfiles:
    | {
        readonly edges: ReadonlyArray<
          | {
              readonly node:
                | {
                    readonly id: string
                    readonly image:
                      | {
                          readonly url: string
                        }
                      | null
                      | undefined
                    readonly name: string | null | undefined
                    readonly pk: number
                    readonly urlPath:
                      | {
                          readonly path: string
                        }
                      | null
                      | undefined
                  }
                | null
                | undefined
            }
          | null
          | undefined
        >
        readonly pageInfo: {
          readonly hasNextPage: boolean
        }
        readonly totalCount: number | null | undefined
      }
    | null
    | undefined
  readonly ' $fragmentType': 'AllProfilesListFragment'
}
export type AllProfilesListFragment$key = {
  readonly ' $data'?: AllProfilesListFragment$data
  readonly ' $fragmentSpreads': FragmentRefs<'AllProfilesListFragment'>
}

const node: ReaderFragment = (function () {
  var v0 = ['allProfiles']
  return {
    argumentDefinitions: [
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
        operation: require('./AllProfilesListPaginationQuery.graphql'),
      },
    },
    name: 'AllProfilesListFragment',
    selections: [
      {
        alias: 'allProfiles',
        args: [
          {
            kind: 'Variable',
            name: 'orderBy',
            variableName: 'orderBy',
          },
          {
            kind: 'Variable',
            name: 'q',
            variableName: 'q',
          },
        ],
        concreteType: 'ProfileConnection',
        kind: 'LinkedField',
        name: '__AllProfilesListFragment_allProfiles_connection',
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
                  {
                    alias: null,
                    args: null,
                    kind: 'ScalarField',
                    name: 'id',
                    storageKey: null,
                  },
                  {
                    alias: null,
                    args: null,
                    kind: 'ScalarField',
                    name: 'pk',
                    storageKey: null,
                  },
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
                    storageKey: 'image(height:48,width:48)',
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
    ],
    type: 'Query',
    abstractKey: null,
  }
})()

;(node as any).hash = '1f6125a68c568e0d408512ebf4295bee'

export default node
