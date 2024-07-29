/**
 * @generated SignedSource<<59639a33778217be42f4d4e323bb8a11>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime'
export type ReactionTypes = 'DISLIKE' | 'LIKE' | '%future added value'
import { FragmentRefs } from 'relay-runtime'
export type ReactionButton_target$data = {
  readonly id: string
  readonly myReaction:
    | {
        readonly id: string
        readonly reactionType: ReactionTypes | null | undefined
      }
    | null
    | undefined
  readonly reactionsCount:
    | {
        readonly total: number | null | undefined
      }
    | null
    | undefined
  readonly ' $fragmentType': 'ReactionButton_target'
}
export type ReactionButton_target$key = {
  readonly ' $data'?: ReactionButton_target$data
  readonly ' $fragmentSpreads': FragmentRefs<'ReactionButton_target'>
}

const node: ReaderFragment = (function () {
  var v0 = {
    alias: null,
    args: null,
    kind: 'ScalarField',
    name: 'id',
    storageKey: null,
  }
  return {
    argumentDefinitions: [],
    kind: 'Fragment',
    metadata: null,
    name: 'ReactionButton_target',
    selections: [
      v0 /*: any*/,
      {
        alias: null,
        args: null,
        concreteType: 'ReactionsCount',
        kind: 'LinkedField',
        name: 'reactionsCount',
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
        alias: null,
        args: null,
        concreteType: 'Reaction',
        kind: 'LinkedField',
        name: 'myReaction',
        plural: false,
        selections: [
          v0 /*: any*/,
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
  }
})()

;(node as any).hash = 'c3861c327bdc15c2a59dfbfe2ce2ed12'

export default node
