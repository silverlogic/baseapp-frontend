/**
 * @generated SignedSource<<b1e2f25138f178f3e0fc16bf802f9e1b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type ActivityLogsQuery$variables = {
  after?: string | null | undefined;
  first?: number | null | undefined;
};
export type ActivityLogsQuery$data = {
  readonly activityLogs: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly createdAt: any;
        readonly id: string;
        readonly url: string | null | undefined;
        readonly user: {
          readonly avatar: {
            readonly url: string;
          } | null | undefined;
          readonly email: string | null | undefined;
          readonly fullName: string | null | undefined;
          readonly id: string;
        } | null | undefined;
        readonly verb: string | null | undefined;
      } | null | undefined;
    } | null | undefined>;
    readonly pageInfo: {
      readonly endCursor: string | null | undefined;
      readonly hasNextPage: boolean;
    };
  } | null | undefined;
};
export type ActivityLogsQuery = {
  response: ActivityLogsQuery$data;
  variables: ActivityLogsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "after"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "first"
},
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
  "name": "url",
  "storageKey": null
},
v4 = [
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
          (v2/*: any*/),
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
            "kind": "ScalarField",
            "name": "verb",
            "storageKey": null
          },
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
            "plural": false,
            "selections": [
              (v2/*: any*/),
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
                  (v3/*: any*/)
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
v5 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "after"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
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
    "name": "ActivityLogsQuery",
    "selections": [
      {
        "alias": "activityLogs",
        "args": null,
        "concreteType": "ActivityLogConnection",
        "kind": "LinkedField",
        "name": "__ActivityLogs_activityLogs_connection",
        "plural": false,
        "selections": (v4/*: any*/),
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "ActivityLogsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v5/*: any*/),
        "concreteType": "ActivityLogConnection",
        "kind": "LinkedField",
        "name": "activityLogs",
        "plural": false,
        "selections": (v4/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v5/*: any*/),
        "filters": null,
        "handle": "connection",
        "key": "ActivityLogs_activityLogs",
        "kind": "LinkedHandle",
        "name": "activityLogs"
      }
    ]
  },
  "params": {
    "cacheID": "6ee75200a3ebde6ecfb325887a25e26b",
    "id": null,
    "metadata": {
      "connection": [
        {
          "count": "first",
          "cursor": "after",
          "direction": "forward",
          "path": [
            "activityLogs"
          ]
        }
      ]
    },
    "name": "ActivityLogsQuery",
    "operationKind": "query",
    "text": "query ActivityLogsQuery(\n  $first: Int\n  $after: String\n) {\n  activityLogs(first: $first, after: $after) {\n    edges {\n      node {\n        id\n        createdAt\n        verb\n        url\n        user {\n          id\n          fullName\n          email\n          avatar(width: 48, height: 48) {\n            url\n          }\n        }\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "ce8ef4afe76c0043a20121502b986d50";

export default node;
