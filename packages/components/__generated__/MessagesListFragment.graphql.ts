/**
 * @generated SignedSource<<91b489da3df08f0b62ec9dce25b08a58>>
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
                    readonly created: any
                    readonly id: string
                    readonly isRead: boolean | null | undefined
                    readonly profile:
                      | {
                          readonly id: string
                          readonly image:
                            | {
                                readonly url: string
                              }
                            | null
                            | undefined
                          readonly name: string | null | undefined
                        }
                      | null
                      | undefined
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
        readonly totalCount: number | null | undefined
      }
    | null
    | undefined
  readonly id: string
  readonly participants:
    | {
        readonly totalCount: number | null | undefined
      }
    | null
    | undefined
  readonly unreadMessagesCount: number | null | undefined
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
    },
    v2 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'totalCount',
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
        alias: null,
        args: null,
        concreteType: 'ChatRoomParticipantConnection',
        kind: 'LinkedField',
        name: 'participants',
        plural: false,
        selections: [v2 /*: any*/],
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        kind: 'ScalarField',
        name: 'unreadMessagesCount',
        storageKey: null,
      },
      {
        alias: 'allMessages',
        args: null,
        concreteType: 'MessageConnection',
        kind: 'LinkedField',
        name: '__chatRoom_allMessages_connection',
        plural: false,
        selections: [
          v2 /*: any*/,
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
                    name: 'created',
                    storageKey: null,
                  },
                  {
                    alias: null,
                    args: null,
                    concreteType: 'Profile',
                    kind: 'LinkedField',
                    name: 'profile',
                    plural: false,
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
                            value: 32,
                          },
                          {
                            kind: 'Literal',
                            name: 'width',
                            value: 32,
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
                        storageKey: 'image(height:32,width:32)',
                      },
                    ],
                    storageKey: null,
                  },
                  {
                    alias: null,
                    args: null,
                    kind: 'ScalarField',
                    name: 'isRead',
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

;(node as any).hash = '1eebe2365c138d57d71fb4d1365102b9'

export default node
