import { FC } from 'react'

import type { BadgeProps, BoxProps } from '@mui/material'

import { RoomFragment$key } from '../../../../__generated__/RoomFragment.graphql'

export interface ChatRoomItemProps {
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
