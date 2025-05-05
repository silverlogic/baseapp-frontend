import { FC } from 'react'

import { UISettings } from '@baseapp-frontend/design-system/styles/web'
import { ValueOf } from '@baseapp-frontend/utils'

import { BoxProps } from '@mui/material'

import { ChatRoomsQuery$data } from '../../../../__generated__/ChatRoomsQuery.graphql'
import { AllChatRoomsListProps } from '../AllChatRoomsList/types'
import { GroupChatCreateProps } from '../GroupChatCreate/types'
import { GroupChatDetailsProps } from '../GroupChatDetails/types'
import { GroupChatEditProps } from '../GroupChatEdit/types'
import { SingleChatCreateProps } from '../SingleChatCreate/types'
import { LEFT_PANEL_CONTENT } from './constants'

export interface HidableContainerProps extends BoxProps {
  hide: boolean
}

export type LeftPanelContentValues = ValueOf<typeof LEFT_PANEL_CONTENT>

export interface ChatRoomsComponentProps {
  chatRoomsQueryData: ChatRoomsQuery$data
  settings: UISettings
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
