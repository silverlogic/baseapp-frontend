/**
 * @generated SignedSource<<b606a12b6571e71382bb5045ba4c1e8d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type userMembersListPaginationRefetchable$variables = {
  count?: number | null | undefined;
  cursor?: string | null | undefined;
  id: string;
  orderBy?: string | null | undefined;
  q?: string | null | undefined;
};
export type userMembersListPaginationRefetchable$data = {
  readonly node: {
    readonly " $fragmentSpreads": FragmentRefs<"UserMembersListFragment">;
  } | null | undefined;
};
export type userMembersListPaginationRefetchable = {
  response: userMembersListPaginationRefetchable$data;
  variables: userMembersListPaginationRefetchable$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": 10,
  "kind": "LocalArgument",
  "name": "count"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "cursor"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "orderBy"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "q"
},
v5 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v6 = {
  "kind": "Variable",
  "name": "orderBy",
  "variableName": "orderBy"
},
v7 = {
  "kind": "Variable",
  "name": "q",
  "variableName": "q"
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v11 = {
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
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "url",
      "storageKey": null
    }
  ],
  "storageKey": "image(height:100,width:100)"
},
v12 = {
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
    (v9/*: any*/)
  ],
  "storageKey": null
},
v13 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "count"
  },
  (v6/*: any*/),
  (v7/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "userMembersListPaginationRefetchable",
    "selections": [
      {
        "alias": null,
        "args": (v5/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "args": [
              {
                "kind": "Variable",
                "name": "count",
                "variableName": "count"
              },
              {
                "kind": "Variable",
                "name": "cursor",
                "variableName": "cursor"
              },
              (v6/*: any*/),
              (v7/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "UserMembersListFragment"
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "userMembersListPaginationRefetchable",
    "selections": [
      {
        "alias": null,
        "args": (v5/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v8/*: any*/),
          (v9/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": "canChangeRole",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "perm",
                    "value": "baseapp_profiles.change_profileuserrole"
                  }
                ],
                "kind": "ScalarField",
                "name": "hasPerm",
                "storageKey": "hasPerm(perm:\"baseapp_profiles.change_profileuserrole\")"
              },
              (v10/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/),
              {
                "alias": null,
                "args": (v13/*: any*/),
                "concreteType": "ProfileUserRoleConnection",
                "kind": "LinkedField",
                "name": "members",
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
                    "concreteType": "ProfileUserRoleEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ProfileUserRole",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v9/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "User",
                            "kind": "LinkedField",
                            "name": "user",
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
                                  (v9/*: any*/),
                                  (v10/*: any*/),
                                  (v11/*: any*/),
                                  (v12/*: any*/)
                                ],
                                "storageKey": null
                              },
                              (v9/*: any*/)
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
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "status",
                            "storageKey": null
                          },
                          (v8/*: any*/)
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
                "args": (v13/*: any*/),
                "filters": [
                  "orderBy",
                  "q"
                ],
                "handle": "connection",
                "key": "UserMembersFragment_members",
                "kind": "LinkedHandle",
                "name": "members"
              }
            ],
            "type": "Profile",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "face3a956a429a02eac4e1ebaedda0ff",
    "id": null,
    "metadata": {},
    "name": "userMembersListPaginationRefetchable",
    "operationKind": "query",
    "text": "query userMembersListPaginationRefetchable(\n  $count: Int = 10\n  $cursor: String\n  $orderBy: String\n  $q: String\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...UserMembersListFragment_40Ewnb\n    id\n  }\n}\n\nfragment MemberItemFragment on ProfileUserRole {\n  id\n  user {\n    profile {\n      ...ProfileItemFragment\n      id\n    }\n    id\n  }\n  role\n  status\n}\n\nfragment ProfileItemFragment on Profile {\n  id\n  name\n  image(width: 100, height: 100) {\n    url\n  }\n  urlPath {\n    path\n    id\n  }\n}\n\nfragment UserMembersListFragment_40Ewnb on Profile {\n  canChangeRole: hasPerm(perm: \"baseapp_profiles.change_profileuserrole\")\n  ...ProfileItemFragment\n  members(first: $count, after: $cursor, orderBy: $orderBy, q: $q) {\n    totalCount\n    edges {\n      node {\n        ...MemberItemFragment\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  id\n}\n"
  }
};
})();

(node as any).hash = "36d39484eb42189ff857dac6fec4b13d";

export default node;
