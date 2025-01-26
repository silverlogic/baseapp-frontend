/**
 * @generated SignedSource<<316ca690b86d88bcb1f06c1829b6ffe0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { ConcreteRequest, Query } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type ProfileComponentWithQuery$variables = Record<PropertyKey, never>
export type ProfileComponentWithQuery$data = {
  readonly profile:
    | {
        readonly ' $fragmentSpreads': FragmentRefs<'ProfileComponentFragment'>
      }
    | null
    | undefined
}
export type ProfileComponentWithQuery = {
  response: ProfileComponentWithQuery$data
  variables: ProfileComponentWithQuery$variables
}

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        kind: 'Literal',
        name: 'id',
        value: 'test-id',
      },
    ],
    v1 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'id',
      storageKey: null,
    },
    v2 = [
      {
        alias: null,
        args: null,
        kind: 'ScalarField',
        name: 'url',
        storageKey: null,
      },
    ],
    v3 = {
      enumValues: null,
      nullable: false,
      plural: false,
      type: 'String',
    },
    v4 = {
      enumValues: null,
      nullable: true,
      plural: false,
      type: 'File',
    },
    v5 = {
      enumValues: null,
      nullable: true,
      plural: false,
      type: 'String',
    },
    v6 = {
      enumValues: null,
      nullable: true,
      plural: false,
      type: 'Boolean',
    },
    v7 = {
      enumValues: null,
      nullable: true,
      plural: false,
      type: 'Int',
    },
    v8 = {
      enumValues: null,
      nullable: false,
      plural: false,
      type: 'ID',
    }
  return {
    fragment: {
      argumentDefinitions: [],
      kind: 'Fragment',
      metadata: null,
      name: 'ProfileComponentWithQuery',
      selections: [
        {
          alias: null,
          args: v0 /*: any*/,
          concreteType: 'Profile',
          kind: 'LinkedField',
          name: 'profile',
          plural: false,
          selections: [
            {
              args: null,
              kind: 'FragmentSpread',
              name: 'ProfileComponentFragment',
            },
          ],
          storageKey: 'profile(id:"test-id")',
        },
      ],
      type: 'Query',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: [],
      kind: 'Operation',
      name: 'ProfileComponentWithQuery',
      selections: [
        {
          alias: null,
          args: v0 /*: any*/,
          concreteType: 'Profile',
          kind: 'LinkedField',
          name: 'profile',
          plural: false,
          selections: [
            v1 /*: any*/,
            {
              alias: null,
              args: null,
              kind: 'ScalarField',
              name: 'status',
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
              args: null,
              kind: 'ScalarField',
              name: 'biography',
              storageKey: null,
            },
            {
              alias: null,
              args: [
                {
                  kind: 'Literal',
                  name: 'height',
                  value: 96,
                },
                {
                  kind: 'Literal',
                  name: 'width',
                  value: 96,
                },
              ],
              concreteType: 'File',
              kind: 'LinkedField',
              name: 'image',
              plural: false,
              selections: v2 /*: any*/,
              storageKey: 'image(height:96,width:96)',
            },
            {
              alias: null,
              args: [
                {
                  kind: 'Literal',
                  name: 'height',
                  value: 290,
                },
                {
                  kind: 'Literal',
                  name: 'width',
                  value: 868,
                },
              ],
              concreteType: 'File',
              kind: 'LinkedField',
              name: 'bannerImage',
              plural: false,
              selections: v2 /*: any*/,
              storageKey: 'bannerImage(height:290,width:868)',
            },
            {
              alias: null,
              args: null,
              kind: 'ScalarField',
              name: 'isFollowedByMe',
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: 'ScalarField',
              name: 'followersCount',
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: 'ScalarField',
              name: 'followingCount',
              storageKey: null,
            },
            {
              alias: 'canChange',
              args: [
                {
                  kind: 'Literal',
                  name: 'perm',
                  value: 'change',
                },
              ],
              kind: 'ScalarField',
              name: 'hasPerm',
              storageKey: 'hasPerm(perm:"change")',
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
                v1 /*: any*/,
              ],
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              concreteType: 'User',
              kind: 'LinkedField',
              name: 'owner',
              plural: false,
              selections: [
                {
                  alias: null,
                  args: null,
                  kind: 'ScalarField',
                  name: 'phoneNumber',
                  storageKey: null,
                },
                v1 /*: any*/,
              ],
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: 'ScalarField',
              name: 'isBlockedByMe',
              storageKey: null,
            },
            {
              kind: 'TypeDiscriminator',
              abstractKey: '__isBlocksInterface',
            },
          ],
          storageKey: 'profile(id:"test-id")',
        },
      ],
    },
    params: {
      cacheID: 'b7626920ad43e987ddd718d6ddd137ca',
      id: null,
      metadata: {
        relayTestingSelectionTypeInfo: {
          profile: {
            enumValues: null,
            nullable: true,
            plural: false,
            type: 'Profile',
          },
          'profile.__isBlocksInterface': v3 /*: any*/,
          'profile.bannerImage': v4 /*: any*/,
          'profile.bannerImage.url': v3 /*: any*/,
          'profile.biography': v5 /*: any*/,
          'profile.canChange': v6 /*: any*/,
          'profile.followersCount': v7 /*: any*/,
          'profile.followingCount': v7 /*: any*/,
          'profile.id': v8 /*: any*/,
          'profile.image': v4 /*: any*/,
          'profile.image.url': v3 /*: any*/,
          'profile.isBlockedByMe': v6 /*: any*/,
          'profile.isFollowedByMe': v6 /*: any*/,
          'profile.name': v5 /*: any*/,
          'profile.owner': {
            enumValues: null,
            nullable: false,
            plural: false,
            type: 'User',
          },
          'profile.owner.id': v8 /*: any*/,
          'profile.owner.phoneNumber': v5 /*: any*/,
          'profile.status': {
            enumValues: ['A_1', 'A_2'],
            nullable: false,
            plural: false,
            type: 'ProfilesProfileStatusChoices',
          },
          'profile.urlPath': {
            enumValues: null,
            nullable: true,
            plural: false,
            type: 'URLPath',
          },
          'profile.urlPath.id': v8 /*: any*/,
          'profile.urlPath.path': v3 /*: any*/,
        },
      },
      name: 'ProfileComponentWithQuery',
      operationKind: 'query',
      text: 'query ProfileComponentWithQuery {\n  profile(id: "test-id") {\n    ...ProfileComponentFragment\n    id\n  }\n}\n\nfragment BlockToggleFragment on BlocksInterface {\n  __isBlocksInterface: __typename\n  id\n  isBlockedByMe\n  ... on Profile {\n    id\n    name\n  }\n}\n\nfragment ProfileComponentFragment on Profile {\n  id\n  status\n  name\n  biography\n  image(height: 96, width: 96) {\n    url\n  }\n  bannerImage(height: 290, width: 868) {\n    url\n  }\n  isFollowedByMe\n  followersCount\n  followingCount\n  canChange: hasPerm(perm: "change")\n  urlPath {\n    path\n    id\n  }\n  owner {\n    phoneNumber\n    id\n  }\n  isBlockedByMe\n  ...BlockToggleFragment\n}\n',
    },
  }
})()

;(node as any).hash = '9cad7df73c0ed7ce27f6a70686ce41a3'

export default node
