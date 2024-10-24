/**
 * @generated SignedSource<<9830889f9a9caa44cf21d6c2a3abafb5>>
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

;(node as any).hash = 'ec58c5f19a59f85fb5a12e4e454da0cd'

export default node
