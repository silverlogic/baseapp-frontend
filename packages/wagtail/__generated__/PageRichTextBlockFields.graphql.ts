/**
 * @generated SignedSource<<5e22b7043860ebe071e1ae9c24d99320>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ReaderFragment } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type PageRichTextBlockFields$data = {
  readonly value: string
  readonly ' $fragmentType': 'PageRichTextBlockFields'
}
export type PageRichTextBlockFields$key = {
  readonly ' $data'?: PageRichTextBlockFields$data
  readonly ' $fragmentSpreads': FragmentRefs<'PageRichTextBlockFields'>
}

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: 'Fragment',
  metadata: null,
  name: 'PageRichTextBlockFields',
  selections: [
    {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'value',
      storageKey: null,
    },
  ],
  type: 'RichTextBlock',
  abstractKey: null,
}

;(node as any).hash = '9115c863784766245d905eb3510d86a5'

export default node
