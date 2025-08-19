/**
 * @generated SignedSource<<4abd8ae4fbb4613b3c4272f47e2b4655>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContentPostDetailFragmentQuery$variables = {
  id: string;
};
export type ContentPostDetailFragmentQuery$data = {
  readonly contentPost: {
    readonly " $fragmentSpreads": FragmentRefs<"ContentPost_post">;
  } | null | undefined;
};
export type ContentPostDetailFragmentQuery = {
  response: ContentPostDetailFragmentQuery$data;
  variables: ContentPostDetailFragmentQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
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
  "kind": "ScalarField",
  "name": "pk",
  "storageKey": null
},
v4 = [
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
    "name": "ContentPostDetailFragmentQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ContentPost",
        "kind": "LinkedField",
        "name": "contentPost",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ContentPost_post"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ContentPostDetailFragmentQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ContentPost",
        "kind": "LinkedField",
        "name": "contentPost",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
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
                      (v3/*: any*/),
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
                        "selections": (v4/*: any*/),
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
                "selections": (v4/*: any*/),
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
    ]
  },
  "params": {
    "cacheID": "76f0f637da882458fe4696a4db97802d",
    "id": null,
    "metadata": {},
    "name": "ContentPostDetailFragmentQuery",
    "operationKind": "query",
    "text": "query ContentPostDetailFragmentQuery(\n  $id: ID!\n) {\n  contentPost(id: $id) {\n    ...ContentPost_post\n    id\n  }\n}\n\nfragment ContentPostImageFragment_2rSAEw on ContentPostImage {\n  pk\n  image(width: 600, height: 0) {\n    url\n  }\n}\n\nfragment ContentPost_post on ContentPost {\n  id\n  pk\n  content\n  images {\n    edges {\n      node {\n        id\n        ...ContentPostImageFragment_2rSAEw\n      }\n    }\n  }\n  created\n  modified\n  profile {\n    ...ProfileItemFragment\n    id\n  }\n  isReactionsEnabled\n  ...ReactionButton_target\n}\n\nfragment ProfileItemFragment on Profile {\n  id\n  name\n  image(width: 100, height: 100) {\n    url\n  }\n  urlPath {\n    path\n    id\n  }\n}\n\nfragment ReactionButton_target on ReactionsInterface {\n  __isReactionsInterface: __typename\n  id\n  reactionsCount {\n    total\n  }\n  myReaction {\n    id\n    reactionType\n  }\n}\n"
  }
};
})();

(node as any).hash = "eea6fb4e3cff3bf4b593df15a85eb46e";

export default node;
