/**
 * @generated SignedSource<<c0ae600617cd934b832228f24591f1f7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ConcreteRequest, Query } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type ChatRoomMessagesListPaginationQuery$variables = {
  count?: number | null | undefined
  cursor?: string | null | undefined
  id: string
}
export type ChatRoomMessagesListPaginationQuery$data = {
  readonly node:
    | {
        readonly ' $fragmentSpreads': FragmentRefs<'MessagesListFragment'>
      }
    | null
    | undefined
}
export type ChatRoomMessagesListPaginationQuery = {
  response: ChatRoomMessagesListPaginationQuery$data
  variables: ChatRoomMessagesListPaginationQuery$variables
}

const node: ConcreteRequest = (function () {
  var v0 = [
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
      {
        defaultValue: null,
        kind: 'LocalArgument',
        name: 'id',
      },
    ],
    v1 = [
      {
        kind: 'Variable',
        name: 'id',
        variableName: 'id',
      },
    ],
    v2 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: '__typename',
      storageKey: null,
    },
    v3 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'id',
      storageKey: null,
    },
    v4 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'totalCount',
      storageKey: null,
    },
    v5 = [
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
    ]
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Fragment',
      metadata: null,
      name: 'ChatRoomMessagesListPaginationQuery',
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: null,
          kind: 'LinkedField',
          name: 'node',
          plural: false,
          selections: [
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
              ],
              kind: 'FragmentSpread',
              name: 'MessagesListFragment',
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
      name: 'ChatRoomMessagesListPaginationQuery',
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: null,
          kind: 'LinkedField',
          name: 'node',
          plural: false,
          selections: [
            v2 /*: any*/,
            v3 /*: any*/,
            {
              kind: 'InlineFragment',
              selections: [
                {
                  alias: null,
                  args: null,
                  concreteType: 'ChatRoomParticipantConnection',
                  kind: 'LinkedField',
                  name: 'participants',
                  plural: false,
                  selections: [v4 /*: any*/],
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  concreteType: 'UnreadMessages',
                  kind: 'LinkedField',
                  name: 'unreadMessages',
                  plural: false,
                  selections: [
                    {
                      alias: null,
                      args: null,
                      kind: 'ScalarField',
                      name: 'count',
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      kind: 'ScalarField',
                      name: 'markedUnread',
                      storageKey: null,
                    },
                  ],
                  storageKey: null,
                },
                {
                  alias: null,
                  args: v5 /*: any*/,
                  concreteType: 'MessageConnection',
                  kind: 'LinkedField',
                  name: 'allMessages',
                  plural: false,
                  selections: [
                    v4 /*: any*/,
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
                            v3 /*: any*/,
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
                                v3 /*: any*/,
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
                              name: 'extraData',
                              storageKey: null,
                            },
                            {
                              alias: null,
                              args: null,
                              concreteType: 'Message',
                              kind: 'LinkedField',
                              name: 'inReplyTo',
                              plural: false,
                              selections: [v3 /*: any*/],
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
                              name: 'verb',
                              storageKey: null,
                            },
                            v2 /*: any*/,
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
                {
                  alias: null,
                  args: v5 /*: any*/,
                  filters: null,
                  handle: 'connection',
                  key: 'chatRoom_allMessages',
                  kind: 'LinkedHandle',
                  name: 'allMessages',
                },
              ],
              type: 'ChatRoom',
              abstractKey: null,
            },
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: 'bfd8d21c03b208e2901e4fe25aeb55ac',
      id: null,
      metadata: {},
      name: 'ChatRoomMessagesListPaginationQuery',
      operationKind: 'query',
      text: 'query ChatRoomMessagesListPaginationQuery(\n  $count: Int = 20\n  $cursor: String\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...MessagesListFragment_1G22uz\n    id\n  }\n}\n\nfragment MessageItemFragment on Message {\n  id\n  content\n  created\n  extraData\n  inReplyTo {\n    id\n  }\n  isRead\n  pk\n  profile {\n    id\n  }\n  verb\n}\n\nfragment MessagesListFragment_1G22uz on ChatRoom {\n  id\n  participants {\n    totalCount\n  }\n  unreadMessages {\n    count\n    markedUnread\n  }\n  allMessages(first: $count, after: $cursor) {\n    totalCount\n    edges {\n      node {\n        id\n        created\n        profile {\n          id\n          name\n          image(height: 32, width: 32) {\n            url\n          }\n        }\n        isRead\n        ...MessageItemFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n',
    },
  }
})()

;(node as any).hash = '8137c492c793a174c334ca5178c5ce22'

export default node
