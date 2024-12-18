/**
 * @generated SignedSource<<826dab81a76b2c242dd4287f68e97aa7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ConcreteRequest, Query } from 'relay-runtime'

export type AddProfilePopoverUserQuery$variables = Record<PropertyKey, never>
export type AddProfilePopoverUserQuery$data = {
  readonly me:
    | {
        readonly canAdd: boolean | null | undefined
        readonly id: string
      }
    | null
    | undefined
}
export type AddProfilePopoverUserQuery = {
  response: AddProfilePopoverUserQuery$data
  variables: AddProfilePopoverUserQuery$variables
}

const node: ConcreteRequest = (function () {
  var v0 = [
    {
      alias: null,
      args: null,
      concreteType: 'User',
      kind: 'LinkedField',
      name: 'me',
      plural: false,
      selections: [
        {
          alias: 'canAdd',
          args: [
            {
              kind: 'Literal',
              name: 'perm',
              value: 'organizations.add_organization',
            },
          ],
          kind: 'ScalarField',
          name: 'hasPerm',
          storageKey: 'hasPerm(perm:"organizations.add_organization")',
        },
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
  ]
  return {
    fragment: {
      argumentDefinitions: [],
      kind: 'Fragment',
      metadata: null,
      name: 'AddProfilePopoverUserQuery',
      selections: v0 /*: any*/,
      type: 'Query',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: [],
      kind: 'Operation',
      name: 'AddProfilePopoverUserQuery',
      selections: v0 /*: any*/,
    },
    params: {
      cacheID: '87aa4dfa44991de604d1fec2587ed858',
      id: null,
      metadata: {},
      name: 'AddProfilePopoverUserQuery',
      operationKind: 'query',
      text: 'query AddProfilePopoverUserQuery {\n  me {\n    canAdd: hasPerm(perm: "organizations.add_organization")\n    id\n  }\n}\n',
    },
  }
})()

;(node as any).hash = '26d662ddabbbf711436626f9ec735331'

export default node
