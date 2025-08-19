/**
 * @generated SignedSource<<9ca1ed4c83b964637e2d75143a39a3ab>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type ProfileRoles = "ADMIN" | "MANAGER" | "%future added value";
export type RoleUpdateInput = {
  clientMutationId?: string | null | undefined;
  profileId: string;
  roleType?: ProfileRoles | null | undefined;
  userId: string;
};
export type ChangeUserRoleMutation$variables = {
  input: RoleUpdateInput;
};
export type ChangeUserRoleMutation$data = {
  readonly profileRoleUpdate: {
    readonly errors: ReadonlyArray<{
      readonly field: string;
      readonly messages: ReadonlyArray<string>;
    } | null | undefined> | null | undefined;
    readonly profileUserRole: {
      readonly id: string;
      readonly role: ProfileRoles | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type ChangeUserRoleMutation = {
  response: ChangeUserRoleMutation$data;
  variables: ChangeUserRoleMutation$variables;
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
    "concreteType": "RoleUpdatePayload",
    "kind": "LinkedField",
    "name": "profileRoleUpdate",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ProfileUserRole",
        "kind": "LinkedField",
        "name": "profileUserRole",
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
            "name": "role",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "ErrorType",
        "kind": "LinkedField",
        "name": "errors",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "field",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "messages",
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
    "name": "ChangeUserRoleMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChangeUserRoleMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "b8717d03953ac3aeaf61e4a3b826c7d1",
    "id": null,
    "metadata": {},
    "name": "ChangeUserRoleMutation",
    "operationKind": "mutation",
    "text": "mutation ChangeUserRoleMutation(\n  $input: RoleUpdateInput!\n) {\n  profileRoleUpdate(input: $input) {\n    profileUserRole {\n      id\n      role\n    }\n    errors {\n      field\n      messages\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "e4f28862dc2b186db3b3fb452cf749bb";

export default node;
