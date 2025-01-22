/**
 * @generated SignedSource<<19f40b24ac8ca99201010ad3a7d437bd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { Fragment, ReaderFragment } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type UnreadMessagesCountFragment$data = {
  readonly id: string
  readonly unreadMessages:
    | {
        readonly count: number
        readonly markedUnread: boolean
      }
    | null
    | undefined
  readonly ' $fragmentType': 'UnreadMessagesCountFragment'
}
export type UnreadMessagesCountFragment$key = {
  readonly ' $data'?: UnreadMessagesCountFragment$data
  readonly ' $fragmentSpreads': FragmentRefs<'UnreadMessagesCountFragment'>
}

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: 'Fragment',
  metadata: null,
  name: 'UnreadMessagesCountFragment',
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
  ],
  type: 'ChatRoom',
  abstractKey: null,
}

;(node as any).hash = '153dd01c7e0a3cfb050cbc4215409310'

export default node
