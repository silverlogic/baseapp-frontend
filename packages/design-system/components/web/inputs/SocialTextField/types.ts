import { ComponentType, PropsWithChildren } from 'react'

import { FormControl } from '@baseapp-frontend/utils'

import { BoxProps } from '@mui/material'

import {
  MarkdownEditorFieldCoreProps,
  MarkdownEditorFieldProps,
} from '../MarkdownEditorField/types'
import { TextFieldProps } from '../TextField/types'
import { TextareaFieldProps } from '../TextareaField/types'

export type SocialTextFieldMode = 'plain-text' | 'rich-text'

export type SocialTextFieldProps = FormControl &
  TextFieldProps &
  PropsWithChildren & {
    mode?: SocialTextFieldMode
    isReply?: boolean
    onCancelReply?: () => void
    replyTargetName?: string | null
    Container?: ComponentType<BoxProps>
    OutsideReplyContainer?: ComponentType<BoxProps>
    ActionsContainer?: ComponentType<BoxProps>
    ReplyContainer?: ComponentType<BoxProps>
    MarkdownEditorField?: ComponentType<MarkdownEditorFieldProps>
    MarkdownEditorFieldProps?: Partial<MarkdownEditorFieldCoreProps>
    TextareaField?: ComponentType<TextareaFieldProps>
  }
