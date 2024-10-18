/**
 * @generated SignedSource<<031c50efdf4ee4926bb648d68980076f>>
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
    v4 = [
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
                  args: v4 /*: any*/,
                  concreteType: 'MessageConnection',
                  kind: 'LinkedField',
                  name: 'allMessages',
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
                            v3 /*: any*/,
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
                  args: v4 /*: any*/,
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
      cacheID: '319bcdda3d7eb6e1d0374c1970c0de87',
      id: null,
      metadata: {},
      name: 'ChatRoomMessagesListPaginationQuery',
      operationKind: 'query',
      text: 'query ChatRoomMessagesListPaginationQuery(\n  $count: Int = 20\n  $cursor: String\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...MessagesListFragment_1G22uz\n    id\n  }\n}\n\nfragment MessageItemFragment on Message {\n  id\n  inReplyTo {\n    id\n  }\n  content\n  pk\n  created\n}\n\nfragment MessagesListFragment_1G22uz on ChatRoom {\n  id\n  allMessages(first: $count, after: $cursor) {\n    edges {\n      node {\n        id\n        content\n        created\n        ...MessageItemFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n',
    },
  }
})()

;(node as any).hash = 'a0ce3052d446f1aa6bfddce2517b1e75'

export default node
