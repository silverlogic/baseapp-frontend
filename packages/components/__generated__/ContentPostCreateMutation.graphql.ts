/**
 * @generated SignedSource<<3a3fbf057a1928da4e6a2c60744f541d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContentPostCreateInput = {
  clientMutationId?: string | null | undefined;
  content: string;
  isReactionsEnabled: boolean;
};
export type ContentPostCreateMutation$variables = {
  input: ContentPostCreateInput;
};
export type ContentPostCreateMutation$data = {
  readonly contentPostCreate: {
    readonly contentPost: {
      readonly node: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"ContentPost_post">;
      } | null | undefined;
    } | null | undefined;
    readonly errors: ReadonlyArray<{
      readonly field: string;
      readonly messages: ReadonlyArray<string>;
    } | null | undefined> | null | undefined;
  } | null | undefined;
};
export type ContentPostCreateMutation = {
  response: ContentPostCreateMutation$data;
  variables: ContentPostCreateMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "concreteType": "ErrorType",
  "kind": "LinkedField",
  "name": "errors",
  "plural": true,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "field",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "messages",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "pk",
  "storageKey": null
},
v5 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "url",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ContentPostCreateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ContentPostCreatePayload",
        "kind": "LinkedField",
        "name": "contentPostCreate",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ContentPostEdge",
            "kind": "LinkedField",
            "name": "contentPost",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ContentPost",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "ContentPost_post"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ContentPostCreateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ContentPostCreatePayload",
        "kind": "LinkedField",
        "name": "contentPostCreate",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ContentPostEdge",
            "kind": "LinkedField",
            "name": "contentPost",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ContentPost",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "content",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ContentPostImageConnection",
                    "kind": "LinkedField",
                    "name": "images",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ContentPostImageEdge",
                        "kind": "LinkedField",
                        "name": "edges",
                        "plural": true,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "ContentPostImage",
                            "kind": "LinkedField",
                            "name": "node",
                            "plural": false,
                            "selections": [
                              (v2/*: any*/),
                              (v4/*: any*/),
                              {
                                "alias": null,
                                "args": [
                                  {
                                    "kind": "Literal",
                                    "name": "height",
                                    "value": 0
                                  },
                                  {
                                    "kind": "Literal",
                                    "name": "width",
                                    "value": 600
                                  }
                                ],
                                "concreteType": "File",
                                "kind": "LinkedField",
                                "name": "image",
                                "plural": false,
                                "selections": (v5/*: any*/),
                                "storageKey": "image(height:0,width:600)"
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "created",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "modified",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Profile",
                    "kind": "LinkedField",
                    "name": "profile",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "name",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "height",
                            "value": 100
                          },
                          {
                            "kind": "Literal",
                            "name": "width",
                            "value": 100
                          }
                        ],
                        "concreteType": "File",
                        "kind": "LinkedField",
                        "name": "image",
                        "plural": false,
                        "selections": (v5/*: any*/),
                        "storageKey": "image(height:100,width:100)"
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "URLPath",
                        "kind": "LinkedField",
                        "name": "urlPath",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "path",
                            "storageKey": null
                          },
                          (v2/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isReactionsEnabled",
                    "storageKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ReactionsCount",
                        "kind": "LinkedField",
                        "name": "reactionsCount",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "total",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Reaction",
                        "kind": "LinkedField",
                        "name": "myReaction",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "reactionType",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "type": "ReactionsInterface",
                    "abstractKey": "__isReactionsInterface"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "b4c7f0a3ef0213447d3408675d65e776",
    "id": null,
    "metadata": {},
    "name": "ContentPostCreateMutation",
    "operationKind": "mutation",
    "text": "mutation ContentPostCreateMutation(\n  $input: ContentPostCreateInput!\n) {\n  contentPostCreate(input: $input) {\n    contentPost {\n      node {\n        id\n        ...ContentPost_post\n      }\n    }\n    errors {\n      field\n      messages\n    }\n  }\n}\n\nfragment ContentPostImageFragment_2rSAEw on ContentPostImage {\n  pk\n  image(width: 600, height: 0) {\n    url\n  }\n}\n\nfragment ContentPost_post on ContentPost {\n  id\n  pk\n  content\n  images {\n    edges {\n      node {\n        id\n        ...ContentPostImageFragment_2rSAEw\n      }\n    }\n  }\n  created\n  modified\n  profile {\n    ...ProfileItemFragment\n    id\n  }\n  isReactionsEnabled\n  ...ReactionButton_target\n}\n\nfragment ProfileItemFragment on Profile {\n  id\n  name\n  image(width: 100, height: 100) {\n    url\n  }\n  urlPath {\n    path\n    id\n  }\n}\n\nfragment ReactionButton_target on ReactionsInterface {\n  __isReactionsInterface: __typename\n  id\n  reactionsCount {\n    total\n  }\n  myReaction {\n    id\n    reactionType\n  }\n}\n"
  }
};
})();

(node as any).hash = "1864f85ba59e5b389637573d6673960e";

export default node;
