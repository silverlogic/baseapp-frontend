/**
 * @generated SignedSource<<bab0262fe5fdfee2128f15c60c56df68>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { Fragment, ReaderFragment } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type ProfileRoleStatus = 'ACTIVE' | 'INACTIVE' | 'PENDING' | '%future added value'
export type ProfileRoles = 'ADMIN' | 'MANAGER' | '%future added value'

export type MemberItemFragment$data = {
  readonly id: string
  readonly role: ProfileRoles | null | undefined
  readonly status: ProfileRoleStatus | null | undefined
  readonly user: {
    readonly id: string
    readonly profile:
      | {
          readonly ' $fragmentSpreads': FragmentRefs<'ProfileItemFragment'>
        }
      | null
      | undefined
  }
  readonly ' $fragmentType': 'MemberItemFragment'
}
export type MemberItemFragment$key = {
  readonly ' $data'?: MemberItemFragment$data
  readonly ' $fragmentSpreads': FragmentRefs<'MemberItemFragment'>
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
    name: 'MemberItemFragment',
    selections: [
      v0 /*: any*/,
      {
        alias: null,
        args: null,
        concreteType: 'User',
        kind: 'LinkedField',
        name: 'user',
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
                args: null,
                kind: 'FragmentSpread',
                name: 'ProfileItemFragment',
              },
            ],
            storageKey: null,
          },
          v0 /*: any*/,
        ],
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        kind: 'ScalarField',
        name: 'role',
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        kind: 'ScalarField',
        name: 'status',
        storageKey: null,
      },
    ],
    type: 'ProfileUserRole',
    abstractKey: null,
  }
})()

;(node as any).hash = '18aa448d266fed6b34c6377032e7a213'

export default node
