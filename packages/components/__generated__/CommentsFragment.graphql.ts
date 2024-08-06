/**
 * @generated SignedSource<<ea782d2aca76331d6d282012a1f56852>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ReaderFragment, RefetchableFragment } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type CommentsFragment$data = {
  readonly __typename: string
  readonly commentsCount: {
    readonly total: number | null | undefined
  }
  readonly id: string
  readonly isCommentsEnabled: boolean
  readonly ' $fragmentSpreads': FragmentRefs<'CommentItem_target' | 'CommentsList_comments'>
  readonly ' $fragmentType': 'CommentsFragment'
}
export type CommentsFragment$key = {
  readonly ' $data'?: CommentsFragment$data
  readonly ' $fragmentSpreads': FragmentRefs<'CommentsFragment'>
}

const node: ReaderFragment = {
  argumentDefinitions: [
    {
      defaultValue: true,
      kind: 'LocalArgument',
      name: 'isCommentsOpened',
    },
  ],
  kind: 'Fragment',
  metadata: {
    refetch: {
      connection: null,
      fragmentPathInResult: ['node'],
      operation: require('./CommentsRefetchQuery.graphql'),
      identifierInfo: {
        identifierField: 'id',
        identifierQueryVariableName: 'id',
      },
    },
  },
  name: 'CommentsFragment',
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
      name: '__typename',
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'isCommentsEnabled',
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
      condition: 'isCommentsOpened',
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
      name: 'CommentItem_target',
    },
  ],
  type: 'CommentsInterface',
  abstractKey: '__isCommentsInterface',
}

;(node as any).hash = '5c6447c09e41ab2fcd66157fb900571a'

export default node
