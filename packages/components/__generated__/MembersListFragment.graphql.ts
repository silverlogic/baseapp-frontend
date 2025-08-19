/**
 * @generated SignedSource<<b411cf9f2fe7da1fdf0985cbca9162a3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type ChatRoomParticipantRoles = "ADMIN" | "MEMBER" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type MembersListFragment$data = {
  readonly id: string;
  readonly participants: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly profile: {
          readonly id: string;
          readonly " $fragmentSpreads": FragmentRefs<"ProfileItemFragment">;
        } | null | undefined;
        readonly role: ChatRoomParticipantRoles | null | undefined;
      } | null | undefined;
    } | null | undefined>;
    readonly pageInfo: {
      readonly endCursor: string | null | undefined;
      readonly hasNextPage: boolean;
    };
  } | null | undefined;
  readonly " $fragmentType": "MembersListFragment";
};
export type MembersListFragment$key = {
  readonly " $data"?: MembersListFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MembersListFragment">;
};

import ChatRoomParticipantsPaginationQuery_graphql from './ChatRoomParticipantsPaginationQuery.graphql';

const node: ReaderFragment = (function(){
var v0 = [
  "participants"
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
      "defaultValue": 5,
      "kind": "LocalArgument",
      "name": "count"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "cursor"
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
      "operation": ChatRoomParticipantsPaginationQuery_graphql,
      "identifierInfo": {
        "identifierField": "id",
        "identifierQueryVariableName": "id"
      }
    }
  },
  "name": "MembersListFragment",
  "selections": [
    (v1/*: any*/),
    {
      "alias": "participants",
      "args": null,
      "concreteType": "ChatRoomParticipantConnection",
      "kind": "LinkedField",
      "name": "__ChatRoom_participants_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ChatRoomParticipantEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "ChatRoomParticipant",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v1/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Profile",
                  "kind": "LinkedField",
                  "name": "profile",
                  "plural": false,
                  "selections": [
                    (v1/*: any*/),
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
                  "name": "role",
                  "storageKey": null
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
    }
  ],
  "type": "ChatRoom",
  "abstractKey": null
};
})();

(node as any).hash = "49f7bb8685111dd9a1075b9147c84abb";

export default node;
