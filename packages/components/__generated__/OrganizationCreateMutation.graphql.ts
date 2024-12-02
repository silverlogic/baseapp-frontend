/**
 * @generated SignedSource<<4aff4a7daa3c996f8ce7a66b522ca1bb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ConcreteRequest, Mutation } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type OrganizationCreateInput = {
  clientMutationId?: string | null | undefined
  name: string
  urlPath?: string | null | undefined
}
export type OrganizationCreateMutation$variables = {
  input: OrganizationCreateInput
}
export type OrganizationCreateMutation$data = {
  readonly organizationCreate:
    | {
        readonly errors:
          | ReadonlyArray<
              | {
                  readonly field: string
                  readonly messages: ReadonlyArray<string>
                }
              | null
              | undefined
            >
          | null
          | undefined
        readonly organization:
          | {
              readonly node:
                | {
                    readonly id: string
                  }
                | null
                | undefined
            }
          | null
          | undefined
        readonly profile:
          | {
              readonly node:
                | {
                    readonly ' $fragmentSpreads': FragmentRefs<'ProfileItemFragment'>
                  }
                | null
                | undefined
            }
          | null
          | undefined
      }
    | null
    | undefined
}
export type OrganizationCreateMutation = {
  response: OrganizationCreateMutation$data
  variables: OrganizationCreateMutation$variables
}

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        defaultValue: null,
        kind: 'LocalArgument',
        name: 'input',
      },
    ],
    v1 = [
      {
        kind: 'Variable',
        name: 'input',
        variableName: 'input',
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
      concreteType: 'OrganizationEdge',
      kind: 'LinkedField',
      name: 'organization',
      plural: false,
      selections: [
        {
          alias: null,
          args: null,
          concreteType: 'Organization',
          kind: 'LinkedField',
          name: 'node',
          plural: false,
          selections: [v2 /*: any*/],
          storageKey: null,
        },
      ],
      storageKey: null,
    },
    v4 = {
      alias: null,
      args: null,
      concreteType: 'ErrorType',
      kind: 'LinkedField',
      name: 'errors',
      plural: true,
      selections: [
        {
          alias: null,
          args: null,
          kind: 'ScalarField',
          name: 'field',
          storageKey: null,
        },
        {
          alias: null,
          args: null,
          kind: 'ScalarField',
          name: 'messages',
          storageKey: null,
        },
      ],
      storageKey: null,
    }
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Fragment',
      metadata: null,
      name: 'OrganizationCreateMutation',
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: 'OrganizationCreatePayload',
          kind: 'LinkedField',
          name: 'organizationCreate',
          plural: false,
          selections: [
            v3 /*: any*/,
            {
              alias: null,
              args: null,
              concreteType: 'ProfileEdge',
              kind: 'LinkedField',
              name: 'profile',
              plural: false,
              selections: [
                {
                  alias: null,
                  args: null,
                  concreteType: 'Profile',
                  kind: 'LinkedField',
                  name: 'node',
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
            v4 /*: any*/,
          ],
          storageKey: null,
        },
      ],
      type: 'Mutation',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Operation',
      name: 'OrganizationCreateMutation',
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: 'OrganizationCreatePayload',
          kind: 'LinkedField',
          name: 'organizationCreate',
          plural: false,
          selections: [
            v3 /*: any*/,
            {
              alias: null,
              args: null,
              concreteType: 'ProfileEdge',
              kind: 'LinkedField',
              name: 'profile',
              plural: false,
              selections: [
                {
                  alias: null,
                  args: null,
                  concreteType: 'Profile',
                  kind: 'LinkedField',
                  name: 'node',
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
                        v2 /*: any*/,
                      ],
                      storageKey: null,
                    },
                  ],
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
            v4 /*: any*/,
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: '695d91d3d1771c63d98fd763396c8088',
      id: null,
      metadata: {},
      name: 'OrganizationCreateMutation',
      operationKind: 'mutation',
      text: 'mutation OrganizationCreateMutation(\n  $input: OrganizationCreateInput!\n) {\n  organizationCreate(input: $input) {\n    organization {\n      node {\n        id\n      }\n    }\n    profile {\n      node {\n        ...ProfileItemFragment\n        id\n      }\n    }\n    errors {\n      field\n      messages\n    }\n  }\n}\n\nfragment ProfileItemFragment on Profile {\n  id\n  name\n  image(width: 100, height: 100) {\n    url\n  }\n  urlPath {\n    path\n    id\n  }\n}\n',
    },
  }
})()

;(node as any).hash = '61fbf11e46dfbf921af0e82290abc5eb'

export default node