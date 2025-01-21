/**
 * @generated SignedSource<<d68d549dde1a87b5281fa7f6cf3c5850>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ProfilesProfileStatusChoices = "A_1" | "A_2" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ProfileComponentFragment$data = {
  readonly bannerImage: {
    readonly url: string;
  } | null | undefined;
  readonly biography: string | null | undefined;
  readonly canChange: boolean | null | undefined;
  readonly followersCount: number | null | undefined;
  readonly followingCount: number | null | undefined;
  readonly id: string;
  readonly image: {
    readonly url: string;
  } | null | undefined;
  readonly isBlockedByMe: boolean | null | undefined;
  readonly isFollowedByMe: boolean | null | undefined;
  readonly name: string | null | undefined;
  readonly owner: {
    readonly phoneNumber: string | null | undefined;
  };
  readonly status: ProfilesProfileStatusChoices;
  readonly urlPath: {
    readonly path: string;
  } | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"BlockToggleFragment">;
  readonly " $fragmentType": "ProfileComponentFragment";
};
export type ProfileComponentFragment$key = {
  readonly " $data"?: ProfileComponentFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ProfileComponentFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "url",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProfileComponentFragment",
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
      "name": "status",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "biography",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "height",
          "value": 96
        },
        {
          "kind": "Literal",
          "name": "width",
          "value": 96
        }
      ],
      "concreteType": "File",
      "kind": "LinkedField",
      "name": "image",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": "image(height:96,width:96)"
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "height",
          "value": 290
        },
        {
          "kind": "Literal",
          "name": "width",
          "value": 868
        }
      ],
      "concreteType": "File",
      "kind": "LinkedField",
      "name": "bannerImage",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": "bannerImage(height:290,width:868)"
    },
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "followingCount",
      "storageKey": null
    },
    {
      "alias": "canChange",
      "args": [
        {
          "kind": "Literal",
          "name": "perm",
          "value": "change"
        }
      ],
      "kind": "ScalarField",
      "name": "hasPerm",
      "storageKey": "hasPerm(perm:\"change\")"
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "URLPath",
      "kind": "LinkedField",
      "name": "urlPath",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "path",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "owner",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "phoneNumber",
          "storageKey": null
        }
      ],
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "BlockToggleFragment"
    }
  ],
  "type": "Profile",
  "abstractKey": null
};
})();

(node as any).hash = "14c553f27fa01a11431eb14bb57b92c8";

export default node;
