/**
 * @generated SignedSource<<7f5339b06e4da843c62ab00d6f096c7e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useRoomListSubscription$variables = {
  connections: ReadonlyArray<string>;
  profileId: string;
};
export type useRoomListSubscription$data = {
  readonly chatRoomOnRoomUpdate: {
    readonly removedParticipants: ReadonlyArray<{
      readonly id: string;
      readonly profile: {
        readonly id: string;
      } | null | undefined;
    } | null | undefined> | null | undefined;
    readonly room: {
      readonly node: {
        readonly id: string;
        readonly isArchived: boolean | null | undefined;
        readonly participantsCount: number;
        readonly title: string | null | undefined;
        readonly " $fragmentSpreads": FragmentRefs<"LastMessageFragment" | "TitleFragment" | "UnreadMessagesCountFragment">;
      } | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type useRoomListSubscription = {
  response: useRoomListSubscription$data;
  variables: useRoomListSubscription$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "profileId"
},
v2 = [
  {
    "kind": "Variable",
    "name": "profileId",
    "variableName": "profileId"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isArchived",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "participantsCount",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "Profile",
  "kind": "LinkedField",
  "name": "profile",
  "plural": false,
  "selections": [
    (v3/*: any*/)
  ],
  "storageKey": null
},
v8 = [
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "useRoomListSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "ChatRoomOnRoomUpdate",
        "kind": "LinkedField",
        "name": "chatRoomOnRoomUpdate",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ChatRoomEdge",
            "kind": "LinkedField",
            "name": "room",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ChatRoom",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/),
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
            "concreteType": "ChatRoomParticipant",
            "kind": "LinkedField",
            "name": "removedParticipants",
            "plural": true,
            "selections": [
              (v3/*: any*/),
              (v7/*: any*/)
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
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "useRoomListSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "ChatRoomOnRoomUpdate",
        "kind": "LinkedField",
        "name": "chatRoomOnRoomUpdate",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ChatRoomEdge",
            "kind": "LinkedField",
            "name": "room",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ChatRoom",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/),
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
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "content",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isGroup",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "first",
                        "value": 2
                      }
                    ],
                    "concreteType": "ChatRoomParticipantConnection",
                    "kind": "LinkedField",
                    "name": "participants",
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
                                    "name": "name",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": [
                                      {
                                        "kind": "Literal",
                                        "name": "height",
                                        "value": 100
                                      },
                                      {
                                        "kind": "Literal",
                                        "name": "width",
                                        "value": 100
                                      }
                                    ],
                                    "concreteType": "File",
                                    "kind": "LinkedField",
                                    "name": "image",
                                    "plural": false,
                                    "selections": (v8/*: any*/),
                                    "storageKey": "image(height:100,width:100)"
                                  }
                                ],
                                "storageKey": null
                              },
                              (v3/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": "participants(first:2)"
                  },
                  {
                    "alias": null,
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "height",
                        "value": 144
                      },
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 144
                      }
                    ],
                    "concreteType": "File",
                    "kind": "LinkedField",
                    "name": "image",
                    "plural": false,
                    "selections": (v8/*: any*/),
                    "storageKey": "image(height:144,width:144)"
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
                      },
                      (v3/*: any*/)
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
            "concreteType": "ChatRoomParticipant",
            "kind": "LinkedField",
            "name": "removedParticipants",
            "plural": true,
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "filters": null,
                "handle": "deleteEdge",
                "key": "",
                "kind": "ScalarHandle",
                "name": "id",
                "handleArgs": [
                  {
                    "kind": "Variable",
                    "name": "connections",
                    "variableName": "connections"
                  }
                ]
              },
              (v7/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "b33e570c1e964cbbf0ebdbe2cf54b30b",
    "id": null,
    "metadata": {},
    "name": "useRoomListSubscription",
    "operationKind": "subscription",
    "text": "subscription useRoomListSubscription(\n  $profileId: ID!\n) {\n  chatRoomOnRoomUpdate(profileId: $profileId) {\n    room {\n      node {\n        id\n        isArchived\n        participantsCount\n        title\n        ...LastMessageFragment\n        ...TitleFragment\n        ...UnreadMessagesCountFragment\n      }\n    }\n    removedParticipants {\n      id\n      profile {\n        id\n      }\n    }\n  }\n}\n\nfragment GroupTitleFragment on ChatRoom {\n  id\n  image(width: 144, height: 144) {\n    url\n  }\n  title\n}\n\nfragment LastMessageFragment on ChatRoom {\n  id\n  lastMessageTime\n  lastMessage {\n    id\n    content\n  }\n}\n\nfragment RoomTitleFragment on ChatRoom {\n  id\n  participants(first: 2) {\n    edges {\n      node {\n        profile {\n          id\n          name\n          image(width: 100, height: 100) {\n            url\n          }\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment TitleFragment on ChatRoom {\n  id\n  isGroup\n  ...RoomTitleFragment\n  ...GroupTitleFragment\n}\n\nfragment UnreadMessagesCountFragment on ChatRoom {\n  id\n  unreadMessages {\n    count\n    markedUnread\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "1a6290e220a68b34641d01ea3ab017a1";

export default node;
