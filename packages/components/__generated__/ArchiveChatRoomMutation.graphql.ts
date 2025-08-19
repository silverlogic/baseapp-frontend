/**
 * @generated SignedSource<<647535c9d71127f43d5fe99cd419725f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type ChatRoomArchiveInput = {
  archive: boolean;
  clientMutationId?: string | null | undefined;
  profileId: string;
  roomId: string;
};
export type ArchiveChatRoomMutation$variables = {
  input: ChatRoomArchiveInput;
};
export type ArchiveChatRoomMutation$data = {
  readonly chatRoomArchive: {
    readonly errors: ReadonlyArray<{
      readonly field: string;
      readonly messages: ReadonlyArray<string>;
    } | null | undefined> | null | undefined;
    readonly room: {
      readonly id: string;
      readonly isArchived: boolean | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type ArchiveChatRoomMutation = {
  response: ArchiveChatRoomMutation$data;
  variables: ArchiveChatRoomMutation$variables;
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
    "concreteType": "ChatRoomArchivePayload",
    "kind": "LinkedField",
    "name": "chatRoomArchive",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ChatRoom",
        "kind": "LinkedField",
        "name": "room",
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
            "name": "isArchived",
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
    "name": "ArchiveChatRoomMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ArchiveChatRoomMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "a5ff92800175aa403361c077d4e49670",
    "id": null,
    "metadata": {},
    "name": "ArchiveChatRoomMutation",
    "operationKind": "mutation",
    "text": "mutation ArchiveChatRoomMutation(\n  $input: ChatRoomArchiveInput!\n) {\n  chatRoomArchive(input: $input) {\n    room {\n      id\n      isArchived\n    }\n    errors {\n      field\n      messages\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "f6be713c58475ebea0ad623b11c629de";

export default node;
