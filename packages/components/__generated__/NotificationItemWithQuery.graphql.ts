/**
 * @generated SignedSource<<c630a7e1c9ad0fc00fb01ae8348c00a4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ConcreteRequest, Query } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type NotificationItemWithQuery$variables = Record<PropertyKey, never>
export type NotificationItemWithQuery$data = {
  readonly target:
    | {
        readonly ' $fragmentSpreads': FragmentRefs<'NotificationItemFragment'>
      }
    | null
    | undefined
}
export type NotificationItemWithQuery = {
  response: NotificationItemWithQuery$data
  variables: NotificationItemWithQuery$variables
}

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        kind: 'Literal',
        name: 'id',
        value: 'test-id',
      },
    ],
    v1 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: '__typename',
      storageKey: null,
    },
    v2 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'id',
      storageKey: null,
    },
    v3 = [
      v2 /*: any*/,
      v1 /*: any*/,
      {
        kind: 'InlineFragment',
        selections: [
          {
            alias: null,
            args: null,
            kind: 'ScalarField',
            name: 'body',
            storageKey: null,
          },
        ],
        type: 'Comment',
        abstractKey: null,
      },
    ],
    v4 = {
      enumValues: null,
      nullable: true,
      plural: false,
      type: 'Node',
    },
    v5 = {
      enumValues: null,
      nullable: false,
      plural: false,
      type: 'String',
    },
    v6 = {
      enumValues: null,
      nullable: true,
      plural: false,
      type: 'String',
    },
    v7 = {
      enumValues: null,
      nullable: false,
      plural: false,
      type: 'ID',
    }
  return {
    fragment: {
      argumentDefinitions: [],
      kind: 'Fragment',
      metadata: null,
      name: 'NotificationItemWithQuery',
      selections: [
        {
          alias: 'target',
          args: v0 /*: any*/,
          concreteType: null,
          kind: 'LinkedField',
          name: 'node',
          plural: false,
          selections: [
            {
              args: null,
              kind: 'FragmentSpread',
              name: 'NotificationItemFragment',
            },
          ],
          storageKey: 'node(id:"test-id")',
        },
      ],
      type: 'Query',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: [],
      kind: 'Operation',
      name: 'NotificationItemWithQuery',
      selections: [
        {
          alias: 'target',
          args: v0 /*: any*/,
          concreteType: null,
          kind: 'LinkedField',
          name: 'node',
          plural: false,
          selections: [
            v1 /*: any*/,
            v2 /*: any*/,
            {
              kind: 'InlineFragment',
              selections: [
                {
                  alias: null,
                  args: null,
                  kind: 'ScalarField',
                  name: 'pk',
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  kind: 'ScalarField',
                  name: 'unread',
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  kind: 'ScalarField',
                  name: 'timestamp',
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  kind: 'ScalarField',
                  name: 'level',
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  kind: 'ScalarField',
                  name: 'verb',
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  kind: 'ScalarField',
                  name: 'description',
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  kind: 'ScalarField',
                  name: 'data',
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  concreteType: null,
                  kind: 'LinkedField',
                  name: 'actor',
                  plural: false,
                  selections: [
                    v1 /*: any*/,
                    v2 /*: any*/,
                    {
                      kind: 'InlineFragment',
                      selections: [
                        {
                          alias: null,
                          args: [
                            {
                              kind: 'Literal',
                              name: 'height',
                              value: 48,
                            },
                            {
                              kind: 'Literal',
                              name: 'width',
                              value: 48,
                            },
                          ],
                          concreteType: 'File',
                          kind: 'LinkedField',
                          name: 'avatar',
                          plural: false,
                          selections: [
                            {
                              alias: null,
                              args: null,
                              kind: 'ScalarField',
                              name: 'url',
                              storageKey: null,
                            },
                          ],
                          storageKey: 'avatar(height:48,width:48)',
                        },
                        {
                          alias: null,
                          args: null,
                          kind: 'ScalarField',
                          name: 'fullName',
                          storageKey: null,
                        },
                      ],
                      type: 'User',
                      abstractKey: null,
                    },
                  ],
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  concreteType: null,
                  kind: 'LinkedField',
                  name: 'target',
                  plural: false,
                  selections: v3 /*: any*/,
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  concreteType: null,
                  kind: 'LinkedField',
                  name: 'actionObject',
                  plural: false,
                  selections: v3 /*: any*/,
                  storageKey: null,
                },
              ],
              type: 'Notification',
              abstractKey: null,
            },
          ],
          storageKey: 'node(id:"test-id")',
        },
      ],
    },
    params: {
      cacheID: '2a1ab89672542581137a24207ae151e2',
      id: null,
      metadata: {
        relayTestingSelectionTypeInfo: {
          target: v4 /*: any*/,
          'target.__typename': v5 /*: any*/,
          'target.actionObject': v4 /*: any*/,
          'target.actionObject.__typename': v5 /*: any*/,
          'target.actionObject.body': v6 /*: any*/,
          'target.actionObject.id': v7 /*: any*/,
          'target.actor': v4 /*: any*/,
          'target.actor.__typename': v5 /*: any*/,
          'target.actor.avatar': {
            enumValues: null,
            nullable: true,
            plural: false,
            type: 'File',
          },
          'target.actor.avatar.url': v5 /*: any*/,
          'target.actor.fullName': v6 /*: any*/,
          'target.actor.id': v7 /*: any*/,
          'target.data': {
            enumValues: null,
            nullable: true,
            plural: false,
            type: 'GenericScalar',
          },
          'target.description': v6 /*: any*/,
          'target.id': v7 /*: any*/,
          'target.level': {
            enumValues: ['SUCCESS', 'INFO', 'WARNING', 'ERROR'],
            nullable: false,
            plural: false,
            type: 'NotificationsNotificationLevelChoices',
          },
          'target.pk': {
            enumValues: null,
            nullable: false,
            plural: false,
            type: 'Int',
          },
          'target.target': v4 /*: any*/,
          'target.target.__typename': v5 /*: any*/,
          'target.target.body': v6 /*: any*/,
          'target.target.id': v7 /*: any*/,
          'target.timestamp': {
            enumValues: null,
            nullable: false,
            plural: false,
            type: 'DateTime',
          },
          'target.unread': {
            enumValues: null,
            nullable: false,
            plural: false,
            type: 'Boolean',
          },
          'target.verb': v5 /*: any*/,
        },
      },
      name: 'NotificationItemWithQuery',
      operationKind: 'query',
      text: 'query NotificationItemWithQuery {\n  target: node(id: "test-id") {\n    __typename\n    ...NotificationItemFragment\n    id\n  }\n}\n\nfragment NotificationItemFragment on Notification {\n  id\n  pk\n  unread\n  timestamp\n  level\n  verb\n  description\n  data\n  actor {\n    __typename\n    id\n    ... on User {\n      avatar(width: 48, height: 48) {\n        url\n      }\n      fullName\n    }\n  }\n  target {\n    id\n    __typename\n    ... on Comment {\n      id\n      body\n    }\n  }\n  actionObject {\n    id\n    __typename\n    ... on Comment {\n      id\n      body\n    }\n  }\n}\n',
    },
  }
})()

;(node as any).hash = 'fdd4687d40d788b8c366d75a02c97403'

export default node
