/**
 * @generated SignedSource<<7e8115d1431a8e56dd776e05b059c739>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ConcreteRequest, Query } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type PageURLPathQuery$variables = {
  path: string
}
export type PageURLPathQuery$data = {
  readonly page:
    | {
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
                      | 'PageBannerBlockFields'
                      | 'PageCustomImageBlockFields'
                      | 'PageRichTextBlockFields'
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
        readonly id: string | null | undefined
        readonly pageType: string | null | undefined
        readonly title: string
      }
    | null
    | undefined
}
export type PageURLPathQuery = {
  response: PageURLPathQuery$data
  variables: PageURLPathQuery$variables
}

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        defaultValue: null,
        kind: 'LocalArgument',
        name: 'path',
      },
    ],
    v1 = [
      {
        kind: 'Variable',
        name: 'urlPath',
        variableName: 'path',
      },
    ],
    v2 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'id',
      storageKey: null,
    },
    v3 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'title',
      storageKey: null,
    },
    v4 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'pageType',
      storageKey: null,
    },
    v5 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'urlPath',
      storageKey: null,
    },
    v6 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'field',
      storageKey: null,
    },
    v7 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'blockType',
      storageKey: null,
    },
    v8 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: '__typename',
      storageKey: null,
    },
    v9 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'url',
      storageKey: null,
    },
    v10 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'altText',
      storageKey: null,
    }
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Fragment',
      metadata: null,
      name: 'PageURLPathQuery',
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: null,
          kind: 'LinkedField',
          name: 'page',
          plural: false,
          selections: [
            v2 /*: any*/,
            v3 /*: any*/,
            v4 /*: any*/,
            {
              alias: null,
              args: null,
              concreteType: null,
              kind: 'LinkedField',
              name: 'ancestors',
              plural: true,
              selections: [v5 /*: any*/, v3 /*: any*/],
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
                  name: 'body',
                  plural: true,
                  selections: [
                    v2 /*: any*/,
                    v6 /*: any*/,
                    v7 /*: any*/,
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
                            v2 /*: any*/,
                            v6 /*: any*/,
                            v7 /*: any*/,
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
          storageKey: null,
        },
      ],
      type: 'Query',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Operation',
      name: 'PageURLPathQuery',
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: null,
          kind: 'LinkedField',
          name: 'page',
          plural: false,
          selections: [
            v8 /*: any*/,
            v2 /*: any*/,
            v3 /*: any*/,
            v4 /*: any*/,
            {
              alias: null,
              args: null,
              concreteType: null,
              kind: 'LinkedField',
              name: 'ancestors',
              plural: true,
              selections: [v8 /*: any*/, v5 /*: any*/, v3 /*: any*/, v2 /*: any*/],
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
                  name: 'body',
                  plural: true,
                  selections: [
                    v8 /*: any*/,
                    v2 /*: any*/,
                    v6 /*: any*/,
                    v7 /*: any*/,
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
                            v8 /*: any*/,
                            v2 /*: any*/,
                            v6 /*: any*/,
                            v7 /*: any*/,
                            {
                              kind: 'InlineFragment',
                              selections: [
                                v3 /*: any*/,
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
                                  selections: [v9 /*: any*/, v10 /*: any*/, v2 /*: any*/],
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
                            },
                            {
                              kind: 'InlineFragment',
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
                            },
                            {
                              kind: 'InlineFragment',
                              selections: [
                                v10 /*: any*/,
                                {
                                  alias: null,
                                  args: null,
                                  concreteType: 'CustomImage',
                                  kind: 'LinkedField',
                                  name: 'image',
                                  plural: false,
                                  selections: [
                                    v9 /*: any*/,
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
                                      storageKey:
                                        'srcSet(format:"webp",preserveSvg:true,sizes:[300,600,900])',
                                    },
                                    v2 /*: any*/,
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
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: '6d23f3bead25e483a1e7ebcf813c20d0',
      id: null,
      metadata: {},
      name: 'PageURLPathQuery',
      operationKind: 'query',
      text: 'query PageURLPathQuery(\n  $path: String!\n) {\n  page(urlPath: $path) {\n    __typename\n    id\n    title\n    pageType\n    ancestors {\n      __typename\n      urlPath\n      title\n      id\n    }\n    ... on StandardPage {\n      body {\n        __typename\n        id\n        field\n        blockType\n        ... on StreamBlock {\n          blocks {\n            __typename\n            id\n            field\n            blockType\n            ...PageBannerBlockFields\n            ...PageRichTextBlockFields\n            ...PageCustomImageBlockFields\n          }\n        }\n      }\n    }\n  }\n}\n\nfragment PageBannerBlockFields on BannerBlock {\n  title\n  description\n  featuredImage {\n    url\n    altText\n    id\n  }\n  imagePosition\n}\n\nfragment PageCustomImageBlockFields on CustomImageBlock {\n  altText\n  image {\n    url\n    srcSet(sizes: [300, 600, 900], format: "webp", preserveSvg: true)\n    id\n  }\n}\n\nfragment PageRichTextBlockFields on RichTextBlock {\n  value\n}\n',
    },
  }
})()

;(node as any).hash = 'e60fa22ab5be7827847c70af399a5587'

export default node
