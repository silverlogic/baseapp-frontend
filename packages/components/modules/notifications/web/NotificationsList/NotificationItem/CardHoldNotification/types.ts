import { FC } from 'react'

import { BoxProps } from '@mui/material'

import { NotificationItemFragment$data } from '../../../../../../__generated__/NotificationItemFragment.graphql'
import type { CardHoldStaffNoticeProps } from '../../../../../payments/web'
import { NotificationAvatarProps } from '../Notification/NotificationAvatar/types'
import { NotificationHeaderProps } from '../Notification/NotificationHeader/types'

export interface CardHoldNotificationProps {
  notification: NotificationItemFragment$data
  NotificationRoot?: FC<BoxProps>
  NotificationContent?: FC<BoxProps>
  NotificationAvatar?: FC<NotificationAvatarProps>
  NotificationAvatarProps?: Partial<NotificationAvatarProps>
  NotificationHeader?: FC<NotificationHeaderProps>
  NotificationHeaderProps?: Partial<NotificationHeaderProps>
  /** The hold's staff notice, with its actions; replace it or pass it props (e.g. `messages`). */
  CardHoldStaffNotice?: FC<CardHoldStaffNoticeProps>
  CardHoldStaffNoticeProps?: Partial<CardHoldStaffNoticeProps>
}
