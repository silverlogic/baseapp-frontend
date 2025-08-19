/**
 * @generated SignedSource<<15247927960a8230266f154f2e1b0ead>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChatRoomCreateInput = {
  clientMutationId?: string | null | undefined;
  isGroup?: boolean | null | undefined;
  participants: ReadonlyArray<string | null | undefined>;
  profileId: string;
  title?: string | null | undefined;
};
export type CreateChatRoomMutation$variables = {
  connections: ReadonlyArray<string>;
  input: ChatRoomCreateInput;
};
export type CreateChatRoomMutation$data = {
  readonly chatRoomCreate: {
    readonly errors: ReadonlyArray<{
      readonly field: string;
      readonly messages: ReadonlyArray<string>;
    } | null | undefined> | null | undefined;
    readonly room: {
      readonly node: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"LastMessageFragment" | "TitleFragment" | "UnreadMessagesCountFragment">;
      } | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type CreateChatRoomMutation = {
  response: CreateChatRoomMutation$data;
  variables: CreateChatRoomMutation$variables;
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
    "name": "CreateChatRoomMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "ChatRoomCreatePayload",
        "kind": "LinkedField",
        "name": "chatRoomCreate",
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
    "name": "CreateChatRoomMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "ChatRoomCreatePayload",
        "kind": "LinkedField",
        "name": "chatRoomCreate",
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
            "filters": null,
            "handle": "prependEdge",
            "key": "",
            "kind": "LinkedHandle",
            "name": "room",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              }
            ]
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "9622f280ce788a44442ebabf48aadb6e",
    "id": null,
    "metadata": {},
    "name": "CreateChatRoomMutation",
    "operationKind": "mutation",
    "text": "mutation CreateChatRoomMutation(\n  $input: ChatRoomCreateInput!\n) {\n  chatRoomCreate(input: $input) {\n    room {\n      node {\n        id\n        ...LastMessageFragment\n        ...TitleFragment\n        ...UnreadMessagesCountFragment\n      }\n    }\n    errors {\n      field\n      messages\n    }\n  }\n}\n\nfragment GroupTitleFragment on ChatRoom {\n  id\n  image(width: 144, height: 144) {\n    url\n  }\n  title\n}\n\nfragment LastMessageFragment on ChatRoom {\n  id\n  lastMessageTime\n  lastMessage {\n    id\n    content\n  }\n}\n\nfragment RoomTitleFragment on ChatRoom {\n  id\n  participants(first: 2) {\n    edges {\n      node {\n        profile {\n          id\n          name\n          image(width: 100, height: 100) {\n            url\n          }\n        }\n        role\n        id\n      }\n    }\n  }\n}\n\nfragment TitleFragment on ChatRoom {\n  id\n  isGroup\n  ...RoomTitleFragment\n  ...GroupTitleFragment\n}\n\nfragment UnreadMessagesCountFragment on ChatRoom {\n  id\n  unreadMessages {\n    count\n    markedUnread\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "304767b39c282d78401577a512369b3e";

export default node;
