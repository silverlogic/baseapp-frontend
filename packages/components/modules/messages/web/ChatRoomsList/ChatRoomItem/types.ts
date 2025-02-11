import { FC } from 'react'

import type { BadgeProps, BoxProps } from '@mui/material'

import { LastMessageFragment$key } from '../../../../../__generated__/LastMessageFragment.graphql'
import { TitleFragment$key } from '../../../../../__generated__/TitleFragment.graphql'
import { UnreadMessagesCountFragment$key } from '../../../../../__generated__/UnreadMessagesCountFragment.graphql'

export interface ChatRoomItemProps {
  roomRef: { readonly id: string } & LastMessageFragment$key &
    TitleFragment$key &
    UnreadMessagesCountFragment$key
  isCardSelected?: boolean
  handleClick?: () => void
  Badge?: FC<BadgeProps>
  BadgeProps?: Partial<BadgeProps>
  isInArchivedTab: boolean
}

export interface StyledChatCardProps extends BoxProps {
  isCardSelected?: boolean
  showPointer?: boolean
}
