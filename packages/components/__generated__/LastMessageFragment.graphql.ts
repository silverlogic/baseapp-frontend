/**
 * @generated SignedSource<<4f7971583764d5dd567a0026d9a0cf6b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LastMessageFragment$data = {
  readonly id: string;
  readonly lastMessage: {
    readonly content: string | null | undefined;
    readonly id: string;
  } | null | undefined;
  readonly lastMessageTime: any | null | undefined;
  readonly " $fragmentType": "LastMessageFragment";
};
export type LastMessageFragment$key = {
  readonly " $data"?: LastMessageFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"LastMessageFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LastMessageFragment",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "lastMessageTime",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Message",
      "kind": "LinkedField",
      "name": "lastMessage",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "content",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ChatRoom",
  "abstractKey": null
};
})();

(node as any).hash = "6aa67bb28e1946c5fb70f4ebf6213e7b";

export default node;
