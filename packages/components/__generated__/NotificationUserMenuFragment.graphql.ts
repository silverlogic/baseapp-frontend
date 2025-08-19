/**
 * @generated SignedSource<<f74ec13f68d095b5c08006d31b41623e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NotificationUserMenuFragment$data = {
  readonly id: string;
  readonly notificationsUnreadCount: number | null | undefined;
  readonly " $fragmentType": "NotificationUserMenuFragment";
};
export type NotificationUserMenuFragment$key = {
  readonly " $data"?: NotificationUserMenuFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"NotificationUserMenuFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NotificationUserMenuFragment",
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
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "806ea8a5677a68e99edd0409886cb453";

export default node;
