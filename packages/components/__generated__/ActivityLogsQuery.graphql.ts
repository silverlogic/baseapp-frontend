/**
 * @generated SignedSource<<ed288b4c0f04c6456ad708b22a7b192c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type ActivityLogsQuery$variables = Record<PropertyKey, never>;
export type ActivityLogsQuery$data = {
  readonly activityLogGroups: ReadonlyArray<{
    readonly intervalStart: any | null | undefined;
    readonly logs: ReadonlyArray<{
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
    } | null | undefined> | null | undefined;
  } | null | undefined> | null | undefined;
};
export type ActivityLogsQuery = {
  response: ActivityLogsQuery$data;
  variables: ActivityLogsQuery$variables;
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Literal",
        "name": "intervalMinutes",
        "value": 15
      }
    ],
    "concreteType": "ActivityLogGroupType",
    "kind": "LinkedField",
    "name": "activityLogGroups",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "intervalStart",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "ActivityLog",
        "kind": "LinkedField",
        "name": "logs",
        "plural": true,
        "selections": [
          (v0/*: any*/),
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
            "name": "createdAt",
            "storageKey": null
          },
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
            "plural": false,
            "selections": [
              (v0/*: any*/),
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
                  (v1/*: any*/)
                ],
                "storageKey": "avatar(height:48,width:48)"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": "activityLogGroups(intervalMinutes:15)"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ActivityLogsQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ActivityLogsQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "57adc00d875f06cbb038fd81b7e61b9d",
    "id": null,
    "metadata": {},
    "name": "ActivityLogsQuery",
    "operationKind": "query",
    "text": "query ActivityLogsQuery {\n  activityLogGroups(intervalMinutes: 15) {\n    intervalStart\n    logs {\n      id\n      verb\n      createdAt\n      url\n      user {\n        id\n        fullName\n        email\n        avatar(width: 48, height: 48) {\n          url\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "5cea0086f288cb8a2a07605a5217d81d";

export default node;
