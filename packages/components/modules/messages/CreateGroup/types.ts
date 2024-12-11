import { Dispatch, FC, PropsWithChildren, SetStateAction } from 'react'

import { SearchbarProps } from '@baseapp-frontend/design-system'

import { VirtuosoProps } from 'react-virtuoso'

import { ChatRoomsQuery$data } from '../../../__generated__/ChatRoomsQuery.graphql'
import { ChatRoomListItemProps } from './ChatRoomListItem/types'

export interface CreateGroupProps extends PropsWithChildren {
  allProfilesRef: ChatRoomsQuery$data
  remotePatternsHostName?: string
  Searchbar?: FC<SearchbarProps>
  SearchbarProps?: Partial<SearchbarProps>
  ChatRoomListItem?: FC<ChatRoomListItemProps>
  ChatRoomListItemProps?: Partial<ChatRoomListItemProps>
  VirtuosoProps?: Partial<VirtuosoProps<any, any>>
  setIsInGroupChatCreation: Dispatch<SetStateAction<boolean>>
  setIsInExistingChatRoomsView: Dispatch<SetStateAction<boolean>>
}

export interface CreatGroupUpload {
  title?: string
  participants?: any[]
  image?: string | File | Blob
}
