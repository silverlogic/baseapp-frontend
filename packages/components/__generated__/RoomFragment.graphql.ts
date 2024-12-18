/**
 * @generated SignedSource<<3ff677fac515b53b8e1eeddd770cf81d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { Fragment, ReaderFragment } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type RoomFragment$data = {
  readonly id: string
  readonly lastMessage:
    | {
        readonly content: string | null | undefined
        readonly id: string
      }
    | null
    | undefined
  readonly lastMessageTime: any | null | undefined
  readonly unreadMessagesCount: number | null | undefined
  readonly ' $fragmentSpreads': FragmentRefs<'ChatRoomHeaderFragment' | 'MessagesListFragment'>
  readonly ' $fragmentType': 'RoomFragment'
}
export type RoomFragment$key = {
  readonly ' $data'?: RoomFragment$data
  readonly ' $fragmentSpreads': FragmentRefs<'RoomFragment'>
}

const node: ReaderFragment = (function () {
  var v0 = {
    alias: null,
    args: null,
    kind: 'ScalarField',
    name: 'id',
    storageKey: null,
  }
  return {
    argumentDefinitions: [],
    kind: 'Fragment',
    metadata: null,
    name: 'RoomFragment',
    selections: [
      v0 /*: any*/,
      {
        alias: null,
        args: null,
        kind: 'ScalarField',
        name: 'unreadMessagesCount',
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        kind: 'ScalarField',
        name: 'lastMessageTime',
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        concreteType: 'Message',
        kind: 'LinkedField',
        name: 'lastMessage',
        plural: false,
        selections: [
          v0 /*: any*/,
          {
            alias: null,
            args: null,
            kind: 'ScalarField',
            name: 'content',
            storageKey: null,
          },
        ],
        storageKey: null,
      },
      {
        args: null,
        kind: 'FragmentSpread',
        name: 'ChatRoomHeaderFragment',
      },
      {
        args: null,
        kind: 'FragmentSpread',
        name: 'MessagesListFragment',
      },
    ],
    type: 'ChatRoom',
    abstractKey: null,
  }
})()

;(node as any).hash = '9d4bfcdfca9ea94693b2ebb241c58e9f'

export default node
