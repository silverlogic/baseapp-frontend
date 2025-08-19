/**
 * @generated SignedSource<<f910f466b192415e45b75ce5b28bbce7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChatRoomWithQuery$variables = Record<PropertyKey, never>;
export type ChatRoomWithQuery$data = {
  readonly chatRoom: {
    readonly id: string;
    readonly isArchived: boolean | null | undefined;
    readonly participantsCount: number;
    readonly " $fragmentSpreads": FragmentRefs<"MessagesListFragment" | "TitleFragment">;
  } | null | undefined;
};
export type ChatRoomWithQuery = {
  response: ChatRoomWithQuery$data;
  variables: ChatRoomWithQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "room-123"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isArchived",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "participantsCount",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
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
],
v6 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 20
  }
],
v7 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v8 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Message"
},
v9 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v10 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v11 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v12 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v13 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v14 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Profile"
},
v15 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "File"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ChatRoomWithQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "ChatRoom",
        "kind": "LinkedField",
        "name": "chatRoom",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "TitleFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "MessagesListFragment"
          }
        ],
        "storageKey": "chatRoom(id:\"room-123\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ChatRoomWithQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "ChatRoom",
        "kind": "LinkedField",
        "name": "chatRoom",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/),
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
                          (v1/*: any*/),
                          (v4/*: any*/),
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
                      (v1/*: any*/)
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
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v6/*: any*/),
            "concreteType": "MessageConnection",
            "kind": "LinkedField",
            "name": "allMessages",
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
                          (v4/*: any*/),
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
                            "selections": (v5/*: any*/),
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
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "content",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "deleted",
                        "storageKey": null
                      },
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
                          (v1/*: any*/)
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
            "storageKey": "allMessages(first:20)"
          },
          {
            "alias": null,
            "args": (v6/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "chatRoom_allMessages",
            "kind": "LinkedHandle",
            "name": "allMessages"
          }
        ],
        "storageKey": "chatRoom(id:\"room-123\")"
      }
    ]
  },
  "params": {
    "cacheID": "66b637919fed2da3e4905c873524ae8d",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "chatRoom": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ChatRoom"
        },
        "chatRoom.allMessages": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "MessageConnection"
        },
        "chatRoom.allMessages.edges": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "MessageEdge"
        },
        "chatRoom.allMessages.edges.cursor": (v7/*: any*/),
        "chatRoom.allMessages.edges.node": (v8/*: any*/),
        "chatRoom.allMessages.edges.node.__typename": (v7/*: any*/),
        "chatRoom.allMessages.edges.node.content": (v9/*: any*/),
        "chatRoom.allMessages.edges.node.created": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "DateTime"
        },
        "chatRoom.allMessages.edges.node.deleted": (v10/*: any*/),
        "chatRoom.allMessages.edges.node.extraData": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "JSONString"
        },
        "chatRoom.allMessages.edges.node.id": (v11/*: any*/),
        "chatRoom.allMessages.edges.node.inReplyTo": (v8/*: any*/),
        "chatRoom.allMessages.edges.node.inReplyTo.id": (v11/*: any*/),
        "chatRoom.allMessages.edges.node.isRead": (v12/*: any*/),
        "chatRoom.allMessages.edges.node.messageType": {
          "enumValues": [
            "USER_MESSAGE",
            "SYSTEM_GENERATED"
          ],
          "nullable": true,
          "plural": false,
          "type": "MessageType"
        },
        "chatRoom.allMessages.edges.node.pk": (v13/*: any*/),
        "chatRoom.allMessages.edges.node.profile": (v14/*: any*/),
        "chatRoom.allMessages.edges.node.profile.id": (v11/*: any*/),
        "chatRoom.allMessages.edges.node.profile.image": (v15/*: any*/),
        "chatRoom.allMessages.edges.node.profile.image.url": (v7/*: any*/),
        "chatRoom.allMessages.edges.node.profile.name": (v9/*: any*/),
        "chatRoom.allMessages.edges.node.verb": {
          "enumValues": [
            "SENT_MESSAGE"
          ],
          "nullable": true,
          "plural": false,
          "type": "Verbs"
        },
        "chatRoom.allMessages.pageInfo": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageInfo"
        },
        "chatRoom.allMessages.pageInfo.endCursor": (v9/*: any*/),
        "chatRoom.allMessages.pageInfo.hasNextPage": (v10/*: any*/),
        "chatRoom.allMessages.totalCount": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Int"
        },
        "chatRoom.id": (v11/*: any*/),
        "chatRoom.image": (v15/*: any*/),
        "chatRoom.image.url": (v7/*: any*/),
        "chatRoom.isArchived": (v12/*: any*/),
        "chatRoom.isGroup": (v10/*: any*/),
        "chatRoom.participants": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ChatRoomParticipantConnection"
        },
        "chatRoom.participants.edges": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "ChatRoomParticipantEdge"
        },
        "chatRoom.participants.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ChatRoomParticipant"
        },
        "chatRoom.participants.edges.node.id": (v11/*: any*/),
        "chatRoom.participants.edges.node.profile": (v14/*: any*/),
        "chatRoom.participants.edges.node.profile.id": (v11/*: any*/),
        "chatRoom.participants.edges.node.profile.image": (v15/*: any*/),
        "chatRoom.participants.edges.node.profile.image.url": (v7/*: any*/),
        "chatRoom.participants.edges.node.profile.name": (v9/*: any*/),
        "chatRoom.participants.edges.node.role": {
          "enumValues": [
            "MEMBER",
            "ADMIN"
          ],
          "nullable": true,
          "plural": false,
          "type": "ChatRoomParticipantRoles"
        },
        "chatRoom.participantsCount": (v13/*: any*/),
        "chatRoom.title": (v9/*: any*/),
        "chatRoom.unreadMessages": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "UnreadMessageCount"
        },
        "chatRoom.unreadMessages.count": (v13/*: any*/),
        "chatRoom.unreadMessages.id": (v11/*: any*/),
        "chatRoom.unreadMessages.markedUnread": (v10/*: any*/)
      }
    },
    "name": "ChatRoomWithQuery",
    "operationKind": "query",
    "text": "query ChatRoomWithQuery {\n  chatRoom(id: \"room-123\") {\n    id\n    isArchived\n    participantsCount\n    ...TitleFragment\n    ...MessagesListFragment\n  }\n}\n\nfragment GroupTitleFragment on ChatRoom {\n  id\n  image(width: 144, height: 144) {\n    url\n  }\n  title\n}\n\nfragment MessageItemFragment on Message {\n  id\n  content\n  created\n  deleted\n  extraData\n  inReplyTo {\n    id\n  }\n  isRead\n  pk\n  profile {\n    id\n  }\n  verb\n}\n\nfragment MessagesListFragment on ChatRoom {\n  id\n  isGroup\n  unreadMessages {\n    count\n    markedUnread\n    id\n  }\n  allMessages(first: 20) {\n    totalCount\n    edges {\n      node {\n        id\n        created\n        profile {\n          id\n          name\n          image(height: 32, width: 32) {\n            url\n          }\n        }\n        isRead\n        messageType\n        ...MessageItemFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n\nfragment RoomTitleFragment on ChatRoom {\n  id\n  participants(first: 2) {\n    edges {\n      node {\n        profile {\n          id\n          name\n          image(width: 100, height: 100) {\n            url\n          }\n        }\n        role\n        id\n      }\n    }\n  }\n}\n\nfragment TitleFragment on ChatRoom {\n  id\n  isGroup\n  ...RoomTitleFragment\n  ...GroupTitleFragment\n}\n"
  }
};
})();

(node as any).hash = "7fa4e9b2628a4ffd9584071fcce77f67";

export default node;
