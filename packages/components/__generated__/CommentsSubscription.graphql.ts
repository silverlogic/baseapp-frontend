/**
 * @generated SignedSource<<2b336b1c222971bc23fafc50ae47f919>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CommentsSubscription$variables = {
  connections: ReadonlyArray<string>;
  targetObjectId?: string | null | undefined;
};
export type CommentsSubscription$data = {
  readonly onCommentChange: {
    readonly createdComment: {
      readonly node: {
        readonly id: string;
        readonly target: {
          readonly commentsCount: {
            readonly main: number | null | undefined;
            readonly replies: number | null | undefined;
            readonly total: number | null | undefined;
          };
        } | null | undefined;
        readonly " $fragmentSpreads": FragmentRefs<"CommentItem_comment">;
      } | null | undefined;
    } | null | undefined;
    readonly deletedCommentId: string | null | undefined;
    readonly updatedComment: {
      readonly " $fragmentSpreads": FragmentRefs<"CommentItem_comment">;
    } | null | undefined;
  } | null | undefined;
};
export type CommentsSubscription = {
  response: CommentsSubscription$data;
  variables: CommentsSubscription$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "connections"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "targetObjectId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "targetObjectId",
    "variableName": "targetObjectId"
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
  "args": null,
  "kind": "FragmentSpread",
  "name": "CommentItem_comment"
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "total",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "concreteType": "CommentsCount",
  "kind": "LinkedField",
  "name": "commentsCount",
  "plural": false,
  "selections": [
    (v4/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "main",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "replies",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "deletedCommentId",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "pk",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "body",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isPinned",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "user",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    (v7/*: any*/),
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
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "created",
  "storageKey": null
},
v12 = [
  (v4/*: any*/)
],
v13 = {
  "alias": null,
  "args": null,
  "concreteType": "CommentsCount",
  "kind": "LinkedField",
  "name": "commentsCount",
  "plural": false,
  "selections": (v12/*: any*/),
  "storageKey": null
},
v14 = {
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
v15 = {
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
v16 = {
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
v17 = {
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
v18 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ReactionsCount",
      "kind": "LinkedField",
      "name": "reactionsCount",
      "plural": false,
      "selections": (v12/*: any*/),
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
},
v19 = {
  "kind": "TypeDiscriminator",
  "abstractKey": "__isCommentsInterface"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CommentsSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "OnCommentChange",
        "kind": "LinkedField",
        "name": "onCommentChange",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "CommentEdge",
            "kind": "LinkedField",
            "name": "createdComment",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Comment",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "target",
                    "plural": false,
                    "selections": [
                      (v5/*: any*/)
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
            "concreteType": "Comment",
            "kind": "LinkedField",
            "name": "updatedComment",
            "plural": false,
            "selections": [
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          (v6/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CommentsSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "OnCommentChange",
        "kind": "LinkedField",
        "name": "onCommentChange",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "CommentEdge",
            "kind": "LinkedField",
            "name": "createdComment",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Comment",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  (v9/*: any*/),
                  (v10/*: any*/),
                  (v11/*: any*/),
                  (v13/*: any*/),
                  (v14/*: any*/),
                  (v15/*: any*/),
                  (v16/*: any*/),
                  (v17/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "target",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      },
                      (v5/*: any*/),
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v18/*: any*/),
                  (v19/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "prependEdge",
            "key": "",
            "kind": "LinkedHandle",
            "name": "createdComment",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              }
            ]
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Comment",
            "kind": "LinkedField",
            "name": "updatedComment",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/),
              (v11/*: any*/),
              (v13/*: any*/),
              (v14/*: any*/),
              (v15/*: any*/),
              (v16/*: any*/),
              (v17/*: any*/),
              (v18/*: any*/),
              (v19/*: any*/)
            ],
            "storageKey": null
          },
          (v6/*: any*/),
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "deleteRecord",
            "key": "",
            "kind": "ScalarHandle",
            "name": "deletedCommentId"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "e23e08eb3ec21610ecbc8771eed8f73f",
    "id": null,
    "metadata": {},
    "name": "CommentsSubscription",
    "operationKind": "subscription",
    "text": "subscription CommentsSubscription(\n  $targetObjectId: ID\n) {\n  onCommentChange(targetObjectId: $targetObjectId) {\n    createdComment {\n      node {\n        id\n        ...CommentItem_comment\n        target {\n          __typename\n          commentsCount {\n            total\n            main\n            replies\n          }\n          id\n        }\n      }\n    }\n    updatedComment {\n      ...CommentItem_comment\n      id\n    }\n    deletedCommentId\n  }\n}\n\nfragment CommentItem_comment on Comment {\n  id\n  pk\n  body\n  isPinned\n  user {\n    id\n    pk\n    fullName\n    avatar(width: 50, height: 50) {\n      url\n    }\n  }\n  created\n  commentsCount {\n    total\n  }\n  canChange: hasPerm(perm: \"change\")\n  canDelete: hasPerm(perm: \"delete\")\n  canReport: hasPerm(perm: \"report\")\n  canPin: hasPerm(perm: \"pin\")\n  ...ReactionButton_target\n  ...CommentItem_target\n}\n\nfragment CommentItem_target on CommentsInterface {\n  __isCommentsInterface: __typename\n  id\n}\n\nfragment ReactionButton_target on ReactionsInterface {\n  __isReactionsInterface: __typename\n  id\n  reactionsCount {\n    total\n  }\n  myReaction {\n    id\n    reactionType\n  }\n}\n"
  }
};
})();

(node as any).hash = "f649494aea3b062943d369c8368ca337";

export default node;
