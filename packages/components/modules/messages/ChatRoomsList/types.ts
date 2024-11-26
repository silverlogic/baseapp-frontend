import { FC } from 'react'

import { SearchbarProps } from '@baseapp-frontend/design-system'
import { ValueOf } from '@baseapp-frontend/utils'

import { SvgIconProps } from '@mui/material'
import { VirtuosoProps } from 'react-virtuoso'

import { ChatRoomsQuery$data } from '../../../__generated__/ChatRoomsQuery.graphql'
import { ChatRoomCardProps } from './ChatRoomCard/types'
import { CHAT_TAB_VALUES } from './constants'

export interface ChatRoomsListProps {
  targetRef: ChatRoomsQuery$data
  Searchbar?: FC<SearchbarProps>
  SearchbarProps?: Partial<SearchbarProps>
  ChatRoomCard?: FC<ChatRoomCardProps>
  ChatRoomCardProps?: Partial<ChatRoomCardProps>
  NoMessagesIcon?: FC<SvgIconProps>
  NoMessagesIconProps?: Partial<SvgIconProps>
  VirtuosoProps?: Partial<VirtuosoProps<any, any>>
}

export type ChatTabValues = ValueOf<typeof CHAT_TAB_VALUES>
