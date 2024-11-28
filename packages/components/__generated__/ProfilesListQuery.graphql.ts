/**
 * @generated SignedSource<<5f1b4c7974ce16c3ce1eff8e23f1c2a6>>
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
                  readonly ' $fragmentSpreads': FragmentRefs<'ProfileItemInlineFragment'>
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
    v2 = [
      {
        alias: null,
        args: null,
        kind: 'ScalarField',
        name: 'url',
        storageKey: null,
      },
    ],
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
                  name: 'ProfileItemInlineFragment',
                  selections: [
                    v0 /*: any*/,
                    v1 /*: any*/,
                    {
                      alias: null,
                      args: [
                        {
                          kind: 'Variable',
                          name: 'height',
                          variableName: 'avatarSize',
                        },
                        {
                          kind: 'Variable',
                          name: 'width',
                          variableName: 'avatarSize',
                        },
                      ],
                      concreteType: 'File',
                      kind: 'LinkedField',
                      name: 'image',
                      plural: false,
                      selections: v2 /*: any*/,
                      storageKey: null,
                    },
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
                  argumentDefinitions: [
                    {
                      defaultValue: 100,
                      kind: 'LocalArgument',
                      name: 'avatarSize',
                    },
                  ],
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
                  selections: v2 /*: any*/,
                  storageKey: 'image(height:100,width:100)',
                },
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
      cacheID: '52d75d6be606957b650bc2b8ef5c5abf',
      id: null,
      metadata: {},
      name: 'ProfilesListQuery',
      operationKind: 'query',
      text: 'query ProfilesListQuery {\n  me {\n    profiles {\n      ...ProfileItemInlineFragment\n      id\n    }\n    id\n  }\n}\n\nfragment ProfileItemInlineFragment on Profile {\n  id\n  name\n  image(width: 100, height: 100) {\n    url\n  }\n  urlPath {\n    path\n    id\n  }\n}\n',
    },
  }
})()

;(node as any).hash = 'e33762cabf29142fa4a43f70fa2f0640'

export default node
