/**
 * @generated SignedSource<<4286df78f7707f1b714efcc0e997c7a2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ConcreteRequest, Query } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type BlockButtonWithDialogWithQuery$variables = Record<PropertyKey, never>
export type BlockButtonWithDialogWithQuery$data = {
  readonly target:
    | {
        readonly ' $fragmentSpreads': FragmentRefs<'BlockToggleFragment'>
      }
    | null
    | undefined
}
export type BlockButtonWithDialogWithQuery = {
  response: BlockButtonWithDialogWithQuery$data
  variables: BlockButtonWithDialogWithQuery$variables
}

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        kind: 'Literal',
        name: 'id',
        value: 'test-id',
      },
    ],
    v1 = {
      enumValues: null,
      nullable: false,
      plural: false,
      type: 'String',
    }
  return {
    fragment: {
      argumentDefinitions: [],
      kind: 'Fragment',
      metadata: null,
      name: 'BlockButtonWithDialogWithQuery',
      selections: [
        {
          alias: 'target',
          args: v0 /*: any*/,
          concreteType: null,
          kind: 'LinkedField',
          name: 'node',
          plural: false,
          selections: [
            {
              args: null,
              kind: 'FragmentSpread',
              name: 'BlockToggleFragment',
            },
          ],
          storageKey: 'node(id:"test-id")',
        },
      ],
      type: 'Query',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: [],
      kind: 'Operation',
      name: 'BlockButtonWithDialogWithQuery',
      selections: [
        {
          alias: 'target',
          args: v0 /*: any*/,
          concreteType: null,
          kind: 'LinkedField',
          name: 'node',
          plural: false,
          selections: [
            {
              alias: null,
              args: null,
              kind: 'ScalarField',
              name: '__typename',
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: 'ScalarField',
              name: 'id',
              storageKey: null,
            },
            {
              kind: 'InlineFragment',
              selections: [
                {
                  alias: null,
                  args: null,
                  kind: 'ScalarField',
                  name: 'isBlockedByMe',
                  storageKey: null,
                },
                {
                  kind: 'InlineFragment',
                  selections: [
                    {
                      alias: null,
                      args: null,
                      kind: 'ScalarField',
                      name: 'name',
                      storageKey: null,
                    },
                  ],
                  type: 'Profile',
                  abstractKey: null,
                },
              ],
              type: 'BlocksInterface',
              abstractKey: '__isBlocksInterface',
            },
          ],
          storageKey: 'node(id:"test-id")',
        },
      ],
    },
    params: {
      cacheID: '46bccdb0823872000701422556204141',
      id: null,
      metadata: {
        relayTestingSelectionTypeInfo: {
          target: {
            enumValues: null,
            nullable: true,
            plural: false,
            type: 'Node',
          },
          'target.__isBlocksInterface': v1 /*: any*/,
          'target.__typename': v1 /*: any*/,
          'target.id': {
            enumValues: null,
            nullable: false,
            plural: false,
            type: 'ID',
          },
          'target.isBlockedByMe': {
            enumValues: null,
            nullable: true,
            plural: false,
            type: 'Boolean',
          },
          'target.name': {
            enumValues: null,
            nullable: true,
            plural: false,
            type: 'String',
          },
        },
      },
      name: 'BlockButtonWithDialogWithQuery',
      operationKind: 'query',
      text: 'query BlockButtonWithDialogWithQuery {\n  target: node(id: "test-id") {\n    __typename\n    ...BlockToggleFragment\n    id\n  }\n}\n\nfragment BlockToggleFragment on BlocksInterface {\n  __isBlocksInterface: __typename\n  id\n  isBlockedByMe\n  ... on Profile {\n    id\n    name\n  }\n}\n',
    },
  }
})()

;(node as any).hash = 'f5b38828572bb07bae357ef2ff7a231e'

export default node
