/**
 * @generated SignedSource<<e80aae296710c5bee9cfaa7ea8e8407e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type ReportTypeListQuery$variables = {
  targetObjectId?: string | null | undefined;
  topLevelOnly: boolean;
};
export type ReportTypeListQuery$data = {
  readonly allReportTypes: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly key: string;
        readonly label: string;
        readonly subTypes: {
          readonly edges: ReadonlyArray<{
            readonly node: {
              readonly id: string;
              readonly key: string;
              readonly label: string;
              readonly parentType: {
                readonly id: string;
              } | null | undefined;
            } | null | undefined;
          } | null | undefined>;
        };
      } | null | undefined;
    } | null | undefined>;
  } | null | undefined;
};
export type ReportTypeListQuery = {
  response: ReportTypeListQuery$data;
  variables: ReportTypeListQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "targetObjectId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "topLevelOnly"
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
  "name": "key",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "label",
  "storageKey": null
},
v5 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "targetObjectId",
        "variableName": "targetObjectId"
      },
      {
        "kind": "Variable",
        "name": "topLevelOnly",
        "variableName": "topLevelOnly"
      }
    ],
    "concreteType": "ReportTypeConnection",
    "kind": "LinkedField",
    "name": "allReportTypes",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ReportTypeEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ReportType",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "ReportTypeConnection",
                "kind": "LinkedField",
                "name": "subTypes",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ReportTypeEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ReportType",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          (v3/*: any*/),
                          (v4/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "ReportType",
                            "kind": "LinkedField",
                            "name": "parentType",
                            "plural": false,
                            "selections": [
                              (v2/*: any*/)
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
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
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
    "name": "ReportTypeListQuery",
    "selections": (v5/*: any*/),
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
    "name": "ReportTypeListQuery",
    "selections": (v5/*: any*/)
  },
  "params": {
    "cacheID": "2a1cb10e4d8a3a849afa6afe9f99e8cd",
    "id": null,
    "metadata": {},
    "name": "ReportTypeListQuery",
    "operationKind": "query",
    "text": "query ReportTypeListQuery(\n  $topLevelOnly: Boolean!\n  $targetObjectId: String\n) {\n  allReportTypes(topLevelOnly: $topLevelOnly, targetObjectId: $targetObjectId) {\n    edges {\n      node {\n        id\n        key\n        label\n        subTypes {\n          edges {\n            node {\n              id\n              key\n              label\n              parentType {\n                id\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "3297b193c6683e05801128f77467914b";

export default node;
