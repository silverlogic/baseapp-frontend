/**
 * @generated SignedSource<<a26b879710e7675b55740ee0eaf413ad>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DeviceItemFragment$data = {
  readonly address: string | null | undefined;
  readonly browserFamily: string | null | undefined;
  readonly browserVersion: string | null | undefined;
  readonly createdAt: any;
  readonly deviceFamily: string | null | undefined;
  readonly deviceId: string;
  readonly id: string;
  readonly ipAddress: string | null | undefined;
  readonly isMobile: boolean | null | undefined;
  readonly isPc: boolean | null | undefined;
  readonly isTablet: boolean | null | undefined;
  readonly lastLogin: any | null | undefined;
  readonly osFamily: string | null | undefined;
  readonly osVersion: string | null | undefined;
  readonly " $fragmentType": "DeviceItemFragment";
};
export type DeviceItemFragment$key = {
  readonly " $data"?: DeviceItemFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"DeviceItemFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DeviceItemFragment",
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
      "name": "ipAddress",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "osFamily",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "osVersion",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "browserFamily",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "browserVersion",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "deviceFamily",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "createdAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "address",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "lastLogin",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isMobile",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isTablet",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isPc",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "deviceId",
      "storageKey": null
    }
  ],
  "type": "UserDeviceType",
  "abstractKey": null
};

(node as any).hash = "1afcf48476b4fe963200e8043470cccf";

export default node;
