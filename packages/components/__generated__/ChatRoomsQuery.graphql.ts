/**
 * @generated SignedSource<<bbe046e7dfab54e1b487eed746121d35>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChatRoomsQuery$variables = Record<PropertyKey, never>;
export type ChatRoomsQuery$data = {
  readonly me: {
    readonly id: string;
    readonly profile: {
      readonly id: string;
      readonly " $fragmentSpreads": FragmentRefs<"RoomsListFragment">;
    } | null | undefined;
  } | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"AllProfilesListFragment">;
};
export type ChatRoomsQuery = {
  response: ChatRoomsQuery$data;
  variables: ChatRoomsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "kind": "Literal",
  "name": "first",
  "value": 5
},
v2 = [
  (v1/*: any*/),
  {
    "kind": "Literal",
    "name": "orderBy",
    "value": "name"
  }
],
v3 = {
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
v6 = {
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
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v9 = [
  {
    "kind": "Literal",
    "name": "archived",
    "value": false
  },
  (v1/*: any*/),
  {
    "kind": "Literal",
    "name": "q",
    "value": ""
  },
  {
    "kind": "Literal",
    "name": "unreadMessages",
    "value": false
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ChatRoomsQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "AllProfilesListFragment"
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Profile",
            "kind": "LinkedField",
            "name": "profile",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "RoomsListFragment"
              }
            ],
            "storageKey": null
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ChatRoomsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "ProfileConnection",
        "kind": "LinkedField",
        "name": "allProfiles",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "totalCount",
            "storageKey": null
          },
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ProfileEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Profile",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v0/*: any*/),
                  (v4/*: any*/),
                  (v6/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "URLPath",
                    "kind": "LinkedField",
                    "name": "urlPath",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "path",
                        "storageKey": null
                      },
                      (v0/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v7/*: any*/)
                ],
                "storageKey": null
              },
              (v8/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": "allProfiles(first:5,orderBy:\"name\")"
      },
      {
        "alias": null,
        "args": (v2/*: any*/),
        "filters": [
          "orderBy",
          "q"
        ],
        "handle": "connection",
        "key": "AllProfilesListFragment_allProfiles",
        "kind": "LinkedHandle",
        "name": "allProfiles"
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Profile",
            "kind": "LinkedField",
            "name": "profile",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": (v9/*: any*/),
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
                              (v0/*: any*/),
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
                                  (v0/*: any*/),
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
                                              (v0/*: any*/),
                                              (v4/*: any*/),
                                              (v6/*: any*/)
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
                                          (v0/*: any*/)
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
                                  (v0/*: any*/)
                                ],
                                "storageKey": null
                              },
                              (v7/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v8/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v3/*: any*/)
                    ],
                    "storageKey": "chatRooms(archived:false,first:5,q:\"\",unreadMessages:false)"
                  },
                  {
                    "alias": null,
                    "args": (v9/*: any*/),
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
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "7591b42750435607119cc085a69f9017",
    "id": null,
    "metadata": {},
    "name": "ChatRoomsQuery",
    "operationKind": "query",
    "text": "query ChatRoomsQuery {\n  ...AllProfilesListFragment\n  me {\n    id\n    profile {\n      id\n      ...RoomsListFragment\n    }\n  }\n}\n\nfragment AllProfilesListFragment on Query {\n  allProfiles(first: 5, orderBy: \"name\") {\n    totalCount\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      node {\n        id\n        ...ProfileItemFragment\n        __typename\n      }\n      cursor\n    }\n  }\n}\n\nfragment GroupTitleFragment on ChatRoom {\n  id\n  image(width: 144, height: 144) {\n    url\n  }\n  title\n}\n\nfragment LastMessageFragment on ChatRoom {\n  id\n  lastMessageTime\n  lastMessage {\n    id\n    content\n  }\n}\n\nfragment ProfileItemFragment on Profile {\n  id\n  name\n  image(width: 100, height: 100) {\n    url\n  }\n  urlPath {\n    path\n    id\n  }\n}\n\nfragment RoomTitleFragment on ChatRoom {\n  id\n  participants(first: 2) {\n    edges {\n      node {\n        profile {\n          id\n          name\n          image(width: 100, height: 100) {\n            url\n          }\n        }\n        role\n        id\n      }\n    }\n  }\n}\n\nfragment RoomsListFragment on ChatRoomsInterface {\n  __isChatRoomsInterface: __typename\n  chatRooms(first: 5, q: \"\", unreadMessages: false, archived: false) {\n    edges {\n      node {\n        id\n        ...LastMessageFragment\n        ...TitleFragment\n        ...UnreadMessagesCountFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n  id\n}\n\nfragment TitleFragment on ChatRoom {\n  id\n  isGroup\n  ...RoomTitleFragment\n  ...GroupTitleFragment\n}\n\nfragment UnreadMessagesCountFragment on ChatRoom {\n  id\n  unreadMessages {\n    count\n    markedUnread\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "92001c5e34f05864902f11eb244a7e16";

export default node;
