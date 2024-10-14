/**
 * @generated SignedSource<<c99ebc31cf2eda3e5514d56aa2bd13ba>>
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
  var v0 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'id',
      storageKey: null,
    },
    v1 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'name',
      storageKey: null,
    },
    v2 = {
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
    v3 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'path',
      storageKey: null,
    }
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
              name: 'profiles',
              plural: true,
              selections: [
                {
                  kind: 'InlineDataFragmentSpread',
                  name: 'ProfileItemFragment',
                  selections: [
                    v0 /*: any*/,
                    v1 /*: any*/,
                    v2 /*: any*/,
                    {
                      alias: null,
                      args: null,
                      concreteType: 'URLPath',
                      kind: 'LinkedField',
                      name: 'urlPath',
                      plural: false,
                      selections: [v3 /*: any*/],
                      storageKey: null,
                    },
                  ],
                  args: null,
                  argumentDefinitions: [],
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
              name: 'profiles',
              plural: true,
              selections: [
                v0 /*: any*/,
                v1 /*: any*/,
                v2 /*: any*/,
                {
                  alias: null,
                  args: null,
                  concreteType: 'URLPath',
                  kind: 'LinkedField',
                  name: 'urlPath',
                  plural: false,
                  selections: [v3 /*: any*/, v0 /*: any*/],
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
      cacheID: 'f45449b4beffd5247f8dd3fcb75e43cd',
      id: null,
      metadata: {},
      name: 'ProfilesListQuery',
      operationKind: 'query',
      text: 'query ProfilesListQuery {\n  me {\n    profiles {\n      ...ProfileItemFragment\n      id\n    }\n    id\n  }\n}\n\nfragment ProfileItemFragment on Profile {\n  id\n  name\n  image(width: 100, height: 100) {\n    url\n  }\n  urlPath {\n    path\n    id\n  }\n}\n',
    },
  }
})()

;(node as any).hash = 'ce9ca315be07ccdb58629abb177bc931'

export default node
