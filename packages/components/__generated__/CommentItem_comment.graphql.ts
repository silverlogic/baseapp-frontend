/**
 * @generated SignedSource<<9a2dada20924229d547e859d0cfbd6a3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'
export type CommentItem_comment$data = {
  readonly body: string | null | undefined
  readonly canChange: boolean | null | undefined
  readonly canDelete: boolean | null | undefined
  readonly canPin: boolean | null | undefined
  readonly canReport: boolean | null | undefined
  readonly commentsCount: {
    readonly total: number | null | undefined
  }
  readonly created: any
  readonly id: string
  readonly isPinned: boolean
  readonly pk: number
  readonly user:
    | {
        readonly avatar:
          | {
              readonly url: string
            }
          | null
          | undefined
        readonly firstName: string
        readonly fullName: string | null | undefined
        readonly id: string
        readonly lastName: string
        readonly pk: number
      }
    | null
    | undefined
  readonly ' $fragmentSpreads': FragmentRefs<
    'CommentItem_target' | 'CommentsList_comments' | 'ReactionButton_target'
  >
  readonly ' $fragmentType': 'CommentItem_comment'
}
export type CommentItem_comment$key = {
  readonly ' $data'?: CommentItem_comment$data
  readonly ' $fragmentSpreads': FragmentRefs<'CommentItem_comment'>
}

const node: ReaderFragment = (function () {
  var v0 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'id',
      storageKey: null,
    },
    v1 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'pk',
      storageKey: null,
    }
  return {
    argumentDefinitions: [
      {
        defaultValue: false,
        kind: 'LocalArgument',
        name: 'isRepliesExpanded',
      },
    ],
    kind: 'Fragment',
    metadata: {
      refetch: {
        connection: null,
        fragmentPathInResult: ['node'],
        operation: require('./CommentItemRefetchQuery.graphql'),
        identifierInfo: {
          identifierField: 'id',
          identifierQueryVariableName: 'id',
        },
      },
    },
    name: 'CommentItem_comment',
    selections: [
      v0 /*: any*/,
      v1 /*: any*/,
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
        kind: 'ScalarField',
        name: 'isPinned',
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
          v0 /*: any*/,
          v1 /*: any*/,
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
      {
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
        ],
        storageKey: null,
      },
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
        condition: 'isRepliesExpanded',
        kind: 'Condition',
        passingValue: true,
        selections: [
          {
            args: null,
            kind: 'FragmentSpread',
            name: 'CommentsList_comments',
          },
        ],
      },
      {
        args: null,
        kind: 'FragmentSpread',
        name: 'ReactionButton_target',
      },
      {
        args: null,
        kind: 'FragmentSpread',
        name: 'CommentItem_target',
      },
    ],
    type: 'Comment',
    abstractKey: null,
  }
})()

;(node as any).hash = 'a0dbcc7b54aaf4438837d53880e6e7f1'

export default node
