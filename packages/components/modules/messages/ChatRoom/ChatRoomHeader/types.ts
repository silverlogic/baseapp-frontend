import { BoxProps } from '@mui/material'

import { TitleFragment$key } from '../../../../__generated__/TitleFragment.graphql'

export interface ChatRoomHeaderProps {
  participantsCount: number
  roomTitleRef: TitleFragment$key
  onDisplayGroupDetailsClicked: () => void
}

export interface ChatTitleContainerProps extends BoxProps {
  isClickable: boolean
}
