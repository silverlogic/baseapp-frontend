import { FC, PropsWithChildren } from 'react'

import { SearchbarProps } from '@baseapp-frontend/design-system/components/web/inputs'

import { VirtuosoProps } from 'react-virtuoso'

import { ChatRoomsQuery$data } from '../../../../__generated__/ChatRoomsQuery.graphql'
import { BodyProps } from './Body/types'
import { ChatRoomListItemProps } from './ChatRoomListItem/types'
import { HeaderProps } from './Header/types'

export interface ChatCreateProps extends PropsWithChildren {
  allProfilesRef: ChatRoomsQuery$data
  Body?: FC<BodyProps>
  BodyProps?: Partial<BodyProps>
  ChatRoomListItem?: FC<ChatRoomListItemProps>
  ChatRoomListItemProps?: Partial<ChatRoomListItemProps>
  Header?: FC<HeaderProps>
  HeaderProps?: Partial<HeaderProps>
  onChatCreation: () => void
  onGroupChatCreationButtonClicked: () => void
  onHeaderClick: () => void
  Searchbar?: FC<SearchbarProps>
  SearchbarProps?: Partial<SearchbarProps>
  VirtuosoProps?: Partial<VirtuosoProps<any, any>>
}
