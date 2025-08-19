/**
 * @generated SignedSource<<73162772fbc8594c4fedd88116daf5f2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BlockToggleInput = {
  actorObjectId: string;
  clientMutationId?: string | null | undefined;
  targetObjectId: string;
};
export type BlockToggleMutation$variables = {
  input: BlockToggleInput;
};
export type BlockToggleMutation$data = {
  readonly blockToggle: {
    readonly block: {
      readonly node: {
        readonly id: string;
      } | null | undefined;
    } | null | undefined;
    readonly blockDeletedId: string | null | undefined;
    readonly target: {
      readonly id: string;
      readonly isBlockedByMe: boolean | null | undefined;
      readonly " $fragmentSpreads": FragmentRefs<"BlockToggleFragment">;
    } | null | undefined;
  } | null | undefined;
};
export type BlockToggleMutation = {
  response: BlockToggleMutation$data;
  variables: BlockToggleMutation$variables;
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
  "concreteType": "BlockEdge",
  "kind": "LinkedField",
  "name": "block",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Block",
      "kind": "LinkedField",
      "name": "node",
      "plural": false,
      "selections": [
        (v2/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "blockDeletedId",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isBlockedByMe",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "BlockToggleMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "BlockTogglePayload",
        "kind": "LinkedField",
        "name": "blockToggle",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "target",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v5/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "BlockToggleFragment"
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
    "name": "BlockToggleMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "BlockTogglePayload",
        "kind": "LinkedField",
        "name": "blockToggle",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "deleteRecord",
            "key": "",
            "kind": "ScalarHandle",
            "name": "blockDeletedId"
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
              (v5/*: any*/),
              {
                "kind": "TypeDiscriminator",
                "abstractKey": "__isBlocksInterface"
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "name",
                    "storageKey": null
                  }
                ],
                "type": "Profile",
                "abstractKey": null
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
    "cacheID": "ffed8bf057da30f64200e9f801d9186c",
    "id": null,
    "metadata": {},
    "name": "BlockToggleMutation",
    "operationKind": "mutation",
    "text": "mutation BlockToggleMutation(\n  $input: BlockToggleInput!\n) {\n  blockToggle(input: $input) {\n    block {\n      node {\n        id\n      }\n    }\n    blockDeletedId\n    target {\n      __typename\n      id\n      isBlockedByMe\n      ...BlockToggleFragment\n    }\n  }\n}\n\nfragment BlockToggleFragment on BlocksInterface {\n  __isBlocksInterface: __typename\n  id\n  isBlockedByMe\n  ... on Profile {\n    id\n    name\n  }\n}\n"
  }
};
})();

(node as any).hash = "065f29d79d6f508cd4db5788802958e5";

export default node;
