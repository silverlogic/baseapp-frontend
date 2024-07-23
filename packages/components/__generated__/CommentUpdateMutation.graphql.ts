/**
 * @generated SignedSource<<7fd75b53b328f4fea1863caebf03f496>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'
export type CommentUpdateInput = {
  body: string
  clientMutationId?: string | null | undefined
  id: string
}
export type CommentUpdateMutation$variables = {
  input: CommentUpdateInput
}
export type CommentUpdateMutation$data = {
  readonly commentUpdate:
    | {
        readonly comment:
          | {
              readonly body: string | null | undefined
              readonly id: string
              readonly ' $fragmentSpreads': FragmentRefs<'CommentsList_comments'>
            }
          | null
          | undefined
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
      }
    | null
    | undefined
}
export type CommentUpdateMutation = {
  response: CommentUpdateMutation$data
  variables: CommentUpdateMutation$variables
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
      kind: 'ScalarField',
      name: 'body',
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
    },
    v5 = [
      {
        alias: null,
        args: null,
        kind: 'ScalarField',
        name: 'total',
        storageKey: null,
      },
    ],
    v6 = {
      alias: null,
      args: null,
      concreteType: 'CommentsCount',
      kind: 'LinkedField',
      name: 'commentsCount',
      plural: false,
      selections: v5 /*: any*/,
      storageKey: null,
    },
    v7 = [
      {
        kind: 'Literal',
        name: 'first',
        value: 5,
      },
      {
        kind: 'Literal',
        name: 'orderBy',
        value: '-is_pinned,-created',
      },
    ],
    v8 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'pk',
      storageKey: null,
    }
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Fragment',
      metadata: null,
      name: 'CommentUpdateMutation',
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: 'CommentUpdatePayload',
          kind: 'LinkedField',
          name: 'commentUpdate',
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
                v2 /*: any*/,
                v3 /*: any*/,
                {
                  args: null,
                  kind: 'FragmentSpread',
                  name: 'CommentsList_comments',
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
      name: 'CommentUpdateMutation',
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: 'CommentUpdatePayload',
          kind: 'LinkedField',
          name: 'commentUpdate',
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
                v2 /*: any*/,
                v3 /*: any*/,
                {
                  kind: 'InlineFragment',
                  selections: [
                    v6 /*: any*/,
                    {
                      alias: null,
                      args: v7 /*: any*/,
                      concreteType: 'CommentConnection',
                      kind: 'LinkedField',
                      name: 'comments',
                      plural: false,
                      selections: [
                        {
                          alias: null,
                          args: null,
                          concreteType: 'PageInfo',
                          kind: 'LinkedField',
                          name: 'pageInfo',
                          plural: false,
                          selections: [
                            {
                              alias: null,
                              args: null,
                              kind: 'ScalarField',
                              name: 'endCursor',
                              storageKey: null,
                            },
                            {
                              alias: null,
                              args: null,
                              kind: 'ScalarField',
                              name: 'hasNextPage',
                              storageKey: null,
                            },
                          ],
                          storageKey: null,
                        },
                        {
                          alias: null,
                          args: null,
                          concreteType: 'CommentEdge',
                          kind: 'LinkedField',
                          name: 'edges',
                          plural: true,
                          selections: [
                            {
                              alias: null,
                              args: null,
                              concreteType: 'Comment',
                              kind: 'LinkedField',
                              name: 'node',
                              plural: false,
                              selections: [
                                v2 /*: any*/,
                                {
                                  alias: null,
                                  args: null,
                                  kind: 'ScalarField',
                                  name: 'isPinned',
                                  storageKey: null,
                                },
                                v8 /*: any*/,
                                v3 /*: any*/,
                                {
                                  alias: null,
                                  args: null,
                                  concreteType: 'User',
                                  kind: 'LinkedField',
                                  name: 'user',
                                  plural: false,
                                  selections: [
                                    v2 /*: any*/,
                                    v8 /*: any*/,
                                    {
                                      alias: null,
                                      args: null,
                                      kind: 'ScalarField',
                                      name: 'fullName',
                                      storageKey: null,
                                    },
                                    {
                                      alias: null,
                                      args: null,
                                      kind: 'ScalarField',
                                      name: 'firstName',
                                      storageKey: null,
                                    },
                                    {
                                      alias: null,
                                      args: null,
                                      kind: 'ScalarField',
                                      name: 'lastName',
                                      storageKey: null,
                                    },
                                    {
                                      alias: null,
                                      args: [
                                        {
                                          kind: 'Literal',
                                          name: 'height',
                                          value: 50,
                                        },
                                        {
                                          kind: 'Literal',
                                          name: 'width',
                                          value: 50,
                                        },
                                      ],
                                      concreteType: 'File',
                                      kind: 'LinkedField',
                                      name: 'avatar',
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
                                      storageKey: 'avatar(height:50,width:50)',
                                    },
                                  ],
                                  storageKey: null,
                                },
                                {
                                  alias: null,
                                  args: null,
                                  kind: 'ScalarField',
                                  name: 'created',
                                  storageKey: null,
                                },
                                v6 /*: any*/,
                                {
                                  alias: 'canChange',
                                  args: [
                                    {
                                      kind: 'Literal',
                                      name: 'perm',
                                      value: 'change',
                                    },
                                  ],
                                  kind: 'ScalarField',
                                  name: 'hasPerm',
                                  storageKey: 'hasPerm(perm:"change")',
                                },
                                {
                                  alias: 'canDelete',
                                  args: [
                                    {
                                      kind: 'Literal',
                                      name: 'perm',
                                      value: 'delete',
                                    },
                                  ],
                                  kind: 'ScalarField',
                                  name: 'hasPerm',
                                  storageKey: 'hasPerm(perm:"delete")',
                                },
                                {
                                  alias: 'canReport',
                                  args: [
                                    {
                                      kind: 'Literal',
                                      name: 'perm',
                                      value: 'report',
                                    },
                                  ],
                                  kind: 'ScalarField',
                                  name: 'hasPerm',
                                  storageKey: 'hasPerm(perm:"report")',
                                },
                                {
                                  alias: 'canPin',
                                  args: [
                                    {
                                      kind: 'Literal',
                                      name: 'perm',
                                      value: 'pin',
                                    },
                                  ],
                                  kind: 'ScalarField',
                                  name: 'hasPerm',
                                  storageKey: 'hasPerm(perm:"pin")',
                                },
                                {
                                  alias: null,
                                  args: null,
                                  kind: 'ScalarField',
                                  name: '__typename',
                                  storageKey: null,
                                },
                                {
                                  kind: 'InlineFragment',
                                  selections: [
                                    {
                                      alias: null,
                                      args: null,
                                      concreteType: 'ReactionsCount',
                                      kind: 'LinkedField',
                                      name: 'reactionsCount',
                                      plural: false,
                                      selections: v5 /*: any*/,
                                      storageKey: null,
                                    },
                                    {
                                      alias: null,
                                      args: null,
                                      concreteType: 'Reaction',
                                      kind: 'LinkedField',
                                      name: 'myReaction',
                                      plural: false,
                                      selections: [
                                        v2 /*: any*/,
                                        {
                                          alias: null,
                                          args: null,
                                          kind: 'ScalarField',
                                          name: 'reactionType',
                                          storageKey: null,
                                        },
                                      ],
                                      storageKey: null,
                                    },
                                  ],
                                  type: 'ReactionsInterface',
                                  abstractKey: '__isReactionsInterface',
                                },
                                {
                                  kind: 'TypeDiscriminator',
                                  abstractKey: '__isCommentsInterface',
                                },
                              ],
                              storageKey: null,
                            },
                            {
                              alias: null,
                              args: null,
                              kind: 'ScalarField',
                              name: 'cursor',
                              storageKey: null,
                            },
                          ],
                          storageKey: null,
                        },
                      ],
                      storageKey: 'comments(first:5,orderBy:"-is_pinned,-created")',
                    },
                    {
                      alias: null,
                      args: v7 /*: any*/,
                      filters: [],
                      handle: 'connection',
                      key: 'CommentsList_comments',
                      kind: 'LinkedHandle',
                      name: 'comments',
                    },
                  ],
                  type: 'CommentsInterface',
                  abstractKey: '__isCommentsInterface',
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
      cacheID: '06fa652d5c258bf973ef5e70dcce6433',
      id: null,
      metadata: {},
      name: 'CommentUpdateMutation',
      operationKind: 'mutation',
      text: 'mutation CommentUpdateMutation(\n  $input: CommentUpdateInput!\n) {\n  commentUpdate(input: $input) {\n    comment {\n      id\n      body\n      ...CommentsList_comments\n    }\n    errors {\n      field\n      messages\n    }\n  }\n}\n\nfragment CommentItem_comment on Comment {\n  id\n  pk\n  body\n  isPinned\n  user {\n    id\n    pk\n    fullName\n    firstName\n    lastName\n    avatar(width: 50, height: 50) {\n      url\n    }\n  }\n  created\n  commentsCount {\n    total\n  }\n  canChange: hasPerm(perm: "change")\n  canDelete: hasPerm(perm: "delete")\n  canReport: hasPerm(perm: "report")\n  canPin: hasPerm(perm: "pin")\n  ...ReactionButton_target\n  ...CommentItem_target\n}\n\nfragment CommentItem_target on CommentsInterface {\n  __isCommentsInterface: __typename\n  id\n}\n\nfragment CommentsList_comments on CommentsInterface {\n  __isCommentsInterface: __typename\n  id\n  commentsCount {\n    total\n  }\n  comments(first: 5, orderBy: "-is_pinned,-created") {\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n    edges {\n      node {\n        id\n        isPinned\n        ...CommentItem_comment\n        __typename\n      }\n      cursor\n    }\n  }\n  ...CommentItem_target\n}\n\nfragment ReactionButton_target on ReactionsInterface {\n  __isReactionsInterface: __typename\n  id\n  reactionsCount {\n    total\n  }\n  myReaction {\n    id\n    reactionType\n  }\n}\n',
    },
  }
})()

;(node as any).hash = 'a65012ae50ff01b71fc9c930881f0c1a'

export default node
