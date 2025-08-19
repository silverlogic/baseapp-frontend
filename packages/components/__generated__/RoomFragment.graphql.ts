/**
 * @generated SignedSource<<091daca46d42d6c2480ef5a86bef4f5f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RoomFragment$data = {
  readonly id: string;
  readonly isGroup: boolean;
  readonly participantsCount: number;
  readonly " $fragmentSpreads": FragmentRefs<"LastMessageFragment" | "MessagesListFragment" | "TitleFragment" | "UnreadMessagesCountFragment">;
  readonly " $fragmentType": "RoomFragment";
};
export type RoomFragment$key = {
  readonly " $data"?: RoomFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RoomFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RoomFragment",
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "participantsCount",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "LastMessageFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MessagesListFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "TitleFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UnreadMessagesCountFragment"
    }
  ],
  "type": "ChatRoom",
  "abstractKey": null
};

(node as any).hash = "eaa59457c134fb1f7bad4797532926da";

export default node;
