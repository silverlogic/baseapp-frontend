/**
 * @generated SignedSource<<f5f5b4bd053acc8703e1a959dfb019f3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type ReportCreateInput = {
  clientMutationId?: string | null | undefined;
  reportSubject?: string | null | undefined;
  reportTypeId: string;
  targetObjectId: string;
};
export type ReportCreateMutation$variables = {
  input: ReportCreateInput;
};
export type ReportCreateMutation$data = {
  readonly reportCreate: {
    readonly report: {
      readonly node: {
        readonly created: any;
        readonly id: string;
      } | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type ReportCreateMutation = {
  response: ReportCreateMutation$data;
  variables: ReportCreateMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "ReportCreatePayload",
    "kind": "LinkedField",
    "name": "reportCreate",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ReportEdge",
        "kind": "LinkedField",
        "name": "report",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Report",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "created",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ReportCreateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ReportCreateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "148ecb7187b9eff3b3f8534bdf9510c4",
    "id": null,
    "metadata": {},
    "name": "ReportCreateMutation",
    "operationKind": "mutation",
    "text": "mutation ReportCreateMutation(\n  $input: ReportCreateInput!\n) {\n  reportCreate(input: $input) {\n    report {\n      node {\n        id\n        created\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "dbacbc41e0ef13c095f30222c485e535";

export default node;
