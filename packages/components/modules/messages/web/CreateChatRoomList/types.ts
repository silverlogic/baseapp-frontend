import { FC, PropsWithChildren } from 'react'

import { SearchbarProps } from '@baseapp-frontend/design-system/components/web/inputs'

import { VirtuosoProps } from 'react-virtuoso'

import { ChatRoomsQuery$data } from '../../../../__generated__/ChatRoomsQuery.graphql'
import { ChatRoomListItemProps } from './ChatRoomListItem/types'

export interface CreateChatRoomListProps extends PropsWithChildren {
  allProfilesRef: ChatRoomsQuery$data
  Searchbar?: FC<SearchbarProps>
  SearchbarProps?: Partial<SearchbarProps>
  ChatRoomListItem?: FC<ChatRoomListItemProps>
  ChatRoomListItemProps?: Partial<ChatRoomListItemProps>
  VirtuosoProps?: Partial<VirtuosoProps<any, any>>
  onChatCreation: () => void
  onGroupChatCreationButtonClicked: () => void
}
