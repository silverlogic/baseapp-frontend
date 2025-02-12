/**
 * @generated SignedSource<<98457f1eacc573a4e2f55afe1a4060e0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type Verbs = "SENT_MESSAGE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type MessageItemFragment$data = {
  readonly content: string | null | undefined;
  readonly created: any;
  readonly extraData: any | null | undefined;
  readonly id: string;
  readonly inReplyTo: {
    readonly id: string;
  } | null | undefined;
  readonly isRead: boolean | null | undefined;
  readonly pk: number;
  readonly profile: {
    readonly id: string;
  } | null | undefined;
  readonly verb: Verbs | null | undefined;
  readonly " $fragmentType": "MessageItemFragment";
};
export type MessageItemFragment$key = {
  readonly " $data"?: MessageItemFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MessageItemFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = [
  (v0/*: any*/)
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MessageItemFragment",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "content",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "created",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "extraData",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Message",
      "kind": "LinkedField",
      "name": "inReplyTo",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isRead",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "pk",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Profile",
      "kind": "LinkedField",
      "name": "profile",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "verb",
      "storageKey": null
    }
  ],
  "type": "Message",
  "abstractKey": null
};
})();

(node as any).hash = "c4f28d75734c65a3d4e80722daecfd7e";

export default node;
