/**
 * @generated SignedSource<<ac02defad5d49c9d4ff195fd8bd9450b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ReactionTypes = "DISLIKE" | "LIKE" | "%future added value";
export type ReactionToggleInput = {
  clientMutationId?: string | null | undefined;
  profileObjectId?: string | null | undefined;
  reactionType: ReactionTypes;
  targetObjectId: string;
};
export type ReactionButtonMutation$variables = {
  input: ReactionToggleInput;
};
export type ReactionButtonMutation$data = {
  readonly reactionToggle: {
    readonly reaction: {
      readonly node: {
        readonly id: string;
        readonly reactionType: ReactionTypes | null | undefined;
      } | null | undefined;
    } | null | undefined;
    readonly reactionDeletedId: string | null | undefined;
    readonly target: {
      readonly id: string;
      readonly " $fragmentSpreads": FragmentRefs<"ReactionButton_target">;
    } | null | undefined;
  } | null | undefined;
};
export type ReactionButtonMutation$rawResponse = {
  readonly reactionToggle: {
    readonly reaction: {
      readonly node: {
        readonly id: string;
        readonly reactionType: ReactionTypes | null | undefined;
      } | null | undefined;
    } | null | undefined;
    readonly reactionDeletedId: string | null | undefined;
    readonly target: {
      readonly __typename: string;
      readonly __isReactionsInterface: string;
      readonly id: string;
      readonly myReaction: {
        readonly id: string;
        readonly reactionType: ReactionTypes | null | undefined;
      } | null | undefined;
      readonly reactionsCount: {
        readonly total: number | null | undefined;
      } | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type ReactionButtonMutation = {
  rawResponse: ReactionButtonMutation$rawResponse;
  response: ReactionButtonMutation$data;
  variables: ReactionButtonMutation$variables;
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
v3 = [
  (v2/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "reactionType",
    "storageKey": null
  }
],
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "ReactionEdge",
  "kind": "LinkedField",
  "name": "reaction",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Reaction",
      "kind": "LinkedField",
      "name": "node",
      "plural": false,
      "selections": (v3/*: any*/),
      "storageKey": null
    }
  ],
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "reactionDeletedId",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ReactionButtonMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ReactionTogglePayload",
        "kind": "LinkedField",
        "name": "reactionToggle",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          (v5/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "target",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "ReactionButton_target"
              }
            ],
            "storageKey": null
          }
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
    "name": "ReactionButtonMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ReactionTogglePayload",
        "kind": "LinkedField",
        "name": "reactionToggle",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          (v5/*: any*/),
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "deleteRecord",
            "key": "",
            "kind": "ScalarHandle",
            "name": "reactionDeletedId"
          },
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
              (v2/*: any*/),
              {
                "kind": "TypeDiscriminator",
                "abstractKey": "__isReactionsInterface"
              },
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
                "selections": (v3/*: any*/),
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "10b1f38991c6795cddbb1a4cf30f2286",
    "id": null,
    "metadata": {},
    "name": "ReactionButtonMutation",
    "operationKind": "mutation",
    "text": "mutation ReactionButtonMutation(\n  $input: ReactionToggleInput!\n) {\n  reactionToggle(input: $input) {\n    reaction {\n      node {\n        id\n        reactionType\n      }\n    }\n    reactionDeletedId\n    target {\n      __typename\n      id\n      ...ReactionButton_target\n    }\n  }\n}\n\nfragment ReactionButton_target on ReactionsInterface {\n  __isReactionsInterface: __typename\n  id\n  reactionsCount {\n    total\n  }\n  myReaction {\n    id\n    reactionType\n  }\n}\n"
  }
};
})();

(node as any).hash = "5b17c14ee951ae101017eb3ee7e12e5c";

export default node;
