/**
 * @generated SignedSource<<305b55b464b7c8ecb66477f47feef9ae>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RoomsListFragment$data = {
  readonly chatRooms: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"LastMessageFragment" | "TitleFragment" | "UnreadMessagesCountFragment">;
      } | null | undefined;
    } | null | undefined>;
    readonly pageInfo: {
      readonly endCursor: string | null | undefined;
      readonly hasNextPage: boolean;
    };
  } | null | undefined;
  readonly id: string;
  readonly " $fragmentType": "RoomsListFragment";
};
export type RoomsListFragment$key = {
  readonly " $data"?: RoomsListFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RoomsListFragment">;
};

import chatRoomsPaginationQuery_graphql from './chatRoomsPaginationQuery.graphql';

const node: ReaderFragment = (function(){
var v0 = [
  "chatRooms"
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [
    {
      "defaultValue": false,
      "kind": "LocalArgument",
      "name": "archived"
    },
    {
      "defaultValue": 5,
      "kind": "LocalArgument",
      "name": "count"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "cursor"
    },
    {
      "defaultValue": "",
      "kind": "LocalArgument",
      "name": "q"
    },
    {
      "defaultValue": false,
      "kind": "LocalArgument",
      "name": "unreadMessages"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "count",
        "cursor": "cursor",
        "direction": "forward",
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "count",
          "cursor": "cursor"
        },
        "backward": null,
        "path": (v0/*: any*/)
      },
      "fragmentPathInResult": [
        "node"
      ],
      "operation": chatRoomsPaginationQuery_graphql,
      "identifierInfo": {
        "identifierField": "id",
        "identifierQueryVariableName": "id"
      }
    }
  },
  "name": "RoomsListFragment",
  "selections": [
    {
      "alias": "chatRooms",
      "args": [
        {
          "kind": "Variable",
          "name": "archived",
          "variableName": "archived"
        },
        {
          "kind": "Variable",
          "name": "q",
          "variableName": "q"
        },
        {
          "kind": "Variable",
          "name": "unreadMessages",
          "variableName": "unreadMessages"
        }
      ],
      "concreteType": "ChatRoomConnection",
      "kind": "LinkedField",
      "name": "__roomsList_chatRooms_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ChatRoomEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "ChatRoom",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v1/*: any*/),
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "LastMessageFragment"
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "TitleFragment"
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "UnreadMessagesCountFragment"
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "__typename",
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "cursor",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "PageInfo",
          "kind": "LinkedField",
          "name": "pageInfo",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "hasNextPage",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "endCursor",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    (v1/*: any*/)
  ],
  "type": "ChatRoomsInterface",
  "abstractKey": "__isChatRoomsInterface"
};
})();

(node as any).hash = "3a66898cb96bbf4ce999aa5ad9822ca0";

export default node;
