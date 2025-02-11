import { FC } from 'react'

import { SearchbarProps } from '@baseapp-frontend/design-system/components/web/inputs'
import { ValueOf } from '@baseapp-frontend/utils'

import { VirtuosoProps } from 'react-virtuoso'

import { ChatRoomsQuery$data } from '../../../../__generated__/ChatRoomsQuery.graphql'
import { RoomsListFragment$data } from '../../../../__generated__/RoomsListFragment.graphql'
import { ChatRoomItemProps } from './ChatRoomItem/types'
import { CHAT_TAB_VALUES } from './constants'

type ChatRooms = NonNullable<RoomsListFragment$data['chatRooms']>
type ChatRoomsEdges = ChatRooms['edges']
export type ChatRoomNode = NonNullable<ChatRoomsEdges[number]>['node']

export interface ChatRoomsListProps {
  targetRef: ChatRoomsQuery$data
  Searchbar?: FC<SearchbarProps>
  SearchbarProps?: Partial<SearchbarProps>
  ChatRoomItem?: FC<ChatRoomItemProps>
  ChatRoomItemProps?: Partial<ChatRoomItemProps>
  EmptyChatRoomsState?: FC
  VirtuosoProps?: Partial<VirtuosoProps<any, any>>
}

export type ChatTabValues = ValueOf<typeof CHAT_TAB_VALUES>
