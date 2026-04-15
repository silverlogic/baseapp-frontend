import { FC } from 'react'

import { BoxProps } from '@mui/material'

import { NotificationItemFragment$data } from '../../../../../../__generated__/NotificationItemFragment.graphql'
import { NotificationAvatarProps } from '../Notification/NotificationAvatar/types'
import { NotificationBodyProps } from '../Notification/NotificationBody/types'
import { NotificationHeaderProps } from '../Notification/NotificationHeader/types'

export interface CommentCreatedProps {
  notification: NotificationItemFragment$data
  NotificationRoot?: FC<BoxProps>
  NotificationContent?: FC<BoxProps>
  NotificationAvatar?: FC<NotificationAvatarProps>
  NotificationAvatarProps?: Partial<NotificationAvatarProps>
  NotificationHeader?: FC<NotificationHeaderProps>
  NotificationHeaderProps?: Partial<NotificationHeaderProps>
  NotificationBody?: FC<NotificationBodyProps>
  NotificationBodyProps?: Partial<NotificationBodyProps>
}
