/**
 * @generated SignedSource<<e3a97717a5107aadae2e83006c85d953>>
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
        readonly contentPlainText: string | null | undefined
        readonly id: string
      }
    | null
    | undefined
  readonly lastMessageTime: any | null | undefined
  readonly unreadMessages:
    | {
        readonly count: number
        readonly markedUnread: boolean
      }
    | null
    | undefined
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
        concreteType: 'UnreadMessageCount',
        kind: 'LinkedField',
        name: 'unreadMessages',
        plural: false,
        selections: [
          {
            alias: null,
            args: null,
            kind: 'ScalarField',
            name: 'count',
            storageKey: null,
          },
          {
            alias: null,
            args: null,
            kind: 'ScalarField',
            name: 'markedUnread',
            storageKey: null,
          },
        ],
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
          {
            alias: null,
            args: null,
            kind: 'ScalarField',
            name: 'contentPlainText',
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

;(node as any).hash = '8373f2e93afaf59aae879e71a2a0ba7b'

export default node
