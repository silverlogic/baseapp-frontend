/**
 * @generated SignedSource<<35765f1d23fc101e8417e89d7675db1c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CommentCreateInput = {
  body: string;
  clientMutationId?: string | null | undefined;
  inReplyToId?: string | null | undefined;
  profileId?: string | null | undefined;
  targetObjectId: string;
};
export type CommentCreateMutation$variables = {
  connections: ReadonlyArray<string>;
  input: CommentCreateInput;
};
export type CommentCreateMutation$data = {
  readonly commentCreate: {
    readonly comment: {
      readonly node: {
        readonly id: string;
        readonly inReplyTo: {
          readonly commentsCount: {
            readonly main: number | null | undefined;
            readonly replies: number | null | undefined;
            readonly total: number | null | undefined;
          };
          readonly id: string;
        } | null | undefined;
        readonly target: {
          readonly commentsCount: {
            readonly main: number | null | undefined;
            readonly replies: number | null | undefined;
            readonly total: number | null | undefined;
          };
          readonly id: string;
        } | null | undefined;
        readonly " $fragmentSpreads": FragmentRefs<"CommentItem_comment">;
      } | null | undefined;
    } | null | undefined;
    readonly errors: ReadonlyArray<{
      readonly field: string;
      readonly messages: ReadonlyArray<string>;
    } | null | undefined> | null | undefined;
  } | null | undefined;
};
export type CommentCreateMutation = {
  response: CommentCreateMutation$data;
  variables: CommentCreateMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v2 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
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
v6 = [
  (v3/*: any*/),
  (v5/*: any*/)
],
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "Comment",
  "kind": "LinkedField",
  "name": "inReplyTo",
  "plural": false,
  "selections": (v6/*: any*/),
  "storageKey": null
},
v8 = {
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
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "pk",
  "storageKey": null
},
v10 = [
  (v4/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "CommentCreateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "CommentCreatePayload",
        "kind": "LinkedField",
        "name": "commentCreate",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "CommentEdge",
            "kind": "LinkedField",
            "name": "comment",
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
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "target",
                    "plural": false,
                    "selections": (v6/*: any*/),
                    "storageKey": null
                  },
                  (v7/*: any*/),
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "CommentItem_comment"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v8/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "CommentCreateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "CommentCreatePayload",
        "kind": "LinkedField",
        "name": "commentCreate",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "CommentEdge",
            "kind": "LinkedField",
            "name": "comment",
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
                  (v3/*: any*/),
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
                      (v3/*: any*/),
                      (v5/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v7/*: any*/),
                  (v9/*: any*/),
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
                    "kind": "ScalarField",
                    "name": "isPinned",
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
                      (v3/*: any*/),
                      (v9/*: any*/),
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
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "CommentsCount",
                    "kind": "LinkedField",
                    "name": "commentsCount",
                    "plural": false,
                    "selections": (v10/*: any*/),
                    "storageKey": null
                  },
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
                          (v3/*: any*/),
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
            "name": "comment",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              }
            ]
          },
          (v8/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "1df6b1cc4ffb8c4f9160a80391bb797e",
    "id": null,
    "metadata": {},
    "name": "CommentCreateMutation",
    "operationKind": "mutation",
    "text": "mutation CommentCreateMutation(\n  $input: CommentCreateInput!\n) {\n  commentCreate(input: $input) {\n    comment {\n      node {\n        id\n        target {\n          __typename\n          id\n          commentsCount {\n            total\n            main\n            replies\n          }\n        }\n        inReplyTo {\n          id\n          commentsCount {\n            total\n            main\n            replies\n          }\n        }\n        ...CommentItem_comment\n      }\n    }\n    errors {\n      field\n      messages\n    }\n  }\n}\n\nfragment CommentItem_comment on Comment {\n  id\n  pk\n  body\n  isPinned\n  user {\n    id\n    pk\n    fullName\n    avatar(width: 50, height: 50) {\n      url\n    }\n  }\n  created\n  commentsCount {\n    total\n  }\n  canChange: hasPerm(perm: \"change\")\n  canDelete: hasPerm(perm: \"delete\")\n  canReport: hasPerm(perm: \"report\")\n  canPin: hasPerm(perm: \"pin\")\n  ...ReactionButton_target\n  ...CommentItem_target\n}\n\nfragment CommentItem_target on CommentsInterface {\n  __isCommentsInterface: __typename\n  id\n}\n\nfragment ReactionButton_target on ReactionsInterface {\n  __isReactionsInterface: __typename\n  id\n  reactionsCount {\n    total\n  }\n  myReaction {\n    id\n    reactionType\n  }\n}\n"
  }
};
})();

(node as any).hash = "a8c11febd85db3454fcae2f3629bdff2";

export default node;
