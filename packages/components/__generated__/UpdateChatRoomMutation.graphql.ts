/**
 * @generated SignedSource<<0b1f044a288016043e0d8421cb8bf06c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChatRoomUpdateInput = {
  addParticipants?: ReadonlyArray<string | null | undefined> | null | undefined;
  clientMutationId?: string | null | undefined;
  deleteImage?: boolean | null | undefined;
  profileId: string;
  removeParticipants?: ReadonlyArray<string | null | undefined> | null | undefined;
  roomId: string;
  title?: string | null | undefined;
};
export type UpdateChatRoomMutation$variables = {
  connections: ReadonlyArray<string>;
  input: ChatRoomUpdateInput;
};
export type UpdateChatRoomMutation$data = {
  readonly chatRoomUpdate: {
    readonly errors: ReadonlyArray<{
      readonly field: string;
      readonly messages: ReadonlyArray<string>;
    } | null | undefined> | null | undefined;
    readonly removedParticipants: ReadonlyArray<{
      readonly id: string;
    } | null | undefined> | null | undefined;
    readonly room: {
      readonly node: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"LastMessageFragment" | "TitleFragment" | "UnreadMessagesCountFragment">;
      } | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type UpdateChatRoomMutation = {
  response: UpdateChatRoomMutation$data;
  variables: UpdateChatRoomMutation$variables;
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
  "name": "input"
},
v2 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
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
v5 = [
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
    "name": "UpdateChatRoomMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "ChatRoomUpdatePayload",
        "kind": "LinkedField",
        "name": "chatRoomUpdate",
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
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "UpdateChatRoomMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "ChatRoomUpdatePayload",
        "kind": "LinkedField",
        "name": "chatRoomUpdate",
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
                                    "selections": (v5/*: any*/),
                                    "storageKey": "image(height:100,width:100)"
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
                    "selections": (v5/*: any*/),
                    "storageKey": "image(height:144,width:144)"
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "title",
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
              }
            ],
            "storageKey": null
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "f5984f9a811457439fa1ace680887053",
    "id": null,
    "metadata": {},
    "name": "UpdateChatRoomMutation",
    "operationKind": "mutation",
    "text": "mutation UpdateChatRoomMutation(\n  $input: ChatRoomUpdateInput!\n) {\n  chatRoomUpdate(input: $input) {\n    room {\n      node {\n        id\n        ...LastMessageFragment\n        ...TitleFragment\n        ...UnreadMessagesCountFragment\n      }\n    }\n    removedParticipants {\n      id\n    }\n    errors {\n      field\n      messages\n    }\n  }\n}\n\nfragment GroupTitleFragment on ChatRoom {\n  id\n  image(width: 144, height: 144) {\n    url\n  }\n  title\n}\n\nfragment LastMessageFragment on ChatRoom {\n  id\n  lastMessageTime\n  lastMessage {\n    id\n    content\n  }\n}\n\nfragment RoomTitleFragment on ChatRoom {\n  id\n  participants(first: 2) {\n    edges {\n      node {\n        profile {\n          id\n          name\n          image(width: 100, height: 100) {\n            url\n          }\n        }\n        role\n        id\n      }\n    }\n  }\n}\n\nfragment TitleFragment on ChatRoom {\n  id\n  isGroup\n  ...RoomTitleFragment\n  ...GroupTitleFragment\n}\n\nfragment UnreadMessagesCountFragment on ChatRoom {\n  id\n  unreadMessages {\n    count\n    markedUnread\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "814ba3e87407537b5be32eb40c45a80d";

export default node;
