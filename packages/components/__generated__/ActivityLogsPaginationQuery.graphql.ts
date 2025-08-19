/**
 * @generated SignedSource<<5650ad59a2e8bce8201187df73df95b3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ActivityLogsPaginationQuery$variables = {
  count?: number | null | undefined;
  createdFrom?: any | null | undefined;
  createdTo?: any | null | undefined;
  cursor?: string | null | undefined;
  userName?: string | null | undefined;
};
export type ActivityLogsPaginationQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ActivityLogsFragment">;
};
export type ActivityLogsPaginationQuery = {
  response: ActivityLogsPaginationQuery$data;
  variables: ActivityLogsPaginationQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": 10,
    "kind": "LocalArgument",
    "name": "count"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "createdFrom"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "createdTo"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "cursor"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "userName"
  }
],
v1 = {
  "kind": "Variable",
  "name": "createdFrom",
  "variableName": "createdFrom"
},
v2 = {
  "kind": "Variable",
  "name": "createdTo",
  "variableName": "createdTo"
},
v3 = {
  "kind": "Variable",
  "name": "userName",
  "variableName": "userName"
},
v4 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor"
  },
  (v1/*: any*/),
  (v2/*: any*/),
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "count"
  },
  (v3/*: any*/)
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ActivityLogsPaginationQuery",
    "selections": [
      {
        "args": [
          {
            "kind": "Variable",
            "name": "count",
            "variableName": "count"
          },
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "kind": "Variable",
            "name": "cursor",
            "variableName": "cursor"
          },
          (v3/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "ActivityLogsFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ActivityLogsPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
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
                  (v5/*: any*/),
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
                              (v5/*: any*/)
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
                  (v6/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "user",
                    "plural": false,
                    "selections": [
                      (v5/*: any*/),
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
                          (v6/*: any*/)
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
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v4/*: any*/),
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
    "cacheID": "0cf140296c61a78216ad563591dd2c03",
    "id": null,
    "metadata": {},
    "name": "ActivityLogsPaginationQuery",
    "operationKind": "query",
    "text": "query ActivityLogsPaginationQuery(\n  $count: Int = 10\n  $createdFrom: Date = null\n  $createdTo: Date = null\n  $cursor: String\n  $userName: String = null\n) {\n  ...ActivityLogsFragment_4k2xyr\n}\n\nfragment ActivityLogsFragment_4k2xyr on Query {\n  activityLogs(first: $count, after: $cursor, userName: $userName, createdFrom: $createdFrom, createdTo: $createdTo) {\n    edges {\n      node {\n        id\n        createdAt\n        events {\n          edges {\n            node {\n              label\n              diff\n              id\n            }\n          }\n        }\n        verb\n        url\n        user {\n          id\n          fullName\n          email\n          avatar(width: 48, height: 48) {\n            url\n          }\n        }\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "331e3d4312fbe40053110fe98844df70";

export default node;
