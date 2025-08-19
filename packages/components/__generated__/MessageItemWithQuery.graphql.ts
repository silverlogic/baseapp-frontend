/**
 * @generated SignedSource<<fc7f61332987b78865868a3a169f8de9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MessageItemWithQuery$variables = Record<PropertyKey, never>;
export type MessageItemWithQuery$data = {
  readonly node: {
    readonly profile?: {
      readonly id: string;
    } | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"MessageItemFragment">;
  } | null | undefined;
};
export type MessageItemWithQuery = {
  response: MessageItemWithQuery$data;
  variables: MessageItemWithQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "msg-1"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  (v1/*: any*/)
],
v3 = {
  "alias": null,
  "args": null,
  "concreteType": "Profile",
  "kind": "LinkedField",
  "name": "profile",
  "plural": false,
  "selections": (v2/*: any*/),
  "storageKey": null
},
v4 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MessageItemWithQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "MessageItemFragment"
              },
              (v3/*: any*/)
            ],
            "type": "Message",
            "abstractKey": null
          }
        ],
        "storageKey": "node(id:\"msg-1\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MessageItemWithQuery",
    "selections": [
      {
        "alias": null,
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
                "kind": "ScalarField",
                "name": "created",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "deleted",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "extraData",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Message",
                "kind": "LinkedField",
                "name": "inReplyTo",
                "plural": false,
                "selections": (v2/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isRead",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "pk",
                "storageKey": null
              },
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "verb",
                "storageKey": null
              }
            ],
            "type": "Message",
            "abstractKey": null
          }
        ],
        "storageKey": "node(id:\"msg-1\")"
      }
    ]
  },
  "params": {
    "cacheID": "a92b3a04a831dd1d3c3ece48880cea09",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Node"
        },
        "node.__typename": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "String"
        },
        "node.content": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "String"
        },
        "node.created": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "DateTime"
        },
        "node.deleted": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Boolean"
        },
        "node.extraData": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "JSONString"
        },
        "node.id": (v4/*: any*/),
        "node.inReplyTo": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Message"
        },
        "node.inReplyTo.id": (v4/*: any*/),
        "node.isRead": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Boolean"
        },
        "node.pk": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Int"
        },
        "node.profile": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Profile"
        },
        "node.profile.id": (v4/*: any*/),
        "node.verb": {
          "enumValues": [
            "SENT_MESSAGE"
          ],
          "nullable": true,
          "plural": false,
          "type": "Verbs"
        }
      }
    },
    "name": "MessageItemWithQuery",
    "operationKind": "query",
    "text": "query MessageItemWithQuery {\n  node(id: \"msg-1\") {\n    __typename\n    ... on Message {\n      ...MessageItemFragment\n      profile {\n        id\n      }\n    }\n    id\n  }\n}\n\nfragment MessageItemFragment on Message {\n  id\n  content\n  created\n  deleted\n  extraData\n  inReplyTo {\n    id\n  }\n  isRead\n  pk\n  profile {\n    id\n  }\n  verb\n}\n"
  }
};
})();

(node as any).hash = "4f9994d985674a2b7343147670638750";

export default node;
