import { FC } from 'react'

import { BadgeProps } from '@mui/material'
import { BoxProps } from '@mui/system'

import { RoomFragment$key } from '../../../../__generated__/RoomFragment.graphql'

export interface ChatRoomCardProps {
  roomRef: RoomFragment$key
  isCardSelected?: boolean
  handleClick?: () => void
  Badge?: FC<BadgeProps>
  BadgeProps?: Partial<BadgeProps>
}

export interface StyledChatCardProps extends BoxProps {
  isCardSelected?: boolean
  showPointer?: boolean
}
