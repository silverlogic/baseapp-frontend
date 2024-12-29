import { AllProfilesListFragment$data } from '../../__generated__/AllProfilesListFragment.graphql'
import { MessagesListFragment$data } from '../../__generated__/MessagesListFragment.graphql'

export type AllMessages = NonNullable<MessagesListFragment$data['allMessages']>
export type MessageEdges = AllMessages['edges']
export type MessageNode = NonNullable<MessageEdges[number]>['node']

export type AllProfiles = NonNullable<AllProfilesListFragment$data['allProfiles']>
export type AllProfilesEdges = AllProfiles['edges']
export type ProfileEdge = AllProfilesEdges[number]
export type ProfileNode = NonNullable<AllProfilesEdges[number]>['node']
