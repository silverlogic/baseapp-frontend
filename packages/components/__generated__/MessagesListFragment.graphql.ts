/**
 * @generated SignedSource<<fed04417b9972499ce768169e6776b1d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type MessageType = "SYSTEM_GENERATED" | "USER_MESSAGE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type MessagesListFragment$data = {
  readonly allMessages: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly created: any;
        readonly id: string;
        readonly isRead: boolean | null | undefined;
        readonly messageType: MessageType | null | undefined;
        readonly profile: {
          readonly id: string;
          readonly image: {
            readonly url: string;
          } | null | undefined;
          readonly name: string | null | undefined;
        } | null | undefined;
        readonly " $fragmentSpreads": FragmentRefs<"MessageItemFragment">;
      } | null | undefined;
    } | null | undefined>;
    readonly pageInfo: {
      readonly endCursor: string | null | undefined;
      readonly hasNextPage: boolean;
    };
    readonly totalCount: number | null | undefined;
  } | null | undefined;
  readonly id: string;
  readonly isGroup: boolean;
  readonly unreadMessages: {
    readonly count: number;
    readonly markedUnread: boolean;
  } | null | undefined;
  readonly " $fragmentType": "MessagesListFragment";
};
export type MessagesListFragment$key = {
  readonly " $data"?: MessagesListFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MessagesListFragment">;
};

import ChatRoomMessagesListPaginationQuery_graphql from './ChatRoomMessagesListPaginationQuery.graphql';

const node: ReaderFragment = (function(){
var v0 = [
  "allMessages"
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
      "defaultValue": 20,
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
      "operation": ChatRoomMessagesListPaginationQuery_graphql,
      "identifierInfo": {
        "identifierField": "id",
        "identifierQueryVariableName": "id"
      }
    }
  },
  "name": "MessagesListFragment",
  "selections": [
    (v1/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isGroup",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "UnreadMessageCount",
      "kind": "LinkedField",
      "name": "unreadMessages",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "count",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "markedUnread",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": "allMessages",
      "args": null,
      "concreteType": "MessageConnection",
      "kind": "LinkedField",
      "name": "__chatRoom_allMessages_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "totalCount",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "MessageEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Message",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v1/*: any*/),
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
                  "concreteType": "Profile",
                  "kind": "LinkedField",
                  "name": "profile",
                  "plural": false,
                  "selections": [
                    (v1/*: any*/),
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "name",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": [
                        {
                          "kind": "Literal",
                          "name": "height",
                          "value": 32
                        },
                        {
                          "kind": "Literal",
                          "name": "width",
                          "value": 32
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
                      "storageKey": "image(height:32,width:32)"
                    }
                  ],
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
                  "name": "messageType",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "MessageItemFragment"
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

(node as any).hash = "9a3c1fd2e9507a24075ab2654972c7cf";

export default node;
