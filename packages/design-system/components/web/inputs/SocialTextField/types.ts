import { FC, PropsWithChildren } from 'react'

import { FormControl } from '@baseapp-frontend/utils'

import { MarkdownEditorProps } from '../MarkdownEditor/types'
import { TextFieldProps } from '../TextField/types'
import { TextareaFieldProps } from '../TextareaField/types'

export type SocialTextFieldProps = FormControl &
  TextFieldProps &
  PropsWithChildren & {
    isReply?: boolean
    onCancelReply?: () => void
    replyTargetName?: string | null
    TextField?: FC<TextareaFieldProps> | FC<MarkdownEditorProps>
  }
