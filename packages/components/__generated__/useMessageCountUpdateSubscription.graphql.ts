/**
 * @generated SignedSource<<8bfa4f42731ce1a16abdbd7f88920027>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
export type useMessageCountUpdateSubscription$variables = {
  profileId: string;
};
export type useMessageCountUpdateSubscription$data = {
  readonly chatRoomOnMessagesCountUpdate: {
    readonly profile: {
      readonly chatRooms: {
        readonly edges: ReadonlyArray<{
          readonly node: {
            readonly allMessages: {
              readonly edges: ReadonlyArray<{
                readonly node: {
                  readonly id: string;
                  readonly isRead: boolean | null | undefined;
                } | null | undefined;
              } | null | undefined>;
            } | null | undefined;
            readonly id: string;
            readonly unreadMessages: {
              readonly count: number;
              readonly markedUnread: boolean;
            } | null | undefined;
          } | null | undefined;
        } | null | undefined>;
        readonly totalCount: number | null | undefined;
      } | null | undefined;
      readonly id: string;
    } | null | undefined;
  } | null | undefined;
};
export type useMessageCountUpdateSubscription = {
  response: useMessageCountUpdateSubscription$data;
  variables: useMessageCountUpdateSubscription$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "profileId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "profileId",
    "variableName": "profileId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalCount",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "count",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "markedUnread",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "MessageConnection",
  "kind": "LinkedField",
  "name": "allMessages",
  "plural": false,
  "selections": [
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
            (v2/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "isRead",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useMessageCountUpdateSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ChatRoomOnMessagesCountUpdate",
        "kind": "LinkedField",
        "name": "chatRoomOnMessagesCountUpdate",
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
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "ChatRoomConnection",
                "kind": "LinkedField",
                "name": "chatRooms",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
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
                          (v2/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "UnreadMessageCount",
                            "kind": "LinkedField",
                            "name": "unreadMessages",
                            "plural": false,
                            "selections": [
                              (v4/*: any*/),
                              (v5/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v6/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useMessageCountUpdateSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ChatRoomOnMessagesCountUpdate",
        "kind": "LinkedField",
        "name": "chatRoomOnMessagesCountUpdate",
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
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "ChatRoomConnection",
                "kind": "LinkedField",
                "name": "chatRooms",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
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
                          (v2/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "UnreadMessageCount",
                            "kind": "LinkedField",
                            "name": "unreadMessages",
                            "plural": false,
                            "selections": [
                              (v4/*: any*/),
                              (v5/*: any*/),
                              (v2/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v6/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "ee87a4300f113870813418b0a818d031",
    "id": null,
    "metadata": {},
    "name": "useMessageCountUpdateSubscription",
    "operationKind": "subscription",
    "text": "subscription useMessageCountUpdateSubscription(\n  $profileId: ID!\n) {\n  chatRoomOnMessagesCountUpdate(profileId: $profileId) {\n    profile {\n      id\n      chatRooms {\n        totalCount\n        edges {\n          node {\n            id\n            unreadMessages {\n              count\n              markedUnread\n              id\n            }\n            allMessages {\n              edges {\n                node {\n                  id\n                  isRead\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "57b09f90d1cdf7f57abc3956378d6b27";

export default node;
