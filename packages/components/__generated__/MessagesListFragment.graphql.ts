/**
 * @generated SignedSource<<3054fdfe9c387978eb82a9a38ca85393>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ReaderFragment, RefetchableFragment } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type MessagesListFragment$data = {
  readonly allMessages:
    | {
        readonly edges: ReadonlyArray<
          | {
              readonly node:
                | {
                    readonly content: string | null | undefined
                    readonly created: any
                    readonly id: string
                    readonly ' $fragmentSpreads': FragmentRefs<'MessageItemFragment'>
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
  readonly ' $fragmentType': 'MessagesListFragment'
}
export type MessagesListFragment$key = {
  readonly ' $data'?: MessagesListFragment$data
  readonly ' $fragmentSpreads': FragmentRefs<'MessagesListFragment'>
}

const node: ReaderFragment = (function () {
  var v0 = ['allMessages'],
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
        defaultValue: 20,
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
        operation: require('./ChatRoomMessagesListPaginationQuery.graphql'),
        identifierInfo: {
          identifierField: 'id',
          identifierQueryVariableName: 'id',
        },
      },
    },
    name: 'MessagesListFragment',
    selections: [
      v1 /*: any*/,
      {
        alias: 'allMessages',
        args: null,
        concreteType: 'MessageConnection',
        kind: 'LinkedField',
        name: '__chatRoom_allMessages_connection',
        plural: false,
        selections: [
          {
            alias: null,
            args: null,
            concreteType: 'MessageEdge',
            kind: 'LinkedField',
            name: 'edges',
            plural: true,
            selections: [
              {
                alias: null,
                args: null,
                concreteType: 'Message',
                kind: 'LinkedField',
                name: 'node',
                plural: false,
                selections: [
                  v1 /*: any*/,
                  {
                    alias: null,
                    args: null,
                    kind: 'ScalarField',
                    name: 'content',
                    storageKey: null,
                  },
                  {
                    alias: null,
                    args: null,
                    kind: 'ScalarField',
                    name: 'created',
                    storageKey: null,
                  },
                  {
                    args: null,
                    kind: 'FragmentSpread',
                    name: 'MessageItemFragment',
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
    type: 'ChatRoom',
    abstractKey: null,
  }
})()

;(node as any).hash = 'a0ce3052d446f1aa6bfddce2517b1e75'

export default node
