/**
 * @generated SignedSource<<4671217ec355495dec1e1034d432b213>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MessageListWithQuery$variables = Record<PropertyKey, never>;
export type MessageListWithQuery$data = {
  readonly chatRoom: {
    readonly " $fragmentSpreads": FragmentRefs<"MessagesListFragment">;
  } | null | undefined;
};
export type MessageListWithQuery = {
  response: MessageListWithQuery$data;
  variables: MessageListWithQuery$variables;
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
v2 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 20
  }
],
v3 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v4 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Message"
},
v5 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v6 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v7 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v8 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MessageListWithQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "ChatRoom",
        "kind": "LinkedField",
        "name": "chatRoom",
        "plural": false,
        "selections": [
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
    "name": "MessageListWithQuery",
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
              },
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v2/*: any*/),
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
            "args": (v2/*: any*/),
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
    "cacheID": "a0ed39dd46f6848edc8a3279ba68c911",
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
        "chatRoom.allMessages.edges.cursor": (v3/*: any*/),
        "chatRoom.allMessages.edges.node": (v4/*: any*/),
        "chatRoom.allMessages.edges.node.__typename": (v3/*: any*/),
        "chatRoom.allMessages.edges.node.content": (v5/*: any*/),
        "chatRoom.allMessages.edges.node.created": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "DateTime"
        },
        "chatRoom.allMessages.edges.node.deleted": (v6/*: any*/),
        "chatRoom.allMessages.edges.node.extraData": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "JSONString"
        },
        "chatRoom.allMessages.edges.node.id": (v7/*: any*/),
        "chatRoom.allMessages.edges.node.inReplyTo": (v4/*: any*/),
        "chatRoom.allMessages.edges.node.inReplyTo.id": (v7/*: any*/),
        "chatRoom.allMessages.edges.node.isRead": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Boolean"
        },
        "chatRoom.allMessages.edges.node.messageType": {
          "enumValues": [
            "USER_MESSAGE",
            "SYSTEM_GENERATED"
          ],
          "nullable": true,
          "plural": false,
          "type": "MessageType"
        },
        "chatRoom.allMessages.edges.node.pk": (v8/*: any*/),
        "chatRoom.allMessages.edges.node.profile": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Profile"
        },
        "chatRoom.allMessages.edges.node.profile.id": (v7/*: any*/),
        "chatRoom.allMessages.edges.node.profile.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "File"
        },
        "chatRoom.allMessages.edges.node.profile.image.url": (v3/*: any*/),
        "chatRoom.allMessages.edges.node.profile.name": (v5/*: any*/),
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
        "chatRoom.allMessages.pageInfo.endCursor": (v5/*: any*/),
        "chatRoom.allMessages.pageInfo.hasNextPage": (v6/*: any*/),
        "chatRoom.allMessages.totalCount": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Int"
        },
        "chatRoom.id": (v7/*: any*/),
        "chatRoom.isGroup": (v6/*: any*/),
        "chatRoom.unreadMessages": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "UnreadMessageCount"
        },
        "chatRoom.unreadMessages.count": (v8/*: any*/),
        "chatRoom.unreadMessages.id": (v7/*: any*/),
        "chatRoom.unreadMessages.markedUnread": (v6/*: any*/)
      }
    },
    "name": "MessageListWithQuery",
    "operationKind": "query",
    "text": "query MessageListWithQuery {\n  chatRoom(id: \"room-123\") {\n    ...MessagesListFragment\n    id\n  }\n}\n\nfragment MessageItemFragment on Message {\n  id\n  content\n  created\n  deleted\n  extraData\n  inReplyTo {\n    id\n  }\n  isRead\n  pk\n  profile {\n    id\n  }\n  verb\n}\n\nfragment MessagesListFragment on ChatRoom {\n  id\n  isGroup\n  unreadMessages {\n    count\n    markedUnread\n    id\n  }\n  allMessages(first: 20) {\n    totalCount\n    edges {\n      node {\n        id\n        created\n        profile {\n          id\n          name\n          image(height: 32, width: 32) {\n            url\n          }\n        }\n        isRead\n        messageType\n        ...MessageItemFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "097916594eb3b6a9ef6c6e75f78e09d5";

export default node;
