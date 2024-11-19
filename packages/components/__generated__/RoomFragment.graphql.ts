/**
 * @generated SignedSource<<94f429c180be507431ab05033c8e28fa>>
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
  readonly image:
    | {
        readonly url: string
      }
    | null
    | undefined
  readonly lastMessage:
    | {
        readonly content: string | null | undefined
        readonly id: string
      }
    | null
    | undefined
  readonly lastMessageTime: any | null | undefined
  readonly participants:
    | {
        readonly edges: ReadonlyArray<
          | {
              readonly node:
                | {
                    readonly id: string
                    readonly profile:
                      | {
                          readonly __typename: 'Profile'
                          readonly id: string
                          readonly image:
                            | {
                                readonly url: string
                              }
                            | null
                            | undefined
                          readonly name: string | null | undefined
                        }
                      | null
                      | undefined
                  }
                | null
                | undefined
            }
          | null
          | undefined
        >
        readonly totalCount: number | null | undefined
      }
    | null
    | undefined
  readonly title: string | null | undefined
  readonly unreadMessagesCount: number | null | undefined
  readonly ' $fragmentSpreads': FragmentRefs<'MessagesListFragment'>
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
    },
    v1 = {
      alias: null,
      args: [
        {
          kind: 'Literal',
          name: 'height',
          value: 100,
        },
        {
          kind: 'Literal',
          name: 'width',
          value: 100,
        },
      ],
      concreteType: 'File',
      kind: 'LinkedField',
      name: 'image',
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
      storageKey: 'image(height:100,width:100)',
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
      v1 /*: any*/,
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
        alias: null,
        args: null,
        kind: 'ScalarField',
        name: 'title',
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        concreteType: 'ChatRoomParticipantConnection',
        kind: 'LinkedField',
        name: 'participants',
        plural: false,
        selections: [
          {
            alias: null,
            args: null,
            kind: 'ScalarField',
            name: 'totalCount',
            storageKey: null,
          },
          {
            alias: null,
            args: null,
            concreteType: 'ChatRoomParticipantEdge',
            kind: 'LinkedField',
            name: 'edges',
            plural: true,
            selections: [
              {
                alias: null,
                args: null,
                concreteType: 'ChatRoomParticipant',
                kind: 'LinkedField',
                name: 'node',
                plural: false,
                selections: [
                  v0 /*: any*/,
                  {
                    alias: null,
                    args: null,
                    concreteType: 'Profile',
                    kind: 'LinkedField',
                    name: 'profile',
                    plural: false,
                    selections: [
                      v0 /*: any*/,
                      {
                        alias: null,
                        args: null,
                        kind: 'ScalarField',
                        name: '__typename',
                        storageKey: null,
                      },
                      {
                        alias: null,
                        args: null,
                        kind: 'ScalarField',
                        name: 'name',
                        storageKey: null,
                      },
                      v1 /*: any*/,
                    ],
                    storageKey: null,
                  },
                ],
                storageKey: null,
              },
            ],
            storageKey: null,
          },
        ],
        storageKey: null,
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

;(node as any).hash = '7a8fa70089ead1942520892d561382ef'

export default node
