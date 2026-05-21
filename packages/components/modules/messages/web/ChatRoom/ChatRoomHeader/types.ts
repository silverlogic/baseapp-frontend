import { BoxProps } from '@mui/material'

import { SingleChatDetailsFragment$key } from '../../../../../__generated__/SingleChatDetailsFragment.graphql'
import type { ChatRoomOptionValue } from './ChatRoomOptions/constants'

export interface ChatRoomHeaderProps {
  isArchived: boolean
  participantsCount: number
  roomTitleRef: SingleChatDetailsFragment$key
  onDisplayGroupDetailsClicked: VoidFunction
  onDisplayProfileSummaryClicked: VoidFunction
  roomId?: string
  hiddenOptions?: ChatRoomOptionValue[]
}

export interface ChatTitleContainerProps extends BoxProps {
  isClickable: boolean
}
