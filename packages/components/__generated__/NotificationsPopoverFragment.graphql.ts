/**
 * @generated SignedSource<<47be4b188bda7b767468fd209eb62178>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { Fragment, ReaderFragment } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type NotificationsPopoverFragment$data = {
  readonly ' $fragmentSpreads': FragmentRefs<'NotificationUserMenuFragment'>
  readonly ' $fragmentType': 'NotificationsPopoverFragment'
}
export type NotificationsPopoverFragment$key = {
  readonly ' $data'?: NotificationsPopoverFragment$data
  readonly ' $fragmentSpreads': FragmentRefs<'NotificationsPopoverFragment'>
}

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: 'Fragment',
  metadata: null,
  name: 'NotificationsPopoverFragment',
  selections: [
    {
      args: null,
      kind: 'FragmentSpread',
      name: 'NotificationUserMenuFragment',
    },
  ],
  type: 'User',
  abstractKey: null,
}

;(node as any).hash = 'aa7937f53433c977e2d19769946ec689'

export default node
