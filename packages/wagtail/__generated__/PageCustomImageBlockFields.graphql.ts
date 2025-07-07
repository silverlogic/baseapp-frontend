/**
 * @generated SignedSource<<12274c03a8c1300e74568209f8917161>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { Fragment, ReaderFragment } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type PageCustomImageBlockFields$data = {
  readonly altText: string | null | undefined
  readonly image:
    | {
        readonly altText: string | null | undefined
        readonly srcSet: string | null | undefined
        readonly url: string
      }
    | null
    | undefined
  readonly ' $fragmentType': 'PageCustomImageBlockFields'
}
export type PageCustomImageBlockFields$key = {
  readonly ' $data'?: PageCustomImageBlockFields$data
  readonly ' $fragmentSpreads': FragmentRefs<'PageCustomImageBlockFields'>
}

const node: ReaderFragment = (function () {
  var v0 = {
    alias: null,
    args: null,
    kind: 'ScalarField',
    name: 'altText',
    storageKey: null,
  }
  return {
    argumentDefinitions: [],
    kind: 'Fragment',
    metadata: null,
    name: 'PageCustomImageBlockFields',
    selections: [
      v0 /*: any*/,
      {
        alias: null,
        args: null,
        concreteType: 'CustomImage',
        kind: 'LinkedField',
        name: 'image',
        plural: false,
        selections: [
          {
            alias: null,
            args: null,
            kind: 'ScalarField',
            name: 'url',
            storageKey: null,
          },
          {
            alias: null,
            args: [
              {
                kind: 'Literal',
                name: 'format',
                value: 'webp',
              },
              {
                kind: 'Literal',
                name: 'preserveSvg',
                value: true,
              },
              {
                kind: 'Literal',
                name: 'sizes',
                value: [300, 600, 900],
              },
            ],
            kind: 'ScalarField',
            name: 'srcSet',
            storageKey: 'srcSet(format:"webp",preserveSvg:true,sizes:[300,600,900])',
          },
          v0 /*: any*/,
        ],
        storageKey: null,
      },
    ],
    type: 'CustomImageBlock',
    abstractKey: null,
  }
})()

;(node as any).hash = '07fcf5824b179ac9c7b7f3f0053c931e'

export default node
