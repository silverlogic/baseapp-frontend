/**
 * @generated SignedSource<<d8e1692175b0dd31a1e789ed82c935ad>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { Fragment, ReaderFragment } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type ChatRoomHeaderFragment$data = {
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
    name: 'ChatRoomHeaderFragment',
    selections: [
      v0 /*: any*/,
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
        args: null,
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
                      {
                        alias: null,
                        args: null,
                        kind: 'ScalarField',
                        name: 'id',
                        storageKey: null,
                      },
                      {
                        alias: null,
                        args: null,
                        kind: 'ScalarField',
                        name: 'name',
                        storageKey: null,
                      },
                      v0 /*: any*/,
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
    ],
    type: 'ChatRoom',
    abstractKey: null,
  }
})()

;(node as any).hash = 'f2a6eba3e9bc5d8ca187b1be954d3278'

export default node
