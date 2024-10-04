/**
 * @generated SignedSource<<124c26fcff486c0b0fadc68743f8b399>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ConcreteRequest, Query } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type ProfilesListQuery$variables = Record<PropertyKey, never>
export type ProfilesListQuery$data = {
  readonly me:
    | {
        readonly profile:
          | {
              readonly ' $fragmentSpreads': FragmentRefs<'ProfileItemFragment'>
            }
          | null
          | undefined
        readonly profiles:
          | ReadonlyArray<
              | {
                  readonly ' $fragmentSpreads': FragmentRefs<'ProfileItemFragment'>
                }
              | null
              | undefined
            >
          | null
          | undefined
      }
    | null
    | undefined
}
export type ProfilesListQuery = {
  response: ProfilesListQuery$data
  variables: ProfilesListQuery$variables
}

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        args: null,
        kind: 'FragmentSpread',
        name: 'ProfileItemFragment',
      },
    ],
    v1 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'id',
      storageKey: null,
    },
    v2 = [
      v1 /*: any*/,
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
          v1 /*: any*/,
        ],
        storageKey: null,
      },
    ]
  return {
    fragment: {
      argumentDefinitions: [],
      kind: 'Fragment',
      metadata: null,
      name: 'ProfilesListQuery',
      selections: [
        {
          alias: null,
          args: null,
          concreteType: 'User',
          kind: 'LinkedField',
          name: 'me',
          plural: false,
          selections: [
            {
              alias: null,
              args: null,
              concreteType: 'Profile',
              kind: 'LinkedField',
              name: 'profile',
              plural: false,
              selections: v0 /*: any*/,
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              concreteType: 'Profile',
              kind: 'LinkedField',
              name: 'profiles',
              plural: true,
              selections: v0 /*: any*/,
              storageKey: null,
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
      argumentDefinitions: [],
      kind: 'Operation',
      name: 'ProfilesListQuery',
      selections: [
        {
          alias: null,
          args: null,
          concreteType: 'User',
          kind: 'LinkedField',
          name: 'me',
          plural: false,
          selections: [
            {
              alias: null,
              args: null,
              concreteType: 'Profile',
              kind: 'LinkedField',
              name: 'profile',
              plural: false,
              selections: v2 /*: any*/,
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              concreteType: 'Profile',
              kind: 'LinkedField',
              name: 'profiles',
              plural: true,
              selections: v2 /*: any*/,
              storageKey: null,
            },
            v1 /*: any*/,
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: 'd8422aead28da93cfa4944322170e38c',
      id: null,
      metadata: {},
      name: 'ProfilesListQuery',
      operationKind: 'query',
      text: 'query ProfilesListQuery {\n  me {\n    profile {\n      ...ProfileItemFragment\n      id\n    }\n    profiles {\n      ...ProfileItemFragment\n      id\n    }\n    id\n  }\n}\n\nfragment ProfileItemFragment on Profile {\n  id\n  name\n  image(width: 100, height: 100) {\n    url\n  }\n  urlPath {\n    path\n    id\n  }\n}\n',
    },
  }
})()

;(node as any).hash = '609ee229be5e17e5e2f24bef4472b6e9'

export default node
