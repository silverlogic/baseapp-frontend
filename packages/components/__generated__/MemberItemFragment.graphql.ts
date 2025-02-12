/**
 * @generated SignedSource<<15dc9b53215c47ddbaac982d5c81d426>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ProfileRoleStatus = "ACTIVE" | "INACTIVE" | "PENDING" | "%future added value";
export type ProfileRoles = "ADMIN" | "MANAGER" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type MemberItemFragment$data = {
  readonly id: string;
  readonly role: ProfileRoles | null | undefined;
  readonly status: ProfileRoleStatus | null | undefined;
  readonly user: {
    readonly profile: {
      readonly " $fragmentSpreads": FragmentRefs<"ProfileItemFragment">;
    } | null | undefined;
  };
  readonly " $fragmentType": "MemberItemFragment";
};
export type MemberItemFragment$key = {
  readonly " $data"?: MemberItemFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MemberItemFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MemberItemFragment",
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
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "user",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Profile",
          "kind": "LinkedField",
          "name": "profile",
          "plural": false,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ProfileItemFragment"
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
      "kind": "ScalarField",
      "name": "role",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "status",
      "storageKey": null
    }
  ],
  "type": "ProfileUserRole",
  "abstractKey": null
};

(node as any).hash = "bd85958690e77e1ccd3a6cc89ce44335";

export default node;
