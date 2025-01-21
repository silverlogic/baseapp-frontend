/**
 * @generated SignedSource<<736dea7090465a624ce8a92c4ec975ae>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BlockToggleFragment$data = {
  readonly id: string;
  readonly isBlockedByMe: boolean | null | undefined;
  readonly name?: string | null | undefined;
  readonly " $fragmentType": "BlockToggleFragment";
};
export type BlockToggleFragment$key = {
  readonly " $data"?: BlockToggleFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"BlockToggleFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BlockToggleFragment",
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
      "name": "isBlockedByMe",
      "storageKey": null
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
  "type": "BlocksInterface",
  "abstractKey": "__isBlocksInterface"
};

(node as any).hash = "e03ed2e064ae6dbdca724087c1dfdd16";

export default node;
