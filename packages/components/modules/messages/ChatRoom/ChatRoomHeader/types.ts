import { BoxProps } from '@mui/material'

import { TitleFragment$key } from '../../../../__generated__/TitleFragment.graphql'

export interface ChatRoomHeaderProps {
  participantsCount: number
  roomTitleRef: TitleFragment$key
  onDisplayGroupDetailsClicked: VoidFunction
  roomId?: string
}

export interface ChatTitleContainerProps extends BoxProps {
  isClickable: boolean
}
