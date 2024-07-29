/**
 * @generated SignedSource<<b4000ebb71fe63a9eda602a5297295c5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'
export type CommentsListWithQuery$variables = Record<PropertyKey, never>
export type CommentsListWithQuery$data = {
  readonly target:
    | {
        readonly ' $fragmentSpreads': FragmentRefs<'CommentsList_comments'>
      }
    | null
    | undefined
}
export type CommentsListWithQuery = {
  response: CommentsListWithQuery$data
  variables: CommentsListWithQuery$variables
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
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: '__typename',
      storageKey: null,
    },
    v2 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'id',
      storageKey: null,
    },
    v3 = [
      {
        alias: null,
        args: null,
        kind: 'ScalarField',
        name: 'total',
        storageKey: null,
      },
    ],
    v4 = {
      alias: null,
      args: null,
      concreteType: 'CommentsCount',
      kind: 'LinkedField',
      name: 'commentsCount',
      plural: false,
      selections: v3 /*: any*/,
      storageKey: null,
    },
    v5 = [
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
    v6 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'pk',
      storageKey: null,
    },
    v7 = {
      enumValues: null,
      nullable: false,
      plural: false,
      type: 'String',
    },
    v8 = {
      enumValues: null,
      nullable: true,
      plural: false,
      type: 'String',
    },
    v9 = {
      enumValues: null,
      nullable: true,
      plural: false,
      type: 'Boolean',
    },
    v10 = {
      enumValues: null,
      nullable: false,
      plural: false,
      type: 'CommentsCount',
    },
    v11 = {
      enumValues: null,
      nullable: true,
      plural: false,
      type: 'Int',
    },
    v12 = {
      enumValues: null,
      nullable: false,
      plural: false,
      type: 'ID',
    },
    v13 = {
      enumValues: null,
      nullable: false,
      plural: false,
      type: 'Boolean',
    },
    v14 = {
      enumValues: null,
      nullable: false,
      plural: false,
      type: 'Int',
    }
  return {
    fragment: {
      argumentDefinitions: [],
      kind: 'Fragment',
      metadata: null,
      name: 'CommentsListWithQuery',
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
              name: 'CommentsList_comments',
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
      name: 'CommentsListWithQuery',
      selections: [
        {
          alias: 'target',
          args: v0 /*: any*/,
          concreteType: null,
          kind: 'LinkedField',
          name: 'node',
          plural: false,
          selections: [
            v1 /*: any*/,
            v2 /*: any*/,
            {
              kind: 'InlineFragment',
              selections: [
                v4 /*: any*/,
                {
                  alias: null,
                  args: v5 /*: any*/,
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
                            v6 /*: any*/,
                            {
                              alias: null,
                              args: null,
                              kind: 'ScalarField',
                              name: 'body',
                              storageKey: null,
                            },
                            {
                              alias: null,
                              args: null,
                              concreteType: 'User',
                              kind: 'LinkedField',
                              name: 'user',
                              plural: false,
                              selections: [
                                v2 /*: any*/,
                                v6 /*: any*/,
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
                            v4 /*: any*/,
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
                            v1 /*: any*/,
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
                                  selections: v3 /*: any*/,
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
                  args: v5 /*: any*/,
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
          storageKey: 'node(id:"test-id")',
        },
      ],
    },
    params: {
      cacheID: 'dd3d1ab78cb8bbf4bf424348c46c9cb2',
      id: null,
      metadata: {
        relayTestingSelectionTypeInfo: {
          target: {
            enumValues: null,
            nullable: true,
            plural: false,
            type: 'Node',
          },
          'target.__isCommentsInterface': v7 /*: any*/,
          'target.__typename': v7 /*: any*/,
          'target.comments': {
            enumValues: null,
            nullable: true,
            plural: false,
            type: 'CommentConnection',
          },
          'target.comments.edges': {
            enumValues: null,
            nullable: false,
            plural: true,
            type: 'CommentEdge',
          },
          'target.comments.edges.cursor': v7 /*: any*/,
          'target.comments.edges.node': {
            enumValues: null,
            nullable: true,
            plural: false,
            type: 'Comment',
          },
          'target.comments.edges.node.__isCommentsInterface': v7 /*: any*/,
          'target.comments.edges.node.__isReactionsInterface': v7 /*: any*/,
          'target.comments.edges.node.__typename': v7 /*: any*/,
          'target.comments.edges.node.body': v8 /*: any*/,
          'target.comments.edges.node.canChange': v9 /*: any*/,
          'target.comments.edges.node.canDelete': v9 /*: any*/,
          'target.comments.edges.node.canPin': v9 /*: any*/,
          'target.comments.edges.node.canReport': v9 /*: any*/,
          'target.comments.edges.node.commentsCount': v10 /*: any*/,
          'target.comments.edges.node.commentsCount.total': v11 /*: any*/,
          'target.comments.edges.node.created': {
            enumValues: null,
            nullable: false,
            plural: false,
            type: 'DateTime',
          },
          'target.comments.edges.node.id': v12 /*: any*/,
          'target.comments.edges.node.isPinned': v13 /*: any*/,
          'target.comments.edges.node.myReaction': {
            enumValues: null,
            nullable: true,
            plural: false,
            type: 'Reaction',
          },
          'target.comments.edges.node.myReaction.id': v12 /*: any*/,
          'target.comments.edges.node.myReaction.reactionType': {
            enumValues: ['LIKE', 'DISLIKE'],
            nullable: true,
            plural: false,
            type: 'ReactionTypes',
          },
          'target.comments.edges.node.pk': v14 /*: any*/,
          'target.comments.edges.node.reactionsCount': {
            enumValues: null,
            nullable: true,
            plural: false,
            type: 'ReactionsCount',
          },
          'target.comments.edges.node.reactionsCount.total': v11 /*: any*/,
          'target.comments.edges.node.user': {
            enumValues: null,
            nullable: true,
            plural: false,
            type: 'User',
          },
          'target.comments.edges.node.user.avatar': {
            enumValues: null,
            nullable: true,
            plural: false,
            type: 'File',
          },
          'target.comments.edges.node.user.avatar.url': v7 /*: any*/,
          'target.comments.edges.node.user.firstName': v7 /*: any*/,
          'target.comments.edges.node.user.fullName': v8 /*: any*/,
          'target.comments.edges.node.user.id': v12 /*: any*/,
          'target.comments.edges.node.user.lastName': v7 /*: any*/,
          'target.comments.edges.node.user.pk': v14 /*: any*/,
          'target.comments.pageInfo': {
            enumValues: null,
            nullable: false,
            plural: false,
            type: 'PageInfo',
          },
          'target.comments.pageInfo.endCursor': v8 /*: any*/,
          'target.comments.pageInfo.hasNextPage': v13 /*: any*/,
          'target.commentsCount': v10 /*: any*/,
          'target.commentsCount.total': v11 /*: any*/,
          'target.id': v12 /*: any*/,
        },
      },
      name: 'CommentsListWithQuery',
      operationKind: 'query',
      text: 'query CommentsListWithQuery {\n  target: node(id: "test-id") {\n    __typename\n    ...CommentsList_comments\n    id\n  }\n}\n\nfragment CommentItem_comment on Comment {\n  id\n  pk\n  body\n  isPinned\n  user {\n    id\n    pk\n    fullName\n    firstName\n    lastName\n    avatar(width: 50, height: 50) {\n      url\n    }\n  }\n  created\n  commentsCount {\n    total\n  }\n  canChange: hasPerm(perm: "change")\n  canDelete: hasPerm(perm: "delete")\n  canReport: hasPerm(perm: "report")\n  canPin: hasPerm(perm: "pin")\n  ...ReactionButton_target\n  ...CommentItem_target\n}\n\nfragment CommentItem_target on CommentsInterface {\n  __isCommentsInterface: __typename\n  id\n}\n\nfragment CommentsList_comments on CommentsInterface {\n  __isCommentsInterface: __typename\n  id\n  commentsCount {\n    total\n  }\n  comments(first: 5, orderBy: "-is_pinned,-created") {\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n    edges {\n      node {\n        id\n        isPinned\n        ...CommentItem_comment\n        __typename\n      }\n      cursor\n    }\n  }\n  ...CommentItem_target\n}\n\nfragment ReactionButton_target on ReactionsInterface {\n  __isReactionsInterface: __typename\n  id\n  reactionsCount {\n    total\n  }\n  myReaction {\n    id\n    reactionType\n  }\n}\n',
    },
  }
})()

;(node as any).hash = 'acb6e47e69c86ce2d6db47adc66589dc'

export default node
