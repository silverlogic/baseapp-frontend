/**
 * @generated SignedSource<<35c1ae1deb36f8050bac834b72f76d0b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ActivityLogWithQuery$variables = Record<PropertyKey, never>;
export type ActivityLogWithQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ActivityLogsFragment">;
};
export type ActivityLogWithQuery = {
  response: ActivityLogWithQuery$data;
  variables: ActivityLogWithQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
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
  "name": "url",
  "storageKey": null
},
v3 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v4 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v5 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ActivityLogWithQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "ActivityLogsFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ActivityLogWithQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "ActivityLogConnection",
        "kind": "LinkedField",
        "name": "activityLogs",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ActivityLogEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ActivityLog",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "createdAt",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "NodeLogEventConnection",
                    "kind": "LinkedField",
                    "name": "events",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "NodeLogEventEdge",
                        "kind": "LinkedField",
                        "name": "edges",
                        "plural": true,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "NodeLogEvent",
                            "kind": "LinkedField",
                            "name": "node",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "label",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "diff",
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
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "verb",
                    "storageKey": null
                  },
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "user",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "fullName",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "email",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "height",
                            "value": 48
                          },
                          {
                            "kind": "Literal",
                            "name": "width",
                            "value": 48
                          }
                        ],
                        "concreteType": "File",
                        "kind": "LinkedField",
                        "name": "avatar",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/)
                        ],
                        "storageKey": "avatar(height:48,width:48)"
                      }
                    ],
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
                "name": "endCursor",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "hasNextPage",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "activityLogs(first:10)"
      },
      {
        "alias": null,
        "args": (v0/*: any*/),
        "filters": [
          "userName",
          "createdFrom",
          "createdTo"
        ],
        "handle": "connection",
        "key": "ActivityLogs_activityLogs",
        "kind": "LinkedHandle",
        "name": "activityLogs"
      }
    ]
  },
  "params": {
    "cacheID": "932cea218f5d6587fe4981cacbdcc416",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "activityLogs": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ActivityLogConnection"
        },
        "activityLogs.edges": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "ActivityLogEdge"
        },
        "activityLogs.edges.cursor": (v3/*: any*/),
        "activityLogs.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ActivityLog"
        },
        "activityLogs.edges.node.__typename": (v3/*: any*/),
        "activityLogs.edges.node.createdAt": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "DateTime"
        },
        "activityLogs.edges.node.events": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "NodeLogEventConnection"
        },
        "activityLogs.edges.node.events.edges": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "NodeLogEventEdge"
        },
        "activityLogs.edges.node.events.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "NodeLogEvent"
        },
        "activityLogs.edges.node.events.edges.node.diff": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "GenericScalar"
        },
        "activityLogs.edges.node.events.edges.node.id": (v4/*: any*/),
        "activityLogs.edges.node.events.edges.node.label": (v5/*: any*/),
        "activityLogs.edges.node.id": (v4/*: any*/),
        "activityLogs.edges.node.url": (v5/*: any*/),
        "activityLogs.edges.node.user": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "User"
        },
        "activityLogs.edges.node.user.avatar": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "File"
        },
        "activityLogs.edges.node.user.avatar.url": (v3/*: any*/),
        "activityLogs.edges.node.user.email": (v5/*: any*/),
        "activityLogs.edges.node.user.fullName": (v5/*: any*/),
        "activityLogs.edges.node.user.id": (v4/*: any*/),
        "activityLogs.edges.node.verb": (v5/*: any*/),
        "activityLogs.pageInfo": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageInfo"
        },
        "activityLogs.pageInfo.endCursor": (v5/*: any*/),
        "activityLogs.pageInfo.hasNextPage": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Boolean"
        }
      }
    },
    "name": "ActivityLogWithQuery",
    "operationKind": "query",
    "text": "query ActivityLogWithQuery {\n  ...ActivityLogsFragment\n}\n\nfragment ActivityLogsFragment on Query {\n  activityLogs(first: 10) {\n    edges {\n      node {\n        id\n        createdAt\n        events {\n          edges {\n            node {\n              label\n              diff\n              id\n            }\n          }\n        }\n        verb\n        url\n        user {\n          id\n          fullName\n          email\n          avatar(width: 48, height: 48) {\n            url\n          }\n        }\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "af7971e8a6bd207df1152159df3d98c3";

export default node;
