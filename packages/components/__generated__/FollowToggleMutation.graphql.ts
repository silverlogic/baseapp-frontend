/**
 * @generated SignedSource<<8276dbaf2910f221fe54d71ac7892ac4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FollowToggleInput = {
  actorObjectId: string;
  clientMutationId?: string | null | undefined;
  targetObjectId: string;
};
export type FollowToggleMutation$variables = {
  input: FollowToggleInput;
};
export type FollowToggleMutation$data = {
  readonly followToggle: {
    readonly follow: {
      readonly node: {
        readonly target: {
          readonly $updatableFragmentSpreads: FragmentRefs<"FollowToggleUpdatableFragment">;
          readonly followersCount: number | null | undefined;
          readonly isFollowedByMe: boolean | null | undefined;
        };
      } | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type FollowToggleMutation = {
  response: FollowToggleMutation$data;
  variables: FollowToggleMutation$variables;
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
  "name": "isFollowedByMe",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "followersCount",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "FollowToggleMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "FollowTogglePayload",
        "kind": "LinkedField",
        "name": "followToggle",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "FollowEdge",
            "kind": "LinkedField",
            "name": "follow",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Follow",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Profile",
                    "kind": "LinkedField",
                    "name": "target",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/),
                      {
                        "args": null,
                        "kind": "FragmentSpread",
                        "name": "FollowToggleUpdatableFragment"
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
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
    "name": "FollowToggleMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "FollowTogglePayload",
        "kind": "LinkedField",
        "name": "followToggle",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "FollowEdge",
            "kind": "LinkedField",
            "name": "follow",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Follow",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Profile",
                    "kind": "LinkedField",
                    "name": "target",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      },
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v4/*: any*/)
                ],
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
    "cacheID": "ebebfbcba39ec99da7c9589554a460d5",
    "id": null,
    "metadata": {},
    "name": "FollowToggleMutation",
    "operationKind": "mutation",
    "text": "mutation FollowToggleMutation(\n  $input: FollowToggleInput!\n) {\n  followToggle(input: $input) {\n    follow {\n      node {\n        target {\n          isFollowedByMe\n          followersCount\n          __typename\n          id\n        }\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "d58a9c2e3572d54fec982030e1ccaab0";

export default node;
