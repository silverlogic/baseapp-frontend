/**
 * @generated SignedSource<<4511e67609f002ac7bee727e0b766bca>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ConcreteRequest } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type PageWagtailTokenQuery$variables = {
  contentType: string
  token: string
}
export type PageWagtailTokenQuery$data = {
  readonly page:
    | {
        readonly ' $fragmentSpreads': FragmentRefs<'PageWagtailFieldsFragment'>
      }
    | null
    | undefined
}
export type PageWagtailTokenQuery = {
  response: PageWagtailTokenQuery$data
  variables: PageWagtailTokenQuery$variables
}

const node: ConcreteRequest = (function () {
  var v0 = {
      defaultValue: null,
      kind: 'LocalArgument',
      name: 'contentType',
    },
    v1 = {
      defaultValue: null,
      kind: 'LocalArgument',
      name: 'token',
    },
    v2 = [
      {
        kind: 'Variable',
        name: 'contentType',
        variableName: 'contentType',
      },
      {
        kind: 'Variable',
        name: 'token',
        variableName: 'token',
      },
    ],
    v3 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: '__typename',
      storageKey: null,
    },
    v4 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'id',
      storageKey: null,
    },
    v5 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'title',
      storageKey: null,
    },
    v6 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'altText',
      storageKey: null,
    },
    v7 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'url',
      storageKey: null,
    },
    v8 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'field',
      storageKey: null,
    },
    v9 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'blockType',
      storageKey: null,
    }
  return {
    fragment: {
      argumentDefinitions: [v0 /*: any*/, v1 /*: any*/],
      kind: 'Fragment',
      metadata: null,
      name: 'PageWagtailTokenQuery',
      selections: [
        {
          alias: null,
          args: v2 /*: any*/,
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
      argumentDefinitions: [v1 /*: any*/, v0 /*: any*/],
      kind: 'Operation',
      name: 'PageWagtailTokenQuery',
      selections: [
        {
          alias: null,
          args: v2 /*: any*/,
          concreteType: null,
          kind: 'LinkedField',
          name: 'page',
          plural: false,
          selections: [
            v3 /*: any*/,
            {
              kind: 'TypeDiscriminator',
              abstractKey: '__isWagtailPageInterface',
            },
            v4 /*: any*/,
            v5 /*: any*/,
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
                v3 /*: any*/,
                {
                  alias: null,
                  args: null,
                  kind: 'ScalarField',
                  name: 'urlPath',
                  storageKey: null,
                },
                v5 /*: any*/,
                v4 /*: any*/,
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
                    v3 /*: any*/,
                    {
                      kind: 'InlineFragment',
                      selections: [
                        v6 /*: any*/,
                        {
                          alias: null,
                          args: null,
                          concreteType: 'CustomImage',
                          kind: 'LinkedField',
                          name: 'image',
                          plural: false,
                          selections: [
                            v7 /*: any*/,
                            {
                              alias: null,
                              args: null,
                              kind: 'ScalarField',
                              name: 'sizes',
                              storageKey: null,
                            },
                            v4 /*: any*/,
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
                    v3 /*: any*/,
                    v4 /*: any*/,
                    v8 /*: any*/,
                    v9 /*: any*/,
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
                            v3 /*: any*/,
                            v4 /*: any*/,
                            v8 /*: any*/,
                            v9 /*: any*/,
                            {
                              kind: 'InlineFragment',
                              selections: [
                                v5 /*: any*/,
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
                                  selections: [v7 /*: any*/, v6 /*: any*/, v4 /*: any*/],
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
                                v6 /*: any*/,
                                {
                                  alias: null,
                                  args: null,
                                  concreteType: 'CustomImage',
                                  kind: 'LinkedField',
                                  name: 'image',
                                  plural: false,
                                  selections: [
                                    v7 /*: any*/,
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
                                    v6 /*: any*/,
                                    v4 /*: any*/,
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
      cacheID: '8fb1d5d739ce4acd4c27ab35ed27a81a',
      id: null,
      metadata: {},
      name: 'PageWagtailTokenQuery',
      operationKind: 'query',
      text: 'query PageWagtailTokenQuery(\n  $token: String!\n  $contentType: String!\n) {\n  page(token: $token, contentType: $contentType) {\n    __typename\n    ...PageWagtailFieldsFragment\n    id\n  }\n}\n\nfragment PageBannerBlockFields on BannerBlock {\n  title\n  description\n  featuredImage {\n    url\n    altText\n    id\n  }\n  imagePosition\n}\n\nfragment PageCustomImageBlockFields on CustomImageBlock {\n  altText\n  image {\n    url\n    srcSet(sizes: [300, 600, 900], format: "webp", preserveSvg: true)\n    altText\n    id\n  }\n}\n\nfragment PageRichTextBlockFields on RichTextBlock {\n  value\n}\n\nfragment PageWagtailFieldsFragment on WagtailPageInterface {\n  __isWagtailPageInterface: __typename\n  id\n  title\n  pageType\n  ancestors {\n    __typename\n    urlPath\n    title\n    id\n  }\n  ... on StandardPage {\n    featuredImage {\n      __typename\n      ... on CustomImageBlock {\n        altText\n        image {\n          url\n          sizes\n          id\n        }\n      }\n    }\n    body {\n      __typename\n      id\n      field\n      blockType\n      ... on StreamBlock {\n        blocks {\n          __typename\n          id\n          field\n          blockType\n          ...PageBannerBlockFields\n          ...PageRichTextBlockFields\n          ...PageCustomImageBlockFields\n        }\n      }\n    }\n  }\n}\n',
    },
  }
})()

;(node as any).hash = '1e60966c8bc7b89aa0245cc07721a768'

export default node
