import { FC } from 'react'

import { BoxProps } from '@mui/material'

import { ChatRoomsQuery$data } from '../../../../__generated__/ChatRoomsQuery.graphql'
import { AllChatRoomsListProps } from '../AllChatRoomsList/types'
import { GroupChatRoomCreateProps } from '../GroupChatRoomCreate/types'
import { GroupChatRoomDetailProps } from '../GroupChatRoomDetail/types'
import { GroupChatRoomEditProps } from '../GroupChatRoomEdit/types'
import { SingleChatRoomCreateProps } from '../SingleChatRoomCreate/types'

export interface HidableContainerProps extends BoxProps {
  hide: boolean
}

export interface ChatRoomsComponentProps {
  chatRoomsQueryData: ChatRoomsQuery$data
  settings: any
  AllChatRoomsListComponent?: FC<AllChatRoomsListProps>
  AllChatRoomsListComponentProps?: Partial<AllChatRoomsListProps>
  GroupChatRoomCreateComponent?: FC<GroupChatRoomCreateProps>
  GroupChatRoomCreateComponentProps?: Partial<GroupChatRoomCreateProps>
  GroupChatRoomEditComponent?: FC<GroupChatRoomEditProps>
  GroupChatRoomEditComponentProps?: Partial<GroupChatRoomEditProps>
  GroupChatRoomDetailsComponent?: FC<GroupChatRoomDetailProps>
  GroupChatRoomDetailsComponentProps?: Partial<GroupChatRoomDetailProps>
  SingleChatRoomCreateComponent?: FC<SingleChatRoomCreateProps>
  SingleChatRoomCreateComponentProps?: Partial<SingleChatRoomCreateProps>
}
