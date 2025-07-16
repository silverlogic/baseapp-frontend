/**
 * @generated SignedSource<<343a930145b63cedb6dc9a3b39e4c217>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ReaderFragment } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type PageWagtailFieldsFragment$data = {
  readonly ancestors: ReadonlyArray<{
    readonly title: string
    readonly urlPath: string
  }>
  readonly body?:
    | ReadonlyArray<
        | {
            readonly blockType: string
            readonly blocks?: ReadonlyArray<{
              readonly blockType: string
              readonly field: string
              readonly id: string | null | undefined
              readonly ' $fragmentSpreads': FragmentRefs<
                'PageBannerBlockFields' | 'PageCustomImageBlockFields' | 'PageRichTextBlockFields'
              >
            }>
            readonly field: string
            readonly id: string | null | undefined
          }
        | null
        | undefined
      >
    | null
    | undefined
  readonly featuredImage?:
    | ReadonlyArray<
        | {
            readonly altText?: string | null | undefined
            readonly image?:
              | {
                  readonly sizes: string
                  readonly url: string
                }
              | null
              | undefined
          }
        | null
        | undefined
      >
    | null
    | undefined
  readonly id: string | null | undefined
  readonly pageType: string | null | undefined
  readonly title: string
  readonly ' $fragmentType': 'PageWagtailFieldsFragment'
}
export type PageWagtailFieldsFragment$key = {
  readonly ' $data'?: PageWagtailFieldsFragment$data
  readonly ' $fragmentSpreads': FragmentRefs<'PageWagtailFieldsFragment'>
}

const node: ReaderFragment = (function () {
  var v0 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'id',
      storageKey: null,
    },
    v1 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'title',
      storageKey: null,
    },
    v2 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'field',
      storageKey: null,
    },
    v3 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'blockType',
      storageKey: null,
    }
  return {
    argumentDefinitions: [],
    kind: 'Fragment',
    metadata: null,
    name: 'PageWagtailFieldsFragment',
    selections: [
      v0 /*: any*/,
      v1 /*: any*/,
      {
        alias: null,
        args: null,
        kind: 'ScalarField',
        name: 'pageType',
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        concreteType: null,
        kind: 'LinkedField',
        name: 'ancestors',
        plural: true,
        selections: [
          {
            alias: null,
            args: null,
            kind: 'ScalarField',
            name: 'urlPath',
            storageKey: null,
          },
          v1 /*: any*/,
        ],
        storageKey: null,
      },
      {
        kind: 'InlineFragment',
        selections: [
          {
            alias: null,
            args: null,
            concreteType: null,
            kind: 'LinkedField',
            name: 'featuredImage',
            plural: true,
            selections: [
              {
                kind: 'InlineFragment',
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
                        args: null,
                        kind: 'ScalarField',
                        name: 'sizes',
                        storageKey: null,
                      },
                    ],
                    storageKey: null,
                  },
                ],
                type: 'CustomImageBlock',
                abstractKey: null,
              },
            ],
            storageKey: null,
          },
          {
            alias: null,
            args: null,
            concreteType: null,
            kind: 'LinkedField',
            name: 'body',
            plural: true,
            selections: [
              v0 /*: any*/,
              v2 /*: any*/,
              v3 /*: any*/,
              {
                kind: 'InlineFragment',
                selections: [
                  {
                    alias: null,
                    args: null,
                    concreteType: null,
                    kind: 'LinkedField',
                    name: 'blocks',
                    plural: true,
                    selections: [
                      v0 /*: any*/,
                      v2 /*: any*/,
                      v3 /*: any*/,
                      {
                        args: null,
                        kind: 'FragmentSpread',
                        name: 'PageBannerBlockFields',
                      },
                      {
                        args: null,
                        kind: 'FragmentSpread',
                        name: 'PageRichTextBlockFields',
                      },
                      {
                        args: null,
                        kind: 'FragmentSpread',
                        name: 'PageCustomImageBlockFields',
                      },
                    ],
                    storageKey: null,
                  },
                ],
                type: 'StreamBlock',
                abstractKey: null,
              },
            ],
            storageKey: null,
          },
        ],
        type: 'StandardPage',
        abstractKey: null,
      },
    ],
    type: 'WagtailPageInterface',
    abstractKey: '__isWagtailPageInterface',
  }
})()

;(node as any).hash = 'a727bf568c4c5dc7f13b27f4a9115486'

export default node
