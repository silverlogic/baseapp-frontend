/**
 * @generated SignedSource<<0bf25a59b74d89535421eea2f66dcff6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ReaderFragment, RefetchableFragment } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type DevicesListFragment$data = {
  readonly allUserDevices:
    | {
        readonly edges: ReadonlyArray<
          | {
              readonly node:
                | {
                    readonly id: string
                    readonly ' $fragmentSpreads': FragmentRefs<'DeviceItemFragment'>
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
  readonly ' $fragmentType': 'DevicesListFragment'
}
export type DevicesListFragment$key = {
  readonly ' $data'?: DevicesListFragment$data
  readonly ' $fragmentSpreads': FragmentRefs<'DevicesListFragment'>
}

const node: ReaderFragment = (function () {
  var v0 = ['allUserDevices']
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
        fragmentPathInResult: [],
        operation: require('./DevicesListPaginationQuery.graphql'),
      },
    },
    name: 'DevicesListFragment',
    selections: [
      {
        alias: 'allUserDevices',
        args: null,
        concreteType: 'UserDeviceTypeConnection',
        kind: 'LinkedField',
        name: '__devicesList_allUserDevices_connection',
        plural: false,
        selections: [
          {
            alias: null,
            args: null,
            concreteType: 'UserDeviceTypeEdge',
            kind: 'LinkedField',
            name: 'edges',
            plural: true,
            selections: [
              {
                alias: null,
                args: null,
                concreteType: 'UserDeviceType',
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
                    args: null,
                    kind: 'FragmentSpread',
                    name: 'DeviceItemFragment',
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
    type: 'Query',
    abstractKey: null,
  }
})()

;(node as any).hash = '8af1a8af75265873e0a031d1c7fe388f'

export default node
