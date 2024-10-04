/**
 * @generated SignedSource<<6a78928961965b4807c4cd830f7dd703>>
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
      cacheID: '4a09b56bb39794e18b189981877fa031',
      id: null,
      metadata: {},
      name: 'UserProfileQuery',
      operationKind: 'query',
      text: 'query UserProfileQuery {\n  me {\n    profile {\n      ...ProfileItemFragment\n      id\n    }\n    id\n  }\n}\n\nfragment ProfileItemFragment on Profile {\n  id\n  name\n  image(width: 100, height: 100) {\n    url\n  }\n  urlPath {\n    path\n    id\n  }\n}\n',
    },
  }
})()

;(node as any).hash = '8febc9fbb812c3456d12d0ff6a69c90a'

export default node
