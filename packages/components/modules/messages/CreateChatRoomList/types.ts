import { Dispatch, FC, PropsWithChildren, SetStateAction } from 'react'

import { SearchbarProps } from '@baseapp-frontend/design-system'

import { VirtuosoProps } from 'react-virtuoso'

import { ChatRoomsQuery$data } from '../../../__generated__/ChatRoomsQuery.graphql'
import { ChatRoomListCardProps } from './ChatRoomListCard/types'

export interface CreateChatRoomListProps extends PropsWithChildren {
  allProfilesRef: ChatRoomsQuery$data
  Searchbar?: FC<SearchbarProps>
  SearchbarProps?: Partial<SearchbarProps>
  ChatRoomListCard?: FC<ChatRoomListCardProps>
  ChatRoomListCardProps?: Partial<ChatRoomListCardProps>
  VirtuosoProps?: Partial<VirtuosoProps<any, any>>
  setIsInChatRoom: Dispatch<SetStateAction<boolean>>
  setIsInExistingChatRoomsView: Dispatch<SetStateAction<boolean>>
}
