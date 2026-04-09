import { FC } from 'react'

import { BoxProps } from '@mui/material'

import { NotificationItemFragment$data } from '../../../../../../__generated__/NotificationItemFragment.graphql'
import { NotificationAvatarProps } from '../Notification/NotificationAvatar/types'
import { NotificationHeaderProps } from '../Notification/NotificationHeader/types'

export interface ReactionCreatedProps {
  notification: NotificationItemFragment$data
  NotificationRoot?: FC<BoxProps>
  NotificationContent?: FC<BoxProps>
  NotificationAvatar?: FC<NotificationAvatarProps>
  NotificationAvatarProps?: Partial<NotificationAvatarProps>
  NotificationHeader?: FC<NotificationHeaderProps>
  NotificationHeaderProps?: Partial<NotificationHeaderProps>
}
