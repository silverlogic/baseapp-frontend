/**
 * @generated SignedSource<<cba84f59464f3dadd929acc641345550>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ConcreteRequest, Query } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type ChatRoomParticipantsPaginationQuery$variables = {
  count?: number | null | undefined
  cursor?: string | null | undefined
  id: string
}
export type ChatRoomParticipantsPaginationQuery$data = {
  readonly node:
    | {
        readonly ' $fragmentSpreads': FragmentRefs<'MembersListFragment'>
      }
    | null
    | undefined
}
export type ChatRoomParticipantsPaginationQuery = {
  response: ChatRoomParticipantsPaginationQuery$data
  variables: ChatRoomParticipantsPaginationQuery$variables
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
      name: 'ChatRoomParticipantsPaginationQuery',
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
      name: 'ChatRoomParticipantsPaginationQuery',
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
                                    v3 /*: any*/,
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
                            v3 /*: any*/,
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
                    {
                      alias: null,
                      args: null,
                      kind: 'ScalarField',
                      name: 'totalCount',
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
                  key: 'ChatRoom_participants',
                  kind: 'LinkedHandle',
                  name: 'participants',
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
      cacheID: '8962f61a90250e6d4d8d42f1dc7cc320',
      id: null,
      metadata: {},
      name: 'ChatRoomParticipantsPaginationQuery',
      operationKind: 'query',
      text: 'query ChatRoomParticipantsPaginationQuery(\n  $count: Int = 5\n  $cursor: String\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...MembersListFragment_1G22uz\n    id\n  }\n}\n\nfragment MembersListFragment_1G22uz on ChatRoom {\n  id\n  participants(first: $count, after: $cursor) {\n    edges {\n      node {\n        profile {\n          id\n          ...ProfileItemFragment\n        }\n        role\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    totalCount\n  }\n}\n\nfragment ProfileItemFragment on Profile {\n  id\n  name\n  image(width: 100, height: 100) {\n    url\n  }\n  urlPath {\n    path\n    id\n  }\n}\n',
    },
  }
})()

;(node as any).hash = '4aad0edd43aec1e87daea42f647a59d3'

export default node
