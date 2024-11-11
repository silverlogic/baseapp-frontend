/**
 * @generated SignedSource<<765a41dfcc81e65193be81bcec7783dc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ConcreteRequest, Query } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type MessageRoomQuery$variables = {
  roomId: string
}
export type MessageRoomQuery$data = {
  readonly chatRoom:
    | {
        readonly id: string
        readonly participants:
          | {
              readonly edges: ReadonlyArray<
                | {
                    readonly node:
                      | {
                          readonly profile:
                            | {
                                readonly __typename: 'Profile'
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
            }
          | null
          | undefined
        readonly ' $fragmentSpreads': FragmentRefs<'MessagesListFragment'>
      }
    | null
    | undefined
}
export type MessageRoomQuery = {
  response: MessageRoomQuery$data
  variables: MessageRoomQuery$variables
}

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        defaultValue: null,
        kind: 'LocalArgument',
        name: 'roomId',
      },
    ],
    v1 = [
      {
        kind: 'Variable',
        name: 'id',
        variableName: 'roomId',
      },
    ],
    v2 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'id',
      storageKey: null,
    },
    v3 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: '__typename',
      storageKey: null,
    },
    v4 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'name',
      storageKey: null,
    },
    v5 = [
      {
        alias: null,
        args: null,
        kind: 'ScalarField',
        name: 'url',
        storageKey: null,
      },
    ],
    v6 = {
      alias: null,
      args: null,
      concreteType: 'Profile',
      kind: 'LinkedField',
      name: 'profile',
      plural: false,
      selections: [
        v2 /*: any*/,
        v3 /*: any*/,
        v4 /*: any*/,
        {
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
          selections: v5 /*: any*/,
          storageKey: 'image(height:100,width:100)',
        },
      ],
      storageKey: null,
    },
    v7 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'totalCount',
      storageKey: null,
    },
    v8 = [
      {
        kind: 'Literal',
        name: 'first',
        value: 20,
      },
    ]
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Fragment',
      metadata: null,
      name: 'MessageRoomQuery',
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: 'ChatRoom',
          kind: 'LinkedField',
          name: 'chatRoom',
          plural: false,
          selections: [
            v2 /*: any*/,
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
                      selections: [v6 /*: any*/],
                      storageKey: null,
                    },
                  ],
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
            {
              args: null,
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
      name: 'MessageRoomQuery',
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: 'ChatRoom',
          kind: 'LinkedField',
          name: 'chatRoom',
          plural: false,
          selections: [
            v2 /*: any*/,
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
                      selections: [v6 /*: any*/, v2 /*: any*/],
                      storageKey: null,
                    },
                  ],
                  storageKey: null,
                },
                v7 /*: any*/,
              ],
              storageKey: null,
            },
            {
              alias: null,
              args: v8 /*: any*/,
              concreteType: 'MessageConnection',
              kind: 'LinkedField',
              name: 'allMessages',
              plural: false,
              selections: [
                v7 /*: any*/,
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
                        v2 /*: any*/,
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
                            v2 /*: any*/,
                            v4 /*: any*/,
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
                              selections: v5 /*: any*/,
                              storageKey: 'image(height:32,width:32)',
                            },
                          ],
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
                          selections: [v2 /*: any*/],
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
                        v3 /*: any*/,
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
              storageKey: 'allMessages(first:20)',
            },
            {
              alias: null,
              args: v8 /*: any*/,
              filters: null,
              handle: 'connection',
              key: 'chatRoom_allMessages',
              kind: 'LinkedHandle',
              name: 'allMessages',
            },
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: '51398ccf9af30216c41ffae90d72a021',
      id: null,
      metadata: {},
      name: 'MessageRoomQuery',
      operationKind: 'query',
      text: 'query MessageRoomQuery(\n  $roomId: ID!\n) {\n  chatRoom(id: $roomId) {\n    id\n    participants {\n      edges {\n        node {\n          profile {\n            id\n            __typename\n            name\n            image(width: 100, height: 100) {\n              url\n            }\n          }\n          id\n        }\n      }\n    }\n    ...MessagesListFragment\n  }\n}\n\nfragment MessageItemFragment on Message {\n  id\n  content\n  created\n  extraData\n  inReplyTo {\n    id\n  }\n  pk\n  profile {\n    id\n  }\n  verb\n}\n\nfragment MessagesListFragment on ChatRoom {\n  id\n  participants {\n    totalCount\n  }\n  allMessages(first: 20) {\n    totalCount\n    edges {\n      node {\n        id\n        created\n        profile {\n          id\n          name\n          image(height: 32, width: 32) {\n            url\n          }\n        }\n        ...MessageItemFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n',
    },
  }
})()

;(node as any).hash = '7f9f5ef4e48a13e3a6d5c1f030bab8ee'

export default node
