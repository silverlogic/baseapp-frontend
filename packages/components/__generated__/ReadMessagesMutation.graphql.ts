/**
 * @generated SignedSource<<b7f5c555c3af89b5439a82d0affe9022>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChatRoomReadMessagesInput = {
  clientMutationId?: string | null | undefined;
  messageIds?: ReadonlyArray<string | null | undefined> | null | undefined;
  profileId: string;
  roomId: string;
};
export type ReadMessagesMutation$variables = {
  input: ChatRoomReadMessagesInput;
};
export type ReadMessagesMutation$data = {
  readonly chatRoomReadMessages: {
    readonly errors: ReadonlyArray<{
      readonly field: string;
      readonly messages: ReadonlyArray<string>;
    } | null | undefined> | null | undefined;
    readonly room: {
      readonly id: string;
      readonly " $fragmentSpreads": FragmentRefs<"UnreadMessagesCountFragment">;
    } | null | undefined;
  } | null | undefined;
};
export type ReadMessagesMutation = {
  response: ReadMessagesMutation$data;
  variables: ReadMessagesMutation$variables;
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
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ReadMessagesMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ChatRoomReadMessagesPayload",
        "kind": "LinkedField",
        "name": "chatRoomReadMessages",
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
              (v2/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "UnreadMessagesCountFragment"
              }
            ],
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ReadMessagesMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ChatRoomReadMessagesPayload",
        "kind": "LinkedField",
        "name": "chatRoomReadMessages",
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
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "UnreadMessageCount",
                "kind": "LinkedField",
                "name": "unreadMessages",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "count",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "markedUnread",
                    "storageKey": null
                  },
                  (v2/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "4bebc93464740f3be7c5f5fdd1a3d6df",
    "id": null,
    "metadata": {},
    "name": "ReadMessagesMutation",
    "operationKind": "mutation",
    "text": "mutation ReadMessagesMutation(\n  $input: ChatRoomReadMessagesInput!\n) {\n  chatRoomReadMessages(input: $input) {\n    room {\n      id\n      ...UnreadMessagesCountFragment\n    }\n    errors {\n      field\n      messages\n    }\n  }\n}\n\nfragment UnreadMessagesCountFragment on ChatRoom {\n  id\n  unreadMessages {\n    count\n    markedUnread\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "eeed77ccb23fc338a5f401cb106e66fb";

export default node;
