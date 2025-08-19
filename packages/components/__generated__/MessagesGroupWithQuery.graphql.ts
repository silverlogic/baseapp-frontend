/**
 * @generated SignedSource<<2d81694e831a6f275dcb1674fd9acee4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MessageType = "SYSTEM_GENERATED" | "USER_MESSAGE" | "%future added value";
export type MessagesGroupWithQuery$variables = Record<PropertyKey, never>;
export type MessagesGroupWithQuery$data = {
  readonly node: {
    readonly __typename: "Message";
    readonly created: any;
    readonly id: string;
    readonly isRead: boolean | null | undefined;
    readonly messageType: MessageType | null | undefined;
    readonly profile: {
      readonly id: string;
      readonly image: {
        readonly url: string;
      } | null | undefined;
      readonly name: string | null | undefined;
    } | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"MessageItemFragment">;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  } | null | undefined;
};
export type MessagesGroupWithQuery = {
  response: MessagesGroupWithQuery$data;
  variables: MessagesGroupWithQuery$variables;
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
  "name": "__typename",
  "storageKey": null
},
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
  "kind": "ScalarField",
  "name": "messageType",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "created",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "concreteType": "Profile",
  "kind": "LinkedField",
  "name": "profile",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "height",
          "value": 32
        },
        {
          "kind": "Literal",
          "name": "width",
          "value": 32
        }
      ],
      "concreteType": "File",
      "kind": "LinkedField",
      "name": "image",
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
      "storageKey": "image(height:32,width:32)"
    }
  ],
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isRead",
  "storageKey": null
},
v7 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v8 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v9 = {
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
    "name": "MessagesGroupWithQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "MessageItemFragment"
              }
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
    "name": "MessagesGroupWithQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
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
                "selections": [
                  (v2/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "pk",
                "storageKey": null
              },
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
    "cacheID": "c78dcea04aecb51e6c5024a61b628269",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Node"
        },
        "node.__typename": (v7/*: any*/),
        "node.content": (v8/*: any*/),
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
        "node.id": (v9/*: any*/),
        "node.inReplyTo": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Message"
        },
        "node.inReplyTo.id": (v9/*: any*/),
        "node.isRead": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Boolean"
        },
        "node.messageType": {
          "enumValues": [
            "USER_MESSAGE",
            "SYSTEM_GENERATED"
          ],
          "nullable": true,
          "plural": false,
          "type": "MessageType"
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
        "node.profile.id": (v9/*: any*/),
        "node.profile.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "File"
        },
        "node.profile.image.url": (v7/*: any*/),
        "node.profile.name": (v8/*: any*/),
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
    "name": "MessagesGroupWithQuery",
    "operationKind": "query",
    "text": "query MessagesGroupWithQuery {\n  node(id: \"msg-1\") {\n    __typename\n    ... on Message {\n      id\n      messageType\n      created\n      profile {\n        id\n        name\n        image(width: 32, height: 32) {\n          url\n        }\n      }\n      isRead\n      ...MessageItemFragment\n    }\n    id\n  }\n}\n\nfragment MessageItemFragment on Message {\n  id\n  content\n  created\n  deleted\n  extraData\n  inReplyTo {\n    id\n  }\n  isRead\n  pk\n  profile {\n    id\n  }\n  verb\n}\n"
  }
};
})();

(node as any).hash = "54d70117439b3c16ecde085e4c792805";

export default node;
