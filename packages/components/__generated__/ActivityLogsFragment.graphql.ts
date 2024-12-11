/**
 * @generated SignedSource<<82eb4a743945c4698b11713118507f2d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ActivityLogsFragment$data = {
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
  readonly " $fragmentType": "ActivityLogsFragment";
};
export type ActivityLogsFragment$key = {
  readonly " $data"?: ActivityLogsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ActivityLogsFragment">;
};

const node: ReaderFragment = (function(){
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
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "refetch": {
      "connection": null,
      "fragmentPathInResult": [],
      "operation": require('./ActivityLogGroupsQuery.graphql')
    }
  },
  "name": "ActivityLogsFragment",
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
  ],
  "type": "Query",
  "abstractKey": null
};
})();

(node as any).hash = "b98152158c38246b73cc5042eafb431b";

export default node;
