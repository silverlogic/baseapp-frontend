/**
 * @generated SignedSource<<c3f8a3348302e4afe0415e3dd072c7a2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ConcreteRequest, Query } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type UserProfileQuery$variables = Record<PropertyKey, never>
export type UserProfileQuery$data = {
  readonly me:
    | {
        readonly profile:
          | {
              readonly id: string
              readonly ' $fragmentSpreads': FragmentRefs<'ProfileItemFragment'>
            }
          | null
          | undefined
      }
    | null
    | undefined
}
export type UserProfileQuery = {
  response: UserProfileQuery$data
  variables: UserProfileQuery$variables
}

const node: ConcreteRequest = (function () {
  var v0 = {
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
      name: 'UserProfileQuery',
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
              selections: [
                v0 /*: any*/,
                {
                  args: null,
                  kind: 'FragmentSpread',
                  name: 'ProfileItemFragment',
                },
              ],
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
      name: 'UserProfileQuery',
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
              selections: [
                v0 /*: any*/,
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
                    v0 /*: any*/,
                  ],
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
            v0 /*: any*/,
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: 'bf91f0acfc2126f408b4cbe09838bbda',
      id: null,
      metadata: {},
      name: 'UserProfileQuery',
      operationKind: 'query',
      text: 'query UserProfileQuery {\n  me {\n    profile {\n      id\n      ...ProfileItemFragment\n    }\n    id\n  }\n}\n\nfragment ProfileItemFragment on Profile {\n  id\n  name\n  image(width: 100, height: 100) {\n    url\n  }\n  urlPath {\n    path\n    id\n  }\n}\n',
    },
  }
})()

;(node as any).hash = '66224b5e2a7b852c882a5c0b76571987'

export default node
