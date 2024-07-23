import { PropsWithChildren } from 'react'

import { FormControl } from '@baseapp-frontend/utils'

import { TextFieldProps } from '../TextField/types'

export type TextAreaProps = Omit<TextFieldProps, 'variant'>

export type CommentTextFieldProps = FormControl &
  TextFieldProps &
  PropsWithChildren & {
    isReply?: boolean
    onCancelReply?: () => void
    replyTargetName?: string | null
  }
