/**
 * @generated SignedSource<<9b43b3a39cbb4c8c92d5209a5a7c8242>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type chatRoomsPaginationQuery$variables = {
  archived?: boolean | null | undefined;
  count?: number | null | undefined;
  cursor?: string | null | undefined;
  id: string;
  q?: string | null | undefined;
  unreadMessages?: boolean | null | undefined;
};
export type chatRoomsPaginationQuery$data = {
  readonly node: {
    readonly " $fragmentSpreads": FragmentRefs<"RoomsListFragment">;
  } | null | undefined;
};
export type chatRoomsPaginationQuery = {
  response: chatRoomsPaginationQuery$data;
  variables: chatRoomsPaginationQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": false,
  "kind": "LocalArgument",
  "name": "archived"
},
v1 = {
  "defaultValue": 5,
  "kind": "LocalArgument",
  "name": "count"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "cursor"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "q"
},
v5 = {
  "defaultValue": false,
  "kind": "LocalArgument",
  "name": "unreadMessages"
},
v6 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v7 = {
  "kind": "Variable",
  "name": "archived",
  "variableName": "archived"
},
v8 = {
  "kind": "Variable",
  "name": "q",
  "variableName": "q"
},
v9 = {
  "kind": "Variable",
  "name": "unreadMessages",
  "variableName": "unreadMessages"
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v12 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor"
  },
  (v7/*: any*/),
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "count"
  },
  (v8/*: any*/),
  (v9/*: any*/)
],
v13 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "url",
    "storageKey": null
  }
],
v14 = {
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
  "selections": (v13/*: any*/),
  "storageKey": "image(height:100,width:100)"
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "content",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalCount",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v18 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 20
  }
],
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v20 = {
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
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/),
      (v5/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "chatRoomsPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v6/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "args": [
              (v7/*: any*/),
              {
                "kind": "Variable",
                "name": "count",
                "variableName": "count"
              },
              {
                "kind": "Variable",
                "name": "cursor",
                "variableName": "cursor"
              },
              (v8/*: any*/),
              (v9/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "RoomsListFragment"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v4/*: any*/),
      (v5/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Operation",
    "name": "chatRoomsPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v6/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v10/*: any*/),
          (v11/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": (v12/*: any*/),
                "concreteType": "ChatRoomConnection",
                "kind": "LinkedField",
                "name": "chatRooms",
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
                          (v11/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "unreadMessagesCount",
                            "storageKey": null
                          },
                          (v14/*: any*/),
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
                              (v11/*: any*/),
                              (v15/*: any*/)
                            ],
                            "storageKey": null
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
                            "concreteType": "ChatRoomParticipantConnection",
                            "kind": "LinkedField",
                            "name": "participants",
                            "plural": false,
                            "selections": [
                              (v16/*: any*/),
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
                                      (v11/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "Profile",
                                        "kind": "LinkedField",
                                        "name": "profile",
                                        "plural": false,
                                        "selections": [
                                          (v11/*: any*/),
                                          (v10/*: any*/),
                                          (v17/*: any*/),
                                          (v14/*: any*/)
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
                          },
                          {
                            "alias": null,
                            "args": (v18/*: any*/),
                            "concreteType": "MessageConnection",
                            "kind": "LinkedField",
                            "name": "allMessages",
                            "plural": false,
                            "selections": [
                              (v16/*: any*/),
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
                                      (v11/*: any*/),
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
                                          (v11/*: any*/),
                                          (v17/*: any*/),
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
                                            "selections": (v13/*: any*/),
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
                                      (v15/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "extraData",
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "Message",
                                        "kind": "LinkedField",
                                        "name": "inReplyTo",
                                        "plural": false,
                                        "selections": [
                                          (v11/*: any*/)
                                        ],
                                        "storageKey": null
                                      },
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
                                        "name": "verb",
                                        "storageKey": null
                                      },
                                      (v10/*: any*/)
                                    ],
                                    "storageKey": null
                                  },
                                  (v19/*: any*/)
                                ],
                                "storageKey": null
                              },
                              (v20/*: any*/)
                            ],
                            "storageKey": "allMessages(first:20)"
                          },
                          {
                            "alias": null,
                            "args": (v18/*: any*/),
                            "filters": null,
                            "handle": "connection",
                            "key": "chatRoom_allMessages",
                            "kind": "LinkedHandle",
                            "name": "allMessages"
                          },
                          (v10/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v19/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v20/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v12/*: any*/),
                "filters": [
                  "q",
                  "unreadMessages",
                  "archived"
                ],
                "handle": "connection",
                "key": "roomsList_chatRooms",
                "kind": "LinkedHandle",
                "name": "chatRooms"
              }
            ],
            "type": "ChatRoomsInterface",
            "abstractKey": "__isChatRoomsInterface"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "9d5821f21109199a09d4de0b3aab46a7",
    "id": null,
    "metadata": {},
    "name": "chatRoomsPaginationQuery",
    "operationKind": "query",
    "text": "query chatRoomsPaginationQuery(\n  $archived: Boolean = false\n  $count: Int = 5\n  $cursor: String\n  $q: String = null\n  $unreadMessages: Boolean = false\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...RoomsListFragment_3I5PKK\n    id\n  }\n}\n\nfragment MessageItemFragment on Message {\n  id\n  content\n  created\n  extraData\n  inReplyTo {\n    id\n  }\n  isRead\n  pk\n  profile {\n    id\n  }\n  verb\n}\n\nfragment MessagesListFragment on ChatRoom {\n  id\n  participants {\n    totalCount\n  }\n  unreadMessagesCount\n  allMessages(first: 20) {\n    totalCount\n    edges {\n      node {\n        id\n        created\n        profile {\n          id\n          name\n          image(height: 32, width: 32) {\n            url\n          }\n        }\n        isRead\n        ...MessageItemFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n\nfragment RoomFragment on ChatRoom {\n  id\n  unreadMessagesCount\n  image(width: 100, height: 100) {\n    url\n  }\n  lastMessageTime\n  lastMessage {\n    id\n    content\n  }\n  title\n  participants {\n    totalCount\n    edges {\n      node {\n        id\n        profile {\n          id\n          __typename\n          name\n          image(width: 100, height: 100) {\n            url\n          }\n        }\n      }\n    }\n  }\n  ...MessagesListFragment\n}\n\nfragment RoomsListFragment_3I5PKK on ChatRoomsInterface {\n  __isChatRoomsInterface: __typename\n  chatRooms(first: $count, after: $cursor, q: $q, unreadMessages: $unreadMessages, archived: $archived) {\n    edges {\n      node {\n        id\n        ...RoomFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n  id\n}\n"
  }
};
})();

(node as any).hash = "7fe57d53d40a4295a9eb2ea600d96f11";

export default node;
