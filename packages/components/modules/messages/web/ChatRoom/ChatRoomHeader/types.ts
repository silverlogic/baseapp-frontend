import { BoxProps } from '@mui/material'

import { SingleChatDetailsFragment$key } from '../../../../../__generated__/SingleChatDetailsFragment.graphql'

export interface ChatRoomHeaderProps {
  isArchived: boolean
  participantsCount: number
  roomTitleRef: SingleChatDetailsFragment$key
  onDisplayGroupDetailsClicked: VoidFunction
  onDisplayProfileSummaryClicked: VoidFunction
  roomId?: string
}

export interface ChatTitleContainerProps extends BoxProps {
  isClickable: boolean
}
