/**
 * @generated SignedSource<<c7e97c099619f133d392181efa218b80>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ReaderFragment, RefetchableFragment } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type RoomsListFragment$data = {
  readonly me:
    | {
        readonly id: string
        readonly profile:
          | {
              readonly chatRooms:
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
                                readonly lastMessage:
                                  | {
                                      readonly content: string | null | undefined
                                      readonly id: string
                                    }
                                  | null
                                  | undefined
                                readonly lastMessageTime: any | null | undefined
                                readonly participants:
                                  | {
                                      readonly edges: ReadonlyArray<
                                        | {
                                            readonly node:
                                              | {
                                                  readonly id: string
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
                                                }
                                              | null
                                              | undefined
                                          }
                                        | null
                                        | undefined
                                      >
                                      readonly totalCount: number | null | undefined
                                    }
                                  | null
                                  | undefined
                                readonly title: string | null | undefined
                                readonly unreadMessagesCount: number | null | undefined
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
            }
          | null
          | undefined
      }
    | null
    | undefined
  readonly ' $fragmentType': 'RoomsListFragment'
}
export type RoomsListFragment$key = {
  readonly ' $data'?: RoomsListFragment$data
  readonly ' $fragmentSpreads': FragmentRefs<'RoomsListFragment'>
}

const node: ReaderFragment = (function () {
  var v0 = ['me', 'profile', 'chatRooms'],
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
    },
    v3 = {
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
        fragmentPathInResult: [],
        operation: require('./chatRoomsPaginationQuery.graphql'),
      },
    },
    name: 'RoomsListFragment',
    selections: [
      {
        alias: null,
        args: null,
        concreteType: 'User',
        kind: 'LinkedField',
        name: 'me',
        plural: false,
        selections: [
          v1 /*: any*/,
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
                          v3 /*: any*/,
                          {
                            alias: null,
                            args: null,
                            kind: 'ScalarField',
                            name: 'lastMessageTime',
                            storageKey: null,
                          },
                          {
                            alias: null,
                            args: null,
                            concreteType: 'Message',
                            kind: 'LinkedField',
                            name: 'lastMessage',
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
                            ],
                            storageKey: null,
                          },
                          {
                            alias: null,
                            args: null,
                            kind: 'ScalarField',
                            name: 'title',
                            storageKey: null,
                          },
                          {
                            alias: null,
                            args: null,
                            concreteType: 'ChatRoomParticipantConnection',
                            kind: 'LinkedField',
                            name: 'participants',
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
                                concreteType: 'ChatRoomParticipantEdge',
                                kind: 'LinkedField',
                                name: 'edges',
                                plural: true,
                                selections: [
                                  {
                                    alias: null,
                                    args: null,
                                    concreteType: 'ChatRoomParticipant',
                                    kind: 'LinkedField',
                                    name: 'node',
                                    plural: false,
                                    selections: [
                                      v1 /*: any*/,
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
                                          v3 /*: any*/,
                                        ],
                                        storageKey: null,
                                      },
                                    ],
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

;(node as any).hash = 'af01a3ee2b3946a228bfc0c137480f5a'

export default node
