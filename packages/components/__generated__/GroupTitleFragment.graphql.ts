/**
 * @generated SignedSource<<2bee0b25aad7bd9395d4f3183680b1be>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GroupTitleFragment$data = {
  readonly id: string;
  readonly image: {
    readonly url: string;
  } | null | undefined;
  readonly title: string | null | undefined;
  readonly " $fragmentType": "GroupTitleFragment";
};
export type GroupTitleFragment$key = {
  readonly " $data"?: GroupTitleFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"GroupTitleFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "GroupTitleFragment",
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
      "args": [
        {
          "kind": "Literal",
          "name": "height",
          "value": 144
        },
        {
          "kind": "Literal",
          "name": "width",
          "value": 144
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
      "storageKey": "image(height:144,width:144)"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    }
  ],
  "type": "ChatRoom",
  "abstractKey": null
};

(node as any).hash = "ebf3753368c34b19880bd97c408df707";

export default node;
