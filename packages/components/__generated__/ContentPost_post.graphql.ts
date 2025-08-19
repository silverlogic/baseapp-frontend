/**
 * @generated SignedSource<<74bf3eebbefc09aa29d51c49c0ee64f7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContentPost_post$data = {
  readonly content: string;
  readonly created: any;
  readonly id: string;
  readonly images: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"ContentPostImageFragment">;
      } | null | undefined;
    } | null | undefined>;
  } | null | undefined;
  readonly isReactionsEnabled: boolean;
  readonly modified: any;
  readonly pk: number;
  readonly profile: {
    readonly " $fragmentSpreads": FragmentRefs<"ProfileItemFragment">;
  } | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"ReactionButton_target">;
  readonly " $fragmentType": "ContentPost_post";
};
export type ContentPost_post$key = {
  readonly " $data"?: ContentPost_post$data;
  readonly " $fragmentSpreads": FragmentRefs<"ContentPost_post">;
};

import ContentPostRefetchQuery_graphql from './ContentPostRefetchQuery.graphql';

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
  "metadata": {
    "refetch": {
      "connection": null,
      "fragmentPathInResult": [
        "node"
      ],
      "operation": ContentPostRefetchQuery_graphql,
      "identifierInfo": {
        "identifierField": "id",
        "identifierQueryVariableName": "id"
      }
    }
  },
  "name": "ContentPost_post",
  "selections": [
    (v0/*: any*/),
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
      "kind": "ScalarField",
      "name": "content",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ContentPostImageConnection",
      "kind": "LinkedField",
      "name": "images",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ContentPostImageEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "ContentPostImage",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v0/*: any*/),
                {
                  "args": [
                    {
                      "kind": "Literal",
                      "name": "height",
                      "value": 0
                    },
                    {
                      "kind": "Literal",
                      "name": "width",
                      "value": 600
                    }
                  ],
                  "kind": "FragmentSpread",
                  "name": "ContentPostImageFragment"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
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
      "name": "modified",
      "storageKey": null
    },
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
          "name": "ProfileItemFragment"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isReactionsEnabled",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ReactionButton_target"
    }
  ],
  "type": "ContentPost",
  "abstractKey": null
};
})();

(node as any).hash = "1cfedac4aa455d8e88f1fefc92a7ff86";

export default node;
