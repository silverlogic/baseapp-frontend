import { FC } from 'react'

import { BoxProps } from '@mui/material'

import { ChatRoomsQuery$data } from '../../../../__generated__/ChatRoomsQuery.graphql'
import { AllChatRoomsListProps } from '../AllChatRoomsList/types'
import { GroupChatCreateProps } from '../GroupChatCreate/types'
import { GroupChatDetailsProps } from '../GroupChatDetails/types'
import { GroupChatEditProps } from '../GroupChatEdit/types'
import { SingleChatCreateProps } from '../SingleChatCreate/types'

export interface HidableContainerProps extends BoxProps {
  hide: boolean
}

export interface ChatRoomsComponentProps {
  chatRoomsQueryData: ChatRoomsQuery$data
  settings: any
  AllChatRoomsListComponent?: FC<AllChatRoomsListProps>
  AllChatRoomsListComponentProps?: Partial<AllChatRoomsListProps>
  GroupChatCreateComponent?: FC<GroupChatCreateProps>
  GroupChatCreateComponentProps?: Partial<GroupChatCreateProps>
  GroupChatDetailsComponent?: FC<GroupChatDetailsProps>
  GroupChatDetailsComponentProps?: Partial<GroupChatDetailsProps>
  GroupChatEditComponent?: FC<GroupChatEditProps>
  GroupChatEditComponentProps?: Partial<GroupChatEditProps>
  SingleChatCreateComponent?: FC<SingleChatCreateProps>
  SingleChatCreateComponentProps?: Partial<SingleChatCreateProps>
}
