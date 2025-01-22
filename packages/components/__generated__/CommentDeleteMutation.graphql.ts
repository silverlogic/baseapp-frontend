/**
 * @generated SignedSource<<0229842a12c307dba7d6d460d4411782>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ConcreteRequest, Mutation } from 'relay-runtime'

export type CommentDeleteMutation$variables = {
  id: string
}
export type CommentDeleteMutation$data = {
  readonly commentDelete:
    | {
        readonly deletedId: string | null | undefined
        readonly inReplyTo:
          | {
              readonly commentsCount: {
                readonly main: number | null | undefined
                readonly replies: number | null | undefined
                readonly total: number | null | undefined
              }
              readonly id: string
            }
          | null
          | undefined
        readonly target:
          | {
              readonly commentsCount: {
                readonly main: number | null | undefined
                readonly replies: number | null | undefined
                readonly total: number | null | undefined
              }
              readonly id: string
            }
          | null
          | undefined
      }
    | null
    | undefined
}
export type CommentDeleteMutation = {
  response: CommentDeleteMutation$data
  variables: CommentDeleteMutation$variables
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
    },
    v3 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'id',
      storageKey: null,
    },
    v4 = {
      alias: null,
      args: null,
      concreteType: 'CommentsCount',
      kind: 'LinkedField',
      name: 'commentsCount',
      plural: false,
      selections: [
        {
          alias: null,
          args: null,
          kind: 'ScalarField',
          name: 'total',
          storageKey: null,
        },
        {
          alias: null,
          args: null,
          kind: 'ScalarField',
          name: 'main',
          storageKey: null,
        },
        {
          alias: null,
          args: null,
          kind: 'ScalarField',
          name: 'replies',
          storageKey: null,
        },
      ],
      storageKey: null,
    },
    v5 = [v3 /*: any*/, v4 /*: any*/],
    v6 = {
      alias: null,
      args: null,
      concreteType: 'Comment',
      kind: 'LinkedField',
      name: 'inReplyTo',
      plural: false,
      selections: v5 /*: any*/,
      storageKey: null,
    }
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Fragment',
      metadata: null,
      name: 'CommentDeleteMutation',
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: 'CommentDeletePayload',
          kind: 'LinkedField',
          name: 'commentDelete',
          plural: false,
          selections: [
            v2 /*: any*/,
            {
              alias: null,
              args: null,
              concreteType: null,
              kind: 'LinkedField',
              name: 'target',
              plural: false,
              selections: v5 /*: any*/,
              storageKey: null,
            },
            v6 /*: any*/,
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
      name: 'CommentDeleteMutation',
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: 'CommentDeletePayload',
          kind: 'LinkedField',
          name: 'commentDelete',
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
            {
              alias: null,
              args: null,
              concreteType: null,
              kind: 'LinkedField',
              name: 'target',
              plural: false,
              selections: [
                {
                  alias: null,
                  args: null,
                  kind: 'ScalarField',
                  name: '__typename',
                  storageKey: null,
                },
                v3 /*: any*/,
                v4 /*: any*/,
              ],
              storageKey: null,
            },
            v6 /*: any*/,
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: '3f9b66fbbc156f14c485bd1a520b7c8c',
      id: null,
      metadata: {},
      name: 'CommentDeleteMutation',
      operationKind: 'mutation',
      text: 'mutation CommentDeleteMutation(\n  $id: ID!\n) {\n  commentDelete(input: {id: $id}) {\n    deletedId\n    target {\n      __typename\n      id\n      commentsCount {\n        total\n        main\n        replies\n      }\n    }\n    inReplyTo {\n      id\n      commentsCount {\n        total\n        main\n        replies\n      }\n    }\n  }\n}\n',
    },
  }
})()

;(node as any).hash = '453e11c9b3acd12fc26471e671726bfc'

export default node
