/**
 * @generated SignedSource<<e7823541540a6846adb1bc1a5ce0c5a7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { Fragment, ReaderFragment } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'
<<<<<<< HEAD
=======

export type ChatRoomParticipantRoles = 'ADMIN' | 'MEMBER' | '%future added value'
>>>>>>> ca42a63 (feat: leave chatroom as admin)

export type RoomTitleFragment$data = {
  readonly id: string
  readonly participants:
    | {
        readonly edges: ReadonlyArray<
          | {
              readonly node:
                | {
                    readonly profile:
                      | {
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
<<<<<<< HEAD
=======
                    readonly role: ChatRoomParticipantRoles | null | undefined
>>>>>>> ca42a63 (feat: leave chatroom as admin)
                  }
                | null
                | undefined
            }
          | null
          | undefined
        >
      }
    | null
    | undefined
  readonly ' $fragmentType': 'RoomTitleFragment'
}
export type RoomTitleFragment$key = {
  readonly ' $data'?: RoomTitleFragment$data
  readonly ' $fragmentSpreads': FragmentRefs<'RoomTitleFragment'>
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
    name: 'RoomTitleFragment',
    selections: [
      v0 /*: any*/,
      {
        alias: null,
        args: [
          {
            kind: 'Literal',
            name: 'first',
            value: 2,
          },
        ],
        concreteType: 'ChatRoomParticipantConnection',
        kind: 'LinkedField',
        name: 'participants',
        plural: false,
        selections: [
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
                        name: 'name',
                        storageKey: null,
                      },
                      {
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
                      },
                    ],
                    storageKey: null,
                  },
<<<<<<< HEAD
=======
                  {
                    alias: null,
                    args: null,
                    kind: 'ScalarField',
                    name: 'role',
                    storageKey: null,
                  },
>>>>>>> ca42a63 (feat: leave chatroom as admin)
                ],
                storageKey: null,
              },
            ],
            storageKey: null,
          },
        ],
        storageKey: 'participants(first:2)',
      },
    ],
    type: 'ChatRoom',
    abstractKey: null,
  }
})()

<<<<<<< HEAD
;(node as any).hash = '89160f172288e6c8c11de9207b13170b'
=======
;(node as any).hash = '85a5bc01dc7b0a178da79ab086920f79'
>>>>>>> ca42a63 (feat: leave chatroom as admin)

export default node
