/**
 * @generated SignedSource<<179bd90ee9cd08b529f68e49c93966c2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ActivityLogGroupsQuery$variables = Record<PropertyKey, never>;
export type ActivityLogGroupsQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ActivityLogsFragment">;
};
export type ActivityLogGroupsQuery = {
  response: ActivityLogGroupsQuery$data;
  variables: ActivityLogGroupsQuery$variables;
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
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ActivityLogGroupsQuery",
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
    "name": "ActivityLogGroupsQuery",
    "selections": [
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
    ]
  },
  "params": {
    "cacheID": "fa4c743d88d0cb82c5aba7b78936112b",
    "id": null,
    "metadata": {},
    "name": "ActivityLogGroupsQuery",
    "operationKind": "query",
    "text": "query ActivityLogGroupsQuery {\n  ...ActivityLogsFragment\n}\n\nfragment ActivityLogsFragment on Query {\n  activityLogGroups(intervalMinutes: 15) {\n    intervalStart\n    logs {\n      id\n      verb\n      createdAt\n      url\n      user {\n        id\n        fullName\n        email\n        avatar(width: 48, height: 48) {\n          url\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "b98152158c38246b73cc5042eafb431b";

export default node;
