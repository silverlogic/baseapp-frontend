<<<<<<< HEAD:packages/components/modules/messages/web/__shared__/types.ts
=======
import { AllProfilesListFragment$data } from '../../../__generated__/AllProfilesListFragment.graphql'
import { MessagesListFragment$data } from '../../../__generated__/MessagesListFragment.graphql'

>>>>>>> 3f7d135 (feat: moved group chat list display functionality from CreateGroup into shared component GroupChatMembersList):packages/components/modules/messages/__shared__/types.ts
export interface TitleAndImage {
  title: string
  image?: string | File | Blob | null
}
<<<<<<< HEAD:packages/components/modules/messages/web/__shared__/types.ts
=======

export interface AddRemoveParticipants {
  addParticipants?: any[]
  participants?: any[]
  removeParticipants?: any[]
}

export interface CreateOrEditGroup extends TitleAndImage, AddRemoveParticipants {}

export type AllMessages = NonNullable<MessagesListFragment$data['allMessages']>
export type MessageEdges = AllMessages['edges']
export type MessageNode = NonNullable<MessageEdges[number]>['node']

export type AllProfiles = NonNullable<AllProfilesListFragment$data['allProfiles']>
export type AllProfilesEdges = AllProfiles['edges']
export type ProfileEdge = AllProfilesEdges[number]
export type ProfileNode = NonNullable<AllProfilesEdges[number]>['node']
>>>>>>> 3f7d135 (feat: moved group chat list display functionality from CreateGroup into shared component GroupChatMembersList):packages/components/modules/messages/__shared__/types.ts
