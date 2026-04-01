import { ComponentType, PropsWithChildren } from 'react'

import { FormControl } from '@baseapp-frontend/utils'

import { BoxProps } from '@mui/material'

import { TextFieldProps } from '../TextField/types'

export type SocialTextFieldProps = FormControl &
  TextFieldProps &
  PropsWithChildren & {
    isReply?: boolean
    onCancelReply?: () => void
    replyTargetName?: string | null
    Container?: ComponentType<BoxProps>
    OutsideReplyContainer?: ComponentType<BoxProps>
    ReplyContainer?: ComponentType<BoxProps>
  }
