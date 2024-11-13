/**
 * @generated SignedSource<<e3ab0bbeed2b047fec7294d7b7574e9b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ConcreteRequest, Query } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type ChatRoomsQuery$variables = Record<PropertyKey, never>
export type ChatRoomsQuery$data = {
  readonly ' $fragmentSpreads': FragmentRefs<'AllProfilesListFragment'>
}
export type ChatRoomsQuery = {
  response: ChatRoomsQuery$data
  variables: ChatRoomsQuery$variables
}

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        kind: 'Literal',
        name: 'first',
        value: 5,
      },
      {
        kind: 'Literal',
        name: 'orderBy',
        value: '-created',
      },
    ],
    v1 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'id',
      storageKey: null,
    }
  return {
    fragment: {
      argumentDefinitions: [],
      kind: 'Fragment',
      metadata: null,
      name: 'ChatRoomsQuery',
      selections: [
        {
          args: null,
          kind: 'FragmentSpread',
          name: 'AllProfilesListFragment',
        },
      ],
      type: 'Query',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: [],
      kind: 'Operation',
      name: 'ChatRoomsQuery',
      selections: [
        {
          alias: null,
          args: v0 /*: any*/,
          concreteType: 'ProfileConnection',
          kind: 'LinkedField',
          name: 'allProfiles',
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
              concreteType: 'ProfileEdge',
              kind: 'LinkedField',
              name: 'edges',
              plural: true,
              selections: [
                {
                  alias: null,
                  args: null,
                  concreteType: 'Profile',
                  kind: 'LinkedField',
                  name: 'node',
                  plural: false,
                  selections: [
                    v1 /*: any*/,
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
                      name: 'name',
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: [
                        {
                          kind: 'Literal',
                          name: 'height',
                          value: 48,
                        },
                        {
                          kind: 'Literal',
                          name: 'width',
                          value: 48,
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
                      storageKey: 'image(height:48,width:48)',
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
                        v1 /*: any*/,
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
          ],
          storageKey: 'allProfiles(first:5,orderBy:"-created")',
        },
        {
          alias: null,
          args: v0 /*: any*/,
          filters: ['orderBy', 'q'],
          handle: 'connection',
          key: 'AllProfilesListFragment_allProfiles',
          kind: 'LinkedHandle',
          name: 'allProfiles',
        },
      ],
    },
    params: {
      cacheID: '27357f13f436161f8628939f6fd83654',
      id: null,
      metadata: {},
      name: 'ChatRoomsQuery',
      operationKind: 'query',
      text: 'query ChatRoomsQuery {\n  ...AllProfilesListFragment\n}\n\nfragment AllProfilesListFragment on Query {\n  allProfiles(first: 5, orderBy: "-created") {\n    totalCount\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      node {\n        id\n        pk\n        name\n        image(width: 48, height: 48) {\n          url\n        }\n        urlPath {\n          path\n          id\n        }\n        __typename\n      }\n      cursor\n    }\n  }\n}\n',
    },
  }
})()

;(node as any).hash = '6c185924484fe6f3c8fd327ae065ec6d'

export default node
