/**
 * @generated SignedSource<<7adac7e29d44bc73844d4a4ef4d02d8e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ConcreteRequest, Query } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type GroupDetailsQuery$variables = {
  roomId: string
}
export type GroupDetailsQuery$data = {
  readonly chatRoom:
    | {
        readonly id: string
        readonly image:
          | {
              readonly url: string
            }
          | null
          | undefined
        readonly title: string | null | undefined
        readonly ' $fragmentSpreads': FragmentRefs<'MembersListFragment'>
      }
    | null
    | undefined
}
export type GroupDetailsQuery = {
  response: GroupDetailsQuery$data
  variables: GroupDetailsQuery$variables
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
    v5 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'title',
      storageKey: null,
    },
    v6 = [
      {
        kind: 'Literal',
        name: 'first',
        value: 5,
      },
    ]
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Fragment',
      metadata: null,
      name: 'GroupDetailsQuery',
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
            v4 /*: any*/,
            v5 /*: any*/,
            {
              args: null,
              kind: 'FragmentSpread',
              name: 'MembersListFragment',
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
      name: 'GroupDetailsQuery',
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
            v4 /*: any*/,
            v5 /*: any*/,
            {
              alias: null,
              args: v6 /*: any*/,
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
                              selections: v3 /*: any*/,
                              storageKey: 'image(height:100,width:100)',
                            },
                            {
                              alias: null,
                              args: null,
                              concreteType: 'URLPath',
                              kind: 'LinkedField',
                              name: 'urlPath',
                              plural: false,
                              selections: [
                                {
                                  alias: null,
                                  args: null,
                                  kind: 'ScalarField',
                                  name: 'path',
                                  storageKey: null,
                                },
                                v2 /*: any*/,
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
                          name: 'role',
                          storageKey: null,
                        },
                        v2 /*: any*/,
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
                {
                  alias: null,
                  args: null,
                  kind: 'ScalarField',
                  name: 'totalCount',
                  storageKey: null,
                },
              ],
              storageKey: 'participants(first:5)',
            },
            {
              alias: null,
              args: v6 /*: any*/,
              filters: null,
              handle: 'connection',
              key: 'ChatRoom_participants',
              kind: 'LinkedHandle',
              name: 'participants',
            },
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: 'a17bedc781c37b8ffa4bb803b1acefca',
      id: null,
      metadata: {},
      name: 'GroupDetailsQuery',
      operationKind: 'query',
      text: 'query GroupDetailsQuery(\n  $roomId: ID!\n) {\n  chatRoom(id: $roomId) {\n    id\n    image(width: 144, height: 144) {\n      url\n    }\n    title\n    ...MembersListFragment\n  }\n}\n\nfragment MembersListFragment on ChatRoom {\n  id\n  participants(first: 5) {\n    edges {\n      node {\n        profile {\n          id\n          ...ProfileItemFragment\n        }\n        role\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    totalCount\n  }\n}\n\nfragment ProfileItemFragment on Profile {\n  id\n  name\n  image(width: 100, height: 100) {\n    url\n  }\n  urlPath {\n    path\n    id\n  }\n}\n',
    },
  }
})()

;(node as any).hash = '64b42456eb22d1caa9b7d4432d69ed00'

export default node
