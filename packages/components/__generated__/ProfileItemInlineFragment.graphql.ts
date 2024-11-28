/**
 * @generated SignedSource<<5ce5cc227ff15da2da614055efdf35e6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { InlineFragment, ReaderInlineDataFragment } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type ProfileItemInlineFragment$data = {
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
  readonly ' $fragmentType': 'ProfileItemInlineFragment'
}
export type ProfileItemInlineFragment$key = {
  readonly ' $data'?: ProfileItemInlineFragment$data
  readonly ' $fragmentSpreads': FragmentRefs<'ProfileItemInlineFragment'>
}

const node: ReaderInlineDataFragment = {
  kind: 'InlineDataFragment',
  name: 'ProfileItemInlineFragment',
}

;(node as any).hash = '3a57d843aa0456e03512fcd980504f41'

export default node
