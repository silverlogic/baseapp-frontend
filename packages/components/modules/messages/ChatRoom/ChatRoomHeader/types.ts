import { BoxProps } from '@mui/material'

import { ChatRoomHeaderFragment$key } from '../../../../__generated__/ChatRoomHeaderFragment.graphql'

export interface ChatRoomHeaderProps {
  roomHeaderRef: ChatRoomHeaderFragment$key
  onDisplayGroupDetailsClicked: () => void
}

export interface ChatTitleContainerProps extends BoxProps {
  isClickable: boolean
}
