/**
 * @generated SignedSource<<204f55088418023a40e5ba8529730c5c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TitleFragment$data = {
  readonly id: string;
  readonly isGroup: boolean;
  readonly " $fragmentSpreads": FragmentRefs<"GroupTitleFragment" | "RoomTitleFragment">;
  readonly " $fragmentType": "TitleFragment";
};
export type TitleFragment$key = {
  readonly " $data"?: TitleFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"TitleFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TitleFragment",
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
      "name": "isGroup",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RoomTitleFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "GroupTitleFragment"
    }
  ],
  "type": "ChatRoom",
  "abstractKey": null
};

(node as any).hash = "0b053ad212f52bdfe86f56b46c3873bf";

export default node;
