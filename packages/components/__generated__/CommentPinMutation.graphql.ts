/**
 * @generated SignedSource<<bc407c238257728d9f960d3a74b7dcd5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime'
export type CommentPinMutation$variables = {
  id: string
}
export type CommentPinMutation$data = {
  readonly commentPin:
    | {
        readonly comment:
          | {
              readonly id: string
              readonly isPinned: boolean
            }
          | null
          | undefined
      }
    | null
    | undefined
}
export type CommentPinMutation = {
  response: CommentPinMutation$data
  variables: CommentPinMutation$variables
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
        alias: null,
        args: [
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
        concreteType: 'CommentPinPayload',
        kind: 'LinkedField',
        name: 'commentPin',
        plural: false,
        selections: [
          {
            alias: null,
            args: null,
            concreteType: 'Comment',
            kind: 'LinkedField',
            name: 'comment',
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
                name: 'isPinned',
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
      name: 'CommentPinMutation',
      selections: v1 /*: any*/,
      type: 'Mutation',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Operation',
      name: 'CommentPinMutation',
      selections: v1 /*: any*/,
    },
    params: {
      cacheID: 'f52c4201ceaafbbba2ed048338c7b9d6',
      id: null,
      metadata: {},
      name: 'CommentPinMutation',
      operationKind: 'mutation',
      text: 'mutation CommentPinMutation(\n  $id: ID!\n) {\n  commentPin(input: {id: $id}) {\n    comment {\n      id\n      isPinned\n    }\n  }\n}\n',
    },
  }
})()

;(node as any).hash = '26f8620978ac19cc3f24ec49176a04b6'

export default node
