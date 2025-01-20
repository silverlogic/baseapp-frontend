/**
 * @generated SignedSource<<e4fd5346ca5fb02ff9397da3a453f9ac>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ConcreteRequest, Mutation } from 'relay-runtime'

export type RemoveFromProfileInput = {
  clientMutationId?: string | null | undefined
  profileId: string
  userId: string
}
export type RemoveProfileMemberMutation$variables = {
  input: RemoveFromProfileInput
}
export type RemoveProfileMemberMutation$data = {
  readonly removeFromProfile:
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
        readonly profileUserRole:
          | {
              readonly id: string
            }
          | null
          | undefined
      }
    | null
    | undefined
}
export type RemoveProfileMemberMutation = {
  response: RemoveProfileMemberMutation$data
  variables: RemoveProfileMemberMutation$variables
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
        alias: null,
        args: [
          {
            kind: 'Variable',
            name: 'input',
            variableName: 'input',
          },
        ],
        concreteType: 'RemoveFromProfilePayload',
        kind: 'LinkedField',
        name: 'removeFromProfile',
        plural: false,
        selections: [
          {
            alias: null,
            args: null,
            concreteType: 'ProfileUserRole',
            kind: 'LinkedField',
            name: 'profileUserRole',
            plural: false,
            selections: [
              {
                alias: null,
                args: null,
                kind: 'ScalarField',
                name: 'id',
                storageKey: null,
              },
            ],
            storageKey: null,
          },
          {
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
          },
        ],
        storageKey: null,
      },
    ]
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Fragment',
      metadata: null,
      name: 'RemoveProfileMemberMutation',
      selections: v1 /*: any*/,
      type: 'Mutation',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Operation',
      name: 'RemoveProfileMemberMutation',
      selections: v1 /*: any*/,
    },
    params: {
      cacheID: 'da2f3eda89a95da9e19872d4f4dffa1f',
      id: null,
      metadata: {},
      name: 'RemoveProfileMemberMutation',
      operationKind: 'mutation',
      text: 'mutation RemoveProfileMemberMutation(\n  $input: RemoveFromProfileInput!\n) {\n  removeFromProfile(input: $input) {\n    profileUserRole {\n      id\n    }\n    errors {\n      field\n      messages\n    }\n  }\n}\n',
    },
  }
})()

;(node as any).hash = '54458f850fda9d79948e43e408a76ecc'

export default node
