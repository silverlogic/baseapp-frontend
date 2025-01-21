/**
 * @generated SignedSource<<0c7af4c419997e9ef8ef7bf922938d7c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { UpdatableFragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FollowToggleUpdatableFragment$data = {
  followersCount: number | null | undefined;
  isFollowedByMe: boolean | null | undefined;
  readonly " $fragmentType": "FollowToggleUpdatableFragment";
};
export type FollowToggleUpdatableFragment$key = {
  readonly " $data"?: FollowToggleUpdatableFragment$data;
  readonly $updatableFragmentSpreads: FragmentRefs<"FollowToggleUpdatableFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FollowToggleUpdatableFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isFollowedByMe",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "followersCount",
      "storageKey": null
    }
  ],
  "type": "Profile",
  "abstractKey": null
};

(node as any).hash = "4d151f5906c7d00fa429a6ccd27ca8bd";

export default node;
