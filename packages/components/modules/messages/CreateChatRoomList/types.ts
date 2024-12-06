import { Dispatch, FC, PropsWithChildren, SetStateAction } from 'react'

import { SearchbarProps } from '@baseapp-frontend/design-system'

import { VirtuosoProps } from 'react-virtuoso'

import { AllProfilesListFragment$data } from '../../../__generated__/AllProfilesListFragment.graphql'
import { ChatRoomsQuery$data } from '../../../__generated__/ChatRoomsQuery.graphql'
import { ChatRoomListItemProps } from './ChatRoomListItem/types'

type AllProfiles = NonNullable<AllProfilesListFragment$data['allProfiles']>
type AllProfilesEdges = AllProfiles['edges']
export type ProfileEdge = AllProfilesEdges[number]
export type ProfileNode = NonNullable<AllProfilesEdges[number]>['node']

export interface CreateChatRoomListProps extends PropsWithChildren {
  allProfilesRef: ChatRoomsQuery$data
  Searchbar?: FC<SearchbarProps>
  SearchbarProps?: Partial<SearchbarProps>
  ChatRoomListItem?: FC<ChatRoomListItemProps>
  ChatRoomListItemProps?: Partial<ChatRoomListItemProps>
  VirtuosoProps?: Partial<VirtuosoProps<any, any>>
  setIsInExistingChatRoomsView: Dispatch<SetStateAction<boolean>>
}
