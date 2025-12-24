import { BoxProps } from '@mui/material'

import { TitleFragment$key } from '../../../../../__generated__/TitleFragment.graphql'

export interface ChatRoomHeaderProps {
  isArchived: boolean
  participantsCount: number
  roomTitleRef: TitleFragment$key
  onDisplayGroupDetailsClicked: VoidFunction
  onDisplayProfileSummaryClicked: VoidFunction
  roomId?: string
}

export interface ChatTitleContainerProps extends BoxProps {
  isClickable: boolean
}
