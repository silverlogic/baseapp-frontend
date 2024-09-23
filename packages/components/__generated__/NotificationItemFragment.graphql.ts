/**
 * @generated SignedSource<<54c65b4705b09eb66456e99dd5901529>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { Fragment, ReaderFragment } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type BaseappNotificationsNotificationLevelChoices =
  | 'ERROR'
  | 'INFO'
  | 'SUCCESS'
  | 'WARNING'
  | '%future added value'

export type NotificationItemFragment$data = {
  readonly actionObject:
    | {
        readonly __typename: string
        readonly body?: string | null | undefined
        readonly id: string
      }
    | null
    | undefined
  readonly actor:
    | {
        readonly avatar?:
          | {
              readonly url: string
            }
          | null
          | undefined
        readonly fullName?: string | null | undefined
        readonly id: string
      }
    | null
    | undefined
  readonly data: any | null | undefined
  readonly description: string | null | undefined
  readonly id: string
  readonly level: BaseappNotificationsNotificationLevelChoices
  readonly pk: number
  readonly target:
    | {
        readonly __typename: string
        readonly id: string
      }
    | null
    | undefined
  readonly timestamp: any
  readonly unread: boolean
  readonly verb: string
  readonly ' $fragmentType': 'NotificationItemFragment'
}
export type NotificationItemFragment$key = {
  readonly ' $data'?: NotificationItemFragment$data
  readonly ' $fragmentSpreads': FragmentRefs<'NotificationItemFragment'>
}

const node: ReaderFragment = (function () {
  var v0 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'id',
      storageKey: null,
    },
    v1 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: '__typename',
      storageKey: null,
    }
  return {
    argumentDefinitions: [],
    kind: 'Fragment',
    metadata: null,
    name: 'NotificationItemFragment',
    selections: [
      v0 /*: any*/,
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
          v0 /*: any*/,
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
        selections: [v0 /*: any*/, v1 /*: any*/],
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        concreteType: null,
        kind: 'LinkedField',
        name: 'actionObject',
        plural: false,
        selections: [
          v0 /*: any*/,
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
        storageKey: null,
      },
    ],
    type: 'Notification',
    abstractKey: null,
  }
})()

;(node as any).hash = '2a3ba381d2a70ce73014c7d7549c7e66'

export default node
