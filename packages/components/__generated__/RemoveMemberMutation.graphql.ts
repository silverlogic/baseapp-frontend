/**
 * @generated SignedSource<<9ace20e318d24c5254a3faf22e301517>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ConcreteRequest } from 'relay-runtime'

export type ProfileRemoveMemberInput = {
  clientMutationId?: string | null | undefined
  profileId: string
  userId: string
}
export type RemoveMemberMutation$variables = {
  input: ProfileRemoveMemberInput
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
      cacheID: '7ede42a17cf2d60398c7a5019de5f013',
      id: null,
      metadata: {},
      name: 'RemoveMemberMutation',
      operationKind: 'mutation',
      text: 'mutation RemoveMemberMutation(\n  $input: ProfileRemoveMemberInput!\n) {\n  profileRemoveMember(input: $input) {\n    deletedId\n  }\n}\n',
    },
  }
})()

;(node as any).hash = '4426831487fa708c1e351d2c7608e1f8'

export default node
