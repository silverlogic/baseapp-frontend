/**
 * @generated SignedSource<<1a7baae91ddab6e028131e6c65eb9fbf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CommentsRefetchQuery$variables = {
  id: string;
  isCommentsOpened?: boolean | null | undefined;
};
export type CommentsRefetchQuery$data = {
  readonly node: {
    readonly " $fragmentSpreads": FragmentRefs<"CommentsFragment">;
  } | null | undefined;
};
export type CommentsRefetchQuery = {
  response: CommentsRefetchQuery$data;
  variables: CommentsRefetchQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v1 = {
  "defaultValue": true,
  "kind": "LocalArgument",
  "name": "isCommentsOpened"
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
v5 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "total",
    "storageKey": null
  }
],
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "CommentsCount",
  "kind": "LinkedField",
  "name": "commentsCount",
  "plural": false,
  "selections": (v5/*: any*/),
  "storageKey": null
},
v7 = [
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
v8 = {
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
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "CommentsRefetchQuery",
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
                "name": "isCommentsOpened",
                "variableName": "isCommentsOpened"
              }
            ],
            "kind": "FragmentSpread",
            "name": "CommentsFragment"
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
    "name": "CommentsRefetchQuery",
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
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isCommentsEnabled",
                "storageKey": null
              },
              (v6/*: any*/),
              {
                "condition": "isCommentsOpened",
                "kind": "Condition",
                "passingValue": true,
                "selections": [
                  {
                    "alias": null,
                    "args": (v7/*: any*/),
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
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "isPinned",
                                "storageKey": null
                              },
                              (v8/*: any*/),
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
                                  (v4/*: any*/),
                                  (v8/*: any*/),
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
                              (v6/*: any*/),
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
                              (v3/*: any*/),
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
                                    "selections": (v5/*: any*/),
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
                    "storageKey": "comments(first:5,orderBy:\"-is_pinned,-created\")"
                  },
                  {
                    "alias": null,
                    "args": (v7/*: any*/),
                    "filters": [],
                    "handle": "connection",
                    "key": "CommentsList_comments",
                    "kind": "LinkedHandle",
                    "name": "comments"
                  }
                ]
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
    "cacheID": "29c62fd9e62f6ecb8ffe052163e053c6",
    "id": null,
    "metadata": {},
    "name": "CommentsRefetchQuery",
    "operationKind": "query",
    "text": "query CommentsRefetchQuery(\n  $isCommentsOpened: Boolean = true\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...CommentsFragment_2iZoM\n    id\n  }\n}\n\nfragment CommentItem_comment on Comment {\n  id\n  pk\n  body\n  isPinned\n  user {\n    id\n    pk\n    fullName\n    avatar(width: 50, height: 50) {\n      url\n    }\n  }\n  created\n  commentsCount {\n    total\n  }\n  canChange: hasPerm(perm: \"change\")\n  canDelete: hasPerm(perm: \"delete\")\n  canReport: hasPerm(perm: \"report\")\n  canPin: hasPerm(perm: \"pin\")\n  ...ReactionButton_target\n  ...CommentItem_target\n}\n\nfragment CommentItem_target on CommentsInterface {\n  __isCommentsInterface: __typename\n  id\n}\n\nfragment CommentsFragment_2iZoM on CommentsInterface {\n  __isCommentsInterface: __typename\n  id\n  __typename\n  isCommentsEnabled\n  commentsCount {\n    total\n  }\n  ...CommentsList_comments @include(if: $isCommentsOpened)\n  ...CommentItem_target\n}\n\nfragment CommentsList_comments on CommentsInterface {\n  __isCommentsInterface: __typename\n  id\n  commentsCount {\n    total\n  }\n  comments(first: 5, orderBy: \"-is_pinned,-created\") {\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n    edges {\n      node {\n        id\n        isPinned\n        ...CommentItem_comment\n        __typename\n      }\n      cursor\n    }\n  }\n  ...CommentItem_target\n}\n\nfragment ReactionButton_target on ReactionsInterface {\n  __isReactionsInterface: __typename\n  id\n  reactionsCount {\n    total\n  }\n  myReaction {\n    id\n    reactionType\n  }\n}\n"
  }
};
})();

(node as any).hash = "5c6447c09e41ab2fcd66157fb900571a";

export default node;
