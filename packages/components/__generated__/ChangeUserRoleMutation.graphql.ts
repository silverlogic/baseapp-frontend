/**
 * @generated SignedSource<<00ac20c2f815695838f6b177bf707f47>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ConcreteRequest, Mutation } from 'relay-runtime'

export type ProfileRoles = 'ADMIN' | 'MANAGER' | '%future added value'
export type RoleUpdateInput = {
  clientMutationId?: string | null | undefined
  profileId: string
  roleType?: ProfileRoles | null | undefined
  userId: string
}
export type ChangeUserRoleMutation$variables = {
  input: RoleUpdateInput
}
export type ChangeUserRoleMutation$data = {
  readonly roleUpdate:
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
              readonly role: ProfileRoles | null | undefined
            }
          | null
          | undefined
      }
    | null
    | undefined
}
export type ChangeUserRoleMutation = {
  response: ChangeUserRoleMutation$data
  variables: ChangeUserRoleMutation$variables
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
        concreteType: 'RoleUpdatePayload',
        kind: 'LinkedField',
        name: 'roleUpdate',
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
              {
                alias: null,
                args: null,
                kind: 'ScalarField',
                name: 'role',
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
      name: 'ChangeUserRoleMutation',
      selections: v1 /*: any*/,
      type: 'Mutation',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Operation',
      name: 'ChangeUserRoleMutation',
      selections: v1 /*: any*/,
    },
    params: {
      cacheID: '0812fd0c1b25d6c1e13bf24d1d4ffaaa',
      id: null,
      metadata: {},
      name: 'ChangeUserRoleMutation',
      operationKind: 'mutation',
      text: 'mutation ChangeUserRoleMutation(\n  $input: RoleUpdateInput!\n) {\n  roleUpdate(input: $input) {\n    profileUserRole {\n      id\n      role\n    }\n    errors {\n      field\n      messages\n    }\n  }\n}\n',
    },
  }
})()

;(node as any).hash = '28b8a8c1bd07a6fc939f51cf4ccbd758'

export default node
