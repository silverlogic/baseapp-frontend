/**
 * @generated SignedSource<<67c97d2ab036a8a4c4515e3012286a88>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ConcreteRequest } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type PageWagtailURLPathQuery$variables = {
  path: string
}
export type PageWagtailURLPathQuery$data = {
  readonly page:
    | {
        readonly ' $fragmentSpreads': FragmentRefs<'PageWagtailFieldsFragment'>
      }
    | null
    | undefined
}
export type PageWagtailURLPathQuery = {
  response: PageWagtailURLPathQuery$data
  variables: PageWagtailURLPathQuery$variables
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
      name: '__typename',
      storageKey: null,
    },
    v3 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'id',
      storageKey: null,
    },
    v4 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'title',
      storageKey: null,
    },
    v5 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'altText',
      storageKey: null,
    },
    v6 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'url',
      storageKey: null,
    },
    v7 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'field',
      storageKey: null,
    },
    v8 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'blockType',
      storageKey: null,
    }
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Fragment',
      metadata: null,
      name: 'PageWagtailURLPathQuery',
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: null,
          kind: 'LinkedField',
          name: 'page',
          plural: false,
          selections: [
            {
              args: null,
              kind: 'FragmentSpread',
              name: 'PageWagtailFieldsFragment',
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
      name: 'PageWagtailURLPathQuery',
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
            {
              kind: 'TypeDiscriminator',
              abstractKey: '__isWagtailPageInterface',
            },
            v3 /*: any*/,
            v4 /*: any*/,
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
                v2 /*: any*/,
                {
                  alias: null,
                  args: null,
                  kind: 'ScalarField',
                  name: 'urlPath',
                  storageKey: null,
                },
                v4 /*: any*/,
                v3 /*: any*/,
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
                    v2 /*: any*/,
                    {
                      kind: 'InlineFragment',
                      selections: [
                        v5 /*: any*/,
                        {
                          alias: null,
                          args: null,
                          concreteType: 'CustomImage',
                          kind: 'LinkedField',
                          name: 'image',
                          plural: false,
                          selections: [
                            v6 /*: any*/,
                            {
                              alias: null,
                              args: null,
                              kind: 'ScalarField',
                              name: 'sizes',
                              storageKey: null,
                            },
                            v3 /*: any*/,
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
                    v2 /*: any*/,
                    v3 /*: any*/,
                    v7 /*: any*/,
                    v8 /*: any*/,
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
                            v3 /*: any*/,
                            v7 /*: any*/,
                            v8 /*: any*/,
                            {
                              kind: 'InlineFragment',
                              selections: [
                                v4 /*: any*/,
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
                                  selections: [v6 /*: any*/, v5 /*: any*/, v3 /*: any*/],
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
                                v5 /*: any*/,
                                {
                                  alias: null,
                                  args: null,
                                  concreteType: 'CustomImage',
                                  kind: 'LinkedField',
                                  name: 'image',
                                  plural: false,
                                  selections: [
                                    v6 /*: any*/,
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
                                    v5 /*: any*/,
                                    v3 /*: any*/,
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
      cacheID: '9f1c3221e2ef412bb30dd75b38318af2',
      id: null,
      metadata: {},
      name: 'PageWagtailURLPathQuery',
      operationKind: 'query',
      text: 'query PageWagtailURLPathQuery(\n  $path: String!\n) {\n  page(urlPath: $path) {\n    __typename\n    ...PageWagtailFieldsFragment\n    id\n  }\n}\n\nfragment PageBannerBlockFields on BannerBlock {\n  title\n  description\n  featuredImage {\n    url\n    altText\n    id\n  }\n  imagePosition\n}\n\nfragment PageCustomImageBlockFields on CustomImageBlock {\n  altText\n  image {\n    url\n    srcSet(sizes: [300, 600, 900], format: "webp", preserveSvg: true)\n    altText\n    id\n  }\n}\n\nfragment PageRichTextBlockFields on RichTextBlock {\n  value\n}\n\nfragment PageWagtailFieldsFragment on WagtailPageInterface {\n  __isWagtailPageInterface: __typename\n  id\n  title\n  pageType\n  ancestors {\n    __typename\n    urlPath\n    title\n    id\n  }\n  ... on StandardPage {\n    featuredImage {\n      __typename\n      ... on CustomImageBlock {\n        altText\n        image {\n          url\n          sizes\n          id\n        }\n      }\n    }\n    body {\n      __typename\n      id\n      field\n      blockType\n      ... on StreamBlock {\n        blocks {\n          __typename\n          id\n          field\n          blockType\n          ...PageBannerBlockFields\n          ...PageRichTextBlockFields\n          ...PageCustomImageBlockFields\n        }\n      }\n    }\n  }\n}\n',
    },
  }
})()

;(node as any).hash = '05320453bbd58cff93e8a657866f4976'

export default node
