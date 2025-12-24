import { FC } from 'react'

import { UISettings } from '@baseapp-frontend/design-system/styles/web'
import { ValueOf } from '@baseapp-frontend/utils'

import { BoxProps } from '@mui/material'

import { ChatRoomsQuery$data } from '../../../../__generated__/ChatRoomsQuery.graphql'
import { LEFT_PANEL_CONTENT } from '../../common/context/useChatRoom/constants'
import { AllChatRoomsListProps } from '../AllChatRoomsList/types'
import { GroupChatCreateProps } from '../GroupChatCreate/types'
import { GroupChatDetailsProps } from '../GroupChatDetails/types'
import { GroupChatEditProps } from '../GroupChatEdit/types'
import { ProfileSummaryProps } from '../ProfileSummary/types'
import { SingleChatCreateProps } from '../SingleChatCreate/types'

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
  ProfileSummaryComponent?: FC<ProfileSummaryProps>
  ProfileSummaryComponentProps?: Partial<ProfileSummaryProps>
}
