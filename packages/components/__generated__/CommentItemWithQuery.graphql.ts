/**
 * @generated SignedSource<<ac6ed2aed0281f48e08abfd7c2e378aa>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CommentItemWithQuery$variables = Record<PropertyKey, never>;
export type CommentItemWithQuery$data = {
  readonly target: {
    readonly " $fragmentSpreads": FragmentRefs<"CommentItem_comment">;
  } | null | undefined;
};
export type CommentItemWithQuery = {
  response: CommentItemWithQuery$data;
  variables: CommentItemWithQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "test-id"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "pk",
  "storageKey": null
},
v3 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "total",
    "storageKey": null
  }
],
v4 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v5 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v6 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v7 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v8 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v9 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "CommentItemWithQuery",
    "selections": [
      {
        "alias": "target",
        "args": (v0/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "CommentItem_comment"
          }
        ],
        "storageKey": "node(id:\"test-id\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "CommentItemWithQuery",
    "selections": [
      {
        "alias": "target",
        "args": (v0/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          (v1/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v2/*: any*/),
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
                  (v1/*: any*/),
                  (v2/*: any*/),
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
                "selections": (v3/*: any*/),
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
                    "selections": (v3/*: any*/),
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
                      (v1/*: any*/),
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
            "type": "Comment",
            "abstractKey": null
          }
        ],
        "storageKey": "node(id:\"test-id\")"
      }
    ]
  },
  "params": {
    "cacheID": "5163abd4a91f774725f50d7ce4c25b6e",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "target": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Node"
        },
        "target.__isCommentsInterface": (v4/*: any*/),
        "target.__isReactionsInterface": (v4/*: any*/),
        "target.__typename": (v4/*: any*/),
        "target.body": (v5/*: any*/),
        "target.canChange": (v6/*: any*/),
        "target.canDelete": (v6/*: any*/),
        "target.canPin": (v6/*: any*/),
        "target.canReport": (v6/*: any*/),
        "target.commentsCount": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "CommentsCount"
        },
        "target.commentsCount.total": (v7/*: any*/),
        "target.created": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "DateTime"
        },
        "target.id": (v8/*: any*/),
        "target.isPinned": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Boolean"
        },
        "target.myReaction": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Reaction"
        },
        "target.myReaction.id": (v8/*: any*/),
        "target.myReaction.reactionType": {
          "enumValues": [
            "LIKE",
            "DISLIKE"
          ],
          "nullable": true,
          "plural": false,
          "type": "ReactionTypes"
        },
        "target.pk": (v9/*: any*/),
        "target.reactionsCount": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ReactionsCount"
        },
        "target.reactionsCount.total": (v7/*: any*/),
        "target.user": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "User"
        },
        "target.user.avatar": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "File"
        },
        "target.user.avatar.url": (v4/*: any*/),
        "target.user.fullName": (v5/*: any*/),
        "target.user.id": (v8/*: any*/),
        "target.user.pk": (v9/*: any*/)
      }
    },
    "name": "CommentItemWithQuery",
    "operationKind": "query",
    "text": "query CommentItemWithQuery {\n  target: node(id: \"test-id\") {\n    __typename\n    ...CommentItem_comment\n    id\n  }\n}\n\nfragment CommentItem_comment on Comment {\n  id\n  pk\n  body\n  isPinned\n  user {\n    id\n    pk\n    fullName\n    avatar(width: 50, height: 50) {\n      url\n    }\n  }\n  created\n  commentsCount {\n    total\n  }\n  canChange: hasPerm(perm: \"change\")\n  canDelete: hasPerm(perm: \"delete\")\n  canReport: hasPerm(perm: \"report\")\n  canPin: hasPerm(perm: \"pin\")\n  ...ReactionButton_target\n  ...CommentItem_target\n}\n\nfragment CommentItem_target on CommentsInterface {\n  __isCommentsInterface: __typename\n  id\n}\n\nfragment ReactionButton_target on ReactionsInterface {\n  __isReactionsInterface: __typename\n  id\n  reactionsCount {\n    total\n  }\n  myReaction {\n    id\n    reactionType\n  }\n}\n"
  }
};
})();

(node as any).hash = "b82095e37c4404b9cfe9b3703c7ee2c7";

export default node;
