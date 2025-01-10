/**
 * @generated SignedSource<<bf5092d967f02ebc32b57a55983ba6cb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { Fragment, ReaderFragment } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type ChatRoomHeaderFragment$data = {
  readonly id: string
  readonly image:
    | {
        readonly url: string
      }
    | null
    | undefined
  readonly isGroup: boolean
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
  readonly ' $fragmentType': 'ChatRoomHeaderFragment'
}
export type ChatRoomHeaderFragment$key = {
  readonly ' $data'?: ChatRoomHeaderFragment$data
  readonly ' $fragmentSpreads': FragmentRefs<'ChatRoomHeaderFragment'>
}

const node: ReaderFragment = (function () {
  var v0 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'id',
      storageKey: null,
    },
    v1 = [
      {
        alias: null,
        args: null,
        kind: 'ScalarField',
        name: 'url',
        storageKey: null,
      },
    ]
  return {
    argumentDefinitions: [],
    kind: 'Fragment',
    metadata: null,
    name: 'ChatRoomHeaderFragment',
    selections: [
      v0 /*: any*/,
      {
        alias: null,
        args: [
          {
            kind: 'Literal',
            name: 'height',
            value: 144,
          },
          {
            kind: 'Literal',
            name: 'width',
            value: 144,
          },
        ],
        concreteType: 'File',
        kind: 'LinkedField',
        name: 'image',
        plural: false,
        selections: v1 /*: any*/,
        storageKey: 'image(height:144,width:144)',
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
        kind: 'ScalarField',
        name: 'isGroup',
        storageKey: null,
      },
      {
        alias: null,
        args: [
          {
            kind: 'Literal',
            name: 'first',
            value: 5,
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
                        selections: v1 /*: any*/,
                        storageKey: 'image(height:100,width:100)',
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
        ],
        storageKey: 'participants(first:5)',
      },
    ],
    type: 'ChatRoom',
    abstractKey: null,
  }
})()

;(node as any).hash = 'aefc48a15953094b0593795e3ce5ba37'

export default node
