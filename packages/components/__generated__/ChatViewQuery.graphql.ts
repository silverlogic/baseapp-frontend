/**
 * @generated SignedSource<<63943d95a37b9aba054bfd992108b2f1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ConcreteRequest, Query } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type ChatViewQuery$variables = {
  roomId: string
}
export type ChatViewQuery$data = {
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
export type ChatViewQuery = {
  response: ChatViewQuery$data
  variables: ChatViewQuery$variables
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
      concreteType: 'Profile',
      kind: 'LinkedField',
      name: 'profile',
      plural: false,
      selections: [
        v2 /*: any*/,
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
        },
      ],
      storageKey: null,
    },
    v5 = [
      {
        kind: 'Literal',
        name: 'first',
        value: 20,
      },
    ],
    v6 = [v2 /*: any*/]
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Fragment',
      metadata: null,
      name: 'ChatViewQuery',
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
                      selections: [v4 /*: any*/],
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
      name: 'ChatViewQuery',
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
                      selections: [v4 /*: any*/, v2 /*: any*/],
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
                        v2 /*: any*/,
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
                          concreteType: 'Profile',
                          kind: 'LinkedField',
                          name: 'profile',
                          plural: false,
                          selections: v6 /*: any*/,
                          storageKey: null,
                        },
                        {
                          alias: null,
                          args: null,
                          concreteType: 'Message',
                          kind: 'LinkedField',
                          name: 'inReplyTo',
                          plural: false,
                          selections: v6 /*: any*/,
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
                          name: 'extraData',
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
              args: v5 /*: any*/,
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
      cacheID: '3396ef67042fab3c0140205b286e42a8',
      id: null,
      metadata: {},
      name: 'ChatViewQuery',
      operationKind: 'query',
      text: 'query ChatViewQuery(\n  $roomId: ID!\n) {\n  chatRoom(id: $roomId) {\n    id\n    participants {\n      edges {\n        node {\n          profile {\n            id\n            __typename\n            name\n            image(width: 100, height: 100) {\n              url\n            }\n          }\n          id\n        }\n      }\n    }\n    ...MessagesListFragment\n  }\n}\n\nfragment MessageItemFragment on Message {\n  id\n  inReplyTo {\n    id\n  }\n  content\n  pk\n  created\n  verb\n  extraData\n  profile {\n    id\n  }\n}\n\nfragment MessagesListFragment on ChatRoom {\n  id\n  allMessages(first: 20) {\n    edges {\n      node {\n        id\n        content\n        created\n        profile {\n          id\n        }\n        ...MessageItemFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n',
    },
  }
})()

;(node as any).hash = '588b053dd0ae1bffb0ce38344cc352c6'

export default node
