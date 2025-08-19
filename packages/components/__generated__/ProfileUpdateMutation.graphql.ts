/**
 * @generated SignedSource<<c0b889032af91291704af3227d754bbc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProfileUpdateInput = {
  bannerImage?: string | null | undefined;
  biography?: string | null | undefined;
  clientMutationId?: string | null | undefined;
  id: string;
  image?: string | null | undefined;
  name?: string | null | undefined;
  owner?: string | null | undefined;
  phoneNumber?: string | null | undefined;
  urlPath?: string | null | undefined;
};
export type ProfileUpdateMutation$variables = {
  input: ProfileUpdateInput;
};
export type ProfileUpdateMutation$data = {
  readonly profileUpdate: {
    readonly errors: ReadonlyArray<{
      readonly field: string;
      readonly messages: ReadonlyArray<string>;
    } | null | undefined> | null | undefined;
    readonly profile: {
      readonly " $fragmentSpreads": FragmentRefs<"ProfileComponentFragment">;
    } | null | undefined;
  } | null | undefined;
};
export type ProfileUpdateMutation = {
  response: ProfileUpdateMutation$data;
  variables: ProfileUpdateMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "concreteType": "ErrorType",
  "kind": "LinkedField",
  "name": "errors",
  "plural": true,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "field",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "messages",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "url",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ProfileUpdateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ProfileUpdatePayload",
        "kind": "LinkedField",
        "name": "profileUpdate",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Profile",
            "kind": "LinkedField",
            "name": "profile",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "ProfileComponentFragment"
              }
            ],
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ProfileUpdateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ProfileUpdatePayload",
        "kind": "LinkedField",
        "name": "profileUpdate",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Profile",
            "kind": "LinkedField",
            "name": "profile",
            "plural": false,
            "selections": [
              (v3/*: any*/),
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
                "selections": (v4/*: any*/),
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
                "selections": (v4/*: any*/),
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
                  },
                  (v3/*: any*/)
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
                  },
                  (v3/*: any*/)
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
                "kind": "TypeDiscriminator",
                "abstractKey": "__isBlocksInterface"
              }
            ],
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "c0e960cbeeab17c8f65cbae625436ab9",
    "id": null,
    "metadata": {},
    "name": "ProfileUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation ProfileUpdateMutation(\n  $input: ProfileUpdateInput!\n) {\n  profileUpdate(input: $input) {\n    profile {\n      ...ProfileComponentFragment\n      id\n    }\n    errors {\n      field\n      messages\n    }\n  }\n}\n\nfragment BlockToggleFragment on BlocksInterface {\n  __isBlocksInterface: __typename\n  id\n  isBlockedByMe\n  ... on Profile {\n    id\n    name\n  }\n}\n\nfragment ProfileComponentFragment on Profile {\n  id\n  status\n  name\n  biography\n  image(height: 96, width: 96) {\n    url\n  }\n  bannerImage(height: 290, width: 868) {\n    url\n  }\n  isFollowedByMe\n  followersCount\n  followingCount\n  canChange: hasPerm(perm: \"change\")\n  urlPath {\n    path\n    id\n  }\n  owner {\n    phoneNumber\n    id\n  }\n  isBlockedByMe\n  ...BlockToggleFragment\n}\n"
  }
};
})();

(node as any).hash = "b15251b426798b8c3457aed1249f8a64";

export default node;
