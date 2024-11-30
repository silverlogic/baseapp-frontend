/**
 * @generated SignedSource<<5654b1a588bbb091cce70cdee1e0ccff>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { Fragment, ReaderFragment } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type ProfileItemFragment$data = {
  readonly id: string
  readonly image:
    | {
        readonly url: string
      }
    | null
    | undefined
  readonly name: string | null | undefined
  readonly urlPath:
    | {
        readonly path: string
      }
    | null
    | undefined
  readonly ' $fragmentType': 'ProfileItemFragment'
}
export type ProfileItemFragment$key = {
  readonly ' $data'?: ProfileItemFragment$data
  readonly ' $fragmentSpreads': FragmentRefs<'ProfileItemFragment'>
}

const node: ReaderFragment = {
  argumentDefinitions: [
    {
      defaultValue: 100,
      kind: 'LocalArgument',
      name: 'avatarSize',
    },
  ],
  kind: 'Fragment',
  metadata: null,
  name: 'ProfileItemFragment',
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
    {
      alias: null,
      args: [
        {
          kind: 'Variable',
          name: 'height',
          variableName: 'avatarSize',
        },
        {
          kind: 'Variable',
          name: 'width',
          variableName: 'avatarSize',
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
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      concreteType: 'URLPath',
      kind: 'LinkedField',
      name: 'urlPath',
      plural: false,
      selections: [
        {
          alias: null,
          args: null,
          kind: 'ScalarField',
          name: 'path',
          storageKey: null,
        },
      ],
      storageKey: null,
    },
  ],
  type: 'Profile',
  abstractKey: null,
}

;(node as any).hash = 'cc90631aac89344f22ce8e98cab7d7e4'

export default node
