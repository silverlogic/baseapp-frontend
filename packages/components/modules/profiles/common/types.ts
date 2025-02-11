import { AllProfilesListFragment$data } from '../../../__generated__/AllProfilesListFragment.graphql'
import { ProfileComponentFragment$data } from '../../../__generated__/ProfileComponentFragment.graphql'

export type AllProfiles = NonNullable<AllProfilesListFragment$data['allProfiles']>
export type AllProfilesEdges = AllProfiles['edges']
export type ProfileEdge = AllProfilesEdges[number]
export type ProfileNode = NonNullable<AllProfilesEdges[number]>['node']

export interface ProfileUpdateForm
  extends Pick<ProfileComponentFragment$data, 'id' | 'name' | 'biography'> {
  bannerImage?: string | File | Blob
  image?: string | File | Blob
  phoneNumber?: string
  urlPath?: string
}

export type UploadablesObj = {
  image?: File | Blob
  bannerImage?: File | Blob
}
