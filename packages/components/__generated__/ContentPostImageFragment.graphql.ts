/**
 * @generated SignedSource<<86ab27669d48459a497248cec5ebaa70>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContentPostImageFragment$data = {
  readonly image: {
    readonly url: string;
  } | null | undefined;
  readonly pk: number;
  readonly " $fragmentType": "ContentPostImageFragment";
};
export type ContentPostImageFragment$key = {
  readonly " $data"?: ContentPostImageFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ContentPostImageFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": 0,
      "kind": "LocalArgument",
      "name": "height"
    },
    {
      "defaultValue": 600,
      "kind": "LocalArgument",
      "name": "width"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContentPostImageFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "pk",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "height",
          "variableName": "height"
        },
        {
          "kind": "Variable",
          "name": "width",
          "variableName": "width"
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
      "storageKey": null
    }
  ],
  "type": "ContentPostImage",
  "abstractKey": null
};

(node as any).hash = "c80c921e308621b11cf6bbbc6a94f1db";

export default node;
