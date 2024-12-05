/**
 * @generated SignedSource<<f3527d4c54b58cbec40354c7eedb4f9f>>
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
              readonly ' $fragmentSpreads': FragmentRefs<'ProfileItemInlineFragment'>
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
      cacheID: 'a85f1b3f866dce00c22e0195d8f91a9a',
      id: null,
      metadata: {},
      name: 'UserProfileQuery',
      operationKind: 'query',
      text: 'query UserProfileQuery {\n  me {\n    profile {\n      ...ProfileItemInlineFragment\n      id\n    }\n    id\n  }\n}\n\nfragment ProfileItemInlineFragment on Profile {\n  id\n  name\n  image(width: 100, height: 100) {\n    url\n  }\n  urlPath {\n    path\n    id\n  }\n}\n',
    },
  }
})()

;(node as any).hash = 'fe5b9485e3ef19ae48b2142a3c72c7f7'

export default node
