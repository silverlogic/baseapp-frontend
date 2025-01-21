/**
 * @generated SignedSource<<e73bab53daca71582ec271b6ddf0abae>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ConcreteRequest, Mutation } from 'relay-runtime'

export type RemoveMemberMutation$variables = {
  id: string
}
export type RemoveMemberMutation$data = {
  readonly profileRemoveMember:
    | {
        readonly deletedId: string | null | undefined
      }
    | null
    | undefined
}
export type RemoveMemberMutation = {
  response: RemoveMemberMutation$data
  variables: RemoveMemberMutation$variables
}

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        defaultValue: null,
        kind: 'LocalArgument',
        name: 'id',
      },
    ],
    v1 = [
      {
        fields: [
          {
            kind: 'Variable',
            name: 'id',
            variableName: 'id',
          },
        ],
        kind: 'ObjectValue',
        name: 'input',
      },
    ],
    v2 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'deletedId',
      storageKey: null,
    }
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Fragment',
      metadata: null,
      name: 'RemoveMemberMutation',
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: 'ProfileRemoveMemberPayload',
          kind: 'LinkedField',
          name: 'profileRemoveMember',
          plural: false,
          selections: [v2 /*: any*/],
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
      name: 'RemoveMemberMutation',
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: 'ProfileRemoveMemberPayload',
          kind: 'LinkedField',
          name: 'profileRemoveMember',
          plural: false,
          selections: [
            v2 /*: any*/,
            {
              alias: null,
              args: null,
              filters: null,
              handle: 'deleteRecord',
              key: '',
              kind: 'ScalarHandle',
              name: 'deletedId',
            },
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: 'b4b97c3dc8c75ccc8ca32251e7227882',
      id: null,
      metadata: {},
      name: 'RemoveMemberMutation',
      operationKind: 'mutation',
      text: 'mutation RemoveMemberMutation(\n  $id: ID!\n) {\n  profileRemoveMember(input: {id: $id}) {\n    deletedId\n  }\n}\n',
    },
  }
})()

;(node as any).hash = '53fc47d54ac67db976b6996a1eba1b8f'

export default node
