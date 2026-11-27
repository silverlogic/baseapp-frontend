import { FC } from 'react'

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
  /** Optional content rendered right after the room title (e.g. a label chip). Renders nothing by default. */
  TitleAdornment?: FC<ChatRoomTitleAdornmentProps>
}

export interface ChatRoomTitleAdornmentProps {
  roomId?: string
}

export interface ChatTitleContainerProps extends BoxProps {
  isClickable: boolean
}
