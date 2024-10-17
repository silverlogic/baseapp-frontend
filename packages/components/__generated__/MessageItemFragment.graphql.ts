/**
 * @generated SignedSource<<e54d4a2732c6f0b4695aa75fda382e78>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { Fragment, ReaderFragment } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type MessageItemFragment$data = {
  readonly content: string | null | undefined
  readonly created: any
  readonly id: string
  readonly inReplyTo:
    | {
        readonly id: string
      }
    | null
    | undefined
  readonly pk: number
  readonly ' $fragmentType': 'MessageItemFragment'
}
export type MessageItemFragment$key = {
  readonly ' $data'?: MessageItemFragment$data
  readonly ' $fragmentSpreads': FragmentRefs<'MessageItemFragment'>
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
    name: 'MessageItemFragment',
    selections: [
      v0 /*: any*/,
      {
        alias: null,
        args: null,
        concreteType: 'Message',
        kind: 'LinkedField',
        name: 'inReplyTo',
        plural: false,
        selections: [v0 /*: any*/],
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        kind: 'ScalarField',
        name: 'content',
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        kind: 'ScalarField',
        name: 'pk',
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        kind: 'ScalarField',
        name: 'created',
        storageKey: null,
      },
    ],
    type: 'Message',
    abstractKey: null,
  }
})()

;(node as any).hash = '891c2bbead6331839e01adb05253c2aa'

export default node
