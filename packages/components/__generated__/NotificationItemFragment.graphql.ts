/**
 * @generated SignedSource<<a9fbeeb3680d755d1a58dce1f9087c42>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type NotificationsNotificationLevelChoices = "ERROR" | "INFO" | "SUCCESS" | "WARNING" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type NotificationItemFragment$data = {
  readonly actionObject: {
    readonly __typename: string;
    readonly body?: string | null | undefined;
    readonly id: string;
  } | null | undefined;
  readonly actor: {
    readonly avatar?: {
      readonly url: string;
    } | null | undefined;
    readonly fullName?: string | null | undefined;
    readonly id: string;
  } | null | undefined;
  readonly data: any | null | undefined;
  readonly description: string | null | undefined;
  readonly id: string;
  readonly level: NotificationsNotificationLevelChoices;
  readonly pk: number;
  readonly target: {
    readonly __typename: string;
    readonly body?: string | null | undefined;
    readonly id: string;
  } | null | undefined;
  readonly timestamp: any;
  readonly unread: boolean;
  readonly verb: string;
  readonly " $fragmentType": "NotificationItemFragment";
};
export type NotificationItemFragment$key = {
  readonly " $data"?: NotificationItemFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"NotificationItemFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = [
  (v0/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "__typename",
    "storageKey": null
  },
  {
    "kind": "InlineFragment",
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "body",
        "storageKey": null
      }
    ],
    "type": "Comment",
    "abstractKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NotificationItemFragment",
  "selections": [
    (v0/*: any*/),
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
      "name": "unread",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "timestamp",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "level",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "verb",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "data",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "actor",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "alias": null,
              "args": [
                {
                  "kind": "Literal",
                  "name": "height",
                  "value": 48
                },
                {
                  "kind": "Literal",
                  "name": "width",
                  "value": 48
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
              "storageKey": "avatar(height:48,width:48)"
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "fullName",
              "storageKey": null
            }
          ],
          "type": "User",
          "abstractKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "target",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "actionObject",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": null
    }
  ],
  "type": "Notification",
  "abstractKey": null
};
})();

(node as any).hash = "18973be33a78d4c8acc5affd35b1a004";

export default node;
