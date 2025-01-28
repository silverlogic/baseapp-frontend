/**
 * @generated SignedSource<<831af848ccdb0938fdc0f4c912b20292>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CommentsListPaginationQuery$variables = {
  count?: number | null | undefined;
  cursor?: string | null | undefined;
  id: string;
  orderBy?: string | null | undefined;
  q?: string | null | undefined;
};
export type CommentsListPaginationQuery$data = {
  readonly node: {
    readonly " $fragmentSpreads": FragmentRefs<"CommentsList_comments">;
  } | null | undefined;
};
export type CommentsListPaginationQuery = {
  response: CommentsListPaginationQuery$data;
  variables: CommentsListPaginationQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": 5,
  "kind": "LocalArgument",
  "name": "count"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "cursor"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v3 = {
  "defaultValue": "-is_pinned,-created",
  "kind": "LocalArgument",
  "name": "orderBy"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "q"
},
v5 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v6 = {
  "kind": "Variable",
  "name": "orderBy",
  "variableName": "orderBy"
},
v7 = {
  "kind": "Variable",
  "name": "q",
  "variableName": "q"
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
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
v12 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "count"
  },
  (v6/*: any*/),
  (v7/*: any*/)
],
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "pk",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "CommentsListPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v5/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "args": [
              {
                "kind": "Variable",
                "name": "count",
                "variableName": "count"
              },
              {
                "kind": "Variable",
                "name": "cursor",
                "variableName": "cursor"
              },
              (v6/*: any*/),
              (v7/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "CommentsList_comments"
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
      (v0/*: any*/),
      (v1/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "CommentsListPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v5/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v8/*: any*/),
          (v9/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v11/*: any*/),
              {
                "alias": null,
                "args": (v12/*: any*/),
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
                          (v9/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isPinned",
                            "storageKey": null
                          },
                          (v13/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "body",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "User",
                            "kind": "LinkedField",
                            "name": "user",
                            "plural": false,
                            "selections": [
                              (v9/*: any*/),
                              (v13/*: any*/),
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
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "created",
                            "storageKey": null
                          },
                          (v11/*: any*/),
                          {
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
                          {
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
                          {
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
                          {
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
                          (v8/*: any*/),
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
                                  (v9/*: any*/),
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
                          {
                            "kind": "TypeDiscriminator",
                            "abstractKey": "__isCommentsInterface"
                          }
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
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v12/*: any*/),
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
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "de4d3ba673b6bcb9b4d69c8a90a02017",
    "id": null,
    "metadata": {},
    "name": "CommentsListPaginationQuery",
    "operationKind": "query",
    "text": "query CommentsListPaginationQuery(\n  $count: Int = 5\n  $cursor: String\n  $orderBy: String = \"-is_pinned,-created\"\n  $q: String\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...CommentsList_comments_40Ewnb\n    id\n  }\n}\n\nfragment CommentItem_comment on Comment {\n  id\n  pk\n  body\n  isPinned\n  user {\n    id\n    pk\n    fullName\n    avatar(width: 50, height: 50) {\n      url\n    }\n  }\n  created\n  commentsCount {\n    total\n  }\n  canChange: hasPerm(perm: \"change\")\n  canDelete: hasPerm(perm: \"delete\")\n  canReport: hasPerm(perm: \"report\")\n  canPin: hasPerm(perm: \"pin\")\n  ...ReactionButton_target\n  ...CommentItem_target\n}\n\nfragment CommentItem_target on CommentsInterface {\n  __isCommentsInterface: __typename\n  id\n}\n\nfragment CommentsList_comments_40Ewnb on CommentsInterface {\n  __isCommentsInterface: __typename\n  id\n  commentsCount {\n    total\n  }\n  comments(first: $count, after: $cursor, q: $q, orderBy: $orderBy) {\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n    edges {\n      node {\n        id\n        isPinned\n        ...CommentItem_comment\n        __typename\n      }\n      cursor\n    }\n  }\n  ...CommentItem_target\n}\n\nfragment ReactionButton_target on ReactionsInterface {\n  __isReactionsInterface: __typename\n  id\n  reactionsCount {\n    total\n  }\n  myReaction {\n    id\n    reactionType\n  }\n}\n"
  }
};
})();

(node as any).hash = "873f3258ff0a18f046b689e6aafb00c9";

export default node;
