/**
 * @generated SignedSource<<2508af9152fbd3e4b88dbe1d97748cf0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { InlineFragment, ReaderInlineDataFragment } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type ProfileItemFragment$data = {
  readonly id: string
  readonly image:
    | {
        readonly url: string
      }
    | null
    | undefined
  readonly name: string | null | undefined
  readonly urlPath:
    | {
        readonly path: string
      }
    | null
    | undefined
  readonly ' $fragmentType': 'ProfileItemFragment'
}
export type ProfileItemFragment$key = {
  readonly ' $data'?: ProfileItemFragment$data
  readonly ' $fragmentSpreads': FragmentRefs<'ProfileItemFragment'>
}

const node: ReaderInlineDataFragment = {
  kind: 'InlineDataFragment',
  name: 'ProfileItemFragment',
}

;(node as any).hash = '4ff01a864028d7fc90c536a46839d28f'

export default node
