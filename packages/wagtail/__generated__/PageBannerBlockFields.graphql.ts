/**
 * @generated SignedSource<<98db6bd351896be7247e382412c1d0d2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ReaderFragment } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type ImagePosition = 'left' | 'right' | '%future added value'

export type PageBannerBlockFields$data = {
  readonly description: any | null | undefined
  readonly featuredImage:
    | {
        readonly altText: string | null | undefined
        readonly url: string
      }
    | null
    | undefined
  readonly imagePosition: ImagePosition
  readonly title: string
  readonly ' $fragmentType': 'PageBannerBlockFields'
}
export type PageBannerBlockFields$key = {
  readonly ' $data'?: PageBannerBlockFields$data
  readonly ' $fragmentSpreads': FragmentRefs<'PageBannerBlockFields'>
}

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: 'Fragment',
  metadata: null,
  name: 'PageBannerBlockFields',
  selections: [
    {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'title',
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'description',
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      concreteType: 'CustomImage',
      kind: 'LinkedField',
      name: 'featuredImage',
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
          args: null,
          kind: 'ScalarField',
          name: 'altText',
          storageKey: null,
        },
      ],
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'imagePosition',
      storageKey: null,
    },
  ],
  type: 'BannerBlock',
  abstractKey: null,
}

;(node as any).hash = '83a2a1c5593592fb90230d1044b30940'

export default node
