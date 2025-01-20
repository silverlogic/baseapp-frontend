/**
 * @generated SignedSource<<bb1d958d5fafce6ac6319f500e832e5c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ConcreteRequest, Mutation } from 'relay-runtime'

export type RemoveProfileMemberInput = {
  clientMutationId?: string | null | undefined
  profileId: string
  userId: string
}
export type RemoveMemberMutation$variables = {
  input: RemoveProfileMemberInput
}
export type RemoveMemberMutation$data = {
  readonly removeProfileMember:
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
          concreteType: 'RemoveProfileMemberPayload',
          kind: 'LinkedField',
          name: 'removeProfileMember',
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
          concreteType: 'RemoveProfileMemberPayload',
          kind: 'LinkedField',
          name: 'removeProfileMember',
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
      cacheID: 'd07a458f8f2b5da249f43e482db25d92',
      id: null,
      metadata: {},
      name: 'RemoveMemberMutation',
      operationKind: 'mutation',
      text: 'mutation RemoveMemberMutation(\n  $input: RemoveProfileMemberInput!\n) {\n  removeProfileMember(input: $input) {\n    deletedId\n  }\n}\n',
    },
  }
})()

;(node as any).hash = 'a88f1b07f50559b62b9a2ab49301719b'

export default node
