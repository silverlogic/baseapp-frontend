/**
 * @generated SignedSource<<c81ebbf0070c8d9d62ec494d9e9daeba>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ReaderFragment, RefetchableFragment } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type RoomsListFragment$data = {
  readonly chatRooms:
    | {
        readonly edges: ReadonlyArray<
          | {
              readonly node:
                | {
                    readonly id: string
                    readonly unreadMessagesCount: number | null | undefined
                    readonly ' $fragmentSpreads': FragmentRefs<'RoomFragment'>
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
  readonly id: string
  readonly unreadMessagesCount: number | null | undefined
  readonly ' $fragmentType': 'RoomsListFragment'
}
export type RoomsListFragment$key = {
  readonly ' $data'?: RoomsListFragment$data
  readonly ' $fragmentSpreads': FragmentRefs<'RoomsListFragment'>
}

const node: ReaderFragment = (function () {
  var v0 = ['chatRooms'],
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
      name: 'unreadMessagesCount',
      storageKey: null,
    }
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
        fragmentPathInResult: ['node'],
        operation: require('./chatRoomsPaginationQuery.graphql'),
        identifierInfo: {
          identifierField: 'id',
          identifierQueryVariableName: 'id',
        },
      },
    },
    name: 'RoomsListFragment',
    selections: [
      v1 /*: any*/,
      {
        alias: 'chatRooms',
        args: [
          {
            kind: 'Variable',
            name: 'q',
            variableName: 'q',
          },
        ],
        concreteType: 'ChatRoomConnection',
        kind: 'LinkedField',
        name: '__roomsList_chatRooms_connection',
        plural: false,
        selections: [
          {
            alias: null,
            args: null,
            concreteType: 'ChatRoomEdge',
            kind: 'LinkedField',
            name: 'edges',
            plural: true,
            selections: [
              {
                alias: null,
                args: null,
                concreteType: 'ChatRoom',
                kind: 'LinkedField',
                name: 'node',
                plural: false,
                selections: [
                  v1 /*: any*/,
                  v2 /*: any*/,
                  {
                    args: null,
                    kind: 'FragmentSpread',
                    name: 'RoomFragment',
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
      v2 /*: any*/,
    ],
    type: 'ChatRoomsInterface',
    abstractKey: '__isChatRoomsInterface',
  }
})()

;(node as any).hash = '503f16e1be2d090bcacfff6d0c023a45'

export default node
