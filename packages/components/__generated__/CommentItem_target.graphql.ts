/**
 * @generated SignedSource<<665d013fd7669934e748abea821986b1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CommentItem_target$data = {
  readonly id: string;
  readonly " $fragmentType": "CommentItem_target";
};
export type CommentItem_target$key = {
  readonly " $data"?: CommentItem_target$data;
  readonly " $fragmentSpreads": FragmentRefs<"CommentItem_target">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CommentItem_target",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "CommentsInterface",
  "abstractKey": "__isCommentsInterface"
};

(node as any).hash = "6b7c78ab34a5b8f4ef45b6facdfadf6b";

export default node;
