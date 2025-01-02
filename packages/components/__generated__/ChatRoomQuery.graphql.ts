/**
 * @generated SignedSource<<4397d26af79aa7dbd7fe435d3aa8d090>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ConcreteRequest, Query } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type ChatRoomQuery$variables = {
  roomId: string
}
export type ChatRoomQuery$data = {
  readonly chatRoom:
    | {
        readonly id: string
        readonly ' $fragmentSpreads': FragmentRefs<
          'ChatRoomHeaderFragment' | 'MessagesListFragment'
        >
      }
    | null
    | undefined
}
export type ChatRoomQuery = {
  response: ChatRoomQuery$data
  variables: ChatRoomQuery$variables
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
    v3 = [
      {
        alias: null,
        args: null,
        kind: 'ScalarField',
        name: 'url',
        storageKey: null,
      },
    ],
    v4 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'totalCount',
      storageKey: null,
    },
    v5 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'name',
      storageKey: null,
    },
    v6 = [
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
      name: 'ChatRoomQuery',
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
              args: null,
              kind: 'FragmentSpread',
              name: 'ChatRoomHeaderFragment',
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
      name: 'ChatRoomQuery',
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
              args: [
                {
                  kind: 'Literal',
                  name: 'height',
                  value: 144,
                },
                {
                  kind: 'Literal',
                  name: 'width',
                  value: 144,
                },
              ],
              concreteType: 'File',
              kind: 'LinkedField',
              name: 'image',
              plural: false,
              selections: v3 /*: any*/,
              storageKey: 'image(height:144,width:144)',
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
              kind: 'ScalarField',
              name: 'isGroup',
              storageKey: null,
            },
            {
              alias: null,
              args: [
                {
                  kind: 'Literal',
                  name: 'first',
                  value: 5,
                },
              ],
              concreteType: 'ChatRoomParticipantConnection',
              kind: 'LinkedField',
              name: 'participants',
              plural: false,
              selections: [
                v4 /*: any*/,
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
                        {
                          alias: null,
                          args: null,
                          concreteType: 'Profile',
                          kind: 'LinkedField',
                          name: 'profile',
                          plural: false,
                          selections: [
                            v2 /*: any*/,
                            v5 /*: any*/,
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
                              selections: v3 /*: any*/,
                              storageKey: 'image(height:100,width:100)',
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
              storageKey: 'participants(first:5)',
            },
            {
              alias: null,
              args: null,
              concreteType: 'UnreadMessageCount',
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
                v2 /*: any*/,
              ],
              storageKey: null,
            },
            {
              alias: null,
              args: v6 /*: any*/,
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
                            v5 /*: any*/,
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
                              selections: v3 /*: any*/,
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
              storageKey: 'allMessages(first:20)',
            },
            {
              alias: null,
              args: v6 /*: any*/,
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
      cacheID: '7fb10eae239d3ac574a1c385e51dce5b',
      id: null,
      metadata: {},
      name: 'ChatRoomQuery',
      operationKind: 'query',
      text: 'query ChatRoomQuery(\n  $roomId: ID!\n) {\n  chatRoom(id: $roomId) {\n    id\n    ...ChatRoomHeaderFragment\n    ...MessagesListFragment\n  }\n}\n\nfragment ChatRoomHeaderFragment on ChatRoom {\n  id\n  image(width: 144, height: 144) {\n    url\n  }\n  title\n  isGroup\n  participants(first: 5) {\n    totalCount\n    edges {\n      node {\n        profile {\n          id\n          name\n          image(width: 100, height: 100) {\n            url\n          }\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment MessageItemFragment on Message {\n  id\n  content\n  created\n  extraData\n  inReplyTo {\n    id\n  }\n  isRead\n  pk\n  profile {\n    id\n  }\n  verb\n}\n\nfragment MessagesListFragment on ChatRoom {\n  id\n  isGroup\n  unreadMessages {\n    count\n    markedUnread\n    id\n  }\n  allMessages(first: 20) {\n    totalCount\n    edges {\n      node {\n        id\n        created\n        profile {\n          id\n          name\n          image(height: 32, width: 32) {\n            url\n          }\n        }\n        isRead\n        ...MessageItemFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n',
    },
  }
})()

;(node as any).hash = 'f4a1b2a556f517a2f2e3016bfb38f7b5'

export default node
