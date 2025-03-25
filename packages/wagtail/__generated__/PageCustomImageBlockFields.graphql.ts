/**
 * @generated SignedSource<<3175faa1b14156954b06a5245c6a1211>>
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

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: 'Fragment',
  metadata: null,
  name: 'PageCustomImageBlockFields',
  selections: [
    {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'altText',
      storageKey: null,
    },
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
      ],
      storageKey: null,
    },
  ],
  type: 'CustomImageBlock',
  abstractKey: null,
}

;(node as any).hash = '4b54d189427f2404bce2ec6c5aca1694'

export default node
