/**
 * @generated SignedSource<<d1fa912c5581bd952d0b9abd24137811>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ConcreteRequest, Query } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type chatRoomsPaginationQuery$variables = {
  count?: number | null | undefined
  cursor?: string | null | undefined
  q?: string | null | undefined
}
export type chatRoomsPaginationQuery$data = {
  readonly ' $fragmentSpreads': FragmentRefs<'RoomsListFragment'>
}
export type chatRoomsPaginationQuery = {
  response: chatRoomsPaginationQuery$data
  variables: chatRoomsPaginationQuery$variables
}

const node: ConcreteRequest = (function () {
  var v0 = [
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
    v1 = {
      kind: 'Variable',
      name: 'q',
      variableName: 'q',
    },
    v2 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'id',
      storageKey: null,
    },
    v3 = [
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
      v1 /*: any*/,
    ],
    v4 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'unreadMessagesCount',
      storageKey: null,
    },
    v5 = {
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
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Fragment',
      metadata: null,
      name: 'chatRoomsPaginationQuery',
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
            v1 /*: any*/,
          ],
          kind: 'FragmentSpread',
          name: 'RoomsListFragment',
        },
      ],
      type: 'Query',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Operation',
      name: 'chatRoomsPaginationQuery',
      selections: [
        {
          alias: null,
          args: null,
          concreteType: 'User',
          kind: 'LinkedField',
          name: 'me',
          plural: false,
          selections: [
            v2 /*: any*/,
            {
              alias: null,
              args: null,
              concreteType: 'Profile',
              kind: 'LinkedField',
              name: 'profile',
              plural: false,
              selections: [
                v2 /*: any*/,
                {
                  alias: null,
                  args: v3 /*: any*/,
                  concreteType: 'ChatRoomConnection',
                  kind: 'LinkedField',
                  name: 'chatRooms',
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
                            v2 /*: any*/,
                            v4 /*: any*/,
                            v5 /*: any*/,
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
                                v2 /*: any*/,
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
                                        v2 /*: any*/,
                                        {
                                          alias: null,
                                          args: null,
                                          concreteType: 'Profile',
                                          kind: 'LinkedField',
                                          name: 'profile',
                                          plural: false,
                                          selections: [
                                            v2 /*: any*/,
                                            {
                                              alias: null,
                                              args: null,
                                              kind: 'ScalarField',
                                              name: 'name',
                                              storageKey: null,
                                            },
                                            v5 /*: any*/,
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
                {
                  alias: null,
                  args: v3 /*: any*/,
                  filters: ['q'],
                  handle: 'connection',
                  key: 'roomsList_chatRooms',
                  kind: 'LinkedHandle',
                  name: 'chatRooms',
                },
                v4 /*: any*/,
              ],
              storageKey: null,
            },
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: '0eaffa81ba4ab925d547d72bcafd5fd3',
      id: null,
      metadata: {},
      name: 'chatRoomsPaginationQuery',
      operationKind: 'query',
      text: 'query chatRoomsPaginationQuery(\n  $count: Int = 5\n  $cursor: String\n  $q: String = null\n) {\n  ...RoomsListFragment_XhAmI\n}\n\nfragment RoomsListFragment_XhAmI on Query {\n  me {\n    id\n    profile {\n      id\n      chatRooms(first: $count, after: $cursor, q: $q) {\n        edges {\n          node {\n            id\n            unreadMessagesCount\n            image(width: 100, height: 100) {\n              url\n            }\n            lastMessageTime\n            lastMessage {\n              id\n              content\n            }\n            title\n            participants {\n              totalCount\n              edges {\n                node {\n                  id\n                  profile {\n                    id\n                    name\n                    image(width: 100, height: 100) {\n                      url\n                    }\n                  }\n                }\n              }\n            }\n            __typename\n          }\n          cursor\n        }\n        pageInfo {\n          hasNextPage\n          endCursor\n        }\n      }\n      unreadMessagesCount\n    }\n  }\n}\n',
    },
  }
})()

;(node as any).hash = 'af01a3ee2b3946a228bfc0c137480f5a'

export default node
