import { Dispatch, FC, PropsWithChildren, SetStateAction } from 'react'

import { SearchbarProps } from '@baseapp-frontend/design-system'

import { ChatRoomsQuery$data } from '../../../__generated__/ChatRoomsQuery.graphql'
import { ConnectionsListProps } from './ConnectionsList/types'
import { ProfileCardProps } from './ProfileCard/types'

export interface CreateGroupProps extends PropsWithChildren {
  allProfilesRef: ChatRoomsQuery$data
  Searchbar?: FC<SearchbarProps>
  SearchbarProps?: Partial<SearchbarProps>
  ProfileCard?: FC<ProfileCardProps>
  ProfileCardProps?: Partial<ProfileCardProps>
  ConnectionsList?: FC<ConnectionsListProps>
  ConnectionsListProps?: Partial<ConnectionsListProps>
  setIsInGroupChatCreation: Dispatch<SetStateAction<boolean>>
  setIsInExistingChatRoomsView: Dispatch<SetStateAction<boolean>>
}

export interface CreatGroupUpload {
  title: string
  participants: any[]
  image?: string | File | Blob | null
}
