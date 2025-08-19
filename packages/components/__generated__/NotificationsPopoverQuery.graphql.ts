/**
 * @generated SignedSource<<e442010015dfff2012f333939c3bc661>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NotificationsPopoverQuery$variables = Record<PropertyKey, never>;
export type NotificationsPopoverQuery$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"NotificationUserMenuFragment">;
  } | null | undefined;
};
export type NotificationsPopoverQuery = {
  response: NotificationsPopoverQuery$data;
  variables: NotificationsPopoverQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "NotificationsPopoverQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "NotificationUserMenuFragment"
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "NotificationsPopoverQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "notificationsUnreadCount",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "58c1485b5059fc1681a5b306cec797c7",
    "id": null,
    "metadata": {},
    "name": "NotificationsPopoverQuery",
    "operationKind": "query",
    "text": "query NotificationsPopoverQuery {\n  me {\n    ...NotificationUserMenuFragment\n    id\n  }\n}\n\nfragment NotificationUserMenuFragment on User {\n  id\n  notificationsUnreadCount\n}\n"
  }
};

(node as any).hash = "5da34ad328e48607b7590cb556daeb22";

export default node;
