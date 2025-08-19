/**
 * @generated SignedSource<<6e1696af3b9b224875d143d2bcfc3102>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CommentItemRefetchQuery$variables = {
  id: string;
  isRepliesExpanded?: boolean | null | undefined;
};
export type CommentItemRefetchQuery$data = {
  readonly node: {
    readonly " $fragmentSpreads": FragmentRefs<"CommentItem_comment">;
  } | null | undefined;
};
export type CommentItemRefetchQuery = {
  response: CommentItemRefetchQuery$data;
  variables: CommentItemRefetchQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v1 = {
  "defaultValue": false,
  "kind": "LocalArgument",
  "name": "isRepliesExpanded"
},
v2 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "pk",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "body",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isPinned",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "user",
  "plural": false,
  "selections": [
    (v4/*: any*/),
    (v5/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "fullName",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "height",
          "value": 50
        },
        {
          "kind": "Literal",
          "name": "width",
          "value": 50
        }
      ],
      "concreteType": "File",
      "kind": "LinkedField",
      "name": "avatar",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "url",
          "storageKey": null
        }
      ],
      "storageKey": "avatar(height:50,width:50)"
    }
  ],
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "created",
  "storageKey": null
},
v10 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "total",
    "storageKey": null
  }
],
v11 = {
  "alias": null,
  "args": null,
  "concreteType": "CommentsCount",
  "kind": "LinkedField",
  "name": "commentsCount",
  "plural": false,
  "selections": (v10/*: any*/),
  "storageKey": null
},
v12 = {
  "alias": "canChange",
  "args": [
    {
      "kind": "Literal",
      "name": "perm",
      "value": "change"
    }
  ],
  "kind": "ScalarField",
  "name": "hasPerm",
  "storageKey": "hasPerm(perm:\"change\")"
},
v13 = {
  "alias": "canDelete",
  "args": [
    {
      "kind": "Literal",
      "name": "perm",
      "value": "delete"
    }
  ],
  "kind": "ScalarField",
  "name": "hasPerm",
  "storageKey": "hasPerm(perm:\"delete\")"
},
v14 = {
  "alias": "canReport",
  "args": [
    {
      "kind": "Literal",
      "name": "perm",
      "value": "report"
    }
  ],
  "kind": "ScalarField",
  "name": "hasPerm",
  "storageKey": "hasPerm(perm:\"report\")"
},
v15 = {
  "alias": "canPin",
  "args": [
    {
      "kind": "Literal",
      "name": "perm",
      "value": "pin"
    }
  ],
  "kind": "ScalarField",
  "name": "hasPerm",
  "storageKey": "hasPerm(perm:\"pin\")"
},
v16 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 5
  },
  {
    "kind": "Literal",
    "name": "orderBy",
    "value": "-is_pinned,-created"
  }
],
v17 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ReactionsCount",
      "kind": "LinkedField",
      "name": "reactionsCount",
      "plural": false,
      "selections": (v10/*: any*/),
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
        (v4/*: any*/),
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
},
v18 = {
  "kind": "TypeDiscriminator",
  "abstractKey": "__isCommentsInterface"
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "CommentItemRefetchQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "args": [
              {
                "kind": "Variable",
                "name": "isRepliesExpanded",
                "variableName": "isRepliesExpanded"
              }
            ],
            "kind": "FragmentSpread",
            "name": "CommentItem_comment"
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
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "CommentItemRefetchQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/),
              (v13/*: any*/),
              (v14/*: any*/),
              (v15/*: any*/),
              {
                "condition": "isRepliesExpanded",
                "kind": "Condition",
                "passingValue": true,
                "selections": [
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "alias": null,
                        "args": (v16/*: any*/),
                        "concreteType": "CommentConnection",
                        "kind": "LinkedField",
                        "name": "comments",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "PageInfo",
                            "kind": "LinkedField",
                            "name": "pageInfo",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "endCursor",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "hasNextPage",
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "CommentEdge",
                            "kind": "LinkedField",
                            "name": "edges",
                            "plural": true,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Comment",
                                "kind": "LinkedField",
                                "name": "node",
                                "plural": false,
                                "selections": [
                                  (v4/*: any*/),
                                  (v7/*: any*/),
                                  (v5/*: any*/),
                                  (v6/*: any*/),
                                  (v8/*: any*/),
                                  (v9/*: any*/),
                                  (v11/*: any*/),
                                  (v12/*: any*/),
                                  (v13/*: any*/),
                                  (v14/*: any*/),
                                  (v15/*: any*/),
                                  (v3/*: any*/),
                                  (v17/*: any*/),
                                  (v18/*: any*/)
                                ],
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "cursor",
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": "comments(first:5,orderBy:\"-is_pinned,-created\")"
                      },
                      {
                        "alias": null,
                        "args": (v16/*: any*/),
                        "filters": [],
                        "handle": "connection",
                        "key": "CommentsList_comments",
                        "kind": "LinkedHandle",
                        "name": "comments"
                      }
                    ],
                    "type": "CommentsInterface",
                    "abstractKey": "__isCommentsInterface"
                  }
                ]
              },
              (v17/*: any*/),
              (v18/*: any*/)
            ],
            "type": "Comment",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "df527927045fb9f7719d99ca6e66ec58",
    "id": null,
    "metadata": {},
    "name": "CommentItemRefetchQuery",
    "operationKind": "query",
    "text": "query CommentItemRefetchQuery(\n  $isRepliesExpanded: Boolean = false\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...CommentItem_comment_2aaWJ5\n    id\n  }\n}\n\nfragment CommentItem_comment on Comment {\n  id\n  pk\n  body\n  isPinned\n  user {\n    id\n    pk\n    fullName\n    avatar(width: 50, height: 50) {\n      url\n    }\n  }\n  created\n  commentsCount {\n    total\n  }\n  canChange: hasPerm(perm: \"change\")\n  canDelete: hasPerm(perm: \"delete\")\n  canReport: hasPerm(perm: \"report\")\n  canPin: hasPerm(perm: \"pin\")\n  ...ReactionButton_target\n  ...CommentItem_target\n}\n\nfragment CommentItem_comment_2aaWJ5 on Comment {\n  id\n  pk\n  body\n  isPinned\n  user {\n    id\n    pk\n    fullName\n    avatar(width: 50, height: 50) {\n      url\n    }\n  }\n  created\n  commentsCount {\n    total\n  }\n  canChange: hasPerm(perm: \"change\")\n  canDelete: hasPerm(perm: \"delete\")\n  canReport: hasPerm(perm: \"report\")\n  canPin: hasPerm(perm: \"pin\")\n  ...CommentsList_comments @include(if: $isRepliesExpanded)\n  ...ReactionButton_target\n  ...CommentItem_target\n}\n\nfragment CommentItem_target on CommentsInterface {\n  __isCommentsInterface: __typename\n  id\n}\n\nfragment CommentsList_comments on CommentsInterface {\n  __isCommentsInterface: __typename\n  id\n  commentsCount {\n    total\n  }\n  comments(first: 5, orderBy: \"-is_pinned,-created\") {\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n    edges {\n      node {\n        id\n        isPinned\n        ...CommentItem_comment\n        __typename\n      }\n      cursor\n    }\n  }\n  ...CommentItem_target\n}\n\nfragment ReactionButton_target on ReactionsInterface {\n  __isReactionsInterface: __typename\n  id\n  reactionsCount {\n    total\n  }\n  myReaction {\n    id\n    reactionType\n  }\n}\n"
  }
};
})();

(node as any).hash = "6b85079a50a9d42f07d0859fcf536a61";

export default node;
